"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, Image, X, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface UploadFile {
  id: string
  name: string
  size: number
  progress: number
  status: "uploading" | "complete" | "error"
}

export function UploadDropzone() {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<UploadFile[]>([])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const simulateUpload = (file: File) => {
    const uploadFile: UploadFile = {
      id: Math.random().toString(36).slice(2),
      name: file.name,
      size: file.size,
      progress: 0,
      status: "uploading",
    }

    setFiles((prev) => [...prev, uploadFile])

    // Simulate upload progress
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id === uploadFile.id && f.status === "uploading") {
            const newProgress = Math.min(f.progress + Math.random() * 30, 100)
            if (newProgress >= 100) {
              clearInterval(interval)
              return { ...f, progress: 100, status: "complete" as const }
            }
            return { ...f, progress: newProgress }
          }
          return f
        })
      )
    }, 200)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    )

    if (droppedFiles.length === 0) {
      toast.error("Please drop image files only")
      return
    }

    droppedFiles.forEach(simulateUpload)
    toast.success(`Uploading ${droppedFiles.length} photo${droppedFiles.length > 1 ? "s" : ""}`)
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    selectedFiles.forEach(simulateUpload)
    if (selectedFiles.length > 0) {
      toast.success(`Uploading ${selectedFiles.length} photo${selectedFiles.length > 1 ? "s" : ""}`)
    }
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Quick Upload</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative rounded-xl border-2 border-dashed p-8 text-center transition-all",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          <div className="flex flex-col items-center gap-3">
            <div className={cn(
              "flex h-14 w-14 items-center justify-center rounded-full transition-colors",
              isDragging ? "bg-primary/10" : "bg-muted"
            )}>
              <Upload className={cn("h-6 w-6", isDragging ? "text-primary" : "text-muted-foreground")} />
            </div>
            <div>
              <p className="font-medium text-foreground">
                {isDragging ? "Drop your photos here" : "Drag and drop photos here"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                or click to browse from your device
              </p>
            </div>
            <Button variant="outline" size="sm" className="pointer-events-none">
              Select Photos
            </Button>
          </div>
        </div>

        {/* Upload Progress List */}
        {files.length > 0 && (
          <div className="space-y-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Image className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    {file.status === "complete" ? (
                      <span className="flex items-center gap-1 text-xs text-accent">
                        <CheckCircle2 className="h-3 w-3" />
                        Complete
                      </span>
                    ) : (
                      <>
                        <Progress value={file.progress} className="h-1.5 flex-1" />
                        <span className="text-xs text-muted-foreground">
                          {Math.round(file.progress)}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{formatSize(file.size)}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => removeFile(file.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

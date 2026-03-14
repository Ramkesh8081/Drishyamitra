"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { User, SkipForward, Check } from "lucide-react"
import { toast } from "sonner"
import { mockUnlabeledFaces } from "@/lib/mock-data"

interface FaceLabelModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FaceLabelModal({ open, onOpenChange }: FaceLabelModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [name, setName] = useState("")
  const [labeledFaces, setLabeledFaces] = useState<Record<string, string>>({})

  const faces = mockUnlabeledFaces
  const currentFace = faces[currentIndex]
  const progress = ((currentIndex) / faces.length) * 100

  const handleLabel = () => {
    if (!name.trim()) {
      toast.error("Please enter a name")
      return
    }

    setLabeledFaces((prev) => ({ ...prev, [currentFace.id]: name }))
    toast.success(`Labeled as "${name}"`)
    setName("")

    if (currentIndex < faces.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      toast.success("All faces have been labeled!")
      onOpenChange(false)
      setCurrentIndex(0)
    }
  }

  const handleSkip = () => {
    if (currentIndex < faces.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setName("")
    } else {
      toast.info("Labeling complete")
      onOpenChange(false)
      setCurrentIndex(0)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    setCurrentIndex(0)
    setName("")
  }

  if (!currentFace) return null

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Label Faces
          </DialogTitle>
          <DialogDescription>
            Help us recognize people in your photos by labeling detected faces.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Face {currentIndex + 1} of {faces.length}
              </span>
              <span className="font-medium text-primary">
                {Math.round(progress)}% complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Face Preview */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="h-32 w-32 overflow-hidden rounded-2xl border-4 border-primary/20 shadow-lg">
                <img
                  src={currentFace.faceUrl}
                  alt="Detected face"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                <User className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Who is this person?
            </label>
            <Input
              placeholder="Enter person's name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLabel()}
              autoFocus
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleSkip}
            >
              <SkipForward className="mr-2 h-4 w-4" />
              Skip
            </Button>
            <Button
              className="flex-1"
              onClick={handleLabel}
              disabled={!name.trim()}
            >
              <Check className="mr-2 h-4 w-4" />
              Label
            </Button>
          </div>

          {/* Recently Labeled */}
          {Object.keys(labeledFaces).length > 0 && (
            <div className="border-t border-border pt-4">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Recently labeled:
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.values(labeledFaces).slice(-3).map((labeledName, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                  >
                    {labeledName}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

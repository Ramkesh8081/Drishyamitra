"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Eye, Mail, CheckCircle2, XCircle, Clock } from "lucide-react"
import { mockDeliveryHistory } from "@/lib/mock-data"

interface Photo {
  id: string
  filename: string
  thumbnail: string
}

interface DeliveryItem {
  id: string
  recipient: string
  photoCount: number
  timestamp: string
  status: string
  subject: string
  photos: Photo[]
}

const statusConfig = {
  sent: {
    label: "Sent",
    icon: CheckCircle2,
    className: "bg-accent/10 text-accent border-accent/20",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
}

export function DeliveryHistoryTable() {
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryItem | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  const handleViewAttachments = (delivery: DeliveryItem) => {
    setSelectedDelivery(delivery)
    setShowPreview(true)
  }

  return (
    <>
      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Recipient</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead className="text-center">Photos</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDeliveryHistory.map((item) => {
              const status = statusConfig[item.status as keyof typeof statusConfig]
              const StatusIcon = status.icon

              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium">{item.recipient}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.subject}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className="font-mono">
                      {item.photoCount}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.timestamp}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={status.className}>
                      <StatusIcon className="mr-1 h-3 w-3" />
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewAttachments(item as DeliveryItem)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Attachments Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Delivery Details</DialogTitle>
          </DialogHeader>
          {selectedDelivery && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Recipient:</span>
                  <p className="font-medium">{selectedDelivery.recipient}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <p className="font-medium">{selectedDelivery.timestamp}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Subject:</span>
                  <p className="font-medium">{selectedDelivery.subject}</p>
                </div>
              </div>

              <div>
                <span className="text-sm text-muted-foreground">
                  Attachments ({selectedDelivery.photoCount} photos)
                </span>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {selectedDelivery.photos.slice(0, 8).map((photo) => (
                    <div
                      key={photo.id}
                      className="aspect-square overflow-hidden rounded-lg border border-border"
                    >
                      <img
                        src={photo.thumbnail}
                        alt={photo.filename}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

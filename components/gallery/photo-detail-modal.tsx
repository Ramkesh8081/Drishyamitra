"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, Download, Share2, Heart, Calendar, MapPin, Tag, Users } from "lucide-react"
import { toast } from "sonner"

interface Photo {
  id: string
  filename: string
  url: string
  thumbnail: string
  size: string
  tags: string[]
  persons: string[]
  date: string
  location: string
  event: string
}

interface PhotoDetailModalProps {
  photo: Photo | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PhotoDetailModal({ photo, open, onOpenChange }: PhotoDetailModalProps) {
  if (!photo) return null

  const handleDownload = () => {
    toast.success(`Downloading ${photo.filename}...`)
  }

  const handleShare = () => {
    toast.success("Share link copied to clipboard!")
  }

  const handleFavorite = () => {
    toast.success("Added to favorites!")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-hidden p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="relative flex-1 bg-black">
            <img
              src={photo.url}
              alt={photo.filename}
              className="h-full max-h-[60vh] w-full object-contain lg:max-h-[80vh]"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 bg-black/50 text-white hover:bg-black/70"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Details Section */}
          <div className="w-full border-l border-border bg-card p-6 lg:w-80">
            <div className="space-y-6">
              {/* Filename & Size */}
              <div>
                <h3 className="text-lg font-semibold text-foreground">{photo.filename}</h3>
                <p className="text-sm text-muted-foreground">{photo.size}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={handleFavorite}>
                  <Heart className="mr-2 h-4 w-4" />
                  Favorite
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button size="sm" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>

              <Separator />

              {/* Metadata */}
              <div className="space-y-4">
                {/* Date */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="text-sm font-medium text-foreground">
                      {new Date(photo.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
                    <MapPin className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium text-foreground">{photo.location}</p>
                  </div>
                </div>

                {/* Event */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
                    <Tag className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Event</p>
                    <p className="text-sm font-medium text-foreground">{photo.event}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* People */}
              {photo.persons.length > 0 && (
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">People</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {photo.persons.map((person) => (
                      <Badge key={person} variant="secondary" className="bg-primary/10 text-primary">
                        {person}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {photo.tags.length > 0 && (
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {photo.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, Download, Trash2, MoreVertical, Heart, Share2 } from "lucide-react"
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

interface PhotoCardProps {
  photo: Photo
  onView: (photo: Photo) => void
  onDelete: (id: string) => void
}

export function PhotoCard({ photo, onView, onDelete }: PhotoCardProps) {
  const handleShare = () => {
    toast.success("Share link copied to clipboard!")
  }

  const handleFavorite = () => {
    toast.success("Added to favorites!")
  }

  const handleDownload = () => {
    toast.success(`Downloading ${photo.filename}...`)
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={photo.thumbnail}
          alt={photo.filename}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        
        {/* Quick Actions - Top Right */}
        <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-white/90 shadow-sm hover:bg-white"
            onClick={handleFavorite}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-white/90 shadow-sm hover:bg-white"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Quick Actions - Bottom */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 shadow-sm hover:bg-white"
            onClick={() => onView(photo)}
          >
            <Eye className="mr-1 h-4 w-4" />
            View
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-white/90 shadow-sm hover:bg-white"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{photo.filename}</p>
            <p className="text-xs text-muted-foreground">{photo.size}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(photo)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(photo.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Tags & Persons */}
        {(photo.persons.length > 0 || photo.tags.length > 0) && (
          <div className="mt-2 flex flex-wrap gap-1">
            {photo.persons.slice(0, 2).map((person) => (
              <Badge key={person} variant="secondary" className="bg-primary/10 text-primary text-xs">
                {person}
              </Badge>
            ))}
            {photo.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

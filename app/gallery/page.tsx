"use client"

import { useState, useMemo } from "react"
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar"
import { GalleryFilters } from "@/components/gallery/gallery-filters"
import { PhotoCard } from "@/components/gallery/photo-card"
import { PhotoDetailModal } from "@/components/gallery/photo-detail-modal"
import { FaceLabelModal } from "@/components/gallery/face-label-modal"
import { Empty } from "@/components/ui/empty"
import { mockPhotos } from "@/lib/mock-data"
import { toast } from "sonner"
import { ImageOff } from "lucide-react"

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

export default function GalleryPage() {
  const [search, setSearch] = useState("")
  const [eventFilter, setEventFilter] = useState("all")
  const [personFilter, setPersonFilter] = useState("all")
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [showPhotoModal, setShowPhotoModal] = useState(false)
  const [showFaceModal, setShowFaceModal] = useState(false)
  const [photos, setPhotos] = useState(mockPhotos)

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      // Search filter
      const matchesSearch =
        !search ||
        photo.filename.toLowerCase().includes(search.toLowerCase()) ||
        photo.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())) ||
        photo.persons.some((person) => person.toLowerCase().includes(search.toLowerCase())) ||
        photo.event.toLowerCase().includes(search.toLowerCase()) ||
        photo.location.toLowerCase().includes(search.toLowerCase())

      // Event filter
      const matchesEvent =
        eventFilter === "all" ||
        photo.event.toLowerCase().replace(/\s+/g, "-") === eventFilter

      // Person filter
      const matchesPerson =
        personFilter === "all" ||
        photo.persons.some((person) => person.toLowerCase() === personFilter)

      return matchesSearch && matchesEvent && matchesPerson
    })
  }, [photos, search, eventFilter, personFilter])

  const handleViewPhoto = (photo: Photo) => {
    setSelectedPhoto(photo)
    setShowPhotoModal(true)
  }

  const handleDeletePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id))
    toast.success("Photo deleted successfully")
  }

  const handleUploadClick = () => {
    toast.info("Upload modal would open here")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">My Photos</h1>
            <p className="mt-1 text-muted-foreground">
              {photos.length} photos in your collection
            </p>
          </div>

          {/* Filters */}
          <GalleryFilters
            search={search}
            onSearchChange={setSearch}
            eventFilter={eventFilter}
            onEventFilterChange={setEventFilter}
            personFilter={personFilter}
            onPersonFilterChange={setPersonFilter}
            onUploadClick={handleUploadClick}
            onLabelFacesClick={() => setShowFaceModal(true)}
          />

          {/* Photo Grid */}
          {filteredPhotos.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  onView={handleViewPhoto}
                  onDelete={handleDeletePhoto}
                />
              ))}
            </div>
          ) : (
            <Empty
              icon={ImageOff}
              title="No photos found"
              description="Try adjusting your search or filters to find what you're looking for."
            />
          )}
        </div>
      </main>

      {/* Modals */}
      <PhotoDetailModal
        photo={selectedPhoto}
        open={showPhotoModal}
        onOpenChange={setShowPhotoModal}
      />

      <FaceLabelModal open={showFaceModal} onOpenChange={setShowFaceModal} />
    </div>
  )
}

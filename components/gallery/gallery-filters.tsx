"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Upload, UserCircle, SlidersHorizontal, X } from "lucide-react"

interface GalleryFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  eventFilter: string
  onEventFilterChange: (value: string) => void
  personFilter: string
  onPersonFilterChange: (value: string) => void
  onUploadClick: () => void
  onLabelFacesClick: () => void
}

const events = [
  "All Events",
  "Diwali 2022",
  "Summer Vacation",
  "Birthday Party",
  "Mountain Trek",
  "Wedding",
  "Team Meeting",
  "Graduation",
]

const persons = [
  "All People",
  "Pramodh",
  "Grandma",
  "Alex",
  "Sarah",
  "Friends",
  "Family",
]

export function GalleryFilters({
  search,
  onSearchChange,
  eventFilter,
  onEventFilterChange,
  personFilter,
  onPersonFilterChange,
  onUploadClick,
  onLabelFacesClick,
}: GalleryFiltersProps) {
  const hasActiveFilters = search || eventFilter !== "all" || personFilter !== "all"

  const clearFilters = () => {
    onSearchChange("")
    onEventFilterChange("all")
    onPersonFilterChange("all")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search photos..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" onClick={onLabelFacesClick}>
            <UserCircle className="mr-2 h-4 w-4" />
            Label Faces
          </Button>
          <Button onClick={onUploadClick}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Photos
          </Button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters:</span>
        </div>

        <Select value={eventFilter} onValueChange={onEventFilterChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Event" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            {events.slice(1).map((event) => (
              <SelectItem key={event} value={event.toLowerCase().replace(/\s+/g, "-")}>
                {event}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={personFilter} onValueChange={onPersonFilterChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Person" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All People</SelectItem>
            {persons.slice(1).map((person) => (
              <SelectItem key={person} value={person.toLowerCase()}>
                {person}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
            <X className="mr-1 h-4 w-4" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  )
}

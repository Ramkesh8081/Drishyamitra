"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Image, Calendar, Heart, Share2 } from "lucide-react"
import { mockDashboardStats } from "@/lib/mock-data"

const stats = [
  {
    label: "Total Photos",
    value: mockDashboardStats.totalPhotos.toLocaleString(),
    icon: Image,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "This Month",
    value: mockDashboardStats.thisMonth.toString(),
    icon: Calendar,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    label: "Favorites",
    value: mockDashboardStats.favorites.toString(),
    icon: Heart,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
  {
    label: "Shared",
    value: mockDashboardStats.shared.toString(),
    icon: Share2,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
]

interface DashboardStatsProps {
  isLoading?: boolean
}

export function DashboardStats({ isLoading = false }: DashboardStatsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border/50 transition-shadow hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

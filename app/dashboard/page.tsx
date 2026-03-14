"use client"

import { useState, useEffect } from "react"
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar"
import { WelcomeBanner } from "@/components/dashboard/welcome-banner"
import { ActionCards } from "@/components/dashboard/action-cards"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { UploadDropzone } from "@/components/dashboard/upload-dropzone"
import { RecentPhotos } from "@/components/dashboard/recent-photos"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Welcome Banner */}
          <WelcomeBanner />

          {/* Action Cards */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Quick Actions</h2>
            <ActionCards />
          </section>

          {/* Stats */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Overview</h2>
            <DashboardStats isLoading={isLoading} />
          </section>

          {/* Two Column Layout */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Upload Dropzone */}
            <div className="lg:col-span-1">
              <UploadDropzone />
            </div>

            {/* Recent Photos */}
            <div className="lg:col-span-2">
              <RecentPhotos isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

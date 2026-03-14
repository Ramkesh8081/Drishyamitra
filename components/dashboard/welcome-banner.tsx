import { Card, CardContent } from "@/components/ui/card"
import { mockUsers, mockDashboardStats } from "@/lib/mock-data"
import { Image, HardDrive } from "lucide-react"

export function WelcomeBanner() {
  const user = mockUsers[0]
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Card className="overflow-hidden border-border/50 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Welcome Message */}
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              Welcome back, {user.username}!
            </h1>
            <p className="mt-1 text-muted-foreground">
              Your photo collection is looking great. Keep capturing memories!
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{today}</p>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Image className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {mockDashboardStats.totalPhotos.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Photos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <HardDrive className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {mockDashboardStats.storageUsed}
                </p>
                <p className="text-sm text-muted-foreground">
                  of {mockDashboardStats.storageTotal}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

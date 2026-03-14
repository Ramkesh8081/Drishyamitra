import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar"
import { DeliveryHistoryTable } from "@/components/history/delivery-history-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle2, XCircle, Clock } from "lucide-react"
import { mockDeliveryHistory } from "@/lib/mock-data"

export default function HistoryPage() {
  const stats = {
    total: mockDeliveryHistory.length,
    sent: mockDeliveryHistory.filter((d) => d.status === "sent").length,
    failed: mockDeliveryHistory.filter((d) => d.status === "failed").length,
    pending: mockDeliveryHistory.filter((d) => d.status === "pending").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Delivery History</h1>
            <p className="mt-1 text-muted-foreground">
              Track all your shared photos and email deliveries
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border/50">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Deliveries</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.sent}</p>
                  <p className="text-sm text-muted-foreground">Sent Successfully</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                  <Clock className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
                  <XCircle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.failed}</p>
                  <p className="text-sm text-muted-foreground">Failed</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* History Table */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Recent Deliveries</h2>
            <DeliveryHistoryTable />
          </div>
        </div>
      </main>
    </div>
  )
}

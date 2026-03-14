import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Image, Palette, MessageSquare } from "lucide-react"

const actions = [
  {
    href: "/gallery",
    icon: Upload,
    title: "Upload",
    description: "Add new photos",
    color: "text-primary",
    bgColor: "bg-primary/10",
    hoverBg: "hover:bg-primary/5",
  },
  {
    href: "/gallery",
    icon: Image,
    title: "Gallery",
    description: "Browse collection",
    color: "text-accent",
    bgColor: "bg-accent/10",
    hoverBg: "hover:bg-accent/5",
  },
  {
    href: "/editor",
    icon: Palette,
    title: "Editor",
    description: "Edit your photos",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    hoverBg: "hover:bg-amber-500/5",
  },
  {
    href: "/chat",
    icon: MessageSquare,
    title: "AI Chat",
    description: "Search with AI",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    hoverBg: "hover:bg-rose-500/5",
  },
]

export function ActionCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((action) => (
        <Link key={action.title} href={action.href}>
          <Card className={`border-border/50 transition-all ${action.hoverBg} hover:shadow-md`}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${action.bgColor}`}>
                <action.icon className={`h-6 w-6 ${action.color}`} />
              </div>
              <div>
                <p className="font-semibold text-foreground">{action.title}</p>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

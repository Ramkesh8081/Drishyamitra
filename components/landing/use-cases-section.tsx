import { Heart, Camera, Building2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const useCases = [
  {
    icon: Heart,
    title: "Family Memories",
    description: "Keep all your family photos organized and easily searchable. Find that special moment from years ago in seconds.",
    gradient: "from-rose-500/10 to-pink-500/10",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-500",
  },
  {
    icon: Camera,
    title: "Event Photography",
    description: "Perfect for professional photographers managing large event galleries. Auto-tag faces and share with clients instantly.",
    gradient: "from-primary/10 to-indigo-500/10",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Building2,
    title: "Corporate Media Teams",
    description: "Manage your organization's visual assets efficiently. Control access, track usage, and maintain brand consistency.",
    gradient: "from-accent/10 to-teal-500/10",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
]

export function UseCasesSection() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Use Cases</span>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Built for everyone
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Whether you're preserving family memories or managing corporate assets, Drishyamitra adapts to your needs.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {useCases.map((useCase) => (
            <Card key={useCase.title} className="group overflow-hidden border-border/50 bg-card">
              <CardContent className="p-0">
                <div className={`bg-gradient-to-br ${useCase.gradient} p-6`}>
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${useCase.iconBg}`}>
                    <useCase.icon className={`h-7 w-7 ${useCase.iconColor}`} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-foreground">{useCase.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{useCase.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

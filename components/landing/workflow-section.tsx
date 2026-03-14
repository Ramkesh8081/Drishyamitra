import { Upload, UserCircle, Search } from "lucide-react"

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Photos",
    description: "Drag and drop your photos or select from your device. We support all major formats.",
  },
  {
    icon: UserCircle,
    step: "02",
    title: "Label Faces",
    description: "Our AI detects faces automatically. Simply name them once and never label again.",
  },
  {
    icon: Search,
    step: "03",
    title: "Search & Share Instantly",
    description: "Find any photo using natural language and share via email or WhatsApp in seconds.",
  },
]

export function WorkflowSection() {
  return (
    <section id="workflow" className="bg-secondary/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">How It Works</span>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Three simple steps to get started
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get up and running in minutes with our intuitive workflow.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((item, index) => (
            <div key={item.step} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-16 hidden h-px w-full bg-gradient-to-r from-primary/50 to-primary/10 md:block" />
              )}
              
              <div className="relative flex flex-col items-center text-center">
                {/* Step number badge */}
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {item.step}
                </div>
                
                {/* Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-card shadow-lg shadow-primary/10">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="mb-2 text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

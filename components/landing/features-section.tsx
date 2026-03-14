import { Users, FolderOpen, MessageSquare, Mail, Shield, History } from "lucide-react"
import { FeatureCard } from "./feature-card"

const features = [
  {
    icon: Users,
    title: "Face Recognition",
    description: "Automatically detect and label faces in your photos. Search by person name instantly.",
    iconColor: "text-primary",
  },
  {
    icon: FolderOpen,
    title: "Smart Photo Organization",
    description: "AI automatically tags, categorizes, and organizes your photos by events, locations, and dates.",
    iconColor: "text-accent",
  },
  {
    icon: MessageSquare,
    title: "AI Chat Assistant",
    description: "Ask questions in natural language to find photos. 'Show me beach photos from summer 2023.'",
    iconColor: "text-primary",
  },
  {
    icon: Mail,
    title: "Email & WhatsApp Sharing",
    description: "Share photos instantly via email or WhatsApp directly from the app with one click.",
    iconColor: "text-accent",
  },
  {
    icon: Shield,
    title: "Secure Storage",
    description: "Your photos are encrypted and stored securely. Full privacy control with sharing permissions.",
    iconColor: "text-primary",
  },
  {
    icon: History,
    title: "Delivery History",
    description: "Track all shared photos with complete delivery history, recipients, and timestamps.",
    iconColor: "text-accent",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Features</span>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Everything you need to manage photos
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful AI-driven tools to organize, search, and share your photo collection effortlessly.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

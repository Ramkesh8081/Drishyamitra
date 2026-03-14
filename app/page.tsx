import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { WorkflowSection } from "@/components/landing/workflow-section"
import { UseCasesSection } from "@/components/landing/use-cases-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        <UseCasesSection />
      </main>
      <Footer />
    </div>
  )
}

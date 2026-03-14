import Link from "next/link"
import { Camera, Sparkles, Image, Share2 } from "lucide-react"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding Panel */}
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 lg:block">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
          
          {/* Floating icons */}
          <div className="absolute top-1/4 left-1/4 animate-bounce opacity-20" style={{ animationDelay: "0s", animationDuration: "3s" }}>
            <Camera className="h-10 w-10 text-white" />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-bounce opacity-20" style={{ animationDelay: "0.5s", animationDuration: "3s" }}>
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div className="absolute bottom-1/3 left-1/3 animate-bounce opacity-20" style={{ animationDelay: "1s", animationDuration: "3s" }}>
            <Image className="h-8 w-8 text-white" />
          </div>
          <div className="absolute bottom-1/4 right-1/3 animate-bounce opacity-20" style={{ animationDelay: "1.5s", animationDuration: "3s" }}>
            <Share2 className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="relative flex h-full flex-col items-center justify-center px-12 text-center">
          {/* Logo */}
          <Link href="/" className="mb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <Camera className="h-10 w-10 text-white" />
            </div>
          </Link>

          <h1 className="text-4xl font-bold text-white">Drishyamitra</h1>
          <p className="mt-2 text-xl text-white/80">Your Intelligent Photo Assistant</p>
          
          <p className="mt-8 max-w-md text-white/60">
            Transform how you manage photos with AI-powered organization, face recognition, 
            and instant sharing capabilities.
          </p>

          {/* Feature Pills */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {["AI-Powered", "Face Recognition", "Smart Search", "Instant Sharing"].map((feature) => (
              <span
                key={feature}
                className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full flex-col bg-background lg:w-1/2">
        {/* Mobile Header */}
        <div className="flex items-center justify-center border-b border-border p-4 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Camera className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Drishyamitra</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
          {children}
        </div>
      </div>
    </div>
  )
}

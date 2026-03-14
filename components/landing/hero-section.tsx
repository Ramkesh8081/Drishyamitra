"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Camera, Sparkles, Image, Share2, Play, Brain, Cloud } from "lucide-react"

const floatingIcons = [
  { Icon: Camera, className: "top-20 left-[15%] animate-bounce", delay: "0s" },
  { Icon: Image, className: "top-32 right-[20%] animate-bounce", delay: "0.5s" },
  { Icon: Sparkles, className: "bottom-32 left-[10%] animate-bounce", delay: "1s" },
  { Icon: Share2, className: "bottom-20 right-[15%] animate-bounce", delay: "1.5s" },
  { Icon: Brain, className: "top-48 left-[25%] animate-bounce", delay: "0.75s" },
  { Icon: Cloud, className: "top-16 right-[30%] animate-bounce", delay: "1.25s" },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        
        {/* Floating Icons */}
        {floatingIcons.map(({ Icon, className, delay }, index) => (
          <div
            key={index}
            className={`absolute hidden opacity-20 lg:block ${className}`}
            style={{ animationDelay: delay, animationDuration: "3s" }}
          >
            <Icon className="h-8 w-8 text-white" />
          </div>
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          {/* Logo Badge */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 shadow-lg backdrop-blur-sm">
            <Camera className="h-10 w-10 text-white" />
          </div>

          {/* Title */}
          <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Drishyamitra
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-xl font-medium text-white/90 sm:text-2xl">
            Your Intelligent Photo Assistant
          </p>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-white/75">
            Transform how you manage photos with AI-powered organization, face recognition, 
            natural language search, and instant sharing. Perfect for photographers, families, 
            and organizations.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="h-12 w-full bg-white px-8 text-primary hover:bg-white/90 sm:w-auto"
            >
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-12 w-full border-white/30 bg-white/10 px-8 text-white backdrop-blur-sm hover:bg-white/20 sm:w-auto"
            >
              <Link href="#demo" className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Watch Demo
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-white/60">
            <span>No credit card required</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:block" />
            <span>Free 5GB storage</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:block" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  )
}

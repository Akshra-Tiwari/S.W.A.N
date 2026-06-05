"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { WhyMattersSection } from "@/components/sections/why-matters-section"
import { ReportProcessSection } from "@/components/sections/report-process-section"
import { MapSection } from "@/components/sections/map-section"
import { InsightsSection } from "@/components/sections/insights-section"
import { GamificationSection } from "@/components/sections/gamification-section"
import { FinalCtaSection } from "@/components/sections/final-cta-section"
import { Footer } from "@/components/footer"
import { AuthModal } from "@/components/auth-modal"

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const handleSubmitIssue = () => {
    setIsAuthModalOpen(true)
  }

  const handleExploreMap = () => {
    const mapSection = document.getElementById("map-section")
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <>
      <Navbar />
      <main className="w-full">
        <HeroSection />
        <WhyMattersSection />
        <ReportProcessSection />
        <MapSection />
        <InsightsSection />
        <GamificationSection />
        <FinalCtaSection onSubmitIssue={handleSubmitIssue} onExploreMap={handleExploreMap} />
        <Footer />
      </main>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}

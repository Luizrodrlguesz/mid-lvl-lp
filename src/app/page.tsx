"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useMotionValueEvent, useScroll } from "framer-motion"
import { BackgroundCanvas } from "@/components/background-canvas"
import { HorizontalScrollGallery } from "@/components/horizontal-scroll-gallery"
import { PortfolioHeader } from "@/components/portfolio-header"
import { defaultSections } from "@/components/site-header"
import { PortfolioHero } from "@/components/portfolio-hero"
import { ProjectsSection } from "@/components/projects/projects-section"
import { SecondPageAboutSection } from "@/components/second-page-about-section"
import { LanguageSwitcher } from "@/components/language-switcher"
import { BackToTop } from "@/components/back-to-top"
import { SecondPageContactSection } from "@/components/second-page-contact-section"
import { LoadingScreen } from "@/components/loading-screen"
import { useT } from "@/lib/i18n"
import { cn } from "@/lib/utils"


export default function Home() {
  const [particleScroll, setParticleScroll] = useState(0)

  const t = useT()
  const [loading, setLoading] = useState(true)
  const headerItems = useMemo(
    () => defaultSections.map((id) => ({ id, label: t.nav[id] })),
    [t],
  )

  const { scrollYProgress: pageScrollProgress } = useScroll()
  useMotionValueEvent(pageScrollProgress, "change", (latest) => {
    setParticleScroll(latest)
  })

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timeout)
  }, [])

  const scrollToSection = useCallback((sectionId: string, offset = 8) => {
    const el = document.getElementById(sectionId)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" })
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BackgroundCanvas scrollProgress={particleScroll} />
      <LoadingScreen show={loading} />
      <div
        className={cn(
          "transition-opacity duration-300",
          loading ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <PortfolioHeader
          items={headerItems}
          onNavigateToSection={(sectionId) =>
            scrollToSection(sectionId, sectionId === "inicio" ? 0 : 80)
          }
        />

        {/*
          HERO — mesma camada do início do about (azul no light, preta no dark).
          No lg+ não recorta: o traço do cometa sai pela direita já no topo do about.
        */}
        <section
          id="inicio"
          className="relative z-20 h-screen w-full overflow-hidden bg-[#58a1fc]/85 lg:overflow-visible dark:bg-black/85"
        >
          <PortfolioHero onNavigateToSection={scrollToSection} />
        </section>

        <div className="relative z-10">
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#58a1fc]/85 to-transparent dark:from-black/85"
            aria-hidden="true"
          />

          <SecondPageAboutSection />

          <section
            id="habilidades"
            aria-labelledby="heading-habilidades"
            className="relative z-10 border-border/60 bg-transparent"
          >
            <HorizontalScrollGallery />
          </section>
        </div>

        <section
          id="projetos"
          aria-labelledby="heading-projetos"
          className="relative z-10 border-border/60 bg-transparent px-6 py-24"
        >
          <ProjectsSection className="max-w-[92vw]" />
        </section>

        <SecondPageContactSection />

        <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
          <LanguageSwitcher />
          <BackToTop />
        </div>
      </div>
    </div>
  )
}

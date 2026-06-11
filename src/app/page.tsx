"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion"
import { ArrowDown } from "lucide-react"
import { BackgroundCanvas } from "@/components/background-canvas"
import { Aurora, DEFAULT_COLOR_STOPS } from "@/components/aurora"
import { HorizontalScrollGallery } from "@/components/horizontal-scroll-gallery"
import { PortfolioHeader } from "@/components/portfolio-header"
import {
  PortfolioHeroIntro,
  PortfolioHeroOrbital,
} from "@/components/portfolio-hero-intro"
import { ProjectsSection } from "@/components/projects/projects-section"
import { SecondPageAboutSection } from "@/components/second-page-about-section"
import {
  LanguageSwitcher,
  type Locale,
} from "@/components/language-switcher"
import { BackToTop } from "@/components/back-to-top"
import { SecondPageContactSection } from "@/components/second-page-contact-section"
import { LoadingScreen } from "@/components/loading-screen"
import { cn } from "@/lib/utils"

const ZOOM_MIN = 1
const ZOOM_MAX = 1.58
/** Altura total do hero em vh (sticky + trilho). O runway útil ≈ (valor − 100) vh. */
const HERO_SCROLL_TRACK_VH = 158
/** Suaviza o zoom só ao voltar pro topo (scroll up); descendo, acompanha o scroll sem atraso. */
const ZOOM_RETURN_SPRING = { type: "spring", stiffness: 88, damping: 28 } as const

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [particleScroll, setParticleScroll] = useState(0)

  const [locale, setLocale] = useState<Locale>("pt-br")
  const [loading, setLoading] = useState(true)
  const headerItems = useMemo(
    () => [
      { id: "inicio", label: "Início" },
      { id: "sobre", label: "Sobre" },
      { id: "habilidades", label: "Habilidades" },
      { id: "projetos", label: "Projetos" },
      { id: "contato", label: "Contato" },
    ],
    [],
  )

  const { scrollYProgress: pageScrollProgress } = useScroll()
  useMotionValueEvent(pageScrollProgress, "change", (latest) => {
    setParticleScroll(latest)
  })

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timeout)
  }, [])

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const rawScale = useTransform(heroScrollProgress, [0, 1], [ZOOM_MIN, ZOOM_MAX])
  const scale = useMotionValue(ZOOM_MIN)
  const opacity = useTransform(heroScrollProgress, [0, 1], [1, 0])

  const previousProgressRef = useRef(0)
  useMotionValueEvent(rawScale, "change", (latest) => {
    const progress = heroScrollProgress.get()
    if (progress >= previousProgressRef.current) {
      scale.jump(latest)
    } else {
      animate(scale, latest, ZOOM_RETURN_SPRING)
    }
    previousProgressRef.current = progress
  })

  const scrollToSection = useCallback((sectionId: string, offset = 8) => {
    const el = document.getElementById(sectionId)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" })
  }, [])

  const scrollToNextSection = useCallback(() => {
    scrollToSection("sobre")
  }, [scrollToSection])

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
          locale={locale}
          items={headerItems}
          onNavigateToSection={(sectionId) =>
            scrollToSection(sectionId, sectionId === "inicio" ? 0 : 80)
          }
        />

        {/*
          ========================================
          SCROLL ZOOM HERO — Aurora + parede preta (cobre o canvas)
          ========================================
        */}
        <div
          id="inicio"
          ref={containerRef}
          className="relative z-10 bg-[#58a1fc]/85 dark:bg-black/85"
          style={{ height: `${HERO_SCROLL_TRACK_VH}vh` }}
        >
          <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Aurora
                colorStops={[...DEFAULT_COLOR_STOPS]}
                amplitude={0.4}
                blend={0.5}
                speed={0.8}
              />
            </div>

            <motion.div
              className="relative z-10 mx-auto w-full max-w-5xl px-6 lg:max-w-6xl"
              style={{
                scale,
                opacity,
                willChange: "transform, opacity",
              }}
            >
              <div className="grid items-center gap-12 py-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.9fr)] lg:gap-16 xl:gap-20">
                <PortfolioHeroIntro onNavigateToSection={scrollToSection} />
                <PortfolioHeroOrbital className="hidden justify-self-center md:block lg:justify-self-end" />
              </div>
            </motion.div>

            <motion.a
              href="#sobre"
              onClick={(e) => {
                e.preventDefault()
                scrollToNextSection()
              }}
              className="absolute bottom-12 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2 rounded-lg px-3 py-2 text-white/50 outline-offset-4 transition-colors hover:text-white/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="text-xs uppercase tracking-widest">
                Continuar
              </span>
              <motion.span
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              >
                <ArrowDown className="h-5 w-5" />
              </motion.span>
            </motion.a>
          </div>
        </div>

        <div className="relative z-10">
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#58a1fc]/85 to-transparent dark:from-black/85"
            aria-hidden="true"
          />

          <SecondPageAboutSection locale={locale} />

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
          <LanguageSwitcher value={locale} onChange={setLocale} />
          <BackToTop />
        </div>
      </div>
    </div>
  )
}

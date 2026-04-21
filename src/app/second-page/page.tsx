"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { ArrowDown } from "lucide-react"
import { BackgroundCanvas } from "@/components/background-canvas"
import { Aurora, DEFAULT_COLOR_STOPS } from "@/components/aurora"
import { HorizontalScrollGallery } from "@/components/horizontal-scroll-gallery"
import { PortfolioHeader } from "@/components/portfolio-header"
import { PortfolioHeroAvatar } from "@/components/portfolio-hero-avatar"
import { PortfolioHeroIntro } from "@/components/portfolio-hero-intro"
import { ProjectsSection } from "@/components/projects/projects-section"
import { SecondPageAboutSection } from "@/components/second-page-about-section"
import {
  LanguageSwitcher,
  type Locale,
} from "@/components/language-switcher"
import { BackToTop } from "@/components/back-to-top"
import { SecondPageContactSection } from "@/components/second-page-contact-section"
import { SiteFooter } from "@/components/site-footer"
import { LoadingScreen } from "@/components/loading-screen"
import { cn } from "@/lib/utils"

/** Fração do zoom total só com wheel (portão fechado); o resto vem do scroll no trilho do hero. */
const ZOOM_FIRST_PHASE_RATIO = 0.35
const ZOOM_MIN = 1
const ZOOM_MAX = 1.58
const ZOOM_WHEEL_SENS = 0.0022
/**
 * Altura total do hero em vh (sticky + trilho). O runway útil ≈ (valor − 100) vh.
 * Ajustado em conjunto com `HERO_ZOOM_COMPLETES_AT` para manter a mesma distância de scroll
 * até o zoom máximo e acrescentar uma “pausa” no fim.
 */
const HERO_SCROLL_TRACK_VH = 158
/**
 * Fracção do progresso de scroll no hero (0–1) em que o zoom já está no máximo.
 * O restante do trilho consome scroll sem mudar escala — evita saltar logo para a secção seguinte.
 */
const HERO_ZOOM_COMPLETES_AT = 0.7

export default function SecondPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  /** True depois que o utilizador desceu o suficiente; ao voltar ao topo do hero, o zoom em duas fases reinicia. */
  const hasLeftHeroStart = useRef(false)
  const [particleScroll, setParticleScroll] = useState(0)

  const zoomLockProgress = useMotionValue(0)
  const zoomGateOpen = useMotionValue(0)
  const [locale, setLocale] = useState<Locale>("pt-br")
  const [loading, setLoading] = useState(true)
  const headerItems = useMemo(
    () => [
      { id: "hero", label: "Início" },
      { id: "sobre", label: "Sobre" },
      { id: "variacoes", label: "Projetos" },
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

  const rawScale = useTransform(() => {
    const gate = zoomGateOpen.get()
    const lock = zoomLockProgress.get()
    const scroll = heroScrollProgress.get()
    const span = ZOOM_MAX - ZOOM_MIN
    if (gate < 0.5) {
      return ZOOM_MIN + span * ZOOM_FIRST_PHASE_RATIO * lock
    }
    const zoomScroll = Math.min(1, scroll / HERO_ZOOM_COMPLETES_AT)
    return (
      ZOOM_MIN +
      span * ZOOM_FIRST_PHASE_RATIO +
      span * (1 - ZOOM_FIRST_PHASE_RATIO) * zoomScroll
    )
  })

  const scale = useSpring(rawScale, { stiffness: 88, damping: 28 })
  /** Opacidade acompanha o zoom em todo o percurso (wheel + scroll), não só no fim do trilho. */
  const opacity = useTransform(scale, (s) => {
    const t = (s - ZOOM_MIN) / (ZOOM_MAX - ZOOM_MIN)
    return Math.max(0, Math.min(1, 1 - t))
  })

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      const y = window.scrollY
      const hp = heroScrollProgress.get()

      if (y > 72 || hp > 0.06) {
        hasLeftHeroStart.current = true
      }

      if (hasLeftHeroStart.current && y < 28 && hp < 0.08) {
        zoomGateOpen.set(0)
        zoomLockProgress.set(0)
        hasLeftHeroStart.current = false
      }

      if (zoomGateOpen.get() < 0.5 && y > 0) {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" })
        })
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
    }
  }, [heroScrollProgress, zoomGateOpen, zoomLockProgress])

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (zoomGateOpen.get() >= 0.5) return
      if (window.scrollY > 1) return

      if (e.deltaY < 0) {
        const lock = zoomLockProgress.get()
        if (lock > 0) {
          e.preventDefault()
          zoomLockProgress.set(Math.max(0, lock + e.deltaY * ZOOM_WHEEL_SENS))
        }
        return
      }

      e.preventDefault()
      const lock = zoomLockProgress.get()
      const next = Math.min(1, lock + e.deltaY * ZOOM_WHEEL_SENS)
      zoomLockProgress.set(next)
      if (next >= 1) zoomGateOpen.set(1)
    }
    window.addEventListener("wheel", onWheel, { passive: false })
    return () => window.removeEventListener("wheel", onWheel)
  }, [zoomGateOpen, zoomLockProgress])

  const unlockScrollAndGoTo = useCallback(
    (sectionId: string) => {
      zoomLockProgress.set(1)
      zoomGateOpen.set(1)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(sectionId)
          if (!el) return
          const top = el.getBoundingClientRect().top + window.scrollY - 8
          window.scrollTo({ top: Math.max(0, top), behavior: "smooth" })
        })
      })
    },
    [zoomGateOpen, zoomLockProgress],
  )

  const scrollToNextSection = useCallback(() => {
    unlockScrollAndGoTo("sobre")
  }, [unlockScrollAndGoTo])

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <LoadingScreen show={loading} />
      <div
        className={cn(
          "transition-opacity duration-300",
          loading ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
      <BackgroundCanvas scrollProgress={particleScroll} />
      <PortfolioHeader locale={locale} items={headerItems} />

      {/* 
        ========================================
        SCROLL ZOOM HERO — Aurora + parede preta (cobre o canvas)
        ========================================
      */}
      <div
        id="hero"
        ref={containerRef}
        className="relative z-10 bg-black"
        style={{ height: `${HERO_SCROLL_TRACK_VH}vh` }}
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
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
              <PortfolioHeroIntro onNavigateToSection={unlockScrollAndGoTo} />
              <PortfolioHeroAvatar className="justify-self-center lg:justify-self-end" />
            </div>
          </motion.div>

          {/* Link para próxima section (libera scroll + zoom por rolagem) */}
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
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black to-transparent"
          aria-hidden="true"
        />

      <SecondPageAboutSection locale={locale} />

      <section
        id="variacoes"
        aria-labelledby="heading-variacoes"
        className="relative z-10  border-border/60 bg-transparent"
      >
        <HorizontalScrollGallery />
      </section>
      </div>

      <section
        id="camadas-conteudo"
        aria-labelledby="heading-camadas"
        className="relative z-10  border-border/60 bg-transparent py-24 px-6"
      >
        <ProjectsSection className="max-w-[92vw]" />
      </section>

      <SecondPageContactSection />

      <SiteFooter />

      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
        <LanguageSwitcher value={locale} onChange={setLocale} />
        <BackToTop />
      </div>
      </div>
    </div>
  )
}

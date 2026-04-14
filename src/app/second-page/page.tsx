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
import type { Locale } from "@/components/language-switcher"

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
  const locale: Locale = "pt-br"
  const headerItems = useMemo(
    () => [
      { id: "hero", label: "Início" },
      { id: "como-usar", label: "Sobre" },
      { id: "variacoes", label: "Projetos" },
      { id: "props", label: "Contato" },
    ],
    [],
  )

  const { scrollYProgress: pageScrollProgress } = useScroll()
  useMotionValueEvent(pageScrollProgress, "change", (latest) => {
    setParticleScroll(latest)
  })

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
    unlockScrollAndGoTo("como-usar")
  }, [unlockScrollAndGoTo])

  return (
    <div className="relative min-h-screen overflow-x-hidden">
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
            href="#como-usar"
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

      <section
        id="como-usar"
        aria-labelledby="heading-como-usar"
        className="relative z-10 border-t border-white/10  py-24 px-6 text-zinc-100"
      >
        <div className="mx-auto max-w-6xl space-y-6">
          <h2 id="heading-como-usar" className="text-3xl font-bold text-white">
            Como usar
          </h2>
            <p className="text-zinc-400">
              O componente funciona dentro de qualquer container com{" "}
              <code className="rounded bg-white/10 px-1 py-0.5 text-sm text-zinc-200">
                w-full h-full
              </code>
              :
            </p>

            {/* Código de exemplo */}
            <div className="p-6 rounded-xl bg-muted font-mono text-sm overflow-x-auto">
              <pre className="text-foreground">
{`{/* Exemplo 1: Viewport inteiro (padrão típico) */}
<div className="relative h-screen w-full">
  <Aurora
    colorStops={["#008594", "#0264DB", "#014C4F", "#0A368A"]}
    amplitude={0.4}
    blend={0.5}
  />
</div>

{/* Exemplo 2: Container específico */}
<div className="w-full h-96 relative">
  <Aurora
    colorStops={["#0ea5e9", "#06b6d4", "#3b82f6"]}
    amplitude={0.5}
    blend={0.6}
  />
</div>

{/* Exemplo 3: Full screen */}
<div className="w-full h-screen relative">
  <Aurora
    colorStops={["#22c55e", "#16a34a", "#059669"]}
    amplitude={0.3}
    blend={0.4}
  />
</div>`}
              </pre>
            </div>
        </div>
      </section>

      <section
        id="variacoes"
        aria-labelledby="heading-variacoes"
        className="relative z-10 border-t border-border/60 bg-transparent"
      >
        <HorizontalScrollGallery />
      </section>
      </div>

      <section
        id="camadas-conteudo"
        aria-labelledby="heading-camadas"
        className="relative z-10 border-t border-border/60 bg-transparent py-24 px-6"
      >
        <ProjectsSection />
      </section>

      <section
        id="stack"
        aria-labelledby="heading-stack"
        className="relative z-10 border-t border-border/60 bg-transparent py-24 px-6"
      >
        <div className="mx-auto max-w-6xl space-y-6">
          <h2 id="heading-stack" className="text-3xl font-bold">
            Stack e renderização
          </h2>
          <p className="max-w-3xl text-muted-foreground">
            O efeito roda em <strong className="font-medium text-foreground">WebGL 2</strong> via{" "}
            <a
              href="https://github.com/oframe/ogl"
              className="text-primary underline-offset-4 hover:underline"
            >
              OGL
            </a>
            : um triângulo em tela cheia e um fragment shader com ruído simplex, igual ao padrão do
            React Bits. O componente é <code className="rounded bg-muted px-1 py-0.5 text-sm">use client</code>{" "}
            porque precisa do <code className="rounded bg-muted px-1 py-0.5 text-sm">canvas</code> no
            browser.
          </p>
          <p className="max-w-3xl text-muted-foreground">
            Em dispositivos sem WebGL 2 o contexto pode falhar silenciosamente; em produção vale
            prever um fundo sólido ou gradiente CSS como fallback se o seu público incluir browsers
            muito antigos.
          </p>
        </div>
      </section>

      <section
        id="landing-ideas"
        aria-labelledby="heading-landing"
        className="relative z-10 border-t border-border/60 bg-transparent py-24 px-6"
      >
        <div className="mx-auto max-w-6xl space-y-6">
          <h2 id="heading-landing" className="text-3xl font-bold">
            Onde usar na landing
          </h2>
          <p className="max-w-3xl text-muted-foreground">
            Alguns encaixes comuns para um fundo orgânico como este:
          </p>
          <ul className="max-w-3xl list-inside list-disc space-y-3 text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Hero acima da dobra</span> — headline,
              subtexto e CTA primário, como nesta página.
            </li>
            <li>
              <span className="font-medium text-foreground">Bloco de prova social</span> — faixa mais
              baixa (<code className="rounded bg-muted px-1 py-0.5 text-sm">h-64</code> a{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-sm">h-96</code>) só para dar
              atmosfera atrás de logos ou depoimentos.
            </li>
            <li>
              <span className="font-medium text-foreground">Pré-footer</span> — transição suave
              antes do rodapé escuro, com <code className="rounded bg-muted px-1 py-0.5 text-sm">blend</code>{" "}
              mais alto para o degradê sumir devagar.
            </li>
          </ul>
        </div>
      </section>

      <section
        id="props"
        aria-labelledby="heading-props"
        className="relative z-10 border-t border-border/60 bg-transparent py-24 px-6"
      >
        <div className="mx-auto max-w-6xl space-y-6">
          <h2 id="heading-props" className="text-3xl font-bold">
            Props
          </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-border bg-card">
                <code className="text-sm font-semibold text-violet-500">colorStops</code>
                <p className="text-sm text-muted-foreground mt-1">
                  Até 4 cores ao longo do eixo horizontal. Padrão: tons de azul/teal. Ex:{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">
                    {`["#008594", …, "#0A368A"]`}
                  </code>
                </p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card">
                <code className="text-sm font-semibold text-blue-500">amplitude</code>
                <p className="text-sm text-muted-foreground mt-1">
                  Intensidade do movimento das ondas (0-1). Padrão: 0.4
                </p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card">
                <code className="text-sm font-semibold text-emerald-500">blend</code>
                <p className="text-sm text-muted-foreground mt-1">
                  Opacidade do blend das cores (0-1). Padrão: 0.5
                </p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card">
                <code className="text-sm font-semibold text-amber-500">speed</code>
                <p className="text-sm text-muted-foreground mt-1">
                  Velocidade da animação. Padrão: 1
                </p>
              </div>
            </div>
        </div>
      </section>
    </div>
  )
}

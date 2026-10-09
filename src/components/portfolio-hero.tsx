"use client"

import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useTheme } from "next-themes"

import GradientText from "@/components/gradient-text"
import { HeroCometPath } from "@/components/hero-comet-path"
import { HeroPhotoReveal } from "@/components/hero-photo-reveal"
import { HeroTechStack } from "@/components/hero-tech-stack"
import { PulsatingBorder } from "@/components/pulsating-border"
import SplitText from "@/components/split-text"
import { MOCK_PROJECTS } from "@/data/projects"
import { experiences } from "@/lib/content"
import { useT } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const HERO_TEXT_ANIMATION_DELAY = 3.15
const HERO_GRADIENT_TEXT_DELAY_MS = 4550
const HERO_PROFILE_SRC = "/assets/avatar/hero-profile.png"

const HERO_ACCENT_GRADIENTS = [
  { colors: ["#0b1d51", "#1e3a8a", "#0400ff"], className: "dark:invisible" },
  { colors: ["#0400ff", "#38bdf8", "#07cce2"], className: "invisible dark:visible" },
]

const EASE_OUT = [0.22, 1, 0.36, 1] as const

const BORDER_COLORS_DARK = ["#0400ff", "#1d4ed8", "#38bdf8", "#07cce2"]
/** No light o azul some no fundo azul; tons brancos/gelo destacam a borda. */
const BORDER_COLORS_LIGHT = ["#ffffff", "#f0f9ff", "#e0f2fe", "#bae6fd"]

/** Camadas decorativas (lg+) que acompanham a caixa da foto, sem recortá-las. */
const PHOTO_LAYER_CLASS =
  "pointer-events-none absolute left-1/2 top-0 hidden h-[76vh] w-[min(32.3vw,476px)] -translate-x-1/2 lg:block"

type PortfolioHeroProps = {
  className?: string
  onNavigateToSection: (sectionId: string) => void
}

/**
 * Hero em três colunas: texto à esquerda, foto em arco no centro (colada no topo)
 * e números à direita.
 */
export function PortfolioHero({ className, onNavigateToSection }: PortfolioHeroProps) {
  const t = useT()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme !== "light"
  const rootRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  })

  const stats = [
    { value: "2+", label: t.hero.stats.years },
    { value: String(MOCK_PROJECTS.length), label: t.hero.stats.projects },
    { value: String(experiences.length), label: t.hero.stats.companies },
  ]

  return (
    <div ref={rootRef} className={cn("relative flex h-full w-full flex-col text-white", className)}>
      <div className="relative mx-auto flex w-full max-w-[92vw] flex-1 lg:max-w-[min(85vw,1240px)] flex-col items-center gap-8 pt-24 md:block md:pt-0">
        {/* Mesma caixa da foto (sem recorte), para o traço nascer atrás dela. */}
        <div className={PHOTO_LAYER_CLASS}>
          <HeroCometPath
            className="absolute left-0 top-0 w-[200%]"
            scrollYProgress={scrollYProgress}
          />
        </div>

        <motion.div
          className={cn(
            "relative w-[min(68vw,320px)] shrink-0 overflow-hidden rounded-[999px] shadow-2xl shadow-black/25",
            "aspect-[3/4] md:absolute md:left-1/2 md:top-0 md:aspect-auto md:h-[76vh] md:w-[min(32.3vw,476px)] md:-translate-x-1/2 md:rounded-t-none md:rounded-b-[999px]",
          )}
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
        >
          <HeroPhotoReveal
            src={HERO_PROFILE_SRC}
            alt="Luiz Rodrigues"
            sizes="(max-width: 768px) 68vw, 476px"
            className="absolute inset-0"
          />
        </motion.div>

        {/*
          Borda pulsante contornando a foto. Ela sobe meia largura acima da tela
          para que só o arco de baixo (roundness 1 = meio círculo) e as laterais apareçam.
        */}
        <div className={PHOTO_LAYER_CLASS}>
          <PulsatingBorder
            className="absolute inset-x-0 bottom-0 h-[calc(100%+min(32.3vw,476px)/2)]"
            roundness={1}
            thicknessPx={1}
            speed={0.25}
            colors={isDark ? BORDER_COLORS_DARK : BORDER_COLORS_LIGHT}
          />
        </div>

        <div className="relative z-10 flex flex-col gap-8 md:absolute md:left-0 md:top-1/2 md:max-w-[min(40vw,560px)] md:-translate-y-[55%]">
          <div className="space-y-5">
            <motion.p
              className="text-xl text-white/80 sm:text-2xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              {t.hero.greeting}
            </motion.p>

            <h1 className="flex flex-col text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              {t.hero.titleBefore ? (
                <SplitText
                  key={`hero-before-${t.hero.titleBefore}`}
                  text={t.hero.titleBefore}
                  tag="span"
                  className="block"
                  delay={28}
                  startDelay={HERO_TEXT_ANIMATION_DELAY}
                  duration={0.8}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 22 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-80px"
                  textAlign="left"
                />
              ) : null}
              {/*
                Um gradiente por tema, empilhados no mesmo lugar: o azul claro some no fundo
                azul do light. `visibility` (e não `display`) para não reiniciar o fade-in ao trocar o tema.
              */}
              <span className="grid">
                {HERO_ACCENT_GRADIENTS.map(({ colors, className: themeClassName }) => (
                  <span key={themeClassName} className={cn("[grid-area:1/1]", themeClassName)}>
                    <GradientText
                      colors={colors}
                      animationSpeed={8}
                      showBorder={false}
                      className={cn(
                        "font-orbitron-italic mx-0 w-fit overflow-visible pr-2 normal-case",
                        "hero-gradient-fade-in",
                      )}
                      style={{ animationDelay: `${HERO_GRADIENT_TEXT_DELAY_MS}ms` }}
                    >
                      {t.hero.titleAccent}
                    </GradientText>
                  </span>
                ))}
              </span>
              {t.hero.titleAfter ? (
                <SplitText
                  key={`hero-after-${t.hero.titleAfter}`}
                  text={t.hero.titleAfter}
                  tag="span"
                  className="block"
                  delay={28}
                  startDelay={HERO_TEXT_ANIMATION_DELAY + 0.32}
                  duration={0.8}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 22 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-80px"
                  textAlign="left"
                />
              ) : null}
            </h1>

            <motion.p
              className="max-w-md text-pretty text-base leading-relaxed text-white/75 sm:text-lg"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.06, ease: EASE_OUT }}
            >
              {t.hero.paragraph}
            </motion.p>
          </div>

          <motion.div
            className="flex flex-wrap items-center gap-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12, ease: EASE_OUT }}
          >
            <button
              type="button"
              onClick={() => onNavigateToSection("contato")}
              className={cn(
                "group inline-flex cursor-pointer items-center gap-4 rounded-full py-2 pl-6 pr-2 text-sm font-semibold uppercase tracking-wide text-white",
                "bg-gradient-to-r from-[#0400ff] via-blue-600 to-sky-500 ring-1 ring-white/25 ring-inset",
                "shadow-[0_10px_30px_-8px_rgba(37,99,235,0.7)] transition-[box-shadow,filter] duration-300",
                "hover:brightness-110 hover:shadow-[0_12px_36px_-6px_rgba(56,189,248,0.75)]",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70",
              )}
            >
              {t.hero.ctaContact}
              <span className="grid size-9 place-items-center rounded-full bg-white text-blue-700 transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="size-4" aria-hidden />
              </span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateToSection("projetos")}
              className="cursor-pointer text-sm font-semibold text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
            >
              {t.hero.ctaProjects}
            </button>
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 hidden flex-col items-end gap-10 text-right md:absolute md:right-0 md:top-1/2 md:flex md:-translate-y-1/2"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
        >
          <dl className="flex flex-col gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="text-sm text-white/70 lg:text-base">{stat.label}</dt>
                <dd className="text-4xl font-black tracking-tight lg:text-5xl">{stat.value}</dd>
              </div>
            ))}
          </dl>

          <HeroTechStack title={t.hero.stackTitle} className="hidden lg:block" />
        </motion.div>

        <motion.button
          type="button"
          onClick={() => onNavigateToSection("sobre")}
          className="group absolute bottom-10 right-0 z-10 hidden cursor-pointer items-center gap-4 rounded-full text-right focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70 md:flex"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: EASE_OUT }}
        >
          <span className="max-w-[11rem] text-xs font-semibold uppercase leading-relaxed tracking-[0.2em] text-white/70 transition-colors group-hover:text-white">
            {t.hero.scrollCue}
          </span>
          <span
            className="relative flex h-11 w-7 justify-center rounded-full border-2 border-white/60 transition-colors group-hover:border-white"
            aria-hidden
          >
            <motion.span
              className="mt-2 block size-1.5 rounded-full bg-white"
              animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
            />
          </span>
        </motion.button>
      </div>
    </div>
  )
}

"use client"

import { useMemo, useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import {
  Briefcase,
  Code2,
  GitBranch,
  Globe2,
  GraduationCap,
  ServerCog,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react"
import { AboutOrbital } from "@/components/about-orbital"
import { TextScrollWordReveal } from "@/components/text-scroll-word-reveal"
import { aboutCopy, experiences, qualifications, type QualificationId } from "@/lib/content"
import { pick, useLocale, useT } from "@/lib/i18n"
import { cn } from "@/lib/utils"

/*
 * About em três tempos:
 * 1. Cortina com o slogan (baseada no "Loading line reveal" do motion.dev), guiada
 *    pelo scroll: uma linha cresce no centro e a cortina se abre a partir dela.
 * 2. Por trás, o texto de apresentação acende palavra por palavra com o scroll
 *    (Text Scroll Word Reveal).
 * 3. A estrutura do About do index — destaques, qualificações e experiência —
 *    no visual de vidro da /new.
 */

/** Vidro sem backdrop-filter: os cards são estáticos e o fundo anima por trás. */
const GLASS =
  "border border-white/50 bg-white/55 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.45)] dark:border-white/10 dark:bg-zinc-900/60 dark:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.1)]"

const HIGHLIGHT_ICONS: LucideIcon[] = [GraduationCap, Sparkles, Briefcase]

/** Altura da "tampinha": o começo do conteúdo de baixo que aparece no rodapé da tela. */
const PEEK = "6rem"

const QUALIFICATION_ICONS: Record<QualificationId, LucideIcon> = {
  front: Code2,
  back: ServerCog,
  mobile: Smartphone,
  vcs: GitBranch,
  communication: Globe2,
}

export function AboutSection() {
  const t = useT()
  const { locale } = useLocale()

  return (
    <section id="sobre" aria-labelledby="heading-sobre" className="relative">
      <TextScrollWordReveal
        statement={pick(aboutCopy, locale)}
        kicker={`${t.about.eyebrow} — ${t.about.title}`}
        headingId="heading-sobre"
        stageHeight={`calc(100svh - ${PEEK})`}
        scrollLength="320vh"
        introPortion={CURTAIN_PORTION}
        overlay={(progress) => <LineCurtain slogan={t.about.slogan} progress={progress} />}
        aside={<AboutOrbital className="-mt-6 w-[18rem] max-w-none" />}
      />
      <AboutPeek />
      <AboutDetails />
    </section>
  )
}

/* ── 1. Cortina com slogan ─────────────────────────────────────────────── */

/** Fração do scroll da seção reservada à cortina, antes das palavras acenderem. */
const CURTAIN_PORTION = 0.3

/**
 * Duas metades (off-white no light, pretas no dark) com o mesmo slogan (parecem uma só), guiadas pelo scroll:
 * na primeira metade do trecho a linha central cresce de cima a baixo, como um
 * carregamento; na segunda, as metades se recolhem para as laterais a partir
 * dela. Aberta, a cortina fica invisível; rolando de volta, ela fecha de novo.
 * Com movimento reduzido ela nem aparece.
 */
function LineCurtain({ slogan, progress }: { slogan: string; progress: MotionValue<number> }) {
  const reduce = useReducedMotion()

  const line = useTransform(progress, [0.05, 0.5], [0, 1])
  const open = useTransform(progress, [0.55, 1], [0, 1])
  const leftClip = useTransform(open, (v) => `inset(0 ${50 + v * 50}% 0 0)`)
  const rightClip = useTransform(open, (v) => `inset(0 0 0 ${50 + v * 50}%)`)
  const lineOpacity = useTransform(open, [0, 0.25], [1, 0])
  const visibility = useTransform(open, (v) => (v >= 1 ? "hidden" : "visible"))

  if (reduce) return null

  // Mesmo fundo do hero: off-white no light, preto no dark (ver --stage no globals.css).
  const half = "absolute inset-0 flex items-center justify-center bg-[var(--stage)] px-6 text-[var(--stage-foreground)]"
  const text = (
    <p className="max-w-[18ch] text-center text-[clamp(32px,6vw,80px)] font-bold leading-[1.02] tracking-[-0.04em] text-balance">
      {slogan}
    </p>
  )

  return (
    // A cortina cobre a tela toda (100svh, não só o palco) e fica acima da "tampinha" (z-10).
    <motion.div
      className="pointer-events-none absolute inset-x-0 top-0 z-30 h-svh"
      style={{ visibility }}
      aria-hidden
    >
      <motion.div className={half} style={{ clipPath: leftClip }}>
        {text}
      </motion.div>
      <motion.div className={half} style={{ clipPath: rightClip }}>
        {text}
      </motion.div>
      {/* A "barra de carregamento": cresce do centro e some quando a cortina abre. */}
      <motion.span
        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[var(--stage-foreground)]"
        style={{ scaleY: line, opacity: lineOpacity }}
      />
    </motion.div>
  )
}

/* ── 3. Destaques, qualificações e experiência ─────────────────────────── */

/**
 * Os destaques são o começo do conteúdo de baixo. Com `sticky bottom-0` eles
 * ficam aparecendo no rodapé da tela enquanto o texto é revelado (dá para ver
 * que tem mais conteúdo) e depois seguem o fluxo junto com o resto.
 */
function AboutPeek() {
  const t = useT()

  return (
    <div className="sticky bottom-0 z-10 mx-auto flex w-[90%] items-start pt-1" style={{ height: PEEK }}>
      <ul className="flex flex-wrap gap-3">
        {t.about.highlights.map((label, index) => {
          const Icon = HIGHLIGHT_ICONS[index] ?? Sparkles
          return (
            <li key={label} className={cn(GLASS, "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm")}>
              <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              {label}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function AboutDetails() {
  const t = useT()
  const { locale } = useLocale()

  // O index lista algumas qualificações repetidas; aqui só a primeira de cada id.
  const uniqueQualifications = useMemo(() => {
    const byId = new Map<QualificationId, (typeof qualifications)[number]>()
    qualifications.forEach((item) => {
      if (!byId.has(item.id)) byId.set(item.id, item)
    })
    return Array.from(byId.values())
  }, [])

  return (
    <div className="mx-auto w-[90%] space-y-16 pb-24 pt-8">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <div className="space-y-5">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <GraduationCap className="size-5 text-muted-foreground" aria-hidden />
            {t.about.qualificationsTitle}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {uniqueQualifications.map((item) => {
              const Icon = QUALIFICATION_ICONS[item.id]
              return (
                <article key={item.id} className={cn(GLASS, "rounded-3xl p-5")}>
                  <p className="flex items-center gap-2 font-semibold">
                    <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                    {pick(item.title, locale)}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick(item.description, locale)}</p>
                </article>
              )
            })}
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Briefcase className="size-5 text-muted-foreground" aria-hidden />
            {t.about.experienceTitle}
          </h3>
          <ExperienceTimeline />
        </div>
      </div>
    </div>
  )
}

/** Linha do tempo cuja linha cresce conforme a lista entra na tela (como no index). */
function ExperienceTimeline() {
  const { locale } = useLocale()
  const listRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.85", "end 0.6"] })

  return (
    <div ref={listRef} className="relative pl-8">
      <span aria-hidden className="absolute bottom-3 left-[11px] top-3 w-px bg-border" />
      <motion.span
        aria-hidden
        className="absolute bottom-3 left-[11px] top-3 w-px origin-top bg-foreground"
        style={{ scaleY: reduce ? 1 : scrollYProgress }}
      />

      <ul className="space-y-4">
        {experiences.map((item) => (
          <li key={pick(item.role, locale)} className="relative">
            <span
              aria-hidden
              className="absolute -left-[26px] top-6 size-3 rounded-full border-2 border-foreground bg-background"
            />
            <article className={cn(GLASS, "rounded-3xl p-5")}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="font-semibold">{pick(item.role, locale)}</p>
                <p className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {pick(item.period, locale)}
                </p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick(item.description, locale)}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}

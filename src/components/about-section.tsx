"use client"

import { useEffect, useState, type ReactNode } from "react"
import Image from "next/image"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react"
import { useTheme } from "next-themes"
import {
  ArrowUpRight,
  Briefcase,
  ChevronDown,
  GraduationCap,
} from "lucide-react"
import { AboutOrbital } from "@/components/about-orbital"
import AccretionDisc from "@/components/originkit/accretion-disc"
import { TextScrollWordReveal } from "@/components/text-scroll-word-reveal"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { QualificationsBento } from "@/components/qualifications-bento"
import { aboutCopy, experiences } from "@/lib/content"
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



export function AboutSection() {
  const t = useT()
  const { locale } = useLocale()

  return (
    <section id="sobre" aria-labelledby="heading-sobre" className="relative">
      <TextScrollWordReveal
        statement={pick(aboutCopy, locale)}
        eyebrow={t.about.eyebrow}
        title={t.about.title}
        headingId="heading-sobre"
        pinLength="240vh"
        introPortion={CURTAIN_PORTION}
        overlay={(progress) => <LineCurtain slogan={t.about.slogan} progress={progress} />}
        aside={<AboutOrbital badges className="mt-20 w-[22rem] max-w-none" />}
        belowText={<AboutHighlights />}
      >
        <AboutDetails />
      </TextScrollWordReveal>
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
  // Cada metade sai para o seu lado e o conteúdo dela anda o mesmo tanto no sentido
  // contrário (o conteúdo tem o dobro da largura, daí os 50%): o slogan fica parado e
  // só a borda da metade varre a tela. Só transform (composto na GPU), sem repintar
  // as camadas de tela cheia como o clip-path fazia.
  const leftX = useTransform(open, (v) => `${-v * 100}%`)
  const leftInnerX = useTransform(open, (v) => `${v * 50}%`)
  const rightX = useTransform(open, (v) => `${v * 100}%`)
  const rightInnerX = useTransform(open, (v) => `${-v * 50}%`)
  const lineOpacity = useTransform(open, [0, 0.25], [1, 0])
  const visibility = useTransform(open, (v) => (v >= 1 ? "hidden" : "visible"))

  if (reduce) return null

  // Mesmo fundo do hero: off-white no light, preto no dark (ver --stage no globals.css).
  // Fundo e texto de cada metade são camadas separadas (com o mesmo deslocamento) para o
  // buraco negro ficar entre eles: por cima do fundo, por baixo do slogan.
  const halfBg = "bg-[var(--stage)]"
  const half = "flex items-center justify-center px-6 text-[var(--stage-foreground)]"
  const text = (
    <p className="font-display max-w-[18ch] text-center text-[clamp(32px,6vw,80px)] font-bold leading-[1.05] text-balance">
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
      <CurtainHalf side="left" x={leftX} innerX={leftInnerX} className={halfBg} />
      <CurtainHalf side="right" x={rightX} innerX={rightInnerX} className={halfBg} />
      <CurtainDisc open={open} />
      <CurtainHalf side="left" x={leftX} innerX={leftInnerX} className={half}>
        {text}
      </CurtainHalf>
      <CurtainHalf side="right" x={rightX} innerX={rightInnerX} className={half}>
        {text}
      </CurtainHalf>
      {/* A "barra de carregamento": cresce do centro e some quando a cortina abre. */}
      <motion.span
        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[var(--stage-foreground)]"
        style={{ scaleY: line, opacity: lineOpacity }}
      />
    </motion.div>
  )
}

/**
 * Metade da cortina: uma janela de 50% da largura que desliza para fora (`x`)
 * com o conteúdo de tela cheia dentro, deslocado ao contrário (`innerX`) para
 * ficar parado. A metade direita mostra a parte direita do mesmo conteúdo.
 */
function CurtainHalf({
  side,
  x,
  innerX,
  className,
  children,
}: {
  side: "left" | "right"
  x: MotionValue<string>
  innerX: MotionValue<string>
  className: string
  children?: ReactNode
}) {
  return (
    <motion.div
      className={cn("absolute inset-y-0 w-1/2 overflow-hidden", side === "left" ? "left-0" : "right-0")}
      style={{ x }}
    >
      <motion.div
        className={cn("absolute inset-y-0 w-[200%]", side === "left" ? "left-0" : "right-0", className)}
        style={{ x: innerX }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/** Ponto da abertura da cortina (0→1) em que o disco termina de sumir. */
const DISC_FADE_END = 0.6

/**
 * Buraco negro (Accretion Disc, Originkit) só no dark. No desktop atravessa a
 * divisa entre o hero e a cortina: 30% sobre o fim do hero e 70% sobre a cortina (os
 * dois são o mesmo preto, sem emenda); no mobile fica centralizado na cortina. Some enquanto
 * a cortina abre e o loop WebGL para assim que ele some.
 */
function CurtainDisc({ open }: { open: MotionValue<number> }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState(true)
  const opacity = useTransform(open, [0, DISC_FADE_END], [1, 0])

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // O loop para assim que o disco some (não espera a cortina abrir toda). Re-render
  // só ao cruzar esse limite, não a cada quadro do scroll.
  useMotionValueEvent(open, "change", (v) => {
    const next = v < DISC_FADE_END
    setActive((current) => (current === next ? current : next))
  })

  if (!mounted || resolvedTheme !== "dark") return null

  return (
    <motion.div
      // O espiral é maior que o canvas e era cortado em linha reta nas bordas: a
      // máscara apaga o começo e o fim dele em gradiente até o preto do fundo.
      // Desktop: 30% da altura acima da divisa (no hero) e 70% abaixo (na cortina).
      // Mobile: centralizado na cortina e com o dobro do tamanho (mais "perto"; as
      // pontas do espiral saem pelas laterais).
      // Altura: o tamanho do disco na tela é proporcional à altura do canvas (com a
      // distance do preset), então ela acompanha a largura da tela — 87vw leva o
      // espiral de ponta a ponta no desktop; 174vw dobra o tamanho no mobile.
      className="absolute inset-x-0 top-[calc((100svh-174vw)/2)] h-[174vw] [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_72%,transparent_100%)] lg:top-0 lg:h-[87vw] lg:-translate-y-[30%]"
      style={{ opacity }}
    >
      {/* Fundo transparente: as partículas somam luz sobre o preto do hero/cortina. */}
      <AccretionDisc background="transparent" active={active} />
    </motion.div>
  )
}

/* ── 3. Destaques, qualificações e experiência ─────────────────────────── */

/**
 * Destaques logo abaixo do texto (na coluna dele): faculdade, idiomas e tempo de
 * estudo. Sem card: logo (ou número) em cima, título e detalhe embaixo, alinhados
 * à esquerda e separados por linhas finas. Entram em sequência (subindo e desfocando) quando
 * aparecem na tela.
 */
// Logos e número monocromáticos: pretos no light e brancos no dark
// (brightness-0 zera a cor; no dark o invert vira branco).
const CREDENTIAL_VISUALS: ReactNode[] = [
  <Image key="unicesumar" src="/assets/about/unicesumar.png" alt="Unicesumar" width={138} height={112} className="h-12 w-auto brightness-0 dark:invert" />,
  <Image key="fluency" src="/assets/about/fluency.png" alt="Fluency Academy" width={156} height={38} className="h-7 w-auto brightness-0 dark:invert" />,
  <span key="years" className="font-display pr-1 text-6xl font-bold leading-none">
    3+
  </span>,
]

const CREDENTIAL_ITEM: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

function AboutHighlights() {
  const t = useT()
  const reduce = useReducedMotion()

  return (
    <div className="mt-14">
      <motion.ul
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        variants={{ show: { transition: { staggerChildren: 0.14 } } }}
        className="grid gap-10 sm:grid-cols-3 sm:gap-0"
      >
        {t.about.credentials.map((item, index) => (
          <motion.li
            key={item.title}
            variants={CREDENTIAL_ITEM}
            className="flex flex-col items-start gap-4 text-left sm:px-8 sm:first:pl-0 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-[var(--stage-foreground)]/10"
          >
            <div className="flex h-14 items-end">{CREDENTIAL_VISUALS[index]}</div>
            <div className="space-y-1">
              <p className="font-display text-xl font-semibold sm:text-2xl">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.detail}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}

/**
 * Capacitações (60%) e experiência (40%). A experiência é um accordion no estilo
 * do Bouncy Accordion (Skiper 103 — Skiper UI, recriado só pelo efeito): os
 * itens fechados formam um bloco único e o item aberto se descola em um card
 * próprio, com espaço acima e abaixo e uma mola com quique. Com tudo fechado,
 * a coluna da esquerda mostra as capacitações; com uma empresa aberta, ela
 * troca para o detalhe dessa empresa.
 */
function AboutDetails() {
  const t = useT()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const open = openIndex === null ? null : experiences[openIndex]


  return (
    <div className="mx-auto w-[90%] space-y-16 pb-16 pt-20">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div key={open.company} {...PANEL_SWAP}>
              <ExperienceDetail item={open} />
            </motion.div>
          ) : (
            <motion.div key="skills" className="space-y-5" {...PANEL_SWAP}>
              <h3 className="font-display flex items-center gap-2 text-lg font-semibold">
                <GraduationCap className="size-5 text-muted-foreground" aria-hidden />
                {t.about.qualificationsTitle}
              </h3>
              <QualificationsBento />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-5">
          <h3 className="font-display flex items-center gap-2 text-lg font-semibold">
            <Briefcase className="size-5 text-muted-foreground" aria-hidden />
            {t.about.experienceTitle}
          </h3>
          <ExperienceAccordion openIndex={openIndex} onToggle={(i) => setOpenIndex((cur) => (cur === i ? null : i))} />
        </div>
      </div>
    </div>
  )
}

/** Troca da coluna da esquerda (capacitações ↔ detalhe da empresa). */
const PANEL_SWAP = {
  initial: { opacity: 0, y: 16, filter: "blur(6px)" },
  // Ao fim, o filtro sai de vez: um `filter` (mesmo blur(0px)) no contêiner
  // isola o fundo e anula o backdrop-blur dos cards de dentro.
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } },
  exit: { opacity: 0, y: -10, filter: "blur(6px)" },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
} as const

const ACCORDION_SPRING = { type: "spring", bounce: 0.35, duration: 0.6 } as const
const ITEM_RADIUS = 24
const ITEM_GAP = 10

/** Logo da empresa num quadrado (ou a inicial, quando não há logo). */
function CompanyMark({ item, className }: { item: (typeof experiences)[number]; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("grid shrink-0 place-items-center overflow-hidden bg-foreground/[0.08] font-display font-bold", className)}
      style={item.logoBackground ? { background: item.logoBackground } : undefined}
    >
      {item.logo ? (
        <Image src={item.logo} alt="" width={64} height={64} className="size-[70%] object-contain" />
      ) : (
        item.company.charAt(0)
      )}
    </span>
  )
}

function ExperienceAccordion({ openIndex, onToggle }: { openIndex: number | null; onToggle: (index: number) => void }) {
  const { locale } = useLocale()
  const reduce = useReducedMotion()
  const spring = reduce ? { duration: 0 } : ACCORDION_SPRING

  return (
    <ul className="relative">
      {/*
        Um desfoque só, atrás da lista inteira: com um por item, cada um desfocava
        só o próprio retângulo e o brilho que passa por trás quebrava nas divisas.
      */}
      <motion.span
        aria-hidden
        layout
        transition={spring}
        className="pointer-events-none absolute inset-0 rounded-[24px] backdrop-blur-[6px]"
      />
      {experiences.map((item, index) => {
        const isOpen = openIndex === index
        // Um item começa um grupo se é o primeiro, se está aberto ou se o anterior
        // está aberto; termina um grupo se é o último, se está aberto ou se o
        // próximo está aberto. Só as pontas de cada grupo têm cantos arredondados.
        const startsGroup = index === 0 || isOpen || openIndex === index - 1
        const endsGroup = index === experiences.length - 1 || isOpen || openIndex === index + 1
        const top = startsGroup ? ITEM_RADIUS : 0
        const bottom = endsGroup ? ITEM_RADIUS : 0
        const panelId = `experience-panel-${index}`

        return (
          <motion.li
            key={item.company}
            layout
            initial={false}
            animate={{
              marginTop: index > 0 && startsGroup ? ITEM_GAP : 0,
              borderTopLeftRadius: top,
              borderTopRightRadius: top,
              borderBottomLeftRadius: bottom,
              borderBottomRightRadius: bottom,
            }}
            transition={spring}
            className="relative overflow-hidden bg-white/55 dark:bg-zinc-900/60"
          >
            <motion.button
              layout="position"
              transition={spring}
              type="button"
              onClick={() => onToggle(index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full cursor-pointer items-center gap-3 px-5 py-4 text-left outline-none focus-visible:bg-foreground/[0.06]"
            >
              <CompanyMark item={item} className="size-8 rounded-lg text-xs" />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold">{item.company}</span>
                <span className="block truncate text-xs text-muted-foreground">{pick(item.period, locale)}</span>
              </span>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={spring} className="text-muted-foreground">
                <ChevronDown className="size-4" aria-hidden />
              </motion.span>
            </motion.button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={spring}
                >
                  <div className="space-y-1.5 px-5 pb-5">
                    <p className="text-sm font-semibold">{pick(item.position, locale)}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{pick(item.description, locale)}</p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.li>
        )
      })}
    </ul>
  )
}

/**
 * Logos (pixel art, em public/assets/skills) das stacks das empresas. `className`
 * ajusta as monocromáticas: a do Next é branca (escurece no light) e as partes
 * pretas da do React Router clareiam no dark.
 */
const STACK_LOGOS: Record<string, { src: string; className?: string }> = {
  React: { src: "react" },
  "Next.js": { src: "next", className: "invert dark:invert-0" },
  "React Router": { src: "reactrouter", className: "dark:invert dark:hue-rotate-180" },
  TypeScript: { src: "ts" },
  JavaScript: { src: "js" },
  "Tailwind CSS": { src: "tailwind" },
  MUI: { src: "mui" },
  Flutter: { src: "flutter" },
  Dart: { src: "dart" },
  // Como no hero: no dark, o traço vermelho escuro do Laravel é clareado para não sumir.
  Laravel: { src: "laravel", className: "dark:brightness-[1.8] dark:saturate-150" },
  PHP: { src: "php" },
  HTML: { src: "html5" },
  CSS: { src: "css3" },
  Docker: { src: "docker" },
}

/** Uma stack: a logo num quadradinho, com o nome no tooltip (ou escrita, sem logo). */
function StackLogo({ name }: { name: string }) {
  const logo = STACK_LOGOS[name]
  if (!logo) {
    return <li className="rounded-full bg-foreground/[0.07] px-3 py-1 text-xs font-medium">{name}</li>
  }
  return (
    <li>
      <Tooltip>
        <TooltipTrigger asChild>
          <span tabIndex={0} className="grid size-10 place-items-center rounded-xl bg-foreground/[0.07] outline-none focus-visible:ring-2 focus-visible:ring-foreground/40">
            <Image
              src={`/assets/skills/${logo.src}.png`}
              alt={name}
              width={64}
              height={64}
              className={cn("size-6 object-contain [image-rendering:pixelated]", logo.className)}
            />
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={6} className="z-[600]">
          {name}
        </TooltipContent>
      </Tooltip>
    </li>
  )
}

/** Detalhe da empresa aberta no accordion (coluna da esquerda). */
function ExperienceDetail({ item }: { item: (typeof experiences)[number] }) {
  const t = useT()
  const { locale } = useLocale()

  return (
    <article className={cn(GLASS, "space-y-7 rounded-3xl p-6 backdrop-blur-[6px] sm:p-8")}>
      <header className="flex items-center gap-4">
        <CompanyMark item={item} className="size-14 rounded-2xl text-xl" />
        <div className="min-w-0">
          <h3 className="font-display text-2xl font-semibold sm:text-3xl">{item.company}</h3>
          <p className="text-sm text-muted-foreground">
            {pick(item.position, locale)} · {pick(item.period, locale)}
          </p>
        </div>
      </header>

      <p className="leading-relaxed text-muted-foreground">{pick(item.summary, locale)}</p>

      <div className="space-y-3">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {t.about.detailHighlights}
        </p>
        <ul className="space-y-2">
          {pick(item.highlights, locale).map((line) => (
            <li key={line} className="flex gap-3 text-sm leading-relaxed">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-to-r from-[#2798EE] to-[#31E18E]" />
              {line}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-3">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {t.about.detailStack}
          </p>
          <ul className="flex flex-wrap gap-2">
            {item.stack.map((tool) => (
              <StackLogo key={tool} name={tool} />
            ))}
          </ul>
        </div>
        {item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
          >
            {t.about.visitSite}
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        ) : null}
      </div>
    </article>
  )
}

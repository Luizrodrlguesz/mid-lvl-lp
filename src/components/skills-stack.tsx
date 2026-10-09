"use client"

import { useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import HorizontalStackingCards, {
  HorizontalStackingCardItem,
} from "@/components/fancy/blocks/horizontal-stacking-cards"
import { skillShowcase, type ShowcaseSkill } from "@/lib/content"
import { useLocale, useT, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

/*
 * Habilidades com scroll lateral: a seção fica presa e cada categoria entra da
 * direita, empilhando sobre a anterior (Stacking Cards adaptado para o eixo
 * horizontal). Visual em vidro (glassmorphism).
 *
 * Dentro de cada card, a dinâmica do "Tik Tik Color List" (Skiper UI, conceito
 * de nathansmith.design): a lista de skills desliza até a ativa parar numa
 * linha-âncora com régua, o vidro assume a cor da marca da skill ativa e a logo
 * aparece num card de prévia arrastável à direita. Diferente da referência, a
 * troca é por clique/setas — a roda do mouse fica com o scroll lateral da seção.
 */

const CATEGORIES = ["linguagens", "front", "back", "outros"] as const
type CategoryId = (typeof CATEGORIES)[number]

/** Marcas monocromáticas usam um cinza neutro — o branco do tema lavaria o vidro. */
const NEUTRAL = "#94a3b8"

/** Cor de marca de cada skill. */
const SKILL_COLORS: Record<string, string> = {
  javascript: "#f7df1e",
  typescript: "#3178c6",
  dart: "#0175c2",
  htmlcss: "#e34f26",
  react: "#61dafb",
  next: NEUTRAL,
  vite: "#646cff",
  "react-native": "#61dafb",
  flutter: "#02569b",
  node: "#5fa04e",
  nest: "#e0234e",
  laravel: "#ff2d20",
  postman: "#ff6c37",
  tailwind: "#38bdf8",
  bootstrap: "#7952b3",
  mui: "#007fff",
  shadcn: NEUTRAL,
  git: "#f05032",
  figma: "#a259ff",
  vercel: NEUTRAL,
}

const ROW = 44
const ANCHOR = "38%"
const SPRING = { type: "spring", bounce: 0.15, duration: 0.55 } as const
const LABEL = "text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"

export function SkillsStack() {
  return (
    <HorizontalStackingCards totalCards={CATEGORIES.length}>
      {CATEGORIES.map((category, index) => (
        <HorizontalStackingCardItem key={category} index={index}>
          <SkillCard
            category={category}
            index={index}
            total={CATEGORIES.length}
            skills={skillShowcase.filter((s) => s.category === category)}
          />
        </HorizontalStackingCardItem>
      ))}
    </HorizontalStackingCards>
  )
}

type SkillCardProps = {
  category: CategoryId
  index: number
  total: number
  skills: ShowcaseSkill[]
}

function SkillCard({ category, index, total, skills }: SkillCardProps) {
  const t = useT()
  const { locale } = useLocale()
  const [activeIndex, setActiveIndex] = useState(0)
  const selected = skills[activeIndex]
  const color = (selected && SKILL_COLORS[selected.id]) ?? NEUTRAL
  const { title, subtitle } = t.skills.categories[category]

  return (
    <article
      className={cn(
        "relative mx-auto flex h-[82%] w-11/12 max-w-6xl flex-col overflow-hidden rounded-[28px] p-6 sm:p-8",
        // Vidro: fundo translúcido + desfoque, borda clara e brilho interno no topo.
        // Opaco o bastante para o card de baixo não vazar o texto quando empilha.
        // Coberto pelo próximo card, só a borda aparece: o desfoque sai (é o efeito
        // mais caro — com a pilha toda, cada um recalcularia o de baixo a cada quadro).
        "border border-white/50 bg-white/55 backdrop-blur-lg dark:border-white/15 dark:bg-zinc-900/60",
        "group-data-[covered=true]/stack-item:backdrop-blur-none",
        // A cor da skill ativa anima via @property (ver globals.css).
        "[transition:--skill-color_700ms_ease]",
        "shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.45)] dark:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)]",
      )}
      style={{ "--skill-color": color } as React.CSSProperties}
    >
      {/* O vidro assume a cor da skill ativa: um tom geral e um brilho no canto.
          O brilho é um gradiente radial (sem filter: blur, que pesa com o card mudando de escala). */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[var(--skill-color)] opacity-[0.12]"
      />
      <span
        aria-hidden
        // closest-side: o gradiente chega a zero na borda do elemento (antes, o círculo
        // cortava o brilho no meio e aparecia uma borda no dark). As paradas seguem
        // uma curva suave em vez de cair em linha reta, para não formar degrau.
        className="pointer-events-none absolute -right-56 -top-56 size-[44rem] bg-[radial-gradient(circle_closest-side,color-mix(in_srgb,var(--skill-color)_42%,transparent)_0%,color-mix(in_srgb,var(--skill-color)_34%,transparent)_15%,color-mix(in_srgb,var(--skill-color)_24%,transparent)_30%,color-mix(in_srgb,var(--skill-color)_15%,transparent)_45%,color-mix(in_srgb,var(--skill-color)_8%,transparent)_60%,color-mix(in_srgb,var(--skill-color)_3%,transparent)_75%,color-mix(in_srgb,var(--skill-color)_1%,transparent)_88%,transparent_100%)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.28)_0%,transparent_38%)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_38%)]"
      />

      <header className="relative flex items-start justify-between gap-6 border-b border-white/30 pb-5 dark:border-white/10">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h3>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
        </div>
        <span className="shrink-0 font-mono text-sm text-muted-foreground">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </header>

      {selected ? (
        <div className="relative grid min-h-0 flex-1 gap-6 pt-5 md:grid-cols-[13rem_minmax(0,1fr)] lg:grid-cols-[13rem_minmax(0,1fr)_15rem] lg:gap-8">
          <SkillList
            skills={skills}
            locale={locale}
            activeIndex={activeIndex}
            onChange={setActiveIndex}
            label={t.skills.panel.skillsNavAria}
          />

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="min-h-0 overflow-y-auto pr-1"
            >
              <SkillDetail skill={selected} locale={locale} />
            </motion.div>
          </AnimatePresence>

          <SkillPreview skill={selected} locale={locale} />
        </div>
      ) : (
        <p className="relative pt-5 text-sm text-muted-foreground">{t.skills.panel.empty}</p>
      )}
    </article>
  )
}

type SkillListProps = {
  skills: ShowcaseSkill[]
  locale: Locale
  activeIndex: number
  onChange: (index: number) => void
  label: string
}

/** Lista "tik tik": a ativa fica na linha-âncora; as outras apagadas acima/abaixo. */
function SkillList({ skills, locale, activeIndex, onChange, label }: SkillListProps) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([])

  const select = (next: number) => {
    const i = Math.max(0, Math.min(skills.length - 1, next))
    onChange(i)
    buttons.current[i]?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") select(activeIndex + 1)
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") select(activeIndex - 1)
    else if (e.key === "Home") select(0)
    else if (e.key === "End") select(skills.length - 1)
    else return
    e.preventDefault()
  }

  return (
    <div
      className="relative h-44 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)] md:h-auto md:min-h-0"
    >
      {/* Régua fixa na linha-âncora. */}
      <span aria-hidden className="absolute left-0 h-0.5 w-7 -translate-y-1/2 rounded-full bg-foreground" style={{ top: ANCHOR }} />

      <motion.ul
        role="radiogroup"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="absolute inset-x-0"
        style={{ top: ANCHOR }}
        animate={{ y: -(activeIndex * ROW + ROW / 2) }}
        transition={SPRING}
      >
        {skills.map((skill, i) => {
          const active = i === activeIndex
          return (
            <li key={skill.id} style={{ height: ROW }}>
              <button
                ref={(el) => {
                  buttons.current[i] = el
                }}
                type="button"
                role="radio"
                aria-checked={active}
                tabIndex={active ? 0 : -1}
                onClick={() => onChange(i)}
                className="group flex h-full w-full cursor-pointer items-center gap-3 text-left outline-none"
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-px shrink-0 rounded-full transition-all duration-300",
                    active ? "w-7 bg-transparent" : "w-3 bg-foreground/30 group-hover:w-5",
                  )}
                />
                <span
                  className={cn(
                    "truncate text-lg font-semibold tracking-tight transition-opacity duration-300 group-focus-visible:underline",
                    active ? "opacity-100" : "opacity-30 group-hover:opacity-60",
                  )}
                >
                  {skill.label[locale]}
                </span>
              </button>
            </li>
          )
        })}
      </motion.ul>
    </div>
  )
}

function SkillDetail({ skill, locale }: { skill: ShowcaseSkill; locale: Locale }) {
  const t = useT()

  return (
    <div className="space-y-4 text-sm leading-relaxed">
      <section className="space-y-1.5">
        <p className={LABEL}>{t.skills.panel.whatIs}</p>
        <p className="text-base">{skill.description[locale]}</p>
      </section>

      <section className="space-y-1.5">
        <p className={LABEL}>{t.skills.panel.howIUse}</p>
        <ul className="list-disc space-y-1 pl-5">
          {(skill.usos[locale] ?? []).map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
        <p className="text-muted-foreground">{skill.aplicacao[locale]}</p>
      </section>

      {/* Em telas grandes o nível aparece no card de prévia. */}
      <section className="space-y-1.5 lg:hidden">
        <p className={LABEL}>{t.skills.panel.level}</p>
        <p className="inline-flex rounded-full bg-white/30 px-3 py-1 text-xs font-medium dark:bg-white/10">
          {skill.nivel[locale]}
        </p>
      </section>
    </div>
  )
}

/** Card de prévia com a logo da stack (arrastável, volta ao lugar ao soltar). */
function SkillPreview({ skill, locale }: { skill: ShowcaseSkill; locale: Locale }) {
  const t = useT()

  return (
    <div className="hidden items-end justify-center pb-2 lg:flex">
      <motion.div
        drag
        dragSnapToOrigin
        dragElastic={0.25}
        whileDrag={{ scale: 1.04, rotate: 0 }}
        initial={false}
        animate={{ rotate: -3 }}
        className="relative aspect-square w-full cursor-grab touch-none overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)] active:cursor-grabbing dark:border-white/15 dark:bg-white/[0.08]"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- logos pequenas de tamanhos variados */}
            <img src={skill.image} alt="" draggable={false} className="size-[45%] object-contain" />
            <div className="text-center">
              <p className="font-semibold">{skill.label[locale]}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t.skills.panel.level}: {skill.nivel[locale]}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

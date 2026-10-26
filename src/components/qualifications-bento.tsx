"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { LayoutGroup, motion, useReducedMotion } from "motion/react"
import { Code2, GitBranch, Globe2, Plus, ServerCog, Smartphone, type LucideIcon } from "lucide-react"
import { qualifications, type QualificationId } from "@/lib/content"
import { pick, useLocale, useT } from "@/lib/i18n"
import { TECH_ICONS } from "@/lib/tech-icons"
import { cn } from "@/lib/utils"

/**
 * Capacitações em bento, juntando duas ideias:
 * - Bento Box Grid (Wensity): tiles de tamanhos diferentes; o tile clicado vai
 *   para o primeiro lugar e os outros deslizam para as novas posições.
 * - Minimal Card Expand (Skiper 23 — Skiper UI, recriado só pelo efeito): o card
 *   clicado cresce e revela o conteúdo completo; clicar fora (ou Esc) recolhe.
 * Recriados do zero, no vidro dos outros cards do About.
 */

const GLASS =
  "border border-white/50 bg-white/55 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.45)] dark:border-white/10 dark:bg-zinc-900/60 dark:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.1)]"

type Size = "lg" | "sm" | "wide"
type Tool = { label: string; src: string; mono?: "white" | "black" }

const tech = (name: string): Tool => ({ label: name, ...TECH_ICONS[name] })

/** Tamanho no bento fechado, ícone, cor de destaque (rgb) e ferramentas de cada capacitação. */
const TILES: Record<QualificationId, { size: Size; icon: LucideIcon; accent: string; tools: Tool[] }> = {
  front: {
    size: "lg",
    icon: Code2,
    accent: "56,189,248",
    tools: ["HTML5 & CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"].map(tech),
  },
  back: { size: "sm", icon: ServerCog, accent: "52,211,153", tools: ["Node.js", "Laravel (PHP)", "REST API", "Postman"].map(tech) },
  mobile: { size: "sm", icon: Smartphone, accent: "167,139,250", tools: ["Flutter", "Dart", "React Native"].map(tech) },
  vcs: { size: "wide", icon: GitBranch, accent: "251,191,36", tools: ["Git", "GitHub"].map(tech) },
  communication: {
    size: "wide",
    icon: Globe2,
    accent: "244,114,182",
    tools: [
      { label: "Português", src: "/assets/br-flag.png" },
      { label: "English", src: "/assets/us-flag.png" },
      { label: "Français", src: "/assets/fr-flag.png" },
    ],
  },
}

// Uma coluna no mobile e 6 a partir do sm.
const SPAN: Record<Size | "open" | "rest", string> = {
  lg: "sm:col-span-4 sm:row-span-2",
  sm: "sm:col-span-2",
  wide: "sm:col-span-3",
  open: "sm:col-span-6",
  rest: "sm:col-span-3",
}

const SPRING = { type: "spring", bounce: 0.18, duration: 0.55 } as const

export function QualificationsBento() {
  const { locale } = useLocale()
  const t = useT()
  const reduce = useReducedMotion()
  const [openId, setOpenId] = useState<QualificationId | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  // Clicar fora do bento ou apertar Esc recolhe o card aberto.
  useEffect(() => {
    if (!openId) return
    const onPointer = (e: PointerEvent) => {
      if (!gridRef.current?.contains(e.target as Node)) setOpenId(null)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null)
    }
    document.addEventListener("pointerdown", onPointer)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onPointer)
      document.removeEventListener("keydown", onKey)
    }
  }, [openId])

  // O index lista algumas qualificações repetidas; aqui só a primeira de cada id.
  const unique = qualifications.filter((item, i) => qualifications.findIndex((q) => q.id === item.id) === i)
  // O card aberto vai para o primeiro lugar; os outros mantêm a ordem.
  const ordered = openId ? [...unique.filter((q) => q.id === openId), ...unique.filter((q) => q.id !== openId)] : unique
  const transition = reduce ? { duration: 0 } : SPRING

  return (
    <LayoutGroup>
      <div ref={gridRef} className="grid auto-rows-[minmax(132px,auto)] grid-cols-1 gap-3 sm:grid-cols-6">
        {ordered.map((item) => {
          const tile = TILES[item.id]
          const Icon = tile.icon
          const open = openId === item.id
          const compact = openId !== null && !open
          const title = pick(item.title, locale)
          const showText = open || (!compact && tile.size !== "sm")

          return (
            <motion.button
              key={item.id}
              layout
              type="button"
              data-qualification={item.id}
              aria-expanded={open}
              aria-label={open ? t.about.qualificationClose(title) : t.about.qualificationOpen(title)}
              onClick={() => setOpenId(open ? null : item.id)}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
              style={{ borderRadius: 24, ["--accent" as string]: tile.accent }}
              className={cn(
                GLASS,
                // Desfoque leve do fundo que passa por trás do card.
                "group relative flex flex-col overflow-hidden p-5 text-left outline-none backdrop-blur-[6px]",
                "focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                open ? SPAN.open : compact ? SPAN.rest : SPAN[tile.size],
              )}
            >
              {/* Brilho da cor de destaque no canto: acende no hover e no card aberto. */}
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -right-16 -top-16 size-48 rounded-full blur-2xl transition-opacity duration-500",
                  open ? "opacity-70" : "opacity-25 group-hover:opacity-50",
                )}
                style={{ background: "radial-gradient(circle, rgba(var(--accent),0.55), transparent 70%)" }}
              />

              <motion.span layout="position" transition={transition} className="relative flex items-start justify-between gap-3">
                <span className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className="grid shrink-0 place-items-center brightness-75 saturate-150 dark:brightness-100 dark:saturate-100"
                    style={{ color: `rgb(${tile.accent})` }}
                  >
                    <Icon className="size-[18px]" />
                  </span>
                  <span className={cn("font-semibold leading-tight", tile.size === "lg" && !compact && "font-display text-xl")}>
                    {title}
                  </span>
                </span>
                {/* Botão do canto (como o menu do Skiper 23): o + gira e vira um x. */}
                <motion.span
                  aria-hidden
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={transition}
                  className="grid size-7 shrink-0 place-items-center rounded-full border border-foreground/10 bg-foreground/[0.04] text-muted-foreground transition-colors group-hover:text-foreground"
                >
                  <Plus className="size-3.5" />
                </motion.span>
              </motion.span>

              {showText ? (
                <motion.span
                  key={open ? "open" : "closed"}
                  layout="position"
                  initial={reduce ? false : { opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.3, delay: reduce ? 0 : 0.12 }}
                  className={cn(
                    "relative mt-3 block text-sm leading-relaxed text-muted-foreground",
                    !open && tile.size === "wide" && "line-clamp-2",
                    open && "max-w-2xl text-[15px]",
                  )}
                >
                  {pick(item.description, locale)}
                </motion.span>
              ) : null}

              <motion.span layout="position" transition={transition} className="relative mt-auto flex flex-wrap gap-2 pt-4">
                {tile.tools.map((tool) => (
                  <span
                    key={tool.label}
                    title={open ? undefined : tool.label}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border border-foreground/10 bg-foreground/[0.04]",
                      open ? "py-1.5 pl-1.5 pr-3" : "p-1.5",
                    )}
                  >
                    <Image
                      src={tool.src}
                      alt=""
                      width={20}
                      height={20}
                      className={cn(
                        "size-5 object-contain",
                        tool.mono === "white" && "invert dark:invert-0",
                        tool.mono === "black" && "dark:invert",
                      )}
                    />
                    {open ? <span className="text-xs font-medium">{tool.label}</span> : <span className="sr-only">{tool.label}</span>}
                  </span>
                ))}
              </motion.span>

            </motion.button>
          )
        })}
      </div>
    </LayoutGroup>
  )
}

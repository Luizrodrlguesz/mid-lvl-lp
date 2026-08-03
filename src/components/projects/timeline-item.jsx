"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { springTransition } from "@/lib/projects-motion"
import { useT } from "@/lib/i18n"
import { TooltipContent } from "@/components/ui/tooltip"

/**
 * Nó da constelação: ponto clicável com brilho no ativo e preview no hover.
 */
export function TimelineItem({
  id,
  nome,
  active,
  tipo,
  index,
  onSelect,
}) {
  const t = useT()
  const isProf = tipo === "profissional"

  return (
    <TooltipPrimitive.Root delayDuration={180}>
      <TooltipPrimitive.Trigger asChild>
        <motion.button
          type="button"
          id={`timeline-proj-${id}`}
          aria-current={active ? "true" : undefined}
          aria-label={t.projects.timeline.itemAria(nome, active)}
          onClick={() => onSelect(id)}
          whileHover={{ scale: active ? 1.12 : 1.08 }}
          whileTap={{ scale: 0.93 }}
          transition={springTransition}
          className={cn(
            "relative flex size-11 shrink-0 items-center justify-center rounded-full border outline-offset-2 transition-shadow duration-300 focus-visible:outline-2 focus-visible:outline-ring/60 md:size-12",
            active
              ? cn(
                  "z-10 border-primary/50 shadow-[0_0_20px_rgba(99,102,241,0.35)] ring-2 ring-primary/30",
                  isProf
                    ? "bg-linear-to-br from-indigo-300/35 to-slate-800/15 text-foreground dark:from-indigo-500/25 dark:to-slate-950/55"
                    : "bg-linear-to-br from-violet-200/50 to-violet-300/40 text-violet-900 dark:from-violet-400/25 dark:to-violet-950/40 dark:text-violet-50",
                )
              : cn(
                  "border-border/70 bg-white/10 text-muted-foreground shadow-black/20 ring-1 ring-black/5 backdrop-blur-[2px] hover:border-primary/25 hover:text-foreground/90 dark:bg-muted/30 dark:ring-white/5",
                  "shadow-sm",
                ),
          )}
        >
          {/* “estrela” minimalista — 4 pontos */}
          <span
            className={cn(
              "block size-2 rotate-45 rounded-[1px] md:size-2.5",
              active
                ? "bg-primary shadow-[0_0_8px_rgba(129,140,248,0.9)]"
                : "bg-muted-foreground/50",
            )}
            aria-hidden
          />
          {active ? (
            <span
              className="pointer-events-none absolute inset-0 rounded-full bg-primary/10 blur-md"
              aria-hidden
            />
          ) : null}
        </motion.button>
      </TooltipPrimitive.Trigger>
      <TooltipContent side="top" sideOffset={8} className="max-w-[220px] text-balance">
        <span className="font-medium">{nome}</span>
        <span className="mt-0.5 block text-[10px] uppercase tracking-wider text-background/70">
          {index === 0
            ? t.projects.timeline.mostRecent
            : t.projects.timeline.position(index + 1)}
        </span>
      </TooltipContent>
    </TooltipPrimitive.Root>
  )
}

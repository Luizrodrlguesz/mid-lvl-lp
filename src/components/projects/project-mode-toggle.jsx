"use client"

import { motion } from "framer-motion"
import { useT } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { springTransition } from "@/lib/projects-motion"

/**
 * Alterna entre visão resumida e visão técnica detalhada.
 */
export function ProjectModeToggle({ value, onChange }) {
  const t = useT()
  const options = [
    { id: "visual", label: t.projects.mode.visual },
    { id: "tecnico", label: t.projects.mode.tecnico },
  ]

  return (
    <div
      className="flex w-full rounded-lg border border-border/80 bg-muted/20 p-1 sm:inline-flex sm:w-auto"
      role="group"
      aria-label={t.projects.mode.aria}
    >
      {options.map((opt) => {
        const on = value === opt.id
        return (
          <motion.button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            aria-pressed={on}
            whileTap={{ scale: 0.97 }}
            transition={springTransition}
            className={cn(
              "relative basis-1/2 rounded-md px-3.5 py-1.5 text-center text-xs font-semibold uppercase tracking-wider transition-colors duration-200 sm:basis-auto",
              on
                ? "bg-slate-800 text-white shadow-sm dark:bg-foreground dark:text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {opt.label}
          </motion.button>
        )
      })}
    </div>
  )
}

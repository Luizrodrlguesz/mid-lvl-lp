"use client"

import { motion } from "framer-motion"
import { springTransition } from "@/lib/projects-motion"

/**
 * Alternância Web / Mobile com feedback tátil e estado ativo claro.
 */
export function ProjectPlatformSwitcher({
  value,
  onChange,
  options,
  labelledBy,
}) {
  if (!options || options.length < 2) return null

  return (
    <div
      className="inline-flex flex-wrap gap-1 rounded-lg border border-border/80 bg-muted/20 p-1"
      role="group"
      aria-labelledby={labelledBy}
    >
      {options.map((opt) => {
        const selected = value === opt.id
        return (
          <motion.button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            aria-pressed={selected}
            whileTap={{ scale: 0.97 }}
            transition={springTransition}
            className={
              selected
                ? "relative z-10 rounded-md bg-foreground px-3.5 py-1.5 text-sm font-medium text-background shadow-sm ring-1 ring-foreground/10"
                : "rounded-md px-3.5 py-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:bg-muted/60 hover:text-foreground"
            }
          >
            {opt.label}
          </motion.button>
        )
      })}
    </div>
  )
}

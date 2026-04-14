"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { projectsTransition, springTransition } from "@/lib/projects-motion"

/**
 * Alterna entre visão resumida e visão técnica detalhada.
 */
export function ProjectModeToggle({ value, onChange }) {
  const options = [
    { id: "visual", label: "Visual" },
    { id: "tecnico", label: "Técnico" },
  ]

  return (
    <div
      className="inline-flex rounded-lg border border-border/80 bg-muted/20 p-1"
      role="group"
      aria-label="Modo de apresentação do projeto"
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
              "relative rounded-md px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-200",
              on
                ? "bg-foreground text-background shadow-sm"
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

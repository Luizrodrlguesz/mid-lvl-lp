"use client"

import { motion } from "framer-motion"
import { springTransition } from "@/lib/projects-motion"

/**
 * Alterna o conjunto de projetos visíveis (profissional vs pessoal).
 */
export function ProjectsFilter({ value, onChange }) {
  const options = [
    { id: "profissional", label: "Projetos profissionais" },
    { id: "pessoal", label: "Projetos pessoais" },
  ]

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filtrar projetos por tipo"
    >
      {options.map((opt) => {
        const selected = value === opt.id
        return (
          <motion.button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            aria-pressed={selected}
            whileTap={{ scale: 0.98 }}
            transition={springTransition}
            className={
              selected
                ? "rounded-md border border-foreground bg-foreground px-3.5 py-1.5 text-sm font-medium text-background shadow-sm"
                : "rounded-md border border-border/90 bg-transparent px-3.5 py-1.5 text-sm text-foreground transition-colors duration-200 hover:border-border hover:bg-muted/40"
            }
          >
            {opt.label}
          </motion.button>
        )
      })}
    </div>
  )
}

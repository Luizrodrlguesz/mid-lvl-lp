"use client"

import { motion } from "framer-motion"
import { useT } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { springTransition } from "@/lib/projects-motion"

/** Alterna o conjunto de projetos visíveis (profissional vs pessoal). */
export function ProjectsFilter({ value, onChange }) {
  const t = useT()
  const options = [
    { id: "profissional", label: t.projects.filter.profissional },
    { id: "pessoal", label: t.projects.filter.pessoal },
  ]

  return (
    <div
      className="inline-flex rounded-lg mb-3 border border-border/80 bg-muted/20 p-1"
      role="group"
      aria-label={t.projects.filter.aria}
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

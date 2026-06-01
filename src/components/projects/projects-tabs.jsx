"use client"

import { motion } from "framer-motion"

/**
 * Tabs com indicador animado (layoutId) e hover suave.
 */
export function ProjectsTabs({ items, activeId, onSelect }) {
  if (!items.length) {
    return (
      <p className="text-sm text-muted-foreground" role="status">
        Nenhum projeto nesta categoria.
      </p>
    )
  }

  return (
    <nav aria-label="Projetos nesta categoria" className="w-full overflow-x-auto">
      <ul
        role="tablist"
        className="flex min-w-0 flex-wrap gap-1 border-b border-border/80 pb-0.5"
      >
        {items.map((item) => {
          const active = item.id === activeId
          return (
            <li key={item.id} role="presentation" className="relative">
              <motion.button
                type="button"
                id={`project-tab-${item.id}`}
                role="tab"
                aria-selected={active}
                tabIndex={active ? 0 : -1}
                onClick={() => onSelect(item.id)}
                whileHover={active ? undefined : { y: -1 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                className={
                  active
                    ? "relative rounded-t-md px-3.5 py-2.5 text-left text-sm font-semibold text-foreground outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring/60"
                    : "group relative rounded-t-md px-3.5 py-2.5 text-left text-sm text-muted-foreground outline-offset-2 transition-colors duration-200 hover:text-foreground/90 focus-visible:outline-2 focus-visible:outline-ring/60"
                }
              >
                <span className="relative z-10 block">{item.nome}</span>
                {active ? (
                  <motion.span
                    layoutId="projects-tab-underline"
                    className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : (
                  <span
                    className="pointer-events-none absolute inset-x-3 bottom-0 h-px origin-center scale-x-0 bg-primary/45 transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    aria-hidden
                  />
                )}
              </motion.button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

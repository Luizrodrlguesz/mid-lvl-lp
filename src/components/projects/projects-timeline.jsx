"use client"

import { Fragment } from "react"
import { motion } from "framer-motion"
import { TooltipProvider } from "@/components/ui/tooltip"
import { TimelineItem } from "./timeline-item"

/**
 * Linha temporal horizontal tipo constelação: nós clicáveis, ligações e brilho reativo ao scroll.
 */
export function ProjectsTimeline({
  items,
  activeId,
  onSelect,
  tipo,
  scrollLineGlow,
}) {
  if (!items.length) {
    return (
      <p className="text-sm text-muted-foreground" role="status">
        Nenhum projeto nesta categoria.
      </p>
    )
  }

  return (
    <TooltipProvider delayDuration={200}>
      <nav
        aria-label="Linha do tempo dos projetos: mais recente à esquerda, mais antigo à direita"
        className="relative overflow-x-auto bg-transparent pt-1 pb-0"
      >
        <ol className="relative mx-auto flex min-w-[min(100%,640px)] max-w-4xl list-none items-center gap-0 px-3 pt-5 pb-0 md:min-w-0 md:px-4 md:pt-6 md:pb-0">
          {items.map((item, index) => (
            <Fragment key={item.id}>
              {index > 0 ? (
                <li
                  className="relative flex min-h-[44px] min-w-4 flex-1 items-center list-none md:min-w-5"
                  aria-hidden
                >
                  <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-border/85" />
                  <motion.span
                    className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-linear-to-r from-transparent via-primary/50 to-transparent"
                    style={{ opacity: scrollLineGlow }}
                  />
                </li>
              ) : null}
              <li className="relative z-10 flex list-none">
                <TimelineItem
                  id={item.id}
                  nome={item.nome}
                  active={item.id === activeId}
                  tipo={tipo}
                  index={index}
                  onSelect={onSelect}
                />
              </li>
            </Fragment>
          ))}
        </ol>
        <p className="px-3 pb-0 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70 md:px-4">
          Evolução · constelação de projetos
        </p>
      </nav>
    </TooltipProvider>
  )
}

"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"

/*
 * Abas em pílula: o indicador desliza entre as opções (layoutId), como o menu do
 * header. Setas esquerda/direita trocam de aba (padrão do tablist). Usada na
 * troca carrossel/linha do tempo e na de visual/técnico dos projetos.
 */

export type PillTab<T extends string> = { id: T; label: string }

export function PillTabs<T extends string>({
  tabs,
  value,
  onChange,
  label,
  idPrefix,
  controls,
  className,
}: {
  tabs: PillTab<T>[]
  value: T
  onChange: (id: T) => void
  /** Nome do grupo para leitores de tela. */
  label: string
  /** Prefixo dos ids das abas (e do layoutId do indicador); único na página. */
  idPrefix: string
  /** Id do painel que as abas controlam, quando há um. */
  controls?: string
  className?: string
}) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        "inline-flex rounded-full border border-foreground/10 bg-background/40 p-1 backdrop-blur-md",
        className,
      )}
    >
      {tabs.map((tab, index) => {
        const active = tab.id === value
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`${idPrefix}-${tab.id}`}
            aria-selected={active}
            aria-controls={controls}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return
              const step = e.key === "ArrowRight" ? 1 : -1
              const next = tabs[(index + step + tabs.length) % tabs.length]
              onChange(next.id)
              document.getElementById(`${idPrefix}-${next.id}`)?.focus()
            }}
            className={cn(
              "relative flex-1 cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#2798EE]",
              active ? "text-background" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {active ? (
              <motion.span
                layoutId={`${idPrefix}-pill`}
                className="absolute inset-0 rounded-full bg-foreground"
                transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
              />
            ) : null}
            <span className="relative">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}

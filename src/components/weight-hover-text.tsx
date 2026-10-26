"use client"

import { stagger, useAnimate, useReducedMotion, type AnimationOptions } from "motion/react"
import { cn } from "@/lib/utils"

/*
 * Weight Hover (Originkit): ao passar o mouse, o peso de cada letra anima até
 * `toWeight` em sequência (ordem aleatória por padrão); ao sair, volta.
 * Adaptado para o site: usa a Geist (variável, 100–900, já carregada pelo
 * next/font) em vez da Inter do CDN, aceita várias linhas e herda tamanho/cor
 * por classes. Um hover em qualquer parte anima todas as linhas juntas.
 */

type StaggerFrom = "first" | "last" | "center" | "random"

type WeightHoverTextProps = {
  /** Cada item vira uma linha (bloco). */
  lines: string[]
  fromWeight?: number
  toWeight?: number
  /** Intervalo entre letras, em ms. */
  staggerDuration?: number
  staggerFrom?: StaggerFrom
  transition?: AnimationOptions
  className?: string
}

const DEFAULT_TRANSITION: AnimationOptions = { type: "spring", duration: 0.7, bounce: 0.2 }

export function WeightHoverText({
  lines,
  fromWeight = 400,
  toWeight = 900,
  staggerDuration = 30,
  staggerFrom = "random",
  transition = DEFAULT_TRANSITION,
  className,
}: WeightHoverTextProps) {
  const [scope, animate] = useAnimate<HTMLSpanElement>()
  const reduce = useReducedMotion()
  const staggerSec = Math.max(0, staggerDuration) / 1000

  const run = (weight: number) => {
    if (reduce) return
    const letters = scope.current?.querySelectorAll(".letter")
    if (!letters?.length) return
    // Ordem aleatória sorteada a cada hover (fora do render).
    let delay: AnimationOptions["delay"]
    if (staggerFrom === "random") {
      const order = Array.from(letters, (_, i) => i)
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[order[i], order[j]] = [order[j], order[i]]
      }
      delay = (i: number) => staggerSec * order[i]
    } else {
      delay = stagger(staggerSec, { from: staggerFrom })
    }
    animate(letters, { fontVariationSettings: `'wght' ${weight}` }, { ...transition, delay } as AnimationOptions)
  }

  return (
    <span
      ref={scope}
      className={cn("font-sans", className)}
      onPointerEnter={() => run(toWeight)}
      onPointerLeave={() => run(fromWeight)}
    >
      <span className="sr-only">{lines.join(" ")}</span>
      {lines.map((line, lineIndex) => (
        // nowrap: no peso máximo a linha fica mais larga que a coluna e, com as
        // letras em inline-block, quebraria no meio da palavra.
        <span key={lineIndex} aria-hidden className="block whitespace-nowrap">
          {line.split("").map((letter, i) => (
            <span
              key={i}
              className="letter inline-block whitespace-pre"
              style={{ fontVariationSettings: `'wght' ${fromWeight}` }}
            >
              {letter}
            </span>
          ))}
        </span>
      ))}
    </span>
  )
}

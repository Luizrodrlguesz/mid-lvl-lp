// Adaptado de Stacking Cards (fancycomponents.dev), author: Khoa Phan <https://www.pldkhoa.dev>

"use client"

import {
  createContext,
  useContext,
  useRef,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react"
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"

import { cn } from "@/lib/utils"

/*
 * Versão horizontal: a seção fica presa na tela (sticky) enquanto a página
 * rola; o scroll vertical traz cada card da direita até empilhar sobre o
 * anterior. Os cards de baixo encolhem um pouco e ficam levemente deslocados,
 * deixando a borda à mostra — o mesmo efeito de pilha do original, no eixo X.
 */

interface HorizontalStackingCardsProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  totalCards: number
  /** Quanto cada card de baixo encolhe por card empilhado em cima. */
  scaleMultiplier?: number
  /** Deslocamento (vw) entre os cards da pilha, para as bordas aparecerem. */
  stackOffset?: number
}

interface HorizontalStackingCardItemProps extends HTMLAttributes<HTMLDivElement>, PropsWithChildren {
  index: number
}

const HorizontalStackingCardsContext = createContext<{
  progress: MotionValue<number>
  totalCards: number
  scaleMultiplier: number
  stackOffset: number
} | null>(null)

export default function HorizontalStackingCards({
  children,
  className,
  totalCards,
  scaleMultiplier = 0.04,
  stackOffset = 1.2,
  style,
  ...props
}: HorizontalStackingCardsProps) {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })

  return (
    <HorizontalStackingCardsContext.Provider
      value={{ progress: scrollYProgress, totalCards, scaleMultiplier, stackOffset }}
    >
      {/* Uma tela de rolagem por card; o palco fica preso durante esse trecho. */}
      <div
        ref={targetRef}
        className={cn("relative", className)}
        style={{ height: `${totalCards * 100}svh`, ...style }}
        {...props}
      >
        <div className="sticky top-0 h-svh overflow-hidden">{children}</div>
      </div>
    </HorizontalStackingCardsContext.Provider>
  )
}

export function HorizontalStackingCardItem({
  index,
  className,
  children,
  ...props
}: HorizontalStackingCardItemProps) {
  const context = useContext(HorizontalStackingCardsContext)
  if (!context) throw new Error("HorizontalStackingCardItem must be used within HorizontalStackingCards")
  const { progress, totalCards, scaleMultiplier, stackOffset } = context

  const steps = Math.max(1, totalCards - 1)
  const settled = `${index * stackOffset}vw`

  // Entra da direita no trecho dele; o primeiro já começa no lugar.
  const x = useTransform(
    progress,
    index === 0 ? [0, 1] : [(index - 1) / steps, index / steps],
    index === 0 ? [settled, settled] : ["100vw", settled],
  )
  // Depois de assentar, encolhe conforme os próximos cards empilham por cima.
  // (O último nunca encolhe; evita um intervalo de entrada vazio [1, 1].)
  const isLast = index >= steps
  const scale = useTransform(
    progress,
    isLast ? [0, 1] : [index / steps, 1],
    isLast ? [1, 1] : [1, 1 - (totalCards - 1 - index) * scaleMultiplier],
  )

  // Marca o card como "coberto" quando o próximo já assentou por cima dele.
  // Vai direto no DOM (data-covered), sem re-render: o conteúdo pode usar isso
  // para desligar efeitos caros que ninguém vê, como backdrop-filter.
  const wrapperRef = useRef<HTMLDivElement>(null)
  useMotionValueEvent(progress, "change", (value) => {
    const el = wrapperRef.current
    if (!el || isLast) return
    const covered = value >= (index + 1) / steps
    if (covered !== (el.dataset.covered === "true")) el.dataset.covered = String(covered)
  })

  return (
    // Os invólucros cobrem o palco inteiro (até os cards que ainda estão fora da
    // tela); só o card em si recebe ponteiro, senão eles bloqueiam os de baixo.
    <div
      ref={wrapperRef}
      className={cn("group/stack-item pointer-events-none absolute inset-0", className)}
      style={{ zIndex: index }}
      {...props}
    >
      {/* will-change: mantém o card numa camada própria enquanto a escala muda a cada quadro. */}
      <motion.div
        className="flex h-full origin-left items-center will-change-transform [&>*]:pointer-events-auto"
        style={{ x, scale }}
      >
        {children}
      </motion.div>
    </div>
  )
}

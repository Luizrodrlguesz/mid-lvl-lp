"use client"

import { Fragment, useRef, type ReactNode } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"
import { cn } from "@/lib/utils"

/*
 * Text Scroll Word Reveal (exemplo do motion.dev): o texto fica preso na tela
 * enquanto a seção rola, e cada palavra acende em sequência conforme o scroll.
 * Adaptado para o site: estilos em Tailwind em vez da folha de estilo própria,
 * texto/rótulo por props e um `overlay` opcional dentro do palco preso (usado
 * pela cortina do About).
 */

const START_OPACITY = 0.15
const SPREAD = 0.8
const WORD_DURATION = 0.2

export interface WordProgressRange {
  start: number
  end: number
}

function getWordProgressRange(index: number, count: number): WordProgressRange {
  const start = count <= 1 ? 0 : (index / (count - 1)) * SPREAD

  return {
    start,
    end: Math.min(1, start + WORD_DURATION),
  }
}

export function getWordOpacity(
  progress: number,
  { start, end }: WordProgressRange,
  startOpacity = START_OPACITY,
): number {
  if (progress <= start) return startOpacity
  if (progress >= end) return 1

  const wordProgress = (progress - start) / (end - start)
  return startOpacity + (1 - startOpacity) * wordProgress
}

function Word({
  children,
  progress,
  index,
  count,
  reducedMotion,
}: {
  children: string
  progress: MotionValue<number>
  index: number
  count: number
  reducedMotion: boolean
}) {
  const range = getWordProgressRange(index, count)
  const opacity = useTransform(progress, (latest) => getWordOpacity(latest, range))

  return (
    <motion.span aria-hidden="true" style={reducedMotion ? undefined : { opacity }}>
      {children}
    </motion.span>
  )
}

type TextScrollWordRevealProps = {
  statement: string
  kicker: string
  headingId: string
  /**
   * Camada extra dentro do palco preso (ex.: a cortina do About). Recebe o
   * progresso (0→1) do trecho de introdução reservado por `introPortion`.
   */
  overlay?: (introProgress: MotionValue<number>) => ReactNode
  /** Fração inicial do scroll reservada ao overlay; as palavras usam o restante. */
  introPortion?: number
  /** Altura total da área de rolagem (quanto mais alta, mais devagar a revelação). */
  scrollLength?: string
  /** Coluna à direita do texto (some abaixo de lg). */
  aside?: ReactNode
  /**
   * Altura do palco preso; menor que a tela deixa o conteúdo seguinte aparecer
   * embaixo. O texto fica alinhado à base do palco, colado no que vem depois.
   */
  stageHeight?: string
}

export function TextScrollWordReveal({
  statement,
  kicker,
  headingId,
  overlay,
  aside,
  stageHeight = "100svh",
  introPortion = 0,
  scrollLength = "220vh",
}: TextScrollWordRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })
  const words = statement.split(" ")
  // Introdução (overlay) primeiro; as palavras só começam a acender depois dela.
  const introProgress = useTransform(scrollYProgress, [0, Math.max(introPortion, 0.0001)], [0, 1])
  const wordsProgress = useTransform(scrollYProgress, [introPortion, 1], [0, 1])

  return (
    <div ref={sectionRef} className="relative w-full overflow-x-clip" style={{ minHeight: scrollLength }}>
      <div
        // Sem overflow-hidden: o overlay pode passar da altura do palco (a cortina
        // ocupa a tela toda, inclusive a faixa abaixo dele). O sticky cria um
        // contexto de empilhamento próprio, então o z-20 é o que coloca o overlay
        // acima do conteúdo que vem depois (ex.: a "tampinha" do About, z-10).
        className="sticky top-0 z-20 flex w-full items-end pb-6 pt-12"
        style={{ height: stageHeight }}
      >
        <div
          className={cn(
            "mx-auto grid w-[90%] items-center gap-10",
            aside && "lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]",
          )}
        >
          {/* Barra de progresso + texto, alinhados pelo topo. */}
          <div className="flex items-start gap-10">
            <div aria-hidden="true" className="relative hidden h-28 w-px shrink-0 overflow-hidden bg-border sm:block">
              <motion.span
                className="absolute inset-0 block origin-top bg-foreground"
                style={{ scaleY: reducedMotion ? 1 : scrollYProgress }}
              />
            </div>

            <div className="max-w-[40rem]">
              <p className="mb-7 font-mono text-[11px] font-semibold uppercase leading-none tracking-[0.16em] text-muted-foreground sm:mb-10">
                {kicker}
              </p>
              <h2
                id={headingId}
                aria-label={statement}
                // Largura fixa (não em ch): a fonte menor mantém o mesmo espaço do texto.
                className="m-0 text-[clamp(20px,2.3vw,32px)] font-bold leading-[1.15] tracking-[-0.03em] text-pretty"
              >
                {words.map((word, index) => (
                  <Fragment key={`${word}-${index}`}>
                    <Word progress={wordsProgress} index={index} count={words.length} reducedMotion={Boolean(reducedMotion)}>
                      {word}
                    </Word>
                    {index < words.length - 1 ? " " : null}
                  </Fragment>
                ))}
              </h2>
            </div>
          </div>

          {/* Coluna lateral: no canto direito, alinhada ao topo do palco. */}
          {aside ? <div className="hidden self-start justify-self-end lg:block">{aside}</div> : null}
        </div>

        {overlay?.(introProgress)}
      </div>
    </div>
  )
}

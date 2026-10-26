"use client"

import { Fragment, useLayoutEffect, useRef, type ReactNode } from "react"
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
  /** Rótulo pequeno acima do título (mesmo padrão dos cabeçalhos das outras seções). */
  eyebrow: string
  title: string
  headingId: string
  /**
   * Camada extra dentro do palco preso (ex.: a cortina do About). Recebe o
   * progresso (0→1) do trecho de introdução reservado por `introPortion`.
   */
  overlay?: (introProgress: MotionValue<number>) => ReactNode
  /** Fração inicial do trecho preso reservada ao overlay; as palavras usam o restante. */
  introPortion?: number
  /** Quanto se rola com o palco preso (quanto maior, mais devagar a revelação). */
  pinLength?: string
  /** Coluna à direita do texto (some abaixo de lg). */
  aside?: ReactNode
  /** Conteúdo logo abaixo do texto, na mesma coluna (alinhado a ele). */
  belowText?: ReactNode
  /**
   * Conteúdo logo abaixo do texto, dentro do palco: aparece desde o início
   * (com a parte de baixo cortada pela tela) e segue rolando quando a revelação
   * termina.
   */
  children?: ReactNode
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

export function TextScrollWordReveal({
  statement,
  eyebrow,
  title,
  headingId,
  overlay,
  aside,
  belowText,
  introPortion = 0,
  pinLength = "220vh",
  children,
}: TextScrollWordRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const spacerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  // O palco pode ser mais alto que a tela, então o progresso vem do trecho em
  // que ele fica preso: do topo do contêiner até a altura do espaçador.
  const topRef = useRef(0)
  const pinRef = useRef(1)
  useLayoutEffect(() => {
    const measure = () => {
      const container = containerRef.current
      const spacer = spacerRef.current
      if (!container || !spacer) return
      topRef.current = container.getBoundingClientRect().top + window.scrollY
      pinRef.current = Math.max(1, spacer.offsetHeight)
    }
    measure()
    const observer = new ResizeObserver(measure)
    if (containerRef.current) observer.observe(containerRef.current)
    window.addEventListener("resize", measure)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [])

  const { scrollY } = useScroll()
  const scrollYProgress = useTransform(scrollY, (y) => clamp01((y - topRef.current) / pinRef.current))
  const words = statement.split(" ")
  // Introdução (overlay) primeiro; as palavras só começam a acender depois dela.
  const introProgress = useTransform(scrollYProgress, [0, Math.max(introPortion, 0.0001)], [0, 1])
  const wordsProgress = useTransform(scrollYProgress, [introPortion, 1], [0, 1])

  return (
    <div ref={containerRef} className="relative w-full overflow-x-clip">
      <div
        // Palco preso com todo o conteúdo: durante a revelação aparece o topo (texto,
        // destaques e o começo do que vem depois); no fim ele segue rolando.
        // O sticky cria um contexto de empilhamento próprio; o z-20 deixa o overlay
        // (a cortina, da altura da tela) acima do resto da página.
        className="sticky top-0 z-20 w-full pb-8 pt-10"
      >
        <div
          className={cn(
            "mx-auto grid w-[90%] items-start gap-10",
            aside && "lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]",
          )}
        >
          {/* Cabeçalho (rótulo + título) e, um pouco abaixo, o texto revelado. */}
          <div className="max-w-[54rem]">
            <header className="space-y-3">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {eyebrow}
              </p>
              <h2 id={headingId} className="font-display text-3xl font-bold sm:text-4xl">
                {title}
              </h2>
            </header>
            {/* Largura fixa (não em ch): a fonte menor mantém o mesmo espaço do texto. */}
            <p className="font-display m-0 mt-12 text-[clamp(20px,2.3vw,32px)] font-bold leading-[1.2] text-pretty sm:mt-16">
              <span className="sr-only">{statement}</span>
              {words.map((word, index) => (
                <Fragment key={`${word}-${index}`}>
                  <Word progress={wordsProgress} index={index} count={words.length} reducedMotion={Boolean(reducedMotion)}>
                    {word}
                  </Word>
                  {index < words.length - 1 ? " " : null}
                </Fragment>
              ))}
            </p>
            {belowText}
          </div>

          {/* Coluna lateral: no canto direito, alinhada ao topo. */}
          {aside ? <div className="hidden justify-self-end lg:block">{aside}</div> : null}
        </div>

        {children}

        {overlay?.(introProgress)}
      </div>

      {/* Espaçador: é a distância rolada com o palco preso. */}
      <div ref={spacerRef} aria-hidden style={{ height: pinLength }} />
    </div>
  )
}

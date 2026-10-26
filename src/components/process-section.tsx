"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type MotionStyle } from "motion/react"
import { ArrowUpRight, Clock, X } from "lucide-react"
import { ProcessArt } from "@/components/process-art"
import { useT } from "@/lib/i18n"
import { cn } from "@/lib/utils"

/*
 * "Como eu trabalho": cada etapa é só o título (grande) e a etapa, com o título
 * atravessando por cima de uma imagem ilustrativa. A parte do título que fica
 * sobre a imagem muda de cor: são duas cópias do texto sobrepostas, e a branca
 * é recortada (clip-path) exatamente no retângulo da imagem. Com o scroll o
 * título desliza na horizontal, então a troca de cor corre pelas letras.
 *
 * As imagens alternam de lado e o título fica centrado na borda interna delas (à
 * esquerda ou à direita). Ao clicar na imagem, ela se expande (layoutId, no estilo do exemplo
 * iOS App Store do motion.dev) num artigo com os detalhes da etapa; fecha no X,
 * no Esc ou clicando fora.
 */

const CARD_SPRING = { type: "spring", bounce: 0.18, duration: 0.6 } as const

/*
 * Posição da imagem na linha, em % da largura: --l é o início e --w a largura.
 * As mesmas variáveis posicionam a imagem (margem) e o recorte da cópia branca
 * do título, então os dois batem em qualquer tela.
 */
const ROW_LEFT = "[--l:42%] [--w:58%] sm:[--l:56%] sm:[--w:44%] lg:[--l:66%] lg:[--w:34%]"
const ROW_RIGHT = "[--l:0%] [--w:58%] sm:[--w:44%] lg:[--w:34%]"

// Títulos longos quebram em duas linhas (equilibradas) em vez de sair da tela.
const titleClass =
  "font-display w-max max-w-[88vw] text-balance text-center text-[clamp(44px,9vw,160px)] font-bold italic leading-[0.9] tracking-tight lg:max-w-[60vw]"

/**
 * Caminho do traço em pixels, nas medidas reais da lista (largura total da
 * página). As imagens ficam encostadas nas laterais do conteúdo, então o laço
 * fica no lado vazio de cada linha, com centro em 27,5% (esquerda) ou 72,5%
 * (direita); cada linha ocupa 1/n da altura. A primeira imagem fica à direita,
 * então o traço começa no lado esquerdo e alterna. Em pixels (e não num viewBox
 * esticado) o tracejado do pathLength bate com o comprimento real e a espessura
 * fica constante.
 */
function buildPath(rows: number, w: number, h: number) {
  const rowH = h / rows
  const k = w / 1000 // escala horizontal das curvas
  const pts: string[] = []
  let prevExit: [number, number] | null = null

  for (let i = 0; i < rows; i++) {
    const left = i % 2 === 0 // imagem à direita → traço no lado esquerdo
    const cx = (left ? 0.275 : 0.725) * w
    const cy = rowH * (i + 0.5)
    const dir = left ? 1 : -1
    const ry = rowH * 0.24 // altura do laço

    const enter: [number, number] = [cx + dir * 55 * k, cy - ry]
    if (!prevExit) {
      // Entra pela lateral esquerda da página.
      pts.push(`M ${-40 * k} ${cy - ry * 1.9}`)
      pts.push(`C ${120 * k} ${cy - ry * 2}, ${enter[0] - 120 * k} ${enter[1] - ry * 0.9}, ${enter[0]} ${enter[1]}`)
    } else {
      // Cruza para o outro lado no espaço entre as imagens.
      pts.push(
        `C ${prevExit[0]} ${prevExit[1] + rowH * 0.28}, ${enter[0]} ${enter[1] - rowH * 0.28}, ${enter[0]} ${enter[1]}`,
      )
    }

    // Laço em volta do centro do lado vazio.
    pts.push(
      `C ${cx + dir * 45 * k} ${cy + ry * 1.1}, ${cx - dir * 95 * k} ${cy + ry * 0.95}, ${cx - dir * 70 * k} ${cy}`,
    )
    const exit: [number, number] = [cx + dir * 60 * k, cy + ry * 1.2]
    pts.push(`C ${cx - dir * 45 * k} ${cy - ry * 1.15}, ${cx + dir * 80 * k} ${cy - ry * 0.6}, ${exit[0]} ${exit[1]}`)
    prevExit = exit
  }

  // Sai pela lateral direita da página.
  if (prevExit) {
    pts.push(
      `C ${prevExit[0]} ${prevExit[1] + rowH * 0.25}, ${900 * k} ${h - rowH * 0.05}, ${w + 40 * k} ${h - rowH * 0.12}`,
    )
  }
  return pts.join(" ")
}

export function ProcessSection() {
  const t = useT()
  const reduce = useReducedMotion()
  const listRef = useRef<HTMLDivElement>(null)
  const steps = t.process.steps
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Medidas reais da lista: o caminho é gerado nelas (ver buildPath).
  useEffect(() => {
    const el = listRef.current
    if (!el) return
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight })
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const path = size.w && size.h ? buildPath(steps.length, size.w, size.h) : ""

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.75", "end 0.6"],
  })
  // Desenha o traço do começo ao fim acompanhando o scroll pela lista.
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="processo" aria-labelledby="heading-processo" className="relative isolate overflow-x-clip py-24">
      {/*
        Gradiente de cima para baixo, de transparente até o fundo do footer
        (--stage: preto no dark, off-white no light), para a seção se fundir nele.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-[var(--stage)]"
      />
      <header className="mx-auto w-[90%] space-y-3">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {t.process.eyebrow}
        </p>
        <h2 id="heading-processo" className="font-display text-3xl font-bold sm:text-4xl">
          {t.process.title}
        </h2>
        <p className="max-w-2xl text-muted-foreground">{t.process.intro}</p>
      </header>

      {/* Largura total: o traço entra e sai pelas laterais da página (atrás das etapas). */}
      <div ref={listRef} className="relative mt-6">
        <svg
          aria-hidden
          viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
          overflow="visible"
          className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          fill="none"
        >
          <defs>
            <linearGradient id="process-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#0023ff" />
              <stop offset="1" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
          {path ? (
            <motion.path
              d={path}
              stroke="url(#process-stroke)"
              strokeWidth={6}
              strokeLinecap="round"
              style={{ pathLength: reduce ? 1 : pathLength }}
            />
          ) : null}
        </svg>

        <ol className="relative mx-auto w-[90%]">
        {steps.map((step, index) => (
          <ProcessStep
            key={step.title}
            index={index}
            title={step.title}
            label={`${t.process.stepLabel} ${index + 1}`}
            hint={t.process.openDetails}
            onOpen={() => setOpenIndex(index)}
          />
        ))}
        </ol>
      </div>

      <ProcessDetail index={openIndex} onClose={() => setOpenIndex(null)} />
    </section>
  )
}

/** Etapa: imagem clicável e o título atravessando por cima dela. */
function ProcessStep({
  index,
  title,
  label,
  hint,
  onOpen,
}: {
  index: number
  title: string
  label: string
  hint: string
  onOpen: () => void
}) {
  const reduce = useReducedMotion()
  const rowRef = useRef<HTMLLIElement>(null)
  // Imagem à direita nas etapas pares (título à esquerda) e à esquerda nas ímpares.
  const imageRight = index % 2 === 0
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ["start end", "end start"] })
  // O título desliza no sentido da imagem enquanto a linha cruza a tela.
  const x = useTransform(scrollYProgress, [0, 1], imageRight ? ["-10%", "10%"] : ["10%", "-10%"])
  const style: MotionStyle = { x: reduce ? 0 : x }

  // O título fica centrado na borda interna da imagem: metade fora, metade sobre
  // ela, qualquer que seja o tamanho da palavra.
  const titleLayer = cn(
    "absolute top-[28%] -translate-x-1/2 sm:top-[22%]",
    imageRight ? "left-[var(--l)]" : "left-[calc(var(--l)+var(--w))]",
  )

  return (
    <li ref={rowRef} className={cn("relative py-10 lg:py-14", imageRight ? ROW_LEFT : ROW_RIGHT)}>
      <motion.button
        type="button"
        layoutId={`process-card-${index}`}
        transition={CARD_SPRING}
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-label={`${label}: ${title}. ${hint}`}
        style={{ borderRadius: 24 }}
        className="group relative ml-[var(--l)] block aspect-square w-[var(--w)] cursor-pointer overflow-hidden text-left shadow-[0_24px_60px_-28px_rgba(0,0,0,0.6)] outline-none focus-visible:ring-2 focus-visible:ring-[#2798EE]"
      >
        <motion.div layoutId={`process-art-${index}`} transition={CARD_SPRING} className="absolute inset-0">
          <ProcessArt
            index={index}
            className="size-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </motion.div>
        <span className="absolute left-4 top-3 font-display text-lg font-medium text-white sm:left-5 sm:top-4 sm:text-2xl">
          {label}
        </span>
        <span className="absolute bottom-4 right-5 inline-flex items-center gap-1 text-xs font-semibold text-white/85 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          {hint}
          <ArrowUpRight className="size-3.5" aria-hidden />
        </span>
      </motion.button>

      {/* Título fora da imagem (azul do site). */}
      <div className={cn("pointer-events-none", titleLayer)}>
        <motion.h3 className={cn(titleClass, "text-[#2798EE]")} style={style}>
          {title}
        </motion.h3>
      </div>
      {/* Cópia branca recortada no retângulo da imagem: a cor troca sobre ela. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [clip-path:inset(0_calc(100%-var(--l)-var(--w))_0_var(--l)_round_24px)]"
      >
        <div className={titleLayer}>
          <motion.p className={cn(titleClass, "text-white")} style={style}>
            {title}
          </motion.p>
        </div>
      </div>
    </li>
  )
}

/** Artigo expandido da etapa (portal no body: a seção tem `isolate`). */
function ProcessDetail({ index, onClose }: { index: number | null; onClose: () => void }) {
  const t = useT()
  const [mounted, setMounted] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const step = index === null ? null : t.process.steps[index]

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Trava o scroll da página, fecha no Esc e põe o foco no X enquanto aberto.
  useEffect(() => {
    if (index === null) return
    const html = document.documentElement
    const previous = html.style.overflow
    html.style.overflow = "hidden"
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => {
      html.style.overflow = previous
      document.removeEventListener("keydown", onKey)
    }
  }, [index, onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {step && index !== null ? (
        <div key="process-detail" className="fixed inset-0 z-[300]">
          <motion.div
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          {/* data-lenis-prevent: a rolagem aqui dentro é a nativa, não a do Lenis. */}
          <div
            className="absolute inset-0 flex overflow-y-auto overscroll-contain p-4 sm:p-8"
            data-lenis-prevent
            onClick={onClose}
          >
            <motion.article
              layoutId={`process-card-${index}`}
              transition={CARD_SPRING}
              role="dialog"
              aria-modal="true"
              aria-label={step.title}
              onClick={(e) => e.stopPropagation()}
              style={{ borderRadius: 28 }}
              // Largo e baixo: cabe na tela sem rolar (m-auto centraliza; se a tela for
              // baixa demais, o contêiner ainda rola).
              className="relative m-auto w-full max-w-6xl overflow-hidden bg-[var(--stage)] text-[var(--stage-foreground)] shadow-2xl"
            >
              <div className="relative h-48 overflow-hidden sm:h-56">
                <motion.div layoutId={`process-art-${index}`} transition={CARD_SPRING} className="absolute inset-0">
                  <ProcessArt index={index} fit="contain" gingado className="size-full" />
                </motion.div>
                <span className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                <div className="absolute inset-x-6 bottom-6 text-white sm:inset-x-8">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                    {t.process.stepLabel} {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display mt-1 text-3xl font-semibold sm:text-4xl">{step.title}</h3>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label={t.process.close}
                  className="absolute right-4 top-4 grid size-10 cursor-pointer place-items-center rounded-full bg-black/35 text-white ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-black/55"
                >
                  <X className="size-5" aria-hidden />
                </button>
              </div>

              {/* O texto entra depois que o card terminou de crescer. */}
              <motion.div
                className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12"
                initial={{ opacity: 0, y: 12 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.2, duration: 0.35 },
                }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
              >
                {/* Esquerda: resumo e como funciona. */}
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed">{step.description}</p>
                  <section className="space-y-3">
                    <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {t.process.detailsTitle}
                    </h4>
                    <p className="leading-relaxed text-muted-foreground">{step.details}</p>
                  </section>
                </div>

                {/* Direita: entregas, ferramentas e duração. */}
                <div className="space-y-6">
                  <section className="space-y-3">
                    <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {t.process.deliverablesTitle}
                    </h4>
                    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                      {step.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 rounded-2xl bg-foreground/[0.05] px-3 py-2.5 text-sm leading-relaxed"
                        >
                          <span
                            aria-hidden
                            className="mt-1.5 size-2 shrink-0 rounded-full bg-gradient-to-r from-[#2798EE] to-[#31E18E]"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <div className="flex flex-wrap items-end justify-between gap-6 border-t border-foreground/10 pt-6">
                    <section className="space-y-3">
                      <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {t.process.toolsTitle}
                      </h4>
                      <ul className="flex flex-wrap gap-2">
                        {step.tools.map((tool) => (
                          <li key={tool} className="rounded-full bg-foreground/[0.07] px-3 py-1 text-xs font-medium">
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </section>
                    <p className="flex items-center gap-2 text-sm">
                      <Clock className="size-4 text-muted-foreground" aria-hidden />
                      <span className="text-muted-foreground">{t.process.durationTitle}:</span>
                      <span className="font-semibold">{step.duration}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.article>
          </div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

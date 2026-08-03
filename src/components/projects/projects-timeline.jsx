"use client"

import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useT } from "@/lib/i18n"
import { TimelineItem } from "./timeline-item"

/** Amplitude do zigue-zague vertical (px). */
const ZIGZAG_AMPLITUDE = 20
/** Folga entre a ponta da linha e a borda do nó, para a linha não passar por baixo do dot. */
const NODE_GAP = 24

/** index par → base (translateY 0); ímpar → elevado (translateY negativo). */
function nodeOffset(index) {
  return index % 2 === 0 ? 0 : -ZIGZAG_AMPLITUDE
}

/**
 * Linha temporal tipo constelação em zigue-zague vertical leve: nós clicáveis,
 * ligações inclinadas e brilho reativo ao scroll. O nó ativo exibe um foguete.
 *
 * As ligações são desenhadas num SVG sobreposto a partir da posição medida de
 * cada nó, garantindo alinhamento exato de centro a centro em qualquer largura.
 */
export function ProjectsTimeline({
  items,
  activeId,
  onSelect,
  tipo,
  scrollLineGlow,
}) {
  const t = useT()
  const listRef = useRef(null)
  const nodeRefs = useRef(new Map())
  const [links, setLinks] = useState({ width: 0, height: 0, segments: [] })

  const setNodeRef = useCallback((id, el) => {
    if (el) nodeRefs.current.set(id, el)
    else nodeRefs.current.delete(id)
  }, [])

  const measure = useCallback(() => {
    const list = listRef.current
    if (!list) return

    const base = list.getBoundingClientRect()
    const points = []
    for (const item of items) {
      const el = nodeRefs.current.get(item.id)
      if (!el) return
      const rect = el.getBoundingClientRect()
      points.push({
        x: rect.left - base.left + rect.width / 2,
        y: rect.top - base.top + rect.height / 2,
      })
    }

    const segments = []
    for (let i = 1; i < points.length; i += 1) {
      const a = points[i - 1]
      const b = points[i]
      const dx = b.x - a.x
      const dy = b.y - a.y
      const length = Math.hypot(dx, dy)
      if (length <= NODE_GAP * 2) continue
      const ux = dx / length
      const uy = dy / length
      segments.push({
        key: `${items[i - 1].id}-${items[i].id}`,
        x1: a.x + ux * NODE_GAP,
        y1: a.y + uy * NODE_GAP,
        x2: b.x - ux * NODE_GAP,
        y2: b.y - uy * NODE_GAP,
      })
    }

    setLinks({ width: base.width, height: base.height, segments })
  }, [items])

  useEffect(() => {
    const list = listRef.current
    if (!list) return undefined

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    for (const el of nodeRefs.current.values()) observer.observe(el)
    return () => observer.disconnect()
  }, [measure])

  if (!items.length) {
    return (
      <p className="text-sm text-muted-foreground" role="status">
        {t.projects.timeline.empty}
      </p>
    )
  }

  return (
    <TooltipProvider delayDuration={200}>
      <nav
        aria-label={t.projects.timeline.aria}
        className="relative overflow-x-auto bg-transparent pt-1 pb-0"
      >
        <ol
          ref={listRef}
          className="relative mx-auto flex min-w-[min(100%,640px)] max-w-4xl list-none items-center gap-0 px-3 pt-8 pb-2 md:min-w-0 md:px-4 md:pt-9 md:pb-3"
        >
          {links.segments.length ? (
            <svg
              className="pointer-events-none absolute left-0 top-0 overflow-visible"
              width={links.width}
              height={links.height}
              viewBox={`0 0 ${links.width} ${links.height}`}
              aria-hidden
            >
              <g className="text-border/85">
                {links.segments.map((segment) => (
                  <line
                    key={segment.key}
                    x1={segment.x1}
                    y1={segment.y1}
                    x2={segment.x2}
                    y2={segment.y2}
                    stroke="currentColor"
                    strokeWidth={1}
                    strokeLinecap="round"
                  />
                ))}
              </g>
              <defs>
                {links.segments.map((segment) => (
                  <linearGradient
                    key={segment.key}
                    id={`timeline-glow-${segment.key}`}
                    gradientUnits="userSpaceOnUse"
                    x1={segment.x1}
                    y1={segment.y1}
                    x2={segment.x2}
                    y2={segment.y2}
                  >
                    <stop offset="0%" stopColor="currentColor" stopOpacity={0} />
                    <stop offset="50%" stopColor="currentColor" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <motion.g
                className="text-primary"
                style={{ opacity: scrollLineGlow }}
              >
                {links.segments.map((segment) => (
                  <line
                    key={segment.key}
                    x1={segment.x1}
                    y1={segment.y1}
                    x2={segment.x2}
                    y2={segment.y2}
                    stroke={`url(#timeline-glow-${segment.key})`}
                    strokeWidth={1}
                    strokeLinecap="round"
                  />
                ))}
              </motion.g>
            </svg>
          ) : null}

          {items.map((item, index) => (
            <Fragment key={item.id}>
              {index > 0 ? (
                <li
                  className="min-h-[44px] min-w-4 flex-1 list-none md:min-w-5"
                  aria-hidden
                />
              ) : null}
              <li
                ref={(el) => setNodeRef(item.id, el)}
                className="relative z-10 flex list-none"
                style={{ transform: `translateY(${nodeOffset(index)}px)` }}
              >
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
        <p className="hidden px-3 pb-0 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70 sm:block md:px-4">
          {t.projects.timeline.caption}
        </p>
      </nav>
    </TooltipProvider>
  )
}

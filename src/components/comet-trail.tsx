"use client"

// Traço com cometa na ponta, desenhado conforme um progresso (0–1). Variante "tela cheia"
// do HeroCometPath: o caminho é escrito em unidades 0–1000 (fração do container × 1000)
// e convertido para pixels do container, para o traço e o cometa não deformarem.

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion"

import { cn } from "@/lib/utils"

/** Escala os pares de coordenadas de um path absoluto (M/L/C/S/Q) de 0–1000 para px. */
function scalePath(d: string, width: number, height: number) {
  let isX = true
  return d.replace(/-?\d*\.?\d+/g, (value) => {
    const scaled = Number(value) * ((isX ? width : height) / 1000)
    isX = !isX
    return scaled.toFixed(1)
  })
}

type CometTrailProps = {
  /** Caminho absoluto em unidades 0–1000 nos dois eixos. */
  d: string
  progress: MotionValue<number>
  className?: string
}

export function CometTrail({ d, progress, className }: CometTrailProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize((prev) =>
        prev.width === width && prev.height === height ? prev : { width, height },
      )
    })
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  const scaledPath = useMemo(
    () => (size.width ? scalePath(d, size.width, size.height) : ""),
    [d, size.width, size.height],
  )

  const headX = useMotionValue(-100)
  const headY = useMotionValue(-100)
  const headOpacity = useTransform(progress, [0, 0.01, 0.99, 1], [0, 1, 1, 0])

  const placeHead = useCallback(
    (value: number) => {
      const path = pathRef.current
      if (!path) return
      const point = path.getPointAtLength(value * path.getTotalLength())
      headX.set(point.x)
      headY.set(point.y)
    },
    [headX, headY],
  )

  useMotionValueEvent(progress, "change", placeHead)
  // Reposiciona a cabeça quando o caminho muda de tamanho (resize).
  useEffect(() => {
    if (scaledPath) placeHead(progress.get())
  }, [scaledPath, placeHead, progress])

  return (
    <div ref={rootRef} className={cn("pointer-events-none", className)} aria-hidden>
      {scaledPath ? (
        <svg
          viewBox={`0 0 ${size.width} ${size.height}`}
          fill="none"
          overflow="visible"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="comet-trail-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" className="[stop-color:#ffffff] dark:[stop-color:#0400ff]" />
              <stop offset="0.6" className="[stop-color:#e0f2fe] dark:[stop-color:#38bdf8]" />
              <stop offset="1" className="[stop-color:#ffffff] dark:[stop-color:#07cce2]" />
            </linearGradient>
            <radialGradient id="comet-trail-head">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.35" stopColor="#bae6fd" stopOpacity="0.9" />
              <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
            </radialGradient>
            <filter id="comet-trail-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>

          <motion.path
            d={scaledPath}
            stroke="url(#comet-trail-stroke)"
            strokeWidth={9}
            strokeLinecap="round"
            opacity={0.45}
            filter="url(#comet-trail-glow)"
            style={{ pathLength: progress }}
          />
          <motion.path
            ref={pathRef}
            d={scaledPath}
            stroke="url(#comet-trail-stroke)"
            strokeWidth={2.8}
            strokeLinecap="round"
            style={{ pathLength: progress }}
          />

          {/* Cabeça do cometa: mesmo desenho do HeroCometPath (brilho + estrela de 4 pontas). */}
          <motion.g style={{ x: headX, y: headY, opacity: headOpacity }}>
            <circle r={21} fill="url(#comet-trail-head)" />
            <path
              d="M 0 -13 L 2.4 -2.4 L 13 0 L 2.4 2.4 L 0 13 L -2.4 2.4 L -13 0 L -2.4 -2.4 Z"
              fill="#ffffff"
            />
          </motion.g>
        </svg>
      ) : null}
    </div>
  )
}

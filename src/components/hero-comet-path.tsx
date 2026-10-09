"use client"

// Traço que acompanha o scroll — adaptado do Skiper 19 (Skiper UI, @gurvinder-singh02).
// A ponta do traço vira um cometa para combinar com o tema espacial.

import { useEffect, useRef } from "react"
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"

import { cn } from "@/lib/utils"

/**
 * Coordenadas em unidades do viewBox, onde a foto ocupa x 0–500 (a largura dela)
 * e começa em y 0. O traço nasce escondido atrás da foto, sai pelo canto superior
 * direito quase na horizontal, curva suave para baixo, desce reto, faz os loops e sai pela
 * direita da tela logo abaixo do hero (o traço continua na seção de skills).
 */
const COMET_PATH =
  "M 430 60 C 520 60 640 70 660 150 C 675 215 560 240 545 330 C 536 400 536 480 536 560 C 540 660 570 740 630 750 C 700 760 720 690 670 660 C 610 625 560 720 610 790 C 660 860 740 850 750 790 C 760 730 700 720 680 770 C 650 840 640 960 760 1020 C 880 1080 1100 1060 1400 1040"

/** Quanto do traço aparece antes do scroll (até o fim da descida reta). */
const INTRO_LENGTH = 0.3
const INTRO_DELAY_S = 3.4
const INTRO_DURATION_S = 1.6

type HeroCometPathProps = {
  className?: string
  /** Progresso do scroll do hero (0 = topo, 1 = hero fora da tela). */
  scrollYProgress: MotionValue<number>
}

export function HeroCometPath({ className, scrollYProgress }: HeroCometPathProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const intro = useMotionValue(0)

  useEffect(() => {
    const controls = animate(intro, 1, {
      delay: INTRO_DELAY_S,
      duration: INTRO_DURATION_S,
      ease: [0.22, 1, 0.36, 1],
    })
    return () => controls.stop()
  }, [intro])

  const pathLength = useTransform(
    [intro, scrollYProgress],
    ([i, s]: number[]) => i * INTRO_LENGTH + s * (1 - INTRO_LENGTH),
  )

  const headX = useMotionValue(430)
  const headY = useMotionValue(60)
  const headOpacity = useTransform(pathLength, [0, 0.02, 0.98, 1], [0, 1, 1, 0])

  useMotionValueEvent(pathLength, "change", (value) => {
    const path = pathRef.current
    if (!path) return
    const point = path.getPointAtLength(value * path.getTotalLength())
    headX.set(point.x)
    headY.set(point.y)
  })

  return (
    <svg
      viewBox="0 0 1000 1400"
      fill="none"
      overflow="visible"
      aria-hidden
      className={cn("pointer-events-none", className)}
    >
      <defs>
        <linearGradient id="comet-stroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="[stop-color:#ffffff] dark:[stop-color:#0400ff]" />
          <stop offset="0.6" className="[stop-color:#e0f2fe] dark:[stop-color:#38bdf8]" />
          <stop offset="1" className="[stop-color:#ffffff] dark:[stop-color:#07cce2]" />
        </linearGradient>
        <radialGradient id="comet-head">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.35" stopColor="#bae6fd" stopOpacity="0.9" />
          <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
        <filter id="comet-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Rastro brilhante por baixo do traço */}
      <motion.path
        d={COMET_PATH}
        stroke="url(#comet-stroke)"
        strokeWidth={10}
        strokeLinecap="round"
        opacity={0.45}
        filter="url(#comet-glow)"
        style={{ pathLength }}
      />
      <motion.path
        ref={pathRef}
        d={COMET_PATH}
        stroke="url(#comet-stroke)"
        strokeWidth={3}
        strokeLinecap="round"
        style={{ pathLength }}
      />

      {/* Cabeça do cometa: brilho + estrela de 4 pontas */}
      <motion.g style={{ x: headX, y: headY, opacity: headOpacity }}>
        <circle r={22} fill="url(#comet-head)" />
        <path d="M 0 -14 L 2.5 -2.5 L 14 0 L 2.5 2.5 L 0 14 L -2.5 2.5 L -14 0 L -2.5 -2.5 Z" fill="#ffffff" />
      </motion.g>
    </svg>
  )
}

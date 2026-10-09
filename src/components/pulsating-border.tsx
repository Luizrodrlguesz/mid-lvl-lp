"use client"

// Pulsating Border — Originkit (adaptado). Renderiza o `PulsingBorder` do
// @paper-design/shaders-react contornando o container pai, com o glow vazando
// para fora dele (sem portal: o canvas fica posicionado em volta do host).

import { useEffect, useRef, useState, type CSSProperties } from "react"
import { PulsingBorder } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

const SPOTS = 3
const PULSE = 0
const SMOKE = 0.35
const SMOKE_SIZE = 0.63
const GLOW_ROOM = 0.4
const MAX_ROOM = 480

type PulsatingBorderProps = {
  className?: string
  style?: CSSProperties
  colors?: string[]
  speed?: number
  /** 0–1: 1 deixa as pontas totalmente arredondadas (meio círculo). */
  roundness?: number
  /** Espessura da linha em px. */
  thicknessPx?: number
  softness?: number
  intensity?: number
  bloom?: number
  spotSize?: number
  /** Espaço (px) entre a borda e o limite do canvas, para o glow. */
  spread?: number
}

export function PulsatingBorder({
  className,
  style,
  colors = ["#0400ff", "#38bdf8", "#07cce2"],
  speed = 1,
  roundness = 0.87,
  thicknessPx = 1,
  softness = 1,
  intensity = 0.34,
  bloom = 0.61,
  spotSize = 0.25,
  spread = 36,
}: PulsatingBorderProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize((prev) => (prev.w === width && prev.h === height ? prev : { w: width, h: height }))
    })
    observer.observe(host)
    return () => observer.disconnect()
  }, [])

  const worldW = size.w + spread * 2
  const worldH = size.h + spread * 2
  const room = Math.min(MAX_ROOM, Math.ceil(GLOW_ROOM * Math.min(worldW, worldH)))
  const bleed = spread + room
  const measured = size.w > 0 && size.h > 0

  // O shader mede a espessura como fração da menor metade da caixa; convertemos para px.
  const thickness = measured ? (thicknessPx * 2) / Math.min(size.w, size.h) : 0

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={cn("pointer-events-none relative h-full w-full", className)}
      style={style}
    >
      {measured ? (
        <PulsingBorder
          colors={colors}
          colorBack="rgba(0, 0, 0, 0)"
          speed={speed}
          roundness={roundness}
          thickness={thickness}
          softness={softness}
          intensity={intensity}
          bloom={bloom}
          spots={SPOTS}
          spotSize={spotSize * 0.5}
          pulse={PULSE}
          smoke={SMOKE}
          smokeSize={SMOKE_SIZE}
          worldWidth={worldW}
          worldHeight={worldH}
          fit="none"
          marginLeft={spread / worldW}
          marginRight={spread / worldW}
          marginTop={spread / worldH}
          marginBottom={spread / worldH}
          scale={1}
          rotation={0}
          offsetX={0}
          offsetY={0}
          originX={0.5}
          originY={0.5}
          frame={0}
          style={{
            position: "absolute",
            left: -bleed,
            top: -bleed,
            width: size.w + bleed * 2,
            height: size.h + bleed * 2,
            pointerEvents: "none",
          }}
        />
      ) : null}
    </div>
  )
}

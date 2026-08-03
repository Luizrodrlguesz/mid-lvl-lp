"use client"

import { useEffect, useId, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

type CardBorderGlowProps = {
  /** Raio dos cantos em px — deve acompanhar o `rounded-*` do card. */
  radius?: number
  /** Recuo em relação à borda do card, em px. */
  inset?: number
  /** Avanço da luz por frame, em px. */
  speed?: number
  /** Pausa a animação quando falso (ex.: card fora da viewport). */
  active?: boolean
}

/**
 * Luz azul percorrendo o "trilho" da borda do card — mesma linguagem visual do
 * glow do formulário de contacto, aqui num retângulo arredondado fechado.
 *
 * Deve ser filho direto de um contentor `relative`; mede o pai para desenhar o
 * traçado na dimensão exata.
 */
export function CardBorderGlow({
  radius = 32,
  inset = 1,
  speed = 0.9,
  active = true,
}: CardBorderGlowProps) {
  const uid = useId().replace(/:/g, "")
  const gradId = `cbg-grad-${uid}`
  const glowId = `cbg-glow-${uid}`

  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const parent = ref.current?.parentElement
    if (!parent) return
    const sync = () =>
      setSize({ w: parent.offsetWidth, h: parent.offsetHeight })
    sync()
    const ro = new ResizeObserver(sync)
    ro.observe(parent)
    return () => ro.disconnect()
  }, [])

  const dashOffset = useMotionValue(0)
  const smoothOffset = useSpring(dashOffset, { stiffness: 72, damping: 24 })
  const totalLenRef = useRef(0)

  const { w, h } = size
  const x = inset
  const y = inset
  const boxW = Math.max(0, w - inset * 2)
  const boxH = Math.max(0, h - inset * 2)
  const r = Math.max(0, Math.min(radius - inset, boxW / 2, boxH / 2))

  // perímetro exato: lados retos + quatro quartos de círculo
  const totalLength =
    2 * (boxW - 2 * r) + 2 * (boxH - 2 * r) + 2 * Math.PI * r

  useEffect(() => {
    totalLenRef.current = totalLength
  }, [totalLength])

  useEffect(() => {
    if (!active) return
    let raf = 0
    const tick = () => {
      const len = totalLenRef.current
      if (len > 0) dashOffset.set((dashOffset.get() + speed) % len)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, speed, dashOffset])

  if (boxW <= 0 || boxH <= 0) {
    return <div ref={ref} className="pointer-events-none absolute inset-0" aria-hidden />
  }

  const pathD = [
    `M ${x + r},${y}`,
    `H ${x + boxW - r}`,
    `A ${r},${r} 0 0 1 ${x + boxW},${y + r}`,
    `V ${y + boxH - r}`,
    `A ${r},${r} 0 0 1 ${x + boxW - r},${y + boxH}`,
    `H ${x + r}`,
    `A ${r},${r} 0 0 1 ${x},${y + boxH - r}`,
    `V ${y + r}`,
    `A ${r},${r} 0 0 1 ${x + r},${y}`,
    "Z",
  ].join(" ")

  const arcMain = totalLength * 0.22
  const arcTrail = totalLength * 0.11

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-40" aria-hidden>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${w} ${h}`}
        overflow="visible"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0f4fff" />
            <stop offset="50%" stopColor="#002eb9" />
            <stop offset="100%" stopColor="#0042ac" />
          </linearGradient>
          <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={4} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* rasto */}
        <motion.path
          d={pathD}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray={`${arcTrail} ${totalLength - arcTrail}`}
          style={{ strokeDashoffset: smoothOffset }}
          opacity={0.45}
        />

        {/* arco principal com brilho */}
        <motion.path
          d={pathD}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeDasharray={`${arcMain} ${totalLength - arcMain}`}
          style={{ strokeDashoffset: smoothOffset }}
          filter={`url(#${glowId})`}
          opacity={0.92}
        />
      </svg>
    </div>
  )
}

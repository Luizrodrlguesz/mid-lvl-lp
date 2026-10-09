"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

import { cn } from "@/lib/utils"

const VIEW = 600
const CENTER = VIEW / 2
const RING_OUTER = 300
const RING_DASH = 258

const ORBITAL_IDLE_SRC = "/assets/thumb/astro-2.png"
const ORBITAL_HOVER_SPRITE_FRAMES = [

  "/assets/avatar/pxl-3.png",
  "/assets/avatar/pxl-4.png",
  "/assets/avatar/pxl-5.png",
] as const
const ORBITAL_SPRITE_FRAME_MS = 260
const ORBITAL_SPRITE_CROSSFADE_MS = 320

type AboutOrbitalProps = {
  className?: string
  characterSrc?: string
}

export function AboutOrbital({
  className,
  characterSrc = ORBITAL_IDLE_SRC,
}: AboutOrbitalProps) {
  const [isCharacterHovered, setIsCharacterHovered] = useState(false)
  const [spriteFrame, setSpriteFrame] = useState(0)

  useEffect(() => {
    if (!isCharacterHovered) return

    const id = window.setInterval(() => {
      setSpriteFrame((frame) => (frame + 1) % ORBITAL_HOVER_SPRITE_FRAMES.length)
    }, ORBITAL_SPRITE_FRAME_MS)

    return () => window.clearInterval(id)
  }, [isCharacterHovered])

  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[560px] select-none",
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.22),rgba(124,58,237,0.10)_45%,transparent_70%)] blur-[2px]" />

      {/*
        Anéis e cantos em SVGs separados: os anéis giram com animação CSS no próprio
        <svg> (camada da GPU), em vez de um loop de JavaScript a cada quadro.
      */}
      <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="absolute inset-0 h-full w-full" fill="none">
        <circle cx={CENTER} cy={CENTER} r={RING_OUTER} stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
        {[
          [-RING_OUTER, -RING_OUTER],
          [RING_OUTER, -RING_OUTER],
          [-RING_OUTER, RING_OUTER],
          [RING_OUTER, RING_OUTER],
        ].map(([dx, dy], index) => {
          const x = CENTER + dx
          const y = CENTER + dy
          const sx = dx < 0 ? 1 : -1
          const sy = dy < 0 ? 1 : -1
          return (
            <path
              key={index}
              d={`M ${x} ${y + 24 * sy} L ${x} ${y} L ${x + 24 * sx} ${y}`}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth={1.5}
            />
          )
        })}
      </svg>

      <svg
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        className="absolute inset-0 h-full w-full animate-[spin_60s_linear_infinite] motion-reduce:animate-none"
        fill="none"
      >
        <defs>
          <linearGradient id="about-orbit-stroke-dash" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0400ff" />
            <stop offset="1" stopColor="#07cce2" />
          </linearGradient>
        </defs>
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RING_DASH}
          stroke="url(#about-orbit-stroke-dash)"
          strokeWidth={1.6}
          strokeDasharray="2 9"
          opacity={0.7}
        />
      </svg>

      <svg
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        className="absolute inset-0 h-full w-full animate-[spin_24s_linear_infinite_reverse] motion-reduce:animate-none"
        fill="none"
      >
        <defs>
          <linearGradient id="about-orbit-stroke-arc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0400ff" />
            <stop offset="1" stopColor="#07cce2" />
          </linearGradient>
        </defs>
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RING_OUTER}
          stroke="url(#about-orbit-stroke-arc)"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeDasharray="120 700"
        />
      </svg>

      <motion.div
        className="absolute inset-[14%] grid place-items-center"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Flutuação em CSS (transform na GPU), no lugar do loop infinito do motion. */}
        <div
          className="relative h-full w-full animate-[orbital-bob_6s_ease-in-out_infinite] motion-reduce:animate-none"
          onPointerEnter={() => {
            setSpriteFrame(0)
            setIsCharacterHovered(true)
          }}
          onPointerLeave={() => {
            setIsCharacterHovered(false)
            setSpriteFrame(0)
          }}
        >
          <div
            className="absolute inset-0 will-change-[opacity]"
            style={{
              opacity: isCharacterHovered ? 0 : 1,
              transition: `opacity ${ORBITAL_SPRITE_CROSSFADE_MS}ms ease-in-out`,
            }}
          >
            <Image
              src={characterSrc}
              alt=""
              fill
              sizes="(max-width: 1024px) 60vw, 480px"
              className="object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]"
              draggable={false}
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 will-change-[opacity]"
            style={{
              opacity: isCharacterHovered ? 1 : 0,
              transition: `opacity ${ORBITAL_SPRITE_CROSSFADE_MS}ms ease-in-out`,
            }}
          >
            {ORBITAL_HOVER_SPRITE_FRAMES.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt=""
                fill
                sizes="(max-width: 1024px) 60vw, 480px"
                className={cn(
                  "object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]",
                  index === spriteFrame ? "opacity-100" : "opacity-0",
                )}
                draggable={false}
              />
            ))}
          </div>
        </div>
      </motion.div>

      <span className="absolute left-[6%] top-[10%] font-mono text-[10px] tracking-widest text-white/45">
        UI · 60FPS
      </span>
      <span className="absolute bottom-[8%] right-[6%] font-mono text-[10px] tracking-widest text-white/45">
        BUILD v2026
      </span>
    </div>
  )
}

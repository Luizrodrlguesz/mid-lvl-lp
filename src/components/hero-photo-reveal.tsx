"use client"

import { useEffect, useState, type PointerEvent } from "react"
import Image from "next/image"
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion"

/** Raio (px) do círculo nítido enquanto o mouse está sobre a foto. */
const REVEAL_RADIUS = 170
/** Quanto do raio é totalmente nítido; o resto vira a transição em degradê. */
const REVEAL_SOLID = 0.45
const FOLLOW_SPRING = { stiffness: 140, damping: 22, mass: 0.6 }

type HeroPhotoRevealProps = {
  src: string
  alt: string
  sizes: string
  className?: string
}

/**
 * Foto desfocada que revela a versão nítida num círculo que segue o mouse.
 * Em telas sem hover (toque) ou com movimento reduzido, a foto aparece nítida direto.
 */
export function HeroPhotoReveal({ src, alt, sizes, className }: HeroPhotoRevealProps) {
  const [canReveal, setCanReveal] = useState(false)

  const pointerX = useMotionValue(50)
  const pointerY = useMotionValue(50)
  const x = useSpring(pointerX, FOLLOW_SPRING)
  const y = useSpring(pointerY, FOLLOW_SPRING)
  const radius = useMotionValue(0)
  const solid = useMotionValue(0)

  const mask = useMotionTemplate`radial-gradient(circle at ${x}% ${y}%, #000 ${solid}px, transparent ${radius}px)`

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)")
    const update = () => setCanReveal(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  const setRadius = (target: number) => {
    animate(radius, target, { duration: 0.5, ease: [0.22, 1, 0.36, 1] })
    animate(solid, target * REVEAL_SOLID, { duration: 0.5, ease: [0.22, 1, 0.36, 1] })
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - rect.left) / rect.width) * 100)
    pointerY.set(((event.clientY - rect.top) / rect.height) * 100)
  }

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    // Começa já no ponto de entrada, sem o círculo "viajar" do centro.
    const startX = ((event.clientX - rect.left) / rect.width) * 100
    const startY = ((event.clientY - rect.top) / rect.height) * 100
    pointerX.jump(startX)
    pointerY.jump(startY)
    x.jump(startX)
    y.jump(startY)
    setRadius(REVEAL_RADIUS)
  }

  return (
    <div
      className={className}
      onPointerEnter={canReveal ? handlePointerEnter : undefined}
      onPointerMove={canReveal ? handlePointerMove : undefined}
      onPointerLeave={canReveal ? () => setRadius(0) : undefined}
    >
      {canReveal ? (
        <Image
          src={src}
          alt=""
          aria-hidden
          fill
          priority
          sizes={sizes}
          className="scale-105 object-cover object-bottom blur-[10px] saturate-[0.85]"
        />
      ) : null}
      <motion.div
        className="absolute inset-0"
        style={canReveal ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes={sizes}
          className="object-cover object-bottom"
        />
      </motion.div>
    </div>
  )
}

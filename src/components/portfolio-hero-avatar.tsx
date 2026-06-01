"use client"

import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useId, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

import { SharpStarIconInline } from "@/components/sharpstar-icon-inline"

/** Espaço de coordenadas do SVG (dobro do 320px original). */
const BOX = 1200

// ─── Avatar: meio-termo entre 0.52 (original) e 0.82 (anterior) ───
const AVATAR_DIAMETER_RATIO = 0.93

function SharpStarFrame({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* sharpstar bem maior que o container, centralizado (SVG inline → escala via CSS) */}
      <SharpStarIconInline
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"
        style={{ width: "90px", height: "90px" }}
      />
      {/* ícone centralizado sobre o SVG */}
      <div className="relative z-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

type OrbitSlotProps = {
  angleDeg: number
  /** Fração do lado do quadrado (0–0.5): distância do centro ao ícone. */
  orbitFrac: number
  icon: ReactNode
  starClassName: string
}

function OrbitSlot({ angleDeg, orbitFrac, icon, starClassName }: OrbitSlotProps) {
  const offsetCqmin = -(orbitFrac * 100)
  return (
    <div
      className="absolute left-1/2 top-1/2 size-0"
      style={{
        transform: `rotate(${angleDeg}deg) translateY(${offsetCqmin.toFixed(3)}cqmin)`,
      }}
    >
      {/* contra-rotação para manter o ícone sempre de pé */}
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: -360 }}
        transition={{ duration: 72, repeat: Infinity, ease: "linear" }}
      >
        <SharpStarFrame className={starClassName}>{icon}</SharpStarFrame>
      </motion.div>
    </div>
  )
}

type PortfolioHeroAvatarProps = {
  imageAlt?: string
  /** Classes extras nas imagens (ex.: `object-top`). */
  imageClassName?: string
  className?: string
}

const AVATAR_IDLE_SRC = "/assets/avatar/pxl-2.png"

/** Frames do sprite só no hover (estado idle = `AVATAR_IDLE_SRC`). */
const AVATAR_HOVER_SPRITE_FRAMES = [
  "/assets/avatar/pxl-1.png",
  "/assets/avatar/pxl-3.png",
  "/assets/avatar/pxl-4.png",
  "/assets/avatar/pxl-5.png",
] as const

/** Intervalo entre frames do sprite no hover (ms). */
const SPRITE_FRAME_MS = 300

/** Crossfade idle ↔ sprite ao entrar/sair do hover (só opacity, inline para não brigar com Tailwind). */
const IDLE_SPRITE_CROSSFADE_MS = 420

const ORBIT_ICON_PHONE = "/assets/phone-icon.png"
const ORBIT_ICON_DESK = "/assets/desk-icon.png"
const ORBIT_ICON_CODE = "/assets/code-icon.png"

function OrbitCenterIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="relative block size-6 shrink-0 min-[480px]:size-11">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 479px) 18px, 20px"
        className="object-contain select-none"
        draggable={false}
      />
    </span>
  )
}

export function PortfolioHeroAvatar({
  imageAlt = "Luiz Rodrigues",
  imageClassName,
  className,
}: PortfolioHeroAvatarProps) {
  const [isAvatarHovered, setIsAvatarHovered] = useState(false)
  const [spriteFrame, setSpriteFrame] = useState(0)

  useEffect(() => {
    if (!isAvatarHovered) return
    const id = window.setInterval(() => {
      setSpriteFrame((i) => (i + 1) % AVATAR_HOVER_SPRITE_FRAMES.length)
    }, SPRITE_FRAME_MS)
    return () => window.clearInterval(id)
  }, [isAvatarHovered])

  const uid = useId().replace(/:/g, "")
  const gradId = `hero-avatar-ring-${uid}`
  const filterId = `hero-avatar-glow-${uid}`

  const cx = BOX / 2
  const cy = BOX / 2
  const R_face = (BOX * AVATAR_DIAMETER_RATIO) / 2

  // ─── Traços mais grossos e mais longos ───────────────────────────────────
  const strokeMain = 10          // era 4
  const strokeTrail = 5          // era 1.85
  const ringR = R_face + strokeMain / 2 + BOX * 0.022   // anel justo ao avatar
  const circumference = 2 * Math.PI * ringR

  // Comprimento do arco principal: 14 % → era 8 %
  const arcMain  = circumference * 0.29
  // Comprimento do arco trail: 7 % → era 4 %
  const arcTrail = circumference * 0.14

  const dashOffset = useMotionValue(0)
  const smoothOffset = useSpring(dashOffset, { stiffness: 72, damping: 24 })
  const trailOffset = useTransform(
    smoothOffset,
    (v) => (v + circumference * 0.28) % circumference,
  )

  useEffect(() => {
    let raf = 0
    const tick = () => {
      dashOffset.set((dashOffset.get() + 0.7) % circumference)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [circumference, dashOffset])

  // ─── Órbita: ícones encostados na borda do avatar ───────────────────────
  // O raio da órbita é o raio do face + metade do strokeMain + margem mínima.
  const starOuterHalf = BOX * 0.06   // metade aprox. do tamanho do ícone-estrela
  const orbitR = R_face + strokeMain / 2 + starOuterHalf + BOX * 0.00099
  const orbitFrac = orbitR / BOX

  const starFrameClass = "size-[7rem] min-[480px]:size-[7.5rem]"

  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[640px] justify-self-center [container-type:size]",
        className,
      )}
    >
      <div className="relative size-full max-h-[640px] max-w-[640px]">
        {/* ── Anel SVG animado ─────────────────────────────────────────── */}
        <svg
          className="pointer-events-none absolute inset-0 size-full"
          viewBox={`0 0 ${BOX} ${BOX}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="55%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <filter
              id={filterId}
              x="-22%"
              y="-22%"
              width="144%"
              height="144%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur stdDeviation={3} result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* traço principal — mais grosso e mais longo */}
          <motion.circle
            cx={cx}
            cy={cy}
            r={ringR}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={strokeMain}
            strokeLinecap="round"
            strokeDasharray={`${arcMain} ${circumference - arcMain}`}
            style={{ strokeDashoffset: smoothOffset }}
            filter={`url(#${filterId})`}
            opacity={0.96}
          />

          {/* traço trail — mais grosso e mais longo */}
          <motion.circle
            cx={cx}
            cy={cy}
            r={ringR}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={strokeTrail}
            strokeLinecap="round"
            strokeDasharray={`${arcTrail} ${circumference - arcTrail}`}
            style={{ strokeDashoffset: trailOffset }}
            opacity={0.52}
          />
        </svg>

        {/* ── Ícones em órbita — rotação mais lenta (72 s) ─────────────── */}
        <motion.div
          className="absolute inset-0 z-5 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 72, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative aspect-square size-full">
            <OrbitSlot
              angleDeg={0}
              orbitFrac={orbitFrac}
              starClassName={starFrameClass}
              icon={<OrbitCenterIcon src={ORBIT_ICON_PHONE} alt="Mobile" />}
            />
            <OrbitSlot
              angleDeg={120}
              orbitFrac={orbitFrac}
              starClassName={starFrameClass}
              icon={<OrbitCenterIcon src={ORBIT_ICON_DESK} alt="Desktop" />}
            />
            <OrbitSlot
              angleDeg={240}
              orbitFrac={orbitFrac}
              starClassName={starFrameClass}
              icon={<OrbitCenterIcon src={ORBIT_ICON_CODE} alt="Code" />}
            />
          </div>
        </motion.div>

        {/* ── Avatar central ───────────────────────────────────────────── */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div
            className={cn(
              "flex aspect-square items-center justify-center overflow-hidden rounded-full",
              "border border-white/18 bg-white/10",
              "shadow-[0_0_0_01px_rgba(105,125,205,0.5),0_0_36px_rgba(105,125,255,0.5),0_0_56px_-14px_rgba(124,58,237,0.15)]",
              "backdrop-blur-xl",
            )}
            style={{
              width: `${AVATAR_DIAMETER_RATIO * 100}%`,
              height: `${AVATAR_DIAMETER_RATIO * 100}%`,
            }}
            onPointerEnter={() => {
              setSpriteFrame(0)
              setIsAvatarHovered(true)
            }}
            onPointerLeave={() => {
              setIsAvatarHovered(false)
              setSpriteFrame(0)
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/18 via-transparent to-blue-500/22" />
            <div
              className="relative z-10 size-full min-h-0 min-w-0"
              role="img"
              aria-label={imageAlt}
            >
              <div
                className="absolute inset-0 will-change-[opacity]"
                style={{
                  opacity: isAvatarHovered ? 0 : 1,
                  transition: `opacity ${IDLE_SPRITE_CROSSFADE_MS}ms ease-in-out`,
                }}
              >
                <Image
                  src={AVATAR_IDLE_SRC}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 80vw, 400px"
                  className={cn("object-cover select-none", imageClassName)}
                  priority
                  aria-hidden
                  draggable={false}
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 will-change-[opacity]"
                style={{
                  opacity: isAvatarHovered ? 1 : 0,
                  transition: `opacity ${IDLE_SPRITE_CROSSFADE_MS}ms ease-in-out`,
                }}
              >
                {AVATAR_HOVER_SPRITE_FRAMES.map((src, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 80vw, 400px"
                    className={cn(
                      "object-cover select-none",
                      i === spriteFrame ? "opacity-100" : "opacity-0",
                      imageClassName,
                    )}
                    priority={i === 0}
                    aria-hidden
                    draggable={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
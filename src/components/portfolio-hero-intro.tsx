"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

import GradientText from "@/components/gradient-text"
import SplitText from "@/components/split-text"
import { Button } from "@/components/ui/button"
import { useT } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type SkillSlot = { angleDeg: number }

const ORBITAL_SKILL_SLOTS: readonly SkillSlot[] = [
  { angleDeg: -128 },
  { angleDeg: -72 },
  { angleDeg: -16 },
  { angleDeg: 40 },
  { angleDeg: 96 },
  { angleDeg: 152 },
] as const

const ORBITAL_SKILL_LABELS = [
  "React",
  "TypeScript",
  "Next.js",
  "Laravel",
  "Tailwind",
  "Nest.js",
  "Flutter",
  "Dart",
  "React Native",
] as const

const INITIAL_ORBITAL_SKILLS = ORBITAL_SKILL_LABELS.slice(
  0,
  ORBITAL_SKILL_SLOTS.length,
)

const VIEW = 600
const CENTER = VIEW / 2
const RING_OUTER = 300
const RING_DASH = 258
const CHIP_RADIUS = 250

const ORBITAL_IDLE_SRC = "/assets/thumb/astro-2.png"
const ORBITAL_HOVER_SPRITE_FRAMES = [

  "/assets/avatar/pxl-3.png",
  "/assets/avatar/pxl-4.png",
  "/assets/avatar/pxl-5.png",
] as const
const ORBITAL_SPRITE_FRAME_MS = 260
const ORBITAL_SPRITE_CROSSFADE_MS = 320
const ORBITAL_SKILL_SWAP_MS = 2400
const HERO_TEXT_ANIMATION_DELAY = 3.15
const HERO_GRADIENT_TEXT_DELAY_MS = 4550

function pickRandomIndex(length: number) {
  return Math.floor(Math.random() * length)
}

function getNextOrbitalSkills(currentSkills: readonly string[]) {
  const nextSkills = [...currentSkills]
  const slotIndex = pickRandomIndex(nextSkills.length)
  const visibleSkills = new Set(nextSkills)
  const currentLabel = nextSkills[slotIndex]
  const candidates = ORBITAL_SKILL_LABELS.filter(
    (label) => label !== currentLabel && !visibleSkills.has(label),
  )

  if (!candidates.length) return nextSkills

  nextSkills[slotIndex] = candidates[pickRandomIndex(candidates.length)]
  return nextSkills
}

function polar(angleDeg: number, radius: number) {
  const a = (angleDeg * Math.PI) / 180
  return { x: CENTER + radius * Math.cos(a), y: CENTER + radius * Math.sin(a) }
}

type PortfolioHeroIntroProps = {
  className?: string
  onNavigateToSection: (sectionId: string) => void
}

export function PortfolioHeroIntro({
  className,
  onNavigateToSection,
}: PortfolioHeroIntroProps) {
  const t = useT()

  return (
    <div className={cn("flex flex-col justify-center gap-10 text-white", className)}>
      <div className="space-y-5">
        <h1
          className="text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:max-w-xl lg:text-[2.8rem] lg:leading-[1.12]"
        >
          <SplitText
            key={`hero-line-1-${t.hero.titleLine1}`}
            text={t.hero.titleLine1}
            tag="span"
            className="block align-baseline"
            delay={28}
            startDelay={HERO_TEXT_ANIMATION_DELAY}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 22 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-80px"
            textAlign="left"
          />
          <SplitText
            key={`hero-line-2-${t.hero.titleLine2}`}
            text={t.hero.titleLine2}
            tag="span"
            className="align-baseline"
            delay={28}
            startDelay={HERO_TEXT_ANIMATION_DELAY + 0.32}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 22 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-80px"
            textAlign="left"
          />{" "}
          <GradientText
            colors={["#0400ff", "#38bdf8", "#07cce2"]}
            animationSpeed={8}
            showBorder={false}
            className={cn(
              "font-orbitron-italic overflow-visible pr-1 align-baseline text-[0.92em] font-bold tracking-tight",
              "hero-gradient-fade-in",
            )}
            style={{ animationDelay: `${HERO_GRADIENT_TEXT_DELAY_MS}ms` }}
          >
            {t.hero.titleGradient1}
          </GradientText>{" "}
          <SplitText
            key={`hero-connector-${t.hero.titleConnector}`}
            text={t.hero.titleConnector}
            tag="span"
            className="align-baseline"
            delay={28}
            startDelay={HERO_TEXT_ANIMATION_DELAY + 0.78}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 22 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-80px"
            textAlign="left"
          />{" "}
          <GradientText
            colors={["#0400ff", "#38bdf8", "#07cce2"]}
            animationSpeed={8}
            showBorder={false}
            className={cn(
              "font-orbitron-italic overflow-visible pr-1 align-baseline text-[0.92em] font-bold tracking-tight",
              "hero-gradient-fade-in",
            )}
            style={{ animationDelay: `${HERO_GRADIENT_TEXT_DELAY_MS + 250}ms` }}
          >
            {t.hero.titleGradient2}
          </GradientText>
        </h1>

        <motion.p
          className="max-w-xl text-pretty text-base leading-relaxed text-white/72 sm:text-lg"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.hero.paragraph}
        </motion.p>
      </div>

      <motion.div
        className="flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <Button
          type="button"
          size="lg"
          className={cn(
            "rounded-full border-0 px-7 text-white shadow-lg shadow-blue-900/25",
            "bg-gradient-to-r from-blue-900 to-blue-600 hover:from-blue-500 hover:to-blue-500",
          )}
          onClick={() => onNavigateToSection("projetos")}
        >
          {t.hero.ctaProjects}
        </Button>
        <Button
          type="button"
          size="lg"
          variant="outline"
          className={cn(
            "rounded-full border-white/25 bg-white/5 text-white backdrop-blur-sm",
            "hover:bg-white/12 hover:text-white",
          )}
          onClick={() => onNavigateToSection("contato")}
        >
          {t.hero.ctaContact}
        </Button>
      </motion.div>

      {/* <motion.ul
        className="flex max-w-xl flex-col gap-3.5 border-t border-white/10 pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-9 sm:gap-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Destaques"
      >
        {MICRO_INFOS.map(({ label, iconSrc, iconAlt }) => (
          <li
            key={label}
            className="flex items-center gap-3 text-base leading-snug text-white/62 sm:text-[1.0625rem] sm:text-white/68"
          >
            <span className="relative size-9 shrink-0 sm:size-9" aria-hidden>
              <Image
                src={iconSrc}
                alt={iconAlt}
                fill
                sizes="(max-width: 639px) 28px, 32px"
                className="object-contain"
                priority
              />
            </span>
            {label}
          </li>
        ))}
      </motion.ul> */}
    </div>
  )
}

type PortfolioHeroOrbitalProps = {
  className?: string
  characterSrc?: string
}

export function PortfolioHeroOrbital({
  className,
  characterSrc = ORBITAL_IDLE_SRC,
}: PortfolioHeroOrbitalProps) {
  const [isCharacterHovered, setIsCharacterHovered] = useState(false)
  const [spriteFrame, setSpriteFrame] = useState(0)
  const [skillLabels, setSkillLabels] = useState<readonly string[]>(
    INITIAL_ORBITAL_SKILLS,
  )

  useEffect(() => {
    if (!isCharacterHovered) return

    const id = window.setInterval(() => {
      setSpriteFrame((frame) => (frame + 1) % ORBITAL_HOVER_SPRITE_FRAMES.length)
    }, ORBITAL_SPRITE_FRAME_MS)

    return () => window.clearInterval(id)
  }, [isCharacterHovered])

  useEffect(() => {
    const id = window.setInterval(() => {
      setSkillLabels((currentSkills) => getNextOrbitalSkills(currentSkills))
    }, ORBITAL_SKILL_SWAP_MS)

    return () => window.clearInterval(id)
  }, [])

  const chips = useMemo(
    () =>
      ORBITAL_SKILL_SLOTS.map((slot, index) => {
        const position = polar(slot.angleDeg, CHIP_RADIUS)
        return {
          id: `skill-slot-${index}`,
          label: skillLabels[index] ?? ORBITAL_SKILL_LABELS[index] ?? "",
          svg: position,
          left: (position.x / VIEW) * 100,
          top: (position.y / VIEW) * 100,
        }
      }),
    [skillLabels],
  )

  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[560px] select-none",
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.22),rgba(124,58,237,0.10)_45%,transparent_70%)] blur-[2px]" />

      <svg
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient id="hero-orbit-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0400ff" />
            <stop offset="1" stopColor="#07cce2" />
          </linearGradient>
        </defs>

        <circle
          cx={CENTER}
          cy={CENTER}
          r={RING_OUTER}
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={1}
        />
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={RING_DASH}
          stroke="url(#hero-orbit-stroke)"
          strokeWidth={1.6}
          strokeDasharray="2 9"
          opacity={0.7}
          style={{ transformOrigin: "50% 50%" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        />
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={RING_OUTER}
          stroke="url(#hero-orbit-stroke)"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeDasharray="120 700"
          style={{ transformOrigin: "50% 50%" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 24, ease: "linear", repeat: Infinity }}
        />

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

        {chips.map((chip) => (
          <line
            key={chip.id}
            x1={CENTER}
            y1={CENTER}
            x2={chip.svg.x}
            y2={chip.svg.y}
            stroke="rgba(255,255,255,0.14)"
            strokeWidth={1}
          />
        ))}
      </svg>

      <motion.div
        className="absolute inset-[14%] grid place-items-center"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="relative h-full w-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
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
              sizes="(max-width: 1024px) 60vw, 520px"
              className="object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]"
              priority
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
                sizes="(max-width: 1024px) 60vw, 520px"
                className={cn(
                  "object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]",
                  index === spriteFrame ? "opacity-100" : "opacity-0",
                )}
                priority={index === 0}
                draggable={false}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {chips.map((chip, index) => (
        <motion.span
          key={chip.id}
          className={cn(
            "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full",
            "border border-white/12 bg-[#0b0f1c]/70 px-3.5 py-2 text-[0.78rem] font-semibold tracking-wide text-white",
            "shadow-[0_6px_18px_rgba(0,0,0,0.4)] backdrop-blur-md",
          )}
          style={{ left: `${chip.left}%`, top: `${chip.top}%` }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { duration: 0.4, delay: 0.2 + index * 0.08 },
            scale: { duration: 0.4, delay: 0.2 + index * 0.08 },
            y: { duration: 4 + index, ease: "easeInOut", repeat: Infinity },
          }}
        >
          <motion.span
            key={chip.label}
            className="block"
            initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {chip.label}
          </motion.span>
        </motion.span>
      ))}

      <span className="absolute left-[6%] top-[10%] font-mono text-[10px] tracking-widest text-white/45">
        UI · 60FPS
      </span>
      <span className="absolute bottom-[8%] right-[6%] font-mono text-[10px] tracking-widest text-white/45">
        BUILD v2026
      </span>
    </div>
  )
}

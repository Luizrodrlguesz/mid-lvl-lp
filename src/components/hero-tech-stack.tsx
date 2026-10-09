"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"

type Tech = { name: string; icon: string; iconClassName?: string }

const STACK: readonly Tech[] = [
  { name: "React", icon: "react" },
  { name: "TypeScript", icon: "ts" },
  { name: "Next.js", icon: "next" },
  { name: "Tailwind", icon: "tailwind" },
  { name: "Node.js", icon: "node" },
  // O ícone do Laravel é um traço vermelho escuro fino; clareado para não sumir no tile.
  { name: "Laravel", icon: "laravel", iconClassName: "brightness-[1.8] saturate-150" },
  { name: "Flutter", icon: "flutter" },
  { name: "Dart", icon: "dart" },
  { name: "Git", icon: "git" },
]

const VISIBLE_COUNT = 4
const SWAP_MS = 2400
const EASE_OUT = [0.22, 1, 0.36, 1] as const

/** Troca um slot aleatório por uma tecnologia que não está visível. */
function swapOne(visible: readonly Tech[]) {
  const hidden = STACK.filter((tech) => !visible.includes(tech))
  if (!hidden.length) return visible
  const slot = Math.floor(Math.random() * visible.length)
  const next = [...visible]
  next[slot] = hidden[Math.floor(Math.random() * hidden.length)]
  return next
}

type HeroTechStackProps = {
  title: string
  className?: string
}

export function HeroTechStack({ title, className }: HeroTechStackProps) {
  const [visible, setVisible] = useState<readonly Tech[]>(() => STACK.slice(0, VISIBLE_COUNT))

  useEffect(() => {
    const id = window.setInterval(() => setVisible((current) => swapOne(current)), SWAP_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-gradient-to-l from-white/40 to-transparent" />
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">{title}</p>
      </div>
      <ul className="grid grid-cols-4 gap-3">
        {visible.map((tech, slot) => (
          <motion.li
            key={slot}
            className="group flex flex-col items-center gap-1.5"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 + slot * 0.06, ease: EASE_OUT }}
          >
            {/* Mesmo vidro dos cards do about (Card: bg-white/10 + ring). */}
            <span
              className={cn(
                "relative grid size-[3.75rem] place-items-center overflow-hidden rounded-2xl border border-border/60 bg-white/10 shadow-sm shadow-black/20 ring-1 ring-black/5 backdrop-blur-[5px]",
                "dark:bg-foreground/5 dark:shadow-none dark:ring-white/5",
                "transition-all duration-300 group-hover:-translate-y-1 group-hover:border-sky-400/50 group-hover:shadow-[0_0_24px_rgba(56,189,248,0.4)]",
              )}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={tech.name}
                  className="grid place-items-center"
                  initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                >
                  <Image
                    src={`/assets/skills/${tech.icon}.png`}
                    alt=""
                    width={36}
                    height={36}
                    className={cn("size-9 object-contain", tech.iconClassName)}
                  />
                </motion.span>
              </AnimatePresence>
            </span>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={tech.name}
                className="text-[11px] font-medium tracking-wide whitespace-nowrap text-white/75 transition-colors group-hover:text-white"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              >
                {tech.name}
              </motion.span>
            </AnimatePresence>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import Image from "next/image"

import GradientText from "@/components/gradient-text"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const MICRO_INFOS = [
  {
    label: "Desenvolvimento Web & Apps",
    iconSrc: "/assets/laptop-icon.png",
    iconAlt: "",
  },
  {
    label: "Ativo na área desde 2023",
    iconSrc: "/assets/clock-icon.png",
    iconAlt: "",
  },
  {
    label: "Foco em performance e UI moderna",
    iconSrc: "/assets/pencil-icon.png",
    iconAlt: "",
  },
] as const

type PortfolioHeroIntroProps = {
  className?: string
  onNavigateToSection: (sectionId: string) => void
}

export function PortfolioHeroIntro({
  className,
  onNavigateToSection,
}: PortfolioHeroIntroProps) {
  return (
    <div className={cn("flex flex-col justify-center gap-10 text-white", className)}>
      <div className="space-y-5">
        <motion.h1
          className="text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:max-w-xl lg:text-[2.8rem] lg:leading-[1.12]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          DesenvolvedorFront-end focado em 
          <GradientText
            colors={["#7c3aed", "#38bdf8", "#a78bfa"]}
            animationSpeed={8}
            showBorder={false}
            className="align-baseline font-bold tracking-tight"
          >
            interfaces modernas
          </GradientText>{" "}
          e{" "}
          <GradientText
            colors={["#7c3aed", "#38bdf8", "#a78bfa"]}
            animationSpeed={8}
            showBorder={false}
            className="align-baseline font-bold tracking-tight"
          >
             experiências fluidas
          </GradientText>{" "}
        </motion.h1>

        <motion.p
          className="max-w-xl text-pretty text-base leading-relaxed text-white/72 sm:text-lg"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          Eu sou o Luiz Rodrigues, desenvolvedor Front-end com experiência em React, Laravel e
          construção de interfaces modernas para web.
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
            "rounded-full border-0 px-7 text-white shadow-lg shadow-violet-600/25",
            "bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500",
          )}
          onClick={() => onNavigateToSection("projetos")}
        >
          Ver projetos
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
          Falar comigo
        </Button>
      </motion.div>

      <motion.ul
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
      </motion.ul>
    </div>
  )
}

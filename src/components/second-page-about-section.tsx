"use client"

import { useMemo, useRef } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { Briefcase, GraduationCap, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Locale } from "@/components/language-switcher"
import {
  aboutCopy,
  experiences,
  qualifications,
} from "@/lib/content"

const defaultLocale: Locale = "pt-br"

type SecondPageAboutSectionProps = {
  locale?: Locale
}

function pickLocale(locale: Locale, obj: Record<Locale, string>) {
  return obj[locale]
}

const listParent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
}

const listItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const HIGHLIGHTS = [
  { label: "Eng. de Software — Unicesumar", icon: GraduationCap },
  { label: "2+ anos em produto digital", icon: Sparkles },
  { label: "React · TypeScript · Node", icon: Briefcase },
] as const

export function SecondPageAboutSection({
  locale = defaultLocale,
}: SecondPageAboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.88", "end 0.35"],
  })

  const introOpacity = useTransform(scrollYProgress, [0, 0.14], [0.45, 1])
  const introY = useTransform(scrollYProgress, [0, 0.2], [26, 0])
  const lineGrow = useSpring(
    useTransform(scrollYProgress, [0.08, 0.52], [0, 1]),
    { stiffness: 96, damping: 32 },
  )

  const uniqueQualifications = useMemo(() => {
    const byTitle = new Map<string, (typeof qualifications)[number]>()
    qualifications.forEach((item) => {
      const key =
        typeof item.title === "string"
          ? item.title
          : (item.title as Record<Locale, string>)[defaultLocale]
      if (!byTitle.has(key)) byTitle.set(key, item)
    })
    return Array.from(byTitle.values())
  }, [])

  return (
    <section
      ref={sectionRef}
      id="sobre"
      aria-labelledby="heading-sobre"
      className="relative z-10 overflow-hidden border-white/10 py-24 px-6 text-zinc-100"
    >
      <motion.div
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-violet-600/20 blur-[100px]"
        aria-hidden
        animate={{ opacity: [0.2, 0.38, 0.2], scale: [1, 1.06, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-sky-500/15 blur-[90px]"
        aria-hidden
        animate={{ opacity: [0.15, 0.32, 0.15], scale: [1, 1.05, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />

      <div className="relative mx-auto w-full max-w-[92vw] space-y-14">
        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Sobre
            </p>
            <h2
              id="heading-sobre"
              className="font-orbitron-italic mt-2 text-3xl font-bold tracking-tight text-white"
            >
              Quem sou eu?
            </h2>
          </motion.div>

          <motion.p
            className="max-w-3xl text-pretty text-lg leading-relaxed text-zinc-400"
            style={{ opacity: introOpacity, y: introY }}
          >
            {aboutCopy[locale]}
          </motion.p>

          <motion.ul
            className="flex flex-wrap gap-3"
            variants={listParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {HIGHLIGHTS.map(({ label, icon: Icon }) => (
              <motion.li key={label} variants={listItem}>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-sm text-zinc-200 backdrop-blur-sm">
                  <Icon className="h-4 w-4 shrink-0 text-violet-400" aria-hidden />
                  {label}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div className="space-y-5">
            <motion.h3
              className="flex items-center gap-2 text-lg font-semibold text-white"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4 }}
            >
              <GraduationCap className="h-5 w-5 text-sky-400" aria-hidden />
              Capacitações
            </motion.h3>
            <motion.div
              className="grid gap-3 sm:grid-cols-2"
              variants={listParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              {uniqueQualifications.map((item) => (
                <motion.div key={pickLocale(locale, item.title)} variants={listItem}>
                  <Card className="h-full rounded-[22px] border-white/10 bg-white/5 py-4 shadow-none backdrop-blur-[5px]">
                    <CardHeader>
                      <CardTitle className="text-base text-zinc-100">
                        {pickLocale(locale, item.title)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm leading-relaxed text-zinc-400">
                      {pickLocale(locale, item.description)}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="space-y-5">
            <motion.h3
              className="flex items-center gap-2 text-lg font-semibold text-white"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4 }}
            >
              <Briefcase className="h-5 w-5 text-violet-400" aria-hidden />
              Experiência de mercado
            </motion.h3>

            <div className="relative pl-8">
              <motion.div
                className="absolute left-[15px] top-3 bottom-3 w-px rounded-full bg-linear-to-b from-violet-500/90 via-sky-500/40 to-transparent"
                style={{
                  transformOrigin: "top",
                  scaleY: lineGrow,
                }}
                aria-hidden
              />

              <ul className="relative space-y-5">
                {experiences.map((item, i) => (
                  <motion.li
                    key={pickLocale(locale, item.role)}
                    className="relative"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{
                      duration: 0.45,
                      delay: i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <span
                      className="absolute left-[-23px] top-5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-violet-400/90 bg-zinc-950 shadow-[0_0_12px_rgba(139,92,246,0.45)]"
                      aria-hidden
                    />
                    <Card className="rounded-[22px] border-white/10 bg-white/5 py-4 shadow-none backdrop-blur-[5px]">
                      <CardHeader>
                        <CardTitle className="flex flex-col gap-1 text-base text-zinc-100 sm:flex-row sm:items-center sm:justify-between">
                          <span>{pickLocale(locale, item.role)}</span>
                          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                            {pickLocale(locale, item.period)}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm leading-relaxed text-zinc-400">
                        {pickLocale(locale, item.description)}
                      </CardContent>
                    </Card>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import Lenis from "lenis"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { AboutSection } from "@/components/about-section"
import { CursorEdgeGlowLink } from "@/components/cursor-edge-glow-link"
import { GradientUnderlineLink } from "@/components/gradient-underline-link"
import { HeroTechStack } from "@/components/hero-tech-stack"
import { LanguageMenu } from "@/components/language-menu"
import { LoadingScreen } from "@/components/loading-screen"
import { MoonGlobe } from "@/components/moon-globe"
import { SunGlobe } from "@/components/sun-globe"
import { PageBackground } from "@/components/page-background"
import { PortfolioHeader } from "@/components/portfolio-header"
import { ProcessSection } from "@/components/process-section"
import { ProjectsViewSwitch } from "@/components/projects-view-switch"
import { RevealFooter } from "@/components/reveal-footer"
import { SkillsStack } from "@/components/skills-stack"
import { WeightHoverText } from "@/components/weight-hover-text"
import { useT } from "@/lib/i18n"
import { setLenis } from "@/lib/smooth-scroll"

/**
 * Home do portfólio: estrutura simples e leve.
 * Os efeitos entram pontualmente e com custo controlado (fundo em WebGL puro,
 * segmentos, menu de idioma, About com cortina e texto revelado no scroll,
 * skills em scroll lateral, projetos em carrossel com modal expansível (ou em
 * linha do tempo, nas abas), processo de trabalho e footer revelado com o contato).
 */

// Cabeçalhos das seções no mesmo padrão do Processo (rótulo mono, título grande).
const h2 = "font-display text-3xl font-bold sm:text-4xl"
const label = "font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
const section = "mx-auto w-[90%] space-y-3 pb-12 pt-24"

export default function Home() {
  const t = useT()
  // Tela de loading (3s) com fundo todo preto.
  const [loading, setLoading] = useState(true)
  const { resolvedTheme } = useTheme()
  const reduceMotion = useReducedMotion()

  // Parallax do hero com mola (o atraso leve ao rolar): a rocha desce devagar e a
  // lua/sol desce mais, girando um pouco, como se estivesse se pondo atrás dela.
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroSpring = useSpring(heroProgress, { stiffness: 70, damping: 20, mass: 0.6 })
  const cliffY = useTransform(heroSpring, [0, 1], [0, 90])
  const orbY = useTransform(heroSpring, [0, 1], [0, 220])
  const orbRotate = useTransform(heroSpring, [0, 1], [0, 8])

  // Rolagem suave (Lenis): a página acompanha a roda com um pequeno atraso.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ lerp: 0.1, anchors: true })
    setLenis(lenis)
    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    })
    return () => {
      cancelAnimationFrame(raf)
      setLenis(null)
      lenis.destroy()
    }
  }, [])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timeout)
  }, [])


  return (
    <div className="min-h-screen">
      <LoadingScreen show={loading} className="z-[500] bg-black" />
      <PageBackground />
      <PortfolioHeader />

      {/* Acima do fundo fixo (partículas ou nuvens). */}
      <main className="relative z-10">
        {/* INÍCIO */}
        {/* Fundo sólido igual ao da cortina do About (off-white / preto). overflow-x-clip: o sol girando no parallax passava da borda direita. */}
        <div ref={heroRef} className="relative overflow-x-clip bg-[var(--stage)] text-[var(--stage-foreground)]">
          {/*
            Imagem do hero: encostada na lateral direita e no rodapé, com 90% da
            altura (58% no mobile, onde ela e a lua ficam mais baixas, abaixo do texto);
            a parte de baixo some em gradiente. z-[25]: acima do buraco negro
            da cortina do About (z-20) e abaixo do texto do hero (z-30).
          */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0 z-[25] h-[58%] lg:h-[90%]"
            style={{ y: reduceMotion ? 0 : cliffY }}
          >
            {/*
              Lua (dark) ou sol (light) atrás do precipício, beirando o topo dele: a
              parte de baixo do disco passa por trás da borda da rocha. O canvas do
              sol é maior por causa da coroa, mas o disco tem o tamanho e o centro
              da lua. Ao rolar, ela desce mais que a rocha e vai se pondo atrás dela.
            */}
            {mounted ? (
              <motion.div
                className={
                  resolvedTheme === "dark"
                    ? "absolute left-[38%] top-[calc(1%+15px)] aspect-square w-[48%]"
                    : "absolute left-[26.5%] top-[calc(-10.5%+15px)] aspect-square w-[71%]"
                }
                style={reduceMotion ? undefined : { y: orbY, rotate: orbRotate }}
              >
                {resolvedTheme === "dark" ? <MoonGlobe className="size-full" /> : <SunGlobe className="size-full" />}
              </motion.div>
            ) : null}
            {/* Flutuação leve e contínua da rocha (desligada com movimento reduzido). */}
            <div className="relative h-full motion-safe:animate-[hero-float_7s_ease-in-out_infinite]">
              <Image
                src="/assets/avatar/hero-precipicio.png"
                alt=""
                width={1024}
                height={1035}
                priority
                sizes="90vh"
                className="h-full w-auto [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)]"
              />
            </div>
          </motion.div>

          {/*
            relative z-30: o texto do hero fica acima da imagem e do buraco negro.
            Mensagem à esquerda, centralizada na vertical (largura limitada para não
            alcançar a imagem); stack na base da tela.
          */}
          <section id="inicio" className="relative z-30 mx-auto flex min-h-svh w-[90%] flex-col pb-10 pt-28">
            {/* No mobile o texto sobe para o topo (centralizado sobrava espaço vazio em cima). */}
            <div className="flex flex-1 flex-col justify-start gap-7 pt-4 lg:max-w-[50%] lg:justify-center lg:pt-0">
              <p className="font-display text-xl font-semibold text-muted-foreground sm:text-2xl">{t.hero.greeting}</p>
              {/* Weight Hover (Originkit): o peso das letras cresce no hover. */}
              <h1 className="text-[clamp(44px,6.5vw,96px)] leading-[1.02] tracking-tight">
                <WeightHoverText
                  lines={[t.hero.titleBefore, t.hero.titleAccent, t.hero.titleAfter].filter(Boolean)}
                  fromWeight={500}
                  toWeight={900}
                />
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{t.hero.paragraph}</p>
              {/* No mobile os botões ficam um abaixo do outro, à esquerda. */}
              <div className="flex flex-col items-start gap-4 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-8">
                <CursorEdgeGlowLink href="#contato">{t.hero.ctaContact}</CursorEdgeGlowLink>
                <GradientUnderlineLink href="#projetos">{t.hero.ctaProjects}</GradientUnderlineLink>
              </div>
            </div>

            <div className="lg:max-w-[50%]">
              {/* Mesmo componente do hero do index: tiles com as logos, trocando uma por vez. */}
              <HeroTechStack
                title={t.hero.stackTitle}
                className="w-full max-w-sm"
                tileClassName="border-white/10 bg-[var(--ink)]/80 ring-white/10 backdrop-blur-md dark:bg-zinc-900/70"
              />
            </div>
          </section>
        </div>

        {/* SOBRE — cortina com slogan, texto revelado no scroll e detalhes. */}
        <AboutSection />

        {/* HABILIDADES — cabeçalho na coluna; os cards empilhados ocupam a largura toda. */}
        <section id="habilidades" aria-labelledby="heading-habilidades">
          <div className={section}>
            <p className={label}>{t.skills.eyebrow}</p>
            <h2 id="heading-habilidades" className={h2}>{t.skills.title}</h2>
            <p className="max-w-2xl text-muted-foreground">{t.skills.intro}</p>
          </div>
          <SkillsStack />
        </section>

        {/* PROJETOS — cabeçalho na coluna; abas entre o carrossel (largura toda) e a linha do tempo. */}
        <section id="projetos" aria-labelledby="heading-projetos" className="pb-16">
          <div className={section}>
            <p className={label}>{t.projects.eyebrow}</p>
            <h2 id="heading-projetos" className={h2}>{t.projects.title}</h2>
            <p className="max-w-2xl text-muted-foreground">{t.projects.description}</p>
          </div>
          <ProjectsViewSwitch />
        </section>

        {/* PROCESSO — como eu trabalho, do entendimento à produção. */}
        <ProcessSection />
      </main>

      <LanguageMenu />

      <RevealFooter />
    </div>
  )
}

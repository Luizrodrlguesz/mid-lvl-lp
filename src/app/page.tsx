"use client"

import { useEffect, useMemo, useState, type MouseEvent, type ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import { ArrowUpRight, Github, Linkedin, Mail, ExternalLink, FileDown, MessageCircle } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LoadingScreen } from "@/components/loading-screen"
import { CursorGlow } from "@/components/cursor-glow"
import { BackgroundCanvas } from "@/components/background-canvas"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { LanguageSwitcher, type Locale } from "@/components/language-switcher"
import { BackToTop } from "@/components/back-to-top"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import {
  aboutCopy,
  contactCopy,
  heroCopy,
  projects,
  skills,
  qualifications,
  experiences,
  skillShowcase,
} from "@/lib/content"

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/luiz-rodrigues-372866256/", icon: <Linkedin className="h-4 w-4" /> },
  { label: "GitHub", href: "https://github.com/Luizrodrlguesz", icon: <Github className="h-4 w-4" /> },
  { label: "E-mail", href: "mailto:luizh4321@gmail.com", icon: <Mail className="h-4 w-4" /> },
  { label: "WhatsApp", href: "https://wa.me/5541988657834", icon: <MessageCircle className="h-4 w-4" /> },
]

export default function Home() {
  const [locale, setLocale] = useState<Locale>("pt-br")
  const [loading, setLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [aboutTab, setAboutTab] = useState<"capacitacoes" | "experiencia">("capacitacoes")
  const [skillsTab, setSkillsTab] = useState<"presentation" | "toolkit">("presentation")
  const [skillCategory, setSkillCategory] = useState<"linguagens" | "front" | "back" | "outros">("linguagens")
  const [activeProject, setActiveProject] = useState(0)
  const [activeNav, setActiveNav] = useState("hero")
  const [showFloatingNav, setShowFloatingNav] = useState(false)

  const { scrollYProgress } = useScroll()

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest)
  })

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timeout)
  }, [])

  const hero = heroCopy[locale]
  const contact = contactCopy[locale]
  const defaultLocale: Locale = "pt-br"
  const heroMeta = useMemo(
    () => ({
      "pt-br": {
        status: "Pronto para novos desafios",
        expTitle: "Experiência",
        expSubtitle: "Front-end & produto",
        expValue: "2+ anos",
        stackTitle: "Stack principal",
        stackValue: "React · Node",
        stackSubtitle: "TypeScript · Flutter",
        connectionsTitle: "Conexões",
      },
      "en-us": {
        status: "Open for new challenges",
        expTitle: "Experience",
        expSubtitle: "Front-end & product",
        expValue: "2+ years",
        stackTitle: "Main stack",
        stackValue: "React · Node",
        stackSubtitle: "TypeScript · Flutter",
        connectionsTitle: "Connections",
      },
      "fr-fr": {
        status: "Prêt pour de nouveaux défis",
        expTitle: "Expérience",
        expSubtitle: "Front-end & produit",
        expValue: "2+ ans",
        stackTitle: "Stack principale",
        stackValue: "React · Node",
        stackSubtitle: "TypeScript · Flutter",
        connectionsTitle: "Connexions",
      },
    }),
    [],
  )
  const heroMetaCopy = heroMeta[locale]
  const sectionCopy = useMemo(
    () => ({
      "pt-br": {
        aboutLabel: "Sobre",
        aboutTitle: "Quem sou eu?",
        skillsLabel: "Skills",
        skillsTitle: "Toolkit principal",
        projectsLabel: "Projetos",
        projectsTitle: "Alguns destaques",
        contactLabel: "Contato",
      },
      "en-us": {
        aboutLabel: "About",
        aboutTitle: "Who am I?",
        skillsLabel: "Skills",
        skillsTitle: "Main toolkit",
        projectsLabel: "Projects",
        projectsTitle: "Highlights",
        contactLabel: "Contact",
      },
      "fr-fr": {
        aboutLabel: "À propos",
        aboutTitle: "Qui suis-je ?",
        skillsLabel: "Compétences",
        skillsTitle: "Boîte à outils principale",
        projectsLabel: "Projets",
        projectsTitle: "Quelques points forts",
        contactLabel: "Contact",
      },
    }),
    [],
  )
  const sectionLabels = sectionCopy[locale]
  const tabsCopy = useMemo(
    () => ({
      "pt-br": {
        about: { cap: "Capacitações", exp: "Experiência" },
        skills: { presentation: "Apresentação", toolkit: "Toolkit" },
        home: "Início",
      },
      "en-us": {
        about: { cap: "Qualifications", exp: "Experience" },
        skills: { presentation: "Presentation", toolkit: "Toolkit" },
        home: "Home",
      },
      "fr-fr": {
        about: { cap: "Formations", exp: "Expérience" },
        skills: { presentation: "Présentation", toolkit: "Boîte à outils" },
        home: "Accueil",
      },
    }),
    [],
  )
  const tabsLabels = tabsCopy[locale]
  const skillNameMap = useMemo(
    () =>
      ({
        "pt-br": {
          "Testes e Qualidade": "Testes e Qualidade",
          "DevOps básico": "DevOps básico",
          "React / Next.js": "React / Next.js",
          TypeScript: "TypeScript",
          "Node.js / APIs": "Node.js / APIs",
          "UI / UX Systems": "UI / UX Systems",
          "Flutter / Dart": "Flutter / Dart",
        },
        "en-us": {
          "Testes e Qualidade": "Testing & QA",
          "DevOps básico": "Basic DevOps",
          "React / Next.js": "React / Next.js",
          TypeScript: "TypeScript",
          "Node.js / APIs": "Node.js / APIs",
          "UI / UX Systems": "UI / UX Systems",
          "Flutter / Dart": "Flutter / Dart",
        },
        "fr-fr": {
          "Testes e Qualidade": "Tests et Qualité",
          "DevOps básico": "DevOps de base",
          "React / Next.js": "React / Next.js",
          TypeScript: "TypeScript",
          "Node.js / APIs": "Node.js / APIs",
          "UI / UX Systems": "UI / UX Systems",
          "Flutter / Dart": "Flutter / Dart",
        },
      }) as Record<Locale, Record<string, string>>,
    [],
  )
  const localizeSkillName = (name: string) => skillNameMap[locale][name] ?? name
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
  const pickLocale = (obj: Record<Locale, string> | string) =>
    typeof obj === "string" ? obj : obj[locale]
  const skillCategoryLabels = useMemo(
    () => ({
      "pt-br": {
        title: "Categorias",
        linguagens: "Linguagens",
        front: "Front-end",
        back: "Back-end",
        outros: "Outros",
      },
      "en-us": {
        title: "Categories",
        linguagens: "Languages",
        front: "Front-end",
        back: "Back-end",
        outros: "Others",
      },
      "fr-fr": {
        title: "Catégories",
        linguagens: "Langages",
        front: "Front-end",
        back: "Back-end",
        outros: "Autres",
      },
    }),
    [],
  )
  const skillCategoryCopy = skillCategoryLabels[locale]
  const projectsMeta = useMemo(
    () => ({
      "pt-br": { techLabel: "Tecnologias", visitCta: "Visitar", figmaCta: "Figma" },
      "en-us": { techLabel: "Technologies", visitCta: "Visit", figmaCta: "Figma" },
      "fr-fr": { techLabel: "Technologies", visitCta: "Visiter", figmaCta: "Figma" },
    }),
    [],
  )
  const projectsMetaCopy = projectsMeta[locale]
  const contactMeta = useMemo(
    () => ({
      "pt-br": {
        cards: {
          email: { label: "E-mail", hint: "Resposta rápida · <24h" },
          github: { label: "GitHub", hint: "Projetos e contribuições" },
          linkedin: { label: "LinkedIn", hint: "Disponível para conexões" },
        },
        resumeTitle: "Currículo",
        resumeSubtitle: "PDF com resumo de experiência, stack e projetos.",
        downloadCta: "Baixar CV (PDF)",
        viewCta: "Visualizar online",
        talkTitle: "Vamos conversar?",
        talkSubtitle: "Envie um e-mail ou marque uma call. Retorno em menos de 24h.",
        talkEmail: "Escrever e-mail",
        talkLinkedin: "Falar no LinkedIn",
      },
      "en-us": {
        cards: {
          email: { label: "E-mail", hint: "Quick reply · <24h" },
          github: { label: "GitHub", hint: "Projects and contributions" },
          linkedin: { label: "LinkedIn", hint: "Open to connections" },
        },
        resumeTitle: "Résumé",
        resumeSubtitle: "PDF with experience, stack, and projects.",
        downloadCta: "Download CV (PDF)",
        viewCta: "View online",
        talkTitle: "Shall we talk?",
        talkSubtitle: "Send an email or schedule a call. Reply within 24h.",
        talkEmail: "Send e-mail",
        talkLinkedin: "Chat on LinkedIn",
      },
      "fr-fr": {
        cards: {
          email: { label: "E-mail", hint: "Réponse rapide · <24h" },
          github: { label: "GitHub", hint: "Projets et contributions" },
          linkedin: { label: "LinkedIn", hint: "Disponible pour des connexions" },
        },
        resumeTitle: "CV",
        resumeSubtitle: "PDF avec expérience, stack et projets.",
        downloadCta: "Télécharger le CV (PDF)",
        viewCta: "Voir en ligne",
        talkTitle: "On discute ?",
        talkSubtitle: "Envoyez un e-mail ou planifiez un appel. Réponse sous 24h.",
        talkEmail: "Envoyer un e-mail",
        talkLinkedin: "Parler sur LinkedIn",
      },
    }),
    [],
  )
  const contactMetaCopy = contactMeta[locale]

  const skillColumns = useMemo(
    () => [
      skills.slice(0, Math.ceil(skills.length / 2)),
      skills.slice(Math.ceil(skills.length / 2)),
    ],
    [],
  )

  const showcaseByCategory = useMemo(
    () => ({
      linguagens: skillShowcase.filter((s) => s.category === "linguagens"),
      front: skillShowcase.filter((s) => s.category === "front"),
      back: skillShowcase.filter((s) => s.category === "back"),
      outros: skillShowcase.filter((s) => s.category === "outros"),
    }),
    [],
  )

  const [selectedSkillId, setSelectedSkillId] = useState<string | undefined>(
    showcaseByCategory.linguagens[0]?.id,
  )

  const navSections = useMemo(
    () => ["hero", "about", "skills", "projects", "contact"] as const,
    [],
  )

  const highlightTargets = useMemo(
    () => ["front-end", "typescript", "flutter/dart"],
    [],
  )
  const [highlightIdx, setHighlightIdx] = useState(0)
  const categorySkills = showcaseByCategory[skillCategory]
  const selectedSkill = categorySkills.find((s) => s.id === selectedSkillId)
  const selectedSkillImage = selectedSkill?.image ?? "/assets/skills/htmlcss.png"
  const shouldSplitColumns = categorySkills.length > 5
  const projectImage = projects[activeProject]?.image
  const skillLogos: Record<string, string> = useMemo(
    () => ({
      React: "/assets/skills/react.png",
      "Next.js": "/assets/skills/next.png",
      TypeScript: "/assets/skills/ts.png",
      "Tailwind CSS": "/assets/skills/tailwind.png",
      Figma: "/assets/skills/figma.png",
      "HTML5 & CSS3": "/assets/skills/htmlcss.png",
      Bootstrap: "/assets/skills/bootstrap.png",
      JavaScript: "/assets/skills/js.png",
      "Laravel (PHP)": "/assets/skills/laravel.png",
      Postman: "/assets/skills/postman.png",
      Notion: "/assets/skills/notion.png",
      "Node.js": "/assets/skills/node.png",
      Vercel: "/assets/skills/vercel.png",
      Flutter: "/assets/skills/flutter.png",
      "Flutter / Dart": "/assets/skills/flutter.png",
      Dart: "/assets/skills/dart.png",
      MUI: "/assets/skills/mui.png",
      "Material UI": "/assets/skills/mui.png",
    }),
    [],
  )

  useEffect(() => {
    if (highlightTargets.length === 0) return
    let timer: ReturnType<typeof setTimeout>

    const schedule = (nextIdx: number, delay: number) => {
      timer = setTimeout(() => {
        setHighlightIdx(nextIdx)
        const isLast = nextIdx === highlightTargets.length - 1
        const upcoming = (nextIdx + 1) % highlightTargets.length
        schedule(upcoming, isLast ? 10000 : 1700)
      }, delay)
    }

    schedule(1 % highlightTargets.length, 1700)
    return () => clearTimeout(timer)
  }, [highlightTargets.length])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const offset = 80
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: "smooth" })
  }

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    scrollToSection(id)
  }

  const renderHighlightedTitle = (text: string, activeIdx: number) => {
    const regex = new RegExp(`(${highlightTargets.join("|")})`, "gi")
    const parts = text.split(regex).filter(Boolean)
    return parts.map((part, idx) => {
      const matchIndex = highlightTargets.findIndex(
        (target) => target.toLowerCase() === part.toLowerCase(),
      )
      const isHighlight = matchIndex !== -1
      if (!isHighlight) {
        return (
          <span key={`${part}-${idx}`} className="inline-block">
            {part}
          </span>
        )
      }
      const isActive = matchIndex === activeIdx
      return (
        <motion.span
          key={`${part}-${idx}`}
          animate={{ backgroundSize: isActive ? "100% 70%" : "0% 70%" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative inline-block rounded-sm px-1 py-0.5 pt-2 text-foreground"
          style={{
            backgroundImage: "linear-gradient(120deg, rgba(59,130,246,0.35), rgba(59,130,246,0.35))",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 80%",
            backgroundSize: "0% 70%",
          }}
        >
          {part}
        </motion.span>
      )
    })
  }

  useEffect(() => {
    const handler = () => {
      const offsets = navSections.map((id) => {
        const el = document.getElementById(id)
        if (!el) return { id, top: Infinity }
        const rect = el.getBoundingClientRect()
        return { id, top: Math.abs(rect.top - 160) }
      })
      const closest = offsets.sort((a, b) => a.top - b.top)[0]
      if (closest) setActiveNav(closest.id)
      setShowFloatingNav(window.scrollY > 140)
    }
    handler()
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [navSections])

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <BackgroundCanvas scrollProgress={scrollProgress} />
      <CursorGlow />
      <LoadingScreen show={loading} />

      <div
        className={cn(
          "relative z-10 flex min-h-screen flex-col transition-opacity duration-300",
          loading ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
      >
        <SiteHeader locale={locale} />

        <main className="mx-auto w-full px-5 pb-24">
          <AnimatePresence>
            {showFloatingNav ? (
              <motion.div
                className="fixed top-4 right-4 z-40 hidden gap-2 lg:flex"
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
              >
                <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-1 py-1 shadow-md backdrop-blur">
                  <div className="flex items-center gap-1">
                    {navSections.map((id) => (
                      <Button
                        key={id}
                        asChild
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "rounded-full px-3 text-xs",
                          activeNav === id
                            ? "bg-foreground text-background"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <Link href={`#${id}`} onClick={(e) => handleAnchorClick(e, id)}>
                          {id === "hero"
                            ? tabsLabels.home
                            : id === "about"
                              ? sectionLabels.aboutLabel
                              : id === "skills"
                                ? sectionLabels.skillsLabel
                                : id === "projects"
                                  ? sectionLabels.projectsLabel
                                  : sectionLabels.contactLabel}
                        </Link>
                      </Button>
                    ))}
                  </div>
                  <div className="h-6 w-px bg-border/70" />
                  <ThemeToggle />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
          <section id="hero" className="flex flex-col gap-10 py-16">
            <motion.div
              className="section-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-semibold">
                  Luiz Rodrigues · Dev Front-end
                </Badge>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {heroMetaCopy.status}
                </div>
              </div>
              <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div className="space-y-6">
                  <motion.h1
                    className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {renderHighlightedTitle(hero.title, highlightIdx)}
                  </motion.h1>
                  <p className="text-lg text-muted-foreground">{hero.subtitle}</p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild size="lg" className="rounded-full">
                      <Link
                        href="#contact"
                        className="flex items-center gap-2"
                        onClick={(e) => handleAnchorClick(e, "contact")}
                      >
                        {hero.cta} <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="secondary" size="lg" className="rounded-full">
                      <Link href="#projects" onClick={(e) => handleAnchorClick(e, "projects")}>
                        {hero.secondaryCta}
                      </Link>
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="rounded-2xl border border-border/60 bg-card/70 p-4">
                      <p className="text-xs text-muted-foreground">{heroMetaCopy.expTitle}</p>
                      <p className="text-2xl font-semibold">{heroMetaCopy.expValue}</p>
                      <p className="text-muted-foreground">{heroMetaCopy.expSubtitle}</p>
                    </div>
                    <div className="rounded-2xl border border-border/60 bg-card/70 p-4">
                      <p className="text-xs text-muted-foreground">{heroMetaCopy.stackTitle}</p>
                      <p className="text-2xl font-semibold text-blue-500">{heroMetaCopy.stackValue}</p>
                      <p className="text-muted-foreground">{heroMetaCopy.stackSubtitle}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4 h-full">
                  <div className="relative h-32 w-32 overflow-hidden h-full">
                    <Image
                      src="/assets/thumb/astro-2.png"
                      alt="Avatar Luiz Rodrigues"
                      fill
                      className="object-contain"
                      sizes="128px"
                      priority
                    />
                  </div>
                  <div className="w-full rounded-3xl border border-border/60 bg-card/70 p-6 shadow-lg">
                    <p className="text-sm text-muted-foreground">{heroMetaCopy.connectionsTitle}</p>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {socials.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="group flex items-center justify-between rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-sm transition hover:-translate-y-1 hover:border-foreground/60"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span className="flex items-center gap-2">
                            {item.icon}
                            {item.label}
                          </span>
                          <ArrowUpRight className="h-4 w-4 opacity-60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="about" className="py-10">
            <motion.div
              className="section-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em]">
                    {sectionLabels.aboutLabel}
                  </p>
                  <h2 className="text-2xl font-semibold text-blue-500">{sectionLabels.aboutTitle}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-full border border-border/60 bg-card/60 p-1 text-xs shadow-sm">
                    <button
                      onClick={() => setAboutTab("capacitacoes")}
                      className={cn(
                        "rounded-full px-3 py-1 font-semibold transition",
                        aboutTab === "capacitacoes"
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {tabsLabels.about.cap}
                    </button>
                    <button
                      onClick={() => setAboutTab("experiencia")}
                      className={cn(
                        "rounded-full px-3 py-1 font-semibold transition",
                        aboutTab === "experiencia"
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {tabsLabels.about.exp}
                    </button>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{aboutCopy[locale]}</p>

              {aboutTab === "capacitacoes" ? (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {uniqueQualifications.map((item) => (
                    <Card
                      key={
                        typeof item.title === "string"
                          ? item.title
                          : (item.title as Record<Locale, string>)[defaultLocale]
                      }
                      className="border-border/60 bg-background/60"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{pickLocale(item.title)}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        {pickLocale(item.description)}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="mt-6 space-y-3">
                  {experiences.map((item) => (
                    <Card
                      key={
                        typeof item.role === "string"
                          ? item.role
                          : (item.role as Record<Locale, string>)[defaultLocale]
                      }
                      className="border-border/60 bg-background/60"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center justify-between text-base">
                          <span>{pickLocale(item.role)}</span>
                          <span className="text-xs font-semibold text-muted-foreground">
                            {pickLocale(item.period)}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        {pickLocale(item.description)}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>
          </section>

          <section id="skills" className="py-10">
            <motion.div
              className="section-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em]">
                    {sectionLabels.skillsLabel}
                  </p>
                  <h2 className="text-2xl font-semibold text-blue-500">{sectionLabels.skillsTitle}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-full border border-border/60 bg-card/60 p-1 text-xs shadow-sm">
                    <button
                      onClick={() => setSkillsTab("presentation")}
                      className={cn(
                        "rounded-full px-3 py-1 font-semibold transition",
                        skillsTab === "presentation"
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {tabsLabels.skills.presentation}
                    </button>
                    <button
                      onClick={() => setSkillsTab("toolkit")}
                      className={cn(
                        "rounded-full px-3 py-1 font-semibold transition",
                        skillsTab === "toolkit"
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {tabsLabels.skills.toolkit}
                    </button>
                  </div>
                </div>
              </div>
              {skillsTab === "toolkit" ? (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {skillColumns.map((column, idx) => (
                    <div key={idx} className="space-y-3">
                      {column.map((skill) => (
                        <Card key={skill.name} className="border-border/60 bg-background/60">
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base">{localizeSkillName(skill.name)}</CardTitle>
                              <span className="text-sm text-muted-foreground">{skill.level}%</span>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Progress value={skill.level} className="h-2 bg-muted" />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
                  <Card className="border-border/60 bg-background/60">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{skillCategoryCopy.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex flex-wrap gap-2">
                        {(["linguagens", "front", "back", "outros"] as const).map((cat) => (
                          <Button
                            key={cat}
                            variant={skillCategory === cat ? "default" : "outline"}
                            size="sm"
                            className={cn(
                              "rounded-full",
                              skillCategory === cat
                                ? "bg-foreground text-background"
                                : "border-border/70 text-foreground",
                            )}
                            onClick={() => {
                              setSkillCategory(cat)
                              const first = showcaseByCategory[cat][0]
                              if (first) setSelectedSkillId(first.id)
                            }}
                          >
                            {cat === "linguagens"
                              ? skillCategoryCopy.linguagens
                              : cat === "front"
                                ? skillCategoryCopy.front
                                : cat === "back"
                                  ? skillCategoryCopy.back
                                  : skillCategoryCopy.outros}
                          </Button>
                        ))}
                      </div>
                      <Separator />
                      <div
                        className={cn(
                          "grid gap-2",
                          shouldSplitColumns ? "grid-rows-5 grid-flow-col auto-cols-fr" : "grid-cols-1",
                        )}
                      >
                        {categorySkills.map((skill) => (
                          <Button
                            key={skill.id}
                            variant={selectedSkillId === skill.id ? "secondary" : "ghost"}
                            className={cn(
                              "justify-start rounded-xl border border-transparent text-left",
                              selectedSkillId === skill.id
                                ? "border-border/70 bg-card/80"
                                : "hover:border-border/60",
                            )}
                            onClick={() => setSelectedSkillId(skill.id)}
                          >
                            {skill.label[locale]}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedSkillId}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="h-full"
                    >
                      <Card className="relative h-full overflow-hidden border-border/60 bg-background/60">
                        <div
                          className="pointer-events-none absolute inset-0 opacity-10"
                          style={{
                            backgroundImage: `url('${selectedSkillImage}')`,
                            backgroundSize: "60%",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right center",
                          }}
                        />
                        <CardHeader className="relative pb-2">
                          <CardTitle className="text-base">
                            {selectedSkill?.label[locale] ?? "Selecione uma skill"}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="relative text-sm text-muted-foreground">
                          {selectedSkill?.description[locale] ?? "Escolha uma skill para ver os detalhes."}
                        </CardContent>
                      </Card>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          </section>

          <section id="projects" className="py-10">
            <motion.div
              className="section-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center gap-4 text-center">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em]">
                  {sectionLabels.projectsLabel}
                </p>
                <h2 className="text-2xl font-semibold text-blue-500">{sectionLabels.projectsTitle}</h2>
                <div className="flex flex-wrap justify-center gap-2 rounded-full border border-border/60 bg-card/60 p-1 shadow-sm">
                  {projects.map((project, idx) => (
                    <button
                      key={project.id}
                      onClick={() => setActiveProject(idx)}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-semibold transition",
                        activeProject === idx
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {project.title[locale]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`preview-${activeProject}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/70 p-4"
                  >
                    <div
                      className="absolute inset-0 opacity-70"
                      style={{
                        background: `radial-gradient(circle at 30% 20%, ${projects[activeProject].themeColor}40, transparent 45%), linear-gradient(135deg, ${projects[activeProject].themeColor}25, transparent 60%)`,
                      }}
                    />
                    <div className="relative aspect-[8/5] w-full overflow-hidden rounded-2xl border border-border/40 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_45%),linear-gradient(120deg,rgba(255,255,255,0.08),transparent_55%)] shadow-lg">
                      {projectImage ? (
                        <Image
                          src={projectImage}
                          alt={`Preview do projeto ${projects[activeProject].title[locale]}`}
                          fill
                          quality={95}
                          className="object-cover"
                          sizes="(min-width: 1280px) 720px, (min-width: 1024px) 620px, 100vw"
                          priority
                        />
                      ) : null}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`details-${activeProject}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    <Badge
                      variant="outline"
                      className="w-fit rounded-full border-border/70 px-3 py-1 text-xs font-semibold"
                      style={{
                        color: projects[activeProject].themeColor,
                        borderColor: projects[activeProject].themeColor + "66",
                      }}
                    >
                      {projects[activeProject].category[locale]}
                    </Badge>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-semibold">{projects[activeProject].title[locale]}</h3>
                      <p className="text-sm text-muted-foreground">
                        {projects[activeProject].subtitle[locale]}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {projects[activeProject].description[locale]}
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {projectsMetaCopy.techLabel}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {projects[activeProject].skills.map((tech) => {
                          const logo = skillLogos[tech]
                          if (logo) {
                            return (
                              <div
                                key={tech}
                                className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-card/70 p-1.5 shadow-sm"
                                title={tech}
                              >
                                <Image
                                  src={logo}
                                  alt={tech}
                                  width={40}
                                  height={40}
                                  className="object-contain"
                                />
                              </div>
                            )
                          }
                          return (
                            <Badge key={tech} variant="secondary" className="rounded-full px-3 py-1 text-xs">
                              {tech}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        asChild
                        className="rounded-full"
                        style={{ backgroundColor: projects[activeProject].themeColor, color: "#0b0b0b" }}
                      >
                        <Link href={projects[activeProject].liveLink} target="_blank" rel="noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          {projectsMetaCopy.visitCta}
                        </Link>
                      </Button>
                      {projects[activeProject].figmaLink ? (
                        <Button
                          variant="outline"
                          asChild
                          className="rounded-full border-border/70"
                          style={{ borderColor: projects[activeProject].themeColor + "80" }}
                        >
                          <Link href={projects[activeProject].figmaLink!} target="_blank" rel="noreferrer">
                            <ArrowUpRight className="mr-2 h-4 w-4" />
                            {projectsMetaCopy.figmaCta}
                          </Link>
                        </Button>
                      ) : null}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </section>

          <section id="contact" className="py-10">
            <motion.div
              className="section-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col gap-3 text-center md:text-left">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em]">
                  {sectionLabels.contactLabel}
                </p>
                <h2 className="text-2xl font-semibold text-blue-500">{contact.title}</h2>
                <p className="text-muted-foreground">{contact.subtitle}</p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <ContactCard
                  icon={<Mail className="h-6 w-6" />}
                  label={contactMetaCopy.cards.email.label}
                  info="luizh4321@gmail.com"
                  href="mailto:luizh4321@gmail.com"
                  hint={contactMetaCopy.cards.email.hint}
                />
                <ContactCard
                  icon={<Github className="h-6 w-6" />}
                  label={contactMetaCopy.cards.github.label}
                  info="@Luizrodrlguesz"
                  href="https://github.com/Luizrodrlguesz"
                  hint={contactMetaCopy.cards.github.hint}
                />
                <ContactCard
                  icon={<Linkedin className="h-6 w-6" />}
                  label={contactMetaCopy.cards.linkedin.label}
                  info="Luiz Rodrigues"
                  href="https://www.linkedin.com/in/luiz-rodrigues-372866256/"
                  hint={contactMetaCopy.cards.linkedin.hint}
                />
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                <Card className="border-border/60 bg-background/70">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground text-background">
                      <FileDown className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{contactMetaCopy.resumeTitle}</CardTitle>
                      <p className="text-sm text-muted-foreground">{contactMetaCopy.resumeSubtitle}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    <Button asChild className="rounded-full">
                      <Link href="/LuizRodriguesCV.pdf" target="_blank" download>
                        {contactMetaCopy.downloadCta}
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="rounded-full">
                      <Link href="/LuizRodriguesCV.pdf" target="_blank">
                        {contactMetaCopy.viewCta}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border/60 bg-background/70">
                  <CardHeader>
                    <CardTitle className="text-base">{contactMetaCopy.talkTitle}</CardTitle>
                    <p className="text-sm text-muted-foreground">{contactMetaCopy.talkSubtitle}</p>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    <Button asChild className="rounded-full">
                      <Link href="mailto:luizh4321@gmail.com">
                        <Mail className="mr-2 h-4 w-4" />
                        {contactMetaCopy.talkEmail}
                      </Link>
                    </Button>
                    <Button variant="secondary" asChild className="rounded-full">
                      <Link href="https://www.linkedin.com/in/luiz-rodrigues-372866256/" target="_blank">
                        <Linkedin className="mr-2 h-4 w-4" />
                        {contactMetaCopy.talkLinkedin}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </section>
      </main>

        <SiteFooter />
      </div>

      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
        <LanguageSwitcher value={locale} onChange={setLocale} />
        <BackToTop />
      </div>
    </div>
  )
}

function ContactCard({
  icon,
  label,
  info,
  hint,
  href,
}: {
  icon: ReactNode
  label: string
  info: string
  hint: string
  href: string
}) {
  return (
    <Card className="border-border/60 bg-background/70">
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground text-background">
          {icon}
        </div>
        <div>
          <CardTitle className="text-base">{label}</CardTitle>
          <p className="text-xs text-muted-foreground">{hint}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm font-semibold">{info}</p>
        <Button asChild variant="secondary" className="rounded-full">
          <Link href={href} target="_blank" rel="noreferrer">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Abrir
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

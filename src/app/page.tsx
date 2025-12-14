"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import Link from "next/link"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { ArrowUpRight, Github, Linkedin, Mail, ExternalLink, FileDown } from "lucide-react"
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
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: <Linkedin className="h-4 w-4" /> },
  { label: "GitHub", href: "https://github.com", icon: <Github className="h-4 w-4" /> },
  { label: "E-mail", href: "mailto:contato@luizhenrique.dev", icon: <Mail className="h-4 w-4" /> },
]

export default function Home() {
  const [locale, setLocale] = useState<Locale>("pt-br")
  const [loading, setLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [aboutTab, setAboutTab] = useState<"capacitacoes" | "experiencia">("capacitacoes")
  const [skillsTab, setSkillsTab] = useState<"presentation" | "toolkit">("presentation")
  const [skillCategory, setSkillCategory] = useState<"front" | "back" | "outros">("front")
  const [activeProject, setActiveProject] = useState(0)

  const { scrollYProgress } = useScroll()

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest)
  })

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timeout)
  }, [])

  const hero = heroCopy[locale]
  const contact = contactCopy[locale]

  const skillColumns = useMemo(
    () => [
      skills.slice(0, Math.ceil(skills.length / 2)),
      skills.slice(Math.ceil(skills.length / 2)),
    ],
    [],
  )

  const showcaseByCategory = useMemo(
    () => ({
      front: skillShowcase.filter((s) => s.category === "front"),
      back: skillShowcase.filter((s) => s.category === "back"),
      outros: skillShowcase.filter((s) => s.category === "outros"),
    }),
    [],
  )

  const [selectedSkillId, setSelectedSkillId] = useState<string | undefined>(
    showcaseByCategory.front[0]?.id,
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <BackgroundCanvas scrollProgress={scrollProgress} />
      <CursorGlow />
      <LoadingScreen show={loading} />

      <div className="relative z-10 flex min-h-screen flex-col">
        <SiteHeader locale={locale} />

        <main className="mx-auto w-full px-5 pb-24">
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
                  Pronto para novos desafios
                </div>
              </div>
              <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div className="space-y-6">
                  <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                    {hero.title}
          </h1>
                  <p className="text-lg text-muted-foreground">{hero.subtitle}</p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild size="lg" className="rounded-full">
                      <Link href="#contact" className="flex items-center gap-2">
                        {hero.cta} <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="secondary" size="lg" className="rounded-full">
                      <Link href="#projects">{hero.secondaryCta}</Link>
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="rounded-2xl border border-border/60 bg-card/70 p-4">
                      <p className="text-xs text-muted-foreground">Experiência</p>
                      <p className="text-2xl font-semibold">1+ ano</p>
                      <p className="text-muted-foreground">Front-end & produto</p>
                    </div>
                    <div className="rounded-2xl border border-border/60 bg-card/70 p-4">
                      <p className="text-xs text-muted-foreground">Stack principal</p>
                      <p className="text-2xl font-semibold">React · Node</p>
                      <p className="text-muted-foreground">TypeScript · Flutter</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-lg">
                  <p className="text-sm text-muted-foreground">Conexões</p>
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
                    Sobre
                  </p>
                  <h2 className="text-2xl font-semibold">Quem sou</h2>
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
                      Capacitações
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
                      Experiência
                    </button>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{aboutCopy[locale]}</p>

              {aboutTab === "capacitacoes" ? (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {qualifications.map((item) => (
                    <Card key={item.title} className="border-border/60 bg-background/60">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        {item.description[locale]}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="mt-6 space-y-3">
                  {experiences.map((item) => (
                    <Card key={item.role} className="border-border/60 bg-background/60">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center justify-between text-base">
                          <span>{item.role}</span>
                          <span className="text-xs font-semibold text-muted-foreground">
                            {item.period}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        {item.description[locale]}
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
                    Skills
                  </p>
                  <h2 className="text-2xl font-semibold">Toolkit principal</h2>
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
                      Tool presentation
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
                      Toolkit
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
                              <CardTitle className="text-base">{skill.name}</CardTitle>
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
                      <CardTitle className="text-base">Categorias</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex flex-wrap gap-2">
                        {(["front", "back", "outros"] as const).map((cat) => (
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
                            {cat === "front" ? "Front-end" : cat === "back" ? "Back-end" : "Outros"}
                          </Button>
                        ))}
                      </div>
                      <Separator />
                      <div className="grid gap-2">
                        {showcaseByCategory[skillCategory].map((skill) => (
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
                  <Card className="border-border/60 bg-background/60">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        {showcaseByCategory[skillCategory].find((s) => s.id === selectedSkillId)?.label[locale] ??
                          "Selecione uma skill"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      {showcaseByCategory[skillCategory].find((s) => s.id === selectedSkillId)?.description[locale] ??
                        "Escolha uma skill para ver os detalhes."}
                    </CardContent>
                  </Card>
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
                  Projetos
                </p>
                <h2 className="text-2xl font-semibold">Alguns destaques</h2>
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
                <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/70 p-4">
                  <div
                    className="absolute inset-0 opacity-70"
                    style={{
                      background: `radial-gradient(circle at 30% 20%, ${projects[activeProject].themeColor}40, transparent 45%), linear-gradient(135deg, ${projects[activeProject].themeColor}25, transparent 60%)`,
                    }}
                  />
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/40 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_45%),linear-gradient(120deg,rgba(255,255,255,0.08),transparent_55%)] shadow-lg" />
                </div>

                <div className="space-y-4">
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
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Tecnologias</p>
                    <div className="flex flex-wrap gap-2">
                      {projects[activeProject].skills.map((tech) => (
                        <Badge key={tech} variant="secondary" className="rounded-full px-3 py-1 text-xs">
                          {tech}
                        </Badge>
                      ))}
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
                        Visitar
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="rounded-full border-border/70"
                      style={{ borderColor: projects[activeProject].themeColor + "80" }}
                    >
                      <Link href={projects[activeProject].figmaLink} target="_blank" rel="noreferrer">
                        <ArrowUpRight className="mr-2 h-4 w-4" />
                        Figma
                      </Link>
                    </Button>
                  </div>
                </div>
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
                  Contato
                </p>
                <h2 className="text-2xl font-semibold">{contact.title}</h2>
                <p className="text-muted-foreground">{contact.subtitle}</p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <ContactCard
                  icon={<Mail className="h-6 w-6" />}
                  label="E-mail"
                  info="luizh4321@gmail.com"
                  href="mailto:luizh4321@gmail.com"
                  hint="Resposta rápida · <24h"
                />
                <ContactCard
                  icon={<Github className="h-6 w-6" />}
                  label="GitHub"
                  info="@Luizrodrlguesz"
                  href="https://github.com/Luizrodrlguesz"
                  hint="Projetos e contribuições"
                />
                <ContactCard
                  icon={<Linkedin className="h-6 w-6" />}
                  label="LinkedIn"
                  info="Luiz Rodrigues"
                  href="https://www.linkedin.com/in/luiz-rodrigues-372866256/"
                  hint="Disponível para conexões"
                />
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                <Card className="border-border/60 bg-background/70">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground text-background">
                      <FileDown className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Currículo</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        PDF com resumo de experiência, stack e projetos.
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    <Button asChild className="rounded-full">
                      <Link href="/LuizRodriguesCV.pdf" target="_blank" download>
                        Baixar CV (PDF)
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="rounded-full">
                      <Link href="/LuizRodriguesCV.pdf" target="_blank">
                        Visualizar online
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border/60 bg-background/70">
                  <CardHeader>
                    <CardTitle className="text-base">Vamos conversar?</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Envie um e-mail ou marque uma call. Retorno em menos de 24h.
                    </p>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    <Button asChild className="rounded-full">
                      <Link href="mailto:luizh4321@gmail.com">
                        <Mail className="mr-2 h-4 w-4" />
                        Escrever e-mail
                      </Link>
                    </Button>
                    <Button variant="secondary" asChild className="rounded-full">
                      <Link href="https://www.linkedin.com/in/luiz-rodrigues-372866256/" target="_blank">
                        <Linkedin className="mr-2 h-4 w-4" />
                        Falar no LinkedIn
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

"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { AboutSection } from "@/components/about-section"
import { LanguageMenu } from "@/components/language-menu"
import { PageBackground } from "@/components/page-background"
import { PortfolioHeader } from "@/components/portfolio-header"
import { RevealFooter } from "@/components/reveal-footer"
import { SegmentTabs } from "@/components/segment-tabs"
import { SkillsStack } from "@/components/skills-stack"
import { MOCK_PROJECTS } from "@/data/projects"
import { experiences } from "@/lib/content"
import { useLocale, useT } from "@/lib/i18n"
import { localizeProject } from "@/lib/project-helpers"

/**
 * Versão leve do portfólio: mesmo conteúdo da home com estrutura simples.
 * Os efeitos entram pontualmente e com custo controlado (fundo em WebGL puro,
 * segmentos, menu de idioma, About com cortina e texto revelado no scroll,
 * skills em scroll lateral e footer revelado com o contato).
 */

const TECH_STACK = ["React", "TypeScript", "Next.js", "Tailwind", "Node.js", "Laravel", "Flutter", "Dart", "Git"]

const PROJECT_TYPES = ["profissional", "pessoal"] as const
type ProjectType = (typeof PROJECT_TYPES)[number]

const h2 = "text-2xl font-bold"
const label = "text-xs font-semibold uppercase text-muted-foreground"
const section = "mx-auto max-w-4xl space-y-6 px-4 py-12"

export default function NewHome() {
  const { locale } = useLocale()
  const t = useT()
  const [projectType, setProjectType] = useState<ProjectType>("profissional")

  const projetos = useMemo(
    () => MOCK_PROJECTS.map((p) => localizeProject(p, locale)),
    [locale],
  )

  const stats = [
    { value: "2+", label: t.hero.stats.years },
    { value: String(MOCK_PROJECTS.length), label: t.hero.stats.projects },
    { value: String(experiences.length), label: t.hero.stats.companies },
  ]

  return (
    <div className="min-h-screen">
      <PageBackground />
      <PortfolioHeader />

      {/* Acima do fundo fixo (partículas ou nuvens). */}
      <main className="relative z-10">
        {/* INÍCIO */}
        {/* Fundo sólido igual ao da cortina do About (off-white / preto). */}
        <div className="bg-[var(--stage)] text-[var(--stage-foreground)]">
          <section id="inicio" className={`${section} pt-24`}>
            <Image
              src="/assets/avatar/hero-profile.png"
              alt="Luiz Rodrigues"
              width={240}
              height={320}
              priority
              className="h-auto rounded"
            />
            <p className="text-lg">{t.hero.greeting}</p>
            <h1 className="text-4xl font-black">
              {[t.hero.titleBefore, t.hero.titleAccent, t.hero.titleAfter].filter(Boolean).join(" ")}
            </h1>
            <p className="text-muted-foreground">{t.hero.paragraph}</p>
            <div className="flex gap-4">
              <a href="#contato" className="underline">{t.hero.ctaContact}</a>
              <a href="#projetos" className="underline">{t.hero.ctaProjects}</a>
            </div>
            <dl className="flex flex-wrap gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="text-3xl font-bold">{stat.value}</dd>
                  <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                </div>
              ))}
            </dl>
            <div>
              <p className={label}>{t.hero.stackTitle}</p>
              <p>{TECH_STACK.join(" · ")}</p>
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
            <p className="text-muted-foreground">{t.skills.intro}</p>
          </div>
          <SkillsStack />
        </section>

        {/* PROJETOS */}
        <section id="projetos" aria-labelledby="heading-projetos" className={section}>
          <p className={label}>{t.projects.eyebrow}</p>
          <h2 id="heading-projetos" className={h2}>{t.projects.title}</h2>

          <SegmentTabs
            aria-label={t.projects.filter.aria}
            items={PROJECT_TYPES.map((tipo) => ({ value: tipo, label: t.projects.filter[tipo] }))}
            value={projectType}
            onChange={(value) => setProjectType(value as ProjectType)}
          />

          <div className="space-y-4">
            {projetos
              .filter((p) => p.tipo === projectType)
              .map((projeto) => (
                <ProjectItem key={projeto.id} projeto={projeto} />
              ))}
          </div>
        </section>

      </main>

      <LanguageMenu />

      <RevealFooter />
    </div>
  )
}

type ProjetoLocalizado = ReturnType<typeof localizeProject>

function ProjectItem({ projeto }: { projeto: ProjetoLocalizado }) {
  const t = useT()
  const web = projeto.plataformas?.web
  const mobile = projeto.plataformas?.mobile
  const imagem = web?.imagem?.trim() || mobile?.imagem?.trim()
  const { stackDetalhada, decisoesTecnicas, desafiosExtras } = projeto.conteudoTecnico
  const insights = projeto.insights

  return (
    <details className="rounded border p-4">
      <summary className="cursor-pointer">
        <span className="font-semibold">{projeto.nome}</span>
        {projeto.status ? <span className="text-sm text-muted-foreground"> — {projeto.status}</span> : null}
        {projeto.resumo ? <p className="mt-1 text-sm text-muted-foreground">{projeto.resumo}</p> : null}
      </summary>

      <div className="mt-4 space-y-4 text-sm">
        {imagem ? (
          // eslint-disable-next-line @next/next/no-img-element -- dimensões variam por projeto
          <img src={imagem} alt={projeto.nome} loading="lazy" className="w-full max-w-xl rounded border" />
        ) : null}

        {projeto.destaque ? <p className="text-muted-foreground">{projeto.destaque}</p> : null}
        {projeto.descricao ? <p>{projeto.descricao}</p> : null}

        {projeto.metricas?.length ? (
          <ul className="flex flex-wrap gap-6">
            {projeto.metricas.map((m: { label: string; valor: string }) => (
              <li key={m.label}>
                <p className="font-bold">{m.valor}</p>
                <p className="text-muted-foreground">{m.label}</p>
              </li>
            ))}
          </ul>
        ) : null}

        <List title={t.projects.card.responsibility} items={projeto.responsabilidade} />

        {insights ? (
          <div className="space-y-1">
            <p className={label}>{t.projects.insights.heading}</p>
            {(["desafio", "solucao", "resultado"] as const).map((k) =>
              insights[k]?.trim() ? (
                <p key={k}>
                  <strong>{t.projects.insights[k]}:</strong> {insights[k]}
                </p>
              ) : null,
            )}
          </div>
        ) : null}

        {projeto.tecnologias?.length ? (
          <div>
            <p className={label}>{t.projects.technologies}</p>
            <p>{projeto.tecnologias.join(" · ")}</p>
          </div>
        ) : null}

        {stackDetalhada.length ? (
          <div>
            <p className={label}>{t.projects.technical.stack}</p>
            <p>{stackDetalhada.join(" · ")}</p>
          </div>
        ) : null}

        <List title={t.projects.technical.decisions} items={decisoesTecnicas} />
        <List title={t.projects.technical.challenges} items={desafiosExtras} />
        <List title={t.projects.evolution} items={projeto.evolucao} />

        <div className="flex flex-wrap gap-4">
          {web?.link?.trim() ? (
            <a href={web.link} target="_blank" rel="noopener noreferrer" className="underline">
              {t.projects.card.visit} ({t.projects.platformLabels.web})
            </a>
          ) : null}
          {mobile?.link?.trim() ? (
            <a href={mobile.link} target="_blank" rel="noopener noreferrer" className="underline">
              {t.projects.card.visit} ({t.projects.platformLabels.mobile})
            </a>
          ) : null}
          {projeto.figmaLink?.trim() ? (
            <a href={projeto.figmaLink} target="_blank" rel="noopener noreferrer" className="underline">
              {t.projects.card.viewFigma}
            </a>
          ) : null}
        </div>
      </div>
    </details>
  )
}

function List({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null
  return (
    <div>
      <p className={label}>{title}</p>
      <ul className="list-disc pl-5">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  imagemParaPlataforma,
  plataformasDisponiveis,
  visitUrlParaPlataforma,
} from "@/lib/project-helpers"
import { ProjectEvolution } from "./project-evolution"
import { ProjectInsights } from "./project-insights"
import { ProjectPlatformSwitcher } from "./project-platform-switcher"
import { ProjectTechnologies } from "./project-technologies"

const LABEL_CATEGORIA = {
  web: "Web",
  app: "App",
  sistema: "Sistema",
}

const LABEL_PLATAFORMA = {
  web: "Web",
  mobile: "Mobile",
}

/**
 * Detalhe do projeto: hierarquia editorial + alternador de plataforma e CTAs contextualizados.
 */
export function ProjectCard({ projeto }) {
  const disponiveis = useMemo(
    () => plataformasDisponiveis(projeto),
    [projeto],
  )

  const [plataformaAtiva, setPlataformaAtiva] = useState("web")

  useEffect(() => {
    const lista = plataformasDisponiveis(projeto)
    if (lista.includes("web")) setPlataformaAtiva("web")
    else if (lista.includes("mobile")) setPlataformaAtiva("mobile")
    else setPlataformaAtiva("web")
  }, [projeto])

  const opcoesPlataforma = useMemo(
    () =>
      disponiveis.map((id) => ({
        id,
        label: LABEL_PLATAFORMA[id] ?? id,
      })),
    [disponiveis],
  )

  const visitUrl = visitUrlParaPlataforma(projeto.plataformas, plataformaAtiva)
  const imageSrc = imagemParaPlataforma(projeto.plataformas, plataformaAtiva)

  const platformHeadingId = `platform-label-${projeto.id}`

  return (
    <article
      role="tabpanel"
      aria-labelledby={`project-tab-${projeto.id}`}
      className="space-y-6 rounded-lg border border-border bg-card p-6"
    >
      {/* 1. Nome + resumo (+ categoria) */}
      <header className="space-y-3">
        <div className="flex flex-wrap items-start gap-3">
          <span className="shrink-0 rounded border border-border px-2 py-0.5 text-xs uppercase tracking-wide text-muted-foreground">
            {LABEL_CATEGORIA[projeto.categoria] ?? projeto.categoria}
          </span>
          <div className="min-w-0 flex-1 space-y-2">
            <h3 className="text-xl font-semibold text-foreground">{projeto.nome}</h3>
            <p className="text-sm font-medium leading-snug text-foreground/90">
              {projeto.resumo}
            </p>
          </div>
        </div>
      </header>

      {/* 2. Alternador de plataforma */}
      <div className="space-y-2">
        <p id={platformHeadingId} className="text-sm font-medium text-foreground">
          Plataforma
        </p>
        <ProjectPlatformSwitcher
          value={plataformaAtiva}
          onChange={setPlataformaAtiva}
          options={opcoesPlataforma}
          labelledBy={platformHeadingId}
        />
        {opcoesPlataforma.length < 2 ? (
          <p className="text-xs text-muted-foreground">
            {disponiveis.length === 0
              ? "Sem referência web ou mobile neste registo."
              : `Conteúdo mostrado para ${LABEL_PLATAFORMA[disponiveis[0]] ?? disponiveis[0]}.`}
          </p>
        ) : null}
      </div>

      {/* 3. Imagem do projeto */}
      <figure className="space-y-2">
        {imageSrc ? (
          <div className="overflow-hidden rounded-md border border-border bg-muted/30">
            <img
              src={imageSrc}
              alt={`Pré-visualização (${plataformaAtiva}) — ${projeto.nome}`}
              className="max-h-72 w-full object-cover object-top"
              loading="lazy"
            />
          </div>
        ) : (
          <p className="rounded-md border border-dashed border-border px-3 py-6 text-center text-sm text-muted-foreground">
            Sem imagem para esta combinação de plataforma; pode adicionar URL em{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">plataformas</code>.
          </p>
        )}
      </figure>

      {/* 4. Descrição */}
      <div>
        <h4 className="sr-only">Sobre o projeto</h4>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {projeto.descricao}
        </p>
      </div>

      {/* 5. Insights */}
      <ProjectInsights projectId={projeto.id} insights={projeto.insights} />

      {/* 6. Tecnologias */}
      <ProjectTechnologies
        projectId={projeto.id}
        tecnologias={projeto.tecnologias}
      />

      {/* 7. Evolução */}
      <ProjectEvolution projectId={projeto.id} evolucao={projeto.evolucao} />

      {/* 8. CTAs */}
      <footer className="flex flex-wrap gap-2 border-t border-border pt-4">
        {visitUrl ? (
          <Button asChild variant="default" size="sm">
            <a href={visitUrl} target="_blank" rel="noopener noreferrer">
              Visitar projeto
            </a>
          </Button>
        ) : (
          <Button type="button" size="sm" disabled variant="secondary">
            Visitar projeto
          </Button>
        )}
        {projeto.figmaLink?.trim() ? (
          <Button asChild variant="outline" size="sm">
            <a href={projeto.figmaLink} target="_blank" rel="noopener noreferrer">
              Ver no Figma
            </a>
          </Button>
        ) : null}
      </footer>
    </article>
  )
}

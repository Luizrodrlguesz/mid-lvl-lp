"use client"

import { useEffect, useMemo, useState } from "react"
import { MOCK_PROJECTS } from "@/data/projects"
import { projetosPorTipo } from "@/lib/project-helpers"
import { ProjectsFilter } from "./projects-filter"
import { ProjectsHeader } from "./projects-header"
import { ProjectCard } from "./project-card"
import { ProjectsTabs } from "./projects-tabs"

/**
 * Orquestra dados + estado (tipo ativo, projeto ativo) e compõe os subcomponentes.
 * Único sítio que conhece a lista completa e as regras de sincronização ao mudar o filtro.
 */
export function ProjectsSection() {
  const [tipo, setTipo] = useState("profissional")
  const [activeId, setActiveId] = useState(null)

  const filtrados = useMemo(() => projetosPorTipo(MOCK_PROJECTS, tipo), [tipo])

  useEffect(() => {
    if (!filtrados.length) {
      setActiveId(null)
      return
    }
    const stillVisible = filtrados.some((p) => p.id === activeId)
    if (!stillVisible) {
      setActiveId(filtrados[0].id)
    }
  }, [filtrados, activeId])

  const ativo = useMemo(
    () => filtrados.find((p) => p.id === activeId) ?? filtrados[0] ?? null,
    [filtrados, activeId],
  )

  const tabItems = useMemo(
    () => filtrados.map((p) => ({ id: p.id, nome: p.nome })),
    [filtrados],
  )

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <ProjectsHeader
        title="Projetos"
        description="Experiência profissional e projetos pessoais, do mais recente ao mais antigo. Use o filtro e as tabs para explorar cada entrada."
      />

      <ProjectsFilter value={tipo} onChange={setTipo} />

      <ProjectsTabs
        items={tabItems}
        activeId={ativo?.id ?? ""}
        onSelect={setActiveId}
      />

      {ativo ? <ProjectCard projeto={ativo} /> : null}
    </div>
  )
}

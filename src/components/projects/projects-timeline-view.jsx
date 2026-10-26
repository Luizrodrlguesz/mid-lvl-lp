"use client"

import { AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import { MOCK_PROJECTS } from "@/data/projects"
import { localizeProject } from "@/lib/project-helpers"
import { useLocale, useT } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { PillTabs } from "@/components/pill-tabs"
import { ProjectCard } from "./project-card"
import { ProjectsTimeline } from "./projects-timeline"

/**
 * Versão "linha do tempo" da seção de projetos (a do index antigo, que segue na
 * main): modo visual/técnico, a constelação com o foguete no projeto ativo e o card dele logo abaixo. Sem cabeçalho próprio: a
 * página já mostra o da seção. O brilho da linha segue discretamente o scroll.
 * @param {{ className?: string, category?: "all" | "sistema" | "lp" }} [props]
 */
export function ProjectsTimelineView({ className, category = "all" } = {}) {
  const { locale } = useLocale()
  const t = useT()
  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start 0.92", "end 0.2"],
  })
  const lineGlow = useTransform(
    scrollYProgress,
    [0, 0.32, 0.68, 1],
    [0.32, 1, 0.52, 0.28],
  )

  const [activeId, setActiveId] = useState(null)
  const [viewMode, setViewMode] = useState("visual")

  // Só há projetos profissionais (o filtro profissional/pessoal saiu); o filtro
  // agora é por categoria (todos, sistemas ou LPs), vindo das abas da seção.
  const filtrados = useMemo(
    () =>
      MOCK_PROJECTS.filter((p) => category === "all" || p.categoria === category).map((p) =>
        localizeProject(p, locale),
      ),
    [locale, category],
  )

  useEffect(() => {
    if (!filtrados.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const timelineItems = useMemo(
    () => filtrados.map((p) => ({ id: p.id, nome: p.nome })),
    [filtrados],
  )

  return (
    <div ref={scrollRef} className={cn("mx-auto flex w-[90%] flex-col gap-8", className)}>
      <div className="flex flex-col gap-0">
        <PillTabs
          tabs={[
            { id: "visual", label: t.projects.mode.visual },
            { id: "tecnico", label: t.projects.mode.tecnico },
          ]}
          value={viewMode}
          onChange={setViewMode}
          label={t.projects.mode.aria}
          idPrefix="projects-mode"
          className="self-start"
        />

        <ProjectsTimeline
          items={timelineItems}
          activeId={ativo?.id ?? ""}
          onSelect={setActiveId}
          tipo="profissional"
          scrollLineGlow={lineGlow}
        />
      </div>

      {/* O card sai da coluna de 90% e vai quase até as bordas da tela (1rem de folga). */}
      <div className="relative left-1/2 w-[calc(100vw-2rem)] -translate-x-1/2">
        <AnimatePresence mode="wait">
          {ativo ? (
            <ProjectCard
              key={ativo.id}
              projeto={ativo}
              tipo="profissional"
              viewMode={viewMode}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}

"use client"

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import { MOCK_PROJECTS } from "@/data/projects"
import { projetosPorTipo } from "@/lib/project-helpers"
import { PROJECTS_EASE } from "@/lib/projects-motion"
import { ProjectsFilter } from "./projects-filter"
import { ProjectsHeader } from "./projects-header"
import { ProjectCard } from "./project-card"
import { ProjectModeToggle } from "./project-mode-toggle"
import { ProjectsTimeline } from "./projects-timeline"

/**
 * Orquestra timeline, modo visual/técnico e animação de entrada da secção.
 * O brilho da linha da constelação segue discretamente o scroll na viewport.
 */
export function ProjectsSection() {
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

  const [tipo, setTipo] = useState("profissional")
  const [activeId, setActiveId] = useState(null)
  const [viewMode, setViewMode] = useState("visual")

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

  const timelineItems = useMemo(
    () => filtrados.map((p) => ({ id: p.id, nome: p.nome })),
    [filtrados],
  )

  return (
    <motion.div
      ref={scrollRef}
      className="mx-auto max-w-6xl space-y-8"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px 0px", amount: 0.12 }}
      transition={{ duration: 0.42, ease: PROJECTS_EASE }}
    >
      <ProjectsHeader
        title="Projetos"
        description="Percorra a constelação da linha do tempo — do mais recente ao mais antigo. Use o modo Visual para uma leitura rápida ou Técnico para aprofundar decisões e stack."
      />

      <motion.div
        key={tipo}
        initial={{ opacity: 0.88 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.28, ease: PROJECTS_EASE }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <ProjectsFilter value={tipo} onChange={setTipo} />
        <ProjectModeToggle value={viewMode} onChange={setViewMode} />
      </motion.div>

      <ProjectsTimeline
        items={timelineItems}
        activeId={ativo?.id ?? ""}
        onSelect={setActiveId}
        tipo={tipo}
        scrollLineGlow={lineGlow}
      />

      <AnimatePresence mode="wait">
        {ativo ? (
          <ProjectCard
            key={ativo.id}
            projeto={ativo}
            tipo={tipo}
            viewMode={viewMode}
          />
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}

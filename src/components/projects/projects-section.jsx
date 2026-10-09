"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useMemo, useRef, useState } from "react"
import { MOCK_PROJECTS } from "@/data/projects"
import { localizeProject, projetosPorTipo } from "@/lib/project-helpers"
import { useLocale, useT } from "@/lib/i18n"
import { PROJECTS_EASE } from "@/lib/projects-motion"
import { cn } from "@/lib/utils"
import { ProjectsFilter } from "./projects-filter"
import { ProjectsHeader } from "./projects-header"
import { ProjectCard } from "./project-card"
import { ProjectModeToggle } from "./project-mode-toggle"
import FlexCarousel from "./flex-carousel"

/** Imagem do projeto no carrossel: tela web, depois preview, mobile e logo. */
function carouselImage(projeto) {
  const preview = Array.isArray(projeto.previewImages) ? projeto.previewImages[0] : projeto.previewImages?.web?.[0]
  return (
    projeto.plataformas?.web?.imagem?.trim() ||
    preview ||
    projeto.plataformas?.mobile?.imagem?.trim() ||
    projeto.logoEmpresa ||
    "/assets/lr-logo.png"
  )
}

/**
 * Orquestra o carrossel de projetos, o modo visual/técnico e a animação de entrada da secção.
 * Clicar no projeto em destaque no carrossel abre o card dele logo abaixo.
 * @param {{ className?: string }} [props]
 */
export function ProjectsSection({ className } = {}) {
  const { locale } = useLocale()
  const t = useT()
  const cardRef = useRef(null)

  const [tipo, setTipo] = useState("profissional")
  const [activeId, setActiveId] = useState(null)
  const [viewMode, setViewMode] = useState("visual")

  const traduzidos = useMemo(
    () => MOCK_PROJECTS.map((p) => localizeProject(p, locale)),
    [locale],
  )

  const filtrados = useMemo(
    () => projetosPorTipo(traduzidos, tipo),
    [traduzidos, tipo],
  )

  const ativo = useMemo(
    () => filtrados.find((p) => p.id === activeId) ?? null,
    [filtrados, activeId],
  )

  const carouselItems = useMemo(
    () =>
      filtrados.map((p) => ({
        src: carouselImage(p),
        alt: p.nome,
        title: p.nome,
        subtitle: p.status,
      })),
    [filtrados],
  )

  const openProject = (index) => {
    const projeto = filtrados[index]
    if (!projeto) return
    setActiveId(projeto.id)
    // Espera o card montar antes de rolar até ele.
    window.setTimeout(() => {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 120)
  }

  return (
    <motion.div
      className={cn("mx-auto max-w-6xl flex flex-col gap-8", className)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px 0px", amount: 0.12 }}
      transition={{ duration: 0.42, ease: PROJECTS_EASE }}
    >
      <ProjectsHeader
        eyebrow={t.projects.eyebrow}
        title={t.projects.title}
        description={t.projects.description}
      />

      <div className="flex flex-col gap-0">
        <motion.div
          key={tipo}
          initial={{ opacity: 0.88 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.28, ease: PROJECTS_EASE }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <ProjectsFilter
            value={tipo}
            onChange={(nextTipo) => {
              setTipo(nextTipo)
              // O projeto aberto pode não existir na nova lista.
              setActiveId(null)
            }}
          />
          <ProjectModeToggle value={viewMode} onChange={setViewMode} />
        </motion.div>

        <div className="relative mt-6 h-[560px] w-full">
          <FlexCarousel
            key={tipo}
            items={carouselItems}
            preset="liquid"
            intro="rise"
            cardHeight={0.5}
            gap={12}
            squeeze={0.2}
            focusOnClick={false}
            captions
            fit="natural"
            radius={0}
            lensWidth={0.74}
            lensHeight={1.18}
            tilt={62}
            roundness={1}
            bend={0.34}
            reach={0.38}
            curl="twist"
            dispersion={0.45}
            liquid={0}
            followCursor={false}
            autoplay={false}
            interval={4}
            captureWheel
            onSelect={openProject}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {ativo ? (
          <div ref={cardRef} key={ativo.id} className="scroll-mt-24">
            <ProjectCard projeto={ativo} tipo={tipo} viewMode={viewMode} />
          </div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}

"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { PillTabs } from "@/components/pill-tabs"
import { ProjectsShowcase, type ProjectCategoryFilter } from "@/components/projects-showcase"
import { ProjectsTimelineView } from "@/components/projects/projects-timeline-view"
import { useT } from "@/lib/i18n"

/*
 * Projetos em duas versões, à escolha de quem visita: o carrossel (padrão) ou a
 * linha do tempo com o foguete do index antigo, escolhidas nas abas em pílula —
 * e filtrados por categoria (todos, sistemas ou LPs) nas abas ao lado.
 */

type View = "carousel" | "timeline"

const VIEWS: View[] = ["carousel", "timeline"]
const CATEGORIES: ProjectCategoryFilter[] = ["all", "sistema", "lp"]

export function ProjectsViewSwitch() {
  const t = useT()
  const [view, setView] = useState<View>("carousel")
  const [category, setCategory] = useState<ProjectCategoryFilter>("all")

  return (
    <>
      {/* Visualização e filtro por categoria na mesma linha (quebram no mobile). */}
      <div className="mx-auto flex w-[90%] flex-wrap items-center gap-3">
        <PillTabs
          tabs={VIEWS.map((id) => ({ id, label: t.projects.view[id] }))}
          value={view}
          onChange={setView}
          label={t.projects.view.aria}
          idPrefix="projects-view"
          controls="projects-view-panel"
        />
        <PillTabs
          tabs={CATEGORIES.map((id) => ({ id, label: t.projects.category[id] }))}
          value={category}
          onChange={setCategory}
          label={t.projects.category.aria}
          idPrefix="projects-category"
          controls="projects-view-panel"
        />
      </div>

      <div id="projects-view-panel" role="tabpanel" aria-labelledby={`projects-view-${view}`} className="mt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${view}-${category}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {view === "carousel" ? (
              <ProjectsShowcase category={category} />
            ) : (
              <ProjectsTimelineView category={category} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}

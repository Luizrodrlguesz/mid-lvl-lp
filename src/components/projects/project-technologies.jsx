/**
 * Lista de tecnologias usadas no projeto.
 */
import { useT } from "@/lib/i18n"

import { TechLogoList } from "./tech-logo-list"

export function ProjectTechnologies({ projectId, tecnologias }) {
  const t = useT()

  if (!tecnologias?.length) return null

  const headingId = `tech-heading-${projectId}`

  return (
    <section aria-labelledby={headingId}>
      <h4 id={headingId} className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {t.projects.technologies}
      </h4>
      <TechLogoList tecnologias={tecnologias} />
    </section>
  )
}

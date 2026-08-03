"use client"

import { useT } from "@/lib/i18n"

/**
 * Aprendizados e evolução profissional ligados ao projeto.
 */
export function ProjectEvolution({ projectId, evolucao }) {
  const t = useT()

  if (!evolucao?.length) return null

  const headingId = `evolucao-heading-${projectId}`

  return (
    <section aria-labelledby={headingId}>
      <h4 id={headingId} className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {t.projects.evolution}
      </h4>
      <ul className="list-inside list-disc space-y-1.5 pl-0.5 text-sm leading-relaxed text-muted-foreground marker:text-primary/60">
        {evolucao.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

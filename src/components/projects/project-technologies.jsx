/**
 * Lista de tecnologias usadas no projeto.
 */
export function ProjectTechnologies({ projectId, tecnologias }) {
  if (!tecnologias?.length) return null

  const headingId = `tech-heading-${projectId}`

  return (
    <section aria-labelledby={headingId}>
      <h4 id={headingId} className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Tecnologias
      </h4>
      <ul className="flex flex-wrap gap-2">
        {tecnologias.map((t) => (
          <li
            key={t}
            className="rounded-md border border-border/60 bg-muted/25 px-2.5 py-1 text-xs text-foreground"
          >
            {t}
          </li>
        ))}
      </ul>
    </section>
  )
}

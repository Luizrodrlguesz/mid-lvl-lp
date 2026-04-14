/**
 * Aprendizados e evolução profissional ligados ao projeto.
 */
export function ProjectEvolution({ projectId, evolucao }) {
  if (!evolucao?.length) return null

  const headingId = `evolucao-heading-${projectId}`

  return (
    <section aria-labelledby={headingId}>
      <h4 id={headingId} className="mb-2 text-sm font-medium text-foreground">
        Evolução e aprendizados
      </h4>
      <ul className="list-inside list-disc space-y-1.5 text-sm leading-relaxed text-muted-foreground">
        {evolucao.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

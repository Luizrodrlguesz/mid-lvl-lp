"use client"

import { useT } from "@/lib/i18n"

/**
 * Bloco só no modo técnico: stack expandida, decisões e desafios extra.
 */
export function ProjectTechnicalDetails({ projectId, conteudo }) {
  const t = useT()

  if (!conteudo) return null

  const {
    stackDetalhada = [],
    decisoesTecnicas = [],
    desafiosExtras = [],
  } = conteudo

  const hasAny =
    stackDetalhada.length > 0 ||
    decisoesTecnicas.length > 0 ||
    desafiosExtras.length > 0

  if (!hasAny) return null

  const baseId = `tech-details-${projectId}`

  return (
    <div className="space-y-5 rounded-lg border border-primary/15 bg-primary/[0.03] p-4 dark:bg-primary/[0.05]">
      {stackDetalhada.length > 0 ? (
        <section aria-labelledby={`${baseId}-stack`}>
          <h4
            id={`${baseId}-stack`}
            className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary/90"
          >
            {t.projects.technical.stack}
          </h4>
          <ul className="flex flex-wrap gap-1.5">
            {stackDetalhada.map((item) => (
              <li
                key={item}
                className="rounded border border-transparent bg-background/60 px-2 py-0.5 font-mono text-[11px] text-foreground/90 dark:border-border/60"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {decisoesTecnicas.length > 0 ? (
        <section aria-labelledby={`${baseId}-dec`}>
          <h4
            id={`${baseId}-dec`}
            className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary/90"
          >
            {t.projects.technical.decisions}
          </h4>
          <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            {decisoesTecnicas.map((t, i) => (
              <li key={i} className="flex gap-2 border-l-2 border-primary/25 pl-3">
                {t}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {desafiosExtras.length > 0 ? (
        <section aria-labelledby={`${baseId}-des`}>
          <h4
            id={`${baseId}-des`}
            className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary/90"
          >
            {t.projects.technical.challenges}
          </h4>
          <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground marker:text-primary/50">
            {desafiosExtras.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}

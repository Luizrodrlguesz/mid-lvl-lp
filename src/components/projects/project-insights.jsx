import { insightsTemConteudo } from "@/lib/project-helpers"

const CAMPOS = [
  { key: "desafio", label: "Desafio" },
  { key: "solucao", label: "Solução" },
  { key: "resultado", label: "Resultado" },
]

/**
 * Bloco opcional com separação visual suave (painel discreto).
 */
export function ProjectInsights({ projectId, insights }) {
  if (!insightsTemConteudo(insights)) return null

  const linhas = CAMPOS.map(({ key, label }) => ({
    key,
    label,
    texto: insights[key]?.trim() ?? "",
  })).filter((l) => l.texto)

  if (!linhas.length) return null

  const headingId = `insights-heading-${projectId}`

  return (
    <section
      aria-labelledby={headingId}
      className="space-y-3 rounded-lg border border-border/70 bg-muted/15 p-4 ring-1 ring-black/[0.03] dark:ring-white/[0.04]"
    >
      <h4 id={headingId} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Diferencial técnico
      </h4>
      <dl className="grid gap-3.5 text-sm text-muted-foreground">
        {linhas.map(({ key, label, texto }) => (
          <div
            key={key}
            className="border-l-2 border-primary/35 pl-3"
          >
            <dt className="text-xs font-semibold uppercase tracking-wide text-foreground/85">
              {label}
            </dt>
            <dd className="mt-1 leading-relaxed">{texto}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

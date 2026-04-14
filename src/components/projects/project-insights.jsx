import { insightsTemConteudo } from "@/lib/project-helpers"

const CAMPOS = [
  { key: "desafio", label: "Desafio" },
  { key: "solucao", label: "Solução" },
  { key: "resultado", label: "Resultado" },
]

/**
 * Bloco opcional: raciocínio técnico (desafio → solução → resultado).
 * Só aparece se houver pelo menos um campo preenchido.
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
    <section aria-labelledby={headingId} className="space-y-3">
      <h4 id={headingId} className="text-sm font-medium text-foreground">
        Diferencial técnico
      </h4>
      <dl className="grid gap-3 text-sm text-muted-foreground">
        {linhas.map(({ key, label, texto }) => (
          <div key={key}>
            <dt className="font-medium text-foreground/90">{label}</dt>
            <dd className="mt-0.5 leading-relaxed">{texto}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

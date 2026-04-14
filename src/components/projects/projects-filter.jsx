/**
 * Alterna o conjunto de projetos visíveis (profissional vs pessoal).
 * Componente controlado: estado e callbacks vivem no pai (ProjectsSection).
 */
export function ProjectsFilter({ value, onChange }) {
  const options = [
    { id: "profissional", label: "Projetos profissionais" },
    { id: "pessoal", label: "Projetos pessoais" },
  ]

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filtrar projetos por tipo"
    >
      {options.map((opt) => {
        const selected = value === opt.id
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            aria-pressed={selected}
            className={
              selected
                ? "rounded-md border border-foreground bg-foreground px-3 py-1.5 text-sm text-background"
                : "rounded-md border border-border bg-transparent px-3 py-1.5 text-sm text-foreground"
            }
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

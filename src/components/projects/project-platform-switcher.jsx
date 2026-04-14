/**
 * Alternância Web / Mobile quando ambas as plataformas têm conteúdo.
 * Não renderiza nada se só existir uma plataforma (o pai fixa a ativa).
 */
export function ProjectPlatformSwitcher({
  value,
  onChange,
  options,
  labelledBy,
}) {
  if (!options || options.length < 2) return null

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-labelledby={labelledBy}
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

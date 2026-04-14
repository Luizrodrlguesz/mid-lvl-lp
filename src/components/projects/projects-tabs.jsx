/**
 * Lista de projetos do filtro atual como tabs (navegação horizontal).
 * Apenas altera o projeto ativo; não conhece o modelo completo além de id + nome.
 */
export function ProjectsTabs({ items, activeId, onSelect }) {
  if (!items.length) {
    return (
      <p className="text-sm text-muted-foreground" role="status">
        Nenhum projeto nesta categoria.
      </p>
    )
  }

  return (
    <nav aria-label="Projetos nesta categoria" className="w-full overflow-x-auto">
      <ul
        role="tablist"
        className="flex min-w-0 flex-wrap gap-2 border-b border-border pb-2"
      >
        {items.map((item) => {
          const active = item.id === activeId
          return (
            <li key={item.id} role="presentation">
              <button
                type="button"
                id={`project-tab-${item.id}`}
                role="tab"
                aria-selected={active}
                tabIndex={active ? 0 : -1}
                onClick={() => onSelect(item.id)}
                className={
                  active
                    ? "rounded-t-md border border-b-0 border-border bg-card px-3 py-2 text-left text-sm font-medium text-foreground"
                    : "rounded-t-md border border-transparent px-3 py-2 text-left text-sm text-muted-foreground"
                }
              >
                {item.nome}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

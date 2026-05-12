import { cn } from "@/lib/utils"

/**
 * Cabeçalho da secção: título + descrição introdutória.
 * Sem lógica de filtro ou seleção — apenas conteúdo estático passado por props.
 */
export function ProjectsHeader({ title, description, eyebrow }) {
  return (
    <header className="space-y-3">
      <div>
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
            {eyebrow}
          </p>
        ) : null}
        <h2
          id="heading-projetos"
          className={cn(
            "font-orbitron-italic text-3xl font-bold text-foreground",
            eyebrow && "mt-2",
          )}
        >
          {title}
        </h2>
      </div>
      {description ? (
        <p className="max-w-3xl text-muted-foreground">{description}</p>
      ) : null}
    </header>
  )
}

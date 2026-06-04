import { cn } from "@/lib/utils"
import SplitText from "@/components/split-text"

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
        <SplitText
          id="heading-projetos"
          className={cn(
            "font-orbitron-italic text-3xl font-bold text-foreground",
            eyebrow && "mt-2",
          )}
          text={title}
          tag="h2"
          delay={50}
          duration={1.25}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="left"
        />
      </div>
      {description ? (
        <p className="max-w-3xl text-muted-foreground">{description}</p>
      ) : null}
    </header>
  )
}

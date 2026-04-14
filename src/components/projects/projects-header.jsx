/**
 * Cabeçalho da secção: título + descrição introdutória.
 * Sem lógica de filtro ou seleção — apenas conteúdo estático passado por props.
 */
export function ProjectsHeader({ title, description }) {
  return (
    <header className="space-y-3">
      <h2 id="heading-camadas" className="text-3xl font-bold text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="max-w-3xl text-muted-foreground">{description}</p>
      ) : null}
    </header>
  )
}

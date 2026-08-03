const SECTION_LABELS = {
  "en-us": {
    whatIDo: "What I do with it",
    realWorld: "Real-world use",
    level: "Proficiency",
  },
  "pt-br": {
    whatIDo: "O que eu faço com isso",
    realWorld: "Aplicação real",
    level: "Nível de domínio",
  },
  "fr-fr": {
    whatIDo: "Ce que j’en fais",
    realWorld: "Usage concret",
    level: "Niveau de maîtrise",
  },
}

/**
 * @param {object} props
 * @param {import("@/lib/skill-showcase-items").ShowcaseSkill | null | undefined} props.skill
 * @param {"en-us" | "pt-br" | "fr-fr"} props.locale
 * @param {string} [props.className]
 * @param {"comfortable" | "compact"} [props.density]
 */
export function SkillShowcaseCard({ skill, locale, className = "", density = "comfortable" }) {
  const labels = SECTION_LABELS[locale] ?? SECTION_LABELS["en-us"]

  if (!skill) {
    return (
      <article
        className={`relative flex min-h-[200px] flex-col justify-center overflow-hidden rounded-[32px] border border-border bg-white/10 p-8 text-center text-sm text-muted-foreground shadow-sm shadow-black/20 ring-1 ring-black/5 backdrop-blur-[25px] dark:bg-black/10 dark:ring-white/5 ${className}`}
      >
        {locale === "pt-br"
          ? "Escolha uma habilidade para ver os detalhes."
          : locale === "fr-fr"
            ? "Choisissez une compétence pour voir les détails."
            : "Pick a skill to see details."}
      </article>
    )
  }

  const pad = density === "compact" ? "p-6 sm:p-7" : "p-8"
  const gapSection = density === "compact" ? "mt-4" : "mt-5"
  const listSpace = density === "compact" ? "mt-1.5 space-y-1" : "mt-2 space-y-1.5"

  return (
    <article
      className={`relative flex max-h-full min-h-0 w-full max-w-2xl flex-col overflow-hidden rounded-[32px] border border-border bg-white/10 text-left shadow-sm shadow-black/20 ring-1 ring-black/5 backdrop-blur-[25px] dark:bg-black/10 dark:ring-white/5 ${pad} ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-no-repeat opacity-[0.07]"
        style={{
          backgroundImage: `url('${skill.image}')`,
          backgroundSize: "min(55%, 220px)",
          backgroundPosition: "right 12% center",
        }}
        aria-hidden
      />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto pr-1">
        {skill.destaque?.[locale] ? (
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/90">
            {skill.destaque[locale]}
          </p>
        ) : null}
        <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{skill.label[locale]}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">{skill.description[locale]}</p>

        <div className={gapSection}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/90">
            {labels.whatIDo}
          </p>
          <ul className={`${listSpace} text-sm leading-snug text-foreground/95`}>
            {(skill.usos[locale] ?? []).map((item) => (
              <li key={item} className="flex gap-2 pl-0.5">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/70" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={gapSection}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/90">
            {labels.realWorld}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{skill.aplicacao[locale]}</p>
        </div>

        <div className={`${gapSection} mt-auto border-t border-border/60 pt-4`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/90">
            {labels.level}
          </p>
          <p className="mt-2 inline-flex rounded-full border border-border/80 bg-background/50 px-3 py-1 text-xs font-medium text-foreground/90">
            {skill.nivel[locale]}
          </p>
        </div>
      </div>
    </article>
  )
}

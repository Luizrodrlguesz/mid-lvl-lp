"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

/**
 * Painel de uma categoria: lista à esquerda, detalhe à direita.
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.subtitle
 * @param {import("@/lib/skill-showcase-items").ShowcaseSkill[]} props.skills
 * @param {"pt-br" | "en-us" | "fr-fr"} props.locale
 */
export function HorizontalGalleryCategoryPanel({ title, subtitle, skills, locale }) {
  const firstId = skills[0]?.id
  const [selectedId, setSelectedId] = useState(firstId)

  useEffect(() => {
    setSelectedId(firstId)
  }, [firstId])

  const selected = skills.find((s) => s.id === selectedId) ?? skills[0]
  if (!selected) {
    return (
      <article className="flex w-full max-w-5xl flex-col rounded-2xl border border-border bg-card/80 p-7 shadow-sm backdrop-blur-sm md:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">Nenhuma habilidade nesta categoria.</p>
      </article>
    )
  }

  const desc = selected.description[locale]
  const aplicacao = selected.aplicacao[locale]
  const usos = selected.usos[locale] ?? []
  const nivel = selected.nivel[locale]
  const name = selected.label[locale]

  return (
    <article className="flex min-h-[min(52vh,520px)] w-full max-w-5xl flex-col rounded-2xl border border-border bg-card/85 p-7 shadow-sm backdrop-blur-sm md:p-8">
      <header className="shrink-0 border-b border-border/60 pb-4 md:pb-5">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
      </header>

      <div className="grid min-h-0 flex-1 gap-5 pt-5 lg:grid-cols-[minmax(0,11.5rem)_minmax(0,1fr)] lg:gap-6">
        <nav className="flex flex-row flex-wrap gap-2 lg:flex-col lg:flex-nowrap lg:overflow-y-auto" aria-label="Habilidades da categoria">
          {skills.map((skill) => {
            const active = skill.id === selectedId
            return (
              <button
                key={skill.id}
                type="button"
                onClick={() => setSelectedId(skill.id)}
                className={cn(
                  "rounded-lg border px-2.5 py-2 text-left text-sm font-medium transition-colors",
                  active
                    ? "border-primary/50 bg-primary/10 text-foreground"
                    : "border-border/70 bg-background/40 text-muted-foreground hover:border-border hover:bg-muted/40 hover:text-foreground",
                )}
              >
                {skill.label[locale]}
              </button>
            )
          })}
        </nav>

        <div className="relative flex min-h-[220px] flex-col overflow-hidden rounded-xl border border-border/80 bg-background/50 shadow-inner sm:min-h-[260px] lg:min-h-[300px]">
          <div
            className="pointer-events-none absolute inset-0 bg-no-repeat opacity-[0.11]"
            style={{
              backgroundImage: `url('${selected.image}')`,
              backgroundSize: "min(40%, 168px)",
              backgroundPosition: "right 8% center",
            }}
            aria-hidden
          />
          <div className="relative z-10 flex h-full flex-col gap-4 p-5 sm:p-6">
            <h3 className="text-base font-semibold text-foreground sm:text-lg">{name}</h3>

            <div className="space-y-3 text-sm leading-relaxed">
              <section>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  O que é
                </p>
                <p className="mt-1.5 text-foreground/95">{desc}</p>
              </section>

              <section>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Como uso
                </p>
                <ul className="mt-2 space-y-1.5 text-foreground/95">
                  {usos.map((u) => (
                    <li key={u} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/70" aria-hidden />
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-muted-foreground">{aplicacao}</p>
              </section>

              <section className="mt-auto border-t border-border/60 pt-3">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Domínio
                </p>
                <p className="mt-2 inline-flex rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-medium text-foreground sm:text-sm">
                  {nivel}
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

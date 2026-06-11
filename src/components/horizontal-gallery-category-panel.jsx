"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

/**
 * Painel de uma categoria: lista à esquerda, detalhe à direita.
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.subtitle
 * @param {import("@/lib/skill-showcase-items").ShowcaseSkill[]} props.skills
 * @param {"pt-br" | "en-us" | "fr-fr"} props.locale
 * @param {import("lucide-react").LucideIcon} props.icon
 * @param {string} props.iconClassName
 */
export function HorizontalGalleryCategoryPanel({
  title,
  subtitle,
  skills,
  locale,
  icon: Icon,
  iconClassName,
}) {
  const cardRef = useRef(null)
  const firstId = skills[0]?.id
  const [selectedId, setSelectedId] = useState(firstId)
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    setSelectedId(firstId)
  }, [firstId])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasEntered(entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      },
    )

    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  const selected = skills.find((s) => s.id === selectedId) ?? skills[0]
  if (!selected) {
    return (
      <article
        ref={cardRef}
        className={cn(
          "flex w-full max-w-5xl flex-col overflow-hidden rounded-[32px] border border-transparent bg-foreground/5 p-7 shadow-none backdrop-blur-[25px] transition-[opacity,transform] duration-500 ease-out dark:border-border/60 md:p-8",
          hasEntered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        )}
      >
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {Icon ? <Icon className={cn("h-5 w-5", iconClassName)} aria-hidden /> : null}
          {title}
        </h2>
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
    <article
      ref={cardRef}
      className={cn(
        "flex min-h-[min(52vh,520px)] w-full max-w-5xl flex-col overflow-hidden rounded-[32px] border border-transparent bg-foreground/5 p-7 shadow-none backdrop-blur-[25px] transition-[opacity,transform] duration-500 ease-out dark:border-border/60 md:p-8",
        hasEntered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
    >
      <header
        className={cn(
          "shrink-0 border-b border-border/60 pb-4 transition-[opacity,transform] duration-500 ease-out md:pb-5",
          hasEntered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        )}
        style={{ transitionDelay: hasEntered ? "80ms" : "0ms" }}
      >
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {Icon ? <Icon className={cn("h-5 w-5", iconClassName)} aria-hidden /> : null}
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
      </header>

      <div className="grid min-h-0 flex-1 gap-5 pt-5 lg:grid-cols-[minmax(0,11.5rem)_minmax(0,1fr)] lg:gap-6">
        <nav
          className={cn(
            "flex flex-row flex-wrap gap-2 transition-[opacity,transform] duration-500 ease-out lg:flex-col lg:flex-nowrap lg:overflow-y-auto",
            hasEntered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
          )}
          style={{ transitionDelay: hasEntered ? "140ms" : "0ms" }}
          aria-label="Habilidades da categoria"
        >
          {skills.map((skill) => {
            const active = skill.id === selectedId
            return (
              <button
                key={skill.id}
                type="button"
                onClick={() => setSelectedId(skill.id)}
                className={cn(
                  "rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors",
                  active
                    ? "bg-slate-800/10 text-foreground dark:bg-primary/10"
                    : "bg-background/40 text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                )}
              >
                {skill.label[locale]}
              </button>
            )
          })}
        </nav>

        <div
          key={selected.id}
          className={cn(
            "relative flex min-h-[220px] flex-col overflow-hidden rounded-[24px] bg-slate-800/5 shadow-none backdrop-blur-[25px] transition-[opacity,transform] duration-500 ease-out dark:bg-foreground/5 sm:min-h-[260px] lg:min-h-[300px]",
            hasEntered
              ? "animate-in fade-in slide-in-from-bottom-2 translate-y-0 opacity-100 duration-300"
              : "translate-y-2 opacity-0",
          )}
          style={{ transitionDelay: hasEntered ? "190ms" : "0ms" }}
        >
          <div
            className="skill-card-bg-layer skill-card-bg-drift pointer-events-none absolute -right-[9%] h-[min(100%,505px)] w-[min(100%,440px)] max-w-[min(98vw,485px)] bg-contain bg-right bg-no-repeat opacity-[0.14] will-change-transform sm:h-[min(100%,530px)] sm:w-[min(96%,462px)] lg:-right-[6%] lg:h-[min(100%,550px)] lg:w-[min(92%,505px)]"
            style={{
              backgroundImage: `url('${selected.image}')`,
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
                <p className="mt-2 inline-flex rounded-full bg-slate-800/5 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-[25px] dark:bg-foreground/5 sm:text-sm">
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

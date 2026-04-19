"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo, type MouseEvent } from "react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Locale } from "./language-switcher"

const defaultSections = ["hero", "about", "skills", "projects", "contact"] as const

export const defaultSiteHeaderLabels: Record<
  Locale,
  Record<(typeof defaultSections)[number], string>
> = {
  "pt-br": {
    hero: "Início",
    about: "Sobre",
    skills: "Habilidades",
    projects: "Projetos",
    contact: "Contato",
  },
  "en-us": {
    hero: "Home",
    about: "About",
    skills: "Habilidades",
    projects: "Projects",
    contact: "Contact",
  },
  "fr-fr": {
    hero: "Accueil",
    about: "À propos",
    skills: "Compétences",
    projects: "Projets",
    contact: "Contact",
  },
}

export type SiteHeaderItem = {
  id: string
  label: string
}

type SiteHeaderProps = {
  locale: Locale
  items?: SiteHeaderItem[]
  activeId?: string
}

export function SiteHeader({ locale, items, activeId }: SiteHeaderProps) {
  const navItems = useMemo(
    () =>
      items ??
      defaultSections.map((id) => ({
        id,
        label: defaultSiteHeaderLabels[locale][id],
      })),
    [items, locale],
  )
  const currentActiveId = activeId ?? navItems[0]?.id ?? "hero"

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const offset = 80
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: "smooth" })
  }

  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b border-border/60 bg-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link
          href="#hero"
          className="flex items-center gap-2"
          onClick={(e) => scrollToSection(e, "hero")}
        >
          <Image src="/assets/lr-logo.png" alt="Luiz Rodrigues" width={45} height={28} priority />
          <span className="sr-only">Luiz Rodrigues</span>
        </Link>
        <nav className="hidden gap-2 rounded-full border border-border/60 bg-card/50 px-2 py-1 text-xs font-medium shadow-sm backdrop-blur lg:flex">
          {navItems.map(({ id, label }) => (
            <Button
              key={id}
              asChild
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-full px-3 text-xs transition-colors",
                currentActiveId === id
                  ? "bg-foreground text-background hover:bg-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Link href={`#${id}`} onClick={(e) => scrollToSection(e, id)}>
                {label}
              </Link>
            </Button>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}

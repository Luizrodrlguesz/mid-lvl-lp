"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo, type MouseEvent } from "react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useT } from "@/lib/i18n"

export const defaultSections = [
  "inicio",
  "sobre",
  "habilidades",
  "projetos",
  "contato",
] as const

export type SiteHeaderItem = {
  id: string
  label: string
}

type SiteHeaderProps = {
  items?: SiteHeaderItem[]
  activeId?: string
  onNavigateToSection?: (sectionId: string) => void
}

export function SiteHeader({
  items,
  activeId,
  onNavigateToSection,
}: SiteHeaderProps) {
  const t = useT()
  const navItems = useMemo(
    () =>
      items ?? defaultSections.map((id) => ({ id, label: t.nav[id] })),
    [items, t],
  )
  const currentActiveId = activeId ?? navItems[0]?.id ?? "inicio"

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    if (onNavigateToSection) {
      onNavigateToSection(id)
      return
    }
    const el = document.getElementById(id)
    if (!el) return
    const offset = 80
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: "smooth" })
  }

  return (
    <header className="absolute inset-x-0 top-0 z-30 ">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link
          href="#inicio"
          className="flex items-center gap-2"
          onClick={(e) => scrollToSection(e, "inicio")}
        >
          <Image src="/assets/lr-logo.png" alt="Luiz Rodrigues" width={45} height={28} priority />
          <span className="sr-only">Luiz Rodrigues</span>
        </Link>
        <nav className="hidden gap-2 rounded-full border border-border/60 bg-white/10 px-1 py-1 text-xs font-medium shadow-sm backdrop-blur-[25px] dark:bg-black/10 lg:flex">
          {navItems.map(({ id, label }) => (
            <Button
              key={id}
              asChild
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-full px-3 text-xs transition-colors",
                currentActiveId === id
                  ? "bg-slate-800 text-white hover:bg-slate-800 dark:bg-foreground dark:text-background dark:hover:bg-foreground"
                  : "text-white/80 hover:text-white dark:text-muted-foreground dark:hover:text-foreground",
              )}
            >
              <Link href={`#${id}`} onClick={(e) => scrollToSection(e, id)}>
                {label}
              </Link>
            </Button>
          ))}
        </nav>
        <ThemeToggle variant="hero" />
      </div>
    </header>
  )
}

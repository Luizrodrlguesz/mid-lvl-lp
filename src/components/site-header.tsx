"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo, type MouseEvent } from "react"
import { ThemeToggle } from "./theme-toggle"
import { PillTabs } from "@/components/pill-tabs"
import { useT } from "@/lib/i18n"
import { smoothScrollTo } from "@/lib/smooth-scroll"

export const defaultSections = [
  "inicio",
  "sobre",
  "habilidades",
  "projetos",
  "processo",
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

  const navigateTo = (id: string) => {
    if (onNavigateToSection) {
      onNavigateToSection(id)
      return
    }
    const el = document.getElementById(id)
    if (!el) return
    const offset = 80
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    smoothScrollTo(top)
  }

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    navigateTo(id)
  }

  return (
    <header className="absolute inset-x-0 top-0 z-30 ">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link
          href="#inicio"
          className="flex items-center gap-2"
          onClick={(e) => scrollToSection(e, "inicio")}
        >
          {/* A logo é branca: no light (fundo off-white) ela é invertida para preto. */}
          <Image
            src="/assets/lr-logo.png"
            alt="Luiz Rodrigues"
            width={45}
            height={28}
            priority
            className="invert dark:invert-0"
          />
          <span className="sr-only">Luiz Rodrigues</span>
        </Link>
        <div className="hidden lg:block">
          {/* Mesma pílula das abas dos projetos (e do menu flutuante). */}
          <PillTabs
            label={t.common.sectionsNav}
            idPrefix="site-nav"
            tabs={navItems.map(({ id, label }) => ({ id, label }))}
            value={currentActiveId}
            onChange={navigateTo}
          />
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}

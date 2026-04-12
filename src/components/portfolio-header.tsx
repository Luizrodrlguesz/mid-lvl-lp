"use client"

import Link from "next/link"
import { useEffect, useMemo, useState, type MouseEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ThemeToggle } from "./theme-toggle"
import {
  defaultSiteHeaderLabels,
  SiteHeader,
  type SiteHeaderItem,
} from "./site-header"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Locale } from "./language-switcher"

type PortfolioHeaderProps = {
  locale: Locale
  items?: SiteHeaderItem[]
  floatingThreshold?: number
}

export function PortfolioHeader({
  locale,
  items,
  floatingThreshold = 140,
}: PortfolioHeaderProps) {
  const navItems = useMemo(
    () =>
      items ??
      (["hero", "about", "skills", "projects", "contact"] as const).map((id) => ({
        id,
        label: defaultSiteHeaderLabels[locale][id],
      })),
    [items, locale],
  )
  const [activeId, setActiveId] = useState(navItems[0]?.id ?? "hero")
  const [showFloatingNav, setShowFloatingNav] = useState(false)

  useEffect(() => {
    const handler = () => {
      const offsets = navItems.map(({ id }) => {
        const el = document.getElementById(id)
        if (!el) return { id, top: Infinity }
        const rect = el.getBoundingClientRect()
        return { id, top: Math.abs(rect.top - 160) }
      })
      const closest = offsets.sort((a, b) => a.top - b.top)[0]
      if (closest) setActiveId(closest.id)
      setShowFloatingNav(window.scrollY > floatingThreshold)
    }

    handler()
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [floatingThreshold, navItems])

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const offset = 80
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: "smooth" })
  }

  return (
    <>
      <SiteHeader locale={locale} items={navItems} activeId={activeId} />

      <AnimatePresence>
        {showFloatingNav ? (
          <motion.div
            className="fixed top-4 right-4 z-40 hidden gap-2 lg:flex"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
          >
            <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-1 py-1 shadow-md backdrop-blur">
              <div className="flex items-center gap-1">
                {navItems.map(({ id, label }) => (
                  <Button
                    key={id}
                    asChild
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "rounded-full px-3 text-xs",
                      activeId === id
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Link href={`#${id}`} onClick={(e) => handleAnchorClick(e, id)}>
                      {label}
                    </Link>
                  </Button>
                ))}
              </div>
              <div className="h-6 w-px bg-border/70" />
              <ThemeToggle />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

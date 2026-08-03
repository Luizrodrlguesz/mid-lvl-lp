"use client"

import Link from "next/link"
import { useEffect, useMemo, useState, type MouseEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ThemeToggle } from "./theme-toggle"
import {
  defaultSections,
  SiteHeader,
  type SiteHeaderItem,
} from "./site-header"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useT } from "@/lib/i18n"

type PortfolioHeaderProps = {
  items?: SiteHeaderItem[]
  floatingThreshold?: number
  onNavigateToSection?: (sectionId: string) => void
}

export function PortfolioHeader({
  items,
  floatingThreshold = 140,
  onNavigateToSection,
}: PortfolioHeaderProps) {
  const t = useT()
  const navItems = useMemo(
    () => items ?? defaultSections.map((id) => ({ id, label: t.nav[id] })),
    [items, t],
  )
  const [activeId, setActiveId] = useState(navItems[0]?.id ?? "inicio")
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
    <>
      <SiteHeader
        items={navItems}
        activeId={activeId}
        onNavigateToSection={onNavigateToSection}
      />

      <AnimatePresence>
        {showFloatingNav ? (
          <motion.div
            className="fixed top-4 right-4 z-40 hidden gap-2 lg:flex"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
          >
            <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-border/60 bg-white/10 px-1 py-1 shadow-md backdrop-blur-[25px] dark:bg-black/10">
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
                        ? "bg-slate-800 text-white dark:bg-foreground dark:text-background"
                        : "text-slate-800/80 hover:text-slate-800 dark:text-muted-foreground dark:hover:text-foreground",
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

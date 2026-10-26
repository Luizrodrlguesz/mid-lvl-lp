"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ThemeToggle } from "./theme-toggle"
import {
  defaultSections,
  SiteHeader,
  type SiteHeaderItem,
} from "./site-header"
import { PillTabs } from "@/components/pill-tabs"
import { useT } from "@/lib/i18n"
import { smoothScrollTo } from "@/lib/smooth-scroll"

type PortfolioHeaderProps = {
  items?: SiteHeaderItem[]
  floatingThreshold?: number
  onNavigateToSection?: (sectionId: string) => void
}

/** Tempo máximo que a seção clicada segura o destaque enquanto a página rola. */
const NAV_LOCK_MS = 1200

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
  // Durante a rolagem disparada por um clique, o scroll não mexe no item ativo —
  // senão o thumb do segmento passaria por todas as seções do caminho.
  const navLock = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handler = () => {
      setShowFloatingNav(window.scrollY > floatingThreshold)
      if (navLock.current) return
      // Ativa é a última seção cujo topo já passou da linha de leitura (160px).
      // "A mais próxima da linha" falhava com seções altas (como o About):
      // no fim dela, o topo da seguinte ficava mais perto e era marcado antes da hora.
      let current = navItems[0]?.id
      for (const { id } of navItems) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 160) current = id
      }
      // No fim da página, a última seção (o footer de contato) nunca sobe até a linha.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) current = navItems[navItems.length - 1]?.id ?? current
      if (current) setActiveId(current)
    }

    const unlock = () => {
      if (!navLock.current) return
      clearTimeout(navLock.current)
      navLock.current = null
      handler()
    }

    // No máximo um cálculo por quadro: o scroll dispara bem mais eventos que isso,
    // e cada um mede todas as seções.
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        handler()
      })
    }

    handler()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("scrollend", unlock)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("scrollend", unlock)
    }
  }, [floatingThreshold, navItems])

  useEffect(() => () => {
    if (navLock.current) clearTimeout(navLock.current)
  }, [])

  const navigate = useCallback(
    (id: string) => {
      setActiveId(id)
      if (navLock.current) clearTimeout(navLock.current)
      navLock.current = setTimeout(() => {
        navLock.current = null
      }, NAV_LOCK_MS)

      if (onNavigateToSection) {
        onNavigateToSection(id)
        return
      }
      const el = document.getElementById(id)
      if (!el) return
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      smoothScrollTo(top)
    },
    [onNavigateToSection],
  )

  const tabs = navItems.map(({ id, label }) => ({ id, label }))

  return (
    <>
      <SiteHeader
        items={navItems}
        activeId={activeId}
        onNavigateToSection={navigate}
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
            {/* Mesma pílula das abas dos projetos; o contêiner leva a borda e o vidro. */}
            <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-foreground/10 bg-background/40 p-1 shadow-md backdrop-blur-md">
              <PillTabs
                className="rounded-none border-0 bg-transparent p-0 backdrop-blur-none"
                label={t.common.sectionsNav}
                idPrefix="floating-nav"
                tabs={tabs}
                value={activeId}
                onChange={navigate}
              />
              <div className="mx-1 h-6 w-px bg-foreground/10" />
              <ThemeToggle />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

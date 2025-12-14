 "use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Locale } from "./language-switcher"

const sections = ["hero", "about", "skills", "projects", "contact"] as const

const labels: Record<Locale, Record<(typeof sections)[number], string>> = {
  "pt-br": {
    hero: "Início",
    about: "Sobre",
    skills: "Skills",
    projects: "Projetos",
    contact: "Contato",
  },
  "en-us": {
    hero: "Home",
    about: "About",
    skills: "Skills",
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

export function SiteHeader({ locale }: { locale: Locale }) {
   const [active, setActive] = useState("hero")

   useEffect(() => {
     const handler = () => {
       const offsets = sections.map(({ id }) => {
         const el = document.getElementById(id)
         if (!el) return { id, top: Infinity }
         const rect = el.getBoundingClientRect()
         return { id, top: Math.abs(rect.top - 160) }
       })
       const closest = offsets.sort((a, b) => a.top - b.top)[0]
       if (closest) setActive(closest.id)
     }
     handler()
     window.addEventListener("scroll", handler, { passive: true })
     return () => window.removeEventListener("scroll", handler)
   }, [])

   return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur">
       <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="#hero" className="text-sm font-semibold tracking-tight">
          Luiz Rodrigues
         </Link>
         <nav className="hidden gap-2 rounded-full border border-border/60 bg-card/50 px-2 py-1 text-xs font-medium shadow-sm backdrop-blur lg:flex">
          {sections.map((id) => (
             <Button
              key={id}
               asChild
               variant="ghost"
               size="sm"
               className={cn(
                 "rounded-full px-3 text-xs transition-colors",
                 active === id
                   ? "bg-foreground text-background hover:bg-foreground"
                   : "text-muted-foreground hover:text-foreground",
               )}
             >
              <Link href={`#${id}`}>{labels[locale][id]}</Link>
             </Button>
           ))}
         </nav>
         <ThemeToggle />
       </div>
     </header>
   )
 }


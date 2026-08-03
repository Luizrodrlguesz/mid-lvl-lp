"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Languages } from "lucide-react"
import { LOCALES, useLocale, useT, type Locale } from "@/lib/i18n"

export type { Locale }

const labels: Record<Locale, string> = {
  "en-us": "EN-US",
  "pt-br": "PT-BR",
  "fr-fr": "FR-FR",
}

/** Bandeiras usadas como fundo de cada opção — EUA, Brasil, França. */
const flags: Record<Locale, string> = {
  "en-us": "/assets/us-flag.png",
  "pt-br": "/assets/br-flag.png",
  "fr-fr": "/assets/fr-flag.png",
}

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()
  const t = useT()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className="group flex items-center gap-2 whitespace-nowrap rounded-full border-border/70 bg-white/10 px-3 text-xs font-semibold shadow-sm shadow-black/20 ring-1 ring-black/5 backdrop-blur-[25px] dark:bg-black/10 dark:ring-white/5"
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        aria-label={t.common.languageMenu}
      >
        <Languages className="h-4 w-4 text-muted-foreground transition-transform group-hover:scale-105" />
        {labels[locale]}
      </Button>
      {open ? (
        <div className="absolute bottom-11 right-0 z-20 flex min-w-max flex-col gap-1 rounded-2xl border border-border/70 bg-white/10 p-2 shadow-lg shadow-black/20 ring-1 ring-black/5 backdrop-blur-[25px] dark:bg-black/10 dark:ring-white/5">
          {LOCALES.map((option) => {
            const active = locale === option
            return (
              <button
                key={option}
                onClick={() => {
                  setLocale(option)
                  setOpen(false)
                }}
                className={cn(
                  "relative isolate flex items-center justify-center overflow-hidden whitespace-nowrap rounded-xl px-3 py-2 text-xs font-semibold transition-colors",
                  active
                    ? "bg-white text-slate-900 [text-shadow:0_0_6px_rgba(255,255,255,0.95),0_0_2px_rgba(255,255,255,1)]"
                    : "text-foreground hover:bg-muted",
                )}
              >
                <Image
                  src={flags[option]}
                  alt=""
                  fill
                  sizes="120px"
                  aria-hidden
                  className={cn(
                    "pointer-events-none -z-10 object-cover transition-opacity duration-200",
                    active ? "opacity-50" : "opacity-20",
                  )}
                />
                {labels[option]}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

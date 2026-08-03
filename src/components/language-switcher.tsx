"use client"

import { useState } from "react"
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

/** Bandeiras (emoji) alinhadas ao locale — EUA, Brasil, França. */
const flags: Record<Locale, string> = {
  "en-us": "🇺🇸",
  "pt-br": "🇧🇷",
  "fr-fr": "🇫🇷",
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
          {LOCALES.map((option) => (
            <button
              key={option}
              onClick={() => {
                setLocale(option)
                setOpen(false)
              }}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-semibold transition-colors",
                locale === option
                  ? "bg-foreground text-background"
                  : "text-foreground hover:bg-muted",
              )}
            >
              <span className="text-base leading-none" aria-hidden>
                {flags[option]}
              </span>
              {labels[option]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

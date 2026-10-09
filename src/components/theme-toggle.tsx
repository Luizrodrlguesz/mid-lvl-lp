"use client"

// Botão e transição de tema adaptados do Skiper 26 (Skiper UI, @gurvinder-singh02),
// inspirado em github.com/rudrodip/theme-toggle-effect. O anel segue as cores monocromáticas da nav
// e o círculo da transição tem a borda em degradê (ver `::view-transition-new` no globals.css).

import { useRef } from "react"
import { flushSync } from "react-dom"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useT } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const ROTATE_TRANSITION = { ease: "easeInOut", duration: 0.5 } as const

type ThemeToggleProps = {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const t = useT()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const isDark = (theme ?? resolvedTheme ?? "dark") === "dark"
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleTheme = () => {
    const next = isDark ? "light" : "dark"
    const root = document.documentElement

    // O círculo da transição nasce no centro do botão.
    const rect = buttonRef.current?.getBoundingClientRect()
    if (rect) {
      root.style.setProperty("--theme-reveal-x", `${rect.left + rect.width / 2}px`)
      root.style.setProperty("--theme-reveal-y", `${rect.top + rect.height / 2}px`)
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!document.startViewTransition || reduceMotion) {
      setTheme(next)
      return
    }

    document.startViewTransition(() => {
      flushSync(() => setTheme(next))
    })
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      aria-label={t.common.toggleTheme}
      aria-pressed={isDark}
      className={cn(
        // Monocromático, nas mesmas cores do item ativo da nav.
        "size-9 shrink-0 cursor-pointer rounded-full bg-slate-800 p-0 text-white shadow-sm transition-transform duration-300 active:scale-95 dark:bg-foreground dark:text-background",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60",
        className,
      )}
    >
      <svg viewBox="0 0 240 240" fill="none" aria-hidden>
        <motion.g
          style={{ transformOrigin: "120px 120px" }}
          animate={{ rotate: isDark ? -180 : 0 }}
          transition={ROTATE_TRANSITION}
        >
          <path
            d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5"
            fill="currentColor"
          />
          <path
            d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5"
            className="fill-slate-800 dark:fill-foreground"
          />
        </motion.g>
        <motion.path
          style={{ transformOrigin: "120px 120px" }}
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={ROTATE_TRANSITION}
          d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
          fill="currentColor"
        />
      </svg>
    </button>
  )
}

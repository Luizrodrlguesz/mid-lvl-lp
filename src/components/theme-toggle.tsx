"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { useT } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type ThemeToggleProps = {
  variant?: "default" | "hero"
}

export function ThemeToggle({ variant = "default" }: ThemeToggleProps) {
  const t = useT()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const isDark = (theme ?? resolvedTheme ?? "dark") === "dark"
  const isHero = variant === "hero"

  return (
    <div className="flex items-center gap-2 rounded-full border border-border/70 bg-slate-800/10 px-3 py-2 shadow-sm backdrop-blur-[25px] dark:bg-black/10">
      <Sun
        className={cn("h-4 w-4 dark:text-muted-foreground", isHero ? "text-white" : "text-slate-800")}
        aria-hidden
      />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        className="relative h-6 w-12 rounded-full border border-border/60 bg-muted data-[state=checked]:bg-foreground"
        thumbClassName={cn(
          "h-5 w-5 translate-x-0.5 data-[state=checked]:translate-x-[22px] transition-transform",
          isHero && "bg-slate-800",
        )}
        aria-label={t.common.toggleTheme}
      />
      <Moon
        className={cn("h-4 w-4 dark:text-muted-foreground", isHero ? "text-white" : "text-slate-800")}
        aria-hidden
      />
    </div>
  )
}

 "use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"

 export function ThemeToggle() {
   const { theme, setTheme, resolvedTheme } = useTheme()
  const isDark = (theme ?? resolvedTheme ?? "dark") === "dark"

   return (
     <div className="flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-2 shadow-sm backdrop-blur">
       <Sun className="h-4 w-4 text-muted-foreground" aria-hidden />
       <Switch
         checked={isDark}
         onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        className="relative h-6 w-12 rounded-full border border-border/60 bg-muted data-[state=checked]:bg-foreground"
        thumbClassName="h-5 w-5 translate-x-0.5 data-[state=checked]:translate-x-[22px] transition-transform"
         aria-label="Alternar tema"
       />
       <Moon className="h-4 w-4 text-muted-foreground" aria-hidden />
     </div>
   )
 }


 "use client"

 import { useState } from "react"
 import { Button } from "@/components/ui/button"
 import { cn } from "@/lib/utils"
 import { Languages } from "lucide-react"

 export type Locale = "pt-br" | "en-us" | "fr-fr"

 interface LanguageSwitcherProps {
   value: Locale
   onChange: (locale: Locale) => void
 }

 const labels: Record<Locale, string> = {
   "pt-br": "PT-BR",
   "en-us": "EN-US",
   "fr-fr": "FR-FR",
 }

 /** Bandeiras (emoji) alinhadas ao locale — Brasil, EUA, França. */
 const flags: Record<Locale, string> = {
   "pt-br": "🇧🇷",
   "en-us": "🇺🇸",
   "fr-fr": "🇫🇷",
 }

 export function LanguageSwitcher({ value, onChange }: LanguageSwitcherProps) {
   const [open, setOpen] = useState(false)

   return (
     <div className="relative">
       <Button
         variant="outline"
         size="sm"
         className="group flex items-center gap-2 whitespace-nowrap rounded-full border-border/70 bg-black/10 px-3 text-xs font-semibold shadow-sm backdrop-blur-[25px]"
         onClick={() => setOpen((s) => !s)}
       >
         <Languages className="h-4 w-4 text-muted-foreground transition-transform group-hover:scale-105" />
         {labels[value]}
       </Button>
       {open ? (
         <div className="absolute bottom-11 right-0 z-20 flex min-w-max flex-col gap-1 rounded-2xl border border-border/70 bg-black/10 p-2 shadow-lg backdrop-blur-[25px]">
           {(Object.keys(labels) as Locale[]).map((locale) => (
             <button
               key={locale}
               onClick={() => {
                 onChange(locale)
                 setOpen(false)
               }}
               className={cn(
                 "flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-semibold transition-colors",
                 value === locale
                   ? "bg-foreground text-background"
                   : "text-foreground hover:bg-muted",
               )}
             >
               <span className="text-base leading-none" aria-hidden>
                 {flags[locale]}
               </span>
               {labels[locale]}
             </button>
           ))}
         </div>
       ) : null}
     </div>
   )
 }


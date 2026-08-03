 "use client"

 import { useEffect, useState } from "react"
 import { ArrowUp } from "lucide-react"
 import { Button } from "@/components/ui/button"
 import { useT } from "@/lib/i18n"

 export function BackToTop() {
   const t = useT()
   const [visible, setVisible] = useState(false)

   useEffect(() => {
     const handler = () => {
       setVisible(window.scrollY > 320)
     }
     handler()
     window.addEventListener("scroll", handler, { passive: true })
     return () => window.removeEventListener("scroll", handler)
   }, [])

   if (!visible) return null

   return (
     <Button
       size="icon"
       variant="secondary"
       className="h-11 w-11 rounded-full border border-border/60 bg-white/10 shadow-lg shadow-black/20 ring-1 ring-black/5 backdrop-blur-[25px] transition hover:-translate-y-1 dark:bg-black/10 dark:ring-white/5"
       onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
       aria-label={t.common.backToTop}
     >
       <ArrowUp className="h-5 w-5" />
     </Button>
   )
 }


 "use client"

 import { useEffect, useState } from "react"
 import { ArrowUp } from "lucide-react"
 import { Button } from "@/components/ui/button"

 export function BackToTop() {
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
       className="h-11 w-11 rounded-full border border-border/60 bg-card/90 shadow-lg backdrop-blur transition hover:-translate-y-1"
       onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
       aria-label="Voltar ao topo"
     >
       <ArrowUp className="h-5 w-5" />
     </Button>
   )
 }


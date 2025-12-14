 "use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

 export function CursorGlow() {
   const [position, setPosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

   useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    if (typeof window === "undefined") return
     const handleMove = (e: MouseEvent) => {
       setPosition({ x: e.clientX, y: e.clientY })
     }
     window.addEventListener("mousemove", handleMove, { passive: true })
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener("mousemove", handleMove)
    }
  }, [])

  if (!mounted) return null

   return (
     <motion.div
       aria-hidden
       className="pointer-events-none fixed inset-0 z-10"
       style={{ mixBlendMode: "screen" }}
     >
       <motion.div
         className="h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25),rgba(0,0,0,0))]"
         animate={{ x: position.x - 128, y: position.y - 128 }}
         transition={{ type: "spring", damping: 40, stiffness: 240, mass: 0.8 }}
       />
     </motion.div>
   )
 }


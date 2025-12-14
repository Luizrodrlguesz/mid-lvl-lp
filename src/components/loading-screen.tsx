 "use client"

 import { motion, AnimatePresence } from "framer-motion"
 import { Loader2 } from "lucide-react"
 import { useTheme } from "next-themes"

 interface LoadingScreenProps {
   show: boolean
 }

 export function LoadingScreen({ show }: LoadingScreenProps) {
   const { resolvedTheme } = useTheme()

   return (
     <AnimatePresence>
       {show ? (
         <motion.div
           className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur"
           initial={{ opacity: 1 }}
           exit={{ opacity: 0, transition: { duration: 0.35 } }}
         >
           <motion.div
             className="flex items-center gap-3 rounded-full border border-border/80 bg-card px-5 py-3 shadow-lg"
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 0.4, ease: "easeOut" }}
           >
             <Loader2
               className="h-6 w-6 animate-spin"
               aria-hidden
               strokeWidth={2.5}
             />
             <span className="text-sm font-medium">
               {resolvedTheme === "dark"
                 ? "Carregando o portfólio..."
                 : "Loading portfolio..."}
             </span>
           </motion.div>
         </motion.div>
       ) : null}
     </AnimatePresence>
   )
 }


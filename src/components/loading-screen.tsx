"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  show: boolean
}

export function LoadingScreen({ show }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-transparent"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative h-28 w-28"
          >
            <Image
              src="/assets/thumb/astro-2.png"
              alt="Logo"
              fill
              priority
              sizes="112px"
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}


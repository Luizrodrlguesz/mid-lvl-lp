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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative flex h-32 w-32 items-center justify-center"
          >
            <motion.div
              className="relative h-28 w-28"
              animate={{
                x: [-34, 34],
                rotate: [-1.5, 1.5],
              }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
            >
              <Image
                src="/assets/avatar/pxl-loading.png"
                alt=""
                fill
                priority
                sizes="112px"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

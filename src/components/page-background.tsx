"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { ParticleField } from "@/components/particle-field"
import { CloudShader } from "@/components/ui/cloud-shader"

/**
 * Fundo fixo da página: partículas no dark, céu com nuvens no light.
 * Só um dos dois é montado por vez, então só existe um contexto WebGL.
 *
 * O céu do light é o CloudShader (Aceternity): no benchmark (M1, mesma
 * resolução) ele custou ~3x menos por quadro que o CloudSky do index.
 */
export function PageBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  if (!mounted) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {resolvedTheme === "dark" ? (
        <ParticleField />
      ) : (
        <CloudShader className="h-full min-h-0" speed={0.5} resolution={0.5} maxFps={30} />
      )}
    </div>
  )
}

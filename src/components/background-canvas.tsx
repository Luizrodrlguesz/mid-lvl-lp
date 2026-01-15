 "use client"

 import { Canvas, useFrame } from "@react-three/fiber"
 import { PointMaterial, Points } from "@react-three/drei"
import { useEffect, useMemo, useRef, useState } from "react"
 import * as THREE from "three"

 interface BackgroundCanvasProps {
   scrollProgress: number
 }

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

 function Stars({ scrollProgress }: BackgroundCanvasProps) {
   const ref = useRef<THREE.Points>(null)

   const positions = useMemo(() => {
     const points = new Float32Array(5000 * 3)
     for (let i = 0; i < 5000; i++) {
       const i3 = i * 3
      points[i3] = (pseudoRandom(i * 0.37) - 0.5) * 12
      points[i3 + 1] = (pseudoRandom(i * 1.13) - 0.5) * 12
      points[i3 + 2] = (pseudoRandom(i * 2.77) - 0.5) * 12
     }
     return points
   }, [])

  const starTexture = useMemo(() => {
    const size = 64
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size

    const context = canvas.getContext("2d")
    if (!context) return null

    const gradient = context.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    )
    gradient.addColorStop(0, "rgba(255,255,255,0.95)")
    gradient.addColorStop(0.45, "rgba(255,255,255,0.45)")
    gradient.addColorStop(1, "rgba(255,255,255,0)")

    context.fillStyle = gradient
    context.fillRect(0, 0, size, size)

    const texture = new THREE.Texture(canvas)
    texture.needsUpdate = true
    texture.minFilter = THREE.LinearFilter

    return texture
  }, [])

   useFrame((state) => {
     const t = state.clock.getElapsedTime()
     if (ref.current) {
       ref.current.rotation.x = scrollProgress * 1.2 + t * 0.02
       ref.current.rotation.y = scrollProgress * 0.9 + t * 0.015
     }
   })

   return (
     <Points ref={ref} positions={positions} stride={3}>
       <PointMaterial
         transparent
        size={0.05}
        color="#e7efff"
        map={starTexture ?? undefined}
        alphaMap={starTexture ?? undefined}
        blending={THREE.AdditiveBlending}
         sizeAttenuation
         depthWrite={false}
        opacity={0.8}
        toneMapped={false}
       />
     </Points>
   )
 }

 export function BackgroundCanvas({ scrollProgress }: BackgroundCanvasProps) {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const updateTheme = () => setIsDark(document.documentElement.classList.contains("dark"))
    updateTheme()
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  if (!mounted) return null

  const lightBase = "#818199"
  const lightOverlay =
    "radial-gradient(circle at 20% 20%, rgba(140,170,210,0.20), transparent 45%), radial-gradient(circle at 80% 10%, rgba(150,180,220,0.12), transparent 35%), radial-gradient(circle at 50% 80%, rgba(130,160,200,0.16), transparent 42%)"
  const darkOverlay =
    "radial-gradient(circle at 20% 20%, rgba(49, 225, 142, 0.1), transparent 45%), radial-gradient(circle at 80% 10%, rgba(241, 84, 215, 0.07), transparent 35%), radial-gradient(circle at 50% 80%, rgba(39, 152, 238, 0.12), transparent 40%)"

   return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundColor: isDark ? "transparent" : lightBase,
        backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.06), transparent 65%)",
      }}
    >
       <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
         <Stars scrollProgress={scrollProgress} />
       </Canvas>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: isDark ? darkOverlay : lightOverlay,
        }}
      />
     </div>
   )
 }


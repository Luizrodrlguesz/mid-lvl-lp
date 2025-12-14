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
         size={0.04}
         color="#ffffff"
         sizeAttenuation
         depthWrite={false}
         opacity={0.3}
       />
     </Points>
   )
 }

 export function BackgroundCanvas({ scrollProgress }: BackgroundCanvasProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  if (!mounted) return null

   return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_65%)]">
       <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
         <Stars scrollProgress={scrollProgress} />
       </Canvas>
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.04),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.06),transparent_40%)]" />
     </div>
   )
 }


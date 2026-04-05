"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AuroraCanvasProps {
  /** Array of colors for the gradient stops */
  colorStops?: string[]
  /** Amplitude of the wave movement (0-1) */
  amplitude?: number
  /** Blend intensity (0-1) */
  blend?: number
  /** Animation speed */
  speed?: number
  /** CSS class for container */
  className?: string
}

/**
 * AuroraCanvas
 * 
 * Recria o efeito Aurora do React Bits usando Canvas API.
 * Gera ondas fluidas animadas com gradientes dinâmicos.
 * 
 * Inspirado na API:
 * <Aurora
 *   colorStops={["#5227FF", "#7cff67", "#5227FF"]}
 *   amplitude={0.4}
 *   blend={1}
 * />
 */
export function AuroraCanvas({
  colorStops = ["#5227FF", "#7cff67", "#5227FF"],
  amplitude = 0.4,
  blend = 1,
  speed = 1,
  className,
}: AuroraCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Handle resize
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener("resize", resize)

    // Animation loop
    const animate = () => {
      timeRef.current += 0.01 * speed
      const time = timeRef.current
      const width = window.innerWidth
      const height = window.innerHeight

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Create multiple wave layers
      const layers = colorStops.length
      
      for (let i = 0; i < layers; i++) {
        const color = colorStops[i]
        const offset = (i / layers) * Math.PI * 2
        
        // Create gradient for this layer
        const gradient = ctx.createRadialGradient(
          width * (0.3 + 0.4 * Math.sin(time * 0.5 + offset)),
          height * (0.3 + 0.4 * Math.cos(time * 0.3 + offset)),
          0,
          width * 0.5,
          height * 0.5,
          width * 0.8
        )
        
        gradient.addColorStop(0, color + Math.floor(blend * 60 + 40).toString(16).padStart(2, "0"))
        gradient.addColorStop(0.5, color + Math.floor(blend * 30).toString(16).padStart(2, "0"))
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.globalCompositeOperation = "screen"

        // Draw animated wave shape
        ctx.beginPath()
        
        const points = 20
        for (let x = 0; x <= points; x++) {
          const xPos = (x / points) * width
          const wave1 = Math.sin(x * 0.5 + time + offset) * amplitude * 100
          const wave2 = Math.cos(x * 0.3 + time * 1.2 + offset) * amplitude * 80
          const wave3 = Math.sin(x * 0.8 + time * 0.7 + offset) * amplitude * 60
          
          const yPos = height * 0.5 + wave1 + wave2 + wave3
          
          if (x === 0) {
            ctx.moveTo(xPos, yPos)
          } else {
            // Smooth curve
            const prevX = ((x - 1) / points) * width
            const cpX = (prevX + xPos) / 2
            ctx.quadraticCurveTo(prevX, yPos, xPos, yPos)
          }
        }
        
        // Close the shape
        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()
        ctx.fill()
      }

      // Add secondary flowing gradients
      for (let i = 0; i < 3; i++) {
        const t = time * (0.5 + i * 0.2)
        const x = width * (0.2 + 0.6 * Math.sin(t + i * 2))
        const y = height * (0.2 + 0.6 * Math.cos(t * 0.7 + i * 1.5))
        const r = Math.min(width, height) * (0.3 + amplitude * 0.4)
        
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
        const color = colorStops[i % colorStops.length]
        
        grad.addColorStop(0, color + "40")
        grad.addColorStop(0.5, color + "20")
        grad.addColorStop(1, "transparent")
        
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [colorStops, amplitude, blend, speed])

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed inset-0 pointer-events-none", className)}
      style={{
        willChange: "transform",
      }}
    />
  )
}

/**
 * CSS-only version as fallback
 * Less performant but no JS animation loop
 */
interface AuroraCSSProps {
  colorStops?: string[]
  amplitude?: number
  blend?: number
  speed?: number
  className?: string
}

export function AuroraCSS({
  colorStops = ["#5227FF", "#7cff67", "#5227FF"],
  amplitude = 0.4,
  blend = 1,
  speed = 1,
  className,
}: AuroraCSSProps) {
  // Generate CSS variables for colors
  const cssVars = {
    "--aurora-1": colorStops[0] || "#5227FF",
    "--aurora-2": colorStops[1] || "#7cff67",
    "--aurora-3": colorStops[2] || colorStops[0] || "#5227FF",
    "--aurora-speed": `${20 / speed}s`,
    "--aurora-blend": blend,
    "--aurora-amplitude": amplitude,
  } as React.CSSProperties

  return (
    <div
      className={cn("fixed inset-0 overflow-hidden pointer-events-none", className)}
      style={cssVars}
    >
      {/* Base */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Layer 1 */}
      <div
        className="absolute -inset-[50%] blur-3xl mix-blend-screen opacity-60"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 30% 40%, var(--aurora-1), transparent 55%)`,
          animation: `aurora-flow-1 var(--aurora-speed) ease-in-out infinite`,
          transform: `scale(${1 + amplitude * 0.5})`,
        }}
      />
      
      {/* Layer 2 */}
      <div
        className="absolute -inset-[50%] blur-3xl mix-blend-screen opacity-50"
        style={{
          background: `radial-gradient(ellipse 70% 70% at 70% 30%, var(--aurora-2), transparent 50%)`,
          animation: `aurora-flow-2 calc(var(--aurora-speed) * 1.3) ease-in-out infinite`,
          transform: `scale(${1 + amplitude * 0.3})`,
        }}
      />
      
      {/* Layer 3 */}
      <div
        className="absolute -inset-[50%] blur-3xl mix-blend-screen opacity-40"
        style={{
          background: `radial-gradient(ellipse 60% 80% at 50% 70%, var(--aurora-3), transparent 55%)`,
          animation: `aurora-flow-3 calc(var(--aurora-speed) * 0.8) ease-in-out infinite`,
          transform: `scale(${1 + amplitude * 0.4})`,
        }}
      />

      {/* Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 20%, hsl(var(--background)) 70%)`,
          opacity: 1 - blend * 0.3,
        }}
      />

      <style jsx global>{`
        @keyframes aurora-flow-1 {
          0%, 100% { 
            transform: translate3d(-5%, -5%, 0) scale(1.2) rotate(0deg); 
          }
          25% { 
            transform: translate3d(5%, 5%, 0) scale(1.3) rotate(5deg); 
          }
          50% { 
            transform: translate3d(10%, -5%, 0) scale(1.1) rotate(-3deg); 
          }
          75% { 
            transform: translate3d(-5%, 10%, 0) scale(1.25) rotate(2deg); 
          }
        }
        
        @keyframes aurora-flow-2 {
          0%, 100% { 
            transform: translate3d(5%, 10%, 0) scale(1.1) rotate(0deg); 
          }
          33% { 
            transform: translate3d(-10%, -5%, 0) scale(1.2) rotate(-5deg); 
          }
          66% { 
            transform: translate3d(5%, -10%, 0) scale(1.15) rotate(3deg); 
          }
        }
        
        @keyframes aurora-flow-3 {
          0%, 100% { 
            transform: translate3d(0, 0, 0) scale(1.3) rotate(0deg); 
            opacity: 0.4;
          }
          50% { 
            transform: translate3d(-8%, 8%, 0) scale(1.1) rotate(8deg); 
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  )
}

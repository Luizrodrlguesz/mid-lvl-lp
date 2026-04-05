"use client"

import { motion } from "framer-motion"
import { ArrowDown, Sparkles, Zap, Layers } from "lucide-react"
import { AuroraBackground, auroraPresets } from "@/components/aurora-background"
import {
  ScrollZoomHero,
  GrainOverlay,
  DepthLayer,
} from "@/components/scroll-zoom-hero"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

/**
 * Hero Demo Page
 *
 * Demonstrates the ScrollZoomHero and AuroraBackground components
 * with all premium enhancements (parallax layers, grain texture, depth effects).
 */
export default function HeroDemoPage() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* 
        SECTION 1: Scroll Zoom Hero with Aurora Background
        This creates the immersive scroll-zoom effect with animated aurora gradients
      */}
      <AuroraBackground
        className="relative"
        colors={auroraPresets.default}
        glowIntensity={0.35}
        animationSpeed={0.8}
        blurAmount="blur-3xl"
      >
        <ScrollZoomHero
          maxScale={1.5}
          minScale={1}
          zoomRange={1.2}
          fadeOnExit={true}
          springConfig={{ stiffness: 100, damping: 30, mass: 1 }}
          scrollContainerHeight={2}
        >
          {/* Hero Content with Depth Layers */}
          <div className="relative flex h-full w-full flex-col items-center justify-center px-4 text-center">
            {/* 
              Depth Layer: Far background elements (slowest parallax, most blur)
              These create the feeling of distant ambient light
            */}
            <DepthLayer depth={-2} className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl" />
            </DepthLayer>

            {/* 
              Depth Layer: Mid background elements
              Floating orbs with slight parallax
            */}
            <DepthLayer depth={-1} className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-1/3 right-1/3 w-4 h-4 rounded-full bg-pink-400/60"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-1/3 left-1/3 w-6 h-6 rounded-full bg-emerald-400/40"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <motion.div
                className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-blue-400/50"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
            </DepthLayer>

            {/* 
              Main Content - No depth effect (stays sharp and centered)
            */}
            <div className="relative z-10 max-w-4xl mx-auto space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge
                  variant="outline"
                  className="px-4 py-2 text-sm font-medium rounded-full border-primary/20 bg-background/50 backdrop-blur-sm"
                >
                  <Sparkles className="w-4 h-4 mr-2 text-violet-500" />
                  Scroll-Zoom Animation Demo
                </Badge>
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="block text-foreground">Scroll to</span>
                <span className="block mt-2 bg-gradient-to-r from-violet-500 via-blue-500 to-pink-500 bg-clip-text text-transparent">
                  Experience
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                A demonstration of scroll-driven zoom effects combined with
                fluid aurora gradients. Built with Motion and pure CSS.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Button size="lg" className="rounded-full px-8" asChild>
                  <Link href="/">
                    <Zap className="w-4 h-4 mr-2" />
                    Back to Portfolio
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8"
                  onClick={() => {
                    window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
                  }}
                >
                  <Layers className="w-4 h-4 mr-2" />
                  See Features
                </Button>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span className="text-xs text-muted-foreground uppercase tracking-widest">
                Scroll to zoom
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </motion.div>
          </div>

          {/* Grain overlay for texture */}
          <GrainOverlay opacity={0.025} scale={1.5} animationSpeed={0.3} />
        </ScrollZoomHero>
      </AuroraBackground>

      {/* 
        SECTION 2: Feature Showcase
        Demonstrates the AuroraBackground in different configurations
      */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Animation Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every component is built from scratch using public APIs,
              with performance and accessibility as top priorities.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Scroll Zoom Feature */}
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Scroll Zoom"
              description="useScroll + useTransform with spring physics. Scale from 1 to 1.5 based on scroll position with clamped values and GPU optimization."
              color="violet"
            />

            {/* Aurora Background Feature */}
            <FeatureCard
              icon={<Sparkles className="w-6 h-6" />}
              title="Aurora Gradient"
              description="Pure CSS animated radial gradients with blend modes. 4 independently animated layers create organic, flowing movement."
              color="blue"
            />

            {/* Parallax Layers Feature */}
            <FeatureCard
              icon={<Layers className="w-6 h-6" />}
              title="Parallax Depth"
              description="DepthLayer component creates 3D-like depth with blur and scale variations. Different scroll speeds for foreground and background."
              color="pink"
            />

            {/* Performance Feature */}
            <FeatureCard
              icon={<span className="text-xl">⚡</span>}
              title="GPU Optimized"
              description="All animations use transform3d and opacity only. will-change hints, reduced motion support, and no layout shifts."
              color="emerald"
            />

            {/* Accessibility Feature */}
            <FeatureCard
              icon={<span className="text-xl">♿</span>}
              title="Accessible"
              description="Respects prefers-reduced-motion. Semantic HTML structure. No rapid movements or seizure-inducing effects."
              color="amber"
            />

            {/* Responsive Feature */}
            <FeatureCard
              icon={<span className="text-xl">📱</span>}
              title="Fully Responsive"
              description="Works across all screen sizes. Touch-friendly on mobile. Adaptive blur and scale values for different viewports."
              color="cyan"
            />
          </div>
        </div>
      </section>

      {/* 
        SECTION 3: Aurora Preset Showcase
        Shows different color presets in action
      */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Aurora Presets</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Default Preset */}
            <AuroraPresetCard
              name="Default"
              description="Violet, Blue, Pink, Emerald"
              colors={auroraPresets.default}
            />

            {/* Ocean Preset */}
            <AuroraPresetCard
              name="Ocean"
              description="Sky, Cyan, Blue, Teal"
              colors={auroraPresets.ocean}
            />

            {/* Sunset Preset */}
            <AuroraPresetCard
              name="Sunset"
              description="Amber, Red, Pink, Violet"
              colors={auroraPresets.sunset}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Built with{" "}
            <a
              href="https://motion.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline"
            >
              Motion
            </a>{" "}
            and Tailwind CSS. No proprietary code.
          </p>
        </div>
      </footer>
    </div>
  )
}

/**
 * Feature Card Component
 */
interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  const colorClasses: Record<string, string> = {
    violet: "bg-violet-500/10 text-violet-600 border-violet-200",
    blue: "bg-blue-500/10 text-blue-600 border-blue-200",
    pink: "bg-pink-500/10 text-pink-600 border-pink-200",
    emerald: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    amber: "bg-amber-500/10 text-amber-600 border-amber-200",
    cyan: "bg-cyan-500/10 text-cyan-600 border-cyan-200",
  }

  return (
    <div className="group relative p-6 rounded-2xl border border-border bg-card/50 hover:bg-card/80 transition-colors">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${
          colorClasses[color] || colorClasses.violet
        }`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

/**
 * Aurora Preset Preview Card
 */
interface AuroraPresetCardProps {
  name: string
  description: string
  colors: { primary: string; secondary: string; tertiary: string; quaternary: string }
}

function AuroraPresetCard({ name, description, colors }: AuroraPresetCardProps) {
  return (
    <div className="rounded-2xl overflow-hidden border border-border">
      {/* Color Preview */}
      <div className="h-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 30% 30%, ${colors.primary}40, transparent 60%),
                         radial-gradient(ellipse 60% 70% at 70% 50%, ${colors.secondary}40, transparent 55%),
                         radial-gradient(ellipse 70% 60% at 50% 80%, ${colors.tertiary}30, transparent 50%),
                         radial-gradient(ellipse 50% 80% at 80% 20%, ${colors.quaternary}30, transparent 55%)`,
            filter: "blur(20px)",
          }}
        />
        {/* Color dots */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          {Object.values(colors).map((color, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 bg-card">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

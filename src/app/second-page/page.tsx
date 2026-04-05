"use client"

import { useRef, useState } from "react"
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { ArrowDown, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { BackgroundCanvas } from "@/components/background-canvas"
import { Button } from "@/components/ui/button"
import { Aurora, DEFAULT_COLOR_STOPS } from "@/components/aurora"

export default function SecondPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [particleScroll, setParticleScroll] = useState(0)

  const { scrollYProgress: pageScrollProgress } = useScroll()
  useMotionValueEvent(pageScrollProgress, "change", (latest) => {
    setParticleScroll(latest)
  })

  // Scroll zoom logic (hero)
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const rawScale = useTransform(heroScrollProgress, [0, 0.5], [1, 1.4])
  const scale = useSpring(rawScale, { stiffness: 100, damping: 30 })
  const opacity = useTransform(heroScrollProgress, [0.3, 0.5], [1, 0])

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BackgroundCanvas scrollProgress={particleScroll} />

      {/* 
        ========================================
        SCROLL ZOOM HERO — Aurora + parede preta (cobre o canvas)
        ========================================
      */}
      <div
        ref={containerRef}
        className="relative z-10 bg-black"
        style={{ height: "200vh" }}
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Aurora
              colorStops={[...DEFAULT_COLOR_STOPS]}
              amplitude={0.4}
              blend={0.5}
              speed={0.8}
            />
          </div>

          <motion.div
            className="relative z-10 w-full max-w-4xl mx-auto px-6"
            style={{
              scale,
              opacity,
              willChange: "transform, opacity",
            }}
          >
            {/* Card com glassmorphism */}
            <div className="rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl p-8 md:p-12 shadow-2xl">
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20">
                  React Bits Style
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="block">Aurora</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-sky-700 bg-clip-text text-transparent">
                  Full viewport
                </span>
              </motion.h1>

              <motion.p
                className="text-lg text-white/70 mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Aurora como fundo em tela cheia (altura vem do container{" "}
                <code className="text-white/90">h-screen</code>). Role para ver o zoom.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button asChild variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10">
                  <Link href="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-xs text-white/50 uppercase tracking-widest">
              Role para zoom
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-5 h-5 text-white/50" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10">
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black to-transparent"
          aria-hidden="true"
        />

      <section
        id="como-usar"
        aria-labelledby="heading-como-usar"
        className="relative z-10 border-t border-white/10  py-24 px-6 text-zinc-100"
      >
        <div className="mx-auto max-w-6xl space-y-6">
          <h2 id="heading-como-usar" className="text-3xl font-bold text-white">
            Como usar
          </h2>
            <p className="text-zinc-400">
              O componente funciona dentro de qualquer container com{" "}
              <code className="rounded bg-white/10 px-1 py-0.5 text-sm text-zinc-200">
                w-full h-full
              </code>
              :
            </p>

            {/* Código de exemplo */}
            <div className="p-6 rounded-xl bg-muted font-mono text-sm overflow-x-auto">
              <pre className="text-foreground">
{`{/* Exemplo 1: Viewport inteiro (padrão típico) */}
<div className="relative h-screen w-full">
  <Aurora
    colorStops={["#008594", "#0264DB", "#00C497", "#0A368A"]}
    amplitude={0.4}
    blend={0.5}
  />
</div>

{/* Exemplo 2: Container específico */}
<div className="w-full h-96 relative">
  <Aurora
    colorStops={["#0ea5e9", "#06b6d4", "#3b82f6"]}
    amplitude={0.5}
    blend={0.6}
  />
</div>

{/* Exemplo 3: Full screen */}
<div className="w-full h-screen relative">
  <Aurora
    colorStops={["#22c55e", "#16a34a", "#059669"]}
    amplitude={0.3}
    blend={0.4}
  />
</div>`}
              </pre>
            </div>
        </div>
      </section>

      <section
        id="variacoes"
        aria-labelledby="heading-variacoes"
        className="relative z-10 border-t border-border/60 bg-transparent py-24 px-6"
      >
        <div className="mx-auto max-w-6xl space-y-6">
          <h2 id="heading-variacoes" className="text-3xl font-bold">
            Variações
          </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Exemplo: Container 300px */}
              <div className="space-y-3">
                <p className="text-sm font-medium">Container 300px height</p>
                <div className="h-[300px] w-full rounded-2xl overflow-hidden relative border border-border">
                  <Aurora
                    colorStops={[...DEFAULT_COLOR_STOPS]}
                    amplitude={0.4}
                    blend={0.5}
                    speed={0.8}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-medium drop-shadow-lg">300px container</span>
                  </div>
                </div>
              </div>

              {/* Exemplo: Container 200px */}
              <div className="space-y-3">
                <p className="text-sm font-medium">Container 200px height</p>
                <div className="h-[200px] w-full rounded-2xl overflow-hidden relative border border-border">
                  <Aurora
                    colorStops={["#0ea5e9", "#06b6d4", "#3b82f6"]}
                    amplitude={0.5}
                    blend={0.6}
                    speed={1}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-medium drop-shadow-lg">200px container</span>
                  </div>
                </div>
              </div>

              {/* Exemplo: Ocean colors */}
              <div className="space-y-3">
                <p className="text-sm font-medium">Ocean Theme</p>
                <div className="h-[250px] w-full rounded-2xl overflow-hidden relative border border-border">
                  <Aurora
                    colorStops={["#0ea5e9", "#06b6d4", "#14b8a6"]}
                    amplitude={0.45}
                    blend={0.55}
                    speed={0.9}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-medium drop-shadow-lg">Ocean</span>
                  </div>
                </div>
              </div>

              {/* Exemplo: Sunset colors */}
              <div className="space-y-3">
                <p className="text-sm font-medium">Sunset Theme</p>
                <div className="h-[250px] w-full rounded-2xl overflow-hidden relative border border-border">
                  <Aurora
                    colorStops={["#f59e0b", "#ef4444", "#ec4899"]}
                    amplitude={0.4}
                    blend={0.5}
                    speed={0.7}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-medium drop-shadow-lg">Sunset</span>
                  </div>
                </div>
              </div>

            </div>
        </div>
      </section>
      </div>

      <section
        id="camadas-conteudo"
        aria-labelledby="heading-camadas"
        className="relative z-10 border-t border-border/60 bg-transparent py-24 px-6"
      >
        <div className="mx-auto max-w-6xl space-y-6">
          <h2 id="heading-camadas" className="text-3xl font-bold">
            Camadas e legibilidade
          </h2>
          <p className="max-w-3xl text-muted-foreground">
            Coloque a <code className="rounded bg-muted px-1 py-0.5 text-sm">Aurora</code> em um
            wrapper <code className="rounded bg-muted px-1 py-0.5 text-sm">absolute inset-0</code>{" "}
            com <code className="rounded bg-muted px-1 py-0.5 text-sm">z-0</code> e o conteúdo
            (texto, botões, cards) com{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">relative z-10</code>. Fundos
            semi-transparentes ou <code className="rounded bg-muted px-1 py-0.5 text-sm">backdrop-blur</code>{" "}
            no card ajudam o contraste sem esconder o brilho de fundo.
          </p>
          <ul className="max-w-3xl list-inside list-disc space-y-2 text-muted-foreground">
            <li>O canvas da Aurora ignora cliques (<code className="text-foreground">pointer-events: none</code>).</li>
            <li>Evite texto branco puro sobre o clarão mais forte sem uma camada escura por baixo.</li>
            <li>Em mobile, teste altura com barra do navegador visível e oculta.</li>
          </ul>
        </div>
      </section>

      <section
        id="stack"
        aria-labelledby="heading-stack"
        className="relative z-10 border-t border-border/60 bg-transparent py-24 px-6"
      >
        <div className="mx-auto max-w-6xl space-y-6">
          <h2 id="heading-stack" className="text-3xl font-bold">
            Stack e renderização
          </h2>
          <p className="max-w-3xl text-muted-foreground">
            O efeito roda em <strong className="font-medium text-foreground">WebGL 2</strong> via{" "}
            <a
              href="https://github.com/oframe/ogl"
              className="text-primary underline-offset-4 hover:underline"
            >
              OGL
            </a>
            : um triângulo em tela cheia e um fragment shader com ruído simplex, igual ao padrão do
            React Bits. O componente é <code className="rounded bg-muted px-1 py-0.5 text-sm">use client</code>{" "}
            porque precisa do <code className="rounded bg-muted px-1 py-0.5 text-sm">canvas</code> no
            browser.
          </p>
          <p className="max-w-3xl text-muted-foreground">
            Em dispositivos sem WebGL 2 o contexto pode falhar silenciosamente; em produção vale
            prever um fundo sólido ou gradiente CSS como fallback se o seu público incluir browsers
            muito antigos.
          </p>
        </div>
      </section>

      <section
        id="landing-ideas"
        aria-labelledby="heading-landing"
        className="relative z-10 border-t border-border/60 bg-transparent py-24 px-6"
      >
        <div className="mx-auto max-w-6xl space-y-6">
          <h2 id="heading-landing" className="text-3xl font-bold">
            Onde usar na landing
          </h2>
          <p className="max-w-3xl text-muted-foreground">
            Alguns encaixes comuns para um fundo orgânico como este:
          </p>
          <ul className="max-w-3xl list-inside list-disc space-y-3 text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Hero acima da dobra</span> — headline,
              subtexto e CTA primário, como nesta página.
            </li>
            <li>
              <span className="font-medium text-foreground">Bloco de prova social</span> — faixa mais
              baixa (<code className="rounded bg-muted px-1 py-0.5 text-sm">h-64</code> a{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-sm">h-96</code>) só para dar
              atmosfera atrás de logos ou depoimentos.
            </li>
            <li>
              <span className="font-medium text-foreground">Pré-footer</span> — transição suave
              antes do rodapé escuro, com <code className="rounded bg-muted px-1 py-0.5 text-sm">blend</code>{" "}
              mais alto para o degradê sumir devagar.
            </li>
          </ul>
        </div>
      </section>

      <section
        id="props"
        aria-labelledby="heading-props"
        className="relative z-10 border-t border-border/60 bg-transparent py-24 px-6"
      >
        <div className="mx-auto max-w-6xl space-y-6">
          <h2 id="heading-props" className="text-3xl font-bold">
            Props
          </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-border bg-card">
                <code className="text-sm font-semibold text-violet-500">colorStops</code>
                <p className="text-sm text-muted-foreground mt-1">
                  Até 4 cores ao longo do eixo horizontal. Padrão: tons de azul/teal. Ex:{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">
                    {`["#008594", …, "#0A368A"]`}
                  </code>
                </p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card">
                <code className="text-sm font-semibold text-blue-500">amplitude</code>
                <p className="text-sm text-muted-foreground mt-1">
                  Intensidade do movimento das ondas (0-1). Padrão: 0.4
                </p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card">
                <code className="text-sm font-semibold text-emerald-500">blend</code>
                <p className="text-sm text-muted-foreground mt-1">
                  Opacidade do blend das cores (0-1). Padrão: 0.5
                </p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card">
                <code className="text-sm font-semibold text-amber-500">speed</code>
                <p className="text-sm text-muted-foreground mt-1">
                  Velocidade da animação. Padrão: 1
                </p>
              </div>
            </div>
        </div>
      </section>
    </div>
  )
}

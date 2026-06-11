"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import {
  ArrowUpRight,
  FileDown,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import Image from "next/image"
import SplitText from "@/components/split-text"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/** Número internacional sem símbolos — wa.me/5541988657834 */
const WHATSAPP_PHONE = "5541988657834"

const CONTACT_LINKS = [
  {
    id: "email",
    label: "E-mail",
    detail: "luizh4321@gmail.com",
    href: "mailto:luizh4321@gmail.com",
    icon: Mail,
    external: false,
    color: "#22b8cf",
    featured: false,
  },
  {
    id: "github",
    label: "GitHub",
    detail: "@Luizrodrlguesz",
    href: "https://github.com/Luizrodrlguesz",
    icon: Github,
    external: true,
    color: "#c9d1d9",
    featured: false,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    detail: "Luiz Rodrigues",
    href: "https://www.linkedin.com/in/luiz-rodrigues-372866256/",
    icon: Linkedin,
    external: true,
    color: "#3b82f6",
    featured: false,
  },
  {
    id: "instagram",
    label: "Instagram",
    detail: "@rodrlguesz",
    // Substitua pelo URL do seu perfil no Instagram.
    href: "https://www.instagram.com/rodrlguesz/",
    icon: Instagram,
    external: true,
    color: "#e1457e",
    featured: false,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    detail: "+55 41 98865-7834",
    href: `https://wa.me/${WHATSAPP_PHONE}`,
    icon: MessageCircle,
    external: true,
    color: "#22c55e",
    featured: false,
  },
  {
    id: "curriculum",
    label: "Currículo",
    detail: "download PDF",
    href: "/LuizRodriguesCV.pdf",
    icon: FileDown,
    external: true,
    color: "#8b7bff",
    featured: true,
  },
] as const

// ── Animated L-shaped border glow ─────────────────────────────────────────
const FORM_R = 63 // matches rounded-tl-[63px]
const FORM_BORDER_INSET = 1

function FormBorderGlow() {
  const uid = useId().replace(/:/g, "")
  const gradId = `fbg-grad-${uid}`
  const glowId = `fbg-glow-${uid}`

  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 640, h: 700 })

  useEffect(() => {
    const parent = ref.current?.parentElement
    if (!parent) return
    const sync = () =>
      setSize({ w: parent.offsetWidth, h: parent.offsetHeight })
    sync()
    const ro = new ResizeObserver(sync)
    ro.observe(parent)
    return () => ro.disconnect()
  }, [])

  const dashOffset = useMotionValue(0)
  const smoothOffset = useSpring(dashOffset, { stiffness: 72, damping: 24 })
  const totalLenRef = useRef(0)

  const { w, h } = size
  const inset = FORM_BORDER_INSET
  const r = FORM_R - inset
  const start = inset
  const endX = Math.max(start, w - inset)
  const endY = Math.max(start, h - inset)
  const cornerEnd = start + r
  // exact path length: vertical + quarter-arc + horizontal
  const totalLength =
    (endY - cornerEnd) + (Math.PI / 2) * r + (endX - cornerEnd)

  useEffect(() => {
    totalLenRef.current = totalLength
  }, [totalLength])

  useEffect(() => {
    let raf = 0
    const tick = () => {
      const len = totalLenRef.current
      dashOffset.set((dashOffset.get() + 0.9) % len)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [dashOffset])

  // path: bottom of left edge → top-left corner → end of top edge
  const pathD = `M ${start},${endY} L ${start},${cornerEnd} Q ${start},${start} ${cornerEnd},${start} L ${endX},${start}`
  const arcMain = totalLength * 0.22
  const arcTrail = totalLength * 0.11

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-40" aria-hidden>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${w} ${h}`}
        overflow="visible"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0f4fff" />
            <stop offset="50%" stopColor="#002eb9" />
            <stop offset="100%" stopColor="#0042ac" />
          </linearGradient>
          <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={4} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* static base border */}
        <path d={pathD} fill="none" stroke="var(--fbg-border-1)" strokeWidth={2} />

        {/* corner brackets at the open ends */}
        <path d={`M ${endX - 25},${start} L ${endX},${start} L ${endX},${start + 25}`} fill="none" stroke="var(--fbg-border-2)" strokeWidth={2} strokeLinecap="round" />
        <path d={`M ${start},${endY - 25} L ${start},${endY} L ${start + 25},${endY}`} fill="none" stroke="var(--fbg-border-2)" strokeWidth={2} strokeLinecap="round" />
        <path d={`M ${endX - 25},${endY} L ${endX},${endY} L ${endX},${endY - 25}`} fill="none" stroke="var(--fbg-border-3)" strokeWidth={2} strokeLinecap="round" />

        {/* trail arc */}
        <motion.path
          d={pathD}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray={`${arcTrail} ${totalLength - arcTrail}`}
          style={{ strokeDashoffset: smoothOffset }}
          opacity={0.45}
        />

        {/* main arc with glow */}
        <motion.path
          d={pathD}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeDasharray={`${arcMain} ${totalLength - arcMain}`}
          style={{ strokeDashoffset: smoothOffset }}
          filter={`url(#${glowId})`}
          opacity={0.92}
        />
      </svg>
    </div>
  )
}

function buildWhatsAppHref(nome: string, email: string, mensagem: string) {
  const body = `Olá, sou ${nome.trim()}, e ${mensagem.trim()}. Entre em contato através do e-mail ${email.trim()}.`
  const params = new URLSearchParams({ text: body })
  return `https://wa.me/${WHATSAPP_PHONE}?${params.toString()}`
}

export function SecondPageContactSection({
  className,
}: {
  className?: string
}) {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [mensagem, setMensagem] = useState("")

  const canSubmit =
    nome.trim().length > 0 &&
    email.trim().length > 0 &&
    mensagem.trim().length > 0

  const handleSendWhatsApp = useCallback(() => {
    if (!canSubmit) return
    const url = buildWhatsAppHref(nome, email, mensagem)
    window.open(url, "_blank", "noopener,noreferrer")
  }, [canSubmit, nome, email, mensagem])

  // Prévia ao vivo — mesmo template do buildWhatsAppHref, com placeholders.
  const previewText = `Olá, sou ${
    nome.trim() || "[seu nome]"
  }, e ${
    mensagem.trim() || "[sua mensagem]"
  }. Entre em contato através do e-mail ${email.trim() || "[seu e-mail]"}.`

  return (
    <>
      <section
        id="contato"
        aria-labelledby="heading-contato"
        className={cn(
          "relative z-10 border-border/60 bg-transparent px-4 py-20 text-foreground sm:px-6 lg:px-8 lg:py-24",
          className,
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Contato
          </p>
          <SplitText
            id="heading-contato"
            className="font-orbitron-italic mt-2 text-3xl font-bold tracking-tight text-slate-800 dark:text-foreground"
            text="Vamos conversar?"
            tag="h2"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="left"
          />
          <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
            Escolha um canal abaixo ou envie o formulário — ele abre o WhatsApp
            com a mensagem já montada com os seus dados.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(24rem,1.1fr)] lg:gap-10 xl:grid-cols-[minmax(0,32rem)_minmax(30rem,1fr)]">
          {/* ── Cards compactos, foco na logo ───────────────────────── */}
          <nav
            aria-label="Links de contato e redes"
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2"
          >
            {CONTACT_LINKS.map(
              ({ id, label, detail, href, icon: Icon, external, color, featured }) => (
                <a
                  key={id}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  style={{
                    background: `linear-gradient(160deg, color-mix(in srgb, ${color} var(--social-card-strong), var(--social-card-base)), color-mix(in srgb, ${color} var(--social-card-soft), var(--social-card-base)))`,
                    borderColor: `color-mix(in srgb, ${color} var(--social-card-border), transparent)`,
                  }}
                  className={cn(
                    "group relative flex min-w-0 flex-col gap-4 overflow-hidden rounded-2xl border p-4 backdrop-blur-[14px]",
                    "transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.8)]",
                    featured && "ring-1 ring-inset ring-violet-300/25",
                  )}
                >
                  {/* glow da marca */}
                  <span
                    className="pointer-events-none absolute -right-7 -top-7 h-24 w-24 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${color}33, transparent 70%)`,
                    }}
                    aria-hidden
                  />
                  <ArrowUpRight
                    className="absolute right-3.5 top-3.5 h-4 w-4 text-white/30 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/70"
                    aria-hidden
                  />

                  {/* logo em destaque */}
                  <span
                    className="flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{
                      color,
                    }}
                  >
                    {id === "whatsapp" ? (
                      <Image
                        src="/assets/wpp.png"
                        alt=""
                        width={50}
                        height={50}
                        className="h-10 w-10 object-contain drop-shadow-[0_0_18px_rgba(34,197,94,0.85)]"
                        aria-hidden
                      />
                    ) : (
                      <Icon className="h-10 w-10 drop-shadow-[0_0_18px_currentColor]" aria-hidden />
                    )}
                  </span>

                  <span className="relative z-10">
                    <span className="block text-[0.95rem] font-bold leading-tight text-white">
                      {label}
                    </span>
                    <span className="mt-1 block break-words font-mono text-[11px] leading-snug text-white/70">
                      {detail}
                    </span>
                  </span>
                </a>
              ),
            )}
          </nav>

          {/* ── Formulário no tema + prévia da mensagem ──────────────── */}
          <div className="relative min-w-0 overflow-hidden rounded-tl-[40px] border border-border/60 bg-white/40 p-5 shadow-[0_30px_90px_-45px_rgba(56,189,248,0.55)] backdrop-blur-xl dark:border-sky-300/10 dark:bg-foreground/5 sm:rounded-tl-[55px] sm:p-8 lg:p-10">
            <FormBorderGlow />
            <span
              className="pointer-events-none absolute inset-x-6 top-0 z-40 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent sm:inset-x-8"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute right-6 top-6 z-0 h-28 w-28 rounded-full bg-cyan-400/10 blur-2xl"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute bottom-8 left-8 z-0 h-20 w-20 rounded-full bg-violet-500/10 blur-2xl"
              aria-hidden
            />

            <div className="relative z-30 mb-4 flex items-start justify-center gap-2.5 py-1 text-sm leading-relaxed text-cyan-900/75 dark:text-cyan-50/75 sm:items-center sm:pl-3">
              <MessageCircle
                className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600/80 dark:text-cyan-300/80"
                aria-hidden
              />
              <p>
                Canal para{" "}
                <strong className="font-medium text-cyan-900 dark:text-cyan-50/95">
                  contatos profissionais
                </strong>{" "}
                — oportunidades, projetos e parcerias.
              </p>
            </div>

            <div className="relative z-30 space-y-4 mb-3">
              <div className="space-y-2">
                <label
                  htmlFor="contato-nome"
                  className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                >
                  Nome
                </label>
                <input
                  id="contato-nome"
                  name="nome"
                  type="text"
                  autoComplete="name"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full border-b border-border bg-transparent px-0 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors duration-200 focus-visible:border-blue-400/60 focus-visible:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contato-email"
                  className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                >
                  E-mail
                </label>
                <input
                  id="contato-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full border-b border-border bg-transparent px-0 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors duration-200 focus-visible:border-blue-400/60 focus-visible:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contato-mensagem"
                  className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                >
                  Mensagem
                </label>
                <textarea
                  id="contato-mensagem"
                  name="mensagem"
                  rows={3}
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Em poucas linhas: o que você precisa ou como posso ajudar."
                  className="w-full resize-none rounded-lg bg-foreground/[0.04] px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors duration-200 focus-visible:bg-foreground/[0.07] focus-visible:outline-none"
                />
              </div>
            </div>

            {/* prévia da mensagem (atualiza em tempo real) */}
            <div className="relative z-30 rounded-xl">
              <p className="mb-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300/90">
                Prévia da mensagem
              </p>
              <div className="flex min-w-0 gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                  <Image
                    src="/assets/wpp.png"
                    alt=""
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px] object-contain"
                    aria-hidden
                  />
                </span>
                <p className="min-w-0 break-words rounded-[4px_14px_14px_14px] bg-emerald-500/12 px-3 py-2 text-[13px] leading-relaxed text-emerald-900 dark:text-emerald-50/90">
                  {previewText}
                </p>
              </div>
            </div>

            <Button
              type="button"
              disabled={!canSubmit}
              className={cn(
                "relative z-30 w-full rounded-sm border-0 py-6 text-base font-semibold mt-5 text-white shadow-lg shadow-emerald-600/25",
                "bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400",
                "disabled:pointer-events-none disabled:opacity-45",
              )}
              onClick={handleSendWhatsApp}
            >
              Enviar mensagem no WhatsApp
            </Button>
          </div>
        </div>

        </div>
      </section>

      <footer className="relative z-10  border-transparent bg-gradient-to-b from-transparent to-background px-4 pt-6 pb-6 text-sm text-muted-foreground dark:border-border/60 sm:px-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <p>
            © {new Date().getFullYear()} Luiz Henrique. Todos os direitos
            reservados.
          </p>
          <p className="text-xs">Feito com Next.js, Tailwind, shadcn/ui e Three.js.</p>
        </div>
      </footer>
    </>
  )
}

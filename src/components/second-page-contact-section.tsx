"use client"

import { useCallback, useState } from "react"
import {
  ArrowUpRight,
  FileDown,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/** Número internacional sem símbolos — wa.me/5541988657834 */
const WHATSAPP_PHONE = "5541988657834"

const CONTACT_LINKS = [
  {
    id: "email",
    label: "E-mail",
    description: "Resposta direta para propostas, dúvidas e convites.",
    detail: "luizh4321@gmail.com",
    href: "mailto:luizh4321@gmail.com",
    icon: Mail,
    external: false,
    accent: "from-sky-400/20 to-cyan-300/5",
    featured: false,
  },
  {
    id: "github",
    label: "GitHub",
    description: "Repositórios, estudos e evolução dos projetos.",
    detail: "@Luizrodrlguesz",
    href: "https://github.com/Luizrodrlguesz",
    icon: Github,
    external: true,
    accent: "from-zinc-200/18 to-zinc-500/5",
    featured: false,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    description: "Conexão profissional, trajetória e experiências.",
    detail: "luiz-rodrigues",
    href: "https://www.linkedin.com/in/luiz-rodrigues-372866256/",
    icon: Linkedin,
    external: true,
    accent: "from-blue-500/22 to-sky-300/5",
    featured: false,
  },
  {
    id: "instagram",
    label: "Instagram",
    description: "Um contato mais leve para acompanhar bastidores.",
    detail: "perfil social",
    // Substitua pelo URL do seu perfil no Instagram.
    href: "https://www.instagram.com/",
    icon: Instagram,
    external: true,
    accent: "from-pink-500/22 to-orange-300/5",
    featured: false,
  },
  {
    id: "curriculum",
    label: "Currículo (PDF)",
    description: "Resumo objetivo de experiência, stack e formas de colaboração.",
    detail: "download do CV",
    href: "/LuizRodriguesCV.pdf",
    icon: FileDown,
    external: true,
    accent: "from-violet-500/28 via-blue-500/12 to-emerald-300/8",
    featured: true,
  },
] as const

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

  return (
    <section
      id="contato"
      aria-labelledby="heading-contato"
      className={cn(
        "relative z-10 min-h-[720px] border-border/60 bg-transparent px-6 pt-24 pb-0 text-zinc-100 lg:min-h-[680px] lg:px-0",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[92vw] flex-col gap-10 pb-12 lg:ml-[4vw] lg:mr-[min(48vw,44rem)] lg:min-h-[560px] lg:max-w-[42rem]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Contato
          </p>
          <h2
            id="heading-contato"
            className="font-orbitron-italic mt-2 text-3xl font-bold tracking-tight text-white"
          >
            Vamos conversar?
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
            Prefere redes ou WhatsApp — à esquerda estão os atalhos; à direita, o
            formulário abre o app com a mensagem já montada.
          </p>
        </div>

        <div className="grid gap-12 lg:flex-1">
          <nav
            aria-label="Links de contato e redes"
            className="grid gap-3 sm:grid-cols-2"
          >
            {CONTACT_LINKS.map(
              ({
                id,
                label,
                description,
                detail,
                href,
                icon: Icon,
                external,
                accent,
                featured,
              }) => (
              <a
                key={id}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={cn(
                  "group relative flex min-h-36 overflow-hidden rounded-[20px] border border-white/12 bg-white/[0.06] p-4 text-left backdrop-blur-[18px] transition duration-300 hover:-translate-y-1 hover:border-white/24 hover:bg-white/[0.09] hover:shadow-[0_18px_60px_-36px_rgba(255,255,255,0.55)]",
                  featured &&
                    "min-h-44 border-violet-300/30 bg-violet-400/[0.09] shadow-[0_22px_80px_-48px_rgba(139,92,246,0.9)] sm:col-span-2",
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-100",
                    accent,
                  )}
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full border border-white/10"
                  aria-hidden
                />
                <span className="relative z-10 flex w-full flex-col justify-between gap-5">
                  <span className="flex items-start justify-between gap-4">
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-black/25 text-violet-200 transition-colors group-hover:text-white",
                        featured && "h-[52px] w-[52px] bg-violet-400/15 text-violet-100",
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-zinc-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-200"
                      aria-hidden
                    />
                  </span>
                  <span>
                    <span
                      className={cn(
                        "block text-base font-semibold text-white",
                        featured && "text-lg",
                      )}
                    >
                      {label}
                    </span>
                    <span className="mt-1.5 block text-sm leading-6 text-zinc-400">
                      {description}
                    </span>
                    <span className="mt-4 inline-flex max-w-full rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-medium text-zinc-300">
                      {detail}
                    </span>
                  </span>
                </span>
              </a>
              ),
            )}
          </nav>

          <div className="space-y-4 rounded-tl-[60px] border-l-[2px] border-t-[2px] border-white/45 bg-black p-6 sm:p-8 lg:absolute lg:right-0 lg:bottom-0 lg:w-[min(48vw,44rem)] lg:p-10">
            <div className="flex gap-2 rounded-lg border border-amber-500/35 bg-amber-500/10 px-3 py-2.5 text-sm text-amber-100/95">
              <MessageCircle
                className="mt-0.5 h-4 w-4 shrink-0 text-amber-400/90"
                aria-hidden
              />
              <p>
                Este canal é para{" "}
                <strong className="font-semibold text-amber-50">
                  contatos profissionais
                </strong>{" "}
                (oportunidades, projetos, parcerias). Mensagens fora desse
                contexto podem não receber retorno.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="contato-nome"
                  className="text-sm font-medium text-zinc-300"
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
                  className="w-full rounded-lg border border-white/15 bg-black/25 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:border-violet-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contato-email"
                  className="text-sm font-medium text-zinc-300"
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
                  className="w-full rounded-lg border border-white/15 bg-black/25 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:border-violet-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contato-mensagem"
                  className="text-sm font-medium text-zinc-300"
                >
                  Mensagem
                </label>
                <textarea
                  id="contato-mensagem"
                  name="mensagem"
                  rows={4}
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Em poucas linhas: o que você precisa ou como posso ajudar."
                  className="w-full resize-y rounded-lg border border-white/15 bg-black/25 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:border-violet-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30"
                />
              </div>
            </div>

            <Button
              type="button"
              disabled={!canSubmit}
              className={cn(
                "w-full rounded-full border-0 py-6 text-base font-semibold text-white shadow-lg shadow-violet-600/25",
                "bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500",
                "disabled:pointer-events-none disabled:opacity-45",
              )}
              onClick={handleSendWhatsApp}
            >
              Enviar mensagem no WhatsApp
            </Button>
          </div>
        </div>

        <footer className="mt-auto border-t border-white/10 pt-6 text-sm text-muted-foreground">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <p>
              © {new Date().getFullYear()} Luiz Henrique. Todos os direitos
              reservados.
            </p>
            <p className="text-xs">Feito com Next.js, Tailwind, shadcn/ui e Three.js.</p>
          </div>
        </footer>
      </div>
    </section>
  )
}

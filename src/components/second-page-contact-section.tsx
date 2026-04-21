"use client"

import { useCallback, useState } from "react"
import {
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
    href: "mailto:luizh4321@gmail.com",
    icon: Mail,
    external: false,
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Luizrodrlguesz",
    icon: Github,
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/luiz-rodrigues-372866256/",
    icon: Linkedin,
    external: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    // Substitua pelo URL do seu perfil no Instagram.
    href: "https://www.instagram.com/",
    icon: Instagram,
    external: true,
  },
  {
    id: "curriculum",
    label: "Currículo (PDF)",
    href: "/LuizRodriguesCV.pdf",
    icon: FileDown,
    external: true,
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
        "relative z-10 border-border/60 bg-transparent py-24 px-6 text-zinc-100",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[92vw] space-y-10">
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

        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <nav
            aria-label="Links de contato e redes"
            className="flex flex-col gap-2"
          >
            {CONTACT_LINKS.map(({ id, label, href, icon: Icon, external }) => (
              <a
                key={id}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center gap-3 rounded-[17px] border border-white/10 bg-white/10 px-4 py-3.5 text-sm font-medium text-zinc-200 backdrop-blur-[15px] transition-colors hover:border-white/20 hover:bg-white/14"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/8 text-violet-300 group-hover:text-violet-200">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                {label}
              </a>
            ))}
          </nav>

          <div className="space-y-4 rounded-[17px] border border-white/10 bg-white/10 p-6 backdrop-blur-[15px] sm:p-8">
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
      </div>
    </section>
  )
}

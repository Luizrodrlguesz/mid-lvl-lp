"use client"

import { useState } from "react"
import Image from "next/image"
import { ExpandableScreen } from "@/components/expandable-screen"
import { WHATSAPP_PHONE } from "@/lib/contact-links"
import { useT } from "@/lib/i18n"

/*
 * "Escrever mensagem": a pílula do footer cresce até virar uma tela da mesma cor
 * com o formulário (azul-escuro no light, bege do WhatsApp no dark), sobre um
 * fundo de rabiscos como o das conversas do WhatsApp. Mesma dinâmica do index —
 * nome, e-mail e mensagem montam um texto com prévia ao vivo, enviado pelo WhatsApp.
 */

// Campos, prévia e botão opacos (como os balões do WhatsApp), para os rabiscos
// do fundo não aparecerem através deles.
const INPUT =
  "w-full rounded-2xl border border-white/15 bg-[#1d3149] px-4 py-3 text-base text-white placeholder:text-white/40 outline-none transition-colors focus-visible:border-white dark:border-zinc-200 dark:bg-zinc-50 dark:text-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:border-zinc-950"

const FIELD_LABEL = "text-xs font-semibold uppercase tracking-[0.14em] text-white/60 dark:text-zinc-500"

export function ContactMessage() {
  const t = useT()

  return (
    <ExpandableScreen
      trigger={t.contact.openForm}
      // Azul-escuro (o dos cards do Processo) no light e branca no dark; a tela que
      // nasce dela tem a mesma cor.
      triggerClassName="bg-[#14263d] text-white shadow-sm dark:bg-white dark:text-black dark:shadow-none"
      screenClassName="bg-[#14263d] text-white dark:bg-[#efeae2] dark:text-zinc-950"
      backdrop={<ChatWallpaper />}
      closeLabel={t.contact.closeForm}
    >
      <MessageForm />
    </ExpandableScreen>
  )
}

/**
 * Fundo de conversa no estilo do WhatsApp: rabiscos em traço fino ladrilhados
 * sobre a cor da tela. No light a tela é azul-escuro (como o tema escuro do
 * WhatsApp) e os rabiscos são claros; no dark ela é o bege do tema claro do
 * WhatsApp e os rabiscos são escuros. O SVG entra como máscara, então a cor vem
 * do fundo da camada. `fixed`: cobre a tela inteira mesmo com o formulário rolando.
 */
function ChatWallpaper() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 bg-white/[0.07] [mask-image:url(/assets/chat-doodles.svg)] [mask-size:320px] [mask-repeat:repeat] dark:bg-[#4a3f2c]/[0.16]"
    />
  )
}

function MessageForm() {
  const t = useT()
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [mensagem, setMensagem] = useState("")

  const canSubmit = Boolean(nome.trim() && email.trim() && mensagem.trim())

  // Prévia ao vivo — mesmo template do envio, com placeholders no que faltar.
  const previewText = t.contact.messageTemplate(
    nome.trim() || t.contact.templatePlaceholders.name,
    mensagem.trim() || t.contact.templatePlaceholders.message,
    email.trim() || t.contact.templatePlaceholders.email,
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    const text = t.contact.messageTemplate(nome.trim(), mensagem.trim(), email.trim())
    const url = `https://wa.me/${WHATSAPP_PHONE}?${new URLSearchParams({ text })}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex min-h-dvh w-full max-w-xl flex-col justify-center gap-6 px-6 py-24"
    >
      <header className="space-y-3">
        <span className="grid size-11 place-items-center rounded-full bg-emerald-500/15">
          <Image src="/assets/wpp.png" alt="" width={22} height={22} className="size-[22px] object-contain" aria-hidden />
        </span>
        <h2 className="font-display text-3xl font-bold sm:text-4xl">{t.contact.openForm}</h2>
        <p className="text-white/70 dark:text-zinc-600">
          {t.contact.formNoteBefore} <strong className="font-semibold text-white dark:text-zinc-950">{t.contact.formNoteStrong}</strong>
          {t.contact.formNoteAfter}
        </p>
      </header>

      <div className="space-y-4">
        <label className="block space-y-1.5">
          <span className={FIELD_LABEL}>{t.contact.nameLabel}</span>
          <input
            type="text"
            autoComplete="name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder={t.contact.namePlaceholder}
            className={INPUT}
          />
        </label>
        <label className="block space-y-1.5">
          <span className={FIELD_LABEL}>{t.contact.emailLabel}</span>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.contact.emailPlaceholder}
            className={INPUT}
          />
        </label>
        <label className="block space-y-1.5">
          <span className={FIELD_LABEL}>{t.contact.messageLabel}</span>
          <textarea
            rows={4}
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder={t.contact.messagePlaceholder}
            className={`${INPUT} resize-none`}
          />
        </label>
      </div>

      {/* Prévia da mensagem (atualiza em tempo real). */}
      <div>
        <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300 dark:text-emerald-700">
          {t.contact.previewHeading}
        </p>
        <p className="break-words rounded-[4px_18px_18px_18px] bg-[#144d37] px-4 py-3 text-sm leading-relaxed text-emerald-50 dark:bg-[#d9fdd3] dark:text-emerald-950">
          {previewText}
        </p>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex h-12 cursor-pointer items-center justify-center rounded-full bg-white px-6 font-semibold text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-white disabled:cursor-not-allowed disabled:bg-[#3a4b60] disabled:text-white/50 dark:disabled:bg-[#b9b4aa] dark:disabled:text-white/90"
      >
        {t.contact.submit}
      </button>
    </form>
  )
}

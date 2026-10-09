"use client"

import { useState } from "react"
import Image from "next/image"
import { ExpandableScreen } from "@/components/expandable-screen"
import { WHATSAPP_PHONE } from "@/lib/contact-links"
import { useT } from "@/lib/i18n"

/*
 * "Escrever mensagem": a pílula branca do footer cresce até virar uma tela
 * branca com o formulário. Mesma dinâmica do index — nome, e-mail e mensagem
 * montam um texto com prévia ao vivo, enviado pelo WhatsApp.
 */

const INPUT =
  "w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base text-zinc-950 placeholder:text-zinc-400 outline-none transition-colors focus-visible:border-zinc-950"

const FIELD_LABEL = "text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500"

export function ContactMessage() {
  const t = useT()

  return (
    <ExpandableScreen
      trigger={t.contact.openForm}
      triggerClassName="bg-white text-black"
      screenClassName="bg-white text-zinc-950"
      closeLabel={t.contact.closeForm}
    >
      <MessageForm />
    </ExpandableScreen>
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
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.contact.openForm}</h2>
        <p className="text-zinc-600">
          {t.contact.formNoteBefore} <strong className="font-semibold text-zinc-950">{t.contact.formNoteStrong}</strong>{" "}
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
        <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
          {t.contact.previewHeading}
        </p>
        <p className="break-words rounded-[4px_18px_18px_18px] bg-emerald-500/12 px-4 py-3 text-sm leading-relaxed text-emerald-950">
          {previewText}
        </p>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex h-12 cursor-pointer items-center justify-center rounded-full bg-zinc-950 px-6 font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
      >
        {t.contact.submit}
      </button>
    </form>
  )
}

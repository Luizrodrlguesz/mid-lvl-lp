import { CONTACT_LINKS, type ContactLinkId } from "@/lib/contact-links"

/*
 * Cards sociais com brilho na cor da marca (base: SocialHighlightCards).
 * Ajustes para o visual do site: cantos mais redondos, cores do tema em vez
 * de hex fixos, ícone em repouso no tom do texto e mais contatos (WhatsApp,
 * e-mail e currículo).
 */

function SocialIcon({ name }: { name: ContactLinkId }) {
  switch (name) {
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M5.1 3.5a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2ZM3.3 8.9h3.6V20H3.3V8.9Zm5.8 0h3.4v1.5h.1c.5-.9 1.6-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.6V20h-3.6v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20H9.1V8.9Z" />
        </svg>
      )
    case "github":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.5v-1.9c-2.78.62-3.36-1.2-3.36-1.2-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.74 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85 0 1.7.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.43.2 2.48.1 2.74.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.06.36.32.68.94.68 1.89v2.8c0 .28.18.6.69.5A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
        </svg>
      )
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
        </svg>
      )
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.82 9.82 0 0 1 6.99 2.9 9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41Z" />
        </svg>
      )
    case "email":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="2" />
          <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case "resume":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M14 3v5h5M12 11v6m-3-3 3 3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
  }
}

type SocialHighlightCardsProps = {
  /** aria-label da navegação. */
  label: string
  /** Rótulo acessível de cada card (o e-mail e o currículo são traduzidos). */
  getLabel: (id: ContactLinkId, fallback: string) => string
}

export function SocialHighlightCards({ label, getLabel }: SocialHighlightCardsProps) {
  return (
    <nav className="flex flex-wrap items-center gap-3.5 max-[420px]:gap-2.5" aria-label={label}>
      {CONTACT_LINKS.map((social) => {
        const name = getLabel(social.id, social.label)
        const external = social.id !== "email"
        return (
          <a
            key={social.id}
            href={social.href}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            title={`${name} — ${social.detail}`}
            aria-label={`${name}: ${social.detail}`}
            style={{ color: social.highlight }}
            className="group relative isolate grid size-16 place-items-center overflow-hidden rounded-2xl border border-border/60 bg-[color-mix(in_oklab,var(--background)_72%,transparent)] text-current no-underline shadow-[inset_0_1px_0_rgba(255,255,255,.035)] transition-[border-color,box-shadow] duration-[260ms] ease-[cubic-bezier(.22,1,.36,1)] hover:border-[color-mix(in_srgb,currentColor_32%,transparent)] hover:shadow-[0_10px_24px_rgba(0,0,0,.2),0_0_22px_color-mix(in_srgb,currentColor_14%,transparent)] focus-visible:border-[color-mix(in_srgb,currentColor_32%,transparent)] focus-visible:shadow-[0_10px_24px_rgba(0,0,0,.2),0_0_22px_color-mix(in_srgb,currentColor_14%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current motion-reduce:duration-[.01ms] max-[420px]:size-14"
          >
            <span
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_78%_92%_at_50%_-4%,color-mix(in_srgb,currentColor_38%,transparent)_0%,color-mix(in_srgb,currentColor_16%,transparent)_38%,transparent_76%)] opacity-20 transition-opacity duration-[260ms] group-hover:opacity-100 group-focus-visible:opacity-100"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute left-3 right-3 top-1 h-1 scale-x-[.96] rounded-full bg-current opacity-30 transition-[transform,opacity] duration-[480ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100 group-hover:opacity-100 group-focus-visible:scale-x-100 group-focus-visible:opacity-100 motion-reduce:duration-[.01ms]"
              aria-hidden="true"
            />
            {/* Em repouso o ícone fica no tom do texto; no hover assume a cor da marca. */}
            <span className="grid size-[30px] scale-[.96] place-items-center text-foreground/35 transition-[color,transform] duration-[480ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-100 group-hover:text-inherit group-focus-visible:scale-100 group-focus-visible:text-inherit motion-reduce:duration-[.01ms] max-[420px]:size-[27px] [&_svg]:size-full">
              <SocialIcon name={social.id} />
            </span>
          </a>
        )
      })}
    </nav>
  )
}

"use client"

import { ContactMessage } from "@/components/contact-message"
import { SocialHighlightCards } from "@/components/social-highlight-cards"
import { useT } from "@/lib/i18n"

const SECTIONS = ["inicio", "sobre", "habilidades", "projetos"] as const

/**
 * Footer "revelado" com o contato da página: o conteúdo fica fixo no fundo da
 * tela e a página rola por cima dele. Como o conteúdo acima é transparente
 * (fundo de partículas/nuvens), em vez de `sticky` atrás de um bloco opaco
 * usamos `clip-path` no invólucro: o filho `fixed` só aparece dentro da área
 * do footer. No mobile o conteúdo é mais alto que a tela, então ele flui normal.
 *
 * Fundo sempre preto: a classe `dark` faz o footer usar as cores do tema
 * escuro (cards sociais, texto) mesmo com a página no light.
 */
export function RevealFooter() {
  const t = useT()
  const year = new Date().getFullYear()

  return (
    <footer
      id="contato"
      aria-labelledby="heading-contato"
      className="dark relative z-10 bg-black text-foreground md:h-[30rem]"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <div className="w-full bg-black md:fixed md:bottom-0 md:left-0 md:h-[30rem]">
        <div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-12 px-6 py-14 md:flex-row md:justify-between md:px-12">
          <div className="flex max-w-xl flex-col gap-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {t.contact.eyebrow}
              </p>
              <h2 id="heading-contato" className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t.contact.title}
              </h2>
              <p className="text-muted-foreground">{t.contact.intro}</p>
            </div>

            <SocialHighlightCards
              label={t.contact.linksAria}
              getLabel={(id, fallback) =>
                id === "email" ? t.contact.emailLabel : id === "resume" ? t.contact.resumeLabel : fallback
              }
            />

            <div>
              <ContactMessage />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-10 md:items-end">
            <nav className="text-base md:text-right md:text-lg" aria-label={t.common.sectionsNav}>
              <ul className="space-y-1.5">
                {SECTIONS.map((id) => (
                  <li key={id}>
                    <a href={`#${id}`} className="text-muted-foreground transition-colors hover:text-foreground">
                      {t.nav[id]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <p className="text-xs text-muted-foreground">{t.contact.footerRights(year)}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

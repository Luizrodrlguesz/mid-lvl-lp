"use client"

import { ROUND_FLAGS } from "@/components/round-flags"
import { GooeyNavigationMenu } from "@/components/ui/gooey-navigation-menu"
import { LOCALES, useLocale, useT, type Locale } from "@/lib/i18n"

const LOCALE_NAMES: Record<Locale, string> = {
  "en-us": "English",
  "pt-br": "Português",
  "fr-fr": "Français",
}

const SIZE = 48

/**
 * Seletor de idioma flutuante (canto inferior direito): o gatilho mostra a
 * bandeira do idioma atual e as opções abrem em leque para cima/esquerda.
 */
export function LanguageMenu() {
  const { locale, setLocale } = useLocale()
  const t = useT()
  const CurrentFlag = ROUND_FLAGS[locale]

  return (
    // Caixa do tamanho do gatilho; o palco do menu (maior) fica centrado nela.
    <div className="fixed bottom-6 right-6 z-30" style={{ width: SIZE, height: SIZE }}>
      <GooeyNavigationMenu
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        direction="up-left"
        arc={90}
        radius={78}
        size={SIZE}
        childSize={42}
        iconScale={0.84}
        openLabel={t.common.languageMenu}
        closeLabel={t.common.languageMenu}
        triggerIcon={<CurrentFlag className="size-[78%]" />}
        items={LOCALES.map((option) => {
          const Flag = ROUND_FLAGS[option]
          return {
            id: option,
            label: LOCALE_NAMES[option],
            icon: <Flag />,
            active: option === locale,
            onSelect: () => setLocale(option),
          }
        })}
      />
    </div>
  )
}

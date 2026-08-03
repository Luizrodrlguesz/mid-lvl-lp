"use client"

import { dictionaries, type Dictionary } from "./dictionary"
import { useLocale } from "./locale-context"

export {
  DEFAULT_LOCALE,
  HTML_LANG,
  LOCALES,
  LocaleProvider,
  pick,
  useLocale,
  type Locale,
} from "./locale-context"
export { dictionaries, type Dictionary }

/** Dicionário de UI do idioma ativo. */
export function useT(): Dictionary {
  const { locale } = useLocale()
  return dictionaries[locale]
}

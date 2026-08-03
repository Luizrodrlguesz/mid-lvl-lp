"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react"

export type Locale = "en-us" | "pt-br" | "fr-fr"

/** Idioma principal do site — inglês. */
export const DEFAULT_LOCALE: Locale = "en-us"

/** Ordem de exibição no seletor flutuante. */
export const LOCALES: Locale[] = ["en-us", "pt-br", "fr-fr"]

/** Valor do atributo `lang` do <html> para cada locale. */
export const HTML_LANG: Record<Locale, string> = {
  "en-us": "en",
  "pt-br": "pt-BR",
  "fr-fr": "fr",
}

const STORAGE_KEY = "portfolio-locale"

function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && LOCALES.includes(value as Locale)
}

/**
 * A preferência de idioma vive no localStorage, então ela é uma store externa:
 * `useSyncExternalStore` cuida da hidratação (servidor renderiza o default e o
 * cliente troca depois de montar) sem setState dentro de efeito.
 */
const listeners = new Set<() => void>()

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange)
  // `storage` só dispara em outras abas; as escritas locais avisam via listeners.
  window.addEventListener("storage", onStoreChange)
  return () => {
    listeners.delete(onStoreChange)
    window.removeEventListener("storage", onStoreChange)
  }
}

function getSnapshot(): Locale {
  const saved = window.localStorage.getItem(STORAGE_KEY)
  return isLocale(saved) ? saved : DEFAULT_LOCALE
}

function getServerSnapshot(): Locale {
  return DEFAULT_LOCALE
}

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale]
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    window.localStorage.setItem(STORAGE_KEY, next)
    listeners.forEach((notify) => notify())
  }, [])

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    throw new Error("useLocale precisa estar dentro de <LocaleProvider>")
  }
  return ctx
}

/** Lê um campo traduzido, caindo no idioma principal quando faltar tradução. */
export function pick<T>(map: Partial<Record<Locale, T>>, locale: Locale): T {
  return (map[locale] ?? map[DEFAULT_LOCALE]) as T
}

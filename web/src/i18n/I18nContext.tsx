import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { content, type Lang, type Content } from "./content"

type I18nValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
  t: Content
}

type I18nState = Omit<I18nValue, "t">

const STORAGE_KEY = "ba-lang"

const I18nContext = createContext<I18nState | null>(null)

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "en"

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === "en" || stored === "zh") return stored

  const nav = window.navigator.language.toLowerCase()
  return nav.startsWith("zh") ? "zh" : "en"
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next)
    }
  }, [])

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "en" ? "zh" : "en"
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, next)
      }
      return next
    })
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo<I18nState>(
    () => ({ lang, setLang, toggle }),
    [lang, setLang, toggle],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return { ...ctx, t: content[ctx.lang] }
}

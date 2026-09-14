import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { content, type Lang, type Content } from "./content"
import { season2Content } from "./season2"

export type SeasonId = "s1" | "s2"
type I18nValue = { lang: Lang; setLang: (lang: Lang) => void; toggle: () => void; t: Content; season: SeasonId; toggleSeason: () => void; kaggleUrl: string }
type I18nState = Omit<I18nValue, "t" | "kaggleUrl">
const STORAGE_KEY = "ba-lang"
const SEASON_STORAGE_KEY = "ba-season"
const S1_KAGGLE = "https://www.kaggle.com/competitions/build-arena-human-ai-colleberation-engineering-challenge"
const S2_KAGGLE = "https://www.kaggle.com/competitions/build-arena-human-ai-engineering-challenge"
const I18nContext = createContext<I18nState | null>(null)
function getInitialLang(): Lang { if (typeof window === "undefined") return "en"; return window.localStorage.getItem(STORAGE_KEY) === "zh" ? "zh" : "en" }
function getInitialSeason(): SeasonId { if (typeof window === "undefined") return "s2"; return window.localStorage.getItem(SEASON_STORAGE_KEY) === "s1" ? "s1" : "s2" }

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)
  const [season, setSeason] = useState<SeasonId>(getInitialSeason)
  const setLang = useCallback((next: Lang) => { setLangState(next); window.localStorage.setItem(STORAGE_KEY, next) }, [])
  const toggle = useCallback(() => { setLangState((prev) => { const next = prev === "en" ? "zh" : "en"; window.localStorage.setItem(STORAGE_KEY, next); return next }) }, [])
  const toggleSeason = useCallback(() => { setSeason((current) => { const next = current === "s2" ? "s1" : "s2"; window.localStorage.setItem(SEASON_STORAGE_KEY, next); window.scrollTo({ top: 0, behavior: "smooth" }); return next }) }, [])
  useEffect(() => { document.documentElement.lang = lang }, [lang])
  const value = useMemo(() => ({ lang, setLang, toggle, season, toggleSeason }), [lang, setLang, toggle, season, toggleSeason])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return { ...ctx, t: ctx.season === "s2" ? season2Content[ctx.lang] : content[ctx.lang], kaggleUrl: ctx.season === "s2" ? S2_KAGGLE : S1_KAGGLE }
}

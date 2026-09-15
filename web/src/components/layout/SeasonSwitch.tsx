import { Archive, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/i18n/I18nContext"

export function SeasonSwitch() {
  const { season, toggleSeason, lang } = useI18n()
  const showingS2 = season === "s2"
  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 border-2 border-white/15 bg-space-900/90 p-2 shadow-arcade backdrop-blur-md">
      <span className="hidden px-2 font-pixel text-[0.7rem] uppercase tracking-widest text-mist sm:inline">
        {showingS2 ? (lang === "zh" ? "当前：第二赛季" : "Current: S02") : (lang === "zh" ? "当前：第一赛季" : "Current: S01")}
      </span>
      <Button variant="outline" size="sm" onClick={toggleSeason} className="gap-2 font-pixel text-[0.75rem] uppercase">
        {showingS2 ? <Archive className="size-4" /> : <Rocket className="size-4" />}
        {showingS2 ? (lang === "zh" ? "查看第一季" : "View S01") : (lang === "zh" ? "返回第二季" : "Back to S02")}
      </Button>
    </div>
  )
}

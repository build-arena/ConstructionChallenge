import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCountdown } from "@/hooks/CountdownContext"
import { useI18n } from "@/i18n/I18nContext"
import { LINKS } from "@/config/links"
import { cn } from "@/lib/utils"

function pad(value: number) {
  return String(value).padStart(2, "0")
}

export function Countdown({ className }: { className?: string }) {
  const { t } = useI18n()
  const { days, hours, minutes, seconds } = useCountdown()
  const c = t.countdown

  const units = [
    { value: pad(days), label: c.days },
    { value: pad(hours), label: c.hours },
    { value: pad(minutes), label: c.minutes },
    { value: pad(seconds), label: c.seconds },
  ]

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <p className="mb-3 font-pixel text-[0.85rem] uppercase tracking-widest text-ba-orange [text-shadow:2px_2px_0_rgba(0,73,144,0.75)]">
        {c.kicker}
      </p>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex w-16 flex-col items-center gap-1 border-2 border-crimson-bright bg-space-800/85 px-2 py-3 shadow-inset-arcade sm:w-20"
          >
            <span className="font-pixel text-xl text-paper sm:text-2xl">
              {unit.value}
            </span>
            <span className="font-pixel text-[0.6rem] uppercase tracking-widest text-steel">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      <Button asChild size="lg" className="mt-6 shadow-arcade">
        <a href={LINKS.seasonReminder} target="_blank" rel="noopener noreferrer">
          <Mail className="size-4" />
          {c.remindCta}
        </a>
      </Button>
      <p className="mt-4 text-sm text-steel">{c.remindCaption}</p>
    </div>
  )
}

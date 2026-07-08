import { Gift, Mail } from "lucide-react"
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

      <div className="mt-6 flex w-[min(26rem,calc(100vw-3rem))] flex-col items-center">
        {/* Speech-bubble style callout — the little diamond "tail" below
            points down at the button to make the perk-to-action link
            unmistakable, instead of just butting the two shapes together. */}
        <div className="relative border-2 border-ba-orange-light bg-ba-orange px-4 py-2.5 text-center shadow-arcade-orange">
          <span className="inline-flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5">
            <Gift className="size-4 shrink-0 text-space-900" />
            <span className="text-[0.7rem] font-bold uppercase leading-snug tracking-wide text-space-900 sm:text-[0.8rem]">
              {c.remindPerkPrefix}
            </span>
            <span className="inline-block animate-bounce text-sm font-black uppercase leading-snug tracking-wide text-space-900 [text-shadow:1px_1px_0_rgba(255,255,255,0.5)] sm:text-base">
              {c.remindPerkHighlight}
            </span>
            <span className="text-[0.7rem] font-bold uppercase leading-snug tracking-wide text-space-900 sm:text-[0.8rem]">
              {c.remindPerkSuffix}
            </span>
          </span>
          {/* Clip the tail to only its bottom half so the (borderless) top
              half never paints over — and breaks — the box's own border
              line at the seam. */}
          <span
            aria-hidden
            className="absolute top-full left-1/2 h-3 w-6 -translate-x-1/2 overflow-hidden"
          >
            <span className="mx-auto block size-4 -translate-y-2 rotate-45 border-r-2 border-b-2 border-ba-orange-light bg-ba-orange" />
          </span>
        </div>

        <Button asChild size="lg" className="mt-5 shadow-arcade">
          <a href={LINKS.seasonReminder} target="_blank" rel="noopener noreferrer">
            <Mail className="size-4" />
            {c.remindCta}
          </a>
        </Button>
      </div>
    </div>
  )
}

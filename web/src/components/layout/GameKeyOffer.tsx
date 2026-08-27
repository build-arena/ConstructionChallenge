import { Gift, KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/i18n/I18nContext"
import { GAME_KEY_FORM_OPEN } from "@/config/gameKey"
import { LINKS } from "@/config/links"
import { cn } from "@/lib/utils"

/**
 * Steam-key callout. Two compiled modes, switched by `GAME_KEY_FORM_OPEN`
 * in `config/gameKey.ts`:
 *
 * - `true`: "fill the form, get a key" speech-bubble + Feishu CTA
 *   (the original giveaway funnel, kept for a later season).
 * - `false` (current): season-end notice only, no outbound form.
 */
export function GameKeyOffer({ className }: { className?: string }) {
  return GAME_KEY_FORM_OPEN ? (
    <GameKeyFormOffer className={className} />
  ) : (
    <GameKeyNotice className={className} />
  )
}

/** Survey funnel — speech-bubble perk + form button. Unused while the flag is off. */
function GameKeyFormOffer({ className }: { className?: string }) {
  const { t } = useI18n()
  const g = t.gameKey

  return (
    <div className={cn("flex w-[min(26rem,calc(100vw-3rem))] flex-col items-center", className)}>
      <div className="relative border-2 border-ba-orange-light bg-ba-orange px-4 py-2.5 text-center shadow-arcade-orange">
        <span className="inline-flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5">
          <Gift className="size-4 shrink-0 text-space-900" />
          <span className="text-[0.7rem] font-bold uppercase leading-snug tracking-wide text-space-900 sm:text-[0.8rem]">
            {g.perkPrefix}
          </span>
          <span className="inline-block animate-bounce text-sm font-black uppercase leading-snug tracking-wide text-space-900 [text-shadow:1px_1px_0_rgba(255,255,255,0.5)] sm:text-base">
            {g.perkHighlight}
          </span>
          <span className="text-[0.7rem] font-bold uppercase leading-snug tracking-wide text-space-900 sm:text-[0.8rem]">
            {g.perkSuffix}
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
        <a href={LINKS.gameKeyForm} target="_blank" rel="noopener noreferrer">
          <KeyRound className="size-4" />
          {g.ctaLabel}
        </a>
      </Button>
    </div>
  )
}

/** Season-end perk notice — no form CTA. */
function GameKeyNotice({ className }: { className?: string }) {
  const { t } = useI18n()
  const g = t.gameKey

  return (
    <div className={cn("flex w-[min(32rem,calc(100vw-3rem))] justify-center", className)}>
      <div className="border-2 border-ba-orange-light bg-ba-orange px-4 py-2.5 text-center shadow-arcade-orange">
        <span className="inline-flex items-center justify-center gap-3">
          <Gift className="size-6 shrink-0 text-space-900" strokeWidth={2.25} />
          <span className="text-center text-[0.8rem] font-bold leading-snug tracking-wide text-space-900 sm:text-[0.9rem]">
            {g.notice}
          </span>
        </span>
      </div>
    </div>
  )
}

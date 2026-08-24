import { Rocket } from "lucide-react"
import { Section, SectionHeading } from "@/components/layout/Section"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/i18n/I18nContext"

function SeasonDates({
  dates,
  fromLabel,
  toLabel,
  timezone,
}: {
  dates: string
  fromLabel: string
  toLabel: string
  timezone: string
}) {
  const range = dates.replace(/\s+AOE\s*$/i, "").trim()
  const dateParts = range.split(/\s+[–—]\s+/)

  if (dateParts.length !== 2) {
    throw new Error("Season dates must be '{start} – {end} AOE'.")
  }

  const [start, end] = dateParts

  return (
    <div className="flex w-fit flex-col gap-3">
      <p
        aria-hidden
        className="invisible font-pixel text-sm uppercase tracking-[0.25em]"
      >
        {timezone}
      </p>
      <div className="grid grid-cols-[auto_auto] items-baseline gap-x-4 gap-y-3">
        <span className="font-pixel text-[0.7rem] uppercase tracking-widest text-ba-orange">
          {fromLabel}
        </span>
        <span className="font-pixel text-2xl text-paper">{start}</span>
        <span className="font-pixel text-[0.7rem] uppercase tracking-widest text-ba-orange">
          {toLabel}
        </span>
        <span className="font-pixel text-2xl text-paper">{end}</span>
      </div>
      <p className="text-right font-pixel text-sm uppercase tracking-[0.25em] text-mist">
        {timezone}
      </p>
    </div>
  )
}

function SeasonTitle({ title }: { title: string }) {
  const titleLines = title.split("\n")

  if (titleLines.length !== 2) {
    throw new Error("Season title must contain exactly one newline.")
  }

  const [seasonName, seasonSubtitle] = titleLines

  return (
    <>
      <span className="text-crimson-bright">{seasonName}</span>
      {"\n"}
      {seasonSubtitle}
    </>
  )
}

export function Season() {
  const { t } = useI18n()
  const s = t.season

  return (
    <Section id="season">
      <SectionHeading tag={s.tag} title={<SeasonTitle title={s.title} />} />

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card className="gap-4 p-7">
          <div className="flex items-center gap-3">
            <Rocket className="size-5 text-crimson-bright" />
            <h3 className="font-pixel text-[1.1rem] uppercase tracking-wider text-paper">
              {s.briefTitle}
            </h3>
          </div>
          <p className="text-base leading-relaxed text-cyan">{s.brief}</p>
        </Card>

        <Card className="relative h-full gap-0 p-7">
          <Badge variant="accent" className="absolute top-7 left-7 w-fit">
            {s.datesLabel}
          </Badge>
          <div className="flex flex-1 items-center justify-center">
            <SeasonDates
              dates={s.dates}
              fromLabel={s.datesFrom}
              toLabel={s.datesTo}
              timezone={s.datesTz}
            />
          </div>
        </Card>
      </div>

      <h3 className="mt-12 mb-5 font-pixel text-[1.1rem] uppercase tracking-wider text-ba-orange">
        {s.hooksTitle}
      </h3>
      <div className="grid gap-5 md:grid-cols-3">
        {s.hooks.map((hook) => (
          <Card key={hook.title} className="gap-2 p-6">
            <h4 className="text-lg font-bold uppercase tracking-wide text-white">
              {hook.title}
            </h4>
            <p className="text-sm leading-relaxed text-mist">{hook.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}

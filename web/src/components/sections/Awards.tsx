import { Award, Crown, Sparkles, Coins } from "lucide-react"
import { Section, SectionHeading } from "@/components/layout/Section"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/i18n/I18nContext"

const MAIN_ICONS = [Crown, Award, Sparkles]

export function Awards() {
  const { t } = useI18n()
  const a = t.awards

  return (
    <Section id="awards">
      <SectionHeading tag={a.tag} title={a.title} />

      {/* Prize pool banner */}
      <div className="mb-12 flex flex-col items-center justify-between gap-4 border-2 border-crimson-bright bg-crimson-wine/30 p-6 shadow-[6px_6px_0_rgba(0,73,144,0.7)] sm:flex-row">
        <div className="flex items-center gap-4">
          <Coins className="size-8 shrink-0 text-ba-orange" />
          <div>
            <p className="font-pixel text-[0.55rem] uppercase tracking-widest text-ba-orange">
              {a.pool.label}
            </p>
            <p className="mt-1.5 flex items-baseline gap-2 text-paper">
              <span className="font-pixel text-2xl md:text-3xl">
                {a.pool.amount}
              </span>
              <span className="text-sm text-mist">{a.pool.unit}</span>
            </p>
          </div>
        </div>
      </div>

      <h3 className="mb-5 font-pixel text-[0.7rem] uppercase tracking-wider text-ba-orange">
        {a.mainTitle}
      </h3>
      <div className="grid gap-6 md:grid-cols-3">
        {a.main.map((award, i) => {
          const Icon = MAIN_ICONS[i] ?? Award
          return (
            <Card
              key={award.name}
              className="gap-4 p-7 transition-colors hover:border-crimson-bright"
            >
              <div className="flex items-start justify-between gap-2">
                <Icon className="size-7 text-ba-orange" />
                <span className="font-pixel text-lg text-crimson-bright [text-shadow:2px_2px_0_var(--ba-ink)]">
                  {award.prize}
                </span>
              </div>
              <h4 className="text-lg font-extrabold uppercase tracking-tight text-white">
                {award.name}
              </h4>
              {award.badge ? (
                <Badge variant={i === 0 ? "default" : "secondary"} className="w-fit">
                  {award.badge}
                </Badge>
              ) : null}
              <p className="text-sm leading-relaxed text-mist">{award.body}</p>
            </Card>
          )
        })}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-5 font-pixel text-[0.7rem] uppercase tracking-wider text-ba-orange">
            {a.titlesTitle}
          </h3>
          <div className="space-y-4">
            {a.titles.map((title) => (
              <Card key={title.name} className="gap-1.5 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-base font-bold uppercase tracking-wide text-white">
                    {title.name}
                  </h4>
                  <span className="font-pixel text-sm text-crimson-bright">
                    {title.prize}
                  </span>
                </div>
                <p className="text-sm text-mist">{title.body}</p>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-pixel text-[0.7rem] uppercase tracking-wider text-ba-orange">
            {a.communityTitle}
          </h3>
          <div className="space-y-3">
            {a.community.map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between gap-3 border-2 border-white/10 bg-secondary/30 px-4 py-3"
              >
                <span className="text-sm uppercase tracking-wide text-cyan">
                  {c.name}
                </span>
                <Badge variant="accent">{c.prize}</Badge>
              </div>
            ))}
          </div>
          <p className="mt-6 border-l-2 border-ba-orange bg-secondary/20 p-4 text-xs leading-relaxed text-mist">
            <span className="font-bold uppercase text-paper">
              {a.dedupeTitle}:{" "}
            </span>
            {a.dedupe}
          </p>
        </div>
      </div>
    </Section>
  )
}

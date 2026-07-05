import { Award, Crown, Sparkles, Coins, GraduationCap, CheckCircle2 } from "lucide-react"
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
            <p className="font-pixel text-[1rem] uppercase tracking-widest text-ba-orange">
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

      <h3 className="mb-5 font-pixel text-[1.2rem] uppercase tracking-wider text-ba-orange">
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
        {/* Left: track titles — flex-1 cards fill equal halves of the column height */}
        <div className="flex flex-col">
          <h3 className="mb-5 font-pixel text-[1.2rem] uppercase tracking-wider text-ba-orange">
            {a.titlesTitle}
          </h3>
          <div className="flex flex-1 flex-col gap-3">
            {a.titles.map((title) => (
              <Card key={title.name} className="flex-1 gap-1.5 p-5">
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

        {/* Right: community awards — 4-row grid fills the same column height */}
        <div className="flex flex-col">
          <h3 className="mb-5 font-pixel text-[1.2rem] uppercase tracking-wider text-ba-orange">
            {a.communityTitle}
          </h3>
          <div className="grid flex-1 grid-rows-4 gap-3">
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
        </div>
      </div>

      {/* De-duplication rule — full width below both columns */}
      <p className="mt-4 border-l-2 border-ba-orange bg-secondary/20 p-4 text-sm leading-relaxed text-mist">
        <span className="mb-1 block font-bold uppercase text-paper">
          {a.dedupeTitle}
        </span>
        {a.dedupe}
      </p>

      {/* Academic co-authorship */}
      <div className="mt-10 border-2 border-white/10 bg-secondary/20 p-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <GraduationCap className="size-6 shrink-0 text-ba-orange" />
          <h3 className="font-pixel text-[1.2rem] uppercase tracking-wider text-ba-orange">
            {a.academic.title}
          </h3>
          <Badge variant="accent" className="ml-auto">
            {a.academic.badge}
          </Badge>
        </div>
        <p className="mb-5 text-sm leading-relaxed text-mist">{a.academic.intro}</p>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-paper">
          {a.academic.contributionsTitle}
        </p>
        <ul className="mb-5 space-y-2">
          {a.academic.contributions.map((c) => (
            <li key={c} className="flex items-start gap-2.5 text-sm text-mist">
              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-cyan/70" />
              {c}
            </li>
          ))}
        </ul>
        <p className="border-l-2 border-white/20 pl-3 text-xs leading-relaxed text-mist/70">
          {a.academic.adoptionNote}
        </p>
      </div>
    </Section>
  )
}

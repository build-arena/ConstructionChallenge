import { Award, Crown, Sparkles } from "lucide-react"
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
              <Icon className="size-7 text-ba-orange" />
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-lg font-extrabold uppercase tracking-tight text-white">
                  {award.name}
                </h4>
              </div>
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
                <h4 className="text-base font-bold uppercase tracking-wide text-white">
                  {title.name}
                </h4>
                <p className="text-sm text-mist">{title.body}</p>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-pixel text-[0.7rem] uppercase tracking-wider text-ba-orange">
            {a.communityTitle}
          </h3>
          <div className="flex flex-wrap gap-3">
            {a.community.map((c) => (
              <Badge key={c} variant="outline" className="px-3 py-1.5 text-xs">
                {c}
              </Badge>
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

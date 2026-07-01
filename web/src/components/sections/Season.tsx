import { Rocket } from "lucide-react"
import { Section, SectionHeading } from "@/components/layout/Section"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/i18n/I18nContext"

export function Season() {
  const { t } = useI18n()
  const s = t.season

  return (
    <Section id="season">
      <SectionHeading tag={s.tag} title={s.title} />

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card className="gap-4 p-7">
          <div className="flex items-center gap-3">
            <Rocket className="size-5 text-crimson-bright" />
            <h3 className="font-pixel text-[0.7rem] uppercase tracking-wider text-paper">
              {s.briefTitle}
            </h3>
          </div>
          <p className="text-base leading-relaxed text-cyan">{s.brief}</p>
        </Card>

        <Card className="justify-center gap-4 p-7">
          <Badge variant="accent" className="w-fit">
            {s.datesLabel}
          </Badge>
          <p className="font-pixel text-xl leading-relaxed text-paper">
            {s.dates}
          </p>
        </Card>
      </div>

      <h3 className="mt-12 mb-5 font-pixel text-[0.7rem] uppercase tracking-wider text-ba-orange">
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

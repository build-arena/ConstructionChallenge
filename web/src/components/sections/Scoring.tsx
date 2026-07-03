import { Section, SectionHeading } from "@/components/layout/Section"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/i18n/I18nContext"

function Formula({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-2 border-white/10 bg-space-900/60 p-4">
      <p className="font-pixel text-[0.9rem] uppercase tracking-wider text-ba-orange">
        {label}
      </p>
      <code className="mt-2 block text-sm text-cyan">{value}</code>
    </div>
  )
}

export function Scoring() {
  const { t } = useI18n()
  const s = t.scoring

  return (
    <Section id="scoring">
      <SectionHeading tag={s.tag} title={s.title} intro={s.intro} />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Performance */}
        <Card className="gap-5 p-7">
            <h3 className="font-pixel text-[1.1rem] uppercase tracking-wider text-paper">
              {s.performanceTitle}
            </h3>
          <div className="space-y-4">
            {s.performance.map((item) => (
              <div key={item.name}>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-bold uppercase tracking-wide text-white">
                    {item.name}
                  </span>
                  <Badge variant="default">{item.weight}</Badge>
                </div>
                {/* weight bar */}
                <div className="mt-2 h-2 w-full bg-white/10">
                  <div
                    className="h-full bg-crimson"
                    style={{ width: item.weight }}
                  />
                </div>
                <p className="mt-2 text-sm leading-snug text-mist">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Cost + Final */}
        <div className="flex flex-col gap-6">
          <Card className="gap-5 p-7">
            <h3 className="font-pixel text-[1.1rem] uppercase tracking-wider text-paper">
              {s.costTitle}
            </h3>
            <div className="space-y-3">
              {s.cost.map((item) => (
                <div key={item.name}>
                  <span className="text-sm font-bold uppercase tracking-wide text-ba-orange">
                    {item.name}
                  </span>
                  <p className="mt-1 text-sm leading-snug text-mist">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {s.formulas.map((f) => (
                <Formula key={f.label} label={f.label} value={f.value} />
              ))}
            </div>
          </Card>

          <Card className="gap-4 p-7">
            <h3 className="font-pixel text-[1.1rem] uppercase tracking-wider text-paper">
              {s.finalTitle}
            </h3>
            <div className="space-y-2">
              {s.finals.map((f) => (
                <Formula key={f.label} label={f.label} value={f.value} />
              ))}
            </div>
          </Card>
        </div>
      </div>

      <p className="mt-6 border-l-2 border-ba-orange bg-secondary/20 p-4 text-sm leading-relaxed text-mist">
        {s.tokenNote}
      </p>
    </Section>
  )
}

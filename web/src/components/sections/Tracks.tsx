import { Check, Info } from "lucide-react"
import { Section, SectionHeading } from "@/components/layout/Section"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/i18n/I18nContext"
import { cn } from "@/lib/utils"

type BadgeVariant = "default" | "accent" | "secondary"

export function Tracks() {
  const { t } = useI18n()
  const tr = t.tracks

  return (
    <Section id="tracks">
      <SectionHeading tag={tr.tag} title={tr.title} intro={tr.intro} />

      <div className="grid gap-6 lg:grid-cols-3">
        {tr.items.map((item, i) => {
          const official = i < 2
          return (
            <Card
              key={item.name}
              className={cn(
                "gap-5 p-7 transition-colors",
                official
                  ? "hover:border-crimson-bright"
                  : "border-dashed opacity-95",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-extrabold uppercase tracking-tight text-white">
                  {item.name}
                </h3>
                <Badge variant={item.badgeVariant as BadgeVariant}>
                  {official ? `${tr.coefficientLabel} ${item.badge}` : item.badge}
                </Badge>
              </div>

              <p className="text-sm leading-relaxed text-mist">{item.tagline}</p>

              <div>
                <p className="mb-3 font-pixel text-[1rem] uppercase tracking-wider text-ba-orange">
                  {tr.rulesLabel}
                </p>
                <ul className="space-y-2.5">
                  {item.rules.map((rule, idx) => (
                    <li key={idx} className="flex gap-2.5 text-sm text-cyan">
                      <Check className="mt-0.5 size-4 shrink-0 text-crimson-bright" />
                      <span className="leading-snug">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="mt-8 flex items-start gap-3 border-2 border-white/10 bg-secondary/30 p-5">
        <Info className="mt-0.5 size-5 shrink-0 text-ba-orange" />
        <p className="text-sm leading-relaxed text-mist">{tr.note}</p>
      </div>
    </Section>
  )
}

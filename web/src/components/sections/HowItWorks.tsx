import { ArrowRight, ExternalLink } from "lucide-react"
import { Section, SectionHeading } from "@/components/layout/Section"
import { Button } from "@/components/ui/button"
import { useCountdown } from "@/hooks/CountdownContext"
import { useI18n } from "@/i18n/I18nContext"
import { LINKS } from "@/config/links"

export function HowItWorks() {
  const { t, lang } = useI18n()
  const { hasStarted } = useCountdown()
  const h = t.how

  return (
    <Section id="how">
      <SectionHeading tag={h.tag} title={h.title} intro={h.intro} />

      <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {h.steps.map((step) => (
          <li
            key={step.n}
            className="group flex gap-4 border-2 border-border bg-card p-5 shadow-inset-arcade transition-colors hover:border-crimson-bright"
          >
            <span className="font-pixel text-base text-ba-orange [text-shadow:2px_2px_0_rgba(0,73,144,0.75)]">
              {step.n}
            </span>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-white">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-snug text-mist">
                {step.body}
              </p>
              {step.n === "01" ? (
                <Button asChild size="sm" variant="outline" className="mt-4">
                  <a href={LINKS.repo} target="_blank" rel="noopener noreferrer">
                    {lang === "zh" ? "Fork 代码库" : "Fork repo"}
                    <ExternalLink className="size-3.5" />
                  </a>
                </Button>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      {hasStarted ? (
        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" className="shadow-arcade">
            <a href={LINKS.kaggle} target="_blank" rel="noopener noreferrer">
              {h.cta}
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
      ) : null}
    </Section>
  )
}

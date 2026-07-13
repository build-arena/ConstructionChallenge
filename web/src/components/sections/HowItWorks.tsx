import { ArrowRight, Download, KeyRound } from "lucide-react"
import { Section, SectionHeading } from "@/components/layout/Section"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/i18n/I18nContext"
import { LINKS } from "@/config/links"
import { cn } from "@/lib/utils"

// Each phase gets one accent color, used consistently for its border, its
// label, and its step numbers — Prepare is orange, Compete is crimson (the
// site's primary action color, since this is where the actual build/run
// happens), Submit picks up the Kaggle-blue used by the Kaggle CTA itself.
const PHASE_STYLES: Record<string, { border: string; accent: string }> = {
  prepare: { border: "border-ba-orange", accent: "text-ba-orange" },
  compete: { border: "border-crimson-bright", accent: "text-crimson-bright" },
  submit: { border: "border-kaggle-blue-bright", accent: "text-kaggle-blue-bright" },
}

export function HowItWorks() {
  const { t } = useI18n()
  const h = t.how

  return (
    <Section id="how">
      <SectionHeading tag={h.tag} title={h.title} intro={h.intro} />

      {/* Three phases side by side on wider screens — Prepare / Compete /
          Submit read left-to-right as one timeline, all stretched to the
          same height (grid's default item-stretch) so none looks like an
          afterthought. Submit only has one step, so its Kaggle button lives
          in the leftover space below it, centered rather than pinned flush
          to the bottom. */}
      <div className="grid gap-4 md:grid-cols-3">
        {h.phases.map((phase) => {
          const isCompete = phase.key === "compete"
          const style = PHASE_STYLES[phase.key]
          return (
            <div
              key={phase.key}
              className={cn(
                "flex h-full flex-col border-2 p-5",
                style.border,
                isCompete ? "bg-crimson-wine/15 shadow-arcade" : "bg-card/60 shadow-inset-arcade",
              )}
            >
              <p className={cn("mb-4 font-pixel text-[0.8rem] uppercase tracking-widest", style.accent)}>
                {phase.label}
              </p>
              <div className="flex flex-col gap-4">
                {phase.steps.map((step) => (
                  <div
                    key={step.n}
                    className="flex min-h-40 shrink-0 gap-4 border-2 border-border bg-card p-4 shadow-inset-arcade transition-colors hover:border-crimson-bright"
                  >
                    <span
                      className={cn(
                        "shrink-0 font-pixel text-base [text-shadow:2px_2px_0_rgba(0,73,144,0.75)]",
                        style.accent,
                      )}
                    >
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
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="mt-3 border-ba-orange text-ba-orange hover:bg-ba-orange hover:text-space-900"
                        >
                          <a href={LINKS.gameKeyForm} target="_blank" rel="noopener noreferrer">
                            <KeyRound className="size-3.5" />
                            {h.gameKeyCta}
                          </a>
                        </Button>
                      ) : null}
                      {step.n === "02" ? (
                        <Button asChild size="sm" variant="outline" className="mt-3">
                          <a href={LINKS.repo} target="_blank" rel="noopener noreferrer">
                            <Download className="size-3.5" />
                            {h.repoCta}
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>

              {phase.key === "submit" ? (
                <div className="flex flex-1 items-center justify-center">
                  <Button
                    asChild
                    variant="kaggle"
                    size="lg"
                    className="h-[4rem] w-full justify-center text-lg shadow-arcade-kaggle"
                  >
                    <a href={LINKS.kaggle} target="_blank" rel="noopener noreferrer">
                      {h.cta}
                      <ArrowRight className="size-5" />
                    </a>
                  </Button>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </Section>
  )
}

import { ArrowRight, FileText, Check } from "lucide-react"
import { Section, SectionHeading } from "@/components/layout/Section"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/i18n/I18nContext"
import { LINKS } from "@/config/links"

function FileList({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="gap-3 p-6">
      <h3 className="flex items-center gap-2 font-pixel text-[1rem] uppercase tracking-wider text-paper">
        <FileText className="size-4 text-crimson-bright" />
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm text-cyan">
            <Check className="mt-0.5 size-4 shrink-0 text-ba-orange" />
            <span className="leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

function ValidationAnswer({ text }: { text: string }) {
  return (
    <>
      {text.split(/(REJECTED)/g).map((part, index) =>
        part === "REJECTED" ? (
          <span
            key={`${part}-${index}`}
            className="font-extrabold text-crimson-bright [text-shadow:2px_2px_0_var(--ba-ink)]"
          >
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}

export function Submission() {
  const { t } = useI18n()
  const sb = t.submission

  return (
    <Section id="submission">
      <SectionHeading tag={sb.tag} title={sb.title} intro={sb.intro} />

      <div className="grid gap-6 lg:grid-cols-3">
        <FileList title={sb.deliverablesTitle} items={sb.deliverables} />
        <FileList title={sb.manifestTitle} items={sb.manifestFields} />
        <div className="flex flex-col gap-6">
          <FileList title={sb.humanTitle} items={sb.humanDeliverables} />
          <Card className="gap-3 p-6">
            <h3 className="font-pixel text-[1rem] uppercase tracking-wider text-paper">
              {sb.reviewTitle}
            </h3>
            <ul className="space-y-2">
              {sb.review.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-mist">
                  <span className="text-crimson-bright">›</span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <h3 className="mt-12 mb-5 font-pixel text-[1.2rem] uppercase tracking-wider text-ba-orange">
        {sb.validationTitle}
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        {sb.validations.map((v, i) => (
          <Card key={v.q} className="gap-3 border-crimson-bright/60 bg-crimson-wine/15 p-5">
            <div className="flex items-center gap-3">
              <span className="font-pixel text-sm text-crimson-bright">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="text-base font-extrabold uppercase tracking-wide text-paper">
                {v.q}
              </h4>
            </div>
            <p className="text-sm leading-relaxed text-cyan">
              <ValidationAnswer text={v.a} />
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button asChild variant="outline" size="lg">
          <a href={LINKS.repo} target="_blank" rel="noopener noreferrer">
            {sb.ctaRules}
          </a>
        </Button>
        <Button asChild variant="kaggle" size="lg" className="shadow-arcade-kaggle">
          <a href={LINKS.kaggle} target="_blank" rel="noopener noreferrer">
            {sb.ctaSubmit}
            <ArrowRight className="size-4" />
          </a>
        </Button>
      </div>
    </Section>
  )
}

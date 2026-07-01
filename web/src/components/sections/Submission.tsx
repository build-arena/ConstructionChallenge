import { ArrowRight, FileText, Check } from "lucide-react"
import { Section, SectionHeading } from "@/components/layout/Section"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useI18n } from "@/i18n/I18nContext"
import { LINKS } from "@/config/links"

function FileList({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="gap-3 p-6">
      <h3 className="flex items-center gap-2 font-pixel text-[0.62rem] uppercase tracking-wider text-paper">
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
            <h3 className="font-pixel text-[0.62rem] uppercase tracking-wider text-paper">
              {sb.reviewTitle}
            </h3>
            <ul className="space-y-2">
              {sb.review.map((item) => (
                <li key={item} className="flex gap-2.5 text-xs text-mist">
                  <span className="text-crimson-bright">›</span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <h3 className="mt-12 mb-5 font-pixel text-[0.7rem] uppercase tracking-wider text-ba-orange">
        {sb.validationTitle}
      </h3>
      <Accordion type="single" collapsible className="space-y-3">
        {sb.validations.map((v, i) => (
          <AccordionItem key={v.q} value={`v-${i}`}>
            <AccordionTrigger>{v.q}</AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed text-cyan">{v.a}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button asChild variant="outline" size="lg">
          <a href={LINKS.repo} target="_blank" rel="noopener noreferrer">
            {sb.ctaRules}
          </a>
        </Button>
        <Button asChild size="lg" className="shadow-arcade">
          <a href={LINKS.kaggle} target="_blank" rel="noopener noreferrer">
            {sb.ctaSubmit}
            <ArrowRight className="size-4" />
          </a>
        </Button>
      </div>
    </Section>
  )
}

import { Section, SectionHeading } from "@/components/layout/Section"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useI18n } from "@/i18n/I18nContext"

export function Faq() {
  const { t } = useI18n()
  const f = t.faq

  return (
    <Section id="faq">
      <SectionHeading tag={f.tag} title={f.title} />

      <Accordion type="single" collapsible className="space-y-3">
        {f.items.map((item, i) => (
          <AccordionItem key={item.q} value={`faq-${i}`}>
            <AccordionTrigger className="text-base md:text-lg">
              {item.q}
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-base leading-relaxed text-cyan">{item.a}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  )
}

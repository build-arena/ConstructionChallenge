import { Section, SectionHeading } from "@/components/layout/Section"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useI18n } from "@/i18n/I18nContext"
import { GAME_KEY_FORM_OPEN } from "@/config/gameKey"

export function Faq() {
  const { t } = useI18n()
  const f = t.faq
  const items = [
    ...f.items,
    GAME_KEY_FORM_OPEN ? f.steamKeyForm : f.steamKeyClosed,
  ]

  return (
    <Section id="faq">
      <SectionHeading tag={f.tag} title={f.title} />

      <Accordion type="single" collapsible className="space-y-3">
        {items.map((item, i) => (
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

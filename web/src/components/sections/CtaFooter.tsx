import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/i18n/I18nContext"
import { LINKS } from "@/config/links"

export function CtaFooter() {
  const { t } = useI18n()
  const c = t.cta

  return (
    <footer id="join" className="relative scroll-mt-20">
      <div className="border-t-2 border-white/10 py-20 md:py-28">
        <div className="mx-auto w-[min(1180px,calc(100%-48px))] text-center">
          <h2 className="text-shadow-arcade mx-auto max-w-3xl text-3xl font-extrabold uppercase leading-tight tracking-tight text-paper md:text-5xl">
            {c.title}
          </h2>

          <div className="mt-9 flex justify-center">
            <Button asChild size="lg" className="shadow-arcade">
              <a href={LINKS.kaggle} target="_blank" rel="noopener noreferrer">
                {c.button}
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>

          <div className="mt-14">
            <p className="mb-4 font-pixel text-[0.55rem] uppercase tracking-widest text-steel">
              {c.linksTitle}
            </p>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {c.links.map((link) => (
                <a
                  key={link.label}
                  href={LINKS[link.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm uppercase tracking-wide text-mist transition-colors hover:text-crimson-bright"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <p className="mt-12 text-xs text-steel">{c.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

import { ArrowRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/i18n/I18nContext"
import { LINKS } from "@/config/links"

export function Hero() {
  const { t, lang } = useI18n()
  const h = t.hero
  const mdFile = lang === "zh" ? "/BuildArena-Challenge-ZH.md" : "/BuildArena-Challenge-EN.md"

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24"
    >
      <div className="mx-auto flex w-[min(1100px,calc(100%-48px))] flex-col items-center py-16 text-center">
        <span className="mb-6 inline-block border-2 border-crimson-bright bg-crimson-wine/90 px-4 py-2 font-pixel text-[1rem] uppercase tracking-wider shadow-[0_0_24px_rgba(200,16,46,0.42),6px_6px_0_rgba(0,73,144,0.8)]">
          {h.kicker}
        </span>

        <h1 className="text-shadow-arcade max-w-[980px] font-arcade-title text-[clamp(4rem,9vw,8.8rem)] font-bold uppercase leading-[0.92] tracking-[-0.06em] text-paper">
          {h.title}
        </h1>

        <p className={`mt-6 inline-block border-y-2 border-white/15 px-5 py-2 font-pixel text-[1rem] uppercase tracking-widest text-ba-orange md:text-[1.35rem]${lang === "zh" ? " font-bold" : ""}`}>
          {h.season}
        </p>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist md:text-lg">
          {h.subtitle}
        </p>

        <div
          data-slot="hero-slogan"
          className="my-9 w-[min(620px,100%)] border-[3px] border-mist bg-space-900/85 px-6 py-5 shadow-[10px_10px_0_#c8102e,inset_-5px_-5px_0_rgba(0,0,0,0.48)]"
        >
          <p className="my-1 text-xl text-crimson-bright line-through decoration-[3px] md:text-2xl">
            ✗ {h.sloganWrong}
          </p>
          <p className="my-1 text-xl text-white [text-shadow:0_0_16px_rgba(200,16,46,0.65)] md:text-2xl">
            ✓ {h.sloganRight}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="shadow-arcade">
            <a href={LINKS.kaggle} target="_blank" rel="noopener noreferrer">
              {h.ctaPrimary}
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#how">{h.ctaSecondary}</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={mdFile} download>
              <Download className="size-4" />
              {h.ctaDownload}
            </a>
          </Button>
        </div>

        <p className="mt-8 font-pixel text-[0.85rem] uppercase tracking-wider text-steel">
          {h.meta}
        </p>
      </div>
    </section>
  )
}

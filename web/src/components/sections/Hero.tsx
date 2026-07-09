import { useState } from "react"
import { ArrowRight, ChevronDown, Download, ExternalLink, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GameKeyOffer } from "@/components/layout/GameKeyOffer"
import { useI18n } from "@/i18n/I18nContext"
import { LINKS } from "@/config/links"

// Besiege: The Broken Beyond — official launch trailer (bilibili BVID).
const TRAILER_BVID = "BV1psjo63EYw"
const TRAILER_EMBED_SRC = `https://player.bilibili.com/player.html?bvid=${TRAILER_BVID}&autoplay=1&danmaku=0&high_quality=1`
const TRAILER_WATCH_URL = `https://www.bilibili.com/video/${TRAILER_BVID}`

export function Hero() {
  const { t, lang } = useI18n()
  const h = t.hero
  const f = t.flow
  const [videoLoaded, setVideoLoaded] = useState(false)
  const mdFile =
    import.meta.env.BASE_URL +
    (lang === "zh" ? "BuildArena-Challenge-ZH.md" : "BuildArena-Challenge-EN.md")
  const posterSrc = import.meta.env.BASE_URL + "site_assets/besiege-trailer-poster.jpg"

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24"
    >
      <div className="mx-auto flex w-[min(1100px,calc(100%-48px))] flex-col items-center py-16 text-center">
        {/* <Button
          asChild
          size="sm"
          className="mb-6 h-auto border-crimson-bright bg-crimson-wine/90 px-4 py-2 font-pixel text-[1rem] uppercase tracking-wider shadow-[0_0_24px_rgba(200,16,46,0.42),6px_6px_0_rgba(0,73,144,0.8)]"
        >
          <a href={LINKS.repo} target="_blank" rel="noopener noreferrer">
            {h.kicker}
            <ExternalLink className="size-3.5" />
          </a>
        </Button> */}

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

        {/* Two-step funnel: claim the free key first, then join on Kaggle.
            Order and size make the sequence and priority unambiguous —
            "How it works" / "Download MD" are demoted to plain links below. */}
        <div className="mt-2 flex flex-col items-center">
          <span className="font-pixel text-[0.8rem] uppercase tracking-widest text-ba-orange">
            {f.step1}
          </span>
          <GameKeyOffer className="mt-3" />

          <ChevronDown className="mt-4 size-6 text-ba-orange" />

          <span className="mt-2 font-pixel text-[0.8rem] uppercase tracking-widest text-ba-orange">
            {f.step2}
          </span>
          <Button asChild size="lg" className="mt-3 h-14 px-8 text-lg shadow-arcade">
            <a href={LINKS.kaggle} target="_blank" rel="noopener noreferrer">
              {h.ctaPrimary}
              <ArrowRight className="size-5" />
            </a>
          </Button>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm uppercase tracking-wide text-mist">
            <a href="#how" className="transition-colors hover:text-crimson-bright">
              {h.ctaSecondary}
            </a>
            <span aria-hidden className="text-steel">
              ·
            </span>
            <a
              href={mdFile}
              download
              className="inline-flex items-center gap-1 transition-colors hover:text-crimson-bright"
            >
              <Download className="size-3.5" />
              {h.ctaDownload}
            </a>
          </div>
        </div>

        <div className="mt-10 w-[min(640px,100%)]">
          <div className="relative aspect-video w-full overflow-hidden border-2 border-crimson-bright shadow-arcade">
            {videoLoaded ? (
              <iframe
                src={TRAILER_EMBED_SRC}
                title={h.video.caption}
                className="absolute inset-0 size-full"
                allow="autoplay; fullscreen; encrypted-media"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setVideoLoaded(true)}
                aria-label={h.video.playLabel}
                className="group absolute inset-0 size-full cursor-pointer"
              >
                <img
                  src={posterSrc}
                  alt=""
                  className="size-full object-cover"
                  loading="lazy"
                />
                <span className="absolute inset-0 bg-space-900/45 transition-colors group-hover:bg-space-900/25" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex size-14 items-center justify-center border-2 border-crimson-bright bg-crimson/90 shadow-arcade transition-transform group-hover:scale-110 md:size-16">
                    <Play className="size-6 fill-paper text-paper md:size-7" />
                  </span>
                </span>
              </button>
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs uppercase tracking-widest text-steel">
            <span>{h.video.caption}</span>
            <a
              href={TRAILER_WATCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-cyan transition-colors hover:text-crimson-bright"
            >
              {h.video.watchOn}
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>

        <p className="mt-8 font-pixel text-[0.85rem] uppercase tracking-wider text-steel">
          {h.meta}
        </p>
      </div>
    </section>
  )
}

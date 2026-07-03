import { ArrowRight, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/i18n/I18nContext"
import { LINKS } from "@/config/links"

export function CtaFooter() {
  const { t } = useI18n()
  const c = t.cta
  const o = t.organizers

  return (
    <footer id="join" className="relative scroll-mt-20">
      {/* ── Big CTA ── */}
      <div className="py-20 md:py-28">
        <div className="mx-auto w-[min(1180px,calc(100%-48px))] text-center">
          <h2 className="text-shadow-arcade mx-auto max-w-[980px] font-arcade-title text-[clamp(4rem,9vw,8.8rem)] font-bold uppercase leading-[0.92] tracking-[-0.06em] text-paper">
            {c.title}
          </h2>

          <div className="mt-16 flex justify-center">
            <Button asChild size="lg" className="shadow-arcade h-16 px-10 text-xl">
              <a href={LINKS.kaggle} target="_blank" rel="noopener noreferrer">
                {c.button}
                <ArrowRight className="size-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* ── Organizers & Sponsors ── */}
      <div
        id="organizers"
        className="scroll-mt-20 py-14"
      >
        <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
          {/* Section tag */}
          <p className="mb-8 font-pixel text-[0.9rem] uppercase tracking-widest text-ba-orange [text-shadow:2px_2px_0_rgba(0,73,144,0.75)]">
            {o.tag}
          </p>

          {/* ── Organizer: school (left) | lab (right) ── */}
          <p className="mb-4 font-pixel text-[0.85rem] uppercase tracking-widest text-steel">
            {o.organizerTitle}
          </p>
          <div className="mb-8 grid gap-px border-2 border-white/10 sm:grid-cols-2">
            {/* Left — Westlake University */}
            <div className="flex flex-col gap-4 bg-secondary/20 p-6">
              <a
                href={o.organizer.schoolWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block opacity-90 transition-opacity hover:opacity-100"
                aria-label={o.organizer.affiliation}
              >
                <img
                  src={o.organizer.schoolLogo}
                  alt={o.organizer.affiliation}
                  className="h-12 w-auto object-contain"
                />
              </a>
              <p className="text-sm font-bold uppercase tracking-wide text-white">
                {o.organizer.affiliation}
              </p>
              <p className="text-xs leading-relaxed text-mist">
                {o.organizer.schoolIntro}
              </p>
              <a
                href={o.organizer.schoolWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-cyan transition-colors hover:text-crimson-bright"
              >
                <ExternalLink className="size-3" />
                {o.organizer.schoolWebsite}
              </a>
            </div>

            {/* Right — Lab */}
            <div className="flex flex-col gap-4 bg-secondary/20 p-6">
              <a
                href={o.organizer.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block opacity-90 transition-opacity hover:opacity-100"
                aria-label={o.organizer.name}
              >
                <img
                  src={o.organizer.labLogo}
                  alt={o.organizer.name}
                  className="h-14 w-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </a>
              <p className="text-sm font-bold uppercase tracking-wide text-white">
                {o.organizer.name}
              </p>
              <p className="text-xs leading-relaxed text-mist">
                {o.organizer.intro}
              </p>
              <a
                href={o.organizer.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-cyan transition-colors hover:text-crimson-bright"
              >
                <ExternalLink className="size-3" />
                {o.organizer.website}
              </a>
            </div>
          </div>

          {/* ── Sponsors: full-width ── */}
          <p className="mb-4 font-pixel text-[0.85rem] uppercase tracking-widest text-steel">
            {o.sponsorTitle}
          </p>
          <div className="mb-8 flex flex-col gap-px border-2 border-white/10">
            {o.sponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex flex-col gap-3 bg-secondary/20 p-6 sm:flex-row sm:items-center sm:gap-10"
              >
                {/* Text logo */}
                <div className="shrink-0">
                  <span className="font-pixel text-3xl font-black uppercase tracking-tight text-white leading-none">
                    {sponsor.name}
                  </span>
                  <p className="mt-1 text-[0.7rem] uppercase tracking-widest text-cyan">
                    {sponsor.tagline}
                  </p>
                </div>
                <div className="h-px w-full bg-white/10 sm:h-10 sm:w-px sm:shrink-0" />
                <p className="text-sm leading-relaxed text-mist">
                  {sponsor.intro}
                </p>
                {sponsor.website ? (
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto shrink-0 inline-flex items-center gap-1.5 text-xs text-cyan transition-colors hover:text-crimson-bright"
                  >
                    <ExternalLink className="size-3" />
                    {sponsor.website}
                  </a>
                ) : null}
              </div>
            ))}
          </div>

          {/* ── Sponsorship CTA ── */}
          <div className="flex flex-col gap-4 border-2 border-ba-orange/30 bg-ba-orange/5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-1 font-pixel text-[0.85rem] uppercase tracking-wider text-ba-orange">
                {o.sponsorshipTitle}
              </p>
              <p className="text-xs leading-relaxed text-mist whitespace-pre-line">
                {o.sponsorshipBody}
              </p>
            </div>
            <div className="shrink-0">
              {o.sponsorshipEmail ? (
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="border-ba-orange text-ba-orange hover:bg-ba-orange hover:text-space-900"
                >
                  <a href={`mailto:${o.sponsorshipEmail}`}>
                    <Mail className="size-3.5" />
                    {o.sponsorshipCta}
                  </a>
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-ba-orange/40 text-ba-orange/40 cursor-default"
                  disabled
                >
                  <Mail className="size-3.5" />
                  {o.sponsorshipCta}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Links ── */}
      <div className="py-8">
        <div className="mx-auto w-[min(1180px,calc(100%-48px))] text-center">
          <p className="mb-4 font-pixel text-[0.9rem] uppercase tracking-widest text-steel">
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
      </div>

      {/* ── Copyright ── */}
      <div className="border-t-2 border-white/10 py-5">
        <p className="mx-auto w-[min(1180px,calc(100%-48px))] text-xs text-steel">
          {c.copyright}
        </p>
      </div>
    </footer>
  )
}

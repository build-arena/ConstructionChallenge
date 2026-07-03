import { Mail, ExternalLink } from "lucide-react"
import { Section, SectionHeading } from "@/components/layout/Section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/i18n/I18nContext"

export function Organizers() {
  const { t } = useI18n()
  const o = t.organizers

  return (
    <Section id="organizers">
      <SectionHeading tag={o.tag} title={o.title} />

      {/* Organizer */}
      <div className="mb-14">
        <h3 className="mb-6 font-pixel text-[1.2rem] uppercase tracking-wider text-ba-orange">
          {o.organizerTitle}
        </h3>

        <div className="border-2 border-white/10 bg-secondary/20 p-7">
          {/* Logos row */}
          <div className="mb-6 flex flex-wrap items-center gap-8">
            {/* Lab logo — white knockout */}
            <a
              href={o.organizer.website}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 opacity-90 transition-opacity hover:opacity-100"
              aria-label={o.organizer.name}
            >
              <img
                src={o.organizer.labLogo}
                alt={o.organizer.name}
                className="h-14 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </a>

            <div className="h-10 w-px bg-white/15 hidden sm:block" />

            {/* School logo — already white-friendly */}
            <a
              href={o.organizer.schoolWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 opacity-90 transition-opacity hover:opacity-100"
              aria-label={o.organizer.affiliation}
            >
              <img
                src={o.organizer.schoolLogo}
                alt={o.organizer.affiliation}
                className="h-10 w-auto object-contain"
              />
            </a>
          </div>

          {/* Name + badge */}
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <h4 className="text-lg font-extrabold uppercase tracking-tight text-white">
              {o.organizer.name}
            </h4>
            <Badge variant="secondary">{o.organizer.affiliation}</Badge>
          </div>

          <p className="mb-4 text-sm leading-relaxed text-mist">
            {o.organizer.intro}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={o.organizer.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-cyan transition-colors hover:text-crimson-bright"
            >
              <ExternalLink className="size-3.5" />
              {o.organizer.website}
            </a>
          </div>
        </div>
      </div>

      {/* Sponsors */}
      <div className="mb-14">
        <h3 className="mb-6 font-pixel text-[1.2rem] uppercase tracking-wider text-ba-orange">
          {o.sponsorTitle}
        </h3>

        <div className="grid gap-5 sm:grid-cols-2">
          {o.sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex flex-col gap-5 border-2 border-white/10 bg-secondary/20 p-7 transition-colors hover:border-white/25"
            >
              {/* Logo area: text logo if no image */}
              {sponsor.logo ? (
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <div className="flex items-baseline gap-0.5">
                  <span className="font-pixel text-2xl font-black uppercase tracking-tight text-white leading-none">
                    {sponsor.name}
                  </span>
                </div>
              )}

              <p className="text-xs uppercase tracking-widest text-cyan">
                {sponsor.tagline}
              </p>

              <p className="flex-1 text-sm leading-relaxed text-mist">
                {sponsor.intro}
              </p>

              {sponsor.website ? (
                <a
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-cyan transition-colors hover:text-crimson-bright"
                >
                  <ExternalLink className="size-3.5" />
                  {sponsor.website}
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Sponsorship CTA */}
      <div className="border-2 border-ba-orange/40 bg-ba-orange/5 p-7">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <Mail className="size-5 text-ba-orange" />
              <h3 className="font-pixel text-[1.1rem] uppercase tracking-wider text-ba-orange">
                {o.sponsorshipTitle}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-mist whitespace-pre-line">
              {o.sponsorshipBody}
            </p>
          </div>
          <div className="shrink-0">
            {o.sponsorshipEmail ? (
              <Button
                asChild
                size="default"
                variant="outline"
                className="border-ba-orange text-ba-orange hover:bg-ba-orange hover:text-space-900"
              >
                <a href={`mailto:${o.sponsorshipEmail}`}>
                  <Mail className="size-4" />
                  {o.sponsorshipCta}
                </a>
              </Button>
            ) : (
              <Button
                size="default"
                variant="outline"
                className="border-ba-orange/50 text-ba-orange/50 cursor-default"
                disabled
              >
                <Mail className="size-4" />
                {o.sponsorshipCta}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}

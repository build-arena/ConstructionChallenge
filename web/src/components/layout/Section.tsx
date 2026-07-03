import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Section({
  id,
  className,
  children,
}: {
  id: string
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-20 md:py-28", className)}
    >
      <div className="mx-auto w-[min(1180px,calc(100%-48px))] md:w-[min(1180px,calc(100%-72px))]">
        {children}
      </div>
    </section>
  )
}

export function SectionHeading({
  tag,
  title,
  intro,
}: {
  tag: string
  title: ReactNode
  intro?: string
}) {
  return (
    <div className="mb-12 max-w-3xl">
      <span className="font-pixel text-[1rem] uppercase tracking-widest text-ba-orange [text-shadow:2px_2px_0_rgba(0,73,144,0.75)]">
        {tag}
      </span>
      <h2 className="mt-4 text-3xl font-extrabold uppercase leading-tight tracking-tight text-paper md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-base leading-relaxed text-mist">{intro}</p>
      ) : null}
    </div>
  )
}

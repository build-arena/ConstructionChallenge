import { useEffect, useState } from "react"
import { ExternalLink, Languages, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { useI18n } from "@/i18n/I18nContext"
import { LINKS } from "@/config/links"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { id: "season", key: "season" },
  { id: "tracks", key: "tracks" },
  { id: "how", key: "how" },
  { id: "scoring", key: "scoring" },
  { id: "awards", key: "awards" },
  { id: "leaderboard", key: "leaderboard" },
  { id: "faq", key: "faq" },
  { id: "organizers", key: "organizers" },
] as const

export function NavBar() {
  const { t, toggle } = useI18n()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b-2 border-white/15 bg-space-900/85 backdrop-blur-md"
          : "border-b-2 border-transparent",
      )}
    >
      <div className="mx-auto flex h-20 w-[min(1180px,calc(100%-40px))] items-center gap-6">
        <Button
          asChild
          size="sm"
          variant="ghost"
          className="h-auto shrink-0 px-0 font-pixel text-[1rem] uppercase tracking-wider text-paper hover:bg-transparent hover:text-paper"
        >
          <a href={LINKS.repo} target="_blank" rel="noopener noreferrer">
            BuildArena<span className="text-crimson-bright">_2.0</span>
            <ExternalLink className="size-3.5 text-mist" />
          </a>
        </Button>

        <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="min-w-[5rem] whitespace-nowrap px-3 py-2 text-center text-sm uppercase tracking-wide text-mist transition-colors hover:text-crimson-bright"
            >
              {t.nav[item.key]}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <Button
            size="default"
            variant="outline"
            onClick={toggle}
            className="min-w-[5.5rem] justify-center border-ba-blue-light bg-ba-blue/85 px-4 font-pixel text-[0.85rem] tracking-wider text-cyan shadow-[4px_4px_0_rgba(200,16,46,0.85),inset_-3px_-3px_0_rgba(0,0,0,0.45)] hover:border-cyan hover:bg-ba-blue-light hover:text-paper hover:shadow-[0_0_22px_rgba(32,211,216,0.5),4px_4px_0_rgba(200,16,46,0.85)]"
            aria-label="Switch language"
          >
            <Languages className="size-5 shrink-0" />
            {t.nav.switchTo}
          </Button>

          <Button asChild size="default" variant="outline" className="hidden min-w-[7rem] justify-center sm:flex">
            <a href={LINKS.paperhomepage} target="_blank" rel="noopener noreferrer">
              {t.nav.jumpMain}
              <ExternalLink className="size-4 shrink-0" />
            </a>
          </Button>

          <Button asChild size="default" className="hidden min-w-[9rem] justify-center md:flex">
            <a href={LINKS.kaggle} target="_blank" rel="noopener noreferrer">
              {t.nav.join}
            </a>
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="size-11 lg:hidden"
                aria-label={t.nav.menu}
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-space-800">
              <SheetHeader>
                <SheetTitle className="font-pixel text-[1rem] uppercase">
                  {t.nav.menu}
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {NAV_ITEMS.map((item) => (
                  <SheetClose asChild key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="border-b border-white/10 py-4 text-base uppercase tracking-wide text-mist transition-colors hover:text-crimson-bright"
                    >
                      {t.nav[item.key]}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2 p-4">
                <Button asChild>
                  <a href={LINKS.kaggle} target="_blank" rel="noopener noreferrer">
                    {t.nav.join}
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href={LINKS.icml2026paper}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.nav.jumpMain}
                    <ExternalLink className="size-3.5" />
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

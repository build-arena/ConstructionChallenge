import { useEffect, useState } from "react"
import { ExternalLink, Menu } from "lucide-react"
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
  { id: "leaderboard", key: "leaderboard" },
  { id: "awards", key: "awards" },
  { id: "faq", key: "faq" },
] as const

export function NavBar() {
  const { t } = useI18n()
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
      <div className="mx-auto flex h-16 w-[min(1180px,calc(100%-32px))] items-center justify-between gap-4">
        <a
          href="#home"
          className="font-pixel text-[0.62rem] uppercase tracking-wider text-paper"
        >
          BuildArena<span className="text-crimson-bright">_2.0</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="px-2.5 py-1.5 text-xs uppercase tracking-wide text-mist transition-colors hover:text-crimson-bright"
            >
              {t.nav[item.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Language switch temporarily hidden — defaulting to English.
              Re-enable by restoring this button and `toggle` from useI18n().
          <Button
            size="sm"
            variant="ghost"
            onClick={toggle}
            className="text-mist"
            aria-label="Switch language"
          >
            <Languages className="size-4" />
            {t.nav.switchTo}
          </Button> */}

          <Button asChild size="sm" variant="outline" className="hidden sm:flex">
            <a href={LINKS.icmlPaper} target="_blank" rel="noopener noreferrer">
              {t.nav.jumpMain}
              <ExternalLink className="size-3.5" />
            </a>
          </Button>

          <Button asChild size="sm" className="hidden md:flex">
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
                className="lg:hidden"
                aria-label={t.nav.menu}
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-space-800">
              <SheetHeader>
                <SheetTitle className="font-pixel text-[0.62rem] uppercase">
                  {t.nav.menu}
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {NAV_ITEMS.map((item) => (
                  <SheetClose asChild key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="border-b border-white/10 py-3 text-sm uppercase tracking-wide text-mist transition-colors hover:text-crimson-bright"
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
                    href={LINKS.icmlPaper}
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

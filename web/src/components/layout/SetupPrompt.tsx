import { useRef, useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LINKS } from "@/config/links"
import { useI18n } from "@/i18n/I18nContext"
import { setupContent } from "@/i18n/season2"

export function SetupPrompt() {
  const { lang } = useI18n()
  const copy = setupContent[lang]
  const prompt = copy.prompt.replace("{repo}", LINKS.repo)
  const field = useRef<HTMLTextAreaElement>(null)
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle")

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt)
      setStatus("copied")
    } catch {
      field.current?.focus()
      field.current?.select()
      setStatus("failed")
    }
  }

  return (
    <div id="setup" className="mt-12 w-full max-w-3xl scroll-mt-28 border-2 border-ba-orange bg-card/80 p-5 text-left shadow-arcade-orange sm:p-7">
      <h2 className="text-xl font-bold uppercase tracking-tight text-paper sm:text-2xl">{copy.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-mist">{copy.intro}</p>
      <textarea
        ref={field}
        aria-label={copy.promptLabel}
        readOnly
        value={prompt}
        spellCheck={false}
        className="mt-5 block h-64 w-full resize-y border-2 border-white/15 bg-space-900 p-4 text-sm leading-relaxed text-cyan outline-none focus-visible:border-ba-orange sm:h-56"
      />
      <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Button onClick={copyPrompt} size="lg">
          {status === "copied" ? <Check /> : <Copy />}
          {copy.copy}
        </Button>
        <p role="status" aria-live="polite" className="text-xs leading-relaxed text-mist">
          {status === "copied" ? copy.copied : status === "failed" ? copy.copyFailed : ""}
        </p>
      </div>
    </div>
  )
}

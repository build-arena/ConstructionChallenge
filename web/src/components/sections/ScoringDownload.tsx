import { Download, FileCode2 } from "lucide-react"
import { useI18n } from "@/i18n/I18nContext"
import bundle from "@/data/s01-scoring-download.json"

const url = (path: string) => `${import.meta.env.BASE_URL}${path}`
const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crimson-bright"

export function ScoringDownload() {
  const { t } = useI18n()
  const c = t.season1Results.download
  return <section id="s01-scoring-download" aria-label={c.title} className="mb-10 border-2 border-border border-l-cyan/60 bg-card p-5 shadow-inset-arcade sm:p-6">
    <div className="flex flex-wrap items-start justify-between gap-5">
      <div className="max-w-2xl">
        <h3 className="flex items-center gap-3 text-lg font-bold uppercase"><FileCode2 className="size-5 shrink-0 text-ba-orange" aria-hidden="true" />{c.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-mist">{c.description}</p>
      </div>
      <a href={url(bundle.file)} download className={`inline-flex min-h-12 items-center gap-3 border-2 border-cyan/60 bg-space-900 px-4 py-3 text-sm font-bold uppercase text-cyan hover:border-cyan hover:text-paper ${focus}`}>
        <Download className="size-4" aria-hidden="true" />{c.button}<span className="font-normal text-mist">ZIP · {Math.ceil(bundle.bytes / 1024)} KiB</span>
      </a>
    </div>
    <p className="mt-4 text-xs leading-relaxed text-mist">{c.profiles}</p>
    <p className="mt-2 text-xs leading-relaxed text-mist">{c.scope}</p>
    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-xs text-cyan">
      <a href={url(bundle.guide)} download className={`underline underline-offset-4 ${focus}`}>{c.guide}</a>
      <a href={url(bundle.checksum)} download className={`underline underline-offset-4 ${focus}`}>{c.checksum}</a>
    </div>
    <details className="mt-4 border-t border-border pt-4 text-xs text-mist">
      <summary className={`min-h-8 cursor-pointer font-bold uppercase text-paper ${focus}`}>{c.instructions}</summary>
      <p className="mt-3 leading-relaxed">{c.setup}</p>
      <pre className="my-3 overflow-x-auto border border-border bg-space-900 p-3 text-cyan"><code>{`python -m pip install -r requirements.txt\npython score.py --help\npython score.py --input MY_INPUTS`}</code></pre>
      <p className="leading-relaxed">{c.output}</p>
      <p className="mt-3 break-all leading-relaxed"><span className="text-paper">SHA-256: </span><code>{bundle.sha256}</code></p>
    </details>
  </section>
}

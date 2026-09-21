import { useState } from "react"
import { ExternalLink, Trophy } from "lucide-react"
import { Section } from "@/components/layout/Section"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useI18n } from "@/i18n/I18nContext"
import results from "@/data/s01-results.json"

const MODES = ["overall", "Autopilot", "Copilot", "human"] as const
type Mode = typeof MODES[number]
const fixed = (value: number) => value.toFixed(3)
const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crimson-bright"

export function S01Leaderboard() {
  const { t, lang } = useI18n()
  const c = t.season1Results
  const [mode, setMode] = useState<Mode>("overall")
  const [query, setQuery] = useState("")
  const count = (value: number) => value.toLocaleString(lang === "zh" ? "zh-CN" : "en-US")
  const needle = query.trim().toLocaleLowerCase()
  const visible = results.ranking.filter(row =>
    (mode === "overall" || row.mode === mode) &&
    `${row.team} ${row.title} ${row.submissionId}`.toLocaleLowerCase().includes(needle))
  const metrics = [
    [c.submissions, results.summary.submissions], [c.scored, results.summary.scored],
    [c.teams, results.summary.teams], [c.zeroTeams, results.summary.zeroTeams],
  ] as const
  const headers = [c.rank, c.entry, c.final, c.orbit, c.speed, c.integrity, c.mechanical, c.token, c.error, c.mode]

  return (
    <Section id="leaderboard">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-3xl">
          <span className="font-pixel text-base uppercase tracking-widest text-ba-orange">{c.tag}</span>
          <h2 className="mt-4 text-3xl font-extrabold uppercase tracking-tight md:text-4xl lg:text-5xl">{c.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-mist">{c.intro}</p>
        </div>
        <Badge variant="accent">{c.status}</Badge>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {metrics.map(([label, value]) => (
          <div key={label} className="border-2 border-border bg-card p-4 shadow-inset-arcade">
            <p className="text-xs uppercase tracking-wide text-mist">{label}</p>
            <p className="mt-2 font-pixel text-2xl text-ba-orange">{value}</p>
          </div>
        ))}
      </div>

      <div className="mb-10">
        <h3 className="flex items-center gap-3 text-xl font-bold uppercase"><Trophy className="size-5 text-ba-orange" aria-hidden="true" />{c.awards}</h3>
        <p className="mt-2 text-sm text-mist">{c.awardsNote}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.awards.map(award => (
            <Card key={award.award} className="gap-3 border-t-crimson-bright p-5 shadow-inset-arcade">
              <p className="text-xs font-bold uppercase tracking-wide text-ba-orange">{c.awardNames[award.award as keyof typeof c.awardNames]}</p>
              <p className="break-words text-lg font-bold text-paper">{award.team}</p>
              <a href={award.url} target="_blank" rel="noopener noreferrer" className={`text-sm leading-relaxed text-cyan underline decoration-cyan/40 underline-offset-4 hover:text-paper ${focus}`}>
                {award.title} <ExternalLink className="inline size-3.5" aria-hidden="true" />
              </a>
            </Card>
          ))}
        </div>
      </div>

      <Tabs value={mode} onValueChange={value => setMode(value as Mode)}>
        <TabsList className="max-w-full flex-wrap justify-start">
          {MODES.map(key => (
            <TabsTrigger key={key} value={key} className="min-h-10">
              {key === "overall" ? c.overall : key === "human" ? c.human : key}
            </TabsTrigger>
          ))}
        </TabsList>
        {MODES.filter(key => key !== "human").map(key => (
          <TabsContent key={key} value={key}>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
              <label className="block w-full max-w-md text-xs uppercase tracking-wide text-mist">
                {c.search}
                <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={c.searchPlaceholder}
                  className={`mt-2 block min-h-11 w-full border-2 border-border bg-space-900 px-3 py-2 text-base normal-case text-paper placeholder:text-mist/60 ${focus}`} />
              </label>
              <p role="status" className="text-sm text-mist">{c.showing}: <span className="font-bold text-paper">{visible.length} / {results.summary.teams}</span></p>
            </div>
            <p className="mb-3 text-xs leading-relaxed text-mist">{c.rankNote}</p>
            <div className="border-2 border-border bg-card shadow-inset-arcade">
              <Table containerLabel={c.title} className="min-w-[1240px] tabular-nums">
                <TableHeader><TableRow className="bg-secondary/40 hover:bg-secondary/40">
                  {headers.map(label => <TableHead scope="col" key={label} className="py-4">{label}</TableHead>)}
                </TableRow></TableHeader>
                <TableBody>
                  {visible.map(row => (
                    <TableRow key={row.submissionId} data-submission-id={row.submissionId} className={row.rank <= 3 ? "bg-crimson/5" : ""}>
                      <TableCell className="align-top pt-5 font-pixel text-lg text-ba-orange">{String(row.rank).padStart(2, "0")}</TableCell>
                      <TableCell className="w-64 min-w-60 max-w-72 whitespace-normal py-5">
                        <p className="font-bold text-paper">{row.team}</p>
                        <a href={row.url} target="_blank" rel="noopener noreferrer" className={`mt-1 block text-xs leading-relaxed text-cyan underline decoration-cyan/30 underline-offset-4 hover:text-paper ${focus}`}>
                          {row.title} <ExternalLink className="inline size-3" aria-hidden="true" />
                        </a>
                      </TableCell>
                      <TableCell>
                        <p className="font-bold text-paper">{fixed(row.finalScore)}{row.rawFinalScore < 0 && <span className="ml-1 text-xs font-normal text-mist">({fixed(row.rawFinalScore)})</span>}</p>
                        <p className="mt-1 text-xs text-mist">{c.performance} {fixed(row.performance)}</p>
                        <p className="text-xs text-mist">{c.deductions} −{fixed(row.cost)}</p>
                      </TableCell>
                      <TableCell>{fixed(row.orbit)}</TableCell>
                      <TableCell>{fixed(row.speed)}</TableCell>
                      <TableCell>{fixed(row.integrity)}</TableCell>
                      <TableCell><p>−{fixed(row.mechanicalDeduction)}</p><p className="mt-1 text-xs text-mist">{count(row.blockPoints)} {c.blockPoints}</p></TableCell>
                      <TableCell><p>−{fixed(row.tokenDeduction)}</p><p className="mt-1 text-xs text-mist">{count(row.tokens)} {c.tokens}</p></TableCell>
                      <TableCell><p>−{fixed(row.errorDeduction)}</p><p className="mt-1 text-xs text-mist">{row.failed}/{row.operations} {c.failed}</p></TableCell>
                      <TableCell><Badge variant={row.mode === "Autopilot" ? "secondary" : "outline"}>{row.mode}</Badge><p className="mt-1 text-xs text-mist">×{row.mode === "Autopilot" ? "1.15" : "1"}</p></TableCell>
                    </TableRow>
                  ))}
                  {visible.length === 0 && <TableRow><TableCell colSpan={headers.length} className="whitespace-normal p-8 text-center text-mist">{c.empty}</TableCell></TableRow>}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
        <TabsContent value="human">
          <p className="mb-5 text-sm text-mist">{c.humanNote}</p>
          <div className="grid gap-4 md:grid-cols-2">
            {results.exhibition.map(row => <Card key={row.submissionId} className="gap-3 p-5">
              <Badge variant="outline">{c.showcase}</Badge><p className="font-bold">{row.team}</p>
              <a href={row.url} target="_blank" rel="noopener noreferrer" className={`text-sm text-cyan underline underline-offset-4 ${focus}`}>{row.title} <ExternalLink className="inline size-3" aria-hidden="true" /></a>
            </Card>)}
          </div>
        </TabsContent>
      </Tabs>

      <details className="mt-6 border-2 border-border bg-secondary/20 p-5 text-sm text-mist">
        <summary className={`cursor-pointer font-bold uppercase text-paper ${focus}`}>{c.method}</summary>
        <div className="mt-4 space-y-3 leading-relaxed">
          <p>{c.formula}</p><p>{c.negative}</p><p>{c.selection}</p>
          <p>{c.references}: {count(results.references.machine)} {c.machineReference} / {count(results.references.tokens)} {c.tokenReference}.</p>
          <p>{c.weights}</p>
        </div>
      </details>
    </Section>
  )
}

import { Fragment, lazy, Suspense, useState } from "react"
import { ChevronDown, ExternalLink, Orbit, Trophy } from "lucide-react"
import { ReplayBoundary } from "@/components/replay/ReplayBoundary"
import { ScoringDownload } from "./ScoringDownload"
import { Section } from "@/components/layout/Section"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useI18n } from "@/i18n/I18nContext"
import results from "@/data/s01-results.json"
import communityAwards from "@/data/s01-community-awards.json"

const FlightReplay = lazy(() => import("@/components/replay/FlightReplay"))

const MODES = ["overall", "Autopilot", "Copilot", "human"] as const
type Mode = typeof MODES[number]
const fixed = (value: number) => value.toFixed(3)
const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crimson-bright"

export function S01Leaderboard() {
  const { t, lang } = useI18n()
  const c = t.season1Results
  const [mode, setMode] = useState<Mode>("overall")
  const [query, setQuery] = useState("")
  const [openFlight, setOpenFlight] = useState<string | null>(null)
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

      {[
        { title: c.awards, note: c.awardsNote, awards: results.awards },
        { title: c.communityAwards, note: c.communityAwardsNote, awards: communityAwards },
      ].map(group => (
      <div key={group.title} className="mb-10">
        <h3 className="flex items-center gap-3 text-xl font-bold uppercase"><Trophy className="size-5 text-ba-orange" aria-hidden="true" />{group.title}</h3>
        <p className="mt-2 text-sm text-mist">{group.note}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {group.awards.map(award => (
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
      ))}

      <ScoringDownload />

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
                    <Fragment key={row.submissionId}>
                    <TableRow data-submission-id={row.submissionId} className={row.rank <= 3 ? "bg-crimson/5" : ""}>
                      <TableCell className="align-top pt-5 font-pixel text-lg text-ba-orange">{String(row.rank).padStart(2, "0")}</TableCell>
                      <TableCell className="w-64 min-w-60 max-w-72 whitespace-normal py-5">
                        <p className="font-bold text-paper">{row.team}</p>
                        <a href={row.url} target="_blank" rel="noopener noreferrer" className={`mt-1 block text-xs leading-relaxed text-cyan underline decoration-cyan/30 underline-offset-4 hover:text-paper ${focus}`}>
                          {row.title} <ExternalLink className="inline size-3" aria-hidden="true" />
                        </a>
                        <button type="button" aria-expanded={openFlight === row.submissionId} aria-controls={`flight-${key}-${row.submissionId.split("_")[0]}`}
                          onClick={() => setOpenFlight(openFlight === row.submissionId ? null : row.submissionId)}
                          className={`mt-3 inline-flex min-h-10 items-center gap-2 border border-cyan/30 bg-space-900/60 px-3 text-[11px] uppercase tracking-wide text-cyan hover:border-cyan hover:text-paper ${focus}`}>
                          <Orbit className="size-3.5" aria-hidden="true" />{openFlight === row.submissionId ? c.replay.close : c.replay.open}<ChevronDown className={`size-3 ${openFlight === row.submissionId ? "rotate-180" : ""}`} aria-hidden="true" />
                        </button>
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
                    {openFlight === row.submissionId && <TableRow className="hover:bg-transparent">
                      <TableCell colSpan={headers.length} className="whitespace-normal p-0">
                        <div id={`flight-${key}-${row.submissionId.split("_")[0]}`} className="sticky left-0 w-[calc(100vw-52px)] max-w-full p-3 md:w-[min(1180px,calc(100vw-76px))] md:p-5">
                          <ReplayBoundary message={c.replay.moduleError}><Suspense fallback={<p role="status" className="p-8 text-sm text-mist">{c.replay.loading}</p>}>
                            <FlightReplay submissionId={row.submissionId} title={row.title} />
                          </Suspense></ReplayBoundary>
                        </div>
                      </TableCell>
                    </TableRow>}
                    </Fragment>
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
              <button className={`min-h-10 border border-cyan/30 px-3 text-left text-xs uppercase text-cyan ${focus}`} aria-expanded={openFlight === row.submissionId}
                onClick={() => setOpenFlight(openFlight === row.submissionId ? null : row.submissionId)}>{openFlight === row.submissionId ? c.replay.close : c.replay.open}</button>
              {openFlight === row.submissionId && <ReplayBoundary message={c.replay.moduleError}><Suspense fallback={<p role="status">{c.replay.loading}</p>}><FlightReplay submissionId={row.submissionId} title={row.title} /></Suspense></ReplayBoundary>}
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

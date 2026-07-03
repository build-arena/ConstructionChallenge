import { Trophy } from "lucide-react"
import { Section } from "@/components/layout/Section"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useI18n } from "@/i18n/I18nContext"

function LeaderboardTable() {
  const { t } = useI18n()
  const lb = t.leaderboard

  return (
    <div className="border-2 border-border bg-card shadow-inset-arcade">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {lb.columns.map((col, i) => (
              <TableHead key={i} className={i === 0 ? "pl-4" : ""}>
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Skeleton placeholder rows — the structure is live and ready for data. */}
          {Array.from({ length: 5 }).map((_, r) => (
            <TableRow key={r} className="hover:bg-transparent">
              {lb.columns.map((_, c) => (
                <TableCell key={c} className={c === 0 ? "pl-4" : ""}>
                  <div className="h-3 w-full max-w-[64px] bg-white/5" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Empty-state overlay message */}
      <div className="flex flex-col items-center gap-3 border-t-2 border-border px-6 py-12 text-center">
        <Trophy className="size-8 text-ba-orange" />
        <h3 className="font-pixel text-[1.1rem] uppercase tracking-wider text-paper">
          {lb.emptyTitle}
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-mist">
          {lb.emptyBody}
        </p>
      </div>
    </div>
  )
}

export function Leaderboard() {
  const { t } = useI18n()
  const lb = t.leaderboard

  return (
    <Section id="leaderboard">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-3xl">
          <span className="font-pixel text-[1rem] uppercase tracking-widest text-ba-orange [text-shadow:2px_2px_0_rgba(0,73,144,0.75)]">
            {lb.tag}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold uppercase leading-tight tracking-tight text-paper md:text-4xl lg:text-5xl">
            {lb.title}
          </h2>
        </div>
        <Badge variant="accent" className="animate-pulse">
          {lb.status}
        </Badge>
      </div>

      <Tabs defaultValue="overall">
        <TabsList className="mb-5 flex-wrap">
          <TabsTrigger value="overall">{lb.tabs.overall}</TabsTrigger>
          <TabsTrigger value="autopilot">{lb.tabs.autopilot}</TabsTrigger>
          <TabsTrigger value="copilot">{lb.tabs.copilot}</TabsTrigger>
          <TabsTrigger value="human">{lb.tabs.human}</TabsTrigger>
        </TabsList>

        {(["overall", "autopilot", "copilot", "human"] as const).map((key) => (
          <TabsContent key={key} value={key}>
            <LeaderboardTable />
          </TabsContent>
        ))}
      </Tabs>
    </Section>
  )
}

// Import only public leaderboard fields; never publish raw histories or local paths.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

const [resultPath, indexPath] = process.argv.slice(2)
if (!resultPath || !indexPath) throw new Error('Usage: node scripts/import-s01-results.mjs <result.json> <projects_index.json>')
const bytes = readFileSync(resultPath)
const result = JSON.parse(bytes)
const projects = new Map(JSON.parse(readFileSync(indexPath, 'utf8')).map(p => [p.directory, p]))
const audits = new Map(result.audits.map(a => [a.submission_id, a]))
const teams = new Set()
const ids = new Set()
const metricNames = ['final_score', 'raw_final_score', 'performance_score', 'cost_penalty', 'orbit_progress', 'speed_points', 'structure_integrity', 'mechanical_deduction_points', 'token_deduction_points', 'error_deduction_points', 'machine_cost_points', 'cleaned_token_count', 'failed_operation_count', 'full_history_operation_count']
function project(id) {
  const p = projects.get(id)
  if (!p) throw new Error(`No project for ${id}`)
  const url = new URL(p.writeup_url)
  if (url.protocol !== 'https:' || url.hostname !== 'www.kaggle.com' || !url.pathname.includes('/writeups/')) throw new Error(`Invalid project URL: ${id}`)
  return { submissionId: id, team: p.team_name, title: p.project_title, url: url.href }
}
const ranking = result.ranking.map((r, i) => {
  if (r.rank !== i + 1 || teams.has(r.team_id) || ids.has(r.submission_id)) throw new Error('Ranking must have contiguous ranks and one entry per team')
  if (!['review', 'accepted'].includes(audits.get(r.submission_id)?.compliance_status) || !r.effective_final_submission || !r.auto_technical_passed) throw new Error(`Ineligible ranked entry: ${r.submission_id}`)
  if (!['Autopilot', 'Copilot'].includes(r.detected_mode)) throw new Error('Invalid build mode')
  for (const key of metricNames) if (!Number.isFinite(r[key])) throw new Error(`Missing metric: ${r.submission_id}/${key}`)
  if (Math.abs(r.final_score - Math.max(0, r.raw_final_score)) > 1e-9) throw new Error('Invalid clamped score')
  teams.add(r.team_id); ids.add(r.submission_id)
  return { ...project(r.submission_id), team: r.team_id, rank: r.rank, mode: r.detected_mode,
    finalScore: r.final_score, rawFinalScore: r.raw_final_score, performance: r.performance_score,
    cost: r.cost_penalty, orbit: result.config.performance.max_score * result.config.performance.orbit_weight * r.orbit_progress,
    speed: r.speed_points, integrity: result.config.performance.max_score * result.config.performance.integrity_weight * r.structure_integrity,
    mechanicalDeduction: r.mechanical_deduction_points, tokenDeduction: r.token_deduction_points,
    errorDeduction: r.error_deduction_points, blockPoints: r.machine_cost_points,
    tokens: r.cleaned_token_count, failed: r.failed_operation_count, operations: r.full_history_operation_count }
})
if (ranking.length !== result.summary.teams || result.team_local.length !== result.summary.scored) throw new Error('Summary mismatch')
const awardedTeams = new Set()
const awards = result.awards.filter(a => a.cash_winner).map(a => {
  const w = a.cash_winner
  if (!ids.has(w.submission_id) || awardedTeams.has(w.team_id)) throw new Error('Award recipients must be ranked and mutually exclusive')
  awardedTeams.add(w.team_id)
  return { award: a.award, ...project(w.submission_id), team: w.team_id }
})
const data = {
  season: 'S01', scoreVersion: result.config.score_version,
  sourceSha256: createHash('sha256').update(bytes).digest('hex'),
  status: 'pending_review',
  summary: { submissions: result.summary.submissions, scored: result.summary.scored, teams: ranking.length, zeroTeams: ranking.filter(r => r.finalScore === 0).length },
  references: { machine: result.config.cost.block_reference, tokens: result.config.cost.token_reference },
  ranking, awards,
  exhibition: result.audits.filter(a => a.compliance_status === 'exhibition').map(a => project(a.submission_id)),
}
const target = new URL('../src/data/s01-results.json', import.meta.url)
mkdirSync(fileURLToPath(new URL('../src/data/', import.meta.url)), { recursive: true })
writeFileSync(target, JSON.stringify(data, null, 2) + '\n')
console.log(`Imported ${ranking.length} teams, ${awards.length} technical awards, ${data.exhibition.length} exhibition entries.`)

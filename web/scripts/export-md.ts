/**
 * export-md.ts
 * Generate English and Chinese Markdown docs from the site's i18n content.
 * Run: npm run export:md
 * Output: BuildArena-Challenge-EN.md / BuildArena-Challenge-ZH.md (repo root)
 */

import { writeFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

// ── import site data ──────────────────────────────────────────────────────────
// The "import type { LinkKey }" inside content.ts is erased at runtime by tsx,
// so the @/ alias is never resolved at runtime — only relative imports matter here.
import { content } from "../src/i18n/content.js"
import { LINKS } from "../src/config/links.js"

const __dirname = dirname(fileURLToPath(import.meta.url))
// Output to web/public/ so Vite copies them into dist/ and they are served at /
const PUBLIC = resolve(__dirname, "../public")

// ── helpers ───────────────────────────────────────────────────────────────────
const link = (label: string, url: string) => `[${label}](${url})`
const badge = (label: string, color: string, url: string, logo?: string) => {
  const logoParam = logo ? `&logo=${logo}` : ""
  const encoded = encodeURIComponent(label).replace(/-/g, "--")
  return `[![${label}](https://img.shields.io/badge/${encoded}-${color}?style=flat-square${logoParam})](${url})`
}
const hr = () => `\n---\n`
const h1 = (s: string) => `# ${s}\n`
const h2 = (s: string) => `## ${s}\n`
const h3 = (s: string) => `### ${s}\n`
const blockquote = (s: string) => s.split("\n").map(l => `> ${l}`).join("\n")
const table = (headers: string[], rows: string[][]) => {
  const sep = headers.map(() => "---")
  const fmt = (r: string[]) => `| ${r.join(" | ")} |`
  return [fmt(headers), fmt(sep), ...rows.map(fmt)].join("\n")
}
const details = (summary: string, body: string) =>
  `<details>\n<summary><strong>${summary}</strong></summary>\n\n${body}\n\n</details>`

// ── English document ──────────────────────────────────────────────────────────
function buildEnglish(): string {
  const c = content.en
  const sections: string[] = []

  // ── Header ────────────────────────────────────────────────────────────────
  sections.push(`<div align="center">

${h1(`🚀 ${c.hero.kicker} — ${c.hero.title}`)}
**${c.hero.season}**

\`${c.hero.meta}\`

${badge("Join on Kaggle", "20BEFF", LINKS.kaggle, "kaggle")}  ${badge("Code Repo", "181717", LINKS.repo, "github")}  ${badge("ICML 2026 Paper", "B31B1B", LINKS.icml2026paper)}  ${badge("Besiege", "1b2838", LINKS.besiege, "steam")}

*${c.hero.subtitle}*

</div>
`)

  // ── Table of Contents ──────────────────────────────────────────────────────
  sections.push(hr())
  sections.push(h2("📋 Table of Contents"))
  sections.push(`- [Season Brief](#-season-1--to-infinity-and-beyond)
- [Tracks](#️-tracks)
- [How it Works](#-how-it-works)
- [Scoring](#-scoring)
- [Submission & Validation](#-submission--validation)
- [Awards](#-awards)
- [FAQ](#-faq)
- [Links](#-links)
`)

  // ── Season ────────────────────────────────────────────────────────────────
  sections.push(hr())
  sections.push(h2(`🪐 ${c.season.title.replace("\n", " — ")}`))
  sections.push(`${blockquote(`**${c.season.datesLabel}:** ${c.season.dates}`)}\n`)
  sections.push(h3(c.season.briefTitle))
  sections.push(c.season.brief.replace(/\n/g, "\n\n") + "\n")
  sections.push(h3(c.season.hooksTitle))
  sections.push(table(
    ["Theme", "Meaning"],
    c.season.hooks.map(h => [`**${h.title}**`, h.body]),
  ) + "\n")

  // ── Tracks ────────────────────────────────────────────────────────────────
  sections.push(hr())
  sections.push(h2(`🛤️ ${c.tracks.title}`))
  sections.push(`${blockquote(c.tracks.intro)}\n`)

  for (const item of c.tracks.items) {
    const trackName = item.name.replace("\n", " ")
    sections.push(h3(`${trackName} \`${item.badge}\``))
    sections.push(`${blockquote(item.tagline.replace("\n", " "))}\n`)
    sections.push(`**${c.tracks.rulesLabel}:**`)
    sections.push(item.rules.map((r, i) => `${i + 1}. ${r}`).join("\n") + "\n")
    sections.push("")
  }

  sections.push(`${blockquote(c.tracks.note.replace("\n", "\n> "))}\n`)

  // ── How it Works ──────────────────────────────────────────────────────────
  sections.push(hr())
  sections.push(h2(`🔧 ${c.how.title}`))
  sections.push(`${blockquote(c.how.intro.replace("\n", " "))}\n`)
  sections.push(table(
    ["Step", "Title", "Description"],
    c.how.steps.map(s => [`**${s.n}**`, s.title, s.body]),
  ) + "\n")

  // ── Scoring ───────────────────────────────────────────────────────────────
  sections.push(hr())
  sections.push(h2(`📊 ${c.scoring.title}`))
  sections.push(`${blockquote(c.scoring.intro)}\n`)

  sections.push(h3(c.scoring.performanceTitle))
  sections.push(table(
    ["Metric", "Weight", "Description"],
    c.scoring.performance.map(p => [
      `**${p.name}**`,
      `\`${p.weight}\``,
      p.body.replace(/\n/g, " "),
    ]),
  ) + "\n")

  sections.push(h3(c.scoring.costTitle))
  sections.push(table(
    ["Cost Type", "Description"],
    c.scoring.cost.map(c => [`**${c.name}**`, c.body]),
  ) + "\n")

  sections.push(h3(`${c.scoring.formulaLabel}s`))
  sections.push("```")
  sections.push(`# ${c.scoring.formulas[0].label}`)
  sections.push(c.scoring.formulas[0].value)
  sections.push("")
  sections.push(`# ${c.scoring.formulas[1].label}`)
  sections.push(c.scoring.formulas[1].value)
  sections.push("")
  sections.push(`# ${c.scoring.finals[0].label}`)
  sections.push(c.scoring.finals[0].value)
  sections.push(`# ${c.scoring.finals[1].label}`)
  sections.push(c.scoring.finals[1].value)
  sections.push(`# ${c.scoring.finals[2].label}`)
  sections.push(c.scoring.finals[2].value)
  sections.push("```\n")
  sections.push(`${blockquote(`**Token cost:** ${c.scoring.tokenNote.replace(/\n/g, " ")}`)}\n`)

  // ── Submission ────────────────────────────────────────────────────────────
  sections.push(hr())
  sections.push(h2(`📦 ${c.submission.title}`))
  sections.push(`${blockquote(c.submission.intro.replace("\n", " "))}\n`)

  sections.push(h3(c.submission.deliverablesTitle.replace("\n", " ")))
  sections.push(c.submission.deliverables.map(d => `- [ ] \`${d}\``).join("\n") + "\n")

  sections.push(h3(c.submission.manifestTitle))
  sections.push(c.submission.manifestFields.map(f => `- ${f}`).join("\n") + "\n")

  sections.push(h3(c.submission.humanTitle))
  sections.push(c.submission.humanDeliverables.map(d => `- [ ] ${d}`).join("\n") + "\n")

  sections.push(h3(c.submission.validationTitle))
  sections.push(table(
    ["Check", "Rule"],
    c.submission.validations.map(v => [
      `**${v.q}**`,
      v.a.replace(/\n/g, " "),
    ]),
  ) + "\n")

  sections.push(h3(c.submission.reviewTitle))
  sections.push(c.submission.review.map((r, i) => `${i + 1}. ${r}`).join("\n") + "\n")

  // ── Awards ────────────────────────────────────────────────────────────────
  sections.push(hr())
  sections.push(h2(`🏆 ${c.awards.title}`))
  sections.push(`**${c.awards.pool.label}: ${c.awards.pool.amount} ${c.awards.pool.unit}**\n`)

  sections.push(h3(c.awards.mainTitle))
  sections.push(table(
    ["Award", "Condition", "Prize"],
    c.awards.main.map(a => [
      `**${a.name}**`,
      a.body.replace(/\n/g, " "),
      `**${a.prize}**`,
    ]),
  ) + "\n")

  sections.push(h3(c.awards.titlesTitle))
  sections.push(table(
    ["Title", "Condition", "Prize"],
    c.awards.titles.map(t => [`**${t.name}**`, t.body, `**${t.prize}**`]),
  ) + "\n")

  sections.push(h3(c.awards.communityTitle))
  sections.push(table(
    ["Award", "Prize"],
    c.awards.community.map(a => [`**${a.name}**`, a.prize]),
  ) + "\n")

  sections.push(`${blockquote(`**${c.awards.dedupeTitle}:** ${c.awards.dedupe.replace(/\n/g, " ")}`)}\n`)

  // ── FAQ ───────────────────────────────────────────────────────────────────
  sections.push(hr())
  sections.push(h2(`❓ ${c.faq.title}`))
  sections.push(c.faq.items.map(f => details(f.q, f.a.replace(/\n/g, "\n\n"))).join("\n\n") + "\n")

  // ── Links ─────────────────────────────────────────────────────────────────
  sections.push(hr())
  sections.push(h2(`🔗 ${c.cta.linksTitle}`))
  sections.push(table(
    ["Resource", "URL"],
    [
      ["🏁 **Join on Kaggle**", LINKS.kaggle],
      ["💻 **Code Repository**", LINKS.repo],
      ["🏠 **BuildArena Homepage**", LINKS.paperhomepage],
      ["🎮 **Besiege (Steam)**", LINKS.besiege],
      ["📚 **ICML 2026 Paper**", LINKS.icml2026paper],
      ["✉️ **Contact**", LINKS.email],
    ],
  ) + "\n")

  sections.push(hr())
  sections.push(`<div align="center">\n\n${c.cta.copyright}\n\n</div>\n`)

  return sections.join("\n")
}

// ── Chinese document ──────────────────────────────────────────────────────────
function buildChinese(): string {
  const c = content.zh
  const en = content.en
  const sections: string[] = []

  // ── Header ────────────────────────────────────────────────────────────────
  sections.push(`<div align="center">

${h1(`🚀 ${c.hero.kicker} — ${c.hero.title}`)}
**${c.hero.season}**

\`${c.hero.meta}\`

${badge("前往 Kaggle 参赛", "20BEFF", LINKS.kaggle, "kaggle")}  ${badge("代码库", "181717", LINKS.repo, "github")}  ${badge("ICML 2026 论文", "B31B1B", LINKS.icml2026paper)}  ${badge("Besiege", "1b2838", LINKS.besiege, "steam")}

*${c.hero.subtitle}*

</div>
`)

  // ── Table of Contents ──────────────────────────────────────────────────────
  sections.push(hr())
  sections.push(h2("📋 目录"))
  sections.push(`- [赛季简介](#-赛季-1飞向宇宙浩瀚无垠)
- [赛道](#️-赛道)
- [参与流程](#-参与流程)
- [评分规则](#-评分规则)
- [提交与校验](#-提交与校验)
- [奖项](#-奖项)
- [常见问题](#-常见问题)
- [链接](#-链接)
`)

  // ── Season ────────────────────────────────────────────────────────────────
  sections.push(hr())
  sections.push(h2(`🪐 ${c.season.title.replace("\n", " — ")}`))
  sections.push(`${blockquote(`**${c.season.datesLabel}：**${c.season.dates}`)}\n`)
  sections.push(h3(c.season.briefTitle))
  sections.push(c.season.brief.replace(/\n/g, "\n\n") + "\n")
  sections.push(h3(c.season.hooksTitle))
  sections.push(table(
    ["主题", "含义"],
    c.season.hooks.map(h => [`**${h.title}**`, h.body]),
  ) + "\n")

  // ── Tracks ────────────────────────────────────────────────────────────────
  sections.push(hr())
  sections.push(h2(`🛤️ ${c.tracks.title}`))
  sections.push(`${blockquote(c.tracks.intro)}\n`)

  for (const item of c.tracks.items) {
    const trackName = item.name.replace("\n", " ")
    sections.push(h3(`${trackName} \`${item.badge}\``))
    sections.push(`${blockquote(item.tagline.replace("\n", " "))}\n`)
    sections.push(`**${c.tracks.rulesLabel}：**`)
    sections.push(item.rules.map((r, i) => `${i + 1}. ${r}`).join("\n") + "\n")
    sections.push("")
  }

  sections.push(`${blockquote(c.tracks.note.replace("\n", "\n> "))}\n`)

  // ── How it Works ──────────────────────────────────────────────────────────
  sections.push(hr())
  sections.push(h2(`🔧 ${c.how.title}`))
  sections.push(`${blockquote(c.how.intro.replace("\n", " "))}\n`)
  sections.push(table(
    ["步骤", "标题", "说明"],
    c.how.steps.map(s => [`**${s.n}**`, s.title, s.body]),
  ) + "\n")

  // ── Scoring ───────────────────────────────────────────────────────────────
  sections.push(hr())
  sections.push(h2(`📊 ${c.scoring.title}`))
  sections.push(`${blockquote(c.scoring.intro)}\n`)

  sections.push(h3(c.scoring.performanceTitle))
  sections.push(table(
    ["指标", "权重", "说明"],
    c.scoring.performance.map(p => [
      `**${p.name}**`,
      `\`${p.weight}\``,
      p.body.replace(/\n/g, " "),
    ]),
  ) + "\n")

  sections.push(h3(c.scoring.costTitle))
  sections.push(table(
    ["成本类型", "说明"],
    c.scoring.cost.map(cc => [`**${cc.name}**`, cc.body]),
  ) + "\n")

  sections.push(h3(c.scoring.formulaLabel))
  sections.push("```")
  sections.push(`# ${en.scoring.formulas[0].label}`)
  sections.push(c.scoring.formulas[0].value)
  sections.push("")
  sections.push(`# ${en.scoring.formulas[1].label}`)
  sections.push(c.scoring.formulas[1].value)
  sections.push("")
  sections.push(`# ${c.scoring.finals[0].label}`)
  sections.push(c.scoring.finals[0].value)
  sections.push(`# ${c.scoring.finals[1].label}`)
  sections.push(c.scoring.finals[1].value)
  sections.push(`# ${c.scoring.finals[2].label}`)
  sections.push(c.scoring.finals[2].value)
  sections.push("```\n")
  sections.push(`${blockquote(`**Token 统计：** ${c.scoring.tokenNote.replace(/\n/g, " ")}`)}\n`)

  // ── Submission ────────────────────────────────────────────────────────────
  sections.push(hr())
  sections.push(h2(`📦 ${c.submission.title}`))
  sections.push(`${blockquote(c.submission.intro.replace("\n", " "))}\n`)

  sections.push(h3(c.submission.deliverablesTitle.replace("\n", " ")))
  sections.push(c.submission.deliverables.map(d => `- [ ] \`${d}\``).join("\n") + "\n")

  sections.push(h3(c.submission.manifestTitle))
  sections.push(c.submission.manifestFields.map(f => `- ${f}`).join("\n") + "\n")

  sections.push(h3(c.submission.humanTitle))
  sections.push(c.submission.humanDeliverables.map(d => `- [ ] ${d}`).join("\n") + "\n")

  sections.push(h3(c.submission.validationTitle))
  sections.push(table(
    ["检查项", "规则"],
    c.submission.validations.map(v => [
      `**${v.q}**`,
      v.a.replace(/\n/g, " "),
    ]),
  ) + "\n")

  sections.push(h3(c.submission.reviewTitle))
  sections.push(c.submission.review.map((r, i) => `${i + 1}. ${r}`).join("\n") + "\n")

  // ── Awards ────────────────────────────────────────────────────────────────
  sections.push(hr())
  sections.push(h2(`🏆 ${c.awards.title}`))
  sections.push(`**${c.awards.pool.label}：${c.awards.pool.amount} ${c.awards.pool.unit}**\n`)

  sections.push(h3(c.awards.mainTitle))
  sections.push(table(
    ["奖项", "条件", "奖励"],
    c.awards.main.map(a => [
      `**${a.name}**`,
      a.body.replace(/\n/g, " "),
      `**${a.prize}**`,
    ]),
  ) + "\n")

  sections.push(h3(c.awards.titlesTitle))
  sections.push(table(
    ["头衔", "条件", "奖励"],
    c.awards.titles.map(t => [`**${t.name}**`, t.body, `**${t.prize}**`]),
  ) + "\n")

  sections.push(h3(c.awards.communityTitle))
  sections.push(table(
    ["奖项", "奖励"],
    c.awards.community.map(a => [`**${a.name}**`, a.prize]),
  ) + "\n")

  sections.push(`${blockquote(`**${c.awards.dedupeTitle}：** ${c.awards.dedupe.replace(/\n/g, " ")}`)}\n`)

  // ── FAQ ───────────────────────────────────────────────────────────────────
  sections.push(hr())
  sections.push(h2(`❓ ${c.faq.title}`))
  sections.push(c.faq.items.map(f => details(f.q, f.a.replace(/\n/g, "\n\n"))).join("\n\n") + "\n")

  // ── Links ─────────────────────────────────────────────────────────────────
  sections.push(hr())
  sections.push(h2(`🔗 ${c.cta.linksTitle}`))
  sections.push(table(
    ["资源", "链接"],
    [
      ["🏁 **前往 Kaggle 参赛**", LINKS.kaggle],
      ["💻 **代码库**", LINKS.repo],
      ["🏠 **BuildArena 主页**", LINKS.paperhomepage],
      ["🎮 **Besiege（Steam）**", LINKS.besiege],
      ["📚 **ICML 2026 论文**", LINKS.icml2026paper],
      ["✉️ **联系我们**", LINKS.email],
    ],
  ) + "\n")

  sections.push(hr())
  sections.push(`<div align="center">\n\n${c.cta.copyright}\n\n</div>\n`)

  return sections.join("\n")
}

// ── Write files ───────────────────────────────────────────────────────────────
const enPath = resolve(PUBLIC, "BuildArena-Challenge-EN.md")
const zhPath = resolve(PUBLIC, "BuildArena-Challenge-ZH.md")

writeFileSync(enPath, buildEnglish(), { encoding: "utf-8" })
writeFileSync(zhPath, buildChinese(), { encoding: "utf-8" })

console.log(`✅  English → ${enPath}`)
console.log(`✅  Chinese → ${zhPath}`)

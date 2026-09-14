import { content, type Content, type Lang } from "./content"

type Patch = { [key: string]: unknown }
const patch = <T extends Patch>(base: T, updates: Patch): T => {
  const result = { ...base } as Patch
  for (const [key, value] of Object.entries(updates)) {
    result[key] = value && typeof value === "object" && !Array.isArray(value)
      ? patch((result[key] ?? {}) as Patch, value as Patch)
      : value
  }
  return result as T
}

const enPatch = {
  hero: { kicker: "BuildArena 2.0 · Season 02", title: "Construction Challenge", subtitle: "Of Course I Still Love You", notice: "Build. Fly. Observe. Improve.", ctaPrimary: "Enter Season 02", ctaSecondary: "How it works" },
  season: { tag: "// 01 — Season 02", title: 'Season 2\n"Of Course I Still Love You"', intro: "Getting to orbit was just the warm-up. Now bring the machine home.\nYour agent designs, builds, controls, observes, diagnoses, and improves in a closed loop.", dates: "TBA – TBA AOE", mission: "Closed-loop engineering", missionBody: "Hand over the controls: the agent writes the controller, launches simulation, reads telemetry, and decides what to change next." },
  tracks: { tag: "// 02 — Tracks", title: "Choose Your Engineering Loop", intro: "Season 02 rewards agents that can turn telemetry into better machines.", items: [
    { name: "Build with Agent", badge: "Main track", body: "The agent owns the design, construction, controller, simulation loop, and iteration.", rulesLabel: "Core rules", rules: ["Use BuildArena MCP to create the machine", "Write and run a controller", "Use telemetry and simulation outcomes as feedback", "Iterate through documented design changes"] },
    { name: "Human Boss Challenge", badge: "Showcase", body: "Build it yourself and show how far human engineering can go.", rulesLabel: "Core rules", rules: ["Human-built machines are welcome", "Use the official tracker and telemetry format", "Submit a reproducible run and writeup"] },
  ] },
  how: { tag: "// 03 — Closed Loop", title: "Build. Fly. Observe. Improve.", intro: "A Season 02 run is an engineering loop, not a one-shot build.", steps: [
    { title: "Design", body: "Define the mission, vehicle, controller, and success signals." },
    { title: "Build & fly", body: "Construct through MCP, launch the simulation, and run the machine." },
    { title: "Observe & improve", body: "Read telemetry, diagnose failure, change the design, and try again." },
  ], cta: "Enter Season 02" },
  scoring: { tag: "// 04 — Scoring", title: "Score the Whole Loop", intro: "Season 02 evaluates engineering performance and the quality of the agent's closed-loop process.", performanceTitle: "Mission Performance", performance: [
    { name: "Mission success", weight: "40%", body: "How well the vehicle completes the season mission." },
    { name: "Control quality", weight: "25%", body: "Stable, responsive control driven by the submitted controller." },
    { name: "Iteration gain", weight: "20%", body: "Improvement demonstrated across documented simulation attempts." },
    { name: "Structure integrity", weight: "15%", body: "The machine remains meaningfully intact during the valid run." },
  ], costTitle: "Engineering Cost", cost: [{ name: "Token cost", body: "Prompt, workflow, controller, and agent interaction cost." }, { name: "Simulation cost", body: "Useful attempts over repeated trial-and-error." }], finalTitle: "Final Score", tokenNote: "The official scorer and Season 02 rules define the final normalization and edge-case handling." },
  submission: { tag: "// 05 — Submission & Validation", title: "Show Your Work", intro: "Submit the machine, controller, telemetry, iteration history, and a clear account of how the loop improved the design.", deliverablesTitle: "Build with Agent deliverables", deliverables: ["machine.bsg", "build history JSON", "controller code", "telemetry / trajectory CSV", "iteration log", "chat transcript", "Kaggle writeup and video"], humanTitle: "Human Boss deliverables", humanDeliverables: ["human-built machine.bsg", "telemetry / trajectory CSV", "Kaggle writeup and video"], validationTitle: "Validation Rules", validations: [{ q: "Reproducible build", a: "The submitted machine and build record must be consistent with the declared agent workflow." }, { q: "Controller integrity", a: "The controller must be included and run through the declared simulation process." }, { q: "Telemetry evidence", a: "Iteration claims must be supported by valid telemetry and documented attempts." }, { q: "No fabricated evidence", a: "Do not materially manipulate machine files, telemetry, or transcripts." }], reviewTitle: "Official Review", review: ["Complete submissions enter the provisional showcase.", "Award candidates undergo file, controller, telemetry, and workflow review.", "Only verified entries receive official awards."], ctaRules: "Read Season 02 rules", ctaSubmit: "Submit on Kaggle" },
  leaderboard: { tag: "// 07 — Leaderboard", title: "Season 02 Leaderboard", status: "Opening soon", emptyTitle: "The loop is warming up", emptyBody: "Build, run, observe, improve — then submit your best verified loop." },
  awards: { tag: "// 06 — Awards", title: "Glory & Prizes", pool: { label: "Season 02 prize pool", amount: "$3,000", unit: "/ season" } },
  faq: { tag: "// 08 — FAQ", title: "Season 02 FAQ", items: [{ q: "What is new in Season 02?", a: "The agent owns the closed loop: design, build, controller, simulation, telemetry, diagnosis, and iteration." }, { q: "Can humans guide the agent?", a: "Follow the Season 02 track rules and document the workflow. The key requirement is a genuine agent-driven engineering loop in the main track." }, { q: "Where do I submit?", a: "On Kaggle. This site is informational only." }] },
  cta: { title: "Ready to close\nthe engineering loop?", button: "Enter Season 02" },
}

const zhPatch = {
  hero: { kicker: "BuildArena 2.0 · 第二赛季", title: "Construction Challenge", subtitle: "Of Course I Still Love You", notice: "建造 · 飞行 · 观察 · 改进", ctaPrimary: "进入第二赛季", ctaSecondary: "查看参与流程" },
  season: { tag: "// 01 — 第二赛季", title: "第二赛季\n「Of Course I Still Love You」", intro: "成功入轨只是热身。现在，把机器带回家。\n你的 agent 负责设计、建造、控制、观察、诊断与改进，完成真正的闭环工程。", dates: "待定 – 待定 AOE", mission: "闭环工程", missionBody: "把控制权交给 agent：它编写控制器、启动仿真、读取 telemetry，并决定下一步如何改变设计。" },
  tracks: { tag: "// 02 — 赛道", title: "选择你的工程闭环", intro: "第二赛季奖励能把 telemetry 转化为更好机器的 agent。", items: [{ name: "Build with Agent", badge: "主赛道", body: "agent 负责设计、建造、控制器、仿真闭环与迭代。", rulesLabel: "核心规则", rules: ["通过 BuildArena MCP 创建机器", "编写并运行控制器", "使用 telemetry 和仿真结果作为反馈", "记录设计变化并持续迭代"] }, { name: "Human Boss Challenge", badge: "展示赛道", body: "亲手建造，展示人类工程能力的上限。", rulesLabel: "核心规则", rules: ["欢迎人类手工建造", "使用官方 tracker 和 telemetry 格式", "提交可复现运行与说明"] }] },
  how: { tag: "// 03 — 闭环流程", title: "建造 · 飞行 · 观察 · 改进", intro: "第二赛季不是一次性建造，而是一轮完整的工程闭环。", steps: [{ title: "设计", body: "定义任务、载具、控制器与成功信号。" }, { title: "建造与飞行", body: "通过 MCP 建造，启动仿真并运行机器。" }, { title: "观察与改进", body: "读取 telemetry、诊断失败、修改设计，再次尝试。" }], cta: "进入第二赛季" },
  scoring: { tag: "// 04 — 评分", title: "为完整闭环评分", intro: "第二赛季同时评价工程表现与 agent 闭环迭代的质量。", performanceTitle: "任务表现", performance: [{ name: "任务成功", weight: "40%", body: "载具完成赛季任务的程度。" }, { name: "控制质量", weight: "25%", body: "控制器带来的稳定性与响应性。" }, { name: "迭代收益", weight: "20%", body: "多次仿真后，设计是否有可证明的改善。" }, { name: "结构完整性", weight: "15%", body: "有效运行中机器是否保持完整。" }], costTitle: "工程成本", cost: [{ name: "Token 成本", body: "prompt、workflow、控制器与 agent 交互成本。" }, { name: "仿真成本", body: "重复试错中真正有效的尝试。" }], finalTitle: "最终成绩", tokenNote: "最终归一化与边界情况以第二赛季官方评分器和规则为准。" },
  submission: { tag: "// 05 — 提交与校验", title: "展示你的工程过程", intro: "提交机器、控制器、telemetry、迭代历史，以及清楚说明闭环如何改进设计。", deliverablesTitle: "Build with Agent 提交产物", deliverables: ["machine.bsg", "建造历史 JSON", "控制器代码", "telemetry / trajectory CSV", "迭代日志", "对话记录", "Kaggle 说明与视频"], humanTitle: "Human Boss 提交产物", humanDeliverables: ["人类建造 machine.bsg", "telemetry / trajectory CSV", "Kaggle 说明与视频"], validationTitle: "校验规则", validations: [{ q: "建造可复现", a: "机器文件与声明的 agent workflow 必须一致。" }, { q: "控制器完整", a: "必须提交控制器，并按声明的仿真流程运行。" }, { q: "Telemetry 证据", a: "迭代结论必须由有效 telemetry 和尝试记录支持。" }, { q: "禁止伪造证据", a: "不得实质性篡改机器文件、telemetry 或记录。" }], reviewTitle: "官方复核", review: ["完整提交先进入 provisional 展示。", "获奖候选接受文件、控制器、telemetry 与 workflow 复核。", "只有 verified 作品可获得正式奖项。"], ctaRules: "查看第二赛季规则", ctaSubmit: "前往 Kaggle 提交" },
  leaderboard: { tag: "// 07 — 排行榜", title: "第二赛季排行榜", status: "即将开放", emptyTitle: "闭环正在预热", emptyBody: "建造、运行、观察、改进，然后提交你最好的 verified 闭环。" },
  awards: { tag: "// 06 — 奖项", title: "荣耀与奖励", pool: { label: "第二赛季奖金池", amount: "$3,000", unit: "/ 赛季" } },
  faq: { tag: "// 08 — 常见问题", title: "第二赛季 FAQ", items: [{ q: "第二赛季有什么变化？", a: "agent 负责完整闭环：设计、建造、控制器、仿真、telemetry、诊断与迭代。" }, { q: "人类可以指导 agent 吗？", a: "请遵守第二赛季赛道规则并记录 workflow。主赛道的核心要求是真实的 agent 驱动工程闭环。" }, { q: "在哪里提交？", a: "在 Kaggle 提交。本站仅作信息展示。" }] },
  cta: { title: "准备好完成\n工程闭环了吗？", button: "进入第二赛季" },
}

export const season2Content: Record<Lang, Content> = { en: patch(content.en, enPatch), zh: patch(content.zh, zhPatch) }

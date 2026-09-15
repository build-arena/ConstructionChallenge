import { content, type Content, type Lang } from "./content"

type AnyObject = Record<string, any>

function merge(base: AnyObject, updates: AnyObject): AnyObject {
  const result = { ...base }
  for (const [key, value] of Object.entries(updates)) {
    result[key] = value && typeof value === "object" && !Array.isArray(value)
      ? merge(result[key] ?? {}, value)
      : value
  }
  return result
}

const enPatch = {
  hero: {
    kicker: "BuildArena · Community Hackathon · Unlaunched",
    title: "BuildArena - Human AI\nEngineering Challenge S02",
    season: "BuildArena Construction Challenge S02: Of Course I Still Love You 🚀❤️",
    subtitle: "Getting to orbit was just the warm-up. Now bring the machine home.",
    sloganWrong: "Human pilots the machine",
    sloganRight: "Your agent closes the loop",
    notice: "Build. Fly. Observe. Improve.",
    ctaPrimary: "Enter Season 02",
    meta: "2026.09.14 – 2026.11.14 AOE · BuildArena × Besiege",
  },
  gameKey: {
    notice: "Besiege + The Splintered Sea + The Broken Beyond DLC · 300 base-game keys while supplies last; one post-competition share key for accepted valid submissions",
    ctaLabel: "Get the game",
  },
  flow: {
    step1: "01 · Get the game",
    step2: "02 · Enter Season 02",
  },
  season: {
    tag: "// 01 — Season 02",
    title: 'Season 2\n"Of Course I Still Love You"',
    dates: "2026.09.14 – 2026.11.14 AOE",
    datesLabel: "Competition window",
    datesFrom: "Sep 14, 2026",
    datesTo: "Nov 14, 2026",
    datesTz: "AOE (UTC−12)",
    briefTitle: "BuildArena Construction Challenge S02",
    brief: "Getting to orbit was just the warm-up. Now bring the machine home.\n\nIn Season 01: To Infinity, and Beyond, AI agents built the machines and humans flew them.\n\nIn Season 02, we hand over the controls.\n\nYour agent designs the vehicle, builds it, writes the controller, launches the simulation, watches telemetry, diagnoses failures, changes the design, and tries again.\n\nWelcome to closed-loop engineering.\n\nBuild. Fly. Observe. Improve.\n\nSeason 02 introduces ba-control: programmable control, live telemetry, and automated simulation for machines created through BuildArena. An agent can build through the BuildArena MCP, launch Besiege, operate what it built, inspect the flight, revise the controller or vehicle, and run the next experiment.\n\nMission: Deliver. Separate. Return. Release an unpowered payload, keep it valid for three complete revolutions, and recover as much launch hardware as possible near the launch site. Single-stage, multi-stage, reusable, powered-landing, and gliding architectures are all allowed; parachutes are prohibited. The three-orbit gate is required for a competitive score.",
    hooksTitle: "The S02 Loop",
    hooks: [
      { title: "Design → Build", body: "Prepare the engineering system, then let the agent create the vehicle through BuildArena MCP." },
      { title: "Fly → Observe", body: "The agent launches the simulation, controls the machine, and reads live telemetry." },
      { title: "Diagnose → Improve", body: "Use failures as evidence: revise the controller or vehicle and run the next experiment." },
    ],
  },
  tracks: {
    tag: "// 02 — Tracks & Rules",
    title: "Choose Your Engineering Loop",
    intro: "Build with Agent is the main competitive track. Human BOSS is a separate human-built exhibition and baseline track.",
    coefficientLabel: "Build-mode coefficient",
    rulesLabel: "Official restriction",
    note: "Prepare the engineering system, not the finished answer. Prebuilt mission machines and ready-to-run mission controllers are prohibited.",
    items: [
      { name: "Build with Agent", badge: "Main competitive", badgeVariant: "default", tagline: "Hand over the controls.\nDeliver. Separate. Return.", rules: ["Autopilot: configure the model, harness, tools, skills, system prompt, and initial instruction before Engineering Start; there is no prompt-length limit. After Engineering Start, the system must make decisions itself; score coefficient ×1.25.", "Copilot: stay in conversation and use natural-language collaboration to suggest strategies, questions, and failure investigation; the agent must implement the machine, controller, tuning, and flight control. Score coefficient ×1.00.", "The agent must design/build the machine, write the controller, launch the simulation, inspect telemetry, and iterate; humans may not take over the engineering decisions.", "Humans may not manually edit the machine/controller, directly tune engineering parameters, or pilot development/final flights. Human selection of a preferred design, test result, controller, checkpoint, or branch is not allowed in Autopilot; live commands such as stage now, fire now, or steer left are not allowed in Copilot."] },
      { name: "Human BOSS Challenge", badge: "Exhibition / baseline", badgeVariant: "accent", tagline: "Build, tune, and fly by hand.\nA separate human baseline.", rules: ["Build, tune, and fly the machine by hand under the same mission, payload, physical-environment, parachute, and recovery rules.", "Human BOSS receives no Autopilot coefficient and does not compete for main Build with Agent cash prizes unless a separate prize is announced.", "Human-authored control code is allowed but must be disclosed."] },
    ],
  },
  how: {
    tag: "// 03 — Mission Loop",
    title: "Build. Fly. Observe. Improve.",
    intro: "Design → Build → Fly → Observe → Diagnose → Improve → Repeat.",
    phases: [
      { key: "prepare", label: "Prepare", steps: [{ n: "01", title: "Prepare the system", body: "Get Besiege + The Broken Beyond, configure the official BuildArena 2.0 MCP, and define the agent workflow." }, { n: "02", title: "Design & build", body: "The agent creates the vehicle through the BuildArena MCP. Do not start from a finished mission machine or controller." }] },
      { key: "compete", label: "Run the mission", steps: [{ n: "03", title: "Write the controller", body: "The agent writes the mission controller, launches Besiege, releases an unpowered payload, and operates the recovery hardware." }, { n: "04", title: "Observe & improve", body: "Read telemetry, diagnose failures, revise the controller or vehicle, and run the next experiment." }] },
      { key: "submit", label: "Submit evidence", steps: [{ n: "05", title: "Deliver. Separate. Return.", body: "Complete three payload revolutions, recover hardware, and submit the exact machine, histories, trajectory, control package, transcript, and writeup." }] },
    ],
    gameKeyCta: "Get Besiege + The Broken Beyond",
    submitBodyForm: "Submit the complete final mission record through Kaggle.",
    repoCta: "Download BuildArena 2.0",
    cta: "Submit on Kaggle",
  },
  scoring: {
    tag: "// 04 — Official Scoring",
    title: "Deliver. Separate. Return.",
    intro: "A valid unpowered payload must complete three revolutions. Then the performance score is multiplied by the Build-mode coefficient.",
    performanceTitle: "PerformanceScore · 100 points",
    performance: [
      { name: "Orbital Payload", weight: "15%", body: "Deliver more useful payload mass. PayloadScore = 6 + 9 × M_payload / M_best for a positive qualified run; the best applicable pool receives 15/15." },
      { name: "Payload Fuel Efficiency", weight: "15%", body: "η = M_payload / F_expended; EfficiencyScore = 6 + 9 × η / η_best. Fuel left on lost hardware counts as expended; fuel brought home does not. A verified legal zero-propellant mission receives 15/15." },
      { name: "Recovery Completeness", weight: "30%", body: "RecoveryScore = 30 × validly recovered dry hardware mass / initial non-payload dry hardware mass. Recovery requires ≥90% structural integrity and stable landing without propulsive support for 10 seconds." },
      { name: "Landing Accuracy", weight: "40%", body: "Mass-weighted landing accuracy. A_raw(d) = [1 − tanh((d − 30) / 10)] / [1 + tanh(30 / 10)]; values below 0.001 are zero." },
    ],
    costTitle: "Mission gates & edge cases",
    cost: [{ name: "Three-orbit gate", body: "The payload must fly unpowered through three complete revolutions, with the entire payload strictly above 1100 game-distance units from the planet center during the qualifying interval; otherwise competitive score is 0." }, { name: "Mission time and cost", body: "Mission Time has no competition-imposed maximum or speed component in the main score. Season 02 has no token-cost or API-cost deduction from the main score." }, { name: "Fuel accounting", body: "Fuel expenditure covers the entire mission, including recovery. Fuel remaining in validly recovered hardware is not expended." }],
    formulaLabel: "Official formulas",
    formulas: [{ label: "PerformanceScore", value: "PayloadScore + EfficiencyScore + RecoveryScore + LandingScore" }, { label: "FinalScore", value: "PerformanceScore × BuildModeCoefficient" }, { label: "Mode coefficient", value: "Autopilot ×1.25 · Copilot ×1.00" }],
    finalTitle: "Mission requirement",
    finals: [{ label: "Mission", value: "Deliver · Separate · Return" }, { label: "Qualifying payload", value: "3 complete revolutions · unpowered · >1100 distance units" }],
    tokenNote: "The official S02 scorer/reference implementation is part of the public BuildArena 2.0 release. Mission Time has no main-score speed component. There is no token/API-cost deduction. Multiple submissions are selected team-locally, then one Effective Final Submission per team is rescored globally.",
  },
  submission: {
    tag: "// 05 — Submission & Validation",
    title: "Submit the Complete Record",
    intro: "For Build with Agent, submit the exact final scored machine and the reproducible control/evidence package through Kaggle.",
    deliverablesTitle: "Build with Agent · 6 required items",
    deliverables: ["machine.bsg — exact final scored machine", "build_history.json", "build_history_full.json", "trajectory.csv — official telemetry from one final mission", "control/ — controller source, config, explanation, and one-command reproduction", "chat_transcript.md — Autopilot or Copilot record"],
    manifestTitle: "Writeup must include",
    manifestFields: ["Machine Name / Track / Autopilot or Copilot", "Mission Summary and Final Run metrics", "Video (optional but encouraged)", "LLM / Agent Setup", "Prompts and Workflow", "Control System", "Engineering Iteration", "Notes"],
    humanTitle: "Human BOSS",
    humanDeliverables: ["final machine.bsg", "final trajectory.csv", "Kaggle writeup describing the control method", "controller package if code-based control was used"],
    validationTitle: "S02 Validation Rules",
    validations: [{ q: "No manual control in Build with Agent", a: "Agents pilot the submitted machine. Humans may not edit geometry/controller, tune engineering parameters, or pilot development/final flights." }, { q: "Reproducible controller", a: "control/ must explain telemetry inputs, outputs, phases, state transitions, guidance/PID/scripted/hybrid logic, staging, recovery, landing, thresholds, and mission completion; the official S02 entry point must reproduce the run." }, { q: "Evidence integrity", a: "Histories must correspond to machine.bsg and trajectory.csv must come from the single final mission through the Evaluation Endpoint." }, { q: "Rejection conditions", a: "Manual geometry changes, behavior-changing mods, illegal vanilla values, fabricated/manipulated evidence, or a prohibited ready-made machine/controller can be rejected." }],
    reviewTitle: "Official Review",
    review: ["All writeups are due by Nov 14, 2026 AOE.", "Multiple submissions are allowed; the highest team submission becomes the Effective Final Submission.", "Scoring and winners follow unified verification after the deadline."],
    ctaRules: "Read S02 Rules",
    ctaSubmit: "Submit on Kaggle",
  },
  awards: {
    tag: "// 06 — Prizes & Awards",
    title: "Season 02 Awards",
    mainTitle: "Main cash awards",
    pool: { label: "Season 02 prize pool", amount: "$3,000", unit: "total" },
    main: [{ name: "Agent Master Builder", body: "Best overall verified Build with Agent result.", badge: "Major prize", prize: "$700" }, { name: "Best Build Autopilot", body: "Best verified Autopilot result.", badge: "Major prize", prize: "$500" }, { name: "Best Build Copilot", body: "Best verified Copilot result.", badge: "Major prize", prize: "$500" }],
    titlesTitle: "Special titles",
    titles: [{ name: "Powerful but Brutal", body: "A powerful machine that pays a price.", prize: "$300" }, { name: "Cheap Thrills", body: "Strong performance with an economical design.", prize: "$300" }, { name: "Most Creative Machine", body: "The most inventive machine or architecture.", prize: "$300" }, { name: "Funniest Failure", body: "The failure everyone remembers.", prize: "$200" }],
    communityTitle: "Community",
    community: [{ name: "Community Favorite", prize: "$200" }, { name: "Fastest Qualified Mission", prize: "Non-cash title" }, { name: "Best Human BOSS Build", prize: "Exhibition" }, { name: "Multiple titles", prize: "Allowed" }, { name: "Major cash prizes", prize: "One per machine" }],
    dedupeTitle: "Award allocation",
    dedupe: "A machine may earn multiple display titles, but at most one major cash prize. If a winner is ineligible or cannot be verified, the official roll-down and verification rules apply.",
    academic: { title: "Verification", badge: "Official", intro: "BuildArena and the named judges verify machine, controller, telemetry, histories, and writeup before final awards.", contributionsTitle: "Judges", contributions: ["BuildArena", "Nextan Pholizebort", "Nephoslbata"], adoptionNote: "Prize and eligibility decisions follow the official S02 Rules." },
  },
  leaderboard: { tag: "// 07 — Leaderboard", title: "Season 02 Leaderboard", status: "Not open yet", tabs: { overall: "Overall", autopilot: "Autopilot", copilot: "Copilot", human: "Human BOSS" }, columns: ["#", "Team", "Machine", "Mode", "Payload", "Efficiency", "Recovery", "Landing", "Performance", "Final", "Status"], emptyTitle: "The loop is warming up", emptyBody: "The competition opens Sep 14, 2026 AOE. Submit a verified final mission to appear after unified scoring.", provisional: "Provisional" },
  faq: {
    tag: "// 08 — Rules FAQ",
    title: "Season 02 FAQ",
    items: [{ q: "Is manual driving allowed?", a: "No. Agents pilot the submitted machine. The competition evaluates tracked trajectory and submitted control scripts." }, { q: "Can Autopilot prompts be long?", a: "Yes. Include the prompt in the transcript and writeup; token estimation counts." }, { q: "Can I tune controls after the agent builds?", a: "No. After the raw machine is saved, it cannot be modified by any means for Build with Agent." }, { q: "Can I use camera-blocking?", a: "Yes, camera block is allowed." }, { q: "Do I need to open-source agent code?", a: "Yes. Submit the control code needed to fully reproduce the run." }, { q: "Can I submit more than once?", a: "Yes. Select an Effective Final Submission; one final submission per team is rescored globally." }, { q: "What causes rejection?", a: "Manual geometry/structure changes, behavior-changing mods, illegal vanilla values, or fabricated/manipulated evidence. Minor formatting, video, or cosmetic issues are not automatic disqualification." }],
    steamKeyClosed: { q: "What do I need to play?", a: "Besiege base game and The Broken Beyond DLC. The official competition flow provides a Steam activation key through the form when available." },
  },
  cta: { title: "Ready to close\nthe engineering loop?", button: "Enter Season 02" },
}

const zhPatch = {
  hero: { kicker: "BuildArena 2.0 · 第二赛季", title: "BuildArena - Human AI\nEngineering Challenge S02", season: "第二赛季 · Of Course I Still Love You 🚀❤️", subtitle: "Getting to orbit was just the warm-up. Now bring the machine home.", sloganWrong: "人类驾驶机器", sloganRight: "让 agent 完成闭环", notice: "建造 · 飞行 · 观察 · 改进", ctaPrimary: "进入第二赛季", meta: "2026.09.14 – 2026.11.14 AOE · BuildArena × Besiege" },
  gameKey: { notice: "需要 Besiege + The Splintered Sea + The Broken Beyond DLC · 300 个本体激活码，发完即止；有效提交赛后另有一个分享码", ctaLabel: "获取游戏" },
  flow: { step1: "01 · 获取游戏", step2: "02 · 进入第二赛季" },
  season: { tag: "// 01 — 第二赛季", title: "第二赛季\n「Of Course I Still Love You」", dates: "2026.09.14 – 2026.11.14 AOE", datesLabel: "比赛时间", datesFrom: "2026 年 9 月 14 日", datesTo: "2026 年 11 月 14 日", datesTz: "AOE（UTC−12）", briefTitle: "BuildArena Construction Challenge S02", brief: "成功入轨只是热身。现在，把机器带回家。\n\n第一赛季：AI agent 建造机器，人类负责驾驶。\n\n第二赛季，我们把控制权交给 agent。\n\n你的 agent 设计载具、完成建造、编写控制器、启动仿真、观察 telemetry、诊断失败、修改设计并再次尝试。\n\n欢迎来到闭环工程。\n\n建造 · 飞行 · 观察 · 改进。\n\n第二赛季引入 ba-control：为 BuildArena 创建的机器提供可编程控制、实时 telemetry 与自动化仿真。agent 通过 BuildArena MCP 建造、启动 Besiege、操作机器、检查飞行、修改控制器或载具并运行下一次实验。\n\n任务：交付、分离、返回。释放无动力载荷，使其完成三圈有效轨道，并尽可能将发射硬件完整带回发射点附近；三圈是进入竞争评分的门槛。", hooksTitle: "第二赛季闭环", hooks: [{ title: "设计 → 建造", body: "先准备工程系统，再由 agent 通过 BuildArena MCP 创建载具。" }, { title: "飞行 → 观察", body: "agent 启动仿真、控制机器并读取实时 telemetry。" }, { title: "诊断 → 改进", body: "把失败当作证据：修改控制器或载具，运行下一次实验。" }] },
  tracks: { tag: "// 02 — 赛道与规则", title: "选择你的工程闭环", intro: "Build with Agent 是主赛道；Human BOSS 是独立的人类建造展示与基线赛道。", coefficientLabel: "模式系数", rulesLabel: "官方限制", note: "准备工程系统，而不是成品答案。禁止预制任务机器和可直接运行的任务控制器。", items: [{ name: "Build with Agent", badge: "主赛道", badgeVariant: "default", tagline: "把控制权交给 agent。\n交付、分离、返回。", rules: ["Autopilot：Engineering Start 前配置 model、harness、tools、skills、system prompt 和 initial instruction，不限制 prompt 长度；开始后系统必须自行决策，模式系数 ×1.25。", "Copilot：可以持续对话、建议策略和调查失败，但机器、控制器、调参与飞行控制必须由 agent 实现，模式系数 ×1.00。", "agent 必须设计/建造机器、编写控制器、启动仿真、检查 telemetry 并迭代。", "人类不得手动编辑机器/控制器、直接调工程参数或驾驶开发/最终飞行。Autopilot 不允许人类选择偏好的设计、测试结果、控制器、checkpoint 或分支；Copilot 也不允许通过 agent 转达实时驾驶指令。"] }, { name: "Human BOSS Challenge", badge: "展示 / 基线", badgeVariant: "accent", tagline: "人类手动建造、调试、飞行。\n独立的人类基线。", rules: ["在相同任务、载荷、物理环境、降落伞和回收规则下手动建造、调试和驾驶。", "不使用 Autopilot 系数，也不参与 Build with Agent 主现金奖，除非另行公布 Human BOSS 奖项。", "人类机器可使用人类编写的控制代码，但必须披露；不使用 Autopilot 系数，也不参与主赛道现金奖，除非另行公布。"] }] },
  how: { tag: "// 03 — 任务闭环", title: "建造 · 飞行 · 观察 · 改进", intro: "设计 → 建造 → 飞行 → 观察 → 诊断 → 改进 → 重复。", phases: [{ key: "prepare", label: "准备", steps: [{ n: "01", title: "准备系统", body: "获取 Besiege + The Broken Beyond，配置官方 BuildArena 2.0 MCP，定义 agent workflow。" }, { n: "02", title: "设计并建造", body: "由 agent 通过 BuildArena MCP 创建载具，禁止从成品任务机器或控制器开始。" }] }, { key: "compete", label: "运行任务", steps: [{ n: "03", title: "编写控制器", body: "agent 编写任务控制器、启动 Besiege、释放无动力载荷并操作回收硬件；单级、多级、可复用、动力着陆和滑翔架构均可，禁止降落伞。" }, { n: "04", title: "观察并改进", body: "读取 telemetry、诊断失败、修改控制器或载具并运行下一次实验。" }] }, { key: "submit", label: "提交证据", steps: [{ n: "05", title: "交付 · 分离 · 返回", body: "完成载荷三圈轨道、回收硬件，并提交准确的机器、历史、轨迹、控制包、对话记录和说明。" }] }], gameKeyCta: "获取 Besiege + The Broken Beyond", submitBodyForm: "通过 Kaggle 提交完整的最终任务记录。", repoCta: "下载 BuildArena 2.0", cta: "前往 Kaggle 提交" },
  scoring: { tag: "// 04 — 官方评分", title: "交付 · 分离 · 返回", intro: "无动力载荷必须完成三圈轨道；之后表现分乘以建造模式系数。", performanceTitle: "PerformanceScore · 100 分", performance: [{ name: "轨道载荷", weight: "15%", body: "交付更多有效载荷质量。正向合格运行至少 6/15，适用池中最好成绩为 15/15。" }, { name: "载荷燃料效率", weight: "15%", body: "η = 载荷质量 / 消耗燃料；EfficiencyScore = 6 + 9 × η / η_best。丢失硬件中的燃料计入消耗，带回的燃料不计入。合法零推进剂任务直接得 15/15。" }, { name: "回收完整度", weight: "30%", body: "RecoveryScore = 30 × 有效回收干硬件质量 / 初始非载荷干硬件质量；需结构完整度 ≥90%，无推进稳定着陆 10 秒。" }, { name: "着陆精度", weight: "40%", body: "按质量加权的着陆精度；距离越近越高，超过阈值快速下降，未回收部分为零。" }], costTitle: "任务门槛与边界", cost: [{ name: "三圈门槛", body: "载荷须无动力完成三圈完整轨道，合格期间全程严格高于行星中心 1100 游戏距离单位，否则竞争得分为 0。" }, { name: "Mission Time 与成本", body: "Mission Time 没有比赛最大时长，不产生主分速度项；第二赛季主评分不扣 token/API 成本。" }, { name: "燃料记账", body: "整个任务（含回收）都计入燃料消耗；有效回收硬件中剩余燃料不计入。" }], formulaLabel: "官方公式", formulas: [{ label: "PerformanceScore", value: "PayloadScore + EfficiencyScore + RecoveryScore + LandingScore" }, { label: "FinalScore", value: "PerformanceScore × BuildModeCoefficient" }, { label: "模式系数", value: "Autopilot ×1.25 · Copilot ×1.00" }], finalTitle: "任务要求", finals: [{ label: "任务", value: "交付 · 分离 · 返回" }, { label: "合格载荷", value: "三圈完整轨道 · 无动力 · >1100 距离单位" }], tokenNote: "官方 S02 scorer/reference implementation 随 BuildArena 2.0 公共发布。Mission Time 不增加或扣除主分，没有 token/API 成本扣分；允许多次提交，先队内选出 Effective Final Submission，再每队一个进入全局重算。" },
  submission: { tag: "// 05 — 提交与校验", title: "提交完整记录", intro: "Build with Agent 通过 Kaggle 提交最终机器以及可复现的控制与证据包。", deliverablesTitle: "Build with Agent · 6 项必交", deliverables: ["machine.bsg — 最终评分机器", "build_history.json", "build_history_full.json", "trajectory.csv — 单次最终任务官方 telemetry", "control/ — 控制器源码、配置、说明和一键复现", "chat_transcript.md — Autopilot 或 Copilot 记录"], manifestTitle: "说明必须包含", manifestFields: ["Machine Name / Track / Autopilot 或 Copilot", "Mission Summary 与 Final Run 指标", "Video（鼓励提交）", "LLM / Agent Setup", "Prompts and Workflow", "Control System", "Engineering Iteration", "Notes"], humanTitle: "Human BOSS", humanDeliverables: ["最终 machine.bsg", "最终 trajectory.csv", "说明控制方法的 Kaggle writeup", "若使用代码控制则提交 controller package"], validationTitle: "第二季校验规则", validations: [{ q: "Build with Agent 禁止人工控制", a: "由 agent 驾驶提交机器；人类不得编辑几何/控制器、调工程参数或驾驶开发/最终飞行。" }, { q: "控制器可复现", a: "control/ 必须说明 telemetry 输入输出、阶段、状态、控制逻辑、分离、回收、着陆、阈值和任务完成；官方入口必须能复现运行。" }, { q: "证据完整", a: "历史记录必须对应 machine.bsg，trajectory.csv 必须来自 Evaluation Endpoint 的单次最终任务。" }, { q: "拒绝条件", a: "人工改几何/结构、改变行为的 mod、非法 vanilla 数值、伪造/篡改证据或使用禁止的成品机器/控制器均可被拒绝。" }], reviewTitle: "官方复核", review: ["所有说明须在 2026-11-14 AOE 前提交。", "允许多次提交；最高队内提交成为 Effective Final Submission。", "截止后进行统一验证、评分与获奖确认。"], ctaRules: "查看第二季 Rules", ctaSubmit: "前往 Kaggle 提交" },
  awards: { tag: "// 06 — 奖项", title: "第二赛季奖项", mainTitle: "现金奖", pool: { label: "第二赛季奖金池", amount: "$3,000", unit: "总计" }, main: [{ name: "Agent Master Builder", body: "最佳总体 verified Build with Agent 成绩。", badge: "主奖", prize: "$700" }, { name: "Best Build Autopilot", body: "最佳 verified Autopilot 成绩。", badge: "主奖", prize: "$500" }, { name: "Best Build Copilot", body: "最佳 verified Copilot 成绩。", badge: "主奖", prize: "$500" }], titlesTitle: "特别称号", titles: [{ name: "Powerful but Brutal", body: "强大但付出代价的机器。", prize: "$300" }, { name: "Cheap Thrills", body: "经济设计下的强劲表现。", prize: "$300" }, { name: "Most Creative Machine", body: "最具创意的机器或架构。", prize: "$300" }, { name: "Funniest Failure", body: "最令人记住的失败。", prize: "$200" }], communityTitle: "社区奖项", community: [{ name: "Community Favorite", prize: "$200" }, { name: "Fastest Qualified Mission", prize: "非现金称号" }, { name: "Best Human BOSS Build", prize: "展示" }, { name: "多个称号", prize: "允许" }, { name: "主现金奖", prize: "每机器一个" }], dedupeTitle: "奖项分配", dedupe: "一台机器可以获得多个展示称号，但最多获得一个主现金奖；资格或验证失败时按官方 roll-down 与复核规则处理。", academic: { title: "官方复核", badge: "Official", intro: "BuildArena 与指定评委在最终奖项前复核机器、控制器、telemetry、历史记录和说明。", contributionsTitle: "评委", contributions: ["BuildArena", "Nextan Pholizebort", "Nephoslbata"], adoptionNote: "奖项与资格以第二季官方 Rules 为准。" } },
  leaderboard: { tag: "// 07 — 排行榜", title: "第二赛季排行榜", status: "尚未开放", tabs: { overall: "总榜", autopilot: "Autopilot", copilot: "Copilot", human: "Human BOSS" }, columns: ["#", "队伍", "机器", "模式", "载荷", "效率", "回收", "着陆", "表现分", "最终分", "状态"], emptyTitle: "闭环正在预热", emptyBody: "比赛将于 2026-09-14 AOE 开始；统一评分后，提交 verified 最终任务即可展示。", provisional: "Provisional" },
  faq: { tag: "// 08 — Rules FAQ", title: "第二赛季 FAQ", items: [{ q: "允许人工驾驶吗？", a: "不允许。由 agent 驾驶提交机器，比赛检查轨迹和提交的控制脚本。" }, { q: "Autopilot 可以使用很长的 prompt 吗？", a: "可以；须在 transcript 和说明中包含，token estimation 会计入。" }, { q: "agent 建造后可以调控制器吗？", a: "不可以。raw machine 保存后，Build with Agent 不得以任何方式修改。" }, { q: "可以挡住相机吗？", a: "可以。" }, { q: "必须开放 agent 代码吗？", a: "必须提交能够完整复现运行的控制代码。" }, { q: "可以多次提交吗？", a: "可以；选择 Effective Final Submission，每队一个最终提交进入全局重算。" }, { q: "哪些情况会被拒绝？", a: "人工修改几何/结构、改变行为的 mod、非法 vanilla 数值、伪造/篡改证据；轻微格式、视频或外观问题不自动导致淘汰。" }], steamKeyClosed: { q: "需要什么游戏？", a: "需要 Besiege 本体和 The Broken Beyond DLC；官方比赛流程会在可用时通过表单提供 Steam 激活码。" } },
  cta: { title: "准备好完成\n工程闭环了吗？", button: "进入第二赛季" },
}

export const season2Content: Record<Lang, Content> = {
  en: merge(content.en as AnyObject, enPatch) as Content,
  zh: merge(content.zh as AnyObject, zhPatch) as Content,
}
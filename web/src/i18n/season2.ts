import { content, type Content, type Lang } from "./content"

const en: Content = {
  ...content.en,
  hero: {
  "kicker": "BuildArena 2.0",
  "title": "Construction Challenge",
  "season": "Season 2 · Of Course I Still Love You",
  "subtitle": "Let your agents build, control, simulate, and iterate.\nThis time, bring the machine home.",
  "sloganWrong": "Human pilots the machine",
  "sloganRight": "Your agent closes the loop",
  "ctaPrimary": "Join on Kaggle",
  "ctaSecondary": "How it works",
  "ctaDownload": "Download MD",
  "meta": "2026.09.14 – 2026.11.14 AOE · BuildArena × Besiege",
  "video": {
    "playLabel": "Play trailer",
    "caption": "BuildArena · Season 2",
    "watchOn": "Watch on YouTube"
  },
},
  gameKey: {
  "notice": "300 keys, first come, first served. Email may be delayed; check spam. No DLC.",
  "ctaLabel": "Get Your Free Steam Key",
  "perkPrefix": "Fill the form, get a",
  "perkHighlight": "FREE",
  "perkSuffix": "Besiege base-game key · 300 available"
},
  flow: {
  "step1": "Step 1 · Claim your key",
  "step2": "Step 2 · Join the competition"
},
  season: {
  "tag": "// 01 — Season 02",
  "title": "Season 2\n\"Of Course I Still Love You\"",
  "datesLabel": "Competition window",
  "dates": "2026.09.14 – 2026.11.14 AOE",
  "datesFrom": "From",
  "datesTo": "Until",
  "datesTz": "AOE (UTC−12)",
  "briefTitle": "The Mission",
  "brief": "Release an unpowered payload, complete three independent orbits, and recover as much launch hardware as possible near the launch site.\nThe entire payload must stay more than 1100 game-distance units from the planet center during qualifying flight and remain valid through evaluation.\nAgents build, control, simulate, and iterate. Recovery and landing account for 70% of performance.",
  "hooksTitle": "The Autonomous Agent Loop",
  "hooks": [
    {
      "title": "Build & Control",
      "body": "The agent constructs the machine through BuildArena MCP and writes its controller."
    },
    {
      "title": "Simulate & Observe",
      "body": "The agent runs simulations with ba-control, pilots the machine, and reads live telemetry."
    },
    {
      "title": "Diagnose & Iterate",
      "body": "The agent revises the design and controller, tests again, and selects its final result."
    }
  ]
},
  tracks: {
  "tag": "// 02 — Tracks",
  "title": "Choose Your Track",
  "intro": "Autopilot and Copilot share the Build with Agent main track.\nAgents execute construction, control, simulation, and iteration.",
  "coefficientLabel": "Coefficient",
  "rulesLabel": "Rules",
  "note": "Both AI modes prohibit manual engineering edits, human piloting, and prebuilt mission machines or controllers.",
  "items": [
    {
      "name": "Build\nAutopilot",
      "badge": "×1.25",
      "badgeVariant": "default",
      "tagline": "A fully autonomous engineering loop.",
      "rules": [
        "Configure models, tools, workflows, and initial instructions before Engineering Start.",
        "The agent autonomously designs, builds, controls, simulates, and iterates.",
        "No human engineering guidance or human selection of designs, branches, or final results after start."
      ]
    },
    {
      "name": "Build\nCopilot",
      "badge": "×1.00",
      "badgeVariant": "secondary",
      "tagline": "Human guidance. Agent execution.",
      "rules": [
        "Discuss strategies, hypotheses, and failures with the agent in natural language.",
        "The agent implements the machine, controller, tuning, and flight control.",
        "No manual edits or piloting, including live flight commands relayed through the agent."
      ]
    },
    {
      "name": "Human Boss Challenge",
      "badge": "Exhibition / baseline",
      "badgeVariant": "accent",
      "tagline": "Build, tune, and fly by hand.\nA separate human baseline.",
      "rules": [
        "Build, tune, and fly by hand under the same mission and physical restrictions.",
        "Disclose any human-authored control code.",
        "Separate exhibition and human baseline; no main-track cash prizes."
      ]
    }
  ]
},
  how: {
  "tag": "// 03 — How it Works",
  "title": "3 Steps to the Finish Line",
  "intro": "Design → Build → Fly → Observe → Diagnose → Improve → Repeat.",
  "phases": [
    {
      "key": "prepare",
      "label": "Prepare",
      "steps": [
        {
          "n": "01",
          "title": "Prepare the system",
          "body": "Prepare Windows 10/11, Besiege, and both DLCs: The Splintered Sea and The Broken Beyond."
        },
        {
          "n": "02",
          "title": "Configure Your Agent",
          "body": "Copy the setup prompt into your agent. It checks prerequisites, follows the official setup guide, and verifies the result."
        }
      ]
    },
    {
      "key": "compete",
      "label": "Run the mission",
      "steps": [
        {
          "n": "03",
          "title": "Build & Control",
          "body": "The agent constructs the machine and writes its controller to launch, separate the payload, and recover hardware."
        },
        {
          "n": "04",
          "title": "Simulate & Iterate",
          "body": "The agent runs simulations, reads telemetry, diagnoses failures, and revises the machine or controller for the next test."
        }
      ]
    },
    {
      "key": "submit",
      "label": "Submit evidence",
      "steps": [
        {
          "n": "05",
          "title": "Deliver. Separate. Return.",
          "body": "Complete three payload revolutions, recover hardware, and submit the exact machine, histories, trajectory, control package, transcript, and writeup."
        }
      ]
    }
  ],
  "gameKeyCta": "Get Your Free Steam Key",
  "submitBodyForm": "Submit the final machine, controller, complete mission evidence, and writeup on Kaggle.",
  "repoCta": "Download BuildArena 2.0",
  "cta": "Submit on Kaggle"
},
  scoring: {
  "tag": "// 04 — Scoring",
  "title": "How Scores Are Computed",
  "intro": "A valid unpowered payload must complete three revolutions. Then the performance score is multiplied by the Build-mode coefficient.",
  "performanceTitle": "Performance · 100 pts",
  "performance": [
    {
      "name": "Orbital Payload",
      "weight": "15%",
      "body": "Deliver more useful payload mass. PayloadScore = 6 + 9 × M_payload / M_best for a positive qualified run; the best applicable pool receives 15/15."
    },
    {
      "name": "Payload Fuel Efficiency",
      "weight": "15%",
      "body": "η = M_payload / F_expended; EfficiencyScore = 6 + 9 × η / η_best. Fuel left on lost hardware counts as expended; fuel brought home does not. A verified legal zero-propellant mission receives 15/15."
    },
    {
      "name": "Recovery Completeness",
      "weight": "30%",
      "body": "RecoveryScore = 30 × validly recovered dry hardware mass / initial non-payload dry hardware mass. Recovery requires ≥90% structural integrity and stable landing without propulsive support for 10 seconds."
    },
    {
      "name": "Landing Accuracy",
      "weight": "40%",
      "body": "Dry-mass-weighted accuracy: land closer to the launch site. Credit falls sharply beyond about 30 game-distance units; lost hardware earns zero."
    }
  ],
  "costTitle": "Mission Rules",
  "cost": [
    {
      "name": "Three-orbit gate",
      "body": "The payload must fly unpowered through three complete revolutions, with the entire payload strictly above 1100 game-distance units from the planet center during the qualifying interval; otherwise competitive score is 0."
    },
    {
      "name": "Mission time and cost",
      "body": "Mission Time has no competition-imposed maximum or speed component in the main score. Season 02 has no token-cost or API-cost deduction from the main score."
    },
    {
      "name": "Fuel accounting",
      "body": "Fuel expenditure covers the entire mission, including recovery. Fuel remaining in validly recovered hardware is not expended."
    }
  ],
  "formulaLabel": "Official formulas",
  "formulas": [
    {
      "label": "PerformanceScore",
      "value": "PayloadScore + EfficiencyScore + RecoveryScore + LandingScore"
    },
    {
      "label": "FinalScore",
      "value": "PerformanceScore × BuildModeCoefficient"
    },
    {
      "label": "Mode coefficient",
      "value": "Autopilot ×1.25 · Copilot ×1.00"
    }
  ],
  "finalTitle": "Mission requirement",
  "finals": [
    {
      "label": "Mission",
      "value": "Deliver · Separate · Return"
    },
    {
      "label": "Qualifying payload",
      "value": "3 complete revolutions · unpowered · >1100 distance units"
    }
  ],
  "tokenNote": "No mission-duration limit, speed bonus, or token/API-cost deduction in the main score. Full formulas and validation follow Kaggle Rules and the official S02 scorer."
},
  submission: {
  "tag": "// 05 — Submission & Validation",
  "title": "What You'll Submit",
  "intro": "For Build with Agent, submit the exact final scored machine and the reproducible control/evidence package through Kaggle.",
  "deliverablesTitle": "AI Track · 6 Files",
  "deliverables": [
    "machine.bsg — exact final scored machine",
    "build_history.json",
    "build_history_full.json",
    "trajectory.csv — official telemetry from one final mission",
    "control/ — controller source, config, explanation, and one-command reproduction",
    "chat_transcript.md — Autopilot or Copilot record"
  ],
  "manifestTitle": "Writeup must include",
  "manifestFields": [
    "Machine Name / Track / Autopilot or Copilot",
    "Mission Summary and Final Run metrics",
    "Video (optional but encouraged)",
    "LLM / Agent Setup",
    "Prompts and Workflow",
    "Control System",
    "Engineering Iteration",
    "Notes"
  ],
  "humanTitle": "Human BOSS",
  "humanDeliverables": [
    "final machine.bsg",
    "final trajectory.csv",
    "Kaggle writeup describing the control method",
    "controller package if code-based control was used"
  ],
  "validationTitle": "S02 Validation Rules",
  "validations": [
    {
      "q": "No manual control in Build with Agent",
      "a": "Agents pilot the submitted machine. Humans may not edit geometry/controller, tune engineering parameters, or pilot development/final flights."
    },
    {
      "q": "Reproducible controller",
      "a": "control/ must explain telemetry inputs, outputs, phases, state transitions, guidance/PID/scripted/hybrid logic, staging, recovery, landing, thresholds, and mission completion; the official S02 entry point must reproduce the run."
    },
    {
      "q": "Evidence integrity",
      "a": "Histories must correspond to machine.bsg and trajectory.csv must come from the single final mission through the Evaluation Endpoint."
    },
    {
      "q": "Rejection conditions",
      "a": "Manual geometry changes, behavior-changing mods, illegal vanilla values, fabricated/manipulated evidence, or a prohibited ready-made machine/controller can be rejected."
    },
    {
      "q": "Official Environment",
      "a": "Use the pinned S02 environment (Besiege Build 24131898) and map. All tracks ban Automation, Surface, and Parachute blocks and parachute-equivalent mechanisms; no illegal parameters, physics changes, or fabricated evidence."
    },
    {
      "q": "Prelaunch Declaration",
      "a": "Declare payload objects, recovery machines, trackers, and mass/fuel inventories before launch. The payload denylist is separate from global block bans; see Kaggle Rules."
    }
  ],
  "reviewTitle": "Official Review",
  "review": [
    "Deadline: Nov 14, 2026 AOE; check Kaggle for the exact cutoff.",
    "Multiple submissions are allowed; the highest team submission becomes the Effective Final Submission.",
    "Scoring and winners follow unified verification after the deadline."
  ],
  "ctaRules": "Read S02 Rules",
  "ctaSubmit": "Submit on Kaggle"
},
  awards: {
  "tag": "// 06 — Awards",
  "title": "Glory & Prizes",
  "pool": {
    "label": "Season 02 prize pool",
    "amount": "$3,000",
    "unit": "total"
  },
  "mainTitle": "Main cash awards",
  "main": [
    {
      "name": "Agent Master Builder",
      "body": "Best overall verified Build with Agent result.",
      "badge": "Major prize",
      "prize": "$700"
    },
    {
      "name": "Best Build Autopilot",
      "body": "Best verified Autopilot result.",
      "badge": "Major prize",
      "prize": "$500"
    },
    {
      "name": "Best Build Copilot",
      "body": "Best verified Copilot result.",
      "badge": "Major prize",
      "prize": "$500"
    }
  ],
  "titlesTitle": "Special titles",
  "titles": [
    {
      "name": "Powerful but Brutal",
      "body": "A powerful machine that pays a price.",
      "prize": "$300"
    },
    {
      "name": "Cheap Thrills",
      "body": "Strong performance with an economical design.",
      "prize": "$300"
    },
    {
      "name": "Most Creative Machine",
      "body": "The most inventive machine or architecture.",
      "prize": "$300"
    },
    {
      "name": "Funniest Failure",
      "body": "The failure everyone remembers.",
      "prize": "$200"
    }
  ],
  "dedupeTitle": "Award allocation",
  "dedupe": "A machine may earn multiple display titles, but at most one major cash prize. If a winner is ineligible or cannot be verified, the official roll-down and verification rules apply.",
  "communityTitle": "Community",
  "community": [
    {
      "name": "Community Favorite",
      "prize": "$200"
    },
    {
      "name": "Fastest Qualified Mission",
      "prize": "Non-cash title"
    },
    {
      "name": "Best Human BOSS Build",
      "prize": "Exhibition"
    }
  ],
  "academic": {
    "title": "Academic Co-Authorship",
    "badge": "Research Recognition",
    "intro": "Share your work openly after the season.\nIf your contribution is adopted in a subsequent BuildArena academic publication, you will be invited as a co-author.",
    "contributionsTitle": "Qualifying contributions",
    "contributions": [
      "Machine used as a benchmark case or ablation target",
      "Agent workflow reproduced or analyzed as an experimental method",
      "Prompt template cited and evaluated as a system baseline",
      "Harness or evaluation protocol adopted into the official framework",
      "Build data cited as a named data point in quantitative analysis"
    ],
    "adoptionNote": "Inspiration alone does not qualify, the contribution must appear in the paper in a attributable form.\nCo-authorship follows standard academic norms."
  }
},
  leaderboard: {
  "tag": "// 07 — Leaderboard",
  "title": "Season 2 Leaderboard",
  "status": "Results After Review",
  "tabs": {
    "overall": "Overall",
    "autopilot": "Autopilot",
    "copilot": "Copilot",
    "human": "Human BOSS"
  },
  "columns": [
    "#",
    "Team",
    "Machine",
    "Mode",
    "Payload",
    "Efficiency",
    "Recovery",
    "Landing",
    "Performance",
    "Final",
    "Status"
  ],
  "emptyTitle": "Awaiting Final Results",
  "emptyBody": "The leaderboard and entry showcase will follow unified scoring and verification after the deadline.",
  "provisional": "Provisional"
},
  faq: {
  "tag": "// 08 — FAQ",
  "title": "Frequently Asked",
  "items": [
    {
      "q": "Can the agent keep revising its machine?",
      "a": "Yes. Agents may rebuild, simulate, revise machines and controllers, and select a final result within the tracked engineering run. Saving a BSG does not open a human-tuning window."
    },
    {
      "q": "How can humans help?",
      "a": "Autopilot allows no engineering guidance after start; Copilot allows natural-language strategy discussion. Neither permits manual edits, direct tuning, or piloting. Human BOSS permits manual operation."
    },
    {
      "q": "Must I open-source my entire agent system?",
      "a": "Submit reproducible mission-control code, configuration, documentation, and a run entry point; disclose relevant prompts and workflows. Unrelated private infrastructure need not be open-sourced."
    },
    {
      "q": "Can a team submit more than once?",
      "a": "Yes. Teams may have up to 3 members; no mergers. The highest team-local complete submission is selected, then one submission per team is rescored globally."
    },
    {
      "q": "Is a video required?",
      "a": "Strongly encouraged, but optional. Show the mission and its failures; video does not replace complete telemetry and the reproducible control package."
    },
    {
      "q": "Is there an extra key after the competition?",
      "a": "An accepted valid submission earns one additional Besiege base-game key to share with a friend. Complete, rule-compliant, verifiable failed missions can qualify without passing the three-orbit gate. One per participant, regardless of submission count."
    }
  ],
  "steamKeyClosed": {
    "q": "What do I need to play?",
    "a": "Besiege base game and The Broken Beyond DLC. The official competition flow provides a Steam activation key through the form when available."
  },
  "steamKeyForm": {
    "q": "How do I get a free game key?",
    "a": "300 keys, first come, first served. Email may be delayed; check spam. No DLC. Use “Get Your Free Steam Key” to fill in the form. The Splintered Sea and The Broken Beyond DLCs are also required to compete."
  }
},
  cta: {
  "title": "Ready to build\nwith your agents?",
  "button": "Join on Kaggle",
  "linksTitle": "Links",
  "links": [
    {
      "label": "Kaggle",
      "key": "kaggle"
    },
    {
      "label": "Code Repo",
      "key": "repo"
    },
    {
      "label": "BuildArena",
      "key": "paperhomepage"
    },
    {
      "label": "Besiege",
      "key": "besiege"
    },
    {
      "label": "ICML 2026 Paper",
      "key": "icml2026paper"
    }
  ],
  "copyright": "© 2026 AI for Scientific Simulation and Discovery Lab, Westlake University · Uniforce AI"
},
}

const zh: Content = {
  ...content.zh,
  hero: {
  "kicker": "BuildArena 2.0",
  "title": "Construction Challenge",
  "season": "第二赛季 · Of Course I Still Love You",
  "subtitle": "让 agent 自主建造、控制、模拟与迭代。\n这一次，把机器带回家。",
  "sloganWrong": "人类驾驶机器",
  "sloganRight": "让 agent 完成闭环",
  "ctaPrimary": "前往 Kaggle 参赛",
  "ctaSecondary": "查看参赛流程",
  "ctaDownload": "下载 MD 文档",
  "meta": "2026.09.14 – 2026.11.14 AOE · BuildArena × Besiege",
  "video": {
    "playLabel": "播放预告片",
    "caption": "BuildArena · 第二赛季",
    "watchOn": "在 YouTube 观看"
  },
},
  gameKey: {
  "notice": "限量 300 个，先到先得。邮件或有延迟，请稍候并查看垃圾箱。不含 DLC。",
  "ctaLabel": "领取免费 Steam 激活码",
  "perkPrefix": "填写表单，领取",
  "perkHighlight": "免费",
  "perkSuffix": "Besiege 本体激活码 · 限量 300 份"
},
  flow: {
  "step1": "第一步 · 领取激活码",
  "step2": "第二步 · 报名参赛"
},
  season: {
  "tag": "// 01 — 第二赛季",
  "title": "第二赛季\n「Of Course I Still Love You」",
  "datesLabel": "比赛时间",
  "dates": "2026.09.14 – 2026.11.14 AOE",
  "datesFrom": "开始",
  "datesTo": "截止",
  "datesTz": "AOE（UTC−12）",
  "briefTitle": "本季任务",
  "brief": "释放无动力载荷，完成三圈独立轨道飞行，并尽可能将发射硬件完整带回发射点附近。\n合格轨道期间，整个载荷距星心须始终大于 1100 游戏距离单位，并保持有效飞行至评测结束。\n由 agent 完成建造、控制、模拟与迭代；回收完整度与着陆精度占表现分的 70%。",
  "hooksTitle": "Agent 自主工程闭环",
  "hooks": [
    {
      "title": "建造与控制",
      "body": "agent 通过 BuildArena MCP 创建机器，自主编写和调整控制器。"
    },
    {
      "title": "模拟与观察",
      "body": "agent 使用 ba-control 运行仿真、驾驶机器并读取实时遥测。"
    },
    {
      "title": "诊断与迭代",
      "body": "agent 分析失败、修改结构和控制策略，再次测试并选择最终结果。"
    }
  ]
},
  tracks: {
  "tag": "// 02 — 赛道",
  "title": "选择你的赛道",
  "intro": "Autopilot 与 Copilot 同属 Build with Agent 主赛道。\n建造、控制、模拟与迭代均由 agent 执行。",
  "coefficientLabel": "模式系数",
  "rulesLabel": "规则",
  "note": "两种 AI 模式均禁止人工编辑或驾驶，也禁止提供成品任务机器或控制器。",
  "items": [
    {
      "name": "Build\nAutopilot",
      "badge": "×1.25",
      "badgeVariant": "default",
      "tagline": "全自主工程闭环。",
      "rules": [
        "开始前配置模型、工具、工作流和初始指令。",
        "开始后由 agent 自主设计、建造、控制、模拟和迭代。",
        "人类不得补充工程指导，也不得替 agent 选择设计、分支或最终结果。"
      ]
    },
    {
      "name": "Build\nCopilot",
      "badge": "×1.00",
      "badgeVariant": "secondary",
      "tagline": "自然语言协作，agent 执行。",
      "rules": [
        "人类可用自然语言讨论策略、提出假设、分析失败。",
        "机器、控制器、调参和飞行控制仍须由 agent 完成。",
        "不得人工修改或驾驶；通过 agent 转达实时驾驶指令也不允许。"
      ]
    },
    {
      "name": "Human Boss Challenge",
      "badge": "展示 / 基线",
      "badgeVariant": "accent",
      "tagline": "人类手动建造、调试、飞行。\n独立的人类基线。",
      "rules": [
        "同一任务与物理限制下，人类可手动建造、调参和驾驶。",
        "使用人类编写的控制代码须披露。",
        "独立展示与人类基线，不参与主赛道现金奖。"
      ]
    }
  ]
},
  how: {
  "tag": "// 03 — 参与流程",
  "title": "三步冲线",
  "intro": "设计 → 建造 → 飞行 → 观察 → 诊断 → 改进 → 重复。",
  "phases": [
    {
      "key": "prepare",
      "label": "准备",
      "steps": [
        {
          "n": "01",
          "title": "准备系统",
          "body": "准备 Windows 10/11、Besiege 本体及两个 DLC：The Splintered Sea、The Broken Beyond。"
        },
        {
          "n": "02",
          "title": "配置 Agent",
          "body": "把配置提示词复制给 agent，让它检查前置条件、按官方指南配置并验证结果。"
        }
      ]
    },
    {
      "key": "compete",
      "label": "运行任务",
      "steps": [
        {
          "n": "03",
          "title": "自主建造与控制",
          "body": "agent 创建机器、编写控制器，自主完成发射、载荷分离和硬件回收。"
        },
        {
          "n": "04",
          "title": "模拟与迭代",
          "body": "agent 运行仿真、读取遥测、诊断失败，修改机器或控制器并再次测试。"
        }
      ]
    },
    {
      "key": "submit",
      "label": "提交证据",
      "steps": [
        {
          "n": "05",
          "title": "交付 · 分离 · 返回",
          "body": "完成载荷三圈轨道、回收硬件，并提交准确的机器、历史、轨迹、控制包、对话记录和说明。"
        }
      ]
    }
  ],
  "gameKeyCta": "领取免费 Steam 激活码",
  "submitBodyForm": "通过 Kaggle 提交最终机器、控制器、完整运行记录及作品说明。",
  "repoCta": "下载 BuildArena 2.0",
  "cta": "前往 Kaggle 提交"
},
  scoring: {
  "tag": "// 04 — 评分",
  "title": "成绩如何计算",
  "intro": "无动力载荷必须完成三圈轨道；之后表现分乘以建造模式系数。",
  "performanceTitle": "表现分 · 100 分",
  "performance": [
    {
      "name": "轨道载荷",
      "weight": "15%",
      "body": "交付更多有效载荷质量。正向合格运行至少 6/15，适用池中最好成绩为 15/15。"
    },
    {
      "name": "载荷燃料效率",
      "weight": "15%",
      "body": "η = 载荷质量 / 消耗燃料；EfficiencyScore = 6 + 9 × η / η_best。丢失硬件中的燃料计入消耗，带回的燃料不计入。合法零推进剂任务直接得 15/15。"
    },
    {
      "name": "回收完整度",
      "weight": "30%",
      "body": "RecoveryScore = 30 × 有效回收干硬件质量 / 初始非载荷干硬件质量；需结构完整度 ≥90%，无推进稳定着陆 10 秒。"
    },
    {
      "name": "着陆精度",
      "weight": "40%",
      "body": "按回收硬件干质量加权；距发射点越近越好，超过约 30 游戏距离单位后得分快速下降。未回收硬件计零分。"
    }
  ],
  "costTitle": "任务门槛与边界",
  "cost": [
    {
      "name": "三圈门槛",
      "body": "载荷须无动力完成三圈完整轨道，合格期间全程严格高于行星中心 1100 游戏距离单位，否则竞争得分为 0。"
    },
    {
      "name": "Mission Time 与成本",
      "body": "Mission Time 没有比赛最大时长，不产生主分速度项；第二赛季主评分不扣 token/API 成本。"
    },
    {
      "name": "燃料记账",
      "body": "整个任务（含回收）都计入燃料消耗；有效回收硬件中剩余燃料不计入。"
    }
  ],
  "formulaLabel": "官方公式",
  "formulas": [
    {
      "label": "PerformanceScore",
      "value": "PayloadScore + EfficiencyScore + RecoveryScore + LandingScore"
    },
    {
      "label": "FinalScore",
      "value": "PerformanceScore × BuildModeCoefficient"
    },
    {
      "label": "模式系数",
      "value": "Autopilot ×1.25 · Copilot ×1.00"
    }
  ],
  "finalTitle": "任务要求",
  "finals": [
    {
      "label": "任务",
      "value": "交付 · 分离 · 返回"
    },
    {
      "label": "合格载荷",
      "value": "三圈完整轨道 · 无动力 · >1100 距离单位"
    }
  ],
  "tokenNote": "任务时长无上限，不计主分速度奖励；主分不扣 token/API 成本。完整公式与判定以 Kaggle Rules 及官方 S02 评分实现为准。"
},
  submission: {
  "tag": "// 05 — 提交与校验",
  "title": "你需要提交什么",
  "intro": "Build with Agent 通过 Kaggle 提交最终机器以及可复现的控制与证据包。",
  "deliverablesTitle": "AI 赛道 · 6 项文件",
  "deliverables": [
    "machine.bsg — 最终评分机器",
    "build_history.json",
    "build_history_full.json",
    "trajectory.csv — 单次最终任务官方 telemetry",
    "control/ — 控制器源码、配置、说明和一键复现",
    "chat_transcript.md — Autopilot 或 Copilot 记录"
  ],
  "manifestTitle": "说明必须包含",
  "manifestFields": [
    "Machine Name / Track / Autopilot 或 Copilot",
    "Mission Summary 与 Final Run 指标",
    "Video（鼓励提交）",
    "LLM / Agent Setup",
    "Prompts and Workflow",
    "Control System",
    "Engineering Iteration",
    "Notes"
  ],
  "humanTitle": "Human BOSS",
  "humanDeliverables": [
    "最终 machine.bsg",
    "最终 trajectory.csv",
    "说明控制方法的 Kaggle writeup",
    "若使用代码控制则提交 controller package"
  ],
  "validationTitle": "第二季校验规则",
  "validations": [
    {
      "q": "Build with Agent 禁止人工控制",
      "a": "由 agent 驾驶提交机器；人类不得编辑几何/控制器、调工程参数或驾驶开发/最终飞行。"
    },
    {
      "q": "控制器可复现",
      "a": "control/ 必须说明 telemetry 输入输出、阶段、状态、控制逻辑、分离、回收、着陆、阈值和任务完成；官方入口必须能复现运行。"
    },
    {
      "q": "证据完整",
      "a": "历史记录必须对应 machine.bsg，trajectory.csv 必须来自 Evaluation Endpoint 的单次最终任务。"
    },
    {
      "q": "拒绝条件",
      "a": "人工改几何/结构、改变行为的 mod、非法 vanilla 数值、伪造/篡改证据或使用禁止的成品机器/控制器均可被拒绝。"
    },
    {
      "q": "官方环境与限制",
      "a": "使用官方 S02 固定环境（Besiege Build 24131898）与地图。所有赛道禁用 Automation、Surface 和 Parachute 方块及等效降落伞机制；禁止非法参数、物理修改与伪造证据。"
    },
    {
      "q": "发射前声明",
      "a": "预先声明载荷、回收机器、追踪点和质量/燃料清单。载荷禁用清单单独适用；完整要求见 Kaggle Rules。"
    }
  ],
  "reviewTitle": "官方复核",
  "review": [
    "截止：2026 年 11 月 14 日 AOE；精确截止时间以 Kaggle 为准。",
    "允许多次提交；最高队内提交成为 Effective Final Submission。",
    "截止后进行统一验证、评分与获奖确认。"
  ],
  "ctaRules": "查看第二季 Rules",
  "ctaSubmit": "前往 Kaggle 提交"
},
  awards: {
  "tag": "// 06 — 奖项",
  "title": "荣耀与奖励",
  "pool": {
    "label": "第二赛季奖金池",
    "amount": "$3,000",
    "unit": "总计"
  },
  "mainTitle": "现金奖",
  "main": [
    {
      "name": "Agent Master Builder",
      "body": "最佳总体 verified Build with Agent 成绩。",
      "badge": "主奖",
      "prize": "$700"
    },
    {
      "name": "Best Build Autopilot",
      "body": "最佳 verified Autopilot 成绩。",
      "badge": "主奖",
      "prize": "$500"
    },
    {
      "name": "Best Build Copilot",
      "body": "最佳 verified Copilot 成绩。",
      "badge": "主奖",
      "prize": "$500"
    }
  ],
  "titlesTitle": "特别称号",
  "titles": [
    {
      "name": "Powerful but Brutal",
      "body": "强大但付出代价的机器。",
      "prize": "$300"
    },
    {
      "name": "Cheap Thrills",
      "body": "经济设计下的强劲表现。",
      "prize": "$300"
    },
    {
      "name": "Most Creative Machine",
      "body": "最具创意的机器或架构。",
      "prize": "$300"
    },
    {
      "name": "Funniest Failure",
      "body": "最令人记住的失败。",
      "prize": "$200"
    }
  ],
  "dedupeTitle": "奖项分配",
  "dedupe": "一台机器可以获得多个展示称号，但最多获得一个主现金奖；资格或验证失败时按官方 roll-down 与复核规则处理。",
  "communityTitle": "社区奖项",
  "community": [
    {
      "name": "Community Favorite",
      "prize": "$200"
    },
    {
      "name": "Fastest Qualified Mission",
      "prize": "非现金称号"
    },
    {
      "name": "Best Human BOSS Build",
      "prize": "展示"
    }
  ],
  "academic": {
    "title": "学术共同作者",
    "badge": "学术贡献认可",
    "intro": "公开分享你的贡献，若被 BuildArena 后续学术论文实质性采纳，将受邀以共同作者身份参与该论文。",
    "contributionsTitle": "符合条件的贡献类型",
    "contributions": [
      "机械结构作为基准案例或消融实验目标",
      "Agent workflow 被复现或作为实验方法分析",
      "提示词模板被直接引用并作为系统基线评估",
      "Harness 或评测协议被纳入官方评测框架",
      "建造数据以具名数据点形式出现在定量分析中"
    ],
    "adoptionNote": "仅凭灵感启发不构成采纳，贡献须以可归因形式出现在论文中。\n共同作者资格遵照标准学术规范处理。"
  }
},
  leaderboard: {
  "tag": "// 07 — 排行榜",
  "title": "第二赛季排行榜",
  "status": "赛后公布",
  "tabs": {
    "overall": "总榜",
    "autopilot": "Autopilot",
    "copilot": "Copilot",
    "human": "Human BOSS"
  },
  "columns": [
    "#",
    "队伍",
    "机器",
    "模式",
    "载荷",
    "效率",
    "回收",
    "着陆",
    "表现分",
    "最终分",
    "状态"
  ],
  "emptyTitle": "等待最终成绩",
  "emptyBody": "截止后统一评分与复核，再公布排行榜和作品展示。",
  "provisional": "Provisional"
},
  faq: {
  "tag": "// 08 — 常见问题",
  "title": "常见问题",
  "items": [
    {
      "q": "Agent 可以持续修改机器吗？",
      "a": "可以。agent 可在有记录的工程流程中反复建造、模拟、修改机器和控制器，并选择最终结果。保存 BSG 不会开放人工调参阶段。"
    },
    {
      "q": "人类可以提供哪些帮助？",
      "a": "Autopilot 开始后不得提供工程指导；Copilot 可用自然语言讨论策略。两者都禁止人工编辑、直接调参或驾驶。Human BOSS 展示组允许人工操作。"
    },
    {
      "q": "需要公开整个 Agent 系统吗？",
      "a": "须提交可复现任务的控制代码、配置、说明和运行入口，并披露相关提示词与工作流。无关的私有基础设施不要求开源。"
    },
    {
      "q": "可以多次提交吗？",
      "a": "可以。每队最多 3 人，不允许合队。先按队内评分选出最高分完整提交，再将每队一份提交进行全局重算。"
    },
    {
      "q": "需要提交视频吗？",
      "a": "强烈鼓励，但不强制。视频可展示任务与失败过程；不能代替完整轨迹和可复现控制包。"
    },
    {
      "q": "赛后还有额外激活码吗？",
      "a": "获接受的有效提交可在赛后领取一个额外 Besiege 本体激活码赠予朋友。合规、完整、可核验的失败作品也可获得，无需通过三圈门槛；每人一份，不随提交次数增加。"
    }
  ],
  "steamKeyClosed": {
    "q": "需要什么游戏？",
    "a": "需要 Besiege 本体和 The Broken Beyond DLC；官方比赛流程会在可用时通过表单提供 Steam 激活码。"
  },
  "steamKeyForm": {
    "q": "如何领取免费游戏激活码？",
    "a": "限量 300 个，先到先得。邮件或有延迟，请稍候并查看垃圾箱。不含 DLC。 点击「领取免费 Steam 激活码」填写表单。参赛另需 The Splintered Sea 和 The Broken Beyond DLC。"
  }
},
  cta: {
  "title": "准备好和你的 agents\n一起建造了吗？",
  "button": "前往 Kaggle 参赛",
  "linksTitle": "链接",
  "links": [
    {
      "label": "Kaggle",
      "key": "kaggle"
    },
    {
      "label": "代码库",
      "key": "repo"
    },
    {
      "label": "BuildArena",
      "key": "paperhomepage"
    },
    {
      "label": "ICML 2026",
      "key": "icml2026paper"
    },
    {
      "label": "Besiege",
      "key": "besiege"
    }
  ],
  "copyright": "© 2026 AI for Scientific Simulation and Discovery Lab, Westlake University · Uniforce AI"
},
}

export const season2Content: Record<Lang, Content> = { en, zh }

/** Setup copy is shared by the Hero prompt and the participation steps. */
export const setupContent = {
  en: {
    title: "One Prompt to Get Started",
    intro: "Copy this prompt into your agent. It will check prerequisites and guide you through setup.",
    copy: "Copy Setup Prompt",
    copied: "Copied — paste into your agent",
    copyFailed: "Copy unavailable. The prompt is selected; copy it manually.",
    promptLabel: "BuildArena setup prompt",
    jump: "Get Setup Prompt",
    prompt: `Please help me set up BuildArena 2.0.

Official repository: {repo}

First read the repository README and Chinese setup guide. Check Windows 10/11, a licensed Steam copy of Besiege, both The Splintered Sea and The Broken Beyond DLCs, and the specified BuildArena ToolKit. Verify that installation and downloads are complete. If prerequisites are missing, tell me what I need to add.

Get the repository while preserving existing files, then follow the official guide to run the one-click setup. If you cannot locate the game, ask me for the Besiege_Data path. Run examples only after the setup command exits successfully and .local/setup-report.json reports status as passed. Otherwise, diagnose the logs and verify again.`,
  },
  zh: {
    title: "一段提示词，轻松开始",
    intro: "复制给你的 agent，让它检查前置条件并完成配置。",
    copy: "复制配置提示词",
    copied: "已复制，粘贴给你的 agent",
    copyFailed: "暂时无法自动复制，已选中提示词，请手动复制。",
    promptLabel: "BuildArena 配置提示词",
    jump: "获取配置提示词",
    prompt: `请帮我配置 BuildArena 2.0。

官方仓库：{repo}

先阅读仓库 README 和中文配置指南，检查 Windows 10/11、Steam 正版 Besiege、The Splintered Sea 与 The Broken Beyond 两个 DLC，以及指定 BuildArena ToolKit 是否安装并下载完成。缺少前置条件时，告诉我需要补齐什么。

获取仓库并保留已有文件，按官方指南完成一键配置。找不到游戏时，向我询问 Besiege_Data 路径。只有配置命令成功退出，且 .local/setup-report.json 中 status 为 passed，才继续运行示例；否则根据日志排查并重新验证。`,
  },
} satisfies Record<Lang, {
  title: string
  intro: string
  copy: string
  copied: string
  copyFailed: string
  promptLabel: string
  jump: string
  prompt: string
}>

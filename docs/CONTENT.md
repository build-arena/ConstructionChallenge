# BuildArena 2.0 Challenge — 内容与信息架构文档 (CONTENT.md)

> 本文档定义官网呈现的**内容范围、信息架构与文案**。
> 配套设计规范见 [`DESIGN.md`](./DESIGN.md)，赛事规则原文见 [`BuildArena Competition Spec v0.1.md`](./BuildArena%20Competition%20Spec%20v0.1.md)。

## 0. 定位与原则

- **性质**：第一赛季「To Infinity, and Beyond」赛事**官方展示站**（不是 coming-soon 预告页）。
- **职责边界**：网站**只负责信息呈现**，不处理任何报名/提交逻辑。所有「提交」相关 CTA 一律**引导用户前往 Kaggle**（链接当前用占位 `KAGGLE_URL`，上线前替换）。
- **语言**：**中英文双语**，全站一键切换，默认英文（`en`），可切换中文（`zh`）。所有文案条目都需提供 en / zh 两份。
- **风格延续**：沿用旧 `#challenge` 页的复古街机/像素太空风（详见 DESIGN.md）。
- **占位约定**：尚未确定的外链统一用大写占位常量，集中在 `src/config/links.ts`：
  - `ICML_PAPER_URL`（右上跳转主站，暂指向 BuildArena 论文站）
  - `KAGGLE_URL`（提交入口）
  - `REPO_URL`（BuildArena 2.0 代码库）
  - `BESIEGE_URL` / `DLC_URL`（Steam 游戏与 The Broken Beyond DLC）
  - `DISCORD_URL` / `CONTACT_EMAIL`（社区与联系）

## 1. 信息架构（页面分区）

单页滚动 + 顶部导航锚点。顺序如下：

| # | Section | 锚点 id | 目的 |
|---|---------|---------|------|
| 0 | 顶部导航 NavBar | — | 锚点导航 + 语言切换 + 跳主站按钮 |
| 1 | Hero | `#home` | 赛季主张、主题、核心 CTA |
| 2 | Season Brief 赛季简介 | `#season` | 时间/主题/题目/叙事钩子 |
| 3 | Tracks 赛道 | `#tracks` | 两条正式赛道 + Human Boss Challenge |
| 4 | How It Works 参与流程 | `#how` | 12 步参与流程，落点 Kaggle |
| 5 | Scoring 评分体系 | `#scoring` | Performance / Cost / Raw / Final |
| 6 | Submission & Validation 提交与校验 | `#submission` | 提交产物 + 校验规则（信息展示） |
| 7 | Leaderboard 排行榜 | `#leaderboard` | 完整可用组件，内容 Coming Soon |
| 8 | Awards 奖项 | `#awards` | 技术奖 + Track Titles + 社区奖 |
| 9 | FAQ | `#faq` | 常见问题 |
| 10 | CTA / Footer | `#join` | 最终号召 + 外链 + 版权 |

## 2. 各 Section 内容明细

### 1) Hero `#home`
- Kicker 徽标：`BUILDARENA 2.0`
- 主标题：`CONSTRUCTION CHALLENGE`
- 赛季主题条：`SEASON 1 · TO INFINITY, AND BEYOND`
- 副标题：
  - en: "The agent-native engineering construction arena. Design the agents — let them build for the stars."
  - zh: 「智能体原生的工程建造竞技场。设计你的 agent，让它们为群星建造。」
- Slogan 卡（延续旧页）：
  - `✗ build by yourself` / `✓ build with your agents`
- 主 CTA：`Join on Kaggle →`（→ `KAGGLE_URL`）；次 CTA：`How it works`（滚动到 `#how`）。
- 元信息小字：`2026.07 – 2026.08 · Besiege × The Broken Beyond`

### 2) Season Brief `#season`
- 标题：`SEASON 1 — "TO INFINITY, AND BEYOND"`
- 时间：`2026.7 – 2026.8`
- 题目（核心，醒目排版）：
  - en: "Build a single mechanical craft that launches from the starting planet in *The Broken Beyond* space sandbox, achieves a stable orbit, and completes as many orbital periods as possible. The tracked judgment point is the **Starting Block**; other parts are unconstrained. Final score combines run performance, build cost, and a track coefficient."
  - zh: 「建造单体机械装置，使其在 The Broken Beyond 太空沙盒中从起始星球出发，实现稳定入轨运行，并在星球轨道上完成尽可能多的周期运行。轨迹跟踪与判定点为 Starting Block，机械体其他元件的轨迹不单独约束。最终成绩由运行表现、建造成本和赛道系数共同决定。」
- 叙事钩子（3 个小卡 / chips）：
  1. 致敬《玩具总动员》巴斯光年 catch phrase
  2. 呼应 Uniforce AI 的愿景
  3. 呼应 Besiege DLC "The Broken Beyond" 的社群热度

### 3) Tracks `#tracks`
三张卡（前两张为正式赛道，第三张为展示赛），每张含：名称、赛道系数 badge、一句话定位、规则要点列表。

- **Build Autopilot** — `COEFFICIENT ×1.15`
  - 建造前定义 agent / prompt / workflow
  - 建造开始后 agent 自主完成结构生成
  - 过程中人类不得以自然语言、代码或手动编辑干预结构
  - 完成后仅可改控制配置，不可改结构
  - 运行阶段由人类手动驾驶
  - 标注：难度更高，故以系数补偿
- **Build Copilot** — `COEFFICIENT ×1.00`
  - 人在回路，可多轮自然语言指令与 agent 协同建造
  - 所有结构生成/修改必须经 BuildArena MCP/API 完成
  - 不得直接手动编辑 BSG 结构
  - 完成后仅可改控制配置，不可改结构
  - 运行阶段由人类手动驾驶
- **Human Boss Challenge** — `EXHIBITION`（展示组，标记为非正式赛道）
  - 人类手动建造，作为展示组参与
  - 不进入两条 AI 赛道技术总榜
  - 设展示奖项：Best Human Build / Most Creative Machine / Community Favorite
  - 禁止 MOD；禁止无限 slider / rescale / 非法参数
- 说明区（折叠/小字）：pilot 指建造阶段而非运行阶段；两条正式赛道运行均由人类真实驾驶；「AI 造不完美机械、人类把它开好」是核心乐趣。

### 4) How It Works `#how`
分步流程（12 步，时间线/编号卡呈现）。压缩为可读步骤：
1. Fork 并下载 BuildArena 2.0 代码库（→ `REPO_URL`）
2. 购买并下载 Besiege + The Broken Beyond DLC（→ `BESIEGE_URL` / `DLC_URL`）
3. 配置 SKILLS、游戏文件路径与 MCP 服务器
4. 选择赛道：Build Autopilot 或 Build Copilot
5. 用赛季题目 + 自定义 agent 提示词/框架/工具/IDE，通过 BuildArena MCP 执行建造
6. MCP 自动保存：原始 BSG / 有效建造历史 JSON / 全量建造历史 JSON / 文本输出记录 MD
7. 在游戏沙盒加载 BSG
8. 仅修改元件控制参数（不得改结构）
9. 注入的轨迹跟踪脚本记录 Starting Block 轨迹并导出 trajectory CSV
10. 手动驾驶完成任务并全程录制视频
11. 视频上传 YouTube / Bilibili 等并带 `#BuildArena #AI4E` 标签
12. **提交你认为最好的 1 个机械装置 → 前往 Kaggle**（`KAGGLE_URL`）
- 区块结尾大 CTA：`Submit on Kaggle →`

### 5) Scoring `#scoring`
用结构化卡 + 公式呈现。

- **Performance Score**（三类建造统一计算，仅依据 trajectory CSV 与运行结果）
  - Orbit Progress — 50%（按 Starting Block 完成的轨道周期数；满 3 周期满分；未满按累计角位移给分）
  - Orbit Stability — 25%（轨道半径波动 / 降轨趋势 / 异常偏离）
  - Survival — 15%（机械完整性 / Starting Block 连接 / 运行是否中断）
  - Style / Fun Bonus — 10%（社区投票，奖励有趣、离谱、优雅、有传播力的设计）
- **Cost Efficiency Score**
  - Mechanical Cost（模块数量与模块点数；越少越低）
  - Token Cost（input/output/reasoning/cached token）
  - Error Cost（失败 / 非法 / 回退 / 重复无效尝试）
  - 公式：
    - Autopilot / Copilot：`Cost = 0.4 × Mechanical + 0.3 × Token + 0.3 × Error`
    - Human Boss：`Cost = Mechanical`
- **Raw Score**：`Raw = max(0, Performance − Cost Penalty)`
- **Final Score**：
  - Autopilot / Copilot：`Final = Raw × Track Coefficient`
  - Human Boss：不进 AI 总榜，仅展示 Human Performance Score 作横向对比
- 补充小字：Token Cost 统计三优先级（官方 Token Logger > API usage 字段 > 离线估算）；获奖候选须通过官方 token 复核。

### 6) Submission & Validation `#submission`
两栏：**提交产物** / **校验规则**（纯信息展示，强调实际提交在 Kaggle）。

- 提交产物（Autopilot / Copilot）：manifest.json、原始 BSG、有效建造历史 JSON、全量建造历史 JSON、文本输出记录 MD、人类调参后运行 BSG、视频链接 URL、轨迹 CSV
- manifest.json 关键字段：team_name、machine_name、track、BuildArena/Besiege/DLC version、LLM list、agent framework/IDE、是否视觉反馈、建造轮次、MCP tool call 数、文件 hash、视频 URL
- Human Boss 提交产物：运行 BSG、视频链接、轨迹 CSV
- 校验要点（折叠 Accordion）：真实性校验 A/B、人工修改校验 A/B、MOD 校验、视频/轨迹有效性、赛道校验；Human Boss 的 re-scale / 参数 / MOD 校验
- 官方复核流程：所有提交先进 Provisional，获奖候选进 Verified（文件完整性 / BSG diff / 参数合法性 / 轨迹 / 视频 / 必要时官方 clean rerun）。仅 Verified 可获正式奖金。
- CTA：`Read full rules`（→ spec/Repo）+ `Submit on Kaggle`。

### 7) Leaderboard `#leaderboard`
- 标题 + 状态徽标 `SEASON 1 · COMING SOON`
- Tabs：`Overall` / `Build Autopilot` / `Build Copilot` / `Human Boss`
- 表格列（依据 spec 主排行榜）：Rank、Team、Machine、Track、LLMs、Single/Multi-Agent、Vision、Iterations、MCP Calls、Modules、Module Pts、Performance、Cost Eff.、Raw、Final、Status(Provisional/Verified)
- 内容：渲染**真实表头与列结构**，表体为 Coming Soon 空状态（如 8 行骨架/占位 + 居中 "Leaderboard opens when Season 1 begins"）。组件必须**立即可用**：切换 tab、列对齐、响应式横向滚动都正常工作，后续接入数据即可。

### 8) Awards `#awards`
- 主技术奖（卡片）：
  - Agent Master Builder — Final Score 最高的正式赛道作品
  - Powerful but Brutal — `Brutality = Performance + Cost`，门槛 Performance ≥ 70
  - Cheap Thrills — `Thrift = Performance − 2 × Cost`，门槛 Performance ≥ 60
- Track Titles：Best Build Autopilot / Best Build Copilot
- 去重规则（小字）：同作品可多 title，但最多领一份主奖金；优先级 Agent Master Builder > Powerful but Brutal > Cheap Thrills > Best Track，奖金顺延
- 社区奖：Community Favorite / Most Creative Machine / Funniest Failure / Best Human Boss Build

### 9) FAQ `#faq`
Accordion，建议条目：
- Autopilot 和 Copilot 的核心区别？
- 一定要买 The Broken Beyond DLC 吗？
- 运行阶段可以让 AI 驾驶吗？（不行，人类手动驾驶）
- Human Boss Challenge 会进总榜吗？（不进 AI 总榜，作横向人类基准）
- 怎么统计 token？（三优先级）
- 在哪里提交？（Kaggle）

### 10) CTA / Footer `#join`
- 大号召：`READY TO BUILD WITH YOUR AGENTS?` + `Join on Kaggle →`
- 外链组：Kaggle / Repo / BuildArena 主站 / Besiege / Discord / Email
- 版权：`© 2026 AI for Scientific Simulation and Discovery Lab, Westlake University.`

## 3. 导航与跳转
- NavBar 锚点：Season / Tracks / How / Scoring / Leaderboard / Awards / FAQ
- 右上「跳主站」按钮（旧切换按钮改造）：文案 `ICML 2026 ↗`，跳 `ICML_PAPER_URL`（占位）。
- 语言切换：`EN / 中`，持久化到 `localStorage`。
- 移动端：NavBar 收起为 Sheet 抽屉菜单。

## 4. 待确认 / 后续替换清单
- [ ] 所有占位外链（KAGGLE_URL / ICML_PAPER_URL / REPO_URL / BESIEGE_URL / DLC_URL / DISCORD_URL / CONTACT_EMAIL）
- [ ] 赛季奖金/实物奖励具体内容（spec 未给）
- [ ] Leaderboard 真实数据接入格式（赛季开始后）
- [ ] 是否需要建造预览 / step-wise 回放（spec 展示页提到，本期暂以占位说明）

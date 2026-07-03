<div align="center">

# 🚀 BuildArena 2.0 — Construction Challenge

**第一赛季 · 飞向宇宙 浩瀚无垠**

`2026.07 – 2026.08 · BuildArena × Besiege`

[![前往 Kaggle 参赛](https://img.shields.io/badge/%E5%89%8D%E5%BE%80%20Kaggle%20%E5%8F%82%E8%B5%9B-20BEFF?style=flat-square&logo=kaggle)](https://www.kaggle.com/)  [![代码库](https://img.shields.io/badge/%E4%BB%A3%E7%A0%81%E5%BA%93-181717?style=flat-square&logo=github)](https://github.com/AI4Science-WestlakeU/BuildArena)  [![ICML 2026 论文](https://img.shields.io/badge/ICML%202026%20%E8%AE%BA%E6%96%87-B31B1B?style=flat-square)](https://openreview.net/forum?id=QAQKmIp3SZ)  [![Besiege](https://img.shields.io/badge/Besiege-1b2838?style=flat-square&logo=steam)](https://store.steampowered.com/app/346010/)

*智能体原生的工程建造竞技场。*

</div>


---

## 📋 目录

- [赛季简介](#-赛季-1飞向宇宙浩瀚无垠)
- [赛道](#️-赛道)
- [参与流程](#-参与流程)
- [评分规则](#-评分规则)
- [提交与校验](#-提交与校验)
- [奖项](#-奖项)
- [常见问题](#-常见问题)
- [链接](#-链接)


---

## 🪐 第一赛季 — 「飞向宇宙 浩瀚无垠」

> **时间：**2026.7 – 2026.8

### 赛题

建造单体机械装置，使其在 The Broken Beyond 太空沙盒中从起始星球出发，实现稳定入轨运行，并在星球轨道上完成尽可能多的周期运行。

轨迹跟踪与判定点为 Starting Block，机械体其他元件不单独约束。

最终成绩由运行表现、建造成本和赛道系数共同决定。

### 为什么是这个主题？

| 主题 | 含义 |
| --- | --- |
| **巴斯光年** | 致敬《玩具总动员》 |
| **Uniforce AI** | AI 工程应用的无限可能 |
| **The Broken Beyond** | Besiege 的全新 DLC |


---

## 🛤️ 选择你的赛道

> 两条正式 AI 赛道，外加一个展示组。
> 这里的「Pilot」指建造阶段，所有作品最终都由人类亲手驾驶运行。

### Build Autopilot `×1.15`

> 建造前定义好你的 agent squad， 然后让它们独立完成建造。

**规则：**
1. 建造前定义 agent / prompt / workflow。
2. 建造开始后，agent 通过 BuildArena MCP 自主完成结构生成。
3. 建造过程中人类不得以自然语言、代码或手动编辑干预结构。
4. 建造完成后仅可修改控制配置，不得修改结构。
5. 运行阶段由人类手动驾驶。


### Build Copilot `×1.00`

> 人在回路。 用语言引导 agent 协同建造。

**规则：**
1. 可通过多轮自然语言指令与 agent 协同完成建造。
2. 所有结构生成/修改必须经 BuildArena MCP 完成。
3. 不得直接手动编辑 BSG 结构。
4. 建造完成后仅可修改控制配置，不得修改结构。
5. 运行阶段由人类手动驾驶。


### Human Boss Challenge `Human vs. AI`

> 人类手工制造。 让 AI 看看什么叫 BOSS。

**规则：**
1. 人类手动建造的作品作为展示组参与。
2. 不进入两条 AI 赛道的技术总榜。
3. 设展示奖项：Best Human Build / Most Creative / Community Favorite。
4. 不允许使用 MOD，仅限原版 Besiege。
5. 不允许无限 slider、rescale 或非法参数。


> AI 造出不完美的机械，但人类能把它开好：这正是比赛的核心乐趣。
> > Autopilot 难度更高，因此获得 x1.15 赛道系数加成。


---

## 🔧 从 Fork 到终点线

> 本站仅作信息展示，提交在 Kaggle 完成。 完整流程如下。

| 步骤 | 标题 | 说明 |
| --- | --- | --- |
| **01** | Fork 代码库 | Fork 并下载 BuildArena 2.0 代码库。 |
| **02** | 购买游戏 | 购买并安装 Besiege + The Broken Beyond DLC。 |
| **03** | 完成配置 | 配置游戏文件路径、MCP 服务器与 MOD。 |
| **04** | 选择赛道 | 选择 Build Autopilot 或 Build Copilot。 |
| **05** | 通过 MCP 建造 | 用赛季题目与自定义 agent，通过 BuildArena MCP 执行建造。 |
| **06** | 保存建造 | MCP 保存原始 BSG、有效与全量建造历史 JSON。务必保存文本记录 MD。 |
| **07** | 加载 BSG | 在游戏沙盒中加载机械。 |
| **08** | 调整控制 | 仅修改控制参数，绝不能修改结构。 |
| **09** | 记录轨迹 | 注入的跟踪脚本记录 Starting Block 轨迹并导出 trajectory CSV。 |
| **10** | 驾驶并录制 | 手动驾驶机械完成任务，并录制完整运行视频。 |
| **11** | 发布视频 | 上传到 YouTube / Bilibili 并带 #BuildArena #AI4E #Besiege。 |
| **12** | 在 Kaggle 提交 | 提交你认为最好的单次机械运行。 |


---

## 📊 成绩如何计算

> 所有作品采用完全一致的 Performance 计算，只依据 trajectory CSV 和运行结果。

### Performance Score

| 指标 | 权重 | 说明 |
| --- | --- | --- |
| **Orbit Progress** | `50%` | 按 Starting Block 完成的轨道周期数计算。 满 3 周期满分。 未满按累计角位移给部分分。 |
| **Orbit Stability** | `25%` | 轨道半径波动、降轨趋势与异常偏离程度。 |
| **Survival** | `15%` | 机械完整性、Starting Block 连接、运行是否中断。 |
| **Style / Fun Bonus** | `10%` | 社区投票，奖励有趣、离谱、优雅、有传播力的设计。 |

### Cost Efficiency Score

| 成本类型 | 说明 |
| --- | --- |
| **Mechanical Cost** | 模块数量与模块点数——越少越轻，成本越低。 |
| **Token Cost** | 建造全过程的 input / output / reasoning / cached token。 |
| **Error Cost** | 失败、非法、回退与重复无效尝试。 |

### 公式

```
# Autopilot / Copilot
Cost = 0.4 × Mechanical + 0.3 × Token + 0.3 × Error

# Human Boss
Cost = Mechanical

# Raw Score
Raw = max(0, Performance − Cost Penalty)
# Final（AI 赛道）
Final = Raw × Track Coefficient
# Human Boss
展示 Performance Score，作为与 AI 的对比。
```

> **Token 统计：** Token 统计三优先级：官方 BuildArena Token Logger ＞ 模型 API usage 字段 ＞ 离线估算。 获奖候选须通过官方 token 复核。


---

## 📦 你需要提交什么

> 实际提交在 Kaggle 完成。 以下是需收集的产物及其校验方式。

### 提交产物 （Autopilot / Copilot）

- [ ] `manifest.json`
- [ ] `原始机械 BSG（agent 产出）`
- [ ] `有效建造历史 JSON`
- [ ] `全量建造历史 JSON`
- [ ] `建造过程文本记录 MD`
- [ ] `人类调参后运行 BSG（仅控制）`
- [ ] `运行视频链接 URL`
- [ ] `轨迹 CSV`
- [ ] `Prompt & Workflow`

### manifest.json 至少包含

- team_name、machine_name、track
- BuildArena MCP 版本
- LLM ID、agent 框架 / IDE
- 是否使用视觉反馈
- 建造轮次
- Token 用量
- 文件 hash、视频 URL

### Human Boss 提交产物

- [ ] 人类手动建造的运行 BSG
- [ ] 运行视频链接 URL
- [ ] 轨迹 CSV

### 校验规则

| 检查项 | 规则 |
| --- | --- |
| **真实性校验 A** | 通过官方 BuildArena JSON Parser 和有效建造历史 JSON 重建 BSG。 若与提交的原始 BSG 不符：REJECTED。 |
| **真实性校验 B** | 交叉检查全量建造历史 JSON 与文本记录 MD。 若有明显缺失、伪造或不一致：REJECTED。 |
| **人工修改校验 A** | 对比原始与调参后 BSG 的结构字段。 若 block type/count/geometry 变化：REJECTED。 * 允许添加 Camera block。 |
| **人工修改校验 B** | Data 字段只允许修改合法控制参数。 出现无限 slider、负力或非法范围：REJECTED。 |
| **MOD / 视频 / 轨迹** | 存在未允许 MOD 字段、视频链接失效、轨迹 CSV 缺失或格式错误：REJECTED。 |
| **赛道校验** | Autopilot 中若建造开始后出现人工自然语言指导或手动结构干预，将转入 Copilot。 |

### 官方复核

1. 所有提交先进入 Provisional 排行榜。
2. 获奖候选进入 Verified 流程。
3. 复核：文件完整性、BSG diff、参数合法性、轨迹 CSV、视频链接、必要时官方 clean rerun。
4. 只有 Verified 作品可获得正式奖项。


---

## 🏆 荣耀与奖励

**赛季奖金池：$1,000 / 赛季**

### 主奖项

| 奖项 | 条件 | 奖励 |
| --- | --- | --- |
| **Agent Master Builder** | 正式赛道 Final Score 最高者。 赛季最强 AI 建造作品。 | **$250** |
| **Powerful but Brutal** | 高性能、高成本的暴力美学。 Brutality = Performance + Cost。 Performance ≥ 70% 方可参评。 | **$100** |
| **Cheap Thrills** | 便宜、轻量、简陋，但意外好用。 Thrift = Performance - 2 × Cost。 Performance ≥ 60% 方可参评。 | **$100** |

### 赛道头衔

| 头衔 | 条件 | 奖励 |
| --- | --- | --- |
| **Best Build Autopilot** | Autopilot 赛道 Final Score 最高的作品。 | **$150** |
| **Best Build Copilot** | Copilot 赛道 Final Score 最高的作品。 | **$150** |

### 社区奖项

| 奖项 | 奖励 |
| --- | --- |
| **Most Creative Machine** | $100 |
| **Funniest Failure** | $75 |
| **Community Favorite** | $75 |
| **Best Human Boss Build** | 展示奖 |

> **奖项去重规则：** 同一作品可拥有多个展示 title，但最多领取一份主要现金奖励。 优先级：Agent Master Builder ＞ Powerful but Brutal ＞ Cheap Thrills ＞ Best Track。 低优先级奖励顺延给下一名符合条件的作品。


---

## ❓ 常见问题

<details>
<summary><strong>Autopilot 和 Copilot 有什么区别？</strong></summary>

Autopilot：定义好 agent 后由其全自主建造。Copilot：你用自然语言引导 agent，但所有结构变化仍须经 MCP。

</details>

<details>
<summary><strong>要买 The Broken Beyond DLC 吗？</strong></summary>

需要，第一赛季的入轨赛题运行在该 DLC 的太空沙盒中。

</details>

<details>
<summary><strong>运行阶段可以让 AI 驾驶吗？</strong></summary>

不行。所有运行都由人类手动驾驶；pilot 仅指建造阶段。

</details>

<details>
<summary><strong>Human Boss Challenge 会进总榜吗？</strong></summary>

不进 AI 总榜，但其 Performance Score 会作为与 AI 的对比展示。

</details>

<details>
<summary><strong>Token 用量如何统计？</strong></summary>

三优先级：官方 Token Logger ＞ 模型 API usage 字段 ＞ 离线估算。

获奖候选需可信 token 记录。

</details>

<details>
<summary><strong>在哪里提交？</strong></summary>

在 Kaggle 提交。本站仅作信息展示。

</details>


---

## 🔗 链接

| 资源 | 链接 |
| --- | --- |
| 🏁 **前往 Kaggle 参赛** | https://www.kaggle.com/ |
| 💻 **代码库** | https://github.com/AI4Science-WestlakeU/BuildArena |
| 🏠 **BuildArena 主页** | https://build-arena.github.io/ |
| 🎮 **Besiege（Steam）** | https://store.steampowered.com/app/346010/ |
| 📚 **ICML 2026 论文** | https://openreview.net/forum?id=QAQKmIp3SZ |
| ✉️ **联系我们** | mailto:wutailin@westlake.edu.cn |


---

<div align="center">

© 2026 AI for Scientific Simulation and Discovery Lab, Westlake University.

</div>

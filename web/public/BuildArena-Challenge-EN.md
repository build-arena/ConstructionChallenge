<div align="center">

# 🚀 BuildArena 2.0 — Construction Challenge

**Season 1 · To Infinity, and Beyond**

`2026.07 – 2026.08 · BuildArena × Besiege`

[![Join on Kaggle](https://img.shields.io/badge/Join%20on%20Kaggle-20BEFF?style=flat-square&logo=kaggle)](https://www.kaggle.com/)  [![Code Repo](https://img.shields.io/badge/Code%20Repo-181717?style=flat-square&logo=github)](https://github.com/build-arena/BuildArena-2.0)  [![ICML 2026 Paper](https://img.shields.io/badge/ICML%202026%20Paper-B31B1B?style=flat-square)](https://openreview.net/forum?id=QAQKmIp3SZ)  [![Besiege](https://img.shields.io/badge/Besiege-1b2838?style=flat-square&logo=steam)](https://store.steampowered.com/app/346010/)

*The agent-native engineering construction arena.*

</div>


---

## 📋 Table of Contents

- [Season Brief](#-season-1--to-infinity-and-beyond)
- [Tracks](#️-tracks)
- [How it Works](#-how-it-works)
- [Scoring](#-scoring)
- [Submission & Validation](#-submission--validation)
- [Awards](#-awards)
- [FAQ](#-faq)
- [Links](#-links)


---

## 🪐 Season 1 — "To Infinity, and Beyond"

> **Window:** 2026.7 – 2026.8

### The Mission

Build a single mechanical craft that launches from the starting planet in The Broken Beyond space sandbox, reaches a stable orbit, and completes as many orbital periods as possible.

The tracked judgment point is the Starting Block — other parts are unconstrained.

The final score combines run performance, build cost, and a track coefficient.

### Why this theme ?

| Theme | Meaning |
| --- | --- |
| **Buzz Lightyear** | A nod to the Toy Story. |
| **Uniforce AI** | AI for Engineering beyond limits |
| **The Broken Beyond** | Besiege's brand new DLC. |


---

## 🛤️ Choose Your Track

> Two official AI tracks plus an exhibition class.
> "Pilot" refers to the build phase, every run is hand-driven by a human.

### Build Autopilot `×1.15`

> Define your agents squad up front,  Let them build all alone.

**Rules:**
1. Define agent / prompt / workflow before building starts.
2. Once begins, the agent builds the structure autonomously through the BuildArena MCP.
3. No human intervention via language, code, or manual editing during the build.
4. After the build, only control config may change — never the structure.
5. The run is hand-driven by a human.


### Build Copilot `×1.00`

> Human-in-the-loop. Steer the agent with language.

**Rules:**
1. Collaborate over multiple turns of natural-language instructions.
2. All structure generation / edits must go through the BuildArena MCP.
3. No direct manual editing of the BSG structure.
4. After the build, only control config may change — never the structure.
5. The run is hand-driven by a human.


### Human Boss Challenge `Human vs. AI`

> Hand-made by humans. Show AI how BOSS is done.

**Rules:**
1. Human-built machines compete as an exhibition class.
2. Does not enter the official AI leaderboards.
3. Showcase awards: Best Human Build / Most Creative / Community Favorite.
4. No MODs, vanilla Besiege only.
5. No infinite sliders, rescale, or out-of-spec parameters.


> AI builds an imperfect machine, but a human drives it well: that's the core fun.
> > Autopilot is harder, so it earns a coefficient bonus x1.15.


---

## 🔧 From Fork to Finish Line

> The site is informational, submission happens on Kaggle. Here is the full flow.

| Step | Title | Description |
| --- | --- | --- |
| **01** | Fork the repo | Fork and download the BuildArena 2.0 codebase. |
| **02** | Get the game | Buy and install Besiege + The Broken Beyond DLC. |
| **03** | Configure | Set up game file paths, the MCP server, and MODs. |
| **04** | Pick a track | Choose Build Autopilot or Build Copilot. |
| **05** | Build via MCP | Use the season brief and your own agents to build through the BuildArena MCP. |
| **06** | Save the Build | MCP saves raw BSG, valid + full build-history JSON. DO SAVE the text transcript MD. |
| **07** | Load the BSG | Load the machine in the game sandbox. |
| **08** | Tune controls | Adjust control parameters only, NEVER the structure. |
| **09** | Track trajectory | The injected tracker records the Starting Block path and exports a trajectory CSV. |
| **10** | Drive & record | Manual-drive the machine to complete the task, recording the full run video. |
| **11** | Publish video | Upload to YouTube / Bilibili with #BuildArena #AI4E #Besiege. |
| **12** | Submit on Kaggle | Submit the single machine run you think is best. |


---

## 📊 How Scores Are Computed

> Performance is computed identically for every build, from the trajectory CSV and run result alone.

### Performance Score

| Metric | Weight | Description |
| --- | --- | --- |
| **Orbit Progress** | `50%` | Based on orbital periods completed by the Starting Block. Three periods = full marks. Partial credit by accumulated angular displacement. |
| **Orbit Stability** | `25%` | Orbit-radius fluctuation, decay trend, and abnormal deviation. |
| **Survival** | `15%` | Structural integrity, Starting Block connection, and run continuity. |
| **Style / Fun Bonus** | `10%` | Community vote, rewarding fun, absurd, elegant, shareable designs. |

### Cost Efficiency Score

| Cost Type | Description |
| --- | --- |
| **Mechanical Cost** | Module count and module points — fewer & lighter is cheaper. |
| **Token Cost** | Input / output / reasoning / cached tokens across the whole build. |
| **Error Cost** | Failed, illegal, rollback, and repeated invalid attempts. |

### Formulas

```
# Autopilot / Copilot
Cost = 0.4 × Mechanical + 0.3 × Token + 0.3 × Error

# Human Boss
Cost = Mechanical

# Raw Score
Raw = max(0, Performance − Cost Penalty)
# Final (AI tracks)
Final = Raw × Track Coefficient
# Human Boss
Show Performance Score as a comparison to AI.
```

> **Token cost:** Token cost has three tiers: official BuildArena Token Logger > model API usage fields > offline estimation. Award candidates must pass an official token review.


---

## 📦 What You'll Submit

> The actual submission happens on Kaggle. Below is what's collected and how it's validated.

### Deliverables (Autopilot / Copilot)

- [ ] `manifest.json`
- [ ] `Raw machine BSG (agent output)`
- [ ] `Valid build-history JSON`
- [ ] `Full build-history JSON`
- [ ] `Build transcript MD`
- [ ] `Human-tuned running BSG (control only)`
- [ ] `Run video URL`
- [ ] `Trajectory CSV`
- [ ] `Prompt & Workflow`

### manifest.json includes

- team_name, machine_name, track
- BuildArena MCP version
- LLM ID with agent framework / IDE
- Visual feedback used?
- Build iterations
- Token usage
- File hashes, video URL

### Human Boss deliverables

- [ ] Human-built running BSG
- [ ] Run video URL
- [ ] Trajectory CSV

### Validation Rules

| Check | Rule |
| --- | --- |
| **Authenticity A** | Rebuild the BSG from the valid build-history JSON via official BuildArena JSON Parser. Mismatch with the submitted raw BSG: REJECTED. |
| **Authenticity B** | Cross-check the full build-history JSON against the transcript MD. Obvious gaps, fabrication, or inconsistency: REJECTED. |
| **Manual-edit A** | Diff structure fields between raw and human-tuned BSG. Any change to block type/count/geometry: REJECTED. * Camera block is allowed. |
| **Manual-edit B** | Only legal control parameters may change in the Data field. Infinite sliders, negative force, or illegal ranges: REJECTED. |
| **MOD / Video / Trajectory** | Disallowed MOD fields, broken video URLs, or missing/malformed trajectory CSV: REJECTED. |
| **Track check** | Human language guidance or manual structural intervention after build start moves an Autopilot entry to Copilot. |

### Official Review

1. All submissions land on the Provisional leaderboard first.
2. Award candidates enter the Verified flow.
3. Checks: file integrity, BSG diff, parameter legality, trajectory CSV, video link, an official clean rerun if needed.
4. Only Verified entries receive official prizes.


---

## 🏆 Glory & Prizes

**Monthly Prize Pool: $1,000 / season**

### Main Awards

| Award | Condition | Prize |
| --- | --- | --- |
| **Agent Master Builder** | The highest Final Score across official tracks. The season's strongest AI build. | **$250** |
| **Powerful but Brutal** | High-performance, high-cost brutalist machines. Brutality = Performance + Cost. Performance ≥ 70% to qualify. | **$100** |
| **Cheap Thrills** | Cheap, light, scrappy, but surprisingly effective. Thrift = Performance - 2 × Cost. Performance ≥ 60% to qualify. | **$100** |

### Track Titles

| Title | Condition | Prize |
| --- | --- | --- |
| **Best Build Autopilot** | Highest Final Score in the Autopilot track. | **$150** |
| **Best Build Copilot** | Highest Final Score in the Copilot track. | **$150** |

### Community Awards

| Award | Prize |
| --- | --- |
| **Most Creative Machine** | $100 |
| **Funniest Failure** | $75 |
| **Community Favorite** | $75 |
| **Best Human Boss Build** | Showcase |

> **Prize De-duplication:** One machine can hold multiple display titles but claims at most one major cash prize. Priority: Agent Master Builder > Powerful but Brutal > Cheap Thrills > Best Track. Lower-priority prizes roll down to the next eligible entry.


---

## ❓ Frequently Asked

<details>
<summary><strong>What's the difference between Autopilot and Copilot?</strong></summary>

Autopilot: agents build fully autonomously after you define them. Copilot: you steer the agent with natural language, but all structural changes still go through the MCP.

</details>

<details>
<summary><strong>Do I need The Broken Beyond DLC?</strong></summary>

Yes — Season 1's orbit mission runs in the DLC's space sandbox.

</details>

<details>
<summary><strong>Can the AI drive during the run?</strong></summary>

No. Every run is hand-driven by a human. Pilot refers to the build phase only.

</details>

<details>
<summary><strong>Does Human Boss Challenge count in the leaderboard?</strong></summary>

It doesn't enter the AI leaderboards, but its Performance Score is shown as a comparison to AI.

</details>

<details>
<summary><strong>How is token usage measured?</strong></summary>

Three tiers: official Token Logger > model API usage fields > offline estimation.

Award candidates need a credible token record.

</details>

<details>
<summary><strong>Where do I submit?</strong></summary>

On Kaggle. This site is informational only.

</details>


---

## 🔗 Links

| Resource | URL |
| --- | --- |
| 🏁 **Join on Kaggle** | https://www.kaggle.com/ |
| 💻 **Code Repository** | https://github.com/build-arena/BuildArena-2.0 |
| 🏠 **BuildArena Homepage** | https://build-arena.github.io/ |
| 🎮 **Besiege (Steam)** | https://store.steampowered.com/app/346010/ |
| 📚 **ICML 2026 Paper** | https://openreview.net/forum?id=QAQKmIp3SZ |
| ✉️ **Contact** | mailto:wutailin@westlake.edu.cn |


---

<div align="center">

© 2026 AI for Scientific Simulation and Discovery Lab, Westlake University · Uniforce AI

</div>

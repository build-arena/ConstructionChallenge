# BuildArena 2.0 Challenge — 设计风格文档 (DESIGN.md)

> 本文档定义官网的**视觉设计系统**（配色、字体、间距、组件规范）。
> 配套内容/信息架构见 [`CONTENT.md`](./CONTENT.md)。设计基因继承自旧 `#challenge` 页（`build-arena.github.io/styles.css` L121–296）。

## 1. 设计基调

**Retro-Arcade Space（复古街机太空风）**。关键词：像素终端、深空、霓虹猩红、硬投影贴纸感、大写等宽。

三条铁律：
1. **硬阴影代替圆角**：全站 `border-radius: 0`，用实心偏移投影（`8px 8px 0 ...`）制造「贴纸/街机柜」立体感。
2. **等宽 + 大写**：标题、按钮、标签、表头一律 `uppercase`；正文等宽，关键点缀用像素字体。
3. **深色为底，霓虹为光**：深空蓝黑背景 + 猩红主色 + 橙/蓝点缀，配 CSS 像素网格与星点。

## 2. 配色系统

> 已在 `web/src/index.css` 落地为 CSS 变量 + Tailwind v4 `@theme` token。

### 品牌色
| 名称 | 值 | Tailwind utility | 用途 |
|------|------|------------------|------|
| Space 900 | `#06111e` | `bg-space-900` | 页面主底 |
| Space 800 | `#07111f` | `bg-space-800` | 抽屉/弹层底 |
| Space 600 | `#102c39` | `bg-space-600` | 渐变中段 |
| Panel | `#0d1936` | `bg-panel` | 卡片底 |
| Crimson | `#c8102e` | `bg-crimson` / `text-crimson` | **主色**、CTA、强调 |
| Crimson Bright | `#ff304f` | `text-crimson-bright` | 高亮/边框/发光 |
| Crimson Deep | `#6d0719` | — | 硬投影色 |
| Crimson Wine | `#8b0a1f` | `bg-crimson-wine` | 徽标底 |
| Blue | `#004990` | `text-ba-blue` | 次强调、阴影 |
| Blue Light | `#0066cc` | `text-ba-blue-light` | 链接/图表 |
| Orange | `#f18d00` | `text-ba-orange` | 序号/点缀/accent |
| Paper | `#f7f8ff` | `text-paper` | 主文字/亮边 |
| Mist | `#d6d9e8` | `text-mist` | 次文字/边框 |
| Steel | `#6f7489` | `text-steel` | 弱边框/禁用 |
| Cyan | `#b9d8e8` | `text-cyan` | 卡片正文 |

### 语义 token（shadcn，dark-first）
`--background / --foreground / --card / --primary(=crimson) / --accent(=orange) / --destructive(=crimson-bright) / --border / --ring(=crimson-bright)` 等已映射，shadcn 组件开箱即符合主题。

### 背景特效（纯 CSS，零图片资源）
- `body`：多层 radial-gradient（猩红/蓝/橙光斑）+ 135° 深空线性渐变，`background-attachment: fixed`。
- `.bg-pixel-grid`：28px 像素网格（猩红横线 + 蓝竖线），常配顶部淡出 mask。
- `.bg-starfield`：四色 radial-gradient 星点，`opacity: 60%`。

## 3. 字体系统

用 Google Fonts 免费替代旧 `3270NerdFontMono`：
- **`--font-mono` = "JetBrains Mono"**（正文、UI、绝大多数文字）—— 终端等宽、可读性强、含多字重。
- **`--font-pixel` = "Press Start 2P"**（街机点缀：kicker 徽标、COMING SOON、section 序号、表头、奖项名）—— 像素街机感，**仅小尺寸/短文本**使用，避免大段降低可读性。

字号节奏（clamp 响应式）：
- Hero H1：`clamp(3rem, 9vw, 8rem)`，`font-extrabold`，`leading-[0.92]`，`tracking-tighter`，大写 + `text-shadow-arcade`。
- Section 标题：`text-3xl ~ 5xl`，大写，等宽 bold。
- 正文：`text-base/lg`，`leading-relaxed`，`text-mist/cyan`。
- 像素点缀：`text-[0.6rem] ~ text-xs`。

## 4. 阴影与边框语汇（已封装为工具类）

| 类名 | 效果 | 用途 |
|------|------|------|
| `.shadow-arcade` | `8px 8px 0 crimson-deep` + 外发光 | 主按钮/重点卡 |
| `.shadow-arcade-blue` | `6px 6px 0 blue` | 徽标/次级偏移 |
| `.shadow-inset-arcade` | `inset -5px -5px 0 rgba(0,0,0,.4)` | 普通卡内陷感 |
| `.text-shadow-arcade` | 多层 ink + crimson + 发光 | Hero/大标题 |

边框统一 `border-2`（重点 `border-[3px]/border-4`），颜色 `border-border`（米白半透）或 `border-crimson-bright`（高亮）。

## 5. shadcn 组件落地规范

所有 shadcn 组件已按主题改写（`new-york` 风、零圆角、大写、街机边框/阴影）。映射：

| 内容元素 | 组件 |
|----------|------|
| CTA / 跳转按钮 / 语言切换 | `Button`（default=猩红实心，outline=描边，ghost=导航） |
| 赛道卡 / 评分卡 / 奖项卡 / 特性卡 | `Card`（+ `shadow-inset-arcade`） |
| 赛道系数 / 状态 / 标签 | `Badge`（default 猩红 / accent 橙 / secondary / success / outline） |
| Leaderboard 赛道切换 | `Tabs` |
| Leaderboard 表格 | `Table`（表头 `font-pixel` 小号大写） |
| 校验规则 / FAQ | `Accordion` |
| 分隔 | `Separator` |
| 移动端导航 | `Sheet`（右侧抽屉） |

新增组件一律走 shadcn 体系（`src/components/ui/*`），并复用上面的工具类，禁止引入圆角/亮色破坏基调。

## 6. 布局与间距

- 容器：`w-[min(1100px, calc(100% - 72px))] mx-auto`（移动端边距收窄到 48px）。
- Section 垂直节奏：`py-20 md:py-28`，区块间用渐变/网格过渡。
- 栅格：特性/赛道/奖项卡 `grid md:grid-cols-3 gap-5`；评分 `md:grid-cols-2`。
- Section 标题统一带一个像素序号/kicker（如 `// 02 — TRACKS`）强化街机分区感。

## 7. 响应式

- 断点沿用 Tailwind 默认（`sm/md/lg`）。
- 移动端：多栏 → 单栏；NavBar → Sheet；Hero H1 用 clamp 自适应；表格横向滚动（`overflow-x-auto`）。
- 触控目标 ≥ 40px；像素字体在小屏保持可读（仅用于短标签）。

## 8. 动效（克制）

- 滚动进入：轻微 fade/translate（可用 `tw-animate-css` 或 IntersectionObserver）。
- 交互：按钮 hover 改变发光与背景；卡片 hover 边框转猩红。
- 霓虹脉冲仅用于 1–2 个焦点元素（如 Hero CTA / COMING SOON），避免全站闪烁。
- 尊重 `prefers-reduced-motion`，关闭非必要动画。

## 9. 无障碍

- 文本对比度满足 WCAG AA（深底 + 米白/cyan 文字）。
- 所有交互元素有 `focus-visible` 环（`ring-ring/60`，即猩红高亮）。
- 图标按钮带 `sr-only` 文案；语言切换、抽屉具备 aria 标签。

## 10. 文件落点

```
web/src/
  index.css            # 设计 token / 工具类 / 背景特效（本规范的代码实现）
  components/ui/*       # shadcn 组件（已主题化）
  components/layout/*   # NavBar / Footer / Background / SectionHeading
  components/sections/* # Hero / Season / Tracks / How / Scoring / Submission / Leaderboard / Awards / FAQ / CTA
  config/links.ts       # 占位外链常量
  i18n/*                # 中英文字典与切换
```

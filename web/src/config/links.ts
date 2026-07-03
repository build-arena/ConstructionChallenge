/**
 * Central registry of external links.
 * Placeholders (PLACEHOLDER_*) MUST be replaced before going live.
 */
export const LINKS = {
  /** Top-right "jump to main site" button — currently points to the BuildArena ICML paper site. */
  paperhomepage: "https://build-arena.github.io/",
  /** ICML 2026 conference paper page. */
  icml2026paper: "https://openreview.net/forum?id=QAQKmIp3SZ",
  /** Submission entry — all "submit" CTAs route here. */
  kaggle: "https://www.kaggle.com/",
  /** BuildArena 2.0 code repository. */
  repo: "https://github.com/AI4Science-WestlakeU/BuildArena",
  /** Steam — Besiege base game. */
  besiege: "https://store.steampowered.com/app/346010/",
  /** Steam — The Broken Beyond DLC (placeholder). */
  dlc: "https://store.steampowered.com/app/346010/",
  /** Community. */
  discord: "https://discord.com/",
  /** Lab website. */
  lab: "https://ai4s.lab.westlake.edu.cn/",
  /** Contact email. */
  email: "mailto:wutailin@westlake.edu.cn",
} as const

export type LinkKey = keyof typeof LINKS

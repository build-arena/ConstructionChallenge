/** Central registry of external links. */
export const LINKS = {
  paperhomepage: "https://build-arena.github.io/",
  icml2026paper: "https://openreview.net/forum?id=QAQKmIp3SZ",
  kaggle: "https://www.kaggle.com/competitions/build-arena-human-ai-engineering-challenge",
  repo: "https://github.com/build-arena/BuildArena-2.0",
  besiege: "https://store.steampowered.com/app/346010/",
  dlc: "https://store.steampowered.com/app/346010/",
  discord: "https://discord.com/",
  lab: "https://ai4s.lab.westlake.edu.cn/",
  email: "mailto:wutailin@westlake.edu.cn",
  seasonReminder: "https://oxgvbje0rda.feishu.cn/share/base/form/shrcn7RnsYhIIVug4P5bWbkB9ae",
  gameKeyForm: "https://oxgvbje0rda.feishu.cn/share/base/form/shrcn7RnsYhIIVug4P5bWbkB9ae",
} as const
export type LinkKey = keyof typeof LINKS

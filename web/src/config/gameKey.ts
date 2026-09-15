/**
 * Steam-key giveaway mode.
 *
 * `false` (current): season-end notice only — a valid submit earns a key.
 * `true`: restore the Feishu survey funnel (speech-bubble + claim button,
 * Hero/footer two-step flow, How-it-works step-01 CTA).
 *
 * Both UIs stay compiled. Flip this flag — don't re-implement the form.
 */
export const GAME_KEY_FORM_OPEN = false

/** Reuse the survey funnel for Season 2 without reopening Season 1. */
export function isGameKeyFormOpen(season: "s1" | "s2") {
  return season === "s2" || GAME_KEY_FORM_OPEN
}

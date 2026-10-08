---
'@godaddy/antares': minor
---

Introduce a composable ProgressBar with `Label`, `ProgressBarValue`, `ProgressBarTrack`, and `Text slot="description"`. Visible value output is optional and supports formatted text, static content, and render functions. Connect helper-text IDs through `aria-describedby` for consistent server rendering and hydration.

API change: `Label` and `Text slot="description"` replace the root's `label` and `helperText` props. Add `ProgressBarTrack` explicitly and `ProgressBarValue` when visible value output is needed.

---
'@godaddy/antares': minor
---

Rebuild ProgressBar with a composed interior. Replace `label` and `helperText` with `Label` and `Text slot="description"`, and render `ProgressBarTrack` explicitly. Visible value output is opt-in through `ProgressBarValue`, which accepts formatted, static, or state-based content and hides during indeterminate progress. The root's `valueLabel` remains a string for accessible value text. Omit label and value children for compact, track-only progress.

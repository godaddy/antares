---
'@godaddy/antares': minor
---

Layout spacing, rounding, and elevation surfaces now read from `@godaddy/design-tokens`, with the legacy theme as fallback. Breaking: the `--sp-*`, `--rounding-*`, and `--bg-*`/`--fg-*`/`--bd-*`/`--sh-*` custom properties on `Box` are now private; override `size-space-*`, `size-radius-*`, and `color-surface-*` from `@godaddy/design-tokens` instead. Elevation shadows remain fixed `drop-shadow()` values. Surface borders now follow `color-surface-border-*` at every elevation. `Drawer` gains its corner radius, `MetricsLockup` its intended type sizes and passive and critical colors, the chart tooltip arrow now matches its panel, and an elevated `Card` takes its text color from its surface.

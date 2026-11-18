---
'@godaddy/antares': minor
---

Layout spacing, rounding, and elevation surfaces now read from `@godaddy/design-tokens`, with the legacy theme as fallback. Breaking: the `--sp-*`, `--rounding-*`, and `--bg-*`/`--fg-*`/`--bd-*`/`--sh-*` custom properties on `Box` are now private. `Drawer` gains its corner radius, and `MetricsLockup` its intended type sizes and passive and critical colors.

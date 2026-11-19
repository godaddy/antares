---
'@godaddy/antares': minor
---

Spacing, rounding, typography, and surface colors now read from `@godaddy/design-tokens`, with the legacy theme as fallback. Breaking: the `--sp-*`, `--rounding-*`, and `--bg-*`/`--fg-*`/`--bd-*`/`--sh-*` custom properties on `Box` are now private; set `size-space-*`, `size-radius-*`, and `color-surface-*` instead.

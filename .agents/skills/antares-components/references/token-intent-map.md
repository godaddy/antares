# Token / intent lookups

Reference for `token-intent-legacy-map.json`. Load this when wiring CSS custom-property fallback chains or resolving a UXCore intent to its legacy `--ux-{hash}`.

`token-intent-legacy-map.json` is the **source of truth** for UXCore intent → legacy `--ux-{hash}` mapping. Edit it directly when mappings change — there is no build step.

Keys are UXCore intent paths (e.g. `ux.action.backgroundColor`, `ux.box.density`). Each entry:

| Field           | Description                                                                     |
| --------------- | ------------------------------------------------------------------------------- |
| `hash`          | Base36 hash segment (without `--ux-` prefix)                                    |
| `var`           | Full CSS custom property (`--ux-{hash}`)                                        |
| `legacyDefault` | Godaddy-antares theme value; `null` if unknown                                  |
| `token`         | Curated Antares design token name, when mapped                                  |
| `dtcgDefault`   | DTCG default for `token`, when mapped                                           |
| `tokens`        | Array of `{ token, dtcgDefault }` when multiple curated tokens share one intent |

**Entry shape** — keys are intent paths; match the literal quoting when grepping:

```json
// single curated token
"ux.action.backgroundColor": {
  "hash": "1owc8nc",
  "var": "--ux-1owc8nc",
  "legacyDefault": "transparent",
  "token": "color-action-background-tertiary-default",
  "dtcgDefault": "white"
}

// multiple tokens share one intent → "tokens" array, no top-level "token"/"dtcgDefault"
"ux.box.backgroundColor": {
  "hash": "cao06b",
  "var": "--ux-cao06b",
  "legacyDefault": "#fff",
  "tokens": [
    { "token": "color-canvas-background", "dtcgDefault": "white" },
    { "token": "color-surface-background-base", "dtcgDefault": "white" },
    { "token": "color-surface-background-card", "dtcgDefault": "white" }
  ]
}
```

**Lookup examples:**

```bash
# Intent → hash + legacy default
grep '"ux.action.backgroundColor"' token-intent-legacy-map.json

# Find by Antares token name
grep 'color-action-background-tertiary-default' token-intent-legacy-map.json

# Find by hash
grep '"1owc8nc"' token-intent-legacy-map.json
```

**CSS fallback chain** — resolve values from `token-intent-legacy-map.json` in this order for the **literal fallback** (innermost value in `var()`):

1. `legacyDefault` — use when non-null
2. `dtcgDefault` — when `legacyDefault` is null and a curated `token` / `tokens` entry applies
3. **Sensible default** — when both are null (by property kind)

Always wire the full chain so themes can override at each layer:

```css
/* Curated token → legacy --ux-{hash} → resolved fallback */
/* legacyDefault: transparent — used even though dtcgDefault is "white" */
background: var(
  --color-action-background-tertiary-default,
  var(--ux-1owc8nc, transparent)
);

/* legacyDefault: #111 */
color: var(--color-action-text-tertiary-default, var(--ux-ut3xrx, #111));

/* legacyDefault null → fall back to dtcgDefault */
background: var(--color-input-background-hovered, var(--ux-6k4dbq, snow));

/* Intent only (no curated token) */
/* legacyDefault: 0.25rem */
--box-density: var(--ux-1sbfig8, 0.25rem);
```

| Property kind                  | Sensible default (last resort)                   |
| ------------------------------ | ------------------------------------------------ |
| `backgroundColor`              | `transparent`                                    |
| `foregroundColor` / text       | `currentColor`                                   |
| `borderColor`                  | `transparent`                                    |
| `borderWidth`                  | `1px`                                            |
| `borderRadius`                 | `0`                                              |
| `lineHeight`                   | `1.5`                                            |
| `fontFamily`                   | `sans-serif`                                     |
| `fontSize`                     | `1rem`                                            |
| `fontWeight`                   | `500`                                            |
| `density` / spacing            | `0.25rem`                                        |
| `feedbackColor` / chart colors | pick from nearby mapped intent or `currentColor` |

When an intent has a `tokens` array, use the `dtcgDefault` for the specific Antares token you are styling.

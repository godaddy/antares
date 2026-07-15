# Layout: Inline Styles vs Class Names PDR

Status: **Complete — defaults + single-token classes** (arrays / custom stay inline)

Related task: `.tasks/2026-07-15-layout-components-inline-vs-classnames.md`

Spike plan: `.plans/2026-07-15-01-layout-inline-vs-classnames.md`

## Table of Contents

- [Problem](#problem)
- [Current State](#current-state)
- [Approaches Considered](#approaches-considered)
- [Proposed Solution: Hybrid Classes](#proposed-solution-hybrid-classes)
- [Impact](#impact)
- [Risks and Trade-offs](#risks-and-trade-offs)
- [Recommendation](#recommendation)
- [Spike Execution Plan](#spike-execution-plan)
- [Resolved Questions](#resolved-questions)

---

## Problem

Layout components (`Box`, `Flex`, `Grid`) put most layout props on the element's `style` attribute. That makes SSR HTML noisy, inflates payload size for deeply nested trees, and produces large, hard-to-review snapshot diffs for small prop changes.

The focus of this spike is reducing DOM / SSR noise. Layout is controlled via component props; consumers are not expected to override layout props through CSS classes.

## Current State

| Piece | How it styles today |
| ----- | ------------------- |
| `Box` | Merges spacing, rounding, self-alignment, flex/grid item props into `style`; applies `styles.box` for spacing/elevation CSS vars; uses `data-elevation` for elevation |
| `Flex` | Merges `display`, `flexDirection`, alignment, wrap, gap into `style`; renders through `Box` (no Flex CSS module) |
| `Grid` | Merges `display`, template/auto props, alignment, gap into `style`; renders through `Box` (no Grid CSS module) |

Defaults are still written into HTML. For example, `Flex` always sets `display: flex` and `flexDirection: row` on `style` even when the caller did not pass those props.

SSR snapshots already show the noise. From `box.node.test.tsx.snap` (padding example), a single Flex wrapper alone contributes:

```html
style="display:flex;flex-direction:column;gap:var(--sp-md, 8px)"
```

and each child repeats long token strings such as `style="padding:var(--sp-md, 8px)"`.

Elevation already avoids inline styles for a multi-declaration rule: `data-elevation` + CSS in `box/src/index.module.css`.

Spacing and rounding tokens resolve through `toSpacingVar` / `toRoundingVar` to values like `var(--sp-md, 8px)`, then land in `style`.

## Approaches Considered

### 1. Atomic CSS classes for every discrete prop

Map each token/enum value to a CSS Modules class (`gapMd`, `directionRow`, …).

- **Pros:** Strong HTML savings for common cases; familiar Modules pattern.
- **Cons:** Combinatorial CSS surface; freeform values still need `style`.

### 2. Data attributes for discrete props

Extend the elevation pattern (`data-gap="md"`, `data-direction="row"`).

- **Pros:** Readable DOM; good for multi-declaration rules.
- **Cons:** Often **does not** shrink HTML vs short inline styles for sparse props. Example ballpark:

  ```html
  style="display:flex;flex-direction:row;gap:var(--sp-md, 8px)"
  ```

  vs

  ```html
  data-display="flex" data-direction="row" data-gap="md"
  ```

  Similar cost. Data attrs are not the primary size strategy.

### 3. Hybrid classes (chosen direction)

- Base classes for **Flex / Grid defaults**.
- Utility classes for **all token scale values** (spacing `xs`–`2xl`, rounding including `full`).
- High-cardinality props and **custom / freeform** values stay on **`style`**.
- Keep `data-elevation` as-is (multi-declaration rule, not a size play).

## Proposed Solution: Hybrid Classes

Public prop names and types stay the same. Only the DOM styling strategy changes. Goal: less noisy HTML, not CSS override ergonomics.

### Split rule

| Category | Mechanism | Examples |
| -------- | --------- | -------- |
| Flex / Grid defaults | Base CSS module class | `.flex { display: flex; flex-direction: row }`, `.grid { display: grid }` |
| Token scale values | Short utility classes | `gap="md"` → `gapMd`; `padding="lg"` → `padLg`; `inlinePadding` → `padX*`; `blockPadding` → `padY*`; `rounding="md"` → `radMd` |
| High-cardinality props | Keep `style` | Alignment (`alignItems`, `justifyContent`, …), wrap, non-default direction, flex/grid item props, elevation stays on `data-elevation` |
| Freeform / non-token | Keep `style` | Spacing arrays (`padding={['sm', 'md']}`), raw CSS (`gap="10px"`), `columns` / `rows` / `areas`, caller `style` |

Non-default Flex direction (e.g. `column`) stays inline for this spike's sketched scope unless a follow-up wants a small enum class set.

### Merge behavior

- Keep `cx(styles.*, className)` so caller `className` still composes with component classes.
- Caller `style` continues to merge last (same as today).

### Illustrative DOM (from measurement)

**Current** (excerpt):

```html
<div class="box" style="padding:var(--sp-lg, 12px);display:flex;flex-direction:row;align-items:center;gap:var(--sp-md, 8px)">
```

**Hybrid mock** (same tree):

```html
<div class="box flex gapMd paddingLg" style="align-items:center">
```

## Impact

### Expected (qualitative)

| Area | Expected effect |
| ---- | --------------- |
| DOM verbosity | Lower for every Flex/Grid node (defaults) and for any token-scale spacing/rounding; high-cardinality / custom values unchanged |
| SSR output size | Lower from defaults leaving HTML and shorter classes vs `var(--sp-*, …)` / rounding vars on token paths |
| Snapshot readability | Smaller, more stable diffs when token spacing or structure changes |

### Measured

Representative tree: nested Flex/Box with `gap`/`padding` `md`/`lg`, one `alignItems`, one non-default `direction="column"`. Current path used real `Flex`/`Box` via `renderToString`. Hybrid path was a throwaway DOM mock with the same structure (defaults + token classes; alignment / column direction inline). The sample used `md`/`lg` only; the same per-token savings apply to `xs`/`sm`/`xl`/`2xl` (and rounding tokens).

| Variant | SSR HTML bytes | `style=` footprint (chars) | `style=` attr count |
| ------- | -------------- | -------------------------- | ------------------- |
| Current `Flex`/`Box` | **454** | **306** | **6** |
| Hybrid mock | **271** | **55** | **2** |
| Delta | **−183 (−40.3%)** | **−251** | **−4** |

Estimated CSS for the utilities used by the mock (source form, not minified): **203 bytes** for the subset touched. Full token coverage is larger but still a **fixed** CSS cost (one class per prop × token), while HTML savings scale with every node that uses a token.

```css
.flex { display: flex; flex-direction: row; }
.gapMd { gap: var(--sp-md, 8px); }
.gapLg { gap: var(--sp-lg, 12px); }
.paddingMd { padding: var(--sp-md, 8px); }
.paddingLg { padding: var(--sp-lg, 12px); }
/* plus gap/padding (and axes) / rounding for xs, sm, xl, 2xl, full as needed */
```

Notes:

- HTML savings scale with node count; CSS cost is mostly fixed. On this 6-node tree, HTML already saved more than the CSS added for the tokens used.
- Most of the win is token utilities + dropping defaults, not alignment (which stayed inline).
- Production CSS Modules hashing may lengthen class names vs the unhashed locals used here (`gapMd`); even with short hashes the classes stay shorter than `padding:var(--sp-md, 8px)`.

## Risks and Trade-offs

| Risk | Detail | Mitigation |
| ---- | ------ | ---------- |
| Partial noise remains | Alignment, arrays, and freeform props still inline | Intentional — tokens + defaults only |
| CSS surface for all tokens | One utility per prop × token (gap, padding axes, rounding, …) | Finite closed set from `tokens.ts`; no classes for arbitrary CSS strings |
| Theming | Hard-coded lengths would break density/theme | Token utilities must reference `--sp-*` / rounding vars from `.box` |
| Dynamic styles | Runtime switches between class (token) and inline (custom) paths | Stable rule: known token → class; everything else → `style` |
| Snapshot churn | Migrating will rewrite layout SSR snapshots | Expected; do in the implementation PR |

Backwards compatibility and class-based overrides of layout props are **out of scope** — props are the API.

## Recommendation

**Ship defaults + single-token classes; keep arrays / custom CSS on `style`.**

1. Flex / Grid **default classes** (`.flex` / `.inlineFlex`, `.grid` / `.inlineGrid`).
2. Short utilities for single scale tokens via one helper (`tokenClass`) + `utilities.module.css` (`padMd`, `gapSm`, `radFull`, …).
3. Arrays (e.g. `padding={['sm', 'md']}`), custom CSS (`gap="10px"`), and high-cardinality props stay on **`style`**.

A full explicit class-map module was rejected as too much code; `tokenClass(styles, prefix, value)` keeps the TS surface small.

**Shipped** on `chore/layout-components-inline-vs-classnames`.

## Spike Execution Plan

1. [x] Baseline: `renderToString` current Flex/Box tree with defaults + `md`/`lg` + alignment.
2. [x] Throwaway hybrid mock: `.flex` defaults + `md`/`lg` utilities; alignment / column direction inline.
3. [x] Compare HTML bytes and `style=` footprint; note CSS cost.
4. [x] Update this PDR with numbers and recommendation.
5. [x] Stop — no product migration in this spike (harness removed after measurement).

## Resolved Questions

1. **Single spacing / rounding tokens?** Classes via minimal `tokenClass` + short names (`padMd`, `gapXMd`, `radFull`, …).
2. **Arrays / custom CSS?** Stay inline.
3. **Flex / Grid defaults?** Base classes (shipped).
4. **High-cardinality props?** Stay inline.

# Layout: Styling Strategy PDR

Status: **Complete**

## Table of Contents

- [Problem](#problem)
- [Styling Strategy](#styling-strategy)
- [Token Scales](#token-scales)
- [Split Rule](#split-rule)
- [Merge Behavior](#merge-behavior)
- [Trade-offs](#trade-offs)

---

## Problem

Layout components (`Box`, `Flex`, `Grid`) are configured entirely through props; consumers are not expected to override layout via CSS classes. Because these primitives wrap most of the component tree, putting every layout prop on the element's `style` attribute inflates the HTML served in SSR environments: defaults like `display: flex; flex-direction: row` repeat on every node, bloating payload size and producing noisy SSR snapshots.

The goal is to reduce that SSR HTML footprint while still supporting the full spacing/rounding token scale plus arbitrary freeform CSS values. The main lever is moving Flex/Grid display defaults out of `style` and into CSS classes so the common case ships no inline `style` for display. Spacing/rounding tokens stay inline as `var()` references (kept intentionally simple, resolving against the private scales on `.box`), so they do not shrink; the SSR win comes from dropping repeated display defaults, not from the token values.

## Styling Strategy

Public prop names and types are the API and stay stable. The DOM styling strategy is:

| Category | Mechanism | Examples |
| -------- | --------- | -------- |
| Flex / Grid display defaults | Base CSS module class | `.flex { display: flex; flex-direction: row }`, `.inlineFlex`, `.column`, `.grid`, `.inlineGrid` |
| Elevation | `data-elevation` + CSS rule on `.box` | `data-elevation="card"` |
| Spacing / rounding tokens | Inline `style` referencing CSS variables | `padding="md"` → `padding: var(--_box-space-md)`; `gap="sm"` → `gap: var(--_box-space-sm)`; `rounding="full"` → `border-radius: var(--_box-rounding-full)` |
| High-cardinality props | Inline `style` | Alignment (`alignItems`, `justifyContent`, …), wrap, non-default direction, flex/grid item props, grid templates |
| Freeform / non-token | Inline `style` | Spacing arrays (`padding={['sm', 'md']}`), raw CSS (`gap="10px"`), `columns` / `rows` / `areas`, caller `style` |

## Token Scales

The `--_box-space-*` and `--_box-rounding-*` scales are defined once on `.box` in `box/src/index.module.css`. `box.css` is the single source of truth for these values:

- `--_box-space-*` reads `size-space-{xs…2xl}` from `@godaddy/design-tokens`, falling back to a multiple of the `ux.box.density` intent so spacing responds to density/theme changes.
- `--_box-rounding-*` reads `size-radius-{xs…2xl}`, falling back to fixed lengths. `full` has no token and stays `9999px`.

`tokens.ts` maps each scale token to a bare CSS-variable reference (`toSpacingVar('md') → 'var(--_box-space-md)'`, `toRoundingVar('full') → 'var(--_box-rounding-full)'`). There are no hardcoded fallback lengths in `tokens.ts`, so the scale can never drift from `box.css`. Because `Flex` and `Grid` render through `Box`, every token reference resolves against the scales defined on `.box`.

Non-token values pass through untouched: `toSpacingVar('10px') → '10px'`, and spacing arrays map element-wise (`toSpacingVar(['sm', 'md']) → 'var(--_box-space-sm) var(--_box-space-md)'`).

## Split Rule

- **Display defaults** (Flex/Grid `display`, default `row`, and `column` direction) are CSS module classes so they leave the `style` attribute empty in the common case. Reversed directions (`row-reverse` / `column-reverse`) stay inline.
- **Everything else** - tokens, alignment, wrap, templates, item placement, and caller-provided values - resolves to inline `style`.

## Merge Behavior

- `cx(styles.*, className)` composes component classes with any caller `className`.
- Caller `style` merges last, so consumers can always override.

## Trade-offs

| Aspect | Detail |
| ------ | ------ |
| Theming | Token utilities reference `--_box-space-*` / `--_box-rounding-*` from `.box`, which read `@godaddy/design-tokens` and fall back to the theme. |
| DOM verbosity | Display defaults leave HTML; token and freeform values remain on `style`. |
| Consistency | A single rule (`known token → var()`, `default display → class`, `everything else → style`) keeps the runtime path predictable. |

Class-based overrides of layout props are out of scope - props are the API.

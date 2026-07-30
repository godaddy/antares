# GU and Spacing PDR

Status: **Proposed**

## Table of Contents

- [Problem](#problem)
- [What the token spec says](#what-the-token-spec-says)
- [Current state](#current-state)
- [Proposal](#proposal)
- [Audit](#audit)
- [Tasks](#tasks)

---

## Problem

Figma specs component spacing in **grid units**. Antares must render correctly for a consumer
shipping **either** the legacy UXCore intents, the new design tokens or both - and there is no
defined way to express a GU measurement in the new token vocabulary.

**For spacing, the two systems are currently incompatible.** Not inconsistent or half-migrated: a
value expressed in one cannot be translated into the other without information neither publishes.

|                     | Current intents                         | New design tokens                             |
| ------------------- | --------------------------------------- | --------------------------------------------- |
| Vocabulary          | `ux.box.density` - one value            | `size-space-005`…`500`, `size-space-xs`…`2xl` |
| Model               | A **unit**; any measurement is `N x GU` | A **set of named values**                     |
| Steps               | Unbounded, derivable                    | Fixed, enumerated                             |
| What Figma specs in | This                                    | Not this                                      |

Spacing is the only category with this problem, because `ux.box.density` is the only legacy intent
that is a _unit_ rather than a value. Everything the library does for spacing today is a workaround
arrived at by trial and error. This document proposes a standard.

## What the token spec says

Sources: [uxcore#63](https://github.com/gdcorp-uxp/uxcore/pull/63) (spike) and [uxcore#99](https://github.com/gdcorp-uxp/uxcore/pull/99)
(agreed token set) and the current `@godaddy/design-tokens` package.

Two things from the spec bear directly on this proposal.

**1. The scales have assigned purposes.** The numeric scale is "used to define the space inside of
components such as buttons, inputs, and tags". The t-shirt scale exists "to describe _regions_ of
space, such as cards, sections, and modals". This is the basis for the split in
[Proposal](#proposal).

**2. The spec guarantees no arithmetic.** A reviewer proposed that `space-100` would be 1 GU; the
token set's author rejected it:

> **ddamato-godaddy:** what the numbers mean don't relate to anything meaningful in terms of grid
> units. This is quite literally a bucket of values to choose from.

Consistent with the document's own "increments […] _do not_ need to represent a consistent amount of
space". The three-digit numbering exists for sorting and insertion, not arithmetic.

This is why the correspondence below is framed as a **proposal to be ratified** rather than a
relationship to be discovered. The spec constrains what a consumer may assume _across_ themes; it
does not forbid a single theme from being regular.

One clarification to avoid a common misreading: the `$value`s in `tokens.yml` are development
defaults, not Antares' values. `@godaddy/design-tokens` defines the token names; a theme supplies
their meaning. So `size-space-md: 16px` should not be read as "Antares' `md` is 16px" - the author
is explicit that the set is "not meant to be used as a theme, only as a starting point to make a
theme".

## Current state

**Every `var(--size-space-*, <fallback>)` in the library resolves to its fallback.** No theme in
play defines the spacing tokens, so the documented token → intent → literal chain is one link long
in practice. This is expected given that the package defines names rather than values, but it means
the fallback is doing all the work today, so a wrong multiplier or a wrong tier name is invisible
until a theme starts defining the tokens.

**`--sp-md` is only defined on `.box`.** Inside a `.box` subtree it is `2 x density`; anywhere else,
including a portaled popover, it is undefined - so declarations using it fall back to their initial
value. Separately, the name `md` is overloaded: `--sp-md` is 2 GU while the `size-space-md`
development default is 16px.

### Defects

1. **Menu popover padding is `0` in production.** `menu/src/index.module.css:17` sets
   `padding: var(--sp-xs)` with no fallback. `Menu` renders through `RACPopover` (portaled) and
   imports no `Box` / `Flex`, so nothing defines `--sp-xs`; the declaration is invalid at
   computed-value time and `padding` falls to its initial `0`. `--br-sm` is lost the same way.
2. **The repo's guidance points the wrong way.** `antares-components/SKILL.md:25` tells authors "In
   CSS, use `var(--sp-sm)` directly. Use t-shirt sizes" - the region scale, via a variable that only
   resolves inside `.box`. It is the direct cause of the first row of the [Audit](#audit).

## Proposal

### 1. The scales split by purpose

- **numeric `size-space-NNN`** → spacing **inside** a component
- **t-shirt `size-space-{xs..2xl}`** → spacing **between** components; the public layout vocabulary
  that `Box` / `Flex` / `Grid` expose via `Spacing`

The two scales are set independently: a t-shirt value is not constrained to land on a numeric tier.
It may reuse one where that is the right value - the point is that nothing requires it to.

### 2. The tier number encodes a GU count

The correspondence is expressed **only in grid units** - no pixel values asserted. How many pixels a
GU is worth is the theme's decision - `godaddy-antares` sets `ux.box.density` to `0.5rem`. Fixing
the correspondence in GU keeps the library correct under any theme, and rescales with the theme
rather than against it.

| Tier             | GU        | Fallback                          |
| ---------------- | --------- | --------------------------------- |
| `size-space-005` | 0.25      | `calc(var(--ux-1sbfig8) * 0.25)`  |
| `size-space-010` | 0.5       | `calc(var(--ux-1sbfig8) * 0.5)`   |
| `size-space-020` | 1         | `calc(var(--ux-1sbfig8) * 1)`     |
| `size-space-030` | 1.5       | `calc(var(--ux-1sbfig8) * 1.5)`   |
| `size-space-040` | 2         | `calc(var(--ux-1sbfig8) * 2)`     |
| `size-space-050` | 2.5       | `calc(var(--ux-1sbfig8) * 2.5)`   |
| `size-space-060` | 3         | `calc(var(--ux-1sbfig8) * 3)`     |
| `size-space-070` | 3.5       | `calc(var(--ux-1sbfig8) * 3.5)`   |
| `size-space-080` | 4         | `calc(var(--ux-1sbfig8) * 4)`     |
| `090` and above  | free-form | per design; no arithmetic implied |

**Regular through `080`, free-form above.** Components need regularity; page-level structure needs
freedom, which is the useful half of the spec's "bucket of values" position.

Placing 1 GU at `020` rather than at the bottom of the scale leaves two sub-GU steps beneath it -
`010` at a half and `005` at a quarter - which covers small optical values without an exception.

### 3. T-shirt values

`Box` already implements the Figma `Computed/Space/Box` factors (PR #231), and since
`ux.box.density` is one GU those factors are GU counts directly:

| Token            | GU  |
| ---------------- | --- |
| `size-space-xs`  | 0.5 |
| `size-space-sm`  | 1   |
| `size-space-md`  | 2   |
| `size-space-lg`  | 3   |
| `size-space-xl`  | 5   |
| `size-space-2xl` | 8   |

Adopting these means `Box` needs no value change and its fallback chain becomes internally consistent.

### 4. Components with sized controls

Some components such as `Button`, `SegmentedController` can use t-shirt sizes to signal their
respective sizes. These values have no correlation with t-shirt values used in design tokens.

### 5. Per-component expectations

Each component should declare its own variables to use, making them self-contained and being able to
render without any theme, none, or both at the same time.

## Audit

34 component directories, five groups.

| Group                     | Components                                                                                                                   | Issue                                                                                                                                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Consumes `--sp-*`         | `menu` (17 refs), `progress-steps` (3), `field` (3), `carousel` (3), `popover` (2), `modal` (2), `drawer` (2), `tooltip` (1) | Only defined on `.box`, so resolves by luck of composition. Also the region scale used for control internals                                                                                             |
| Wrong scale               | `button` (5 refs)                                                                                                            | Uses the t-shirt (region) scale for control internals. Its multipliers are correct against `godaddy-antares`, so there is no value change - only a move to the numeric tiers: `010`, `020`, `040`, `060` |
| Wrong prefix, wrong tiers | `segmented-controller` (20 refs)                                                                                             | References `--space-005`; tokens emit `--size-space-005`, so it never resolves. Its multipliers assume 1 GU at `010`, so every reference doubles under this proposal - see [Tasks](#tasks)               |
| Stale literal fallback    | `button`, `segmented-controller`, `layout/box`                                                                               | All write `var(--ux-1sbfig8, 0.25rem)`. The literal is half a GU, so anything rendered with no theme at all comes out at half size                                                                       |
| Hardcoded px/em           | `toggle-button` (4), `tag` (4), `gauge-chart` (3), `menu` (2), `alert` (2), `progress-bar` (1), `modal` (1), `button` (1)    | No token or GU relationship                                                                                                                                                                              |
| No internal spacing       | remainder                                                                                                                    | Compose `Flex` / `Box`, or have none                                                                                                                                                                     |

## Tasks

- Fix Menu popover padding and radius - a live production bug, independent of this proposal.
- Correct `antares-components/SKILL.md`, to align with new proposal.
- Fix `segmented-controller`'s `--space-` prefix.
- Replace the `0.25rem` literal in `--ux-1sbfig8` with `0.5rem` to align with `godaddy-antares` theme
- Update component implementations to follow this proposal.
- Migrate: the eight `--sp-*` consumers, then `button`, then the hardcoded group.
- Extract the per-component GU values from Figma. The audit identifies which components are wrong,
  not what each measurement should be.
- Once a theme defines the spacing tokens, revisit whether the per-component fallbacks are still
  needed.

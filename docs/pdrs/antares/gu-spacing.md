# GU and Spacing tokens

Status: **Accepted**

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

Two things bear directly on this proposal.

**1. The PRs assign the scales purposes; the shipped package does not.** In the PRs, the numeric
scale is "used to define the space inside of components such as buttons, inputs, and tags", and the
t-shirt scale exists "to describe _regions_ of space, such as cards, sections, and modals". That
wording is the basis for the split in [Proposal](#proposal).

The `tokens.yml` shipped today does not encode that split. Its `$description`s put both scales on
both sides of the line: `size-space-020` is "padding inside chips" and `050` "standard card padding",
while `size-space-sm` is "padding and gaps inside dense components". The t-shirt tiers are also filed
under a "t-shirt aliases" heading with values that coincide with numeric ones (`xs`=`010`,
`sm`=`020`, `md`=`050`, `lg`=`070`, `xl`=`100`, `2xl`=`160`), reading as shorthands rather than a
scale with a distinct purpose.

So the split below is this document's proposal, taken from the PR wording - not a description of the
package as it stands. Ratifying it means [reconciling the package's descriptions](#tasks).

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
theme". The same applies to the `$description`s quoted above.

## Current state

**Every `var(--size-space-*, <fallback>)` in the library resolves to its fallback.** No theme in
play defines the spacing tokens, so the documented token → intent → literal chain is one link long
in practice. This is expected given that the package defines names rather than values, but it means
the fallback is doing all the work today, so a wrong multiplier or a wrong tier name is invisible
until a theme starts defining the tokens.

**Spacing is declared where it is used.** `Box` keeps its t-shirt scale in private `--_box-space-*`
variables on `.box`, read only by the layout props. Every other component declares its own
`--_<component>-*` variables on its own root, so nothing resolves by luck of composition and portaled
overlays render the same as inline ones.

### Defects

1. **Chart content gap collapses with no theme.** `bar-chart/src/index.module.css:10` and
   `line-chart/src/index.module.css:10` set `--chart-content-gap: var(--ux-a2dzk8)` with no fallback.
   The intent is defined by the theme (16px, 2 GU, in `legacy-tokens.css`) but not by the token
   package, so with no theme the `gap` declarations at lines 12 and 62/78 are invalid at
   computed-value time and fall back to `normal`.

## Proposal

### 1. The scales split by purpose

- **numeric `size-space-NNN`** → spacing **inside** a component
- **t-shirt `size-space-{xs..2xl}`** → spacing **between** components; the public layout vocabulary
  that `Box` / `Flex` / `Grid` expose via `Spacing`

The two scales are set independently: a t-shirt value is not constrained to land on a numeric tier.
It may reuse one where that is the right value - the point is that nothing requires it to.

This is a statement about which scale a component author reaches for, not a claim that every numeric
tier is component-sized. The upper tiers are page-scale by any reading; they stay on the numeric scale
because that is where the package puts them.

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
| `size-space-040` | 1.75      | `calc(var(--ux-1sbfig8) * 1.75)`  |
| `size-space-050` | 2         | `calc(var(--ux-1sbfig8) * 2)`     |
| `size-space-060` | 2.5       | `calc(var(--ux-1sbfig8) * 2.5)`   |
| `size-space-070` | 3         | `calc(var(--ux-1sbfig8) * 3)`     |
| `size-space-080` | 3.5       | `calc(var(--ux-1sbfig8) * 3.5)`   |
| `size-space-090` | 4         | `calc(var(--ux-1sbfig8) * 4)`     |
| `size-space-100` | 5         | `calc(var(--ux-1sbfig8) * 5)`     |
| `120` and above  | free-form | per design; no arithmetic implied |

**Regular through `100`, free-form above.** Components need regularity; page-level structure needs
freedom, which is the useful half of the spec's "bucket of values" position. Nothing above `100` is
claimed to be a GU multiple, and components have no use for those tiers anyway.

The regular range is not an arithmetic imposed on the package: at 1 GU = 8px it reproduces the
`tokens.yml` development defaults exactly, `005` through `100` (2, 4, 8, 12, 14, 16, 20, 24, 28, 32,
40px). So adopting it requires no tier to change value. The range is not a uniform walk - it steps by
quarters and halves of a GU up to `090`, then a whole GU to `100` - which is what the package's own
values do. The common component values sit at whole GU: 2 GU is `050`, 3 GU is
`070`, 5 GU is `100`.

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

The Figma factors are the authority here, not the numeric scale. `xs` through `xl` happen to coincide
with numeric tiers (`xl` is `100`, 5 GU); `2xl` lands on `160`'s development default, but `160` is in
the free-form range, so no GU relationship is implied - which is the independence stated in
[§1](#1-the-scales-split-by-purpose). The t-shirt scale is what Figma specs regions in, so it follows
Figma.

### 4. Components with sized controls

Some components such as `Button`, `SegmentedController` can use t-shirt sizes to signal their
respective sizes. These values have no correlation with t-shirt values used in design tokens.

### 5. Per-component implementation

Each component declares its own spacing variables, so that it renders correctly under a design-token
theme, an intent theme, both, or neither. Six rules.

**1. Declare the chain in full: token → intent → literal.**

```css
.menu {
  --_menu-padding: var(--size-space-010, calc(var(--ux-1sbfig8, 0.5rem) * 0.5));
}
```

Each link covers one of the four scenarios: `--size-space-010` a token theme, `--ux-1sbfig8` an intent
theme, `0.5rem` neither. Dropping the literal is what makes [Defects](#defects) 1 render at `normal` - a `var()` whose reference is undefined and which has no fallback is invalid at
computed-value time, so the property takes its **initial** value, not a smaller version of the intended
one. The failure is silent and does not look like a missing theme.

**2. Precedence: the token wins.** The token is the outer `var()`, so a consumer shipping both systems
gets the token value and the intent is never consulted. This is deliberate: the token scale is the
target vocabulary and the intent chain is the compatibility path, so the compatibility path must not
be able to override the target.

**3. Declare on the component's own root selector.** Never rely on an ancestor to define the variable.
A variable defined on `.box` resolves nothing for an element portaled through `RACPopover` with no
`Box` in its subtree. A component that declares its own variables is
correct wherever it is rendered, portal included. This is the rule that makes "self-contained"
enforceable rather than aspirational.

**4. Name the variable after the component, and after whatever the component means by it.** A single
measurement takes a role name: `--_menu-padding`, `--_alert-gap`, `--_pagination-dot-size`. A ramp that
tracks the component's own size steps takes those step names: `--_button-space-md` is the space `Button`
uses at `size="md"`, which is the sense established in [§4](#4-components-with-sized-controls). Both are
component-local names in the component's own namespace, and neither is constrained by the token
vocabulary.

So a t-shirt-named local variable holding a numeric-tier value is correct, not a mismatch:
`--_button-space-md` denotes a button size and resolves to `size-space-050`. The two `md`s are unrelated
by design, which is what [§4](#4-components-with-sized-controls) already says.

**5. Prefix the variable with `--_`, and keep the component name inside the prefix.** Spacing variables
are private. The way a consumer changes a component's spacing is by defining the token or the intent -
not by reaching into the component - and `--_` is what says so.

Do not pair the private variable with a public one. Spacing already has a public surface, and it is the
token scale ([§1](#1-the-scales-split-by-purpose)); a per-component override would add a fourth link to
every chain and hand consumers a documented way around the tokens.

The prefix is a convention, not enforcement: custom properties inherit, and CSS Modules does not scope
them. So the component name stays in the name - `--_button-space-md`, never `--_space-md`. The cost of
dropping it is already visible in the library: `popover` and `tooltip` both define `--_arrow-offset`,
`--_content-offset` and `--_animation-offset`, and `drawer` and `inline-drawer` both define `--_min-size`
and `--_max-size`. Those components nest, and the values stay correct only because each redeclares on its
own root - that is, only by rule 3. Prefixing removes the dependency on that.

**6. What is reserved is the t-shirt _token_ scale, not the t-shirt _name_**
([§1](#1-the-scales-split-by-purpose)). A component's own CSS draws from the numeric tiers, whatever it
calls the variables it puts them in. `size-space-{xs..2xl}` is consumed only by the layout components -
`Box` / `Flex` / `Grid` and the `Spacing` prop - because that scale measures space between components.

Worked example, `button` today against the same four declarations under this proposal:

```css
/* today: t-shirt token scale for control internals, half-GU literal */
--button-space-xs: var(--size-space-xs, calc(var(--ux-1sbfig8, 0.25rem) * 0.5));
--button-space-sm: var(--size-space-sm, calc(var(--ux-1sbfig8, 0.25rem) * 1));
--button-space-md: var(--size-space-md, calc(var(--ux-1sbfig8, 0.25rem) * 2));
--button-space-lg: var(--size-space-lg, calc(var(--ux-1sbfig8, 0.25rem) * 3));

/* proposed: numeric token scale, GU-correct literal, private prefix */
--_button-space-xs: var(--size-space-010, calc(var(--ux-1sbfig8, 0.5rem) * 0.5));
--_button-space-sm: var(--size-space-020, calc(var(--ux-1sbfig8, 0.5rem) * 1));
--_button-space-md: var(--size-space-050, calc(var(--ux-1sbfig8, 0.5rem) * 2));
--_button-space-lg: var(--size-space-070, calc(var(--ux-1sbfig8, 0.5rem) * 3));
```

The `xs`/`sm`/`md`/`lg` part of each name stays - those are `Button`'s size steps and remain accurate.
The multipliers stay too, since `button`'s GU counts are already right. Three things change: the token
the chain reaches for moves to the numeric scale, the literal is corrected to a full GU, and the
variable is marked private.

## Audit

34 component directories, six groups. Reference counts are lines containing a reference, not
occurrences. A component appears in more than one row where it mixes approaches.

| Group                       | Components                                                                                                                                                                                                                                                 | Issue                                                                                                                                                                                                    |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wrong scale                 | `button` (5 refs)                                                                                                                                                                                                                                          | Uses the t-shirt (region) scale for control internals. Its multipliers are correct against `godaddy-antares`, so there is no value change - only a move to the numeric tiers: `010`, `020`, `050`, `070` |
| Wrong prefix, wrong tiers   | `segmented-controller` (20 refs)                                                                                                                                                                                                                           | References `--space-005`; tokens emit `--size-space-005`, so it never resolves. Its multipliers assume 1 GU at `010`, so every reference doubles under this proposal - see [Tasks](#tasks)               |
| Already derives from the GU | `toggle-button` (`--button-group-density`, padding and gap), `alert` (padding, gap), `tag` (4), `gauge-chart` (2 of 3), `calendar` (cell sizing), `switch` (thumb inset), `pagination` (dot size), `progress-bar` (content gap)                            | Spacing is `N x ux.box.density` already, so the multiplier is reviewable against Figma directly. These need the tier _naming_ from this proposal, not a value rethink                                    |
| Inconsistent GU literal     | `0.25rem`: `button`, `segmented-controller`, `layout/box`, `pagination`, `switch`, `tag`. `0.5rem`: `alert`, `calendar`, `gauge-chart`, `toggle-button`. `8px`: `progress-bar`                                                                             | The same intent is written with three different literals. The `0.25rem` group is half a GU, so anything rendered with no theme at all comes out at half size                                             |
| Genuinely hardcoded         | `menu` (2, optical), `modal` (`2rem` inline end), `button` (`0.5em` gap fallback), `calendar` (`2rem` viewport inset), `metrics-lockup` (`-0.75rem`), `tag` (`0.125rem` size steps), `gauge-chart` (1 of 3)                                                | No GU relationship. Each needs a Figma value before it can be assigned a tier                                                                                                                            |
| No internal spacing         | `checkbox`, `radio`, `text`, `icon`, `listbox`, `drop-zone`, `inline-drawer`, `circular-progress`, `date-field`, `date-picker`, `file-trigger`, `number-field`, `select`, `text-field`, `layout/flex`, `layout/grid`, `chart/donut-chart`, chart internals | Compose `Flex` / `Box`, or have none                                                                                                                                                                     |

`bar-chart` and `line-chart` sit outside these groups: see [Defects](#defects) 1. `tag` reaches the GU
only by accident - it references `--ux-x1uac9` and `--ux-148wxvi`, which nothing defines, so every
value resolves through the nested `var(--ux-1sbfig8, 0.25rem)` fallback.

## Tasks

- Give `bar-chart` / `line-chart` a fallback for `--ux-a2dzk8` - a live bug, independent of this proposal.
- Fix `segmented-controller`'s `--space-` prefix.
- Re-tier the numeric references that predate the current scale, so each tier matches the GU
  multiplier written beside it. Each entry is _tier written → tier for that GU_: `menu` (`005`→`010`,
  `010`→`020`, `020`→`050`, `030`→`070`), `pagination` (`040`→`050`), `size-provider` (`040`→`050`,
  `060`→`070`), `text-lockup` (`040`→`050`), `calendar` (`040`→`050`), `card` selection indicator
  (`020`→`050`), `button` (`040`→`090`), `collapsible` (`070`→`090`), gallery `file-items`
  (`080`→`100`), and project-inquiry-form `attached-files` (`030`→`070`, `040`→`090`).
- Replace the `0.25rem` literal in `--ux-1sbfig8` with `0.5rem` to align with `godaddy-antares` theme,
  in all six components that write it, and normalise `progress-bar`'s `8px` to the same literal.
- Reconcile the `size-space-*` `$description`s in `@godaddy/design-tokens` with the purpose split in
  [Proposal](#proposal), so the package stops describing both scales as component-internal _and_
  page-level.
- Rename component-local spacing variables to `--_`-prefixed, component-named form per
  [§5](#5-per-component-implementation) rule 5. This touches every component in the migration rows
  below, so it should ride along with each one rather than land as its own sweep. Nothing in the docs,
  examples or stories advertises the current names, so no consumer contract breaks. The already-private
  bare names - `--_arrow-offset`, `--_content-offset`, `--_animation-offset` in `popover` / `tooltip`,
  `--_min-size` / `--_max-size` in `drawer` / `inline-drawer` - need the component prefix added even
  though they are not spacing variables, since they carry the collision this rule exists to prevent.
- Migrate `button`, then the hardcoded group. The components that
  already derive from the GU intent need renaming to the proposed tiers, not remeasuring.
- Extract the per-component GU values from Figma. The audit identifies which components are wrong,
  not what each measurement should be.
- Once a theme defines the spacing tokens, revisit whether the per-component fallbacks are still
  needed.

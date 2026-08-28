# Typography in Antares

Status: **Proposed**

## Table of Contents

- [Summary](#summary)
- [Problem](#problem)
- [Open decisions](#open-decisions)
- [Proposal](#proposal)
- [Reference](#reference): [vocabulary](#the-vocabulary), [prior art](#prior-art),
  [out of scope](#out-of-scope), [audit](#audit),
  [gaps](#where-this-proposal-is-likely-incomplete), [tasks](#tasks)

---

## Summary

Nothing owns typography in Antares. `Text` sets none. `Heading` sets no font size, so its sizes come from
the browser. Every other component picks its own, drawing on nine legacy intent families and, in one case,
on a stylesheet that only exists in Storybook. The theme already ships a complete type system, and two
components use it.

The theme also supplies the vocabulary, so this document does not invent one: three roles (`body`, `detail`,
`heading`), each with a family, weight and line height, and each with a six-step size ramp from `xs` to
`2xl`, published as `--font-{role}-{property}` and `--font-{role}-size-{tier}`. What is missing is
ownership. Which code writes those tokens, and how they reach the parts of a composed component.

### The resulting API

One component per role. `size` is the only typography prop.

```tsx
<Text>Body copy at the md tier</Text>
<Detail size="sm">Supporting copy</Detail>
<Text as="p">Same type, a real paragraph</Text>

// Emphasis is the element, not a weight prop.
<Text as="strong">overdue</Text>

// Heading: level picks the element, size picks the tier, size defaults from level.
<Heading level={2}>Billing</Heading>             {/* h2, xl tier */}
<Heading level={2} size="sm">Billing</Heading>   {/* both stated */}
<Heading as="div" size="lg">$1,204</Heading>     {/* heading type, outside the outline */}

// A container supplies the defaults for the slots it defines. An explicit prop still wins.
<Modal>
  <Heading slot="title">Delete file?</Heading>   {/* h2 at the tier Modal picks */}
</Modal>

// Controls own their type, so a composed Text inherits instead of restyling.
<Button size="sm">label</Button>
<Button size="sm"><Text>label</Text></Button>    {/* indistinguishable */}
```

There is no `variant`, `weight`, `family`, `lineHeight` or `letterSpacing` prop. The role is the component,
and the theme has no vocabulary for the rest.

### The nine rules

| Rule                                                                                                               | In one line                                                                    |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| 1. [`Text`, `Detail` and `Heading` own the type](#1-text-detail-and-heading-own-the-type)                          | the only place the role and tier decision is written, and they carry defaults  |
| 2. [Containers inject defaults through slot context](#2-containers-inject-defaults-through-slot-context)           | a `Modal` decorates its `title` slot; an explicit prop on the child still wins |
| 3. [Controls keep their type on the control element](#3-controls-keep-their-type-on-the-control-element)           | so a `1lh` `Icon` stays locked to its label; a composed `Text` emits nothing   |
| 4. [Non-component surfaces declare their own chain](#4-surfaces-that-cannot-be-components-declare-their-own-chain) | `::placeholder`, SVG `<text>`, a native input's value: declared in CSS         |
| 5. [Chains are `token → intent → literal`](#5-fallback-chains-sizes-stop-at-the-literal)                           | except sizes, which skip the intent, because intents have no size ramp         |
| 6. [A component per role, `size` is the only prop](#6-a-component-per-role-size-is-the-only-prop)                  | no `variant`, `weight`, `family`, `lineHeight` or `letterSpacing`              |
| 7. [Emphasis is semantic](#7-emphasis-is-semantic)                                                                 | `<Text as="strong">`, not a `weight` prop                                      |
| 8. [`Heading`: `level` is semantics, `size` is visuals](#8-heading-level-is-semantics-size-is-visuals)             | independent axes, with a `level` → `size` default map                          |
| 9. [Components resolve to a token](#9-components-resolve-to-a-token)                                               | snap off-ramp Figma values to the nearest tier, with the original in a comment |

Rules 1 to 3 are the substance and 4 to 9 follow from them. Rule 2 is the mechanism everything else
assumes, and `Heading` does not support it today.

**Not addressed:** responsive type, colour, and a prose scope for consumers rendering markdown. See
[Out of scope](#out-of-scope).

## Problem

Three questions have to be answered together, because answering one alone produces a system that cannot
express what Figma specs.

1. **Who owns a component's font styles?** The text components, or each component's own CSS?
2. **How does a composed component tell its parts what to look like?** Without the caller having to
   remember that a `Modal` title is an `h2` at one tier and a `Drawer` title another.
3. **What is the public vocabulary?** The theme has already answered this one.

Nothing here is constrained by the current implementations. Where a proposal implies a public API change,
that is intended.

## Open decisions

**Which `ux.textTitle` value to snap.** The intent declares 1.375rem, but `alert` and `progress-steps` both
divide it by 1.125 twice, so what renders is about 1.086rem. Snapping what renders gives `heading` `sm` and
keeps today's appearance. Snapping the declared value ties `heading` `md` and `heading` `lg`, and either one
grows `alert`'s title noticeably. The [audit](#audit) proposes `heading` `sm`. The call is whether to honour
the declared value or the rendered one.

**Two positions worth ratifying rather than accepting by default**, because no comparable library takes
them: how strict [rule 6](#6-a-component-per-role-size-is-the-only-prop) is, and giving each role its own
component. See [Prior art](#prior-art).

## Proposal

### 1. `Text`, `Detail` and `Heading` own the type

They are the single place the role and tier decision is written, and they carry defaults, so they render
real type instead of the browser's. Native elements stay valid, they are just unstyled.

Two things sit outside them: controls, which keep type on the control element
([rule 3](#3-controls-keep-their-type-on-the-control-element)), and surfaces that cannot be a component
([rule 4](#4-surfaces-that-cannot-be-components-declare-their-own-chain)).

### 2. Containers inject defaults through slot context

A composed component provides the defaults for the slots it defines, and the caller overrides them with
props. `components/_internal/overlay-dialog/src/index.tsx` already injects a `className` this way for
`Header`, `Content` and `ButtonGroup`. Typography joins it. **Required behaviour**, in both directions:

- A container-injected `level` or `size` reaches the element when the caller passes neither.
- An explicit prop on the child overrides the injected value.
- The dialog's accessible name still comes from its title. RAC's `Dialog` puts the generated title id in the
  same `HeadingContext` a container would add typography to, so the container adds to that context rather
  than providing a fresh one inside the dialog. Replacing it drops the id and breaks `aria-labelledby`
  silently.

`Heading` satisfies neither of the first two today. It always passes its own `level`, so the `level: 2` RAC's
`Dialog` provides to `slot="title"` is thrown away. This is a precondition for everything else here, and all
three behaviours want tests rather than assumptions about how RAC wires slots.

**Named slots for containers, `DEFAULT_SLOT` only for leaf text surfaces.**

| Surface                                  | Channel                              | Why                                                           |
| ---------------------------------------- | ------------------------------------ | ------------------------------------------------------------- |
| Controls (`Button`, `Tag`…) and `Avatar` | `DEFAULT_SLOT`                       | the whole subtree *is* one text surface; nothing to leak into |
| `Modal`, `Drawer`, `Popover`             | named slots (`title`, `description`) | arbitrary body content; `DEFAULT_SLOT` would capture it       |
| `Content`/`Header`/`Footer`              | flat context, as today               | each is a distinct named component appearing once             |

RAC sets the precedent: `Dialog` provides `{ slots: { [DEFAULT_SLOT]: {}, title: {…} } }`, where the empty
`DEFAULT_SLOT` is an escape valve so an unslotted `Heading` receives nothing. Requiring the slot is the
cost, and the alternative silently restyles body content.

### 3. Controls keep their type on the control element

Every control that owns its type (`Button` and `LinkButton`, `ToggleButton`, `Tag`, menu items) keeps that
type on the control, and tells a composed `Text` to **emit no typography of its own, rather than injecting a
size**, through the slot context of [rule 2](#2-containers-inject-defaults-through-slot-context). A `Text`
that declares nothing inherits every font property from the control, `font-variation-settings` included,
which the `font` shorthand would not cover.

**The reason is `Icon`.** `components/icon/src/index.module.css` sizes it `width: 1lh; height: 1lh`, and
`1lh` resolves from the icon's own inherited line height. As siblings, icon and label share the control's
type, so the icon matches the label's line box. Move the label's type into a sibling wrapper and inheritance
no longer reaches the icon, because it flows down and not sideways, and the two drift apart whenever the
control's size changes. `toggle-button` hand-rolls the same relationship as `calc(font-size * line-height)`.

**Three display surfaces need the same signal**, because each already renders a `Text` with an injected
class that owns fluid type: `Avatar`'s monogram (`font-size: round(43.75cqw, 1px)`), and `gauge-chart` and
`donut-chart`'s centre labels (`cqi`, [rule 9](#9-components-resolve-to-a-token)). Once `Text` carries
defaults, those defaults compete with the injected class at the same `0-1-0`, so the signal is what keeps
the fluid size.

**Children are never auto-wrapped in a `Text`.** A control's children are mixed
(`<Button><Icon />label</Button>`), so wrapping could only apply to some of them, and which ones would
depend on child types. A wrapper element is still fine where CSS needs to select the label.

**Line height stays on the control, because it sets the control's height.** A control's height is its text's
line box plus its block padding. In a flex container, which `.button` already is, there is no strut, so
either the `Text` is the only item and sets the height or a bare text child inherits the control's value.
Two line heights never add up. The case to watch for is a **non-flex** container, where the parent's line
height sets a minimum line box height above the child's, so every text surface is either a flex container or
the container owns the line height.

**No control sets `line-height: 1`.** It removes no stacking, and it makes a `1lh` `Icon` resolve to
`1 × font-size`, smaller than the label's line box.

### 4. Surfaces that cannot be components declare their own chain

`::placeholder` is not an element, a chart's axis tick labels are SVG `<text>` rendered by visx, and a native
`<input>`'s value needs the font on the input. These declare the chain in CSS, following
[GU and Spacing, rule 5](./gu-spacing.md#5-per-component-implementation): the full chain, on the component's
own root selector, `--_`-prefixed and component-named.

```css
.field {
  --_field-input-font-size: var(--font-body-size-md, 1rem);
  --_field-input-font-family: var(--font-body-family, var(--ux-pze30t, var(--ux-117cu43, system-ui, sans-serif)));
  --_field-input-line-height: var(--font-body-line-height, var(--ux-1hhfdnd, 1.5));
  --_field-input-font-weight: var(--font-body-weight, var(--ux-8n6y9x, normal));
  --_field-input-font-variation: var(--font-body-variation, var(--ux-1i4pt2s, normal));
}
```

Where a control's own `size` prop selects a tier, the variable takes the control's step names:

```css
--_button-font-size-sm: var(--font-body-size-sm, 0.875rem);
--_button-font-size-md: var(--font-body-size-md, 1rem);
```

These surfaces set the size and all four role properties explicitly. They do not `inherit`. This is the one
place the mapping is duplicated, so the [Audit](#audit) is the thing to check when either side changes.

### 5. Fallback chains: sizes stop at the literal

**All four role properties chain `token → intent → literal`**, per
[GU and Spacing](./gu-spacing.md#5-per-component-implementation) rule 1: family, weight, line height and
variation. Every chain ends in a literal, so a declaration stays valid when neither the token nor the intent
is defined.

Which intent family each role maps to is the design decision here:

| Role      | Intent family                          |
| --------- | -------------------------------------- |
| `detail`  | `ux.textCaption`                       |
| `body`    | `ux.textBody`, then `ux.textParagraph` |
| `heading` | `ux.textHeading`                       |

`body` needs the second link because `ux.textBody` carries no legacy default, so one `var()` deep is not yet
a real value. [Rule 4](#4-surfaces-that-cannot-be-components-declare-their-own-chain)'s `.field` block shows
the resulting chain. Which `--ux-*` variable each role and property resolves to is a lookup in
`.agents/skills/antares-components/references/token-intent-legacy-map.json`. A copy here would drift from
it.

**`font-variation-settings` is in the set.** It is the one property where an intent carries a value the token
set does not: `ux.textHeading.fontVariation` is a real display axis while the `airo` token is `normal`, so
leaving it out flattens every heading on an intent-only theme.

**Sizes chain `token → literal`, with no intent link.** The tokens give each role six tiers; the intents give
each role one font size, so nothing in the intents can mean "heading, lg". An intent-only theme gets the
library's literal sizes and the correct family, weight and line height. `--font-weight-strong` and
`--font-style-em` are the same case, since no intent carries either.

### 6. A component per role, `size` is the only prop

Three roles, so three components. Picking the component picks the role, and `<Detail>` is `Text` with a
different role, sharing its implementation.

```tsx
// Text and Detail
size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';  // default 'md' - a step on that role's ramp
```

`align`, `as`, `maxLines` and `wrap` are unchanged on both. `Heading` covers the third role and adds `level`
([rule 8](#8-heading-level-is-semantics-size-is-visuals)).

**The role is not a prop.** `RACTextProps extends HTMLAttributes<HTMLElement>` declares `role?: AriaRole`, so
that name is unavailable, and every alternative described a typeface rather than a role. Making the role the
component removes the axis instead of renaming it, and leaves `size` as the only typography prop anywhere.
The cost is one more export.

**No `weight`, `family`, `lineHeight` or `letterSpacing` props.** The theme has no vocabulary for them
beyond what the role sets, and exposing them one by one would let a caller build a fourth role the design
system never defined.

**`size` resolves to a class, not a data attribute.** `antares-components/SKILL.md` reserves data-attribute
selectors for RAC state and requires every selector to compute to `0-1-0`, which `.text[data-size="lg"]` is
not.

**Opting out is not a cascade override.** A container that wants its label to inherit cannot ship a class
that out-specifies `.detail`, because at `0-1-0` the winner is stylesheet order, which is a bundling accident
between two component modules. It goes through the slot context instead, and the component applies no
typography class at all:

```tsx
[TextContext, { typography: 'inherit' }]   // on DEFAULT_SLOT, from any control that owns its type
```

`typography` is private. It only ever arrives from a container, and a caller who passes `size` cancels it:
`<Button><Text size="lg">…</Text></Button>` has said the label should differ from the control, so `Text`
emits `body` `lg`. The path that inherits is the one with no props.

### 7. Emphasis is semantic

```tsx
<Text as="strong">overdue</Text>
<Text as="em">Cras probitas</Text>
```

`--font-weight-strong` (`bolder`) and `--font-style-em` (`italic`) are bound to those elements. They are
modifiers rather than a fourth role, since `bolder` is relative to the inherited weight, so one token
composes with all three roles. Bold text that is not emphasis is a different tier or role.

### 8. `Heading`: `level` is semantics, `size` is visuals

```tsx
level?: 1 | 2 | 3 | 4 | 5 | 6;                    // proposed default 3 (2 today), or the level a container injects
size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';  // default derived from level
as?: string;                                      // a non-heading element, for heading type outside the outline
```

`level` picks the element and `size` picks the tier. They are independent, because page structure decides the
outline while design decides the tier. A default map keeps the common case short:

| `level` | 1     | 2    | 3    | 4    | 5    | 6    |
| ------- | ----- | ---- | ---- | ---- | ---- | ---- |
| `size`  | `2xl` | `xl` | `lg` | `md` | `sm` | `xs` |

**The default level becomes `3`, but set it deliberately.** It is `2` today
(`packages/@godaddy/antares/components/text/src/heading.tsx:38`), so this is a public API change. The default
is there so a bare `Heading` renders without a browser font size, not because the component can work out
where it belongs in the outline. It cannot, and it does not try. Defaulting low would have every unset
`Heading` claim to be the page title or a top-level section, several per page, which flattens the outline for
anyone navigating by level. Containers are the exception, because they know their own depth: `Modal` and
`Drawer` inject `level={2}` for their title slot. React Spectrum v3 defaults to `3` for the same reason.

**`as` covers heading type that is not a heading**, such as a chart's own HTML title or `donut-chart`'s
centre label. `<Heading as="div">` renders the heading role on a non-heading element, and `level` does not
apply. SVG `<text>` is not one of these cases: it cannot render through a component at all and takes its type
from CSS ([rule 4](#4-surfaces-that-cannot-be-components-declare-their-own-chain)).

**Each container states its title's tier explicitly**, so an `h2` can look different in a `Modal` than in a
`Drawer` without the element differing. Not `.modal h2 { … }`, because descendant element selectors leak into
content, so a heading inside the modal body would pick up the title tier.

`Heading` also gains the full chain, so its sizes stop coming from the browser and its `bolder` becomes the
role's weight token.

### 9. Components resolve to a token

Where Figma specs a value that is a tier, the component writes that tier. Where it is not, the value snaps to
the nearest tier, with a comment recording the original, rather than staying a literal. Otherwise the theme
can no longer restyle the library.

The exceptions are the container-relative sizes: `gauge-chart` and `donut-chart` size their labels in `cqi`
so the type scales with the chart, and `avatar` sizes its monogram in `cqw`. No fixed tier can express those,
so the declarations stay. All three already render the fluid size through a `Text` with an injected class
(`chart/gauge-chart/src/index.tsx:149`, `chart/donut-chart/src/index.tsx:324`,
`components/avatar/src/index.tsx`), so once `Text` carries a default tier the two compete at `0-1-0` and
stylesheet order decides. Keeping the fluid size therefore needs rule 3's signal, not a cascade override: the
component sends "emit no typography" alongside its class, and the class declares the full chain for every
property it owns.

---

## Reference

Background and migration detail. None of it is needed to follow the proposal.

### The vocabulary

`@godaddy/design-tokens` (`src/tokens.yml`) and `@godaddy/themes` (`src/godaddy/airo/typography.json`) define
three roles, each with four properties and a six-step size ramp, named `--font-{role}-{property}` and
`--font-{role}-size-{tier}`.

| Role      | Family                  | Line height | Weight   |
| --------- | ----------------------- | ----------- | -------- |
| `detail`  | `--font-detail-family`  | `1.4`       | `normal` |
| `body`    | `--font-body-family`    | `1.5`       | `normal` |
| `heading` | `--font-heading-family` | `1.25`      | `bold`   |

| Tier  | `detail`  | `body`   | `heading` |
| ----- | --------- | -------- | --------- |
| `xs`  | 0.6875rem | 0.75rem  | 1rem      |
| `sm`  | 0.75rem   | 0.875rem | 1.125rem  |
| `md`  | 0.8125rem | 1rem     | 1.25rem   |
| `lg`  | 0.875rem  | 1.125rem | 1.5rem    |
| `xl`  | 1rem      | 1.25rem  | 1.875rem  |
| `2xl` | 1.125rem  | 1.5rem   | 2.25rem   |

Each role also has `--font-{role}-variation` for variable-font axes. Every tier above is one step of a
shared 15-step `--font-size-{005…500}` scale, but components use the role tiers, not the raw scale.

Four things about the ramp shape the proposal:

- **A role is mostly a family, weight and line-height decision.** Tiers overlap in value, since `body-sm` and
  `detail-lg` are both 0.875rem, so the role picks the treatment and the tier picks the step.
- **The ramps are hand-picked, not geometric.** The `body` steps ratio 1.167, 1.143, 1.125, 1.111, 1.2, so a
  size is never derived by multiplying a base by 1.125.
- **There is no medium weight token and no letter-spacing token.** `ux.textLabel` and `ux.textAction` carry
  `500`, which five components use, so those surfaces keep a `500` literal until a token exists.
- **Five steps are unreachable through a role**: `005` (0.625rem) and `200` to `500` (3rem to 6rem). A
  component needing 3rem has no tier to snap to, which limits [rule 9](#9-components-resolve-to-a-token).

### Prior art

| Library               | Element                                           | Visual                                                        | Container injects?                       |
| --------------------- | ------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------- |
| **Antares (this)**    | `Heading level`, `Text`/`Detail` `as`             | the component picks the role, `size` picks the tier           | yes, slot context                        |
| **React Spectrum v3** | `Heading level` (default 3)                       | none at all                                                   | yes, `slot` (default `'heading'`)        |
| **Spectrum 2**        | `Heading level`                                   | `styles` macro                                                | yes, own `HeadingContext` consumed first |
| **MUI**               | `component` per call, `variantMapping` theme-wide | `variant`: `h1`-`h6`, `body1/2`, `caption`…                   | no                                       |
| **Polaris**           | `as`, required                                    | `variant`, fused: `headingXs`…`heading2xl`, `bodyXs`…`bodyLg` | no                                       |
| **Radix Themes**      | `as`, documented as purely semantic               | `size` 1-9, also line height **and letter spacing**           | no                                       |
| **Chakra v3**         | style props                                       | `textStyle` presets or `fontSize`                             | no                                       |

**Separating the element from the visual is universal**, and MUI argues it on accessibility grounds: keep a
valid heading hierarchy without being forced into a font size. So
[rule 8](#8-heading-level-is-semantics-size-is-visuals) is standard practice.

**Containers decorating a generic component is Spectrum's model**, and Antares has already picked it for
structure, since `Content`, `Header`, `Footer` and `ButtonGroup` are decorated by `overlay-dialog`'s
provider. The alternatives are a dedicated subcomponent per slot (MUI's `DialogTitle`, Radix's
`Dialog.Title`) or leaving it to the caller (Polaris).

**Where this proposal is the outlier:**

- **Strictness.** Polaris exposes `fontWeight` and `tone`, Radix `weight` and `color`, Chakra everything.
  Only Spectrum is as closed as [rule 6](#6-a-component-per-role-size-is-the-only-prop), and the token set
  forces that rather than the proposal choosing it. Every other library offers a `medium` weight and five
  components here need exactly that, which is an argument for asking for the token.
- **A component per role.** Polaris (`headingMd`) and MUI (`h6`) fuse role and tier into one name. Splitting
  them mirrors `--font-{role}-size-{tier}` exactly, so there is no second vocabulary to maintain, and
  changing a size never means changing the purpose. It does allow combinations that duplicate each other,
  since `body-sm` and `detail-lg` are both 0.875rem.

Three things others have that this proposal does not, all worth considering later: Radix's **leading trim**,
which is the real answer to "the control's box is taller than its text"; **letter spacing**, which our token
set cannot express; and **tabular figures** (Polaris `numeric`), useful for `metrics-lockup`, charts and
tables.

### Out of scope

**Rendered markdown.** [shadcn/typeset](https://ui.shadcn.com/docs/typeset) is a CSS file activated by a
wrapper class that styles `h1`/`p`/`ul`/`table` and expects components to opt out with `not-typeset`. It
solves rendered markdown, not component internals, so it neither models this proposal nor competes with
`Text`. A prose scope is separate, later work, and one technique is worth borrowing then: keep element-level
defaults in `:where()` so a consumer's own class overrides them without `!important`.

**Responsive type.** The token ramp has no breakpoint behaviour and none is proposed here.

**Colour.** `--color-text-*` tokens exist, and components reference legacy colour intents alongside their
font declarations, but whether these components gain a colour axis is a separate decision.

### Audit

24 component stylesheets declare or read typography, and every one appears in a group below, because the last
[task](#tasks) is to migrate the rows. `Text`'s own stylesheet is not among them.

| Group                         | Components                                                                                                                                                                                            | Action                                                                                                                        |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Typography missing or partial | `Text` (no font declarations at all), `Heading` (`font-weight: bolder` only)                                                                                                                          | Implement [rule 6](#6-a-component-per-role-size-is-the-only-prop) and [rule 8](#8-heading-level-is-semantics-size-is-visuals) |
| Sizes derived by ratio        | `circular-progress` (13 refs), `segmented-controller` (2), `tag` (2), `alert`, `button`, `field`, `progress-steps`, `switch`, `toggle-button`                                                         | Replace `calc(… * 1.125)` with named tiers                                                                                    |
| Resolvable legacy intents     | `menu` (`ux.textLabel`, `ux.textAction`), `progress-bar` (`ux.textLabel`, `ux.textInput`, `ux.textCaption`), `tabs` (`ux.textLabel.fontFamily`, whose `sans-serif` fallback drops the legacy default) | Move to the role chain in [rule 5](#5-fallback-chains-sizes-stop-at-the-literal)                                              |
| Unresolvable intent hashes    | `tag` (12 refs), `chart/legend` (7), `chart/tooltip` (2), `chart/axis-title`, `alert`, `progress-steps`                                                                                               | Hashes absent from the intent map; without a fallback the declaration is invalid at computed-value time                       |
| Reads a type intent for a box | `calendar` (`ux.textAction` size and line height, only to compute `--_calendar-cell-max`)                                                                                                             | Sets no font properties; point the calculation at the tier tokens                                                             |
| Storybook-only variables      | `metrics-lockup`                                                                                                                                                                                      | Reads `--fs-detail-lg`, `--fs-2xl`, `--lh-heading`, defined only in `apps/docs/.storybook/variables.css`                      |
| Hardcoded sizes               | `range-field` (8), `switch` (5), `bar-chart` / `line-chart` (`0.794rem`), `tabs` (`16px`), `chart/legend`, `chart/tooltip`                                                                            | Snap to the nearest tier, per [rule 9](#9-components-resolve-to-a-token)                                                      |
| Hardcoded weights and leading | `gauge-chart` (`font-weight: 400`), `donut-chart` (`font-weight: bolder`), `tabs` (`font-weight: bolder`, `line-height: 1.125`)                                                                       | Role properties, not tiers: resolve through the chain in [rule 5](#5-fallback-chains-sizes-stop-at-the-literal)               |
| Retained `500` literals       | `gauge-chart` (two), and the `ux.textLabel` / `ux.textAction` weights in `menu`, `field`, `range-field`, `toggle-button`, `segmented-controller`                                                      | Keep. There is no medium weight token to resolve them to                                                                      |
| Opts out via `inherit`        | `button` (family, weight, line height)                                                                                                                                                                | Declare the full chain explicitly                                                                                             |
| Container-relative            | `gauge-chart`, `donut-chart`: the `cqi` **font sizes** only; `avatar`: the `cqw` monogram                                                                                                             | Keep, and send rule 3's signal so `Text` emits no competing tier                                                              |

Where a component reads one of these intents today, this is the tier it moves to. The comparison of values
picks a token name, not a value: after the migration a component writes `--font-heading-size-sm` and the
theme decides what that is.

| Intent family    | Used by                                                                     | Role, tier                                            | Weight today  |
| ---------------- | --------------------------------------------------------------------------- | ----------------------------------------------------- | ------------- |
| `ux.textLabel`   | `field`, `menu`, `circular-progress`, `progress-bar`, `range-field`, `tabs` | `detail` `lg`                                         | `500` literal |
| `ux.textCaption` | `field`, `circular-progress`, `donut-chart` (tooltip)                       | `detail` `lg`                                         | `400`         |
| `ux.textInput`   | `field`, `progress-bar`, `donut-chart` (label leading)                      | `body` `md`                                           | `400`         |
| `ux.textAction`  | `menu`, `calendar`, `toggle-button`, `segmented-controller`, `button`       | `body` `md`                                           | `500` literal |
| `ux.text`        | `circular-progress`, `chart/axis-title`, `donut-chart`                      | `body` `md`                                           | `400`         |
| `ux.textTitle`   | `alert`, `progress-steps`                                                   | `heading` `sm`, see [open decisions](#open-decisions) | `700`         |
| `ux.textHeading` | none directly                                                               | `heading` `2xl` (2.5rem → 2.25rem)                    | `700`         |

### Where this proposal is likely incomplete

Written from reading the library rather than building against it, so these are the places it is most likely
to be wrong. Each is worth raising against this document rather than working around locally.

- **A text surface that fits none of rules 1 to 4.** The four categories are content, container slots,
  control chrome, and non-component surfaces. A fifth would be a genuine finding.
- **A container that needs to inject something other than `level`, `size` or a class.**
- **A control whose height changes** after migrating.
  [Rule 3](#3-controls-keep-their-type-on-the-control-element) predicts it should not, so a change means
  either the strut case or a `1lh` coupling somewhere unexpected.
- **A visual difference the tier change does not explain**, especially in `tag`, `menu` and `field`, where
  current values resolve through fallbacks rather than through any theme.
- **A weight other than `normal`, `bold`, `bolder` or the `500` literal.** The token set has no vocabulary
  for it, and neither does emphasis that has to differ per role.
- **Anything here that contradicts the code**, which has moved since this was written.

### Tasks

Ordered, because the first is a precondition for the rest.

- Make `Heading` honour a container-provided `level` and `size`, with tests for all three behaviours in
  [rule 2](#2-containers-inject-defaults-through-slot-context). Until this holds, every container injection
  below fails silently.
- Give `Text` its `size` vocabulary and the chains from
  [rule 5](#5-fallback-chains-sizes-stop-at-the-literal), and add `Detail` on the same implementation. Give
  `Heading` its `size`, the `level` → `size` map, the new default `level` of `3`, and `as`. All three consume
  their context before applying defaults.
- Have `Modal`, `Drawer` and `Popover` supply `level` and `size` for their title slot, alongside the region
  contexts already in `overlay-dialog`, without replacing the context RAC's `Dialog` provides there.
- Have every control that owns its type tell a composed `Text` to emit nothing, so it cannot desynchronise a
  `1lh` `Icon` from its label. `MenuItem` already wraps every string child in a `Text`, so it is a case that
  exists today rather than one to find.
- Send the same signal from `Avatar`, `gauge-chart` and `donut-chart`, whose fluid `cqw` and `cqi` classes
  would otherwise compete with `Text`'s default tier on stylesheet order.
- Correct `components/button/examples/icon.tsx`, which wraps a button label in `Text`, and sweep for other
  composed-`Text`-inside-a-control sites.
- Fix the live defects, each independent of the rest. `chart/legend`, `chart/axis-title`, `chart/tooltip` and
  `tag` need fallbacks or the unresolvable hashes removed, and `tag` writes `var(--ux-xwz0yz, inherit)` inside
  a `calc()`, which cannot work. `progress-steps` sets `line-height` from `ux.textTitle.fontSize` while
  `ux.textTitle.lineHeight` sits unused.
- Decide the fate of the typography block in `apps/docs/.storybook/variables.css`, which is why
  `metrics-lockup` has no typography in production. Either it mirrors the token values exactly, or it goes and
  the docs app consumes the theme. Today it disagrees with the tokens and one component depends on it.
- Migrate the audit rows, carrying the `--_`-prefixed component-named renaming from
  [GU and Spacing](./gu-spacing.md#5-per-component-implementation) rule 5, and decide whether a
  `min-block-size` derived from the tier is needed for cross-control alignment.
- Correct `.agents/skills/antares-components/SKILL.md`: the three components own the type, containers inject
  through slot context, controls keep type on the control element, and the fallback chain with its size
  exception.
- Revisit whether the literal fallbacks are still needed once a theme defines the typography tokens.

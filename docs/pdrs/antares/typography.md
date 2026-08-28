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

Nothing owns typography in Antares. `Text` sets none at all, `Heading` sets no font size so its sizes come
from the user agent, and every other component decides its own font styles, drawing from nine legacy
intent families and, in one case, from a stylesheet that only exists in Storybook. Meanwhile the theme
already ships a complete type system that two components consume.

**The vocabulary already exists, so this document does not invent one.** The theme defines three type
roles, each with a family, weight and line-height, and each with a six-step size ramp from `xs` to `2xl`,
published as `--font-{role}-{property}` and `--font-{role}-size-{tier}`. `Text` exposes those three roles
as its `variant` prop, so **`variant` below always means one of `body`, `detail` or `heading`**, and the
word "role" only appears when talking about the tokens themselves. What is missing is not names but
ownership: who writes those tokens, and how they reach the parts of a composed component. Full tables in
[The vocabulary](#the-vocabulary).

### The resulting API

Two components carry all of it, and both are usable with no props at all.

```tsx
// Text: a variant and a step on that variant's ramp. Defaults to body/md.
<Text>Body copy at the md tier</Text>
<Text variant="detail" size="sm">Supporting copy</Text>
<Text as="p">Same type, a real paragraph element</Text>
<Text as="label">…</Text>

// Emphasis is the element, not a weight prop.
<Text as="strong">overdue</Text>
<Text as="em">Cras probitas</Text>

// Heading: level picks the element, size picks the tier. size defaults from level.
<Heading>Billing</Heading>                       {/* h3, lg tier */}
<Heading level={4}>Billing</Heading>             {/* h4, md tier */}
<Heading level={2} size="sm">Billing</Heading>   {/* both stated */}

// A container supplies the defaults for the slots it defines.
<Modal>
  <Heading slot="title">Delete file?</Heading>   {/* h2 at the tier Modal picks */}
</Modal>

// The caller can still override either axis.
<Modal>
  <Heading slot="title" level={4} size="lg">Delete file?</Heading>
</Modal>

// Controls own their own type, so a composed Text inherits rather than restyling.
<Button size="sm">label</Button>
<Button size="sm"><Text>label</Text></Button>    {/* indistinguishable from the line above */}
```

That is the whole public surface. `Text` takes `variant` and `size` and nothing else typographic: no
`weight`, `family`, `lineHeight` or `letterSpacing`, because the theme has no vocabulary for them beyond
what a `variant` already sets.

### The nine rules

| Rule                                                                                                               | In one line                                                                    |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| 1. [`Text` and `Heading` own the type](#1-text-and-heading-own-the-type)                                           | the only place the variant → tier decision is written, and they carry defaults |
| 2. [Containers inject defaults through slot context](#2-containers-inject-defaults-through-slot-context)           | a `Modal` decorates its `title` slot; an explicit prop on the child still wins |
| 3. [Controls keep their type on the control element](#3-controls-keep-their-type-on-the-control-element)           | so a `1lh` `Icon` stays locked to its label; a composed `Text` emits nothing   |
| 4. [Non-component surfaces declare their own chain](#4-surfaces-that-cannot-be-components-declare-their-own-chain) | `::placeholder`, SVG `<text>`, a native input's value: declared in CSS         |
| 5. [Chains are `token → intent → literal`](#5-fallback-chains-sizes-stop-at-the-literal)                           | except sizes, which skip the intent link, because intents have no size ramp    |
| 6. [`Text` is `variant` + `size`, and nothing else](#6-text-is-variant--size-and-nothing-else)                     | no `weight`, `family`, `lineHeight` or `letterSpacing` props                   |
| 7. [Emphasis is semantic](#7-emphasis-is-semantic)                                                                 | `<Text as="strong">`, not a `weight` prop                                      |
| 8. [`Heading`: `level` is semantics, `size` is visuals](#8-heading-level-is-semantics-size-is-visuals)             | independent axes, with a `level` → `size` default map                          |
| 9. [Components resolve to a token](#9-components-resolve-to-a-token)                                               | snap off-ramp Figma values to the nearest tier, with the original in a comment |

Rules 1 to 3 are the substance and 4 to 9 mostly follow from them. If you read one section, read
[rule 2](#2-containers-inject-defaults-through-slot-context): it is the mechanism everything else assumes,
and `Heading` does not support it today.

**Not addressed here:** responsive type, colour, and a prose scope for consumers rendering markdown. See
[Out of scope](#out-of-scope).

## Problem

Three questions have to be answered together, because answering any one alone produces a system that
cannot express what Figma specs:

1. **Who owns a component's font styles?** `Text` and `Heading`, or each component's own CSS?
2. **How does a composed component tell its parts what to look like**, without the caller having to
   remember that a `Modal` title is an `h2` at one tier and a `Drawer` title another?
3. **How configurable is the public typography API?** This is really the question "what is the
   vocabulary", and the theme has already answered it.

Nothing here is constrained by the current implementations. `Text`, `Heading`, `Button`, `Modal`,
`Drawer`, `Popover` and the rest may change in props, markup, context and CSS. Where a proposal implies a
public API change, that is intended.

## Open decisions

The two things this document cannot answer on its own.

1. **Is `variant` the right prop name?** `role` is unavailable
   ([rule 6](#6-text-is-variant--size-and-nothing-else)). `variant` matches the package's idiom; `font`
   and `typeface` are the alternatives. This fixes the public API, so it should be settled before `Text`
   changes.
2. **The tier for the off-ramp legacy sizes.** `ux.textTitle` is 1.375rem and `ux.textHeading` 2.5rem,
   neither on a ramp. `ux.textHeading` snaps cleanly to `heading-2xl`. `ux.textTitle` does not, because its
   two consumers divide it by 1.125 twice before using it: snapping what renders (~1.086rem) gives
   `heading-sm` and preserves today's appearance, while snapping the declared 1.375rem ties between
   `heading-md` and `heading-lg` and makes `alert`'s title visibly larger. The [audit](#audit) proposes
   `heading-sm`; the call is whether the intent's declared value or its rendered value is the thing to
   honour.

Two positions in the proposal are deliberate divergences from every comparable library, and are worth
ratifying knowingly rather than accepting by default: the **strictness** of
[rule 6](#6-text-is-variant--size-and-nothing-else), and **splitting** role from tier instead of fusing
them into one name. Both are argued in [Prior art](#prior-art).

## Proposal

### 1. `Text` and `Heading` own the type

They are the single place the role → tier decision is written, and they carry defaults so `<Text>`,
`<Text as="p">`, `<Text as="label">` and `<Heading>` are correct with no props. Consumers render text
through them; native elements stay valid, they are just unstyled.

Two things sit outside them: controls, which keep type on the control element
([rule 3](#3-controls-keep-their-type-on-the-control-element)), and surfaces that cannot be a component
([rule 4](#4-surfaces-that-cannot-be-components-declare-their-own-chain)).

### 2. Containers inject defaults through slot context

A composed component knows what its parts should look like, so it provides the defaults for the slots it
defines and the caller overrides with props. `components/_internal/overlay-dialog/src/index.tsx` already
does this for structural regions, injecting presentation:

```tsx
[HeaderContext,      { className: styles.header }],
[ContentContext,     { className: styles.content }],
[ButtonGroupContext, { className: styles.buttons, justifyContent: 'end' }]
```

Typography joins it. `Modal` supplies the `level` and `size` for its title slot, so the common case passes
nothing, and a caller who needs a different element or tier says so:

```tsx
<Modal>
  <Heading slot="title">Delete file?</Heading>            {/* h2 at the title tier, nothing passed */}
</Modal>

<Modal>
  <Heading slot="title" level={4} size="lg">…</Heading>   {/* caller wins on both axes */}
</Modal>
```

**Required behaviour**, in both directions:

- A container-injected `level` or `size` reaches the element when the caller passes neither.
- An explicit prop on the child overrides the injected value.
- The dialog's accessible name still comes from its title. RAC's `Dialog` puts the generated title id in
  the same `HeadingContext` a container would be adding typography to, so the container has to augment
  that context rather than provide a fresh value inside the dialog. Replacing it drops the id and breaks
  `aria-labelledby` silently.

`Heading` satisfies none of the first two today: it always passes its own `level`, so the `level: 2` RAC's
`Dialog` provides to `slot="title"` is discarded. This is a precondition for everything else in this
section, and all three behaviours want tests rather than assumptions about how RAC wires slots.

**Named slots for containers, `DEFAULT_SLOT` only for leaf controls.**

| Container                    | Channel                              | Why                                                           |
| ---------------------------- | ------------------------------------ | ------------------------------------------------------------- |
| Controls (`Button`, `Tag`…)  | `DEFAULT_SLOT`                       | the whole subtree *is* one text surface; nothing to leak into |
| `Modal`, `Drawer`, `Popover` | named slots (`title`, `description`) | arbitrary body content; `DEFAULT_SLOT` would capture it       |
| `Content`/`Header`/`Footer`  | flat context, as today               | each is a distinct named component appearing once             |

RAC sets the precedent: `Dialog` provides `{ slots: { [DEFAULT_SLOT]: {}, title: {…} } }`, where the empty
`DEFAULT_SLOT` is an escape valve so an unslotted `Heading` receives nothing. Requiring the slot is the
cost, and it is the right one, because the alternative silently restyles body content.

### 3. Controls keep their type on the control element

For every control that owns its type (`Button` and `LinkButton`, `ToggleButton`, `Tag`, menu items) the
type goes on the control, and the container tells a composed `Text` to **emit no typography of its own,
rather than injecting a size**, through the same slot context as
[rule 2](#2-containers-inject-defaults-through-slot-context). A `Text` that declares nothing inherits every
font property from the control, `font-variation-settings` included, which the `font` shorthand would not
cover. So `<Button>label</Button>` and `<Button><Text>label</Text></Button>` render identically, and the
label never needs wrapping.

**The reason is `Icon`.** `components/icon/src/index.module.css` sizes it `width: 1lh; height: 1lh`, and
`1lh` resolves from the icon element's own inherited line-height. As siblings, icon and label share the
control's type, so the icon matches the label's line box, which is the point of sizing it in `lh`. Move
the label's type into a sibling wrapper and inheritance does not reach the icon, since it flows down and not
sideways: the two then drift whenever the control's size changes. `toggle-button` hand-rolls the same
relationship as `calc(font-size * line-height)`.

**One display surface needs the same neutralisation.** `Avatar` is not a control, but it composes a `Text`
as its monogram fallback and injects a `.fallback` class through `TextContext`
(`components/avatar/src/index.tsx`). That class owns the type - `font-size: round(43.75cqw, 1px)`,
`font-weight`, `line-height` and `letter-spacing` - so the monogram scales with the avatar's size. Once
`Text` carries defaults, those defaults would compete with the injected class, so `Avatar` has to send the
"emit no typography" signal alongside it, exactly as a control does.

**Children are never auto-wrapped in a `Text`.** A control's children are mixed
(`<Button><Icon />label</Button>`), so wrapping could only apply to some of them, and which ones would
depend on child types. A wrapper element is still fine where CSS genuinely needs to select the label; a
bare text child is otherwise an anonymous flex item, laid out and centred like any item, and the only
thing it cannot do is be selected.

**Height follows from one line-height.** A control's height is its text's line box plus its block padding.
In a flex container, which `.button` already is, there is no strut, so the container's own `line-height`
never creates a line box and the height is the flex line's cross size. Either the `Text` is the only item
and sets it, or a bare text child inherits the control's value. Two line-heights never add up. The
stacking to watch for is the strut in a **non-flex** container, where the parent's line-height sets a
minimum line box height above the child's:

```css
/* strut = 24px, so the line box is max(24px, 18px) */
.wrapper { display: block; font-size: 16px; line-height: 1.5; }
.wrapper > .label { line-height: 18px; }
```

So every text surface is either a flex container, or the container owns the line-height.

**No control sets `line-height: 1`.** It removes no stacking, and it makes a `1lh` `Icon` resolve to
`1 x font-size`, smaller than the label's line box. Left alone, a `1lh` icon is exactly the height of the
text's line box, so it never adds height.

"Derived from the text" and "all `md` controls are the same height" are different requirements.
Line-height cannot deliver the second; that needs a `min-block-size` derived from the tier, and a minimum
rather than a fixed `block-size`, so a taller fallback font or a user stylesheet raising line-height grows
the control instead of clipping it.

### 4. Surfaces that cannot be components declare their own chain

`::placeholder` is not an element, a chart's axis tick labels are SVG `<text>` rendered by visx, and a
native `<input>`'s value needs the font on the input. These declare the chain in CSS, following
[GU and Spacing, rule 5](./gu-spacing.md#5-per-component-implementation): the full chain, on the
component's own root selector, `--_`-prefixed and component-named:

```css
.field {
  --_field-input-font-size: var(--font-body-size-md, 1rem);
  --_field-input-font-family: var(--font-body-family, var(--ux-pze30t, var(--ux-117cu43, system-ui, sans-serif)));
  --_field-input-line-height: var(--font-body-line-height, var(--ux-1hhfdnd, 1.5));
  --_field-input-font-weight: var(--font-body-weight, var(--ux-8n6y9x, normal));
  --_field-input-font-variation: var(--font-body-variation, var(--ux-1i4pt2s, normal));
}
```

Where a control's own `size` prop selects a tier, the variable takes the control's step names, as
[GU and Spacing](./gu-spacing.md#5-per-component-implementation) rule 4 establishes for spacing:

```css
--_button-font-size-sm: var(--font-body-size-sm, 0.875rem);
--_button-font-size-md: var(--font-body-size-md, 1rem);
```

These surfaces set size and all four role properties explicitly; they do not `inherit`. This is the one
place the mapping is duplicated, so the [Audit](#audit) is the artefact to diff when either side changes.

### 5. Fallback chains: sizes stop at the literal

**All four role properties chain `token → intent → literal`**, per
[GU and Spacing](./gu-spacing.md#5-per-component-implementation) rule 1: family, weight, line-height and
variation. Every chain ends in a literal, so a declaration stays valid when neither the
token nor the intent is defined.

Which intent family each role maps to is the design decision here:

| Role      | Intent family                          |
| --------- | -------------------------------------- |
| `detail`  | `ux.textCaption`                       |
| `body`    | `ux.textBody`, then `ux.textParagraph` |
| `heading` | `ux.textHeading`                       |

`body` needs the second link because `ux.textBody` carries no legacy default, so one `var()` deep is not
yet a real value:

```css
--_x-font-family: var(--font-body-family, var(--ux-pze30t, var(--ux-117cu43, system-ui, sans-serif)));
```

Which `--ux-*` variable each role and property resolves to, and which other properties need that second
link, is a lookup in `.agents/skills/antares-components/references/token-intent-legacy-map.json`. This
document does not restate it: the file is generated, and a copy here would drift from it. The rule and the
role mapping are what need ratifying, not the inventory.

**`font-variation-settings` is in the set, not scoped out.** It is the one property where an intent carries
a value the token set does not. `ux.textHeading.fontVariation` is a real display axis, while the `airo`
token is `normal`, so omitting it flattens every heading on an intent-only theme. It is also why a
control's label inherits the axis explicitly rather than relying on the `font` shorthand, which does not
cover it ([rule 3](#3-controls-keep-their-type-on-the-control-element)).

**Sizes: `token → literal`, no intent link.** The tokens give each role six tiers; the intents give each
role one font size, so nothing can mean "heading, lg". An intent-only theme therefore gets the library's
literal sizes and the correct family, weight and line-height. The literals are the tier table in
[The vocabulary](#the-vocabulary).

**The two emphasis tokens are the same case.** There is no `ux.*.fontStyle` intent and no strong-weight
intent, only absolute `ux.*.fontWeight` per family, so `--font-weight-strong` and `--font-style-em` chain
`token → literal` as well.

### 6. `Text` is `variant` + `size`, and nothing else

```tsx
variant?: 'body' | 'detail' | 'heading';          // default 'body' - family, weight, line-height
size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';  // default 'md'  - step on that role's ramp
```

`align`, `as`, `maxLines` and `wrap` are unchanged.

```tsx
<Text>Default body, md tier</Text>
<Text variant="detail" size="sm">Supporting copy</Text>
```

**The prop is `variant`, not `role`, because `role` is taken.** `RACTextProps extends
HTMLAttributes<HTMLElement>`, which declares `role?: AriaRole`. Redeclaring it as a union is a TypeScript
error unless it is omitted, and omitting it would stop a consumer writing `<Text as="div" role="status">`
for a live region. `variant` is also the existing idiom in this package.

**No `weight`, `family`, `lineHeight` or `letterSpacing` props.** The theme has no vocabulary for them
beyond what `variant` sets, and exposing them individually would let a caller build a fourth role the
design system never defined.

**Neither becomes a data attribute.** `antares-components/SKILL.md` reserves data-attribute selectors for
RAC state and requires every selector to compute to `0-1-0`, and `.text[data-variant="detail"]` is neither
RAC state nor `0-1-0`. Both resolve to CSS-module classes, one per role and one per tier within it:

```css
.detail   { /* the detail chain */ }
.detailLg { /* the tier */ }
```

**Neutralising a label is not a cascade override.** A container that wants its label to inherit cannot ship
a class that out-specifies `.detail`: at the required `0-1-0` the winner is stylesheet order, which is a
bundling accident between two component modules. It goes through the slot context instead, and `Text`
applies no typography class at all ([rule 3](#3-controls-keep-their-type-on-the-control-element)):

```tsx
[TextContext, { variant: 'inherit' }]   // on DEFAULT_SLOT, from any control that owns its type
```

`'inherit'` is not in the public `variant` union. It only ever arrives from a container, and a caller's
explicit `variant` still wins, per [rule 2](#2-containers-inject-defaults-through-slot-context).

**A caller who passes only `size` opts out too.** `<Button><Text size="lg">…</Text></Button>` merges to
`variant: 'inherit'` plus `size: 'lg'`, and a tier class cannot be selected without a variant to select it
from. So any explicit typography prop cancels the neutralisation, and the axis the caller left out falls
back to its public default rather than to `'inherit'`: `size="lg"` alone resolves to `body` `lg`. The
neutralised path is therefore the propless one, which is the case [rule 3](#3-controls-keep-their-type-on-the-control-element)
exists to protect, and a caller who states a size has said they want the label to differ from the control.

### 7. Emphasis is semantic

```tsx
<Text as="strong">overdue</Text>
<Text as="em">Cras probitas</Text>
```

`--font-weight-strong` and `--font-style-em` are bound to those elements. This is why `Text` needs no
`weight` prop: bold text that is not emphasis is a different tier or variant, not a heavier weight.

### 8. `Heading`: `level` is semantics, `size` is visuals

```tsx
level?: 1 | 2 | 3 | 4 | 5 | 6;                    // proposed default 3 (2 today), or the level a container injects
size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';  // default derived from level
```

```tsx
<Heading>Billing</Heading>                        {/* h3, default tier for level 3 */}
<Heading level={2} size="sm">Billing</Heading>
<Heading slot="title">Delete file?</Heading>      {/* container supplies level and tier */}
```

`level` picks the element, `size` picks the tier, and they are independent because the document outline is
decided by page structure while the tier is decided by design. A default map keeps the common case
propless:

| `level` | 1     | 2    | 3    | 4    | 5    | 6    |
| ------- | ----- | ---- | ---- | ---- | ---- | ---- |
| `size`  | `2xl` | `xl` | `lg` | `md` | `sm` | `xs` |

**The default level becomes `3`, and a container injects what it needs.** It is `2` today
(`packages/@godaddy/antares/components/text/src/heading.tsx:38`), so this is a public API change, of the
kind the [Problem](#problem) section says is in scope. Defaulting low would have every
unconfigured `Heading` claim to be the page title or a top-level section, producing several per page and
flattening the outline for anyone navigating by level. `3` sits far enough down that a bare `Heading`
dropped into a consumer's layout is unlikely to outrank the headings around it. Containers are the
exception, because they know their own depth: `Modal` and `Drawer` inject `level={2}` for their title
slot, since a dialog title is the top of its own outline while the page keeps its `h1`. React Spectrum v3
defaults to `3` for the same reason.

`Heading` always renders the `heading` role, so it needs no `variant`. `Text` keeps `variant="heading"`
for text that should look like a heading without being one, such as a chart's own HTML title or
`donut-chart`'s centre label. SVG `<text>` is not one of these: it cannot render through `Text` and takes
its type from CSS instead ([rule 4](#4-surfaces-that-cannot-be-components-declare-their-own-chain)).

**Each container states its title's tier explicitly**, which is the answer to "what if an `h2` looks
different in a `Modal` than in a `Drawer`": the element does not differ, the container's title slot does.
Not `.modal h2 { … }`, because descendant element selectors leak into content, so a heading inside the
modal body would pick up the title tier. And a container does not restyle a caller's `Heading` from its own CSS; it
supplies the default and the caller's props win.

`Heading` also gains the full chain, so its sizes stop coming from the user agent and its `bolder` becomes
the role's weight token.

### 9. Components resolve to a token

Where Figma specs a value that is a tier, the component writes that tier. Where it is not, the value snaps
to the nearest tier with a comment recording the original, rather than being kept as a literal. Otherwise
the theme can no longer restyle the library.

The exceptions are the container-relative sizes: `gauge-chart` and `donut-chart` size labels in `cqi` so
the type scales with the chart, and `avatar` sizes its monogram in `cqw` so it scales with the avatar.
Those are deliberately fluid and no fixed tier can express them, so those declarations stay.

---

## Reference

Background, comparisons and migration detail. None of it is needed to follow the proposal.

### The vocabulary

`@godaddy/design-tokens` (`src/tokens.yml`) and `@godaddy/themes`
(`src/godaddy/airo/typography.json`) define three roles, each with four properties and a six-step size
ramp. Token names follow `--font-{role}-{property}` and `--font-{role}-size-{tier}`.

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

Each role also has `--font-{role}-variation` for variable-font axes.

**Emphasis is a modifier, not a fourth role.** `--font-weight-strong` (`bolder`) and `--font-style-em`
(`italic`) sit under their own heading in `tokens.yml`, named `font-{property}-{modifier}` rather than
`font-{role}-{property}`. A role is a complete description of how to render text; `bolder` is relative to
whatever weight is already inherited, so one token composes with all three roles. `font-detail-weight`'s
own description says as much: "pair with semantic strong tokens for emphasis inside detail text." This is
why [rule 7](#7-emphasis-is-semantic) binds them to `strong` and `em` instead of giving `Text` a `weight`
prop.

The roles are also windows onto a shared 15-step `--font-size-{005…500}` scale: every tier above is
exactly one of its steps, `body-md` is `font-size-050`, `heading-2xl` is `font-size-100`. Components use
the role tiers, not the raw scale.

Three properties of the ramp shape the proposal:

- **A role is mostly a family, weight and line-height decision.** Tiers overlap in value, since `body-sm`
  and `detail-lg` are both 0.875rem, so the role picks the treatment and the tier picks the step.
- **The ramps are hand-picked, not geometric.** The `body` steps ratio 1.167, 1.143, 1.125, 1.111, 1.2.
  So a size is never derived by multiplying a base by 1.125; every tier is named explicitly.
- **There is no medium weight token and no letter-spacing token.** `ux.textLabel` and `ux.textAction`
  carry `500`, which five components use, so those surfaces keep a `500` literal until a token exists.
- **Five steps of the global scale are unreachable through a role**: `005` (0.625rem) and `200` to `500`
  (3rem to 6rem). A component needing 3rem has no tier to snap to, which is a limit on
  [rule 9](#9-components-resolve-to-a-token).

### Prior art

| Library               | Element                                                  | Visual                                                                          | Container injects?                       | Other axes                                                    |
| --------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------- |
| **Antares (this)**    | `Heading level`, `Text as`                               | `variant` role + `size` tier                                                    | yes, slot context                        | none                                                          |
| **React Spectrum v3** | `Heading level` (default 3)                              | none at all                                                                     | yes, `slot` (default `'heading'`)        | layout/spacing props, `UNSAFE_*`                              |
| **Spectrum 2**        | `Heading level`                                          | `styles` macro                                                                  | yes, own `HeadingContext` consumed first | -                                                             |
| **MUI**               | `component` per call, `variantMapping` theme-wide        | `variant`: `h1`-`h6`, `subtitle1/2`, `body1/2`, `button`, `caption`, `overline` | no                                       | `sx`                                                          |
| **Polaris**           | `as` (required), `h1`-`h6`/`p`/`span`/`dt`/`dd`/`strong` | `variant`, fused: `headingXs`…`heading2xl`, `bodyXs`…`bodyLg`                   | no                                       | `fontWeight`, `tone`, `alignment`, `numeric`, `truncate`      |
| **Radix Themes**      | `as`, documented as purely semantic                      | `size` 1-9; also sets line height **and letter spacing**                        | no                                       | `weight`, `color`, `highContrast`, `trim`, `truncate`, `wrap` |
| **Chakra v3**         | style props                                              | `textStyle` presets or `fontSize`                                               | no                                       | the full CSS surface                                          |
| **shadcn typeset**    | element selectors                                        | wrapper class + preset class                                                    | n/a, components opt *out*                | three CSS variables                                           |

**Separating the element from the visual is universal.** Every library above does it, and MUI argues it
on accessibility grounds: keep a valid heading hierarchy without being forced into a font size. So
[rule 8](#8-heading-level-is-semantics-size-is-visuals) is table stakes rather than a novel position.

**There are three models for "what does a modal title look like", and this proposal picks the second.**

1. **A dedicated subcomponent.** MUI's `DialogTitle` is `styled(Typography)` with `component="h2"` and
   `variant="h6"` fixed; Radix's `Dialog.Title` is `<Heading size="5" mb="3" trim="start" {...props} />`,
   the spread after the defaults so callers still win. Self-documenting, no context machinery. Costs a
   component per container per slot, and a bare `Heading` inside gets nothing.
2. **Slot and context.** Spectrum, and this proposal. One generic component everywhere, decorated by the
   container. Costs the visibility of the default at the call site, and depends on the slot name being
   right. Spectrum 2 guards that by checking the slot exists in the context before using it.
3. **The caller's problem.** Polaris: write `<Text variant="headingMd" as="h2">` yourself.

Antares has already picked the second model for structure, since `Content`, `Header`, `Footer` and
`ButtonGroup` are generic components decorated by `overlay-dialog`'s provider, and RAC's `Dialog` already
ships a `HeadingContext`. Using it for typography is the consistent choice.

**One deliberate divergence from Spectrum.** Spectrum's `Heading` has no typography props and "provides no
specific styling by itself", so a bare Spectrum `Heading` is styled by the user agent. That is exactly
the state ours is in today, and this document treats it as a defect. Spectrum can afford it because it
controls every container; Antares ships `Text` and `Heading` as primitives that consumers drop into their
own layouts, so they carry defaults ([rule 1](#1-text-and-heading-own-the-type)).

**Two places this proposal is the outlier, both worth ratifying knowingly.**

- **Strictness.** Polaris exposes `fontWeight` and `tone`, Radix `weight` and `color`, Chakra everything.
  Only Spectrum is as closed as [rule 6](#6-text-is-variant--size-and-nothing-else). Note that the closure is
  forced by the token set rather than chosen: every other library offers a `medium` weight, and five
  components here need exactly that. That is an argument for asking for the token, not for keeping `500`
  literals indefinitely.
- **Split rather than fused.** Polaris (`headingMd`) and MUI (`h6`) enumerate role and tier as one name;
  [rule 6](#6-text-is-variant--size-and-nothing-else) splits them, which offers combinations that are
  meaningless or duplicate, since `body-sm` and `detail-lg` are both 0.875rem. The defence is that the
  split mirrors `--font-{role}-size-{tier}` exactly, so there
  is no second vocabulary to maintain. It is a genuine fork, not an obvious win.

**Three things others have that this proposal does not**, none adopted here, all worth considering:

- **Leading trim** (Radix `trim`, used by its own `Dialog.Title`) removes the half-leading above and below
  the text so vertical padding reads as equal to horizontal. It is the real answer to "the control's box
  is taller than its text", where `line-height: 1` is not
  ([rule 3](#3-controls-keep-their-type-on-the-control-element)).
- **Letter spacing.** Radix scales it down as size grows, which is ordinary optical practice. Our token set
  has no letter-spacing token, so the ramp cannot express it. Invisible today; visible the moment a real
  brand font lands.
- **Tabular figures** (Polaris `numeric`). Useful for `metrics-lockup`, charts and tables. We have
  `--font-{role}-variation` but nothing for `font-variant-numeric`.

### Out of scope

[shadcn/typeset](https://ui.shadcn.com/docs/typeset) is a CSS file activated by a wrapper class that
styles `h1`/`p`/`ul`/`table` and expects components to opt out via `not-typeset`. It solves rendered
markdown, not component internals, so it neither models this proposal nor competes with `Text`. A prose
scope for consumers rendering markdown is separate, later work. One technique is worth borrowing when we
get there: keeping element-level defaults in `:where()` so a consumer's own class overrides them without
`!important`.

**Responsive type** is not addressed. The token ramp has no breakpoint behaviour and none is proposed here.

**Colour** is not addressed. `--color-text-*` tokens exist and components reference legacy colour intents
alongside their font declarations, but whether `Text` gains a colour axis is a separate decision.

### Audit

23 CSS files carry typography.

| Group                         | Components                                                                                                                                                                                                                                  | Action                                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Typography missing or partial | `Text` (no font declarations at all), `Heading` (`font-weight: bolder` only, so no size, family or line-height)                                                                                                                             | Implement [rule 6](#6-text-is-variant--size-and-nothing-else) and [rule 8](#8-heading-level-is-semantics-size-is-visuals) |
| Sizes derived by ratio        | `circular-progress` (13 refs), `segmented-controller` (2), `tag` (2), `alert`, `button`, `field`, `progress-steps`, `switch`, `toggle-button`                                                                                               | Replace `calc(… * 1.125)` with named tiers                                                                                |
| Unresolvable intent hashes    | `tag` (12 refs), `chart/legend` (7), `chart/tooltip` (2), `chart/axis-title`, `alert`, `progress-steps`                                                                                                                                     | Hashes absent from the intent map; without a fallback the declaration is invalid at computed-value time                   |
| Storybook-only variables      | `metrics-lockup`                                                                                                                                                                                                                            | Reads `--fs-detail-lg`, `--fs-2xl`, `--lh-heading`, defined only in `apps/docs/.storybook/variables.css`                  |
| Hardcoded                     | `range-field` (8), `switch` (5), `bar-chart` / `line-chart` (`0.794rem`), `chart/legend`, `chart/tooltip`, and the non-`cqi` properties of `gauge-chart` (`font-weight: 400`, two `500` literals) and `donut-chart` (`font-weight: bolder`) | Assign a tier                                                                                                             |
| Opts out via `inherit`        | `button` (family, weight, line-height)                                                                                                                                                                                                      | Declare the full chain explicitly                                                                                         |
| Container-relative            | `gauge-chart`, `donut-chart`: the `cqi` **font sizes** only; `avatar`: the `cqw` monogram font size                                                                                                                                         | Keep, per [rule 9](#9-components-resolve-to-a-token)                                                                      |

Legacy intent → role mapping for the migration. Where a component reads one of these intents today, this
is the tier it moves to:

| Intent family    | Used by                                                               | Role, tier                         | Weight today  |
| ---------------- | --------------------------------------------------------------------- | ---------------------------------- | ------------- |
| `ux.textLabel`   | `field`, `menu`, `circular-progress`, `progress-bar`, `range-field`   | `detail` `lg`                      | `500` literal |
| `ux.textCaption` | `field`, `circular-progress`                                          | `detail` `lg`                      | `400`         |
| `ux.textInput`   | `field`                                                               | `body` `md`                        | `400`         |
| `ux.textAction`  | `menu`, `calendar`, `toggle-button`, `segmented-controller`, `button` | `body` `md`                        | `500` literal |
| `ux.text`        | `circular-progress`, `chart/axis-title`, `donut-chart`                | `body` `md`                        | `400`         |
| `ux.textTitle`   | `alert`, `progress-steps`                                             | `heading` `sm` (see below)         | `700`         |
| `ux.textHeading` | none directly                                                         | `heading` `2xl` (2.5rem → 2.25rem) | `700`         |

`ux.textTitle` is the one row [rule 9](#9-components-resolve-to-a-token) does not settle on its own, because
there are two candidate values to snap. The intent declares 1.375rem, but neither consumer uses it directly:
`alert` and `progress-steps` both divide it by 1.125 twice, so what renders today is about 1.086rem. Snapping
what renders gives `heading` `sm` (1.125rem, 0.039rem away), which is the row above because it is the mapping
that preserves the current appearance. Snapping the declared 1.375rem instead gives a tie between `heading`
`md` (1.25rem) and `heading` `lg` (1.5rem), both 0.125rem away, and either would grow `alert`'s title
noticeably. `heading` `xs` is nearest to neither. Which value to snap is
[open decision 2](#open-decisions).

### Where this proposal is likely incomplete

Written from reading the library rather than from building against it, so the following are the places it
is most likely to be wrong. Each is worth raising against this document rather than working around
locally.

- **A text surface that fits none of rules 1 to 4.** The four categories are content, container slots, control
  chrome, and non-component surfaces. A fifth would be a genuine finding.
- **A container that needs to inject something other than `level`, `size` or a class.** That is the
  boundary of [rule 2](#2-containers-inject-defaults-through-slot-context), and worth examining rather than
  extending quietly.
- **A control whose height changes** after migrating. [rule 3](#3-controls-keep-their-type-on-the-control-element)
  predicts it should not, so a change means either the strut case or a `1lh` coupling somewhere
  unexpected.
- **A visual difference that the tier change does not explain**, especially in `tag`, `menu` and `field`,
  where current values resolve through fallbacks rather than through any theme.
- **A component needing a weight other than `normal`, `bold`, `bolder` or the `500` literal.** The token
  set has no vocabulary for it.
- **Emphasis that has to differ per role.** With a variable brand font, strong emphasis in a display face
  is plausibly an axis change rather than a weight jump, and one global `--font-weight-strong` cannot say
  that.
- **Anything here that contradicts the code**, which has moved since this was written.

### Tasks

Ordered, because the first is a precondition for the rest.

- Make `Heading` honour a container-provided `level` and `size`, with tests for all three behaviours in
  [rule 2](#2-containers-inject-defaults-through-slot-context). Until this holds, every container injection
  below fails silently.
- Give `Text` its `variant` and `size` vocabulary and the chains from
  [rule 5](#5-fallback-chains-sizes-stop-at-the-literal); give `Heading` its `size` and the `level` → `size`
  map. Both consume their context before applying defaults.
- Have `Modal`, `Drawer` and `Popover` supply `level` and `size` for their title slot, alongside the
  region contexts already in `overlay-dialog`, without replacing the context RAC's `Dialog` provides
  there.
- Have every control that owns its type neutralise a composed `Text` so it cannot desynchronise a `1lh`
  `Icon` from its label. `<Button size="sm">label</Button>` and
  `<Button size="sm"><Text>label</Text></Button>` should be indistinguishable. `MenuItem` already wraps
  every string child in a `Text`, so it is the case that exists today rather than one to find. `Avatar`
  needs the same signal for its monogram fallback, whose `.fallback` class owns fluid `cqw` type that
  `Text`'s defaults would otherwise compete with.
- Correct `components/button/examples/icon.tsx`, which wraps a button label in `Text`. It has to land with
  `Text`'s defaults or `Button`'s `size` prop stops sizing its own label. Sweep for other
  composed-`Text`-inside-a-control sites.
- Fix the live defects, each independent of the rest: `metrics-lockup` has no typography in production;
  `chart/legend`, `chart/axis-title`, `chart/tooltip` and `tag` need fallbacks or the removal of
  unresolvable hashes, and `tag` writes `var(--ux-xwz0yz, inherit)` inside a `calc()`, which cannot work;
  `progress-steps` sets `line-height` from `ux.textTitle.fontSize` while `ux.textTitle.lineHeight` sits
  unused.
- Decide the fate of the typography block in `apps/docs/.storybook/variables.css`. Either it mirrors the
  token values exactly, or it goes and the docs app consumes the theme. Today it disagrees with the tokens
  and one component depends on it.
- Migrate the audit rows, carrying the `--_`-prefixed component-named renaming from
  [GU and Spacing](./gu-spacing.md#5-per-component-implementation) rule 5. While doing it, check each
  text surface against the strut condition in
  [rule 3](#3-controls-keep-their-type-on-the-control-element), and decide whether a `min-block-size` is
  needed for cross-control alignment.
- Correct `.agents/skills/antares-components/SKILL.md`: `Text`/`Heading` own the type, containers inject
  through slot context, controls keep type on the control element, and the fallback chain with its size
  exception.
- Revisit whether the literal fallbacks are still needed once a theme defines the typography tokens.

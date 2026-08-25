# Typography in components

Status: **Proposed**

## Problem

`Text` sets no typography at all, `Heading` sets no font size so its sizes come from the user agent, and
the theme ships a complete three-role type system that two components consume. Everything else decides
font styles per component, drawing from nine legacy intent families, and in one case from a stylesheet
that only exists in Storybook.

This document is the guideline those components are to be brought in line with. **Nothing here is
constrained by the current implementations** - `Text`, `Heading`, `Button`, `Modal`, `Drawer`, `Popover`
and the rest may change in props, markup, context and CSS. Where a proposal implies a public API change,
that is intended.

## The vocabulary

`@godaddy/design-tokens` and `@godaddy/themes` define three roles, each with four properties and a
six-step size ramp:

| Role      | Family                  | Line height | Weight   | Sizes `xs` → `2xl` |
| --------- | ----------------------- | ----------- | -------- | ------------------ |
| `detail`  | `--font-detail-family`  | `1.4`       | `normal` | 0.6875 → 1.125rem  |
| `body`    | `--font-body-family`    | `1.5`       | `normal` | 0.75 → 1.5rem      |
| `heading` | `--font-heading-family` | `1.25`      | `bold`   | 1 → 2.25rem        |

Each role also has `--font-{role}-variation` for variable-font axes. `--font-weight-strong` (`bolder`)
and `--font-style-em` (`italic`) cover emphasis.

Two properties of the ramp matter downstream:

- **A role is mostly a family, weight and line-height decision.** The tiers overlap in value -
  `body-sm` and `detail-lg` are both 0.875rem - so `role` picks the treatment and `size` picks the step.
- **The ramps are hand-picked, not geometric.** The `body` steps ratio 1.167, 1.143, 1.125, 1.111, 1.2.
  So sizes are never derived by multiplying a base by 1.125; every tier is named explicitly.

There is no medium weight token and no letter-spacing token. `ux.textLabel` and `ux.textAction` carry
`500`, which five components use, so **those surfaces keep a `500` literal until a token exists.**

## Proposal

### 1. `Text` and `Heading` own the type

They are the single place the role → tier decision is written, and they ship defaults so `<Text>`,
`<Text as="p">`, `<Text as="label">` and `<Heading>` are correct with no props. Consumers render text
through them; native elements remain valid, they are just unstyled.

Two things sit outside them: controls, which keep type on the control element
([§3](#3-controls-keep-their-type-on-the-control-element)), and surfaces that cannot be a component
([§4](#4-surfaces-that-cannot-be-components-declare-their-own-chain)).

### 2. Containers inject defaults through slot context

A composed component knows what its parts should look like, so it provides the defaults for the slots it
defines and the caller overrides with props. `overlay-dialog` already does this for structural regions,
injecting presentation:

```tsx
[HeaderContext,      { className: styles.header }],
[ContentContext,     { className: styles.content }],
[ButtonGroupContext, { className: styles.buttons, justifyContent: 'end' }]
```

Typography joins it:

```tsx
<Modal>
  <Heading slot="title">Delete file?</Heading>            {/* h2 at the title tier, nothing passed */}
  <Heading slot="title" level={3} size="lg">…</Heading>   {/* caller wins */}
</Modal>
```

Precedence is child-wins for free: `useContextProps` calls `mergeProps(contextProps, props)` with local
props last.

**Named slots for containers, `DEFAULT_SLOT` only for leaf controls.**

| Container                    | Channel                              | Why                                                           |
| ---------------------------- | ------------------------------------ | ------------------------------------------------------------- |
| `Button`, `Tag`, MenuItem    | `DEFAULT_SLOT`                       | the whole subtree *is* one text surface; nothing to leak into  |
| `Modal`, `Drawer`, `Popover` | named slots (`title`, `description`) | arbitrary body content; `DEFAULT_SLOT` would capture it        |
| `Content`/`Header`/`Footer`  | flat context, as today               | each is a distinct named component appearing once              |

RAC sets the precedent: `Dialog` provides `{ slots: { [DEFAULT_SLOT]: {}, title: {…} } }`, where the
empty `DEFAULT_SLOT` is an escape valve so an unslotted `Heading` receives nothing. Requiring the slot is
the cost, and it is the right one - the alternative silently restyles body content.

**`Text` and `Heading` must consume their context before applying defaults**, or a container's injected
value loses to the component's own default every time. `Heading` does this wrong today
([Tasks](#tasks)).

### 3. Controls keep their type on the control element

For `Button`, `ToggleButton`, `Tag` and menu items, the type goes on the control, and the container
injects a **`className`, not a size**:

```tsx
[TextContext, { className: styles.buttonLabel }]
```
```css
.buttonLabel { font: inherit; }
```

So `<Button>label</Button>` and `<Button><Text>label</Text></Button>` render identically, and the label
never needs wrapping.

**The reason is `Icon`.** It is sized `width: 1lh; height: 1lh`, and `1lh` resolves from the icon
element's own inherited line-height. As siblings, icon and label share the control's type, so the icon
matches the label's line box - the point of sizing it in `lh`. Move the label's type into a sibling
wrapper and inheritance does not reach the icon, since it flows down and not sideways: the two then drift
whenever the control's size changes. `toggle-button` hand-rolls the same relationship as
`calc(font-size * line-height)`.

**Do not auto-wrap children in a `Text`.** A control's children are mixed
(`<Button><Icon />label</Button>`), so wrapping would mean walking the child array and wrapping only
strings and numbers, which breaks on fragments, arrays and `{count} items`. A wrapper element is fine
when CSS genuinely needs to select the label; a bare text child is otherwise an anonymous flex item, laid
out and centred like any item, and the only thing it cannot do is be selected.

**Height follows from one line-height.** A control's height should be its text's line box plus its block
padding. In a flex container - which `.button` already is - there is no strut, so the container's own
`line-height` never creates a line box and the height is the flex line's cross size. Either the `Text`
is the only item and sets it, or a bare text child inherits the control's value and that is it. Two
line-heights never add up. The stacking to watch for is the strut in a **non-flex** container, where the
parent's line-height sets a minimum line box height above the child's:

```css
/* strut = 24px, so the line box is max(24px, 18px) */
.wrapper { display: block; font-size: 16px; line-height: 1.5; }
.wrapper > .label { line-height: 18px; }
```

So: every text surface is either a flex container, or the container owns the line-height.

**Do not set `line-height: 1` on a control.** It removes no stacking, and it makes a `1lh` `Icon`
resolve to `1 x font-size` - smaller than the label's line box. Kept as-is, a `1lh` icon is exactly the
height of the text's line box, so it never adds height.

"Derived from the text" and "all `md` controls are the same height" are different requirements.
Line-height cannot deliver the second; use `min-block-size` derived from the tier, never a fixed
`block-size`, so a taller fallback font or a user stylesheet raising line-height grows the control
instead of clipping it.

### 4. Surfaces that cannot be components declare their own chain

`::placeholder` is not an element, chart labels are SVG `<text>`, and a native `<input>`'s value needs the
font on the input (or `font: inherit` with the type on its wrapper). These declare the chain in CSS,
following [GU and Spacing](./gu-spacing.md) §5 - full chain, on the component's own root selector,
`--_`-prefixed and component-named:

```css
.field {
  --_field-input-font-size: var(--font-body-size-md, 1rem);
  --_field-input-font-family: var(--font-body-family, var(--ux-pze30t, system-ui, sans-serif));
  --_field-input-line-height: var(--font-body-line-height, var(--ux-1hhfdnd, 1.5));
}
```

Where a control's own `size` prop selects a tier, the variable takes the control's step names, as GU §5
rule 4 establishes for spacing:

```css
--_button-font-size-sm: var(--font-body-size-sm, 0.875rem);
--_button-font-size-md: var(--font-body-size-md, 1rem);
```

These surfaces set all four properties explicitly; they do not `inherit`. This is the one place the
mapping is duplicated, so the [Audit](#audit) is the artefact to diff when either side changes.

### 5. Fallback chains: sizes stop at the literal

**Family, weight and line-height: `token → intent → literal`**, per GU §5 rule 1.

| Role      | Family         | Line height    | Weight                    |
| --------- | -------------- | -------------- | ------------------------- |
| `detail`  | `--ux-1gutwvn` | `--ux-1dje42v` | `--ux-g9ierp` (`400`)     |
| `body`    | `--ux-pze30t`  | `--ux-1hhfdnd` | none; `--ux-8n6y9x` (400) |
| `heading` | `--ux-shg991`  | `--ux-p25s1t`  | `--ux-c539b7` (`700`)     |

`ux.textBody`'s two intents carry no legacy default, so `body` chains two intents deep to reach a real
value:

```css
--_x-font-family: var(--font-body-family, var(--ux-pze30t, var(--ux-117cu43, system-ui, sans-serif)));
```

**Sizes: `token → literal`, no intent link.** The tokens give each role six tiers; the intents give each
role one font size, so nothing can mean "heading, lg". An intent-only theme therefore gets the library's
literal sizes and the correct family, weight and line-height.

### 6. `Text` is `role` + `size`, and nothing else

```tsx
<Text>Default body, md tier</Text>
<Text role="detail" size="sm">Supporting copy</Text>
```

- `role`: `'body' | 'detail' | 'heading'`, default `'body'`. Sets family, weight, line-height.
- `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'`, default `'md'`.
- `align`, `as`, `maxLines`, `wrap` unchanged.

**No `weight`, `family`, `lineHeight` or `letterSpacing` props.** The theme has no vocabulary for them
beyond what `role` sets, and exposing them individually would let a caller build a fourth role the design
system never defined. The prop names mirror the token names deliberately: `role="detail" size="lg"` names
`--font-detail-size-lg`.

Both are applied as data attributes, so a container can neutralise them with a class - which is how a
control hands its label `font: inherit`:

```css
.text {
  --_text-font-family: var(--font-body-family, var(--ux-pze30t, system-ui, sans-serif));
  --_text-font-size: var(--font-body-size-md, 1rem);

  &[data-role="detail"] { /* detail chain */ }
  &[data-size="lg"]     { /* per-role tier */ }
}
```

### 7. Emphasis is semantic

```tsx
<Text as="strong">overdue</Text>
<Text as="em">Cras probitas</Text>
```

`--font-weight-strong` and `--font-style-em` are bound to those elements, which is why `Text` needs no
`weight` prop: bold text that is not emphasis is a different tier or role, not a heavier weight.
Consistent with `antares-components/SKILL.md` preferring `bolder` over numeric weights.

### 8. `Heading`: `level` is semantics, `size` is visuals

```tsx
<Heading>Billing</Heading>                        {/* h2, default tier for level 2 */}
<Heading level={2} size="sm">Billing</Heading>
<Heading slot="title">Delete file?</Heading>      {/* container supplies level and tier */}
```

`level` picks the element, `size` picks the tier, and they are independent because the document outline is
decided by page structure while the tier is decided by design. A default map keeps the common case
propless:

| `level` | 1     | 2    | 3    | 4    | 5    | 6    |
| ------- | ----- | ---- | ---- | ---- | ---- | ---- |
| `size`  | `2xl` | `xl` | `lg` | `md` | `sm` | `xs` |

**The default level stays `2`.** Defaulting to `1` would have every unconfigured `Heading` claim to be
the page title, producing several per page and flattening the outline for anyone navigating by level.
Containers inject the level they need.

**Each container states its title's tier explicitly**, which is the answer to "what if an `h2` looks
different in a `Modal` than in a `Drawer`": the element does not differ, the container's title slot does.

```tsx
[HeadingContext, { slots: { [DEFAULT_SLOT]: {}, title: { ...titleProps, level: 2, size: 'xl' } } }]  // Modal
[HeadingContext, { slots: { [DEFAULT_SLOT]: {}, title: { ...titleProps, level: 2, size: 'lg' } } }]  // Drawer
```

Not `.modal h2 { … }` - descendant element selectors leak into content, so a heading inside the modal
body would pick up the title tier. And a container does not restyle a caller's `Heading` from its own
CSS; it supplies the default and the caller's props win.

`heading.module.css` gains the full chain, so sizes stop coming from the user agent and
`font-weight: bolder` becomes the role's weight token.

### 9. Components resolve to a token

Where Figma specs a value that is a tier, the component writes that tier. Where it is not, the value
snaps to the nearest tier with a note, rather than being kept as a literal - otherwise the theme can no
longer restyle the library:

```css
/* Figma 0.9rem; nearest tier detail-lg. */
--_tag-font-size: var(--font-detail-size-lg, 0.875rem);
```

One exception: `gauge-chart` and `donut-chart` size labels in `cqi` so the type scales with the chart.
That is deliberately fluid and no fixed tier can express it, so those declarations stay.

## Out of scope

[shadcn/typeset](https://ui.shadcn.com/docs/typeset) is a CSS file activated by a wrapper class that
styles `h1`/`p`/`ul`/`table` and expects components to opt out via `not-typeset`. It solves rendered
markdown, not component internals, so it neither models this proposal nor competes with `Text`. A prose
scope for consumers rendering markdown is a separate, later piece of work. One technique is worth
borrowing now: keeping element-level defaults in `:where()` so a consumer's own class overrides them
without `!important`.

Responsive type is not addressed. The token ramp has no breakpoint behaviour and none is proposed here.

## Audit

22 CSS files carry typography.

| Group                          | Components                                                                                                                            | Action                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| No typography at all           | `Text`, `Heading`                                                                                                                     | Implement §6 and §8                                                |
| Sizes derived by ratio         | `circular-progress` (13 refs), `segmented-controller` (2), `tag` (2), `alert`, `button`, `field`, `progress-steps`, `switch`, `toggle-button` | Replace `calc(… * 1.125)` with named tiers                        |
| Unresolvable intent hashes     | `tag` (12 refs), `chart/legend` (7), `chart/tooltip` (2), `chart/axis-title`, `alert`, `progress-steps`                                | Hashes absent from the intent map; without a fallback the declaration is invalid at computed-value time |
| Storybook-only variables       | `metrics-lockup`                                                                                                                      | Reads `--fs-detail-lg`, `--fs-2xl`, `--lh-heading`, defined only in `apps/docs/.storybook/variables.css`, so it has no typography in production |
| Hardcoded                      | `range-field` (8), `switch` (5), `bar-chart` / `line-chart` (`0.794rem`), `gauge-chart`, `donut-chart`, `chart/legend`, `chart/tooltip` | Assign a tier                                                     |
| Opts out via `inherit`         | `button` (family, weight, line-height)                                                                                                | Declare all four explicitly                                       |
| Container-relative             | `gauge-chart`, `donut-chart` (`cqi`)                                                                                                  | Keep, per §9                                                      |

Legacy intent → role mapping for the migration:

| Intent family    | Used by                                                                        | Role, tier                    | Weight today |
| ---------------- | ------------------------------------------------------------------------------ | ----------------------------- | ------------ |
| `ux.textLabel`   | `field`, `menu`, `circular-progress`, `progress-bar`, `range-field`             | `detail` `lg`                 | `500` literal |
| `ux.textCaption` | `field`, `circular-progress`                                                   | `detail` `lg`                 | `400`        |
| `ux.textInput`   | `field`                                                                        | `body` `md`                   | `400`        |
| `ux.textAction`  | `menu`, `calendar`, `toggle-button`, `segmented-controller`, `button`           | `body` `md`                   | `500` literal |
| `ux.text`        | `circular-progress`, `chart/axis-title`, `donut-chart`                         | `body` `md`                   | `400`        |
| `ux.textTitle`   | `alert`, `progress-steps`                                                      | `heading` `xs` (1.375rem → 1rem) | `700`     |
| `ux.textHeading` | none directly                                                                  | `heading` `2xl` (2.5rem → 2.25rem) | `700`   |

## Tasks

Fix first, because everything in §2 depends on it:

- **`Heading` must consume `HeadingContext` before applying defaults.** It currently destructures
  `level = 2` and always passes an explicit `level` to `RACHeading`, which merges with
  `mergeProps(contextProps, props)` where local wins - so the `level: 2` that RAC's `Dialog` provides to
  `slot="title"` is already ignored. Any container-injected level or tier would be silently overridden.
  Whatever the implementation, it must keep forwarding the context's props and ref, since `Dialog`
  supplies the title's `id` through them, and must not merge the context twice (that duplicates
  `className`).

Then:

- Add `role` and `size` to `Text`, with the chains from
  [§5](#5-fallback-chains-sizes-stop-at-the-literal); `Text` consumes `TextContext` before applying
  defaults. Update examples, stories, README, snapshots.
- Add `size` and the `level` → `size` map to `Heading`, and give `heading.module.css` the full chain.
- Give `Modal`, `Drawer` and `Popover` a `HeadingContext` provider carrying `level` and `size` for the
  `title` slot, alongside the region contexts in `overlay-dialog`. Named slots only.
- Give `Button`, `ToggleButton` and `Tag` a `TextContext` provider carrying a `font: inherit` label class
  ([§3](#3-controls-keep-their-type-on-the-control-element)).
- Fix `components/button/examples/icon.tsx`, which wraps a button label in `Text`. It must land with
  `Text`'s defaults or `Button`'s `size` prop stops sizing its own label. Sweep for other sites.
- Fix `metrics-lockup`, and decide whether the typography block in
  `apps/docs/.storybook/variables.css` becomes a shim that mirrors the token values or is deleted.
- Give `chart/legend`, `chart/axis-title`, `chart/tooltip` and `tag` fallbacks, or remove the
  unresolvable hashes. `tag` writes `var(--ux-xwz0yz, inherit)` inside a `calc()`, which cannot work.
- Fix `progress-steps`, which sets `line-height` from `ux.textTitle.fontSize`;
  `ux.textTitle.lineHeight` exists and is unused.
- Audit every text surface for the strut condition in
  [§3](#3-controls-keep-their-type-on-the-control-element), and decide per component whether a
  `min-block-size` is needed for cross-control alignment.
- Migrate the audit rows, carrying the `--_`-prefixed component-named renaming from GU §5 rule 5.
- Correct `antares-components/SKILL.md`: `Text`/`Heading` own the type, containers inject through slot
  context, controls keep type on the control element, and the chain with the size exception.

# Typography in components

Status: **Proposed**

## Table of Contents

- [Problem](#problem)
- [What the token spec says](#what-the-token-spec-says)
- [Current state](#current-state)
- [Proposal](#proposal)
- [Audit](#audit)
- [Open questions](#open-questions)
- [Tasks](#tasks)

---

## Problem

Antares has a `Text` component described as "the entry component for typography" that sets no
typography at all, a `Heading` that sets no font size, and a theme that ships a complete three-role
type system almost nothing consumes. Font styles are decided per component, in nine different
vocabularies, and in one case from a stylesheet that only exists in Storybook.

Two questions have to be answered together, because answering either one alone produces a system
that cannot express what Figma specs:

1. **Who owns a component's font styles** - the component's own CSS, or a `Text` component the
  component renders internally?
2. **How configurable is the public typography API** - which is really "what is the vocabulary", and
  the theme has already answered it.

Unlike [GU and Spacing tokens](./gu-spacing.md), the two systems here are not incompatible. The
legacy intents and the new tokens describe the same properties in the same units. The problem is not
translation, it is that there is no rule about which one a component reaches for, and no rule about
where typography lives.

## What the token spec says

Source: `@godaddy/design-tokens` `src/tokens.yml`, and `@godaddy/themes` `src/godaddy/airo/typography.json`,
which defines the same names. Four things bear on this proposal.

**1. Three roles, four properties each, plus a six-step size ramp.**


| Role      | Family                  | Line height | Weight   | Sizes `xs` → `2xl` |
| --------- | ----------------------- | ----------- | -------- | ------------------ |
| `detail`  | `--font-detail-family`  | `1.4`       | `normal` | 0.6875 → 1.125rem  |
| `body`    | `--font-body-family`    | `1.5`       | `normal` | 0.75 → 1.5rem      |
| `heading` | `--font-heading-family` | `1.25`      | `bold`   | 1 → 2.25rem        |


Each role also has a `--font-{role}-variation` for variable-font axis settings.

**2. The role ramps are windows over one global scale.** Every role tier is also a
`--font-size-NNN` tier:


| Role      | Tiers used                          |
| --------- | ----------------------------------- |
| `detail`  | `010` `020` `030` `040` `050` `060` |
| `body`    | `020` `040` `050` `060` `070` `080` |
| `heading` | `050` `060` `070` `080` `090` `100` |


So the roles are not independent scales. `detail` and `heading` are contiguous windows; `body` skips
`030`, which is either deliberate or a spec slip (see [Open questions](#open-questions)). The
consequence for this proposal is that **a role is mostly a family, weight and line-height decision,
not a size decision** - `body-sm` and `detail-lg` are both 0.875rem and differ only in the other
three properties.

**3. The ramps are not geometric.** The `body` steps are 0.75, 0.875, 1, 1.125, 1.25, 1.5rem, whose
successive ratios are 1.167, 1.143, 1.125, 1.111, 1.2. `heading` and `detail` are likewise irregular.
The scale is hand-picked. This matters because six components currently derive sizes with
`calc(… * 1.125)`, which reproduces no tier above or below its anchor. See
[Defects](#defects) 2.

**4. There is no medium weight, and no letter-spacing.** The weight vocabulary is
`--font-{role}-weight` (`normal`, `normal`, `bold`) plus `--font-weight-strong` (`bolder`) and
`--font-style-em` (`italic`). Nothing expresses the `500` that `ux.textLabel.fontWeight` and
`ux.textAction.fontWeight` carry and that `field`, `menu`, `range-field`, `gauge-chart` and
`toggle-button` all use today. There is no letter-spacing token at all.

## Current state

`Text` **applies no typography.** `components/text/src/text.tsx` sets `--align`, `--max-lines` and
`--wrap`, and `index.module.css` declares `overflow-wrap` plus three conditional blocks. No family,
size, weight or line-height. Whatever the host page sets is what renders, so the component described
as the entry point for typography is not one, and two apps embedding the same `Text` get different
type.

`Heading` **exists and is styled by the user agent.** `components/text/src/heading.tsx` wraps
RAC `Heading`, takes `level` (default `2`), and `heading.module.css` sets only `margin-block: 0`,
`font-weight: bolder` and `overflow-wrap`. With no `font-size`, `<Heading level={1}>` renders at the
UA default `2em` and `level={6}` at `0.67em`. The UA ramp (2, 1.5, 1.17, 1, 0.83, 0.67em) matches no
tier in `--font-heading-size-*`, so heading sizes today come from the browser, not the theme. The
component also has no way to set size independently of level, so a level-3 heading that Figma specs
at the largest tier cannot be built.

**Nine legacy vocabularies are in use.** `references/token-intent-legacy-map.json` carries nine text
intent families - `ux.text`, `ux.textAction`, `ux.textBody`, `ux.textCaption`, `ux.textHeading`,
`ux.textInput`, `ux.textLabel`, `ux.textParagraph`, `ux.textTitle` - and components draw from seven
of them. Of the 42 typography intents in that file, exactly six carry a `token` mapping -
`ux.textBody.fontFamily`, `ux.textBody.lineHeight`, `ux.textCaption.fontFamily`,
`ux.textCaption.lineHeight`, `ux.textHeading.fontFamily`, `ux.textHeading.lineHeight` - and all six
are family or line-height. No size or weight intent is mapped to a token anywhere, so the
intent → role correspondence is largely undefined and every component has invented its own.

**The previous library solved this the same way, with a wider vocabulary.** uxcore2's model, as
recorded by the artifacts in this repo, gave each component its own typography intents aliased to a
shared text role: `figma-intent-to-token/SKILL.md` documents
`packages/components/<name>/src/intents.config.mjs` assigning `intents.uxTag.* = intents.ux.*`, and the
nine text intent families above are those roles. They are named after the *use context* - `textLabel`,
`textInput`, `textAction` for controls, `textCaption` / `textParagraph` / `textTitle` / `textHeading`
for content - so a component picked the role matching its part and the theme set the value once. That
is component-owned typography resolving through a shared vocabulary, which is the architecture
[Proposal](#proposal) §1-3 restates. The differences are the ones that make the migration lossy: nine
use-context roles collapse into three semantic roles plus a ramp, and uxcore2 could express the `500`
weight that the token set cannot. (The uxcore2 repository itself was not readable while writing this;
these statements come from the intent map and the skill in this repo.)

**The new tokens are consumed by two components.** `segmented-controller` and `button` reference
`--font-body-size-{sm,md,lg}`. Nothing else in the library references any `--font-*` token.

**A role/tier vocabulary already exists, in the wrong place.**
`apps/docs/.storybook/variables.css` defines a `pow()`-based scale `--fs-2xs`…`--fs-6xl` with role
offsets `--fs-heading-{md..3xl}`, `--fs-detail-{md,lg}`, plus `--ff-{base,heading,detail}` and
`--lh-{base,heading,detail}`. That is the same three-role model the tokens ship, arrived at
independently, which is a good sign for the model and a bad sign for its location: it is a Storybook
preview file, it is not published, and its values disagree with the tokens
(`--fs-detail-lg` is `1rem / 1.125` = 0.889rem where `--font-detail-size-lg` is 0.875rem;
`--fs-heading-md` is `1rem * 1.125³` = 1.424rem where `--font-heading-size-md` is 1.25rem).

The same file also states the opposite policy to this proposal: "Let font-size cascade and avoid
using these unless absolutely necessary."

### Defects

1. `metrics-lockup` **has no typography in production.** `metrics-lockup/src/index.module.css`
  references `--fs-detail-lg` (lines 2, 31), `--fs-2xl` (25) and `--lh-heading` (27). All three are
   defined only in `apps/docs/.storybook/variables.css`, so in a consumer's app the declarations are
   invalid at computed-value time and `font-size` and `line-height` take their initial values. The
   component looks correct in Storybook and in the docs site, and only there. This is the same
   failure mode as [GU and Spacing](./gu-spacing.md) Defects 1 and 3, and the same lesson: a missing
   variable does not render as a smaller version of the intended value, it renders as the initial one.
2. **Nine components derive sizes with a ratio the scale does not have.** `circular-progress`
  (13 references, up to six chained multiplications), `tag` (2), `segmented-controller` (2),
   `alert` (`calc(var(--ux-18ime9a, 1.375rem) / var(--ux-7s4p3v, 1.125) / var(--ux-7s4p3v, 1.125))`),
   `button`, `field` (`calc(1em / 1.125)`), `progress-steps`, `switch` and `toggle-button` all treat
   the type scale as geometric with ratio 1.125. Per
   [What the token spec says](#what-the-token-spec-says) 3 it is not, so every derived value lands off
   the ramp. `circular-progress`'s largest output size computes to `1rem * 1.125⁶` = 2.027rem, between
   `heading-xl` (1.875) and `heading-2xl` (2.25); `alert`'s title computes to 1.086rem, between
   `heading-xs` (1) and `heading-sm` (1.125).
3. **Ten intent hashes resolve to nothing.** Absent from the intent map: `--ux-7s4p3v` (`alert`),
  `--ux-1nr6ynb` (`chart/axis-title` font-weight), `--ux-1s0t9v0` (`chart/legend`, `chart/tooltip`,
   `tag`), `--ux-a2dzk8` (`chart/legend`), `--ux-2lqd62` (`chart/legend`, `chart/tooltip`),
   `--ux-xwz0yz` (`chart/legend`, `tag`), and `--ux-pwotdr`, `--ux-1xzegcp`, `--ux-1fnjqac`,
   `--ux-2ihv15` (`tag`, and `--ux-1fnjqac` also `progress-steps`). Where they are written without a
   fallback - the whole of `chart/legend`, `chart/axis-title`, `chart/tooltip`, and `tag`'s size steps
  - the declaration is invalid at computed-value time. `tag` additionally writes
   `var(--ux-xwz0yz, inherit)` inside a `calc()`, which cannot work: `calc()` has no `inherit`.
4. `Button` **opts out of typography entirely for three of four properties.**
  `button/src/index.module.css:19-22` sets `font-family`, `line-height` and `font-weight` to
   `inherit`, then sets `font-size` per size step from `--font-body-size-*`. So a button's family and
   weight come from whatever encloses it and its size comes from the theme, which is two policies in
   one component.
5. `progress-steps` **sets** `line-height` **from a font-size intent.**
  `--_title-line: var(--ux-18ime9a, 1.375rem)` is `ux.textTitle.fontSize`, applied at line 94 as the
   title's `line-height`. It is valid CSS and almost certainly not the intent: a `1.375rem` line box on
   a `1.086rem` font size. `ux.textTitle.lineHeight` (`--ux-1pw8hzd`) exists and is unused.
6. `range-field` **and** `switch` **hardcode.** `range-field` writes `0.875rem` three times and
  `line-height: 1.5` / `1.375`; `switch` writes `0.875em`, `1em`, `1.375`, `1.125`. No token, no
   intent, no fallback chain.



## Proposal



### 1. Three roles, two consumers

The token roles are the whole vocabulary. There are exactly two things that consume them, and they
are different jobs that must not be routed through each other:

- **Component chrome** - text the component owns and the consumer cannot re-author: a button's label,
a tag's text, a calendar's day number, a chart's axis label, an input's value, a placeholder.
Owned by the component's own CSS.
- **Content and slots** - text the consumer writes, including the slots a component exposes and
forwards props for. Owned by `Text` and `Heading`.

The library already draws this line without stating it. `FieldLabel` renders `RACLabel` with
`styles.fieldLabel` (chrome); `FieldDescription` renders `Text` with `slot="description"` and types
its props as `Omit<TextProps, 'as' | 'slot'>` (slot). `Modal` types `titleProps` and
`descriptionProps` as `TextProps`. This proposal ratifies that instinct as the rule.

### 2. Component chrome is CSS, not a composed `Text`

**A component must not render** `Text` **to obtain its own font styles.** Four reasons.

**Not every text surface can be a component.** Chart labels are SVG `<text>`. `Field`'s font has to
be on the `<input>` itself for the value to inherit it. A button label's font belongs on the
`<button>`. `::placeholder` cannot be a React component at all. Typography that exists only as a
component cannot reach any of these, so a CSS mechanism is needed regardless - and then there would
be two.

**It hardcodes a public API choice into an internal.** If `Field` renders
`<Text role="detail" size="lg">`, the day Figma moves the label off that tier the fix is either wrong
markup or a `className` that fights `Text`'s own class. A private custom property is a seam; a
composed component is not.

**It creates a cascade fight for nothing.** `Text` sets `font-size` on `styles.text`; the composing
component's class then has to win by specificity or import order.

**Inheritance already does the composition.** Set the font on the component's root and every
descendant gets it, portal included. No component can do that.

So `<Button>Delete</Button>`, not `<Button><Text>Delete</Button></Text>` and not
`<Button><span>Delete</span></Button>`. A nested element inside a component is a layout decision -
`Flex` for an icon beside a label - never a typography one.

**An icon does not require a wrapper around the label.** `.button` already sets `display: inline-flex`,
`align-items: center`, `justify-content: center` and `gap: var(--button-gap)`. A bare text child of a
flex container becomes an *anonymous flex item*, so it is laid out, centered and gap-spaced exactly as
the icon is. A real element is needed only when the label needs its own box - truncation, `flex: 1` to
push an icon to the far end, or a label-specific style - and the one genuine cost of the anonymous item
is that CSS cannot select it.

**This is a regression risk, not a style preference.** `components/button/examples/icon.tsx` currently
renders `<Button><Icon icon="star" /><Text>With an icon!</Text></Button>`, which is inert today because
`Text` sets no typography. Once `Text` defaults to `body`/`md`, the span's own `font-size` wins over
the inherited one, so `<Button size="sm"><Text>label</Text></Button>` renders its label at `body-md`
and `Button`'s `size` prop stops affecting its own label. Every composed-`Text`-inside-chrome site has
to be corrected in the same change that gives `Text` its defaults.

### 3. Component chrome declares its own variables

Same six rules as [GU and Spacing](./gu-spacing.md) §5, applied unchanged to typography. Declare the
chain in full on the component's own root selector, name the variable after the component and after
what the component means by it, prefix it `--_`.

```css
.field {
  --_field-label-font-size: var(--font-detail-size-lg, 0.875rem);
  --_field-label-font-family: var(--font-detail-family, var(--ux-1gutwvn, system-ui, sans-serif));
  --_field-label-line-height: var(--font-detail-line-height, var(--ux-1dje42v, 1.4));
  --_field-label-font-weight: var(--font-detail-weight, var(--ux-g9ierp, normal));
}
```

Where a component's own `size` prop selects a tier, the variable takes the component's step names,
exactly as GU §5 rule 4 establishes for spacing:

```css
--_button-font-size-sm: var(--font-body-size-sm, 0.875rem);
--_button-font-size-md: var(--font-body-size-md, 1rem);
```

**Chrome sets all four properties explicitly. It does not inherit.** `inherit` means the component
renders differently in every host app and no Figma spec can be honoured. Fixing Defect 4 means
`Button` declaring family, weight and line-height alongside the size it already declares.

### 4. Fallback chains: sizes stop at the literal

GU §5 rule 1 requires `token → intent → literal` so that a token theme, an intent theme, both, or
neither all render correctly. Typography can satisfy that for three properties and cannot for the
fourth.

**Family, weight and line-height: full three-link chain.** Each role has a one-to-one intent, and the
six family and line-height correspondences are already recorded in the intent map:


| Role      | Family intent             | Line-height intent        | Weight intent         |
| --------- | ------------------------- | ------------------------- | --------------------- |
| `detail`  | `--ux-1gutwvn` *(mapped)* | `--ux-1dje42v` *(mapped)* | `--ux-g9ierp` (`400`) |
| `body`    | `--ux-pze30t` *(mapped)*  | `--ux-1hhfdnd` *(mapped)* | none; see below       |
| `heading` | `--ux-shg991` *(mapped)*  | `--ux-p25s1t` *(mapped)*  | `--ux-c539b7` (`700`) |


Two caveats on the `body` row. `ux.textBody` has only a family and a line-height, no weight, so the
closest legacy value is `ux.textParagraph.fontWeight` (`--ux-8n6y9x`, `400`), which is not mapped to a
token. And both mapped `ux.textBody.*` intents carry **no legacy default** in the map, meaning an older
intent theme defines neither; the legacy values live on `ux.textParagraph.*`, which is unmapped. So
`body`'s middle link may need to be two intents deep to be worth anything:

```css
--_x-font-family: var(--font-body-family, var(--ux-pze30t, var(--ux-117cu43, system-ui, sans-serif)));
```

That is a departure from GU §5 rule 1's three links, and it is proposed only for `body`, only because
the map shows the newer intent is undefined in practice.

**Sizes:** `token → literal`**, no intent link.** The tokens give each role six tiers; the intents give
each role one font size. No intent means "heading, lg", so there is nothing to put in the middle
link. The two candidate workarounds are both rejected:

- Deriving tiers from the intent with `calc(… * 1.125)` asserts an arithmetic the scale does not have
([What the token spec says](#what-the-token-spec-says) 3) and the token spec explicitly disclaims -
the same objection GU §"What the token spec says" 2 quotes from the token set's author. It is also
already a live defect in six components.
- Anchoring only each role's `md` tier on the intent makes one tier behave differently from the other
five for no stated reason, and `ux.textHeading.fontSize` is 2.5rem, above every heading tier, so
the anchor would be wrong where it mattered most.

The cost is stated plainly: **an intent-only theme gets the library's literal sizes.** It gets the
correct family, weight and line-height. That is the honest limit of what the intents can express, and
pretending otherwise is what produced Defect 2.

### 5. `Text` is `role` + `size`, and nothing else

```tsx
<Text>Default body, md tier</Text>
<Text role="detail" size="sm">Supporting copy</Text>
<Text role="heading" size="lg" as="h2">Section</Text>
```

- `role`: `'body' | 'detail' | 'heading'`, default `'body'`. Sets family, weight, line-height.
- `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'`, default `'md'`.
- `align`, `as`, `maxLines`, `wrap` are unchanged.

**No** `weight`**,** `family`**,** `lineHeight` **or** `letterSpacing` **props.** Every prop is a permanent promise
and a documented way to leave the system, and the theme has no vocabulary for any of them beyond what
`role` already sets. Two roles differ from a third only in these properties, so exposing them
individually would let a caller build a fourth role the design system never defined.

The prop names mirror the token names, which is deliberate: `role="detail" size="lg"` names
`--font-detail-size-lg`. A curated preset vocabulary (`variant="label"`, `variant="caption"`) was
considered and rejected because it invents names neither the tokens nor Figma use, and the mapping
would then need its own maintenance.

Because a role is applied as a data attribute, chrome and content stay independent:

```css
.text {
  --_text-font-family: var(--font-body-family, var(--ux-pze30t, system-ui, sans-serif));
  --_text-font-size: var(--font-body-size-md, 1rem);
  /* … */

  &[data-role="detail"] { /* detail chain */ }
  &[data-role="heading"] { /* heading chain */ }
  &[data-size="lg"] { /* per-role tier */ }
}
```



### 6. Emphasis is semantic

`--font-weight-strong` (`bolder`) and `--font-style-em` (`italic`) exist so that emphasis is an
element choice, not a prop:

```tsx
<Text as="strong">overdue</Text>
<Text as="em">Cras probitas</Text>
```

This is also why `Text` needs no `weight` prop: the one non-default weight the theme defines is bound
to `<strong>`, and the one non-default style to `<em>`. It keeps the markup honest, since bold text
that is not emphasis is a different tier or a different role, not a heavier weight.

This is consistent with `antares-components/SKILL.md`, which already says to prefer `bolder` over
numeric weights.

### 7. `Heading`: `level` is semantics, `size` is visuals

`Heading` keeps its RAC base - that is what gives `slot="title"` inside a `Modal` or `Dialog` its
`aria-labelledby` wiring for free - and gains a `size` prop decoupled from `level`:

```tsx
<Heading level={2}>Billing</Heading>              {/* h2, default tier for level 2 */}
<Heading level={2} size="sm">Billing</Heading>    {/* h2, small tier */}
<Heading slot="title">Delete file?</Heading>      {/* labels the dialog */}
```

`level` picks the element and nothing else. `size` picks the tier. They must be independent because
the document outline is decided by page structure and the tier is decided by Figma, and forcing them
to agree breaks one of the two. A default map keeps the common case a single prop:


| `level` | 1     | 2    | 3    | 4    | 5    | 6    |
| ------- | ----- | ---- | ---- | ---- | ---- | ---- |
| `size`  | `2xl` | `xl` | `lg` | `md` | `sm` | `xs` |


`Heading` always renders the `heading` role. `Text` keeps `role="heading"` because SVG chart titles
and visually-heading-styled non-heading text both need it, but `Heading` is the one to reach for
whenever the element is a heading.

**A parent must not push typography down by context.** RAC establishes the precedent and draws the
line in the right place. `Dialog` provides `HeadingContext` with
`{ slots: { [DEFAULT_SLOT]: {}, title: { ...titleProps, level: 2 } } }`
(`react-aria-components/dist/private/Dialog.mjs`): the `id` that makes `aria-labelledby` work, and a
`level`. No `font-size`, no `line-height`. Precedence is child-wins, since `useContextProps` calls
`mergeProps(contextProps, props)` with local props last.

The `level` → `size` map above is what makes that sufficient. RAC already supplies `level: 2` to
`slot="title"`, the map turns level 2 into `size="xl"`, so `<Modal><Heading slot="title">…</Heading></Modal>`
renders at the heading `xl` tier with nothing configured, and a caller wanting another tier passes
`size` and wins. A styling context would instead make the rendered size invisible in the caller's JSX
and add a precedence question per property. If a container's title belongs on a different tier, that is
a change to the default map, not a context.

Note that `[DEFAULT_SLOT]: {}` means an unslotted `Heading` inside a `Dialog` receives nothing, so it
neither labels the dialog nor picks up `level: 2`. `Modal` should keep accepting a `title` prop and
render the slotted `Heading` itself rather than relying on callers to remember the slot.

`heading.module.css` gains the full chain, so heading sizes stop coming from the user agent, and
`font-weight: bolder` is replaced by the role's weight token. This is what fixes the
"styled by the user agent" problem in [Current state](#current-state).

### 8. Components resolve to a token; off-ramp Figma values are reconciled

Figma specs component typography directly, and where the specced value is a tier the component writes
that tier. Where it is not, the value is **snapped to the nearest tier and recorded**, not preserved
as a literal:

```css
/* Figma 0.9rem; nearest tier detail-lg. TODO(tokens): reconcile with Figma. */
--_tag-font-size: var(--font-detail-size-lg, 0.875rem);
```

The reason is the same as GU §5 rule 2's precedence argument: if components keep off-ramp literals,
the theme can no longer restyle the library, which is the only reason the tokens exist. A value that
is not on a ramp is a spec to reconcile between Figma and `@godaddy/design-tokens` - not a number to
freeze into CSS.

**One exception, narrowly drawn: container-relative type.** `gauge-chart` and `donut-chart` size
their labels in `cqi` so the type scales with the chart. That is deliberately fluid and no fixed tier
can express it. Those declarations stay, and the exception is documented in the component rather than
argued case by case.

### 9. Out of scope: prose

[shadcn/typeset](https://ui.shadcn.com/docs/typeset) was reviewed as prior art. It is a single CSS
file activated by a `typeset` wrapper class, styling `h1`/`p`/`ul`/`table` through element selectors,
with `not-typeset` / `data-not-typeset` as the documented opt-out you are expected to put on
components. It solves styling a rendered markdown blob, and explicitly excludes component internals.
So it is not a model for component typography and does not compete with `Text` or `Heading`.

Two things are worth taking from it, one now and one later:

- **Now:** `:where()` **for element-level defaults.** Typeset keeps its element selectors in a low
priority layer wrapped in `:where()`, so a consumer's own class overrides them without
`!important` and without a specificity fight. That is a better answer to the override problem than
the `cx(styles.x, className)` merge alone, and it applies to any element-level typography Antares
ships.
- **Later: a prose scope is a real, separate need.** A consumer rendering markdown - docs, help
content, chat - has a third surface alongside chrome and `Text`/`Heading`, and a typeset-shaped CSS
scope is the right form for it. Naming it here keeps it from being conflated with this proposal.

Its `--typeset-flow` control is block spacing, which in Antares is `Flex` / `Box` `gap`, and its
`1em` container-relative sizing is deliberately fluid where the tokens are pinned tiers. Neither
should be absorbed.

## Audit

22 CSS files carry typography. Six groups. A component appears in more than one row where it mixes
approaches.


| Group                          | Components                                                                                                                                                                                                                                                                                          | Issue                                                                                                                                |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Renders with no typography     | `text` (the `Text` component itself), `text` (`Heading`, no `font-size`), `metrics-lockup` (Defect 1)                                                                                                                                                                                               | `Text` sets none; `Heading` inherits the UA ramp; `metrics-lockup` references variables that exist only in Storybook                 |
| Derives sizes by ratio         | `circular-progress` (13 refs), `segmented-controller` (2), `tag` (2), `alert` (1), `button` (1), `field` (1), `progress-steps` (1), `switch` (1), `toggle-button` (1)                                                                                                                               | `calc(… * 1.125)` against a scale that is not geometric (Defect 2). Every derived value lands off the ramp                           |
| References unresolvable hashes | `tag` (12 refs), `chart/legend` (7), `chart/tooltip` (2), `chart/axis-title` (1), `alert` (1), `progress-steps` (1)                                                                                                                                                                                 | Hashes absent from the intent map (Defect 3). Where written without a fallback, the declaration is invalid at computed-value time    |
| Hardcoded                      | `range-field` (8), `switch` (5), `chart/bar-chart` (`0.794rem`), `chart/line-chart` (`0.794rem`), `circular-progress` (`line-height: 1`), `gauge-chart` (`400`, `500`, `line-height: 1`), `donut-chart` (`bolder`), `chart/legend` (`bold`), `chart/tooltip` (`1.5`), `text` (`Heading`'s `bolder`) | No token, no intent, no chain (Defect 6). `0.794rem` is on no scale in either system                                                 |
| Opts out                       | `button` (family, weight, line-height `inherit`)                                                                                                                                                                                                                                                    | Defect 4. Type comes from the host app for three properties and from the theme for the fourth                                        |
| Container-relative             | `gauge-chart` (`9.37cqi`, `19.3cqi`, `13.56cqi`), `donut-chart` (`15.73cqi`, `6.81cqi`)                                                                                                                                                                                                             | Deliberately fluid. Covered by the exception in [Proposal §8](#8-components-resolve-to-a-token-off-ramp-figma-values-are-reconciled) |


Legacy intent usage, for the migration. Weight column marks where the token set cannot express the
current value:


| Intent family                         | Used by                                                               | Proposed role   | Weight today | Expressible                 |
| ------------------------------------- | --------------------------------------------------------------------- | --------------- | ------------ | --------------------------- |
| `ux.textLabel`                        | `field`, `menu`, `circular-progress`, `progress-bar`, `range-field`   | `detail` `lg`   | `500`        | no                          |
| `ux.textCaption`                      | `field`, `circular-progress`                                          | `detail` `lg`   | `400`        | yes                         |
| `ux.textInput`                        | `field`                                                               | `body` `md`     | `400`        | yes                         |
| `ux.textAction`                       | `menu`, `calendar`, `toggle-button`, `segmented-controller`, `button` | `body` `md`     | `500`        | no                          |
| `ux.text`                             | `circular-progress`, `chart/axis-title`, `donut-chart`                | `body` `md`     | `400`        | yes                         |
| `ux.textTitle`                        | `alert`                                                               | `heading` `?`   | `700`        | size is off-ramp (1.375rem) |
| `ux.textHeading`                      | none directly                                                         | `heading` `2xl` | `700`        | size is off-ramp (2.5rem)   |
| `ux.text.fontFamily` (`--ux-1067ph9`) | `circular-progress`, `bar-chart`, `line-chart`, `gauge-chart`         | `body` family   | -            | yes                         |




## Open questions

1. `body` **skips** `030`**.** `detail` is `010`-`060` and `heading` is `050`-`100`, both contiguous, but
  `body` is `020`, `040`, `050`, `060`, `070`, `080`. Deliberate, or a slip in `tokens.yml`? It
   determines whether `body-xs` (0.75rem) or a `030` tier (0.8125rem) is the right target for the
   smallest body text.
2. **No medium weight.** `ux.textLabel.fontWeight` and `ux.textAction.fontWeight` are `500`, used by
  five components. Migrating them to `--font-detail-weight` / `--font-body-weight` changes them to
   `normal`, which is a visible change to every field label and menu item in the library. Either that
   change is accepted, or `@godaddy/design-tokens` needs a medium weight tier.
3. `ux.textTitle` **and** `ux.textHeading` **sizes are off-ramp** at 1.375rem and 2.5rem. Under
  [§8](#8-components-resolve-to-a-token-off-ramp-figma-values-are-reconciled) both snap - `alert`'s
   title from an effective 1.086rem to `heading-xs` (1rem), and any `textHeading` consumer to
   `heading-2xl` (2.25rem). Both need a Figma value before the snap is more than a guess.
4. **Does the** `heading` **role's** `bold` **weight belong on** `Heading`**'s CSS or on the element?** The token
  says `bold`; `SKILL.md` says prefer `bolder`; `h1`-`h6` are already bold by user agent. Picking
   `--font-heading-weight` means the theme wins and the UA default is overridden explicitly, which is
   this document's position, but it puts a numeric-ish keyword back in where `SKILL.md` asked for
   `bolder`.
5. **Colour is not addressed here.** `--color-text-`* tokens exist and components reference legacy
  colour intents alongside their font declarations. Whether `Text` gains a `color` prop is a separate
   decision with the same shape as this one.



## Tasks

Independent of ratifying this proposal, all live:

- Fix `metrics-lockup` (Defect 1). It has no typography outside Storybook.
- Give `chart/legend`, `chart/axis-title`, `chart/tooltip` and `tag` fallbacks, or remove the
unresolvable hashes (Defect 3). `tag`'s `var(--ux-xwz0yz, inherit)` inside `calc()` cannot work at
all.
- Fix `progress-steps`'s `line-height` (Defect 5). `ux.textTitle.lineHeight` exists and is unused.
- Decide the fate of `apps/docs/.storybook/variables.css`'s typography block. Either it becomes a
documented shim that mirrors the token values exactly, or it is deleted and the docs app consumes
the theme. Today it disagrees with the tokens and one component depends on it.

Ratifying this proposal:

- Answer [Open questions](#open-questions) 1-3 with the design system team. Question 2 gates every
label and control in the library.
- Add `role` and `size` to `Text`, with the chains from [§4](#4-fallback-chains-sizes-stop-at-the-literal).
Update examples, stories, README, snapshots.
- Add `size` to `Heading` and the `level` → `size` default map, and give `heading.module.css` the
full chain so sizes stop coming from the user agent.
- Fix `components/button/examples/icon.tsx`, which wraps a button label in `Text`. It must land in the
same change as `Text`'s defaults or `Button`'s `size` prop stops sizing its own label
([§2](#2-component-chrome-is-css-not-a-composed-text)). Sweep for other composed-`Text`-in-chrome sites.
- Point `Modal`'s title at `Heading` and drop the hand-wired title relationship. Same for any other
component rendering `Text as="h*"`.
- Correct `antares-components/SKILL.md`: state the chrome/slot rule, that components do not render
`Text` for their own type, and the `token → intent → literal` chain with the size exception.
- Migrate the ratio group, then the hardcoded group, then the intent consumers, per the audit. Each
migration carries the `--_`-prefixed component-named renaming from GU §5 rule 5, as that document
already prescribes for the same files.
- Extract per-component typography from Figma. The audit says which components are wrong, not what
each value should be.
- Revisit whether the literal fallbacks are still needed once a theme defines the typography tokens.


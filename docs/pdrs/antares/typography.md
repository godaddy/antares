# Typography and interface size in Antares

Status: **Proposed**

## Table of Contents

- [Summary](#summary)
- [Problem](#problem)
- [The model](#the-model)
- [Components](#components)
- [Mechanism](#mechanism)
- [Tokens](#tokens)
- [Responsive sizes](#responsive-sizes)
- [Pilot](#pilot)
- [Alternatives considered](#alternatives-considered)
- [Open details](#open-details)

---

## Summary

Setting `size` on a section resizes everything inside it: text, controls, and default spacing. Setting
`size` on a component overrides the section for that component only. Text components name the purpose of
their copy, and a heading's level is independent of its visual size.

```tsx
<SizeScope size="sm">
  <TextLockup>
    <Heading slot="title" level={2}>Billing</Heading>
    <Text slot="body">Manage your payment methods.</Text>
  </TextLockup>

  <TextField>
    <Label>Email</Label>
    <Input />
    <Detail slot="description">We'll send receipts here.</Detail>
  </TextField>

  <Button>Update payment method</Button>
  <Button size="md">Contact support</Button>
</SizeScope>
```

Everything above is small except the second Button. The whole system follows from three rules:

1. **The nearest scope wins.** A scope sets the size of everything inside it, including content rendered
   in a portal. Scopes do not compound: `sm` inside `sm` is still `sm`.
2. **An explicit prop wins over the scope,** and only for the component that has it.
3. **`Text` inherits.** Unsized body text takes the typography of whatever surrounds it: a scope, a
   control, or a named part. `Detail`, `Heading`, and `Label` apply their own role.

## Problem

Typography has several owners today. `Text` sets no typography, `Heading` gets its size from the browser,
`TextLockup` applies role tokens to its slots, and every control declares its own font properties. A
consumer cannot make a section compact, for example on a narrow screen, and predict how its text, controls,
and spacing respond.

## The model

### Interface size

Interface size has three values: `sm`, `md`, `lg`. A scope maps its size to a small set of private CSS
custom properties, the **size scale**. Components read the scale and fall back to `md` values when no scope
is present.

Because custom properties inherit through the DOM, the cascade implements the rules:

- The nearest scope's values are the ones a descendant reads.
- A nested scope replaces values; it never scales them.
- An explicit prop reads the global token directly, so it is unaffected by any scope and affects nothing
  else.

The scale selects tokens; it never redefines them. `--font-body-size-md` means the same thing everywhere.

### Typography size

`Text`, `Detail`, `Heading`, `Label`, and `TextLockup` take a six-tier `size`: `xs`, `sm`, `md`, `lg`, `xl`,
`2xl`. The tier names the step on that component's own ramp, so `Text size="md"` and `Heading size="md"` have
different font sizes.

Without `size`, these components take the scope's matching tier: an `sm` scope gives heading `sm`, detail
`sm`, and so on. A scope only produces `sm`, `md`, and `lg`; `xs`, `xl`, and `2xl` are always explicit. An
explicit tier is fixed across scopes, so a size that should change with the screen uses a
[responsive value](#responsive-sizes).

### What scopes and what follows

| Kind | Components | Behavior |
| --- | --- | --- |
| Scope | `SizeScope`, Modal, Drawer, InlineDrawer, TextField and other field owners, the future Card | Sets the whole size scale and body typography on its own element |
| Text scope | `TextLockup` | Sets only the text entries of the scale, so controls inside keep the surrounding interface size |
| Follows | Buttons, Tag, Chip, Select, Menu, Popover, Tooltip, and the rest | Reads the scale, or uses its own explicit `size` |
| Independent | Box, Flex, Grid, Avatar, media, chart geometry | Ignores the scale |

A scope without an explicit `size` inherits the size around it, and still applies body typography to its own
element. Layout spacing props keep their meaning: `gap="md"` inside a small scope is still the layout `md`
gap.

## Components

### SizeScope

`SizeScope` makes any section a scope. It renders a `div` by default; `as` picks another element.

```tsx
<SizeScope as="section" size="sm">...</SizeScope>
```

It renders a real element because that is what lets bare text and ordinary HTML follow the scope. It is not
a layout component; compose Flex or Grid inside it.

Apps render a `SizeScope` at their root. That gives unsized text its body typography, and gives
responsive sizing a single place to live later. Without a root scope, `Text` inherits the app's own font,
and every other component falls back to `md`.

`SizeScope` is also how to size a single component that has no `size` prop:

```tsx
<SizeScope size="lg">
  <Alert>...</Alert>
</SizeScope>
```

So a component gets its own `size` prop only when it is commonly resized on its own, as Button is. Around
inline content, use `as="span"`.

### Text, Detail, Heading, Label

| Component | Purpose | Without `size` |
| --- | --- | --- |
| `Text` | Body copy | Inherits all font properties from its surroundings |
| `Detail` | Supporting copy, captions, metadata | Detail role at the scope's detail tier |
| `Heading` | Semantic heading | Heading role at the scope's heading tier |
| `Label` | Names a form field | Label role at the scope's label tier, medium weight |

`Text size` changes only the font size, and `emphasis` changes only the color. So `<Button><Text>Save</Text></Button>` is
identical to `<Button>Save</Button>`, and `<Button><Text emphasis="critical">Save</Text></Button>` changes only the color.
`Detail` inside a control is an explicit role change and applies the detail treatment.

There is no `variant`, `weight`, `family`, `lineHeight`, or `letterSpacing` prop. Use `as="strong"` and
`as="em"` for semantic emphasis; they use `--font-weight-strong` and `--font-style-em`.

`emphasis` selects a feedback color, matching the prop on Tag, Alert, and Avatar:

```tsx
emphasis?: 'critical' | 'warning' | 'success' | 'info' | 'highlight' | 'premium' | 'internal' | 'neutral' | 'passive';
```

When omitted, text inherits the surrounding color. `Detail` is not automatically muted.

`Heading` resolves `level` from its prop, then React Aria context, then `3`. Level never affects size.

### Controls

Controls read the control entries of the scale: height, padding, and label font size. An explicit `size`
selects the control's own values instead. Label typography lives on the control's own element, so icons
and composed `Text` inherit it.

### Owners and named parts

An owner styles its named parts by merging a class into the part's existing React Aria context. It never
replaces the context. The class sets the part's slot value in the [precedence chain](#precedence-without-selector-order),
so an explicit prop on the part still wins.

- **TextField** is a scope. Its label, input, description, and error read the scale, and the field maps them
  to tiers of their own.
- **Modal, Drawer, and Popover** give their `title` slot the scale's title tier, one heading step above the
  body tier.
- **TextLockup** with a `size` sets the text entries of the scale on its element, so every text part inside,
  slotted or not, uses that tier. Buttons inside it keep the interface size. Without `size` it follows the scope.
  Its named parts keep their existing slots, including the eyebrow Tag mapping. A tier keeps the same size
  at every container width, so the automatic narrow-width title reduction for `sm` and `2xl` is removed;
  [responsive values](#responsive-sizes) replace it.

TextLockup's `title` slot belongs to the lockup. It does not become the title of an enclosing Modal; give the
Modal its own `<Heading slot="title">`.

### Overlays

Portaled content is outside its trigger's DOM, so CSS inheritance cannot reach it. React context carries the
declared size of the nearest scope, and every portaled surface (Modal, Drawer, Popover, Tooltip) re-applies
the same scope class on its root. Menu, Select, and DatePicker render through Popover, so they get this for
free.

An owner's explicit `size` is the declared size for its overlay:

```tsx
<SizeScope size="sm">
  <Select>...</Select>            {/* small trigger, small list */}
  <Select size="lg">...</Select>  {/* large trigger, large list */}
  <ModalTrigger>
    <Button>Edit</Button>
    <Modal>...</Modal>            {/* small modal */}
  </ModalTrigger>
</SizeScope>
```

## Mechanism

### The size scale

One stylesheet defines the scale. Each size class sets these variables:

| Variable | `sm` | `md` | `lg` |
| --- | --- | --- | --- |
| `--_size-body` | body `sm` | body `md` | body `lg` |
| `--_size-detail` | detail `sm` | detail `md` | detail `lg` |
| `--_size-heading` | heading `sm` | heading `md` | heading `lg` |
| `--_size-title` | heading `md` | heading `lg` | heading `xl` |
| `--_size-label` | label `sm` | label `md` | label `lg` |
| `--_size-control-font` | body `sm` | body `md` | body `lg` |
| `--_size-control-height` | 2rem | 2.5rem | 3rem |
| `--_size-control-padding-block`, `-inline` | `010`, `020` | `020`, `030` | `030`, `040` |
| `--_size-padding`, `--_size-gap` | `sm` | `md` | `lg` |

Text sizes and spacing reference the existing tokens with their legacy-intent and literal fallbacks. The
control entries are the current Button values. Every value is a pilot starting point for visual review.

`--_size-control-font` is separate from `--_size-body` so that a TextLockup's text size never reaches the
controls inside it.

This is the one deliberate exception to the styling rule that a component declares its private variables on
its own root. The scale is declared by a scope and read by descendants. Every read has an `md` fallback, so a
missing scope is safe, and portals re-apply the scope class instead of relying on inheritance.

### Precedence without selector order

A property with several possible sources reads them through one `var()` fallback chain, most specific
first. Each source writes its own variable, so no two classes set the same property on the same element and
stylesheet order never matters:

```css
.heading {
  font-size: var(--_heading-size, var(--_heading-slot-size, var(--_size-heading, var(--font-heading-size-md, 1.25rem))));
}
```

An explicit `size` sets `--_heading-size`, the owner's part class sets `--_heading-slot-size`, and the scope
sets `--_size-heading`. Explicit spacing props already win because Box writes them as inline styles.

### What stays in React

- Carrying the declared size to portaled surfaces.
- Mapping an explicit, non-responsive size prop to classes.
- Preserving React Aria contexts, ids, levels, and field associations when adding part classes.

An inherited size is never read in JavaScript. That is what keeps responsive sizes possible.

## Tokens

The existing role ramps supply every text size. This proposal requires no change to
`packages/@godaddy/design-tokens`.

| Tier | Body | Detail | Heading |
| --- | --- | --- | --- |
| `xs` | 0.75rem | 0.6875rem | 1rem |
| `sm` | 0.875rem | 0.75rem | 1.125rem |
| `md` | 1rem | 0.8125rem | 1.25rem |
| `lg` | 1.125rem | 0.875rem | 1.5rem |
| `xl` | 1.25rem | 1rem | 1.875rem |
| `2xl` | 1.5rem | 1.125rem | 2.25rem |

- Role properties follow token, then legacy intent, then literal, per the
  [token mapping](../../../.agents/skills/antares-components/references/token-intent-legacy-map.json).
  Include `font-variation-settings`.
- There is no Label role in the tokens. Label uses the label legacy intents, medium weight, and the global
  font-size scale (`font-size-020`, `040`, `050`, ...) until a label role is approved.
- Spacing follows [the spacing rules](./gu-spacing.md).
- Geometry-fitted text, such as Avatar monograms and chart center labels, keeps its own sizing and does not
  read the scale.

## Responsive sizes

Responsive values are designed in but ship after the pilot:

```tsx
<SizeScope size={{ base: 'sm', md: 'md' }}>...</SizeScope>
```

Each breakpoint compiles to a size class inside a media query, so the size resolves in CSS during server
rendering, with no flash. Context carries the same object to portals, which apply the same classes. Because
media queries follow the viewport, a portal resolves the same size as its trigger.

Every `size` prop accepts the same form, including the six-tier ones, so an explicit size can still change
with the screen:

```tsx
<TextLockup size={{ base: 'lg', md: '2xl' }}>...</TextLockup>
<Button size={{ base: 'lg', md: 'md' }}>Save</Button>
```

A size-dependent mapping, such as TextLockup's eyebrow Tag size, must then be expressed in CSS rather than
computed from the prop in JavaScript.

This needs breakpoint tokens, which Antares does not have yet. Container queries are not used for size,
because portaled content cannot see its trigger's container.

## Pilot

1. The size scale, `SizeScope`, and the portal bridge.
2. `Text`, `Detail`, `Heading`, `Label`.
3. `Button`.
4. `TextField` with its parts.
5. `TextLockup`, `Modal`, and `Select` as the Popover example.

The pilot must show:

| Scenario | Expected |
| --- | --- |
| Components in `sm`, `md`, `lg` scopes and with no scope | Complete sizing: type, padding, minimum dimensions |
| `sm` scope inside `sm` scope | Still `sm` |
| Explicit size inside a scope | Only that component changes |
| Bare text, a plain `div`, and `Text` in a scope | Identical typography |
| `<Button>Save</Button>` and `<Button><Text>Save</Text></Button>` | Identical computed font and dimensions |
| `Text emphasis` or `maxLines` inside a control | Only color or truncation changes |
| Heading level changes without size | Different element, same typography |
| Explicit prop on a named part | Wins over the owner's part class |
| TextLockup `xl` inside an `sm` scope | Text is `xl`, controls are `sm` |
| Modal and Select opened from an `sm` scope | Portaled content is `sm`; explicit size on the owner wins |
| TextLockup title inside a Modal | Modal keeps its own title and accessible name |
| Token theme, legacy-intent theme, and no theme | Valid declarations everywhere |
| Avatar and fitted chart labels | Unchanged |

## Alternatives considered

**Resolve size in React context.** Every component reads the size during render and picks a class, and a
typography context passes part treatments down. It works for fixed sizes, but a responsive size would need
JavaScript media queries and would flash after server rendering. It also needs a dedicated mechanism to keep
a composed `Text` from restyling a control's label, which plain inheritance gives for free.

**Density only** ([Spectrum `scale`](https://react-spectrum.adobe.com/react-spectrum/Provider.html), Carbon,
MUI). Scopes resize controls and spacing but leave text alone. Simpler, but a compact section would still
need every text size set by hand, which is the main thing this proposal is for.

**Wrapperless provider.** A context-only provider adds no element, but cannot style bare text and cannot
work without JavaScript resolution. `SizeScope` renders an element instead.

**Explicit sizes on every overlay.** Simpler to build, but a small section would open medium menus and
modals unless each one were sized by hand.

Prior art for individual pieces: [Radix Select](https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/components/select.tsx)
shares its root's size with portaled content, [Radix Themes breakpoints](https://www.radix-ui.com/themes/docs/theme/breakpoints)
compile responsive props to classes, and [Ant Design ConfigProvider](https://ant.design/components/config-provider)
provides inherited component sizing.

## Open details

- Final tier mappings for each part: Modal title, TextField description and error, Label.
- Control values for `lg` on components that support only `sm` and `md` today: TextField, Select, Menu,
  Switch, ToggleButton.
- Whether components with their own `sm`/`md`/`lg` today (Tag, Chip, SegmentedController) map one to one
  onto the scale.
- The breakpoint tokens for responsive sizes.

Out of scope: prose styling for rendered Markdown, leading trim, tabular figures, and a public recipe or
subtree theme API.

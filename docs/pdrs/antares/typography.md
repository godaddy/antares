# Typography and the size scale in Antares

Status: **Proposed**

## Table of Contents

- [Summary](#summary)
- [Problem](#problem)
- [The model](#the-model)
- [Scenarios](#scenarios)
- [Components](#components)
- [Mechanism](#mechanism)
- [Tokens](#tokens)
- [Responsive sizes](#responsive-sizes)
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
    <Text slot="description">We'll send receipts here.</Text>
  </TextField>

  <Button>Update payment method</Button>
  <Button size="md">Contact support</Button>
</SizeScope>
```

Everything above is small except the second Button.

## Problem

Typography has several owners today. `Text` sets no typography, `Heading` gets its size from the browser,
`TextLockup` applies role tokens to its slots, and every control declares its own font properties. A
consumer cannot make a section compact and predict how its text, controls, and spacing respond.

## The model

The **size scale** has three sizes: `sm`, `md`, `lg` (`ScaleSize`). Three rules cover most cases:

1. **The nearest scope wins.** A scope sets the size of everything inside it, portaled content included.
   Scopes replace, never compound: `sm` inside `sm` is still `sm`.
2. **An explicit `size` wins,** and only for the component that has it.
3. **No scope means `md`.** The exception is `Text`, which always follows its surroundings.

Components relate to the scale in one of these ways:

| Kind | Components | Behavior |
| --- | --- | --- |
| Scope | `SizeScope`; `TextField`, `NumberField`, `Select`, `DatePicker`, `DateRangePicker`, and `Modal` with `size` | Sets the size for everything inside, and body typography on its own element |
| Text scope | `TextLockup` with `size` | Sizes only the text inside; controls keep the surrounding size |
| Uses the scale's values | Text roles, field parts, overlay padding and titles | Read the scale's value for their role |
| Picks its own size | `Button`, `LinkButton` | Reads which size is in effect and applies its own definition of it |
| Independent | Layout, Avatar, media, chart geometry, and components not yet adopted | Ignores the scale |

## Scenarios

The expected behavior, one row per case.

### Text

| Situation | Result |
| --- | --- |
| Bare text, a plain element, or `Text` without `size` | Inherits from its container: the scope's body size, or the page's font outside any scope |
| `Detail`, `Heading`, `Label` without `size` | The scope's detail, heading, or label tier; `md` outside any scope |
| Heading `level` changes | Different element, same typography |
| Explicit `size` on text | Applies to that element only; nested text still follows the scope |
| `as="strong"`, `as="em"`, `<b>` | Keep their weight or style over the role's |
| `Text` inside a Button | Identical to a bare label; `emphasis` and `maxLines` change only color and truncation |

### Named parts

| Situation | Result |
| --- | --- |
| Field description or `FieldError` | Label tier of the field's size |
| TextLockup body | Body tier |
| Modal, Drawer, or Popover `slot="title"` | Title tier, one heading step above the body tier |
| A part filled by `Text` or by `Detail` | Renders the same; the owner decides the treatment |
| Explicit `size` on a part | Wins over the owner |
| `TextLockup size="xl"` in an `sm` scope | Its text is `xl`; buttons inside it stay `sm` |

### Controls

| Situation | Result |
| --- | --- |
| `Button` in a scope | Uses Button's own sizes: in `sm` it is exactly `<Button size="sm">` |
| `Button` in an `md` scope | Same as a Button with no scope |
| Button size precedence | Its own `size`, then a size its parent sets for its slot, then the scope |
| Field input, control, and trigger buttons | Follow the field's size, using the scale's control values, so they line up with the input |
| Field with `size` inside a scope | Every part follows the field: label, input, buttons, description, overlay |
| Field without `size` | Follows the scope around it |

### Overlays

| Situation | Result |
| --- | --- |
| Modal, Drawer, Popover, Tooltip, Select list, or DatePicker calendar | Opens at the size of the scope around its trigger |
| Owner with explicit `size` | Its overlay uses that size |

### Themes

| Situation | Result |
| --- | --- |
| Token theme, legacy theme, or no theme | Valid values everywhere; each value falls back from token to legacy variable to literal |
| Legacy theme in a scope | Scoped and explicit sizes give the same result |
| Avatar and fitted chart labels | Unchanged |

## Components

### SizeScope

Makes any section a scope. It renders a `div` by default; `as` picks another element, such as `span` around
inline content. It renders a real element so bare text and plain HTML follow it. It is not a layout
component; compose Flex or Grid inside it.

Apps render a `SizeScope` at their root, so unsized text gets body typography. It also sizes a component that
has no `size` prop:

```tsx
<SizeScope size="lg">
  <Alert>...</Alert>
</SizeScope>
```

A component gets its own `size` prop only when it is commonly resized on its own, as Button is.

### Text, Detail, Heading, Label

| Component | Purpose |
| --- | --- |
| `Text` | Body copy |
| `Detail` | Supporting copy, captions, metadata |
| `Heading` | Semantic heading; `level` comes from its prop, then React Aria context, then `3` |
| `Label` | Names a form field, medium weight |

They take a six-tier `size`: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`. The tier is a step on that component's own
ramp, so `Text size="md"` and `Heading size="md"` differ. A scope only produces `sm`, `md`, and `lg`.

`emphasis` changes only the color, with the same values as Tag's `emphasis`:

```tsx
emphasis?: 'critical' | 'warning' | 'success' | 'info' | 'highlight' | 'premium' | 'internal' | 'neutral' | 'passive';
```

There is no `variant`, `weight`, `family`, `lineHeight`, or `letterSpacing` prop. Use `as="strong"` and
`as="em"` for semantic emphasis.

### Owners and named parts

An owner styles its named parts, such as a field's description or a lockup's body, by adding a class to the
part's existing React Aria context. It never replaces that context, so ids, levels, and field associations
are kept.

TextLockup's `title` slot belongs to the lockup. It does not become the title of an enclosing Modal; give the
Modal its own `<Heading slot="title">`.

## Mechanism

### Scale variables

A scope's size class sets private CSS variables that descendants read, each with an `md` fallback:

| Variable | `sm` | `md` | `lg` |
| --- | --- | --- | --- |
| `--_size-body` | body `sm` | body `md` | body `lg` |
| `--_size-detail` | detail `sm` | detail `md` | detail `lg` |
| `--_size-heading` | heading `sm` | heading `md` | heading `lg` |
| `--_size-title` | heading `md` | heading `lg` | heading `xl` |
| `--_size-label` | label `sm` | label `md` | label `lg` |
| `--_size-control-font` | body `sm` | body `md` | body `lg` |
| `--_size-control-padding-block` | space `010` | space `020` | space `030` |
| `--_size-padding` | space `sm` | space `md` | space `lg` |
| `--_size-gap` | space `xs` | space `sm` | space `md` |

The scale selects tokens; it never redefines them. `--_size-control-font` is separate from `--_size-body` so
a TextLockup's text size never reaches the controls inside it.

### Precedence

A property with several sources reads them through one `var()` chain, most specific first:

```css
font-size: var(--_type-size, var(--_type-slot-size, var(--_size-heading, var(--_type-md))));
```

An explicit `size` sets `--_type-size`, the owner's part class sets `--_type-slot-size`, and the scope sets
`--_size-heading`. The first two don't inherit, so an explicit size never reaches nested text.

### React's part

- **Portals.** CSS can't reach portaled content, so context carries the scope's size and every overlay
  re-applies the scope class on its root.
- **Button.** Reads the size in effect from the same context and applies its own size class.
- **Parts.** Owners add part classes through React Aria contexts.

JavaScript only picks classes from a size; it never computes values from one. That keeps responsive sizes
possible in CSS.

## Tokens

The existing role ramps supply every text size. No change to `packages/@godaddy/design-tokens` is needed.

| Tier | Body | Detail | Heading |
| --- | --- | --- | --- |
| `xs` | 0.75rem | 0.6875rem | 1rem |
| `sm` | 0.875rem | 0.75rem | 1.125rem |
| `md` | 1rem | 0.8125rem | 1.25rem |
| `lg` | 1.125rem | 0.875rem | 1.5rem |
| `xl` | 1.25rem | 1rem | 1.875rem |
| `2xl` | 1.5rem | 1.125rem | 2.25rem |

- Values follow token, then legacy intent, then literal, per the
  [token mapping](../../../.agents/skills/antares-components/references/token-intent-legacy-map.json).
- There is no Label role in the tokens yet. Label uses the global font-size scale (`font-size-020`, `040`,
  `050`).
- Spacing follows [the spacing rules](./gu-spacing.md).

## Responsive sizes

Designed in, shipped later:

```tsx
<SizeScope size={{ base: 'sm', md: 'md' }}>...</SizeScope>
<Button size={{ base: 'lg', md: 'md' }}>Save</Button>
```

Each breakpoint compiles to a size class inside a media query, so the size resolves in CSS during server
rendering, with no flash. Portals and Button receive the same object through context and apply the same
classes. Media queries follow the viewport, so a portal resolves the same size as its trigger. This needs
breakpoint tokens, which Antares does not have yet.

## Alternatives considered

- **Compute sizes in React.** Every component reads the size and computes its values. A responsive size
  would then need JavaScript media queries and would flash after server rendering.
- **Density only** ([Spectrum `scale`](https://react-spectrum.adobe.com/react-spectrum/Provider.html),
  Carbon, MUI). Scopes resize controls and spacing but not text, so a compact section would still need every
  text size set by hand.
- **Wrapperless provider.** Adds no element, but cannot style bare text.
- **Explicit sizes on every overlay.** A small section would open medium menus and modals unless each one
  were sized by hand.

Prior art: [Radix Select](https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/components/select.tsx)
shares its root's size with portaled content, [Radix Themes breakpoints](https://www.radix-ui.com/themes/docs/theme/breakpoints)
compile responsive props to classes, and [Ant Design ConfigProvider](https://ant.design/components/config-provider)
provides inherited component sizing.

## Open details

- Final tier mappings for Modal title, field description and error, and Label.
- Whether components with their own sizes today (Tag, Chip, Menu, Switch, ToggleButton, SegmentedController)
  adopt the scale, and how.
- Breakpoint tokens for responsive sizes.

Out of scope: prose styling for rendered Markdown, leading trim, tabular figures, and a public theme API.

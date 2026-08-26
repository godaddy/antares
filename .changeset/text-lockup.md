---
'@godaddy/antares': minor
---

feat: add TextLockup, a composed eyebrow / title / body type group in six sizes

- Add `TextLockup`. It positions and type-sets its parts rather than configuring them, so the
  consumer composes `Tag`/`Text`/`Heading` and can place anything else (a call to action, a
  second paragraph) alongside them. Config props are `size`, `align`, and `legibleLines`.
- `size` **is** the tier: the eyebrow reads it on the `detail` ramp, the title on `heading`, and
  the body on `body`, so there is no size table to memorize. Values come from the
  `--font-{role}-size-{tier}` tokens, chained through the legacy intents to a literal. Where the
  design spec named a value that is not a tier, it snaps to the nearest one with a comment
  recording the original - six such cells, the largest being the `2xl` title at 36px where the
  spec asks 40px, because `heading-2xl` is the top tier.
- The body is a bare `<Text>` (`slot="description"` is equivalent); the eyebrow is
  `slot="eyebrow"` on either a `Text` or a `Tag`, and a `Tag` there is sized to pair with the
  lockup. An explicit prop on a child always wins over what the lockup supplies.
- In narrow containers the title steps down one tier at `2xl` and `sm`, via a container query.
  Those are the only two sizes where the spec's mobile ratio crosses a tier.
- `legibleLines` (default `true`) constrains the text parts to a comfortable line length. It
  clamps the text children rather than the root, so a composed `Button` is unaffected.

Three supporting changes, each useful on its own:

- **`Heading` now honors a container-provided `level`.** It previously passed its own `level`
  unconditionally, discarding the one RAC's `Dialog` supplies to `slot="title"` - invisible only
  because both values were `2`. An explicit `level` prop still wins.
- **`Button` and `LinkButton` no longer let an ancestor restyle their label.** They shadow
  `TextContext`, so a button inside a container that styles its text slots keeps its own type.
  Without this, `<Button size="sm">` inside a `TextLockup size="2xl"` rendered a 24px label and
  the `size` prop stopped sizing it. Every RAC control that owns a text surface already does
  this; RAC's `Button` does not, because it never wraps its label.
- **`Tag` accepts a `TagContext`**, letting a parent supply per-slot defaults. Exported
  alongside `Tag`.

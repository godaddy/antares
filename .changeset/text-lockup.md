---
'@godaddy/antares': minor
---

feat: add TextLockup, a composed eyebrow / title / body type group in six sizes

- Add `TextLockup`. It positions and type-sets its parts rather than configuring them, so the
  consumer composes `Tag`/`Text`/`Heading` and can place anything else (a call to action, a
  second paragraph) alongside them. Config props are `size`, `align`, and `legibleLines`.
- `size` **is** the tier: the eyebrow reads it on the `detail` ramp, the title on `heading`, and
  the body on `body`, so there is no size table to memorize. Sizes come from the
  `--font-{role}-size-{tier}` tokens with a literal fallback; there is no legacy intent per tier,
  because an intent carries a single size per role. Every other type property does chain through
  its legacy intent to that intent's legacy default. Where the design spec named a value that is
  not a tier, it snaps to the nearest one - six such cells, the largest being the `2xl` title at
  36px where the spec asks 40px, because `heading-2xl` is the top tier.
- The body is a bare `<Text>` (`slot="description"` is equivalent); the eyebrow is
  `slot="eyebrow"` on either a `Text` or a `Tag`, and a `Tag` there is sized to pair with the
  lockup. An explicit prop on a child always wins over what the lockup supplies.
- In narrow containers the title steps down one tier at `2xl` and `sm`, via a container query.
  Those are the only two sizes where the spec's mobile ratio crosses a tier.
- `legibleLines` (default `true`) constrains the text parts to a comfortable line length. It
  clamps the text children rather than the root, so a composed `Button` is unaffected.

Four supporting changes, each useful on its own:

- **`Heading` now honors a container-provided `level`, and its default is `3` rather than `2`.**
  It previously passed its own `level` unconditionally, discarding the one RAC's `Dialog` supplies
  to a direct `<Heading slot="title">` - invisible only because both values were `2`. `level` is
  now left unset when you omit it, so RAC resolves it from context and falls back to its own
  default of `3`. An explicit `level` prop still wins. **A bare `<Heading>` with no container
  therefore renders `h3` instead of `h2`; pass `level` explicitly to keep the page outline right.**
- **`Heading` takes its weight from the heading ramp** (`--font-heading-weight`, chaining through
  `ux.textHeading.fontWeight` to `700`) instead of a relative `bolder`. A theme's heading weight was
  previously ignored, and inside already-bold text `bolder` compounded past it. Unchanged for the
  default theme, where `bolder` off body weight already landed on `700`.
- **`Button` and `LinkButton` no longer let an ancestor restyle their label.** They shadow
  `TextContext`, so a button inside a container that styles its text slots keeps its own type.
  Without this, `<Button size="sm">` inside a `TextLockup size="2xl"` rendered a 24px label and
  the `size` prop stopped sizing it. Every RAC control that owns a text surface already does
  this; RAC's `Button` does not, because it never wraps its label.
- **`Tag` accepts a `TagContext`**, letting a parent supply per-slot defaults. Exported
  alongside `Tag`.

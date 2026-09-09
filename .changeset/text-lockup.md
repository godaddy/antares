---
'@godaddy/antares': minor
---

feat: add TextLockup, a composed eyebrow / title / body type group in six sizes

- Add `TextLockup`. Each part takes a slot (`slot="eyebrow"` on a `Text` or `Tag`,
  `<Heading slot="title">`, `<Text slot="body">`) rather than a config prop, so anything else can
  sit alongside them. Unslotted text is left alone, so a nested component's own text is never
  restyled. `size` sets the tier for all three parts at once; `align` and `legibleLines` round out
  the props. The title steps down one tier in narrow containers at `2xl` and `sm`.

Supporting changes:

- **`Heading` takes its weight from the heading ramp** instead of a relative `bolder`, so a themed
  `--font-heading-weight` reaches it.
- **`Button`/`LinkButton` shadow `TextContext`**, so their label keeps its own type inside a
  container that styles text slots.
- **`Tag` accepts a `TagContext`**, for parent-supplied per-slot defaults.

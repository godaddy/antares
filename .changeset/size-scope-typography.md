---
'@godaddy/antares': minor
---

feat: add SizeScope and coordinated typography sizes

- Add `SizeScope`: `size` (`sm`, `md`, `lg`) sizes the text, controls, and spacing inside it, overlays
  included. A component's own `size` still wins.
- Add `Detail`. `Text`, `Detail`, `Heading`, and `Label` take a six-tier `size` and an `emphasis` color. A heading's `level` no longer changes its size.
- `Button`, `LinkButton`, `TextField`, `NumberField`, `Select`, `DatePicker`, and `DateRangePicker` add
  `size="lg"` and follow the scope. `TextField`, `NumberField`, and the pickers no longer set `data-size`.
- Button icons follow the label's line height, and icon-only Buttons are as tall as text Buttons.
- `Modal` adds `size`. `TextLockup` follows the scope and no longer shrinks its title in narrow containers.

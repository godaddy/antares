---
'@godaddy/antares': minor
---

feat: add SizeProvider and coordinated typography sizes

- Add `SizeProvider`: `size` (`sm`, `md`, `lg`) sizes the Antares text, controls, and spacing inside it,
  overlays included. It renders no element, and a component's own `size` still wins.
- Add `Detail`. `Text`, `Detail`, `Heading`, and `Label` take a six-tier `size` and an `emphasis` color. A heading's `level` no longer changes its size.
- `Text` without `size` uses the body tier (`md` outside a scope) instead of inheriting its surroundings.
  Inside Button, Chip, Menu, and other components with their own type, it still matches their type.
  `Tooltip`, `ListBoxItem`, `Checkbox`, and `Radio` set body type at the scope's size.
- `Button`, `LinkButton`, `TextField`, `NumberField`, `Select`, `DatePicker`, and `DateRangePicker` add
  `size="lg"` and follow the scope. `TextField`, `NumberField`, the pickers, and `TextLockup` no longer set
  `data-size`.
- `Calendar` and `RangeCalendar` follow the scope, so a picker's calendar dates open at the picker's size.
- Button icons follow the label's line height, and icon-only Buttons are as tall as text Buttons.
- `Modal` adds `size`. `TextLockup` follows the scope and no longer shrinks its title in narrow containers.

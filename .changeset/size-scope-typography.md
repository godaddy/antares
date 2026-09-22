---
'@godaddy/antares': minor
---

feat: add SizeScope and coordinated typography sizes

- Add `SizeScope`. Setting `size` (`sm`, `md`, `lg`) on a section sizes the text, controls, and default
  spacing inside it, including overlays that render in a portal. A component's own `size` still wins.
- Add `Detail` for supporting copy. `Text`, `Detail`, `Heading`, and `Label` take a six-tier `size` and an
  `emphasis` color. Without `size`, `Text` inherits and the others take the scope's tier. A heading's
  `level` never changes its size.
- `Button` and `LinkButton` add `size="lg"` and follow the scope when `size` is omitted.
- `TextField` and `Select` add `size="lg"` and act as scopes for their parts; `TextField` no longer sets
  `data-size`.
- `Modal` adds `size`. Modal, Drawer, and Popover follow the scope around their trigger, and their
  `slot="title"` heading takes the title tier.
- `TextLockup` without `size` follows the scope, sizes unslotted text too, and no longer steps its title
  down in narrow containers.

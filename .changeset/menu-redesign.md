---
'@godaddy/antares': minor
---

Redesign Menu with a composable API.

Breaking changes: removed `size`, `icon`, `isIndeterminate`, `MenuGroup.label`, and the implicit `Popover` and `popoverProps` from menu triggers; renamed `MenuSeparator` to `Separator`. Use `Header` with `Heading` for group labels and wrap each menu in `Popover`, moving `popoverProps` there.

---
'@godaddy/antares': minor
---

Redesign Menu component with improved documentation and composable API. Menu no longer paints a title, size, or indicators—compose them from state. Place title `Heading` as a sibling to `Menu` in the popover.

Breaking changes: removed the `size`, `icon`, and `isIndeterminate` props; renamed `MenuSeparator` to `Separator`; and removed the implicit `Popover` and `popoverProps` from `MenuTrigger` and `SubmenuTrigger`. Wrap each menu in an explicit `Popover` and move former `popoverProps` onto that component:

```tsx
<MenuTrigger>
  <Button>Edit</Button>
  <Popover placement="bottom">
    <Menu aria-label="Edit actions">...</Menu>
  </Popover>
</MenuTrigger>
```

Use the same `Popover` wrapper inside `SubmenuTrigger` for nested menus.

---
'@godaddy/antares': minor
---

Add React Aria render-prop support for component `className` and `style` props.

`Checkbox`, `Radio`, and `Switch` now apply these props to their field container rather than the interactive control. Update selectors that target interaction state to use the interactive descendant's data attributes.

---
"@godaddy/antares": minor
---

Expose Alert's interior through composition with `Content`, `Heading` or `Text` in the title slot, `ButtonGroup`, `CloseButton`, and `Icon` in the indicator slot. Supply overridable presentation defaults through context and place rendered regions with CSS Grid.

Replace `title` and `actions` props with composed children, `onClose` with `CloseButton` `onPress`, and `ariaLabels.close` with the close button's `aria-label`. Choose the icon glyph explicitly. Explicit child props override the defaults.

Keep the surface's colors, borders, padding, typography, and icon sizing. In narrow containers, align actions with the content start and reserve a dedicated close column. Omitted regions leave no reserved space. Reading and keyboard order follow the consumer's source order.

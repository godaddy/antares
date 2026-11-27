---
"@godaddy/antares": minor
---

Rebuild `Alert` on composition: the icon, title, body, actions, and close control are now children instead of props. Breaking: `title`, `actions`, `onClose`, and `ariaLabels.close` are replaced by `Heading slot="title"`, `ButtonGroup`, and `CloseButton`, and the icon is set with `Icon slot="indicator"`. Layout, typography, and spacing are refined.

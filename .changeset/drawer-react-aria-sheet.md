---
'@godaddy/antares': minor
---

Rebuild `Drawer` on React Aria's `Sheet`, adding swipe-to-close and nested drawers. Breaking: `isDismissable`, `isKeyboardDismissDisabled`, and `animate` are replaced by `preventDismissal` (dismissal is on by default), `overlayProps` now targets the backdrop, and the panel's `data-placement` is now `data-position`.

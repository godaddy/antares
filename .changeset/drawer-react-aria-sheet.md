---
'@godaddy/antares': minor
---

Rebuild `Drawer` on React Aria's `Sheet`. Drawers can now be swiped closed, and a drawer opened from inside another one stacks on top of it. Breaking: `isDismissable`, `isKeyboardDismissDisabled`, and `animate` are replaced by `preventDismissal`, which blocks swipe, Escape, and backdrop dismissal together; dismissal is now on by default.

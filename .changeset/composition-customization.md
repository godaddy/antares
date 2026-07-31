---
'@godaddy/antares': minor
---

feat: add composition containers and presets, rebuild Modal around them

- Add shared structural containers `Content`, `Header`, `Footer`, and `ButtonGroup` - generic,
  layout-only regions built on `Flex` that render correctly standalone and adopt a parent's
  styling via context (`useContextProps`).
- Add `CloseButton` (a `Button` preset defaulting to `slot="close"`, an `x` icon, and
  `aria-label="Close"`) and `Heading` (a `Text`-family preset built on React Aria's `Heading`,
  so `slot="title"` labels a dialog via `aria-labelledby`).
- **BREAKING:** Rebuild `Modal` as composition-first, modeled on React Aria / Spectrum's
  `Dialog`. The Modal owns only the overlay, container, dialog shell, and scroll layout (the
  `Content` region scrolls while `Header`/`Footer` stay pinned) and provides the container
  contexts; it no longer decides the interior structure. Compose the interior from `Header`,
  `Content`, `Footer`, `ButtonGroup`, `Heading slot="title"`, and `CloseButton`. Removed all
  config/structure props: `title`, `description`, `actions`, `media` (and `mediaVariant`/
  `mediaDirection`/`mediaPosition`), `centered`, `titleProps`, `descriptionProps`, `closeProps`,
  and `actionProps`.

---
'@godaddy/antares': minor
---

feat: bring Drawer and Popover onto the composition model and flatten every overlay's prop surface

- **BREAKING (`Drawer`):** rebuilt as composition-first, like `Modal`. Compose the interior from
  `Header`, `Content`, `Footer`, `ButtonGroup`, `Heading slot="title"`, and `CloseButton`; a
  `Content` region scrolls while `Header`/`Footer` stay pinned. Removed `showCloseButton` and
  `closeLabel` (compose a `CloseButton` in a `Header`), plus the `containerProps` and
  `contentProps` bags - their useful members are now flat props. `className` and `style` now
  target the drawer panel rather than the backdrop; style the backdrop globally with
  `--drawer-overlay-bg`.
- **BREAKING (`Popover`):** rebuilt as composition-first. Removed `showCloseButton`, `header`,
  and `contentProps`. The panel is no longer padded, so wrap plain children in `<Content>`.
  `containerPadding` is now passed straight through to React Aria at its documented default of
  12 (was 10), and the width clamp moved into CSS. Fixed the accessible name: the hard-coded
  `aria-label="Content"` is gone and ARIA labelling props now land on the element carrying
  `role="dialog"`, so a `Heading slot="title"` labels the popover as intended.
- **BREAKING (`Modal`):** removed the `overlayProps` and `containerProps` bags. `isOpen`,
  `defaultOpen`, `onOpenChange`, `isKeyboardDismissDisabled`, and `shouldCloseOnInteractOutside`
  are now flat props, so a Modal can be controlled without a `ModalTrigger`. Style the backdrop
  globally with `--modal-overlay-bg`.
- **Fixed (`Drawer`):** removed a stale `z-index: 100` on the overlay so overlays stack by open
  order again. Its comment claimed to match `Modal`, which no longer sets one.
- **Fixed (`Select`, `DatePicker`):** updated their internal `Popover` usage for the new
  composition-first shape - `Select`'s dropdown listbox and `DatePicker`/`DateRangePicker`'s
  calendar now compose a `Content` region instead of relying on the Popover's removed default
  padding, restoring the previous spacing (and, for `Select`, scrolling for long lists).
- Every selector in the `modal`, `drawer`, `popover`, and `structure` stylesheets now computes to
  a specificity of 0-1-0, and the `antares-components` skill documents that convention plus the
  new overlay prop-surface rule for future components.

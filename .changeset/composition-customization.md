---
'@godaddy/antares': minor
---

feat: bring Modal, Drawer, and Popover onto a composition model with shared structural regions

- Add shared structural containers `Content`, `Header`, `Footer`, and `ButtonGroup` - generic,
  layout-only regions built on `Flex` that render correctly standalone and adopt a parent's
  styling via context (`useContextProps`).
- Add `CloseButton` (a `Button` preset defaulting to `slot="close"`, an `x` icon, and
  `aria-label="Close"`) and `Heading` (a `Text`-family preset built on React Aria's `Heading`,
  so `slot="title"` labels a dialog via `aria-labelledby`).

Every overlay renders the same three layers - an optional backdrop, a positioned panel, and the
dialog holding the regions - but each one used to send props somewhere different. Now the rule is
the same everywhere: **the dialog is the primary surface**, so `...rest`, `className`, `style`, and
`ref` land there; layer-specific behavior stays flat; and the other layers are reached through
`overlayProps` (backdrop) or `containerProps` (positioned panel), on the components that have them.
Each bag omits whatever is already a flat prop, so nothing is settable in two places, and its
`className`/`style` merge with the component's own rather than replacing them.

- **BREAKING (`Modal`):** rebuilt as composition-first, modeled on React Aria / Spectrum's
  `Dialog`. The Modal owns only the overlay, container, dialog shell, and scroll layout (the
  `Content` region scrolls while `Header`/`Footer` stay pinned) and provides the container
  contexts; it no longer decides the interior structure. Compose the interior from `Header`,
  `Content`, `Footer`, `ButtonGroup`, `Heading slot="title"`, and `CloseButton`. Removed all
  config/structure props: `title`, `description`, `actions`, `media` (and `mediaVariant`/
  `mediaDirection`/`mediaPosition`), `centered`, `titleProps`, `descriptionProps`, `closeProps`,
  and `actionProps`. `isOpen`, `defaultOpen`, `onOpenChange`, `isKeyboardDismissDisabled`, and
  `shouldCloseOnInteractOutside` are now flat props, so a Modal can be controlled without a
  `ModalTrigger`. `overlayProps` and `containerProps` keep targeting the backdrop and the
  positioned container, but they no longer accept those open-state props, and `containerProps` no
  longer accepts `Flex` layout props.
- **BREAKING (`Drawer`):** rebuilt as composition-first, like `Modal`. Compose the interior from
  `Header`, `Content`, `Footer`, `ButtonGroup`, `Heading slot="title"`, and `CloseButton`; a
  `Content` region scrolls while `Header`/`Footer` stay pinned. Removed `showCloseButton` and
  `closeLabel` (compose a `CloseButton` in a `Header`) and `contentProps` (the dialog is now the
  direct target of `className`/`style`/rest). `className` and `style` move from the backdrop to the
  dialog - reach the backdrop with the new `overlayProps`, or set `--drawer-overlay-bg` globally.
  `containerProps` still targets the sliding panel but no longer accepts `Flex` layout props.
- **BREAKING (`Popover`):** rebuilt as composition-first. Removed `showCloseButton`, `header`, and
  `contentProps`. The panel is no longer padded, so wrap plain children in `<Content>`. `className`,
  `style`, and rest now land on the dialog rather than the positioned panel; reach the panel with
  the new `containerProps`, which is also where a custom background or width belongs (the arrow
  inherits the panel's background, and the panel owns the width clamp). Positioning and open-state
  props - `placement`, `offset`, `containerPadding`, `triggerRef`, and the rest - are now declared
  explicitly instead of inherited wholesale from RAC, and `Flex` layout props are no longer
  accepted. `containerPadding` is passed straight through to React Aria at its documented default
  of 12 (was 10). Added `role`, so a popover can be an `alertdialog`. Fixed the accessible name:
  the hard-coded `aria-label="Content"` is gone and ARIA labelling props now land on the element
  carrying `role="dialog"`, so a `Heading slot="title"` labels the popover as intended.
- **`Tooltip`** is unchanged. It has no dialog and no backdrop, so its primary surface is the
  positioned panel and it takes neither bag.
- **Fixed (`Drawer`):** removed a stale `z-index: 100` on the overlay so overlays stack by open
  order again. Its comment claimed to match `Modal`, which no longer sets one.
- **Fixed (`Select`):** updated its internal `Popover` usage for the new composition-first shape -
  the dropdown listbox now composes a `Content` region instead of relying on the Popover's removed
  default padding, restoring the previous spacing and scrolling for long lists.
- Every selector in the `modal`, `drawer`, `popover`, and `structure` stylesheets now computes to a
  specificity of 0-1-0, and the `antares-components` skill documents that convention, the
  composition model, and the prop-routing rule above for future components.

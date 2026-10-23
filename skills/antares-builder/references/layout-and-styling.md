# Layout and styling

Read this for layout, responsive CSS, typography, media, icons or consistent component sizing.

## Select the layout primitive

- `Flex` arranges a row or column, with wrapping and alignment.
- `Grid` arranges two dimensions, named areas or card/form grids. `columns` accepts a CSS string such as `repeat(3, minmax(0, 1fr))`.
- `Box` provides a surface or semantic `as` wrapper. Flex and Grid already extend Box; avoid extra wrappers solely for shared spacing or surface props.
- `Header`, `Content` and `Footer` define component regions; `ButtonGroup` groups actions, `Group` groups controls, and `CornerActions` positions corner controls. These Antares structural parts extend Flex and can receive styling from a parent field or overlay context.

Use spacing scale props (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`) where supported, and logical properties for directional layout. Keep DOM reading order consistent with visual order.

## Make the layout responsive

Antares has no viewport breakpoints or Chakra-like responsive prop objects. Use the application's media/container queries. Layout props write inline styles: when CSS changes a property at breakpoints, omit that JSX prop and define its base and responsive values in CSS.

```tsx
// columns is intentionally left to the stylesheet; gap stays constant.
<Grid className={styles.cards} gap="md">{children}</Grid>
```

```css
.cards {
  grid-template-columns: minmax(0, 1fr);
}

@media (min-width: 48rem) {
  .cards {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
```

Use the project's actual breakpoint values. Check long labels, zoom and narrow containers. Portaled overlays do not inherit container queries from the trigger's original DOM ancestry.

## Size and visual treatment

Prefer component variants, emphasis and size props before CSS overrides. `SizeProvider size="sm" | "md" | "lg"` optionally scopes adopted components, renders no element and can cross a portal. The nearest scope wins; an explicit component size overrides it.

Adopted families include Text/Detail/Heading/Label, Button/LinkButton, TextField/NumberField/Select, date pickers/Calendar, TextLockup and Modal/Drawer/Popover/Tooltip. Other components keep their own size behavior. Responsive `--antares-size` is documented for TextLockup (`xs` through `2xl`); do not assume it sizes every component. An explicit TextLockup size takes precedence.

Extend styles through `className` and confirmed state attributes such as `[data-selected]`, `[data-invalid]` and `[data-focus-visible]`. Preserve visible focus. Use existing application/theme tokens for custom CSS rather than inventing token names or copying another library's theming API.

## Typography, media and icons

- `Heading` is RAC-backed semantic heading content. Set `level` for document rank independently of visual `size`.
- `Text` supplies body copy; `Detail` supplies secondary metadata. `TextLockup` coordinates eyebrow, title and description with suitable heading semantics.
- `Image` wraps a native image: provide meaningful `alt`, or `alt=""` when decorative.
- `Avatar` presents identity; compose Image and fallback Text using the installed version's examples.
- `Icon` uses Antares's icon system. Verify the icon identifier in the installed package/docs. Name an icon-only control on the control; hide decorative icons from assistive technology. The advanced `set`, `ondemand` and `parser` exports configure icon sets/loading/parsing, rather than adding a new UI component.

The matching contexts here are `BoxContext`, `HeadingContext`, `TextContext`, `ImageContext` and `IconContext`.

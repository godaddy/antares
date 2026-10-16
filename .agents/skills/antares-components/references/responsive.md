# Responsive

Read this when a component adapts to its space, the viewport, or input devices. The decisions are in
`docs/pdrs/antares/responsive.md`, and consumer usage is in `components/responsive/README.mdx`.

## Pick the mechanism

Take the first one that works:

1. **Intrinsic CSS.** Wrapping, `minmax()`, `auto-fill`, `flex-wrap`, and `min-inline-size: 0` need no
   threshold.
2. **Container query** when the component adapts to the space it is given.
3. **Media feature** for device conditions: `pointer`, `hover`, `prefers-reduced-motion`, or
   `forced-colors`.
4. **Viewport width** only for overlays that fill a small viewport, such as Modal and Drawer.

## Container queries

- Name the container after the component on its root, `container: alert / inline-size`, and query it by
  name: `@container alert (min-width: 30rem)`. The rules style the root's descendants, never the root.
- Write local thresholds in `rem`, mobile-first.
- The root can't take its width from its content. It needs one from its parent, such as a block element
  or a stretched flex or grid item. Otherwise it collapses to zero.
- Portaled content is outside the container. Give it its own container in its DOM ancestry.

## Viewport widths

Components don't use viewport widths, and Antares publishes no breakpoints. Overlays share one internal
threshold and document it in their README. A node test in `components/responsive` fails on any
viewport-width media query in component CSS; the overlay that introduces the threshold adds it to that
test.

## Responsive size

A component that follows `--antares-size` reads it with container style queries only when `size` is
unset, so an explicit `size` wins. TextLockup's `followSize` class is the reference. Document it in two
places: add a row to the table in `components/responsive/README.mdx`, and mention the variable in the
`size` prop's JSDoc. Don't add a responsive example to the component. Cover the variable, an explicit
`size`, and an unset variable in an `@ignore` fixture with browser tests.

## Props and structure

- Props stay scalar. Don't add per-breakpoint props, and don't switch props by viewport in JavaScript.
- Layout props write inline styles, which beat module CSS. If a value changes across a query, set it in
  CSS and leave the prop unset.
- Reflow one DOM tree with CSS instead of rendering different trees, so reading order, focus, and entered
  values survive.
- Behavior that depends on a media feature reads it on the client after hydration, and keeps state and
  focus when the result changes.

## Tests

- Browser: cover both sides of each threshold. For viewports, `page.viewport(width - 1)` and
  `page.viewport(width)`; for containers, change the container's width at a fixed viewport.
- Visual: when the look changes, screenshot the example at a mobile viewport (`320px`) and on each side of
  its threshold.
- Check the README's accessibility cases: long text, RTL, text enlargement, and zoom.

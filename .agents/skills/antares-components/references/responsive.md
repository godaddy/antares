# Responsive

Read this when a component adapts to its space, the viewport, or input devices. The decisions are in
`docs/pdrs/antares/responsive.md`, and consumer usage is in `components/responsive/README.mdx`.

## Pick the mechanism

Take the first one that works:

1. **Intrinsic CSS.** Wrapping, `minmax()`, `auto-fill`, `flex-wrap`, and `min-inline-size: 0` need no
   threshold.
2. **Container query** when the component adapts to the space it is given.
3. **Media query** for viewport or device conditions, such as an overlay that fills a small viewport,
   `pointer`, or `prefers-reduced-motion`.
4. **`useMediaQuery`** only when behavior changes, not styling. Pass the likely server result as
   `ssrMatch`, and keep state and focus when the result changes after hydration.

## Container queries

- Name the container after the component on its root, `container: alert / inline-size`, and query it by
  name: `@container alert (min-width: 30rem)`. The rules style the root's descendants, never the root.
- Write local thresholds in `rem`, mobile-first.
- The root can't take its width from its content. It needs one from its parent, such as a block element
  or a stretched flex or grid item. Otherwise it collapses to zero.
- Portaled content is outside the container. Give it its own container or use a media query.

## Media queries

Use `viewportBreakpoints` values as literals, mobile-first: base styles first, then
`@media (min-width: 64rem)`. For styles below a breakpoint, use `(width < 64rem)`. A node test in
`components/responsive` fails on any other viewport width in component CSS or examples.

## Props and structure

- Props stay scalar. Don't add per-breakpoint props, and don't switch prop values with `useMediaQuery`.
- Layout props write inline styles, which beat module CSS. If a value changes across a query, set it in
  CSS and leave the prop unset.
- Reflow one DOM tree with CSS instead of rendering different trees, so reading order, focus, and entered
  values survive.

## Tests

- Browser: cover both sides of each threshold, `page.viewport(width - 1)` and `page.viewport(width)`. For
  containers, change the container's width at a fixed viewport.
- Visual: when the look changes, screenshot the example at a mobile viewport (`320px`) and on each side of
  its threshold.
- Check the README's accessibility cases: long text, RTL, text enlargement, and zoom.

## Switching overlay containers

When behavior requires a different overlay (for example, a picker drawer below `40rem`), use
`useOverlayContainer` from `#components/_internal/use-overlay-container`. Pass the effective open state
and keep selection state on the common owner. The hook chooses a container on opening and holds it
through that session and its exit animation. Resizing takes effect on the next opening. It uses the
popover for SSR, and an initially open overlay keeps that container through hydration. Test closed and
initially open hydration, breakpoint crossings, controlled state, focus restoration, and reopening
during exit.

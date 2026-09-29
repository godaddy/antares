# Responsive foundation

Each component owns whether it adapts, what changes, and whether the component or its consumer
controls that behavior. The foundation supplies shared conventions and tools for those decisions.

## Decisions

- Use native CSS for styling: flexible sizing and wrapping first, media queries for viewport or
  device conditions, and named container queries for a section's available space.
- Publish shared, mobile-first viewport widths in `rem` and derive JavaScript queries from them.
  Container thresholds belong to the content of each layout.
- Use `useMediaQuery` for media-dependent React behavior. It observes `matchMedia` through
  `useSyncExternalStore` and requires an explicit server fallback.
- Keep layout props scalar. Each component can address specialized needs, such as measuring a
  chart's container, without expanding the shared API until there is a demonstrated common need.

## Tradeoffs

Native CSS repeats the published breakpoint literals. This avoids requiring a consumer build plugin
or runtime stylesheet generation; examples check that CSS and JavaScript agree at the boundary.

The hook's explicit fallback keeps server rendering and hydration consistent. The browser result
can change content after hydration, so each component must decide how that affects its state and focus.

[Runnable examples and usage notes](../../../packages/@godaddy/antares/components/responsive/README.mdx)
are the source of truth for using the foundation. Components validate their own adaptations.

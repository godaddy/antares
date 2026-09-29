# Responsive foundation

Each component owns whether it adapts and what changes. The foundation supplies shared conventions and
tools for those decisions.

## Decisions

- **CSS first.** Start with flexible sizing and wrapping. Use container queries when a component adapts to
  the space it is given, and media queries only for viewport or device conditions such as pointer type or
  reduced motion.
- **One breakpoint source.** `viewportBreakpoints` holds the shared, mobile-first viewport widths in `rem`,
  and `viewportQueries` derives from it. Design tokens don't carry breakpoints. Container thresholds belong
  to each component.
- **Scalar props.** Props don't take per-breakpoint values. Components adapt in their own CSS, and consumers
  do the same with their own classes.
- **`useMediaQuery` for behavior, not styling.** It observes `matchMedia` through `useSyncExternalStore`
  and requires an explicit server fallback.

## Tradeoffs

- **Container vs. media queries.** Container queries make a component behave the same in a page, a
  sidebar, or a modal. However, a container can't take its width from its content, so it collapses in
  shrink-to-fit layouts, and its queries don't reach portaled content. Media queries have neither limit,
  but they only know the viewport.
- **Breakpoint literals.** Media queries can't read JavaScript or CSS variables, so CSS repeats the
  published widths. A test fails on any viewport width that isn't published. A shared `@custom-media`
  file would remove the literals, but every tool that compiles the CSS would need to support it.
- **Scalar props.** The API stays small, and server output doesn't depend on the viewport. A responsive
  layout needs a class instead of a prop.
- **Hook fallback.** The fallback keeps server rendering and hydration consistent. The browser result can
  change content after hydration, so the component must preserve state and focus.

[Usage notes and examples](../../../packages/@godaddy/antares/components/responsive/README.mdx) cover
consumers, and the [component guidelines](../../../.agents/skills/antares-components/references/responsive.md)
cover implementation.

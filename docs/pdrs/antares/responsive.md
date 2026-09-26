# Responsive foundation

Use native CSS for responsive styling and a small React hook when behavior needs a media query.
Consumers and Antares maintainers use the same conventions and viewport definitions. This first
phase establishes that foundation; component-specific adaptations and charts are outside its scope.

## Viewport breakpoints

| Name | Minimum width | Equivalent at the browser's default 16px font size |
| --- | --- | --- |
| `sm` | `40rem` | 640px |
| `md` | `48rem` | 768px |
| `lg` | `64rem` | 1024px |
| `xl` | `80rem` | 1280px |

Queries are inclusive and mobile-first. Base styles apply at every width; matching queries override
them as space increases. Names describe widths, not device types or component sizes. In media
queries, `rem` uses the browser's initial font size, not an application's `html` font-size override.

Export `viewportBreakpoints`, `viewportQueries`, and `useMediaQuery` from
`@godaddy/antares/Responsive` and the package root. Query strings derive from the breakpoint values:

```tsx
const isLarge = useMediaQuery(viewportQueries.lg, { ssrMatch: false });
```

The hook accepts any valid media-query string, including application-specific widths and device
conditions. It uses `matchMedia` and React's `useSyncExternalStore`, subscribes to match changes,
and cleans up when the query changes or its consumer unmounts. It needs no provider or dependency
beyond React. The required `ssrMatch` value is used on the server and during initial hydration.
After hydration, the actual browser result may change the content. This preserves hydration
consistency, but does not guarantee the correct initial visual layout.

## CSS remains the default

Use intrinsic wrapping and flexible sizing first. Use media queries for viewport-dependent styles
and named container queries for styles that depend on a section's available width. Containers are
explicit DOM boundaries; a portal cannot query a source container outside its DOM ancestry.

CSS authors use the published literal thresholds, for example `@media (min-width: 64rem)` for `lg`.
JavaScript imports the corresponding query string. Native CSS cannot use a custom property as a
media-query threshold, and custom-media aliases are not broadly supported. Repeating literals in
consumer styles is a deliberate tradeoff that avoids requiring a CSS preprocessor or generating
styles during rendering. Antares' examples test that their CSS and exported queries agree.

Container thresholds belong to each layout's content. There is no shared container scale or
container hook in this phase. An application can write its own CSS queries and pass its own media
queries to the hook; this does not rewrite Antares' existing styles.

Keep ordinary spacing, typography, sizing, and visibility in CSS. Reserve the hook for behavior or
React composition that CSS cannot express. Do not infer touch input from viewport width. Components
keep their scalar props and `SizeProvider` keeps its existing scalar sizing and portal inheritance.
When authoring responsive CSS for an existing layout component, leave the corresponding scalar
layout prop unset: an inline property would take precedence over a stylesheet declaration.

## Scope and tradeoffs

There are no responsive prop objects, breakpoint providers, runtime CSS generation, consumer build
plugins, or automatic size changes. This keeps the initial feature small and gives consumers normal
CSS control. Coordinated responsive size scopes and a general styling API can be evaluated later.

[Mantine](https://mantine.dev/styles/responsive/) generates CSS for responsive style props;
[Radix Themes](https://www.radix-ui.com/themes/docs/theme/breakpoints) ships responsive classes for
fixed breakpoints. Both would require a broader styling API here.
[Spectrum v3](https://react-spectrum.adobe.com/v3/Provider.html#breakpoints) resolves responsive
props in React, while [Spectrum 2](https://react-spectrum.adobe.com/styling) and
[Tailwind](https://tailwindcss.com/docs/responsive-design) compile responsive styles using consumer
build tooling. The foundation needs none of those mechanisms.

Verification covers the four viewport boundaries, custom queries, changing queries, cleanup,
StrictMode, unavailable browser APIs, SSR and hydration, and native viewport/container examples.
Component adaptations and their visual coverage remain a separate follow-up to this foundation.

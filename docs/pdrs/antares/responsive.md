# Responsive foundation

Components adapt to the space they are given. The page's layout across viewports belongs to the
application.

## Decisions

- **Components adapt to their space.** Start with intrinsic CSS, such as wrapping, `minmax()`, and
  `flex-wrap`. Use container queries when a component changes with the space it is given, and media
  features such as `pointer`, `hover`, or `prefers-reduced-motion` for device conditions.
- **Viewport widths only in overlays.** Modal and Drawer may fill a small viewport. They share one internal
  threshold and document it in their READMEs, with an example. No other component changes by viewport
  width, and Antares publishes no breakpoints.
- **Applications own page layout.** They write their own media and container queries with their own
  breakpoints. Layout props write inline styles, so a property that changes across a query is set in CSS
  and its prop is left unset.
- **Scalar props.** Props, including `size`, take one value. Antares never switches them by viewport.
- **No media-query hook.** Antares exports no `matchMedia` hook. A component that needs a media feature in
  JavaScript uses an internal one.
- **Typography.** Antares sets no viewport rules for type. Text sizes come from theme tokens, so responsive
  type values are a decision for design tokens and themes.

## Responsive size

Applications drive size from CSS with an inherited variable, `--antares-size`. TextLockup reads it first:

```tsx
<header className="summary">
  <TextLockup>...</TextLockup>
</header>
```

```css
.summary {
  --antares-size: md;
}

@media (min-width: 80rem) {
  .summary {
    --antares-size: xl;
  }
}
```

A TextLockup without `size` sizes its parts from the nearest `--antares-size` on a parent. The values are its sizes, `xs` to `2xl`, and it ignores any other. An explicit `size` wins, and
without the variable the lockup follows the size scope as before. A Tag eyebrow keeps its own size.

The other components follow the same model:

- **Every component with `size` is a scope.** Its `size` sets its own sizing and writes `--antares-size`
  for everything inside it. A TextLockup sized `sm` makes a Button inside it `sm`. Text, Heading, and Label
  read the variable, but their `size` applies only to themselves.
- **The nearest value wins.** The variable sizes everything inside the element it is set on, and an
  explicit `size` on a component beats it. For a responsive size, leave `size` unset and set the variable
  on a parent.
- **Components map values they don't have** to their nearest size. A Button in an `xl` scope is `lg`.
  Components with their own sizes, such as Tag, can opt out and ignore the variable.
- **SizeProvider sizes a region that isn't an Antares component.** It renders a `display: contents`
  element to carry the variable.
- **Overlays** copy their trigger's value when they open.
- **Container style queries** read the variable. Browsers without them keep the sizes set in JSX through
  React context.

The Responsive docs explain the variable once, with a real-world example, and list the components that
follow it. A component that adopts it adds itself to that list and mentions the variable in its `size`
prop, without a responsive example of its own. A follow-up PDR designs the details.

## Tradeoffs

- **Container vs. media queries.** Container queries make a component behave the same in a page, a
  sidebar, or a modal. However, a container can't take its width from its content, so it collapses in
  shrink-to-fit layouts, and its queries don't reach portaled content. Overlays are portaled and sized by
  the viewport, so they keep viewport rules.
- **No published breakpoints.** Antares has no viewport scale to keep stable, and applications aren't
  tied to one. An application that wants to match an overlay's threshold uses the documented value.
- **Scalar props.** The API stays small, and server output doesn't depend on the viewport. A responsive
  layout needs a class instead of a prop.
- **A size variable instead of responsive props.** Props such as `size={{ base: 'sm', lg: 'md' }}` would
  need breakpoints owned by Antares. The variable works with any query the application writes, with no
  JavaScript and no flash after server rendering. It relies on container style queries, available in all
  major browsers since May 2026, so older browsers don't switch. Each component writes its sizes twice,
  as style queries and as the context fallback. Overlays need a step to copy the value, and SizeProvider
  gains an element.
- **Parent, not self.** An element's styles can only query its parent's variable, so a variable set on a
  component sizes its contents but not the component itself. Setting it on a parent keeps both in step.

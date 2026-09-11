# Motion

Read this while creating or changing motion in a component.

Values are local literals in component CSS. There is no motion token and no motion prop, so don't reach for either.

## The ladder

Pick the role, then take its value.

| Role | Recipe | Duration and easing |
| --- | --- | --- |
| `Feedback` | Color, border, opacity, outline | `150ms ease` |
| `Feedback` | Determinate progress and other value updates | `150ms linear` |
| `Surface` | Lightweight anchored surface, tooltip weight | `125ms cubic-bezier(0.23, 1, 0.32, 1)` |
| `Surface` | Popover, overlay, centered modal | `200ms cubic-bezier(0.23, 1, 0.32, 1)` |
| `Spatial` | Short move on `transform`: chevrons, thumbs | `150ms cubic-bezier(0.77, 0, 0.175, 1)` |
| `Spatial` | Measured indicator, where the geometry is the meaning | `200ms cubic-bezier(0.77, 0, 0.175, 1)` |
| `Spatial` | Edge-bound drawer translation, and its overlay | `250ms cubic-bezier(0.32, 0.72, 0, 1)` |
| `Spatial` | `InlineDrawer` in-flow size change, the one exception | `300ms cubic-bezier(0.32, 0.72, 0, 1)` |

`None`, meaning no transition at all, stays the right answer for high frequency, keyboard driven, or purely structural change. One element can hold two roles: the Checkbox indicator is `Feedback` for its fill and `Spatial` for the press scale, each with its own duration and its own reduced-motion branch.

Wanting a value that isn't on the ladder almost always means the role is wrong. `linear` belongs to determinate progress and nowhere else.

## Write the transition

Durations in `ms`, never `s`. Name every property; `transition: all` and `ease-in-out` are both gone from the package. Prefer `transform` and `opacity`, and animate a layout property only when the geometry *is* the meaning, as with a measured indicator or `InlineDrawer`'s size change.

```css
.thumb {
  transition:
    transform 150ms cubic-bezier(0.77, 0, 0.175, 1),
    background-color 150ms ease;
}
```

That thumb used to animate `inset-inline-start`, which lays out every frame; it now translates. See [Physical transforms and RTL](#physical-transforms-and-rtl) for what the swap costs.

## Surfaces

An anchored surface enters offset toward its trigger and slightly small — `8px` at popover weight, `4px` at tooltip weight, always with `scale(0.95)` — then settles outward into its placement. This makes it grow from the trigger rather than move toward it from the far edge. Consumers pass an exact anchor through `--trigger-anchor-point`; without one, fall back to the placement edge nearest the trigger.

```css
.popover:where([data-placement="bottom"]) {
  --_animation-offset: translateY(-8px) scale(0.95);
  transform-origin: var(--trigger-anchor-point, top center);
}
```

`bottom` anchors `top center`, `top` anchors `bottom center`, `right` anchors `left center`, `left` anchors `right center`. `Modal` is the exception: centered, with no trigger to grow from.

## Behavioral ownership

RAC owns state, positioning, focus, keyboard handling, and dismiss. Antares owns only the visual transition on top.

Find out who owns a transform before editing it, and never overwrite RAC's placement transform with an animation one. When a component has a positioning shell and an inner surface, motion goes on the inner surface so positioning stays stable.

## Reduced motion

Reduced motion removes spatial movement. It keeps the end state, and it keeps non-spatial feedback that helps comprehension.

When the element also transitions something worth keeping, narrow `transition-property` and neutralize the animation transform:

```css
@media (prefers-reduced-motion: reduce) {
  .popover {
    transition-property: opacity;
  }

  .popover:where([data-entering], [data-exiting]) {
    transform: none;
  }
}
```

When the spatial transition is the only one, drop it with `transition: none`, as the Select chevron and the Tabs indicator do.

Two things to get right. `transform: none` may only cancel the animation transform Antares added, never one that positions the element, such as the `translateY(-50%)` centering a Carousel control. And judge each element, not each component: the Drawer panel loses its slide while its overlay keeps fading, because a backdrop that appears instantly reads as a bug.

## Hover gating

Gate native `:hover` behind `@media (hover: hover) and (pointer: fine)`, so a tap doesn't leave a touch device in a stuck hover state. RAC's `[data-hovered]` feedback can live outside that query because RAC clears the state without relying on sticky CSS hover behavior.

Never make hover the only path to feedback. Keep pressed, focus-visible, and selected states where they apply so keyboard and touch users do not depend on hover.

## Physical transforms and RTL

`translateX` is physical and does not flip in RTL, so its relationship with logical positioning has to be handled deliberately. For logical movement, as in Switch, anchor with `inset-inline-start` and explicitly reverse the transform in RTL. For physically placed surfaces, such as Drawer, use physical edges so the anchor and transform share the same coordinate system.

Sizing and spacing stay logical. Check RTL whenever you move something.

## Interruptibility

Motion retargets from wherever the element currently is, so open, close, open and A, B, A all land with the latest action winning. Never add a delay or a queue that finishes an old state before honoring a new one. Exit mirrors entry at the same duration.

Keyboard response, focus, and activation are immediate. While a surface exits, focus restoration, Escape, and outside dismiss keep working, and a hidden control leaves the tab order at once instead of staying tabbable until the fade ends. Under forced colors, motion may change transform and opacity, but it must not flatten contrast or hide the active affordance.

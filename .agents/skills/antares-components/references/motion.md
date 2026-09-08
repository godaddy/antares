# Motion

Read this when creating or changing motion in an Antares component.

## Decide whether motion is justified

Motion should clarify feedback, state, or spatial relationships. It should not decorate a control just because there is room for it.

Use this flow:

1. `None`, for high frequency, keyboard driven, or purely structural changes. Keep it instant.
2. `Feedback`, for frequent state changes such as color, opacity, or small emphasis shifts.
3. `Surface`, for occasional anchored surfaces and centered modals that need to feel placed.
4. `Spatial`, for movement that explains where something came from, where it is going, or how far it moved.

If the answer is unclear, pick the simplest role that still helps the user understand change. If that role is `None`, stop there.

## Component local recipes

Use these values as the default ladder. Keep the motion local to the component unless the same semantic role repeats enough to justify a token later.

| Recipe | Use for | Default |
| --- | --- | --- |
| Lightweight anchored surface | Tooltip-like anchored surfaces and other rare, compact overlays | `125ms cubic-bezier(0.23, 1, 0.32, 1)` |
| Frequent feedback | Color, opacity, and other common state changes | `150ms ease` |
| Small spatial move | Chevrons, thumbs, and other short motion that stays on `transform` and `opacity` | `150ms cubic-bezier(0.77, 0, 0.175, 1)` |
| Determinate progress | Stroke or value updates that should read as steady progress | `150ms linear` |
| Surface entry and exit | Popovers, overlays, and centered modals | `200ms cubic-bezier(0.23, 1, 0.32, 1)` |
| Measured indicators | Motion whose geometry is part of the component's meaning | `200ms cubic-bezier(0.77, 0, 0.175, 1)` |
| Drawer-like motion | Edge-bound spatial translation | `250ms cubic-bezier(0.32, 0.72, 0, 1)` |
| InlineDrawer exception | In-flow size change where the size change is the point | `300ms` |

Keep the motion short. If a role wants to exceed these values, that usually means the role is wrong.

## Property rules

Use exact-property transitions. Do not write `transition: all`.

Prefer `transform` and `opacity` first. Use layout properties only when the component's meaning depends on the geometry change, such as measured indicators or `InlineDrawer`'s in-flow size change.

```css
.surface {
  transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms ease;
}

.surface:where([data-entering], [data-exiting]) {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}

.surface:where([data-hovered]) {
  opacity: 1;
}

.drawer:where([data-entering], [data-exiting]) {
  transform: translate3d(0, 0, 0);
}
```

Avoid these patterns:

- `transition: all 200ms ease;`
- `ease-in` on UI motion.
- `scale(0)` entrances.
- Layout motion for ordinary feedback when a transform would work.

## Behavioral ownership

RAC owns state, positioning, focus, keyboard handling, and dismiss behavior. Antares owns the visual transition layered on top of that behavior.

Check where the transform is owned before you edit it:

- If RAC owns the placement transform, do not replace it.
- If Antares adds an inner surface transform, keep it on the inner surface, not on the positioning shell.
- If a component has both a root and an inner surface, place visual motion on the inner surface so positioning remains stable.

For anchored surfaces, use the exact anchor origin if RAC exposes one. If it does not, fall back to the placement edge that best matches the anchor. `Modal` is the exception, because it stays centered.

## Interruptibility and exit

Motion must be interruptible. Use transitions or state-driven CSS that retargets from the current state.

Design for cases like open, close, open and A, then B, then A again. The latest action wins.

Do not add fixed delays or queued behavior that makes the interface wait for an older state to finish before honoring the new one.

Exit motion should feel like the reverse of entry, but not as a perfect mirror if that makes the interaction feel stiff. Keep the exit short and clear.

## Reduced motion matrix

Use reduced motion to remove spatial animation, not the useful end state.

| Role | Reduced motion behavior |
| --- | --- |
| `None` | No change |
| `Feedback` | Keep color or opacity feedback when it helps comprehension |
| `Surface` | Apply the final visual state immediately, or keep only the smallest opacity hint if it helps orientation |
| `Spatial` | Remove the Antares-owned animation transform and apply the final visual state immediately; do not remove required positioning transforms that come from RAC or layout |

The phrase `transform: none` only applies to the animation transform Antares owns. It must never remove a required positioning transform.

## Hover gating and RAC hover state

Hover motion belongs behind `@media (hover: hover) and (pointer: fine)`.

RAC's `[data-hovered]` state is only useful on hover-capable pointers. Do not build hover motion that depends on it for keyboard users or touch users.

## Accessibility and direction

Keep keyboard response, focus, and activation immediate. Motion must not delay those actions.

Preserve focus restoration, Escape handling, and outside dismiss behavior while motion runs.

Remove hidden controls from the tab order immediately. Do not leave them tabbable while an exit animation plays.

Respect RTL. Use physical motion only when the component is describing physical space. Logical layout should still read correctly in both directions.

Preserve forced-colors behavior. Motion can change opacity or transform, but it should not break contrast or hide the active affordance.

## Test matrix

Add or update browser tests for the public examples that exercise the motion.

Test the computed behavior, not private CSS imports or string snapshots of style source.

Cover:

- Entry and exit motion.
- Reversal, such as open, close, open.
- Reduced motion.
- Keyboard interaction.
- Focus restoration.
- RTL.
- Forced colors.
- Pointer hover gating.
- Hidden tab order removal.
- `animate=false` or the equivalent no-motion path, when the component has one.

Avoid fixed sleeps. Assert the state that matters after the interaction settles.

Use visual tests when the look itself is worth locking, such as a surface whose origin, reversal, or exit shape is part of the component's value.

## Examples

### Frequent control

A high-frequency control such as `Button` keeps its color feedback at `150ms ease` and adds no
spatial motion. `None` means no transform, scale, or movement; it does not mean color feedback
has to snap.

### Anchored overlay

Use `Surface` for a tooltip or popover. The entry should come from the trigger or the closest placement edge, not from the center unless the component is a centered `Modal`.

### Drawer

Use `Spatial` for an edge-bound drawer. Keep the movement on `transform` and respect the `250ms` recipe. Use the `300ms` in-flow exception only for `InlineDrawer`.

### Deliberate no-motion

Use `None` when the control is keyboard driven, high frequency, or already clear without animation. If motion would only add noise, leave it out.

## Future token adoption

Keep local literal timing and easing values today. That keeps the component shippable and easy to reason about.

If a semantic role repeats across multiple components, promote the role to `@godaddy/design-tokens` later. Let the token describe the reusable intent, not one component's implementation detail.

Do not create a component named token for every surface. That turns a shared vocabulary into a catalog and makes future changes harder.

When tokens arrive, keep component policy local. Things like transform distance, anchor origin, interruption behavior, and reduced motion branching stay in component code.

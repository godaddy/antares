---
name: antares-patterns
description: 'Use when designing stateful Antares collections or overlays: headless hook contracts, controlled selection, RAC contexts and slots, collection identity, trigger ownership, or public composition checks. Pair with antares-components for component structure, styling, docs, and tests.'
---

# Stateful Antares composition

Use [antares-components](../antares-components/SKILL.md) for file layout, imports, exports, and checks. Its [composition guide](../antares-components/references/composition.md) owns region defaults and overlay prop destinations. This skill covers ownership of state and RAC behavior.

## Headless state

1. Export the state-creating hook, its options interface, and its state interface through the component barrel and area export. The hook owns collection identity, selection, derived capabilities, and transitions. The overlay owns opening and dismissal; the app owns validation and submission. Export a state context for custom controls: `useContext(StateContext)` reads the *existing* state, while calling the hook creates another owner.
2. Use stable RAC `Key` values and keep a controlled value authoritative. A transition reports its destination, previous value, and reason; the app updates the controlled prop to accept it. For uncontrolled selection, update local state. Derive positions and boundary capabilities from the current ordered collection and active key. Transition methods check availability and return at boundaries. Reconcile keyed insertion, removal, reordering, and an empty collection without reporting a user navigation request.

## RAC contexts and slots

Publish state and component defaults through RAC `Provider`. State contexts carry navigation behavior; props contexts such as `FooterContext` carry presentation. Generic regions consume only their props context. `useContextProps(props, ref, Context)` merges context defaults with explicitly authored props and refs. Region precedence is component defaults < parent context < consumer props; see `components/structure/src/footer.tsx`. RAC merges event callbacks rather than treating a local handler as cancellation: `mergeProps` from `react-aria` composes inherited and supplied handlers. Use controlled state when the app must decide whether to accept a requested navigation.

When republishing `ButtonContext`, carry forward inherited slots, especially the dialog's `close` slot. Add named slots for actions and `[DEFAULT_SLOT]: {}` for unslotted children. A descendant with `slot={null}` opts out. Put capabilities such as `isDisabled` on the named slot and use `mergeProps` to combine action callbacks; see `components/number-field/src/index.tsx`. An explicit `Button slot="close"` or `CloseButton` uses RAC dialog closure.

## Collections and overlays

Build ordered collection keys and labels through RAC `Collection` and `CollectionBuilder`. Expose static item children and `items` with a render function; use `createLeafComponent` for collection items. A branch node can mark the presence of an empty collection. The builder shallow-renders its `content`; give it the collection's children rather than surrounding consumer regions, whose mount effects belong to the visible tree. When siblings need the same keys, publish one collection snapshot through a parent context and render the layout in its authored order. `components/listbox/src/index.tsx` shows collection props and items.

Compose RAC `DialogTrigger` with an Antares `Button` and the overlay. RAC manages opening, trigger press, modal focus, dismissal, and restoration. `components/modal/src/index.tsx` shows the trigger and modal layers. Keep navigation state independent of overlay state. Use the [component testing guide](../antares-components/references/testing.md) to exercise consumer-facing examples through public exports, including controlled requests, collection updates, named slots, and focus where applicable.

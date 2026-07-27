# Composition and Customization PDR

Status: **Proposed**

## Table of Contents

- [Problem](#problem)
- [Current State](#current-state)
- [How React Aria Customization Actually Works](#how-react-aria-customization-actually-works)
- [Decision: Progressive Disclosure](#decision-progressive-disclosure)
  - [Relationship to RAC's Customization Guide](#relationship-to-racs-customization-guide)
  - [Layer 1: Batteries-Included Defaults](#layer-1-batteries-included-defaults)
  - [Layer 2: Tweak a Part (`slotProps`)](#layer-2-tweak-a-part-slotprops)
  - [Layer 3: Restructure (Compound Subcomponents)](#layer-3-restructure-compound-subcomponents)
- [Composition: Content vs Chrome](#composition-content-vs-chrome)
- [Rules](#rules)
- [Scenario Matrix](#scenario-matrix)
- [Alternatives Considered](#alternatives-considered)
- [Non-Goals](#non-goals)
- [Follow-up](#follow-up)
- [Implementation and Usage Examples](#implementation-and-usage-examples)
- [References](#references)

---

## Problem

We have no single, documented rule for how consumers compose Antares components or customize their internal parts. The motivating case: the [Modal](../../../packages/@godaddy/antares/components/modal/) renders an internal "X" close button. A consumer may need to add an `aria-label`, attach a `data-track` event, or restyle it, but we have never decided or documented how they should do that.

Today the answer depends on which component you happen to be using, because our approach is inconsistent and undocumented. This PDR picks a single pattern and the rules that keep it consistent as the library grows. It is a sibling to the [Internal vs Public API PDR](./internal-vs-public-api.md), which governs what is exposed; this one governs how what is exposed gets customized.

## Current State

We wrap React Aria Components (RAC) internally, and two different customization styles have emerged organically, none of them documented:

| Style | Components | How customization works |
| ----- | ---------- | ----------------------- |
| Config-driven + flat escape hatches | `Modal`, `Drawer`, `Carousel`, `Popover`, `Pagination` | Content via props (`title`, `description`); internal parts tweaked via flat `xxxProps` (`titleProps`, `closeProps`, `overlayProps`, `nextButtonProps`, ...) |
| Compound / composable | `Menu`, `Select` | Consumer assembles from exported subcomponents (`MenuItem`, `SelectItem`, ...) |

The `Modal` already demonstrates the whole spread on its own: it is config-driven, it exposes seven flat `xxxProps` escape hatches, and its close button is wired with RAC's `slot="close"`:

```tsx
// packages/@godaddy/antares/components/modal/src/index.tsx (today)
<Button aria-label="Close" slot="close" {...closeProps} className={cx(styles.close, closeProps?.className)}>
  <Icon icon="x" />
</Button>
```

**What is not working:**

- No rule for whether a component should be config-driven or compound.
- No rule for how to tweak an internal part, so the flat `xxxProps` set grows ad hoc and differs per component.
- RAC's own customization surface (contexts, `slot=`) leaks through inconsistently; individual usages are documented, but there is no library-wide contract consumers can rely on.
- Handler merging is done inconsistently and sometimes incorrectly (see [mergeProps](#rules)).

## How React Aria Customization Actually Works

RAC customization is **context-based**, and understanding its shape is what drives the decision. Three points matter:

1. **`slot` is a selector, not a payload.** `slot="close"` is a string attribute that tells a component *which named entry of a context to consume*. It carries no behavior or styling by itself; what it delivers is whatever some ancestor provider placed under that name. For the close button, RAC's `Dialog` provides the close **behavior** (an `onPress` that closes the dialog), while Antares or consumers must provide the accessible label itself. A provider can just as well put `className` or handlers under a slot, so slots are not limited to behavior.

2. **Slots are built for the inverted ownership model.** RAC's slot/context system is designed for *the wrapper provides the context, the consumer provides the children*. Antares is the opposite: **Antares owns the internal element** (the close button lives inside `Modal`), and the consumer wants to reach in. RAC slots cleanly wire *behavior* into an Antares-owned element, but they do **not** cleanly let a consumer tweak or replace an element that Antares already owns, because:
   - Context reads take the **nearest** provider. If Antares provides a context for its own part, a consumer's outer provider is shadowed. RAC does not auto-merge across nested providers of the same context.
   - RAC deliberately clears slot context in places so nested same-type components do not inherit slot props, which makes deep targeting unreliable.

3. **No TypeScript support.** RAC slot names are strings with no autocomplete or type checking. Deeply nested internal slot names are undocumented implementation details.

The practical consequence: RAC slots are excellent for **shallow, behavior-wired, single-purpose internals** (the `close` button), and for the **consumer-provides-children** model (collection items such as select options). They are the wrong tool for "here is my default element, let the consumer tweak it," which is exactly the Modal-close-button ask.

## Decision: Progressive Disclosure

We adopt **progressive disclosure**, which is RAC's own stated philosophy ("start with the component API, drop to hooks only when you need to"). This is a single coherent pattern with three layers, not a menu of competing approaches. A consumer escalates only as far as their need requires.

| Layer | Need | Mechanism |
| ----- | ---- | --------- |
| **1. Default** | "Give me a correct modal" | Batteries-included component; Antares owns the chrome |
| **2. Tweak a part** | "Add `aria-label` / `data-track` / `className` to the close button" | Typed `slotProps={{ close: {...} }}`, merged via `mergeProps` |
| **3. Restructure** | "Replace or reorder internals" | Compose Antares subcomponents (`<ModalHeader>`, `<ModalCloseButton>`, ...) |

The decision rule is by **intent**: tweak an exposed part goes to Layer 2; fundamentally restructure goes to Layer 3.

Because we are a design system, not a primitives library, even Layer 3 stays **within Antares components**: consumers restructure by composing our own subcomponents, never by dropping to raw RAC primitives, which would discard our styling and wiring.

### Relationship to RAC's Customization Guide

[RAC's customization guide](https://react-aria.adobe.com/customization) is the reference for customizing React Aria components, and this PDR **adopts it directly for most of what we do** - it is not being set aside. RAC's mechanisms (contexts, slots, render props, composition) are written for whoever *assembles* the primitives into a component. In this stack, that assembler is Antares itself, and we already use those mechanisms internally.

The gap appears one layer removed. RAC's model assumes the party customizing a component is the same party composing it. Antares' consumers are not: they customize components whose internal structure Antares owns and has closed. RAC's context/slot mechanism does not cleanly reach into an element another layer owns - nearest-provider shadowing, plus no types (see above). So the fit is by layer:

- **Layer 1** (build a correct component) - RAC composition, performed by Antares. RAC-native.
- **Layer 2** (consumer tweaks a part) - the one case RAC's model does not serve our consumers. We fill it with a typed `slotProps` object borrowed from [MUI](https://mui.com/material-ui/customization/how-to-customize/#the-slotprops-prop), which exists for precisely this "forward props to an internal part" need.
- **Layer 3** (consumer restructures) - RAC-idiomatic composition, surfaced through Antares subcomponents. RAC-aligned.

In short: RAC covers two of the three layers; `slotProps` is a thin, typed complement for the third - RAC where it fits, MUI's pattern where RAC leaves a gap.

### Layer 1: Batteries-Included Defaults

The common case (roughly 90%) is served by a single component with sensible defaults. Antares owns the structure, styling, accessibility wiring, and the chrome (close button, title, layout).

```tsx
<Modal title="Delete file?" description="This cannot be undone." actions={<Button>Delete</Button>} />
```

### Layer 2: Tweak a Part (`slotProps`)

For customizing an Antares-owned part without restructuring, expose a single grouped, typed `slotProps` object keyed by part name.

```tsx
<Modal
  title="Delete file?"
  slotProps={{
    close: { 'aria-label': 'Close dialog', 'data-track': 'modal-close' },
    title: { className: 'custom-title' },
  }}
/>
```

**Why `slotProps` and not `slots`.** The name deliberately avoids `slots`, because RAC already defines a `slot=` string attribute (used to wire parts like the close button, and pervasive in RAC docs). A custom `slots={{ close }}` prop sitting next to RAC's `slot=` convention is actively confusing, since they are almost opposite mechanisms (one forwards props to an Antares-owned element, the other selects a context entry for a consumer-owned element). `slotProps` is also established prior art: [MUI uses `slotProps`](https://mui.com/material-ui/customization/how-to-customize/#the-slotprops-prop) for exactly this "forward props to an internal slot" purpose.

**Why grouped and not flat `xxxProps`.** Flat props (`titleProps`, `closeProps`, `overlayProps`, ...) pollute the top-level prop namespace and scale poorly. Modal already carries seven of them. Grouping keeps the public API small and namespaced as the part list grows.

### Layer 3: Restructure (Compound Subcomponents)

When a consumer needs to replace or reorder internals, they compose the component from Antares' own subcomponents. Each subcomponent keeps Antares styling and wiring (for example, `ModalCloseButton` still encapsulates the dialog-close behavior internally, so the consumer never touches RAC's `slot=` plumbing). The consumer controls the structure; Antares still owns the correctness of each piece.

> **Illustrative only.** Modal is not built this way today, and this PDR does not propose rebuilding it. The shape below simply shows how Layer 3 *would* look if a component exposed compound subcomponents. `Select` already works this way for its collection content; a compound Modal would be built only if real demand appears.

```tsx
// Illustrative — how a compound Modal would look; Modal is not built this way today
<Modal>
  <ModalHeader>
    <ModalTitle>Delete file?</ModalTitle>
    <ModalCloseButton aria-label="Close" data-track="modal-close" />
  </ModalHeader>
  <ModalBody>This cannot be undone.</ModalBody>
  <ModalActions>
    <Button variant="critical">Delete</Button>
  </ModalActions>
</Modal>
```

**Trade-off.** Layer 3 gives full structural control, but the consumer must **assemble the structure correctly** - the right pieces, in the right order - or the layout and behavior degrade. Layer 1 guarantees a correct modal; Layer 3 trades that guarantee for control. This is the deliberate cost of composition, and the reason Layer 1 stays the default. If consumers reach for Layer 3 often for a given component, that is the signal to invest in its compound API (see [Follow-up](#follow-up)).

## Composition: Content vs Chrome

A natural dividing line decides whether a part is composed or configured:

- **Consumer-provided content** (collection items, select options, tabs) is inherently the consumer's data. It goes through **composition / children** (Layer 3 style), because the consumer owns it anyway. This is the idiomatic path for collection content, and `Select` already works this way with `SelectItem`.
- **Antares-owned chrome** (close button, modal title, header) is ours. It goes through **config props + `slotProps`** (Layers 1 and 2), with structural override available via Layer 3.

**Populating a compound collection.** Today, collection content is provided as React node children (`<Select><SelectItem/></Select>`); components narrow `children` to `ReactNode`. RAC also supports a data-driven `items` + render-function form (which enables virtualization for large lists), but Antares does not surface it yet, and no current need requires it. If a data-driven or virtualized case appears, exposing `items` is a natural, RAC-backed extension - out of scope for this PDR.

## Rules

These are the invariants every component must follow so the pattern stays consistent.

1. **Curated exposure.** Only parts with a legitimate customization need get a `slotProps` key. Internal layout wrappers stay private. **Exposure is a one-way door**: every exposed part becomes public API, so the more internal layout you expose, the less you can refactor without a breaking change. Less is more.

2. **Name alignment.** A part uses one name across the whole API: the `slotProps` key, the compound subcomponent, and the underlying RAC slot where applicable all agree (`slotProps.close` <-> `ModalCloseButton` <-> internal `slot="close"`). One vocabulary across Layers 2 and 3.

3. **Merge with `mergeProps`.** `slotProps` are merged into the part with RAC's `mergeProps`. This is the RAC-native primitive and it fixes a footgun in earlier drafts:

   ```tsx
   // Wrong: a consumer onPress replaces Antares' close behavior, breaking the modal.
   onPress={slotProps.close?.onPress ?? onClose}

   // Right: handlers chain (both run), className concatenates, consumer wins on scalar props.
   {...mergeProps({ onPress: onClose, className: styles.close }, slotProps?.close)}
   ```

   Handlers **chain** by default, so consumer props never *silently* clobber Antares behavior; className **concatenates**; scalar props (`aria-label`, `data-*`, `id`) let the **consumer win**. Letting a consumer *override* (rather than augment) a behavior-bearing prop is a **per-component decision** - a component may deliberately expose a specific prop as overridable where it makes sense, but merge, not replace, is the default.

4. **Replacement is opt-in or Layer 3.** Because `mergeProps` chains rather than replaces, a consumer who needs to *replace* a handler (for example, prevent the default close) either uses a prop the component has deliberately made overridable, or drops to Layer 3 composition. We do not make replacement the global default.

## Scenario Matrix

Concrete guidance per real need, using the Modal close button as the running example.

| Scenario | Layer | How |
| -------- | ----- | --- |
| Add `aria-label` to the close button | 2 | `slotProps={{ close: { 'aria-label': 'Close dialog' } }}` |
| Add `data-track` for analytics | 2 | `slotProps={{ close: { 'data-track': 'modal-close' } }}` |
| Restyle the close button | 2 | `slotProps={{ close: { className: 'my-close' } }}` (concatenated with Antares styles) |
| Run extra logic on close (still close) | 2 | `slotProps={{ close: { onPress: track } }}` (chained after Antares' close via `mergeProps`) |
| Add a second "Cancel" button that also closes | 3 | Add a `<ModalCloseButton>Cancel</ModalCloseButton>` in `ModalActions` |
| Replace the close button entirely | 3 | Compose the subcomponents; provide your own trigger in place of `ModalCloseButton` |
| Prevent the default close on click | 3 | Compose; use your own button with custom logic instead of `ModalCloseButton` (`slotProps` cannot replace the handler) |
| Reorder header / body / actions | 3 | Compose `ModalHeader` / `ModalBody` / `ModalActions` in the desired order |

> Layer 3 rows use the illustrative compound Modal to show how restructuring would look; Modal is not built this way today.

## Alternatives Considered

- **RAC's customization model for all three layers.** Adopted for Layers 1 and 3, which are genuinely RAC-idiomatic - this is not a wholesale rejection of RAC. Only Layer 2 (tweak an Antares-owned part) is out of reach: applying RAC there would force consumers to re-assemble components from primitives for a one-line change, and inherits RAC's no-types limitation and context shadowing. `slotProps` fills that single gap.
- **Raw RAC primitives as the Layer 3 escape hatch.** Rejected. Dropping consumers to `react-aria-components` for restructuring discards Antares styling and wiring. Layer 3 composes our own subcomponents instead, so restructured components stay on-brand and correctly wired.
- **Expose every internal element via `slotProps`.** Rejected. Turns internal layout into public API and freezes our ability to refactor. Curated exposure only.
- **Name the grouped prop `slots`.** Rejected. Collides head-on with RAC's `slot=` convention and would sit in the same guide as an almost-opposite mechanism. Use `slotProps`.
- **Flat `xxxProps` (status quo).** Rejected as the standard. Pollutes the top-level namespace and scales poorly. Existing flat props migrate to grouped `slotProps`.
- **Replacement as the default `slotProps` merge behavior.** Rejected. A global replace lets consumers silently break Antares behavior. Merge via `mergeProps` is the default; a component may opt specific props into override deliberately, and broad restructuring is a Layer 3 case.

## Non-Goals

- **Automatic deep targeting.** `slotProps` reaches the parts a component chooses to expose. Reaching a part *inside* a nested Antares subcomponent is achievable at the implementation level - a component can forward a nested `slotProps` down to a child that also accepts `slotProps` - but that is a deliberate, per-component wiring choice, not an automatic guarantee. What we explicitly do **not** rely on is deep targeting via RAC **slot strings**: RAC's context-clearing and nearest-provider shadowing make that unreliable regardless of how we wire things. In short: nested `slotProps` forwarding is doable when a component opts into it; deep RAC-slot targeting is off the table.

## Follow-up

- Implement `slotProps` on `Modal` as the Layer 2 reference implementation, migrating its flat `xxxProps` (`titleProps`, `closeProps`, ...) into a grouped, typed `slotProps` object merged with `mergeProps`. Migrate any other components that require Layer 2 behavior as well.
- Introduce compound subcomponent APIs reactively, only for components where consumers repeatedly need to restructure the component (Layer 3). The compound `Modal` shown in Layer 3 is illustrative, not a committed deliverable. Its subcomponent names would be finalized if and when it is built. Identify and revise any components that may require migration to compound behavior (Layer 3).
- Promote Layers 1 through 3 and the scenario matrix to a public "Customization" section on the docs site.
- Update the `@godaddy/antares` component recipe / `AGENTS.md` with the `slotProps`, curated exposure, name alignment, and `mergeProps` rules.

## Implementation and Usage Examples

Worked examples using `Modal` as the model. These show the pattern end to end; earlier sections link here for concrete code.

### Implementation (component author)

Curate the exposed parts, type them, and merge each with `mergeProps`. `slot="close"` still pulls the close behavior from RAC's `Dialog`; `mergeProps` chains any consumer handler after it and concatenates `className`.

```tsx
import type { ReactNode } from 'react';
import { mergeProps } from 'react-aria';
import { Dialog as RACDialog, type DialogProps as RACDialogProps } from 'react-aria-components';
import { Text, type TextProps } from '#components/text';
import { Button, type ButtonProps } from '#components/button';
import { Icon } from '#components/icon';
import styles from './index.module.css';

/** Curated set of customizable parts. Internal layout wrappers stay private. */
interface ModalSlotProps {
  close?: ButtonProps;
  title?: TextProps;
  description?: TextProps;
}

interface ModalProps extends RACDialogProps {
  title?: ReactNode;
  description?: ReactNode;
  slotProps?: ModalSlotProps;
}

function Modal({ title, description, slotProps, ...rest }: ModalProps) {
  return (
    <RACDialog {...rest}>
      {title ? (
        <Text as="h2" {...mergeProps({ className: styles.title }, slotProps?.title)}>
          {title}
        </Text>
      ) : null}

      {description ? (
        <Text as="p" {...mergeProps({ className: styles.description }, slotProps?.description)}>
          {description}
        </Text>
      ) : null}

      <Button
        aria-label="Close"
        slot="close"
        {...mergeProps({ className: styles.close }, slotProps?.close)}
      >
        <Icon icon="x" />
      </Button>
    </RACDialog>
  );
}
```

### Usage (consumer)

**Layer 1 - default.** Correct modal, no customization.

```tsx
<Modal title="Delete file?" description="This cannot be undone." />
```

**Layer 2 - tweak a part.** Add accessibility and analytics attributes to the close button and augment its behavior. The `onPress` runs *in addition to* the built-in close (handlers chain via `mergeProps`); the modal still closes.

```tsx
<Modal
  title="Delete file?"
  slotProps={{
    close: {
      'aria-label': 'Close dialog',
      'data-track': 'modal-close',
      onPress: () => log('modal-dismissed'),
    },
  }}
/>
```

**Layer 3 - restructure (illustrative).** Compose subcomponents when the fixed structure is not enough. Modal is not built this way today.

```tsx
// Illustrative — how a compound Modal would look
<Modal>
  <ModalHeader>
    <ModalTitle>Delete file?</ModalTitle>
    <ModalCloseButton
      aria-label="Close dialog"
      data-track="modal-close"
      onPress={() => log('modal-dismissed')}
    />
  </ModalHeader>
  <ModalBody>This cannot be undone.</ModalBody>
  <ModalActions>
    <Button variant="critical">Delete</Button>
  </ModalActions>
</Modal>
```

### Why not RAC-only or `slot=`?

Two concrete illustrations of why Layer 2 is a custom `slotProps` object rather than a RAC-native mechanism.

**RAC-only composition for a one-attribute tweak.** To add `data-track` to the close button with RAC alone, the consumer must rebuild the modal from primitives and reimplement everything Antares provides:

```tsx
import { ModalOverlay, Modal as RACModal, Dialog, Heading, Button } from 'react-aria-components';

// The consumer now owns overlay, layout, spacing, styling, and a11y wiring — none of Antares'.
<ModalOverlay>
  <RACModal>
    <Dialog>
      <Heading slot="title">Delete file?</Heading>
      <Button slot="close" data-track="modal-close">✕</Button>
    </Dialog>
  </RACModal>
</ModalOverlay>
```

Compare the Antares Layer 2 equivalent - `slotProps={{ close: { 'data-track': 'modal-close' } }}`. A one-line tweak should not cost the entire component.

**Injecting props through RAC context (`slot=`).** The consumer might try to reach Modal's close button via `ButtonContext`:

```tsx
import { ButtonContext } from 'react-aria-components';

<ButtonContext.Provider value={{ slots: { close: { 'data-track': 'modal-close' } } }}>
  <Modal title="Delete file?" />
</ButtonContext.Provider>
```

This is not viable:

- **Shadowing.** Modal's own `Dialog` provides the `close` slot value (the close behavior). The nearest provider wins and RAC does not merge across providers, so the consumer's outer value is overridden and the `data-track` never lands.
- **Untyped slot names.** Context props are type checked, but slot keys are unconstrained strings. There is no autocomplete or compile-time validation, and typos are only reported at runtime.
- **Leaky coupling.** It forces the consumer to import RAC internals and know the undocumented `"close"` slot name - exactly the "cannot rely on it" gap called out in [Current State](#current-state).

## References

- [React Aria: Customization](https://react-aria.adobe.com/customization)
- [Internal vs Public API PDR](./internal-vs-public-api.md)
- [MUI: the `slotProps` prop](https://mui.com/material-ui/customization/how-to-customize/#the-slotprops-prop)
- Task: `.tasks/2026-07-25-antares-composition-customization/`

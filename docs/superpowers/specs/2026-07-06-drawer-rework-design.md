# Drawer rework — design

**Date:** 2026-07-06
**Component:** `packages/@godaddy/antares/components/drawer`
**Status:** Approved (pending spec review)

## Goal

Simplify the `Drawer` into a placement-aware overlay panel that mirrors the
`Modal` component's construction: a RAC modal overlay + an `elevation="overlay"`
panel + pure CSS transitions. Remove Framer Motion and the entire snap-point
system.

## Motivation

The current Drawer is built on RAC `ModalOverlay`/`Modal`/`Dialog` **plus
Framer Motion** for spring slide animations. Because FM springs are JS-based and
invisible to RAC's WAAPI-based exit detection, the component carries a large
amount of incidental complexity:

- an `isExiting` state machine with `deferredCloseRef` and trigger-state
  detection to hold the overlay mounted while the FM exit spring plays;
- a sentinel-`<span>` callback-ref hack to measure the drawer element through
  the `motion.create` → RAC portal boundary;
- a 327-line `use-snap-points.tsx` hook implementing px/% snap points, FM drag
  with velocity-based snapping, drag constraints, and a visually-hidden
  `role="slider"` for keyboard resizing;
- a hand-copied `--sh-overlay` / `--bg-overlay` on the panel instead of the
  design-system `elevation="overlay"` tokens.

The sibling `Modal` achieves slide/fade enter+exit with **CSS transitions only**
(`[data-entering]` / `[data-exiting]`), which RAC detects natively — no state
machine. Adopting that pattern removes all of the above.

## Scope

Contained entirely to `components/drawer/` plus `exports/Drawer.ts` and a
`package.json` dependency removal.

**Out of scope / untouched:**

- `components/inline-drawer/` — a separate component that shares no code with
  `Drawer` (verified: nothing outside `components/drawer/` imports the snap
  hook, `DrawerHandle`, or `DrawerSnapPoint`).
- **Drag-to-dismiss and the pill handle** — deferred to a later effort (see
  "Deferred" below). No pointer JS and no handle element ship in this rework.

## Approach

Chosen: **pure CSS transitions + no Framer Motion** (rejected alternatives:
hybrid CSS-enter/FM-drag, and FM-everywhere-minus-snap-points — both retain a
heavy dependency and/or the exit workarounds).

## Public API

### Placements

`placement: 'top' | 'bottom' | 'left' | 'right'` (required). `left`/`right`
flip in RTL (existing `resolvePlacement` behavior is preserved).

### Kept props

- `isOpen`, `defaultOpen`, `onOpenChange` (RAC `ModalOverlay`)
- `isDismissable`, `isKeyboardDismissDisabled`, `shouldCloseOnInteractOutside`
- `aria-label` — accessible label when `title` is omitted
- `title?: ReactNode` — rendered as a `slot="title"` heading
- `showCloseButton?: boolean` — **default unchanged:** `true` for `top`/`bottom`,
  `false` for `left`/`right`
- `closeLabel?: string` — default `'Close'`
- `maxSize?: number | string` — max size along the constrained axis. Defaults:
  `min(80vw, 400px)` for `left`/`right`, `calc(100dvh - 80px)` for `top`/`bottom`
  (note: `100dvh`, not `100vh`, for correct mobile viewport behavior — matches
  Modal)
- `id?: string`, `className?: string`, `children?: ReactNode`

### Removed props / exports (breaking — approved)

- `snapPoints`, `activeSnapPoint`, `defaultActiveSnapPoint`, `onSnapPointChange`,
  `snapLabels`, `snapSliderLabel`
- `animate` — replaced by honoring `prefers-reduced-motion` (approved)
- `DrawerHandle`, `DrawerHandleProps` (component + type)
- `DrawerSnapPoint` (type)

### Exports after rework (`exports/Drawer.ts`)

```ts
export {
  Drawer,
  DrawerTrigger,
  type DrawerProps,
  type DrawerTriggerProps,
  type DrawerPlacement
} from '#components/drawer';
```

## Structure

Mirrors `Modal`'s composition:

```tsx
<Flex as={RACModalOverlay} className={cx(styles.overlay, …)}>
  <Flex as={RACModal}
        elevation="overlay"
        data-placement={resolved}
        style={/* --_max-size */}
        className={cx(styles.drawer, …)}>
    <RACDialog id={id} aria-label={ariaLabel} className={cx(styles.dialog, className)}>
      {showCloseButton && (
        <Button slot="close" aria-label={closeLabel} className={styles.close}>
          <Icon icon="x" />
        </Button>
      )}
      {title && <RACHeading slot="title" className={styles.title}>{title}</RACHeading>}
      {children}
    </RACDialog>
  </Flex>
</Flex>
```

- The panel uses `elevation="overlay"` (real design tokens) instead of a
  hand-copied shadow/background.
- `DrawerTrigger` remains a thin wrapper over `RACDialogTrigger` (unchanged).

## Animation (CSS only)

- **Panel slide:** `transform` on `.drawer[data-placement=…]`, transitioning on
  RAC's `[data-entering]` / `[data-exiting]` attributes. Per placement, the
  entering/exiting transform is the off-screen position and the resting state is
  `translate…(0)`:
  - `right`: `translateX(100%)`
  - `left`: `translateX(-100%)`
  - `bottom`: `translateY(100%)`
  - `top`: `translateY(-100%)`
- **Backdrop fade:** `opacity` on `.overlay[data-entering]` / `[data-exiting]`
  (copied from Modal's `.overlay`).
- RAC delays unmount until the CSS transition finishes — no `isExiting` state,
  no `deferredCloseRef`, no sentinel ref.
- `@media (prefers-reduced-motion: reduce)` sets `transition: none` on both the
  overlay and the panel.
- Radii preserved: `bottom` rounds its top corners, `top` rounds its bottom
  corners (`var(--br-md)`), matching current CSS.

## Accessibility

- Dialog labeled by `title` (`slot="title"` heading) or `aria-label`.
- Focus-visible outline `2px solid Highlight`; disabled/interactive conventions
  per the `antares-components` skill.
- `prefers-reduced-motion` respected (see Animation).
- No `role="slider"` — the keyboard resize affordance is removed with the
  snap-point system.

## Files

- **Rewrite:** `src/index.tsx`, `src/index.module.css`
- **Delete:** `src/use-snap-points.tsx`
- **Update:** `exports/Drawer.ts`, `drawer.stories.tsx`, `README.mdx`,
  `package.json`
- **Add:** `test/drawer.visual.test.tsx` (recipe expects a visual test; currently
  missing)

### Examples

- **Remove:** `snap-points.tsx`, `percent-snap-points.tsx`, `controlled-snap.tsx`,
  `handle-no-snaps.tsx`
- **Keep / rework:** `default.tsx`, `bottom-sheet.tsx` (a `bottom`-placed drawer,
  no handle), `rtl-placement.tsx`, `no-escape-dismiss.tsx`, `filtered-dismiss.tsx`,
  `nested-popover.tsx`, `default-open.tsx`, `aria-label.tsx`,
  `aria-label-with-title.tsx`, `drawer-playground.tsx`
- **Add:** `placements.tsx` (all four placements)

### Tests

- **`drawer.node.test.tsx`** (rewrite): SSR snapshot per example.
- **`drawer.browser.test.tsx`** (rewrite): behavior — open via trigger, close via
  X button, close via Escape, close via overlay click, `isDismissable=false` and
  `isKeyboardDismissDisabled` honored, `shouldCloseOnInteractOutside` filtering.
  No snap/drag assertions.
- **`drawer.visual.test.tsx`** (add): one `toMatchScreenshot` per example;
  `beforeAll(preloadTestIcons)`, `beforeEach(resetHover)`. Linux baselines come
  from the `/update-screenshots` CI bot after the PR opens.

### Stories

- Drop all snap-point args/controls. `Playground` exposes `placement`
  (`select`/`radio`), `showCloseButton` (`boolean`), `title` (`text`),
  `isDismissable` (`boolean`), `closeLabel` (`text`), `maxSize` (`text`). Every
  `argType` gets a `description`.

## Dependency cleanup

`motion/react` is imported only by the two drawer source files. After the
rewrite, verify no other consumer remains (`grep -rl "motion/react"
components/`), then remove `motion` from `package.json` and run
`npm install --ignore-scripts` to sync the lockfile.

## Testing / verification commands

Run scoped to the package:

```sh
npm exec nx run @godaddy/antares:typecheck
npm exec nx run @godaddy/antares:lint
npm exec nx run @godaddy/antares:test:node:update   # refresh SSR snapshots
npm exec nx run @godaddy/antares:test
```

Commit with `--no-verify` after manual typecheck/lint/test (per repo
convention); visual baselines are generated on CI.

## Deferred (future effort)

- **Drag-to-dismiss + pill handle** on `bottom` (and possibly `top`): a small
  pointer hook that follows the pointer via inline `transform`, then closes past
  a distance/velocity threshold or snaps back. Re-introduces a `showHandle` prop
  and a decorative-but-functional handle element. Explicitly excluded from this
  rework to keep it CSS-only and dependency-free.
```

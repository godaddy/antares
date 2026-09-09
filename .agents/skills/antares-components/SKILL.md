---
name: antares-components
description: >-
  Use when creating, editing, or testing components in the @godaddy/antares
  package - component source, examples, tests, stories, docs, layout, styling,
  or RAC integration decisions.
---

# Antares Components

How to build and change components in `packages/@godaddy/antares/`.

## What a component looks like

```
components/<name>/
├─ src/index.tsx                    the barrel
├─ src/index.module.css             styles, only if it has any
├─ examples/default.tsx             one example per file
├─ examples/<name>-playground.tsx   powers the Playground story
├─ test/<name>.node.test.tsx        SSR snapshots
├─ test/<name>.browser.test.tsx     interactions
├─ test/<name>.visual.test.tsx      screenshots, when the look is worth locking
├─ <name>.stories.tsx               Storybook entry
└─ README.mdx                       documentation
```

Build them in that order, then add the public export. Node and browser tests belong on every component. Visual tests are selective, and about half the library has none. Everything under `test/__snapshots__/` and `test/__screenshots__/` is generated, so never edit those by hand.

A few older folders fall short of this, such as `_internal/overlay-dialog`, which has only `src/`. Leave them alone, but don't take them as a model.

### What goes in src/

**`src/index.tsx` is the folder's barrel.** Everything public leaves through it, and it is what `#components/<name>` and `exports/<Area>.ts` import. Nothing else in `src/` is ever imported from outside the folder.

A small component defines itself right there, as `alert` and `tabs` do. Past that, give each exported component or hook its own file and let `index.tsx` re-export them:

- `button/src/index.tsx` re-exports `button.tsx` (`Button`, `LinkButton`) and `close-button.tsx` (the preset).
- `structure/src/index.tsx` re-exports `header.tsx`, `content.tsx`, `footer.tsx`, and `button-group.tsx`, and nothing else. That folder has no CSS at all, because its regions are built from layout components.
- `carousel/src/` keeps its hooks beside it: `use-accessibility.tsx`, `use-navigation-controls.tsx`.

Each styled component gets its own stylesheet, so `heading/src/` has `index.module.css` beside `index.tsx`.

### Naming and grouping

Folders and files are kebab-case (`text-field`, `date-picker`, `use-chart-color`). `README.mdx` is the exception.

Related components group under `components/<group>/<name>/`, as `layout/box/` and `chart/bar-chart/` do. A group folder can also hold code its members share, such as `chart/types.ts` and `chart/utils.ts`, and it needs a `meta.json` naming it and ordering its pages in the docs sidebar:

```json
{ "title": "Layout", "pages": ["box", "flex", "grid"] }
```

### Public exports

Each `exports/<Area>.ts` file is the source of truth for one public subpath (`@godaddy/antares/<Area>`, mapped by `"./*"` in `package.json`). The barrel `index.ts` only re-exports those files, so edit the area file, not the barrel. A brand-new area also needs an `export * from './exports/<Area>'` line in `index.ts`.

Area files are PascalCase, one per area. Usually the area is the main component (`Button.ts`, `TextField.ts`). Related components share a family name (`Layout.ts` for Box/Flex/Grid, `Chart.ts` for all charts). A component that exports a family exports every piece of it, contexts and props types included, the way `Structure.ts` exports `Header`, `HeaderContext`, and `HeaderProps`.

### Internal-only components

Put them in `components/_internal/<name>/` or `components/<group>/_internal/<name>/`. Internal hooks get their own folder there too, such as `chart/_internal/use-chart-color/`.

They are built like any other component, examples, stories, and README included. The only step they skip is the public export.

## Imports

Import by alias inside the package, not by relative path:

| Specifier                                               | Use for                           |
| ------------------------------------------------------- | --------------------------------- |
| `#components/icon`                                      | internal component (no extension) |
| `#utils/render-props.ts`, `#types/polymorphic-react.ts` | shipped helper (with extension)   |
| `#test/utils/test-helpers.tsx`                          | test helper                       |
| `@godaddy/antares`                                      | examples, the public import       |

`#components/*` resolves to `components/*/src/index.tsx`, so it can only reach a component's barrel. Code shared by a group sits above that, as `layout/tokens.ts` and `chart/types.ts` do, and those imports stay relative (`../../tokens.ts`). That is the one place a relative path is right.

## Writing the component

**Building something with an interior the consumer fills in, an overlay, or a trigger? Read `references/composition.md` first.**

### Antares first, RAC second

- If Antares already has the component (`Button`, `Select`, `Calendar`, …), use it. Reach for a react-aria-components (RAC) primitive only when Antares doesn't cover the behavior yet.
- Never use RAC in examples or docs. Use Antares components there.
- Import RAC with a `RAC` prefix: `import { Button as RACButton } from 'react-aria-components'`.

### Layout

Use `Flex`, `Box`, and `Grid` instead of writing your own CSS. Try their props first (`direction`, `gap`, `alignItems`, `justifyContent`, `wrap`, `padding`, `inlinePadding`, `blockPadding`, `display`) before adding flex or gap rules to `*.module.css`.

- `Flex as={X}` gives an existing element layout semantics, so you don't need an extra wrapper div. It works with RAC primitives (`RACButton`, …) and native tags (`"div"`, `"nav"`, `"ol"`, `"li"`, …).
- When your component wraps such an element, extend `Omit<FlexOwnProps, 'as'>` and spread the rest onto it, so callers can pass layout and HTML props. Put fixed props **after** the `{...rest}` spread so callers can't override them.
- Spacing props take t-shirt sizes: `gap="md"`, `padding="sm"`. Which scale belongs where is in `references/styling.md`.

### Props

Use an `interface` for props. Use a `type` only when you must, such as polymorphic props with `PolymorphicProps<C, OwnProps>`. Extend RAC types with `Omit`. Add JSDoc to every prop and leave a blank line between props.

```typescript
export interface ButtonProps extends Omit<RACButtonProps, 'className'> {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'danger';

  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';

  /** Button classes */
  className?: string;
}
```

## Styling

Styled components keep their CSS in `src/index.module.css`. Three rules hold everywhere:

- Merge the incoming class name with `composeClassName(className, styles.className)`, so a caller's `className` adds to your styles instead of replacing them.
- Use data-attribute selectors for RAC state only: `[data-hovered]`, `[data-pressed]`, `[data-disabled]`, …
- Keep every selector at maximum **0-1-0** specificity. Wrap state, attribute, and element selectors in `:where()`, for example `&:where([data-hovered])`, `.overlay:where([data-entering])`, `.header :where([slot="close"])`. If a rule truly has to go higher (to beat an inline style or a third-party stylesheet), add a comment saying why.

**`references/styling.md` has the rest: focus and disabled recipes, value conventions, spacing tokens, and custom properties.**

## Motion

Use motion only when it clarifies feedback, state, or spatial relationships. If a component changes many times a day, keep it instant. If it changes less often, motion can help users track what changed and where it came from. Keyboard response, focus, and activation stay immediate. Subtle, interruptible state transitions may remain modality-independent.

| Role | When to use | Default |
| --- | --- | --- |
| `None` | High frequency, keyboard driven, or purely structural changes | No motion |
| `Feedback` | Frequent color, opacity, and other state changes | `150ms ease` |
| `Surface` | Occasional anchored surfaces and centered modals | `125ms` or `200ms cubic-bezier(0.23, 1, 0.32, 1)` |
| `Spatial` | Short movement, drawers, measured indicators, and in-flow size changes | `150ms`, `200ms`, `250ms`, or `300ms` for `InlineDrawer` |

When creating or changing motion, read `references/motion.md` before editing.

Mandatory rules:

- Use exact-property CSS transitions, not `transition: all`.
- Prefer `transform` and `opacity` first. Keep layout motion out unless the component's meaning depends on it.
- Preserve RAC ownership of state, positioning, focus, keyboard handling, and dismiss behavior.
- Use a reduced-motion path for spatial motion.
- Gate hover motion behind `@media (hover: hover) and (pointer: fine)`.
- For anchored overlays, use the exact anchor origin when RAC exposes one, otherwise fall back to placement-edge origins. `Modal` stays centered.

## Examples, tests, and docs

Examples are the unit everything else is built on: tests render them, and stories and the README are generated from them.

- **Examples**: one exported function per file, importing from `@godaddy/antares`. Rules in `references/docs.md`.
- **Tests**: node (snapshots), browser (behavior), visual (screenshots), aiming at 100% coverage. Rules in `references/testing.md`.
- **Stories and `README.mdx`**: thin wrappers around the examples. Rules in `references/docs.md`.

## Checking your work

Run targets through Nx from the repo root, scoped to this package: `npm exec nx run @godaddy/antares:<target>`.

- `typecheck` and `lint` after every change
- `test` runs the node and browser projects with coverage. Use `test:node` or `test:browser` for one of them
- add `:update` to a test target to refresh its snapshots
- `test:visual` runs on CI, so you rarely need it locally

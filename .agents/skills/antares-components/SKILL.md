---
name: antares-components
description: >-
  Use when creating, editing, or testing components in the @godaddy/antares
  package — component source, examples, tests, stories, docs, layout, styling,
  or RAC integration decisions.
---

# Antares Components

Scoped conventions for component work in `packages/@godaddy/antares/`.

## Component vs RAC

- Prefer Antares components (`Button`, `Select`, `Calendar`, …) over RAC primitives when one exists. RAC is an escape hatch for behavior Antares doesn't expose yet.
- Do not use RAC components in examples or docs — use Antares components instead.
- RAC prefix for react-aria-components: `import { Button as RACButton } from 'react-aria-components'`

## Layout

- Prefer `Flex`, `Box`, and `Grid` over hand-rolled CSS. Use layout props (`direction`, `gap`, `alignItems`, `justifyContent`, `wrap`, `padding`, `inlinePadding`, `blockPadding`, `display`) before adding flex/gap rules in `*.module.css`.
- Use `Flex as={X}` (or `Box as=…`) to give an element flex/layout semantics instead of an extra wrapper div — works for RAC primitives (`RACButton`, …) and native tags (`"div"`, `"nav"`, `"ol"`, `"li"`, etc).
- When a component wraps such an element, extend `Omit<FlexOwnProps, 'as'>` and spread the rest onto it so callers can pass layout/HTML props. Put fixed props after the `{...rest}` spread so they can't be overridden.
- Polymorphic `as` can't infer a generic RAC component's type params (see `types/polymorphic-react.ts`). Either pin them at the call site — `Flex as={RACCalendar<CalendarDate>}` — or keep the generic component as the outer element with a `Flex` nested inside. Never use a bare, unparameterized `Flex as={RACCalendar}`.
- Spacing tokens: `gap="sm"`, `gap="md"`, etc. In CSS, use `var(--sp-sm)` directly. Tokens defined in `components/layout/tokens.ts`. Use t-shirt sizes (`sm`, `md`, `lg`).

## Imports

- Path alias within package: `import { Icon } from '#components/icon'`
- Public import in examples: `import { Icon } from '@godaddy/antares'`
- Internal components: use `#components/...`

## Component recipe

1. `components/<name>/src/index.tsx` and `index.module.css` (if styled)
2. `components/<name>/examples/default.tsx` and `components/<name>/examples/<name>-playground.tsx`
3. `components/<name>/test/<name>.node.test.tsx` (SSR snapshots)
4. `components/<name>/test/<name>.browser.test.tsx` (interactions)
5. `components/<name>/test/<name>.visual.test.tsx` (screenshots)
6. `components/<name>/<name>.stories.tsx`
7. `components/<name>/README.mdx`
8. Add the public export: create/extend `exports/<Area>.ts`, then add `export * from './exports/<Area>'` to the barrel `index.ts`

`exports/<Area>.ts` is the source of truth for each public subpath (`@godaddy/antares/<Area>`, mapped via `package.json` `"./*"`); `index.ts` only re-exports those files, so edit the area file, not the barrel. PascalCase, one file per area — usually the primary component (`Button.ts`, `TextField.ts`); related families group under a family name (`Layout.ts` = Box/Flex/Grid, `Chart.ts` = all charts). A brand-new area also needs its `export *` line added to `index.ts`.

Grouping optional: `components/<group>/<name>/` (e.g. `layout/box/`). Kebab-case names for folders and files (e.g. `text-field`, `date-picker`). Docs files (README.mdx) exempt.

### Internal-only (`_internal`)

Use `components/_internal/<name>/` or `components/<group>/_internal/<name>/`. Same structure, skip step 8 (the public-export step) since internal components aren't exported.

## Props

Prefer `interface` for props. Use `type` when required (e.g. polymorphic props with `PolymorphicProps<C, OwnProps>`). Extend RAC with `Omit`. JSDoc each prop.

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

## CSS

- Use the `styles.className` pattern, and merge incoming class names with `cx(styles.className, className)` so a caller's `className` augments the styles instead of replacing them.
- Data-attribute selectors for RAC state only: `[data-hovered]`, `[data-pressed]`, `[data-disabled]`, etc.
- Private vars: `--_` prefix. Expose a public `--var`; internally read it as `--_var: var(--var, fallback)`.
- Focus: `&[data-focus-visible] { outline: 2px solid Highlight; outline-offset: 2px; }`
- Disabled: `&[data-disabled] { opacity: 0.4; cursor: not-allowed; }` (use `&:disabled` only for native HTML elements)
- **Border-width:** always `1px`. No other values, no variables.
- **Font-weight:** prefer `bolder` when text needs bold and the element doesn't provide it natively; avoid numeric weights and `bold` in new code.

### Token / intent fallbacks

`references/token-intent-legacy-map.json` is the **source of truth** for UXCore intent → legacy `--ux-{hash}` mappings. For the entry schema, `grep` lookup recipes, and the CSS fallback chain (`legacyDefault` → `dtcgDefault` → sensible default), see [token-intent-map.md](references/token-intent-map.md).

## Testing

Three Vitest projects: `*.node.test.tsx`, `*.browser.test.tsx`, `*.visual.test.tsx`. Aim for 100% coverage.

**Import examples, not `src/` directly.** To close coverage gaps, add/update examples.

Describe hierarchy: `'@godaddy/antares'` > `'#ComponentName'`. Use named functions (not arrow).

### Node tests

**Snapshot-only.** Render an example and `toMatchSnapshot` — don't hand-assert markup (`toContain`, regex, attribute checks); the snapshot _is_ the assertion and captures structure, ARIA, and data-attributes. Cover extra states/branches by adding an example (and snapshotting it), not by writing manual node assertions.

```typescript
import { expect, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Button', function buttonTests() {
    it('renders default', function render() {
      const html = renderToString(<DefaultExample />);
      expect(html).toMatchSnapshot();
    });
  });
});
```

Update snapshots when they legitimately change: `npm exec nx run @godaddy/antares:test:node:update`.

### Browser tests

**Test behavior, not structure.** Cover user interactions such as focus and Tab order, keyboard input (Enter, Space, arrow keys), press events, state changes, selection, disabled behavior, form submissions, and more.

```typescript
import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Button', function buttonTests() {
    it('handles click', async function click() {
      const { getByRole } = await render(<DefaultExample />);
      await userEvent.click(getByRole('button'));
      await expect.element(getByRole('button')).toBeVisible();
    });
  });
});
```

### Visual tests

One screenshot per example (cover variants/orientations/states by adding examples, not by hand-building markup). Render the example and `toMatchScreenshot('name')`. If the example renders an `Icon`, `beforeAll(preloadTestIcons)`; `beforeEach(resetHover)` clears hover so screenshots are deterministic (both from `utils/test-helpers.tsx`).

```typescript
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { preloadTestIcons, resetHover } from '../../../utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function packageTests() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);

  describe('#Button', function buttonTests() {
    it('default example', async function defaultRender() {
      const { container } = await render(<DefaultExample />);
      await expect(container).toMatchScreenshot('default');
    });
  });
});
```

Baselines are **Linux** PNGs generated by the `/update-screenshots` CI bot after the PR opens. Visual tests run on CI by default; run them locally only to inspect: `npm exec nx run @godaddy/antares:test:visual` (`:test:visual:update` to refresh baselines).

## Examples

Create one kebab-case file per example under `examples/`, with each file exporting **exactly one function**. That function represents the example. Import all components from `@godaddy/antares`.

The exported function name becomes the story title and heading (`PrimaryExample` → `Primary`). JSDoc on the function controls the generated documentation:

- **Free text** - Description shown below the example heading.
- **`@title <text>`** - Overrides the heading (defaults to the humanized function name).
- **`@order <n>`** - Controls sort order in ascending order. Examples without `@order` appear last, sorted alphabetically.
- **`@ignore`** - Excludes the example entirely. No story or README block is generated. This is typically used for examples that exist only for tests.

For consistency, include a `DefaultExample` in `default.tsx` and assign it `@order 1` so it always renders first.

```tsx
import { Button } from '@godaddy/antares';

/**
 * The default button.
 * @order 1
 */
export function DefaultExample() {
  return <Button>Delete</Button>;
}
```

`<name>-playground.tsx` is treated specially. It is excluded from the generated examples and is used only to power the `Playground` story (see Stories).

## Stories

Add `'use client'`, then import helpers from `@bento/storybook-addon-helpers`. A stories file has four parts:

- **Meta** - `export default getMeta({ title: 'components/ComponentName' })`
- **Props** - `getComponentDocs(Component)` exported as `Props` (auto-generated props table); add `<Name>Props` for any extra public components
- **Examples** - `export const examples = getExamples('./examples')`. This discovers every example file and generates one indexed sidebar story per example (ordered/titled from JSDoc). The README references this same export.
- **Playground** - Use `getStory(PlaygroundExample, { args, argTypes })`. The build injects the `render` function, while `args` and `argTypes` are type-checked against the example's props. Provide a `description` for every `argType`, and choose an appropriate control such as `'boolean'`, `'text'`, `'number'`, `'object'`, `'radio'` (2 to 4 options), `'select'` (5 or more options), or any other suitable control.

```tsx
'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Button } from './src/index.tsx';
import { PlaygroundExample } from './examples/button-playground.tsx';

export default getMeta({ title: 'components/Button' });

export const Props = getComponentDocs(Button);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    variant: 'primary',
    size: 'md'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'critical', 'inline', 'minimal'],
      description: 'Visual variant of the button'
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Size of the button'
    }
  }
});
```

## README.mdx

- Include frontmatter with a `title` and a brief `description`.
- Import only the blocks you write yourself (`Meta`, `ArgTypes`) from `@storybook/addon-docs/blocks`, plus `* as Stories` from the stories file.
- Use the following suggested `##` sections, in this order, when applicable: Features, Installation, Examples, Customization, Accessibility, Best Practices, Troubleshooting, Props. Add other sections if they better suit the component or documentation.
- Use `<Meta of={Stories} name="Overview" />` for the overview and `<ArgTypes of={Stories.Props} />` for the props table.
- Use `<Examples of={Stories.examples} />` to render **all** examples. At build time, it expands into one `###` heading, the JSDoc description, a live `<Story>`, and a `<Source>` snippet for each example.

```mdx
---
title: Button
description: The Button component is a clickable control for actions, with variants and sizes.
---

import { ArgTypes, Meta } from '@storybook/addon-docs/blocks';
import * as Stories from './button.stories.tsx';

<Meta of={Stories} name="Overview" />

## Features

- Accessible button component
- Multiple variants and sizes

## Installation

\`\`\`bash
npm install @godaddy/antares
\`\`\`

## Examples

<Examples of={Stories.Examples} />

## Props

<ArgTypes of={Stories.Props} />
```

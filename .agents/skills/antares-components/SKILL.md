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
- Polymorphic `as` does **not** support TypeScript generics — see `types/polymorphic-react.ts`. For generic RAC components (e.g. `RACCalendar<CalendarDate>`, `RACSelect<T>`, `RACListBox<T>`), keep the generic component as the outer element and nest a `Flex` inside rather than `Flex as={RACCalendar}`.
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

SSR snapshots via `renderToString`:

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

**Test behavior, not structure.** Cover interactions — focus/Tab order, keyboard (Enter/Space/arrows), press, selection, disabled behavior. Leave static structure and a11y-presence (landmark, roles, `aria-current` placement) to the node snapshot; don't re-assert them here.

Interactions via `vitest-browser-react`:

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

Import from `@godaddy/antares`. Named export. Kebab-case file names.

```typescript
// examples/default.tsx
import { Button } from '@godaddy/antares';

export function DefaultExample() {
  return <Button>Click me</Button>;
}
```

## Stories

- Add the `'use client'` directive, then import helpers from `@bento/storybook-addon-helpers`
- Export `getMeta({ title: 'components/ComponentName' })` as the default
- Use `getComponentDocs(Component)` for each public component's auto-generated props table — export as `Props`, plus `<Name>Props` for any extra exported components
- Use `getStory(Example)` for each example, with a PascalCase export name
- Add a `Playground` story that renders the `<name>-playground` example, types `args` as its props, and gives every `argType` a `description`
- Pick control types from `'boolean'`, `'text'`, `'number'`, `'object'`, `'radio'` (2–4 options), and `'select'` (5+)

```tsx
'use client';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Button } from './src/index.tsx';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/button-playground.tsx';
import { DefaultExample } from './examples/default.tsx';
import { SecondaryExample } from './examples/secondary.tsx';

export default getMeta({ title: 'components/Button' });

export const Props = getComponentDocs(Button);

export const Default = getStory(DefaultExample);
export const Secondary = getStory(SecondaryExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
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
};
```

## README.mdx

- Include a `title` and a brief `description` in the frontmatter
- Use these `##` sections in order: Features, Installation, Props, Examples, Customization, Accessibility, Best Practices, Troubleshooting
- Use `<Meta />` to render the component's overview
- Use `<ArgTypes />` to render the props table, as needed
- Use `<Source />` for an example's code and `<Story />` for its live render
- Each example gets its own `###` subheading and a brief description

```mdx
---
title: Button
description: The Button component is a clickable control for actions, with variants and sizes.
---

import { ArgTypes, Meta, Source, Story } from '@storybook/addon-docs/blocks';
import * as Stories from './button.stories.tsx';

import SourceDefault from './examples/default.tsx?raw';

<Meta of={Stories} name="Overview" />

## Features

- Accessible button component
- Multiple variants and sizes

## Installation

\`\`\`bash
npm install @godaddy/antares
\`\`\`

## Props

The Button component accepts the following props:

<ArgTypes of={Stories.Props} />

## Examples

### Basic Usage

A default button with a text label.

<Source language="tsx" code={SourceDefault} />
<Story of={Stories.Default} inline />
```

## Accessibility

- Focus-visible outline: `outline: 2px solid Highlight`
- Disabled opacity: `0.4`
- Keyboard nav on all interactive elements
- ARIA labels: `aria-label` or `aria-labelledby`
- Semantic color tokens: `--fg-danger`, `--bg-success`, etc.

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
- Use `Flex as={SomeComponent}` to give an existing element flex semantics rather than wrapping in an extra `<Flex>` div. Preferred for RAC primitives such as `RACDateInput`, `RACButton`, `RACDialog`.
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

Use `components/_internal/<name>/` or `components/<group>/_internal/<name>/`. Same structure, skip step 8 (not exported).

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
- **Font-weight:** use `bolder` when text needs bold and the element doesn't provide it natively. No numeric weights or `bold`.

### Token / intent fallbacks

`token-intent-legacy-map.json` is the **source of truth** for UXCore intent → legacy `--ux-{hash}` mappings. For the entry schema, `grep` lookup recipes, and the CSS fallback chain (`legacyDefault` → `dtcgDefault` → sensible default), see [token-intent-map.md](token-intent-map.md).

## Testing

Three Vitest projects: `*.node.test.tsx`, `*.browser.test.tsx`, `*.visual.test.tsx`. Coverage threshold: 100% required.

**Import examples, not `src/` directly.** To close coverage gaps, add/update examples.

Describe hierarchy: `'@godaddy/antares'` > `'#ComponentName'`. Use named functions (not arrow).

### Node tests

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

### Browser tests

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

- `'use client'` directive
- `getMeta({ title: 'components/ComponentName' })`
- `getComponentDocs(Component)` for auto-generated props table
- `getStory(Component)` per example
- Playground with `render`, `args`, `argTypes`
- Control types: `'radio'` (2–4 options), `'select'` (5+), `'boolean'`, `'text'`, `'multi-select'`
- `description` on every `argType`

## README.mdx

- Omit manual `# Heading` — `remarkFrontmatterHeading` auto-generates from frontmatter `title:`
- Sections: Features, Installation, Props, Examples, Customization, Accessibility, Best Practices, Troubleshooting
- Source imports: `?raw` for showing code in docs
- Powers both Storybook and docs site

```mdx
---
title: Button
---

## Features

- Accessible button component
- Multiple variants and sizes

## Installation

\`\`\`bash
npm install @godaddy/antares
\`\`\`

## Examples

import DefaultCode from './examples/default?raw';

<CodeBlock code={DefaultCode} />
```

## Accessibility

- Focus-visible outline: `outline: 2px solid Highlight`
- Disabled opacity: `0.4`
- Keyboard nav on all interactive elements
- ARIA labels: `aria-label` or `aria-labelledby`
- Semantic color tokens: `--fg-danger`, `--bg-success`, etc.

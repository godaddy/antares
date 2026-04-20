# Antares Component Conventions

Scoped conventions for component work in `packages/@godaddy/antares/`.

## Build/Test

- Run tests: `nx run @godaddy/antares:test`
- Three Vitest projects:
  - `*.node.test.tsx` - SSR snapshots via `renderToString`
  - `*.browser.test.tsx` - interactions via `vitest-browser-react`
  - `*.visual.test.tsx` - visual regression tests
- Coverage threshold: 100% required

## Imports

- RAC prefix for react-aria-components: `import { Button as RACButton } from 'react-aria-components'`
- Path alias in packages/@godaddy/antares: `import { Icon } from '#components/icon'`
- Public import in examples: `import { Icon } from '@godaddy/antares'`

## Component Recipe

Directory structure checklist:

1. Create `components/<name>/src/index.tsx` and `index.module.css` (if styled)
2. Create `components/<name>/examples/default.tsx` (basic example) and `components/<name>/examples/<name>-playground.tsx` (playground with exported props)
3. Create `components/<name>/test/<name>.node.test.tsx` (SSR snapshots)
4. Create `components/<name>/test/<name>.browser.test.tsx` (interactions)
5. Create `components/<name>/<name>.stories.tsx` (Storybook)
6. Create `components/<name>/README.mdx` (docs)
7. Add public export to `packages/@godaddy/antares/index.tsx`

Grouping optional: `components/<group>/<name>/` (e.g. `layout/box/`)

Kebab-case names: component folders and files use dash-case (e.g. `text-field`, `date-picker`). Docs files (README.mdx) exempt.

## Props Pattern

Prefer `interface` for props. Use `type` when required (e.g. polymorphic props with `PolymorphicProps<C, OwnProps>`). Extend RAC with `Omit`. JSDoc each prop.

```typescript
/**
 * Button component props
 */
export interface ButtonProps extends Omit<RACButtonProps, 'className'> {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
}
```

## CSS Conventions

- Use `styles.className` pattern
- Variants and sizes: use `cva`-generated classes, not data-attributes
- Data-attribute selectors for RAC state only: `[data-hovered]`, `[data-pressed]`, `[data-disabled]`, etc.
- Design token vars: `--sp-*` (spacing), `--bg-*` (background), `--fg-*` (foreground), `--bd-*` (border), `--fs-*` (font-size), `--br-*` (border-radius)
- Private vars: `--_` prefix for internal use
- Focus: `&[data-focus-visible] { outline: 2px solid Highlight; outline-offset: 2px; }`
- Disabled: `&[data-disabled] { opacity: 0.4; cursor: not-allowed; }` (use `&:disabled` only for native HTML elements like `<button>`)

```css
/* cva-generated variant classes */
.button.primary {
  background: var(--bg-primary);
}

.button.danger {
  background: var(--bg-danger);
}

/* cva-generated size classes */
.button.sm {
  font-size: var(--fs-sm);
}

/* RAC state selectors */
.button[data-hovered] {
  background: var(--bg-hover);
}

.button[data-pressed] {
  background: var(--bg-pressed);
}
```

## CSS Hardcoded Values

- **Border-width:** always `1px`. No other values, no variables.
- **Font-weight:** use `bolder` when text needs bold and the element doesn't provide it natively. No numeric weights or `bold`.

## Testing

### Node Tests (*.node.test.tsx)

SSR snapshots via `renderToString`. Import examples, not components directly.

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

### Browser Tests (*.browser.test.tsx)

Interactions via `vitest-browser-react`. Import examples, not components directly.

```typescript
import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
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

Describe hierarchy: `'@godaddy/antares'` > `'#ComponentName'`. Use named functions (not arrow).

## Examples

Import from `@godaddy/antares`. Named export. File names are kebab-case (`default.tsx`, `<name>-playground.tsx`).

```typescript
// examples/default.tsx
import { Button } from '@godaddy/antares';

export function DefaultExample() {
  return <Button>Click me</Button>;
}
```

```typescript
// examples/button-playground.tsx
import { Button } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function PlaygroundExample({ variant, size }: PlaygroundExampleProps) {
  return <Button variant={variant} size={size}>Button</Button>;
}
```

## Stories

- `'use client'` directive
- `getMeta({ title: 'components/ComponentName' })`
- `getComponentDocs(Component)` for auto-generated props table
- `getStory(Component)` per example
- Playground with `render`, `args`, `argTypes`
- Control types: `'radio'` (2-4 options), `'select'` (5+ options), `'boolean'`, `'text'`, `'multi-select'` (string[])
- `description` on every `argType`

```typescript
'use client';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/button-playground.tsx';
import { getMeta, getComponentDocs } from 'storybook-addon-helpers';
import { Button } from './src/index.tsx';

export default getMeta({
  title: 'components/Button',
});

export const Props = getComponentDocs(Button);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    variant: 'primary',
    size: 'md',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'danger'],
      description: 'Visual style variant',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
  },
};
```

## README.mdx

- **Omit manual `# Heading`**: `remarkFrontmatterHeading` auto-generates from frontmatter `title:`
- Canonical sections: Features, Installation, Props, Examples, Customization, Accessibility (keyboard table + ARIA list), Best Practices, Troubleshooting
- Source imports: `?raw` for showing code in docs

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

## Layout

Use `Flex`, `Box`, `Grid` with spacing tokens (`gap="sm"`, `gap="md"`). In CSS, use `var(--sp-sm)` directly.

Spacing tokens defined in `packages/@godaddy/antares/components/layout/tokens.ts`. Use t-shirt sizes (`sm`, `md`, `lg`).

```tsx
<Flex gap="md" direction="column">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</Flex>
```

## Accessibility

- Focus-visible outline: `outline: 2px solid Highlight` (system color)
- Disabled opacity: `0.4`
- Keyboard nav: ensure all interactive elements keyboard-accessible
- ARIA labels: use `aria-label` or `aria-labelledby`
- Semantic color tokens: `--fg-danger`, `--bg-success`, etc.

## Gotchas

- **Examples drive test coverage**: tests import examples, NEVER `src/` directly. To close coverage gaps, add/update examples.
- **README.mdx powers both**: used in Storybook AND docs site. `remarkFrontmatterHeading` auto-generates H1 from frontmatter `title:`, so omit manual `# Heading`.
- **Private CSS vars**: use `--_` prefix (Lea Verou pattern). Expose public `--var`, internally use `--_var: var(--var, fallback)`.

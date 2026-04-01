<!-- Reference: see AGENTS.md for shared agent guidelines -->

# Bento / Antares — Copilot Instructions

Two-tier React component architecture: **Bento** (`@bento/*`) provides unstyled accessibility primitives, **Antares** (`@godaddy/antares`) provides the styled GoDaddy design system built on top of Bento. Monorepo managed by Nx.

## Tech Stack

React, TypeScript, Vitest, Biome (lint + format), Nx, Storybook, CSS Modules, Changesets. See `package.json` for current versions.

## Repository Structure

```text
packages/@bento/<name>/           # Unstyled accessibility primitives
  src/index.tsx                   # Implementation
  examples/<name>.tsx             # Example components (used by tests + Storybook)
  examples/variants.tsx           # Variant examples
  test/<name>.browser.test.tsx    # Vitest browser tests
  test/<name>.node.test.tsx       # SSR/snapshot tests
  <name>.stories.tsx              # Storybook story
  README.mdx
  package.json                    # Individual package with own deps

packages/@godaddy/antares/        # Styled design system
  index.tsx                       # Public entrypoint — all exports here
  components/<name>/
    src/index.tsx                 # Implementation
    src/index.module.css          # Styles (CSS Modules)
    examples/default.tsx          # Example components (used by tests + Storybook)
    examples/<name>-playground.tsx # Playground with exported props interface
    test/<name>.browser.test.tsx  # Vitest browser tests
    test/<name>.node.test.tsx     # SSR/snapshot tests
    <name>.stories.tsx            # Storybook story
    README.mdx

packages/@godaddy/design-tokens/  # Design tokens (SCSS, CSS-in-JS, classnames, DTCG)
packages/dev/                     # Dev tooling (storybook-addon-helpers, environment)
apps/docs/                        # Storybook documentation app
apps/site/                        # Documentation site (Next.js)
```

Folder names are **kebab-case**: `text-field`, `date-picker`. Related components may be grouped: `layout/box/`, `layout/flex/`.

## Import Conventions

```tsx
// @bento packages — import by package name
import { Button } from '@bento/button';
import { Pressable } from '@bento/pressable';
import { withSlots } from '@bento/slots';

// Inside @godaddy/antares — use #components/ alias
import { Icon } from '#components/icon';

// RAC imports in @godaddy/antares — always prefix with RAC
import { Button as RACButton, type ButtonProps as RACButtonProps } from 'react-aria-components';

// In examples — use the public package
import { Button } from '@godaddy/antares';

// In @bento tests — import the package directly
import { Button } from '@bento/button';

// In @godaddy/antares tests — import examples; use #components/ only for rare test setup helpers
```

## Component Patterns

### @bento primitives (unstyled)

Bento components use `withSlots` + `useProps` for slot-based composition. No styling.

```tsx
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import { Pressable, type PressableProps } from '@bento/pressable';
import { useButton } from 'react-aria';
import React, { ComponentProps } from 'react';

export interface ButtonProps
  extends Omit<PressableProps, 'children'>,
    Omit<ComponentProps<'button'>, keyof PressableProps> {
  /** The content to display inside the button. */
  children: React.ReactNode;
}

export const Button = withSlots('BentoButton', function Button(args: ButtonProps) {
  const { props } = useProps(args);
  const { children, ...restProps } = props;
  const { buttonProps } = useButton(restProps, null);

  return (
    <Pressable {...restProps} slot="pressable">
      <button {...buttonProps}>{children}</button>
    </Pressable>
  );
});
```

### @godaddy/antares components (styled)

Antares components wrap RAC primitives and use `forwardRef` with a **named function expression**. Use `cx()` for simple className merging, `cva()` only when a component has a variant matrix.

```tsx
import { forwardRef } from 'react';
import { cx } from 'cva';
import { Text as RACText, type TextProps as RACTextProps } from 'react-aria-components';
import styles from './index.module.css';

export interface TextProps extends RACTextProps {
  align?: 'start' | 'center' | 'end';
}

export const Text = forwardRef<HTMLElement, TextProps>(
  function Text({ className, ...rest }, ref) {
    return <RACText {...rest} ref={ref} className={cx(styles.text, className)} />;
  }
);
```

- **Props:** Prefer `interface` for component props; use `type` when necessary (e.g. polymorphic/utility types). Extend RAC props with `Omit` for overrides.
- **Styling:** CSS Modules + `cx()` or `cva()`. Reference design tokens as `var(--fg-base)`, `var(--bg-selected)`, `var(--sp-sm)`.
- **Exports:** Add public exports to `packages/@godaddy/antares/index.tsx` using the `#components/` alias with inline `type` keyword.

## Test Structure

### @bento tests

Tests import the package directly. Use `vitest-browser-react` for browser tests, `renderToString` for node tests. Uses `assume` alongside `expect`.

```tsx
import { render } from 'vitest-browser-react';
import { describe, it, expect } from 'vitest';
import { Button } from '@bento/button';
import assume from 'assume';

describe('@bento/button', function bento() {
  describe('Button', function buttonTests() {
    it('should render a button', function test() {
      const { container } = render(<Button>Click me</Button>);
      assume(container.innerHTML).includes('type="button"');
    });
  });
});
```

### @godaddy/antares tests

Tests import **examples**, never `src/` directly.

```tsx
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Button', function buttonTests() {
    it('renders hovered', async function rendersHovered() {
      const { getByRole } = await render(<DefaultExample />);
      await userEvent.hover(getByRole('button'));
      expect(getByRole('button')).toHaveAttribute('data-hovered', 'true');
    });
  });
});
```

Top-level `describe` is the package name (`@bento/<name>` or `@godaddy/antares`). Component-level uses `#PascalCase` in antares, plain name in bento. All functions are **named**.

## Storybook

```tsx
import { getMeta, getComponentDocs, getStory, getVariants } from '@bento/storybook-addon-helpers';
import { Button } from './src/index.tsx';
import { ButtonExample } from './examples/button.tsx';
import { ButtonVariantsExample } from './examples/variants.tsx';

export default getMeta({ title: 'components/Button' });
export const Props = getComponentDocs(Button);
export const Default = getStory(ButtonExample);
export const Styles = getVariants(ButtonVariantsExample, { /* variant configs */ });
```

## Layout & Spacing

Use `Flex`, `Box`, `Grid` components with t-shirt size tokens: `sm`, `md`, `lg`. In CSS, use `var(--sp-sm)`.

## Naming

- Folder/file names: **kebab-case**
- Commits: **conventional** (`feat(button): add disabled state`)
- Prefer `interface` over `type` for props; use `type` for polymorphic/utility types

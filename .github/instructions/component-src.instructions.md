---
applyTo: "packages/@godaddy/antares/components/**/src/**/*.tsx"
---
<!-- Reference: see AGENTS.md for shared agent guidelines -->

# Antares Component Source

## RAC Wrapping Pattern

Most components wrap a `react-aria-components` primitive. Always prefix RAC imports:

```tsx
import { forwardRef } from 'react';
import { cx } from 'cva';
import { Switch as RACSwitch, type SwitchProps as RACSwitchProps } from 'react-aria-components';
import styles from './index.module.css';

// Omit RAC's render-prop className; re-declare as plain string
/** Props for the {@link Switch} component. */
export interface SwitchProps extends Omit<RACSwitchProps, 'className'> {
  /** Description of custom prop. */
  customProp?: string;
  /** Additional class names to apply. */
  className?: string;
}

/**
 * The Switch component allows users to toggle a boolean value.
 *
 * @param props - {@link SwitchProps}
 */
export const Switch = forwardRef<HTMLLabelElement, SwitchProps>(
  function Switch({ className, ...rest }, ref) {
    return <RACSwitch {...rest} ref={ref} className={cx(styles.switch, className)} />;
  }
);
```

## Key Rules

- **Named function expression** — always; prefer `forwardRef` when the component needs to expose a ref. The function name must match the export name.
- **Prefer `interface`** for component props; use `type` when necessary (e.g. polymorphic/utility types). Extend RAC props with `Omit` for overridden fields.
- **`cx()`** for className merging (most components). Only use `cva()` when the component has a full variant matrix (e.g. Button with variant + size).
- **CSS Modules** — import as `styles` from `./index.module.css`. Reference design tokens: `var(--fg-base)`, `var(--bg-selected)`, `var(--sp-sm)`.
- **`#components/` alias** for internal imports within `packages/@godaddy/antares`. Relative imports between components are discouraged, but may be used for tightly-coupled internals (e.g. shared layout utilities).
- **JSDoc** on every exported interface and component with `@param` tags.
- **Re-export** from `packages/@godaddy/antares/index.tsx` using `#components/` alias:

  ```tsx
  export { Switch, type SwitchProps } from '#components/switch';
  ```

## cva() Variant Pattern (only when needed)

```tsx
import { cva, type VariantProps } from 'cva';
import styles from './index.module.css';

const buttonVariants = cva(styles.button, {
  variants: {
    variant: { primary: styles.primary, secondary: styles.secondary },
    size: { sm: styles.sm, md: styles.md }
  },
  defaultVariants: { variant: 'primary', size: 'md' }
});

type ButtonVariantProps = VariantProps<typeof buttonVariants>;
```

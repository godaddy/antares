# @bento/storybook-addon-helpers

A Storybook preset that turns type-safe authoring helpers (`getMeta`, `getStory`, `getVariants`, `getComponentDocs`, `getTypeDocs`) into standard CSF at build time, via a custom stories indexer and a Vite plugin. Prop documentation is extracted straight from TypeScript types, so `argTypes` stay in sync with the code with no manual upkeep.

## Requirements

- Storybook `^10.4` with the React + Vite framework (`@storybook/react-vite`).
- A React + TypeScript project - prop docs are extracted from TypeScript types.
- Stories authored as `*.stories.tsx` (the file pattern the indexer matches).

## Setup

Add the package to the `addons` array in `.storybook/main.ts`:

```ts
export default {
  addons: ['@bento/storybook-addon-helpers']
};
```

The preset registers an indexer for `*.stories.tsx` files and a Vite plugin that performs the CSF transform. No per-story configuration is needed.

## Authoring API

```tsx
import { getMeta, getStory, getVariants, getComponentDocs, getTypeDocs } from '@bento/storybook-addon-helpers';
import { Button, type ButtonProps } from './button.tsx';

// Story metadata (title, component, shared args).
export default getMeta({ title: 'Button' });

// A single story. Rewritten to a CSF story object with a render function.
export const Default = getStory(Button, { args: { children: 'Click me' } });

// Multiple stories from one call. Each key becomes its own named export.
export const Variants = getVariants(Button, {
  primary: { args: { variant: 'primary' } },
  secondary: { args: { variant: 'secondary' } }
});

// A props table generated from the component's type.
export const Docs = getComponentDocs(Button, { include: ['children', /^on/] });

// A props table generated from any interface or type alias.
export const TypeDocs = getTypeDocs<ButtonProps>({ exclude: [/^aria-/] });
```

## Docs options

`getComponentDocs` and `getTypeDocs` accept an options object that filters, orders, and categorizes the documented props. All keys are type-checked against the target type at build time.

- **`include` / `exclude`** - allowlist or blocklist props. Mutually exclusive.
- **`order`** - pin specific props to the front; the rest follow (required-first, then alphabetical). A prop's position is set by the first entry that matches it; props matched by the same entry (e.g. one `RegExp`) tie-break required-first, then alphabetical.
- **`categories`** - map a category label to its props. Categories render as sections in the props table (Storybook's `table.category`).

Entries in `include`, `exclude`, `order`, and `categories` accept either an exact prop name (type-checked) or a `RegExp` matched against the prop name via `.test()` - you control anchoring:

```ts
getComponentDocs(Button, {
  categories: {
    Events: [/^on/],       // onClick, onPress, ...
    Styling: ['className', 'style']
  }
});
```

When more than one category matches a prop, the **first declared** category wins.

## How it works

The build-time pipeline is `extract → neutral model → adapter`: the engine reads TypeScript types into a target-agnostic `PropsDoc` model, and an adapter converts that model to Storybook `argTypes`. The neutral model is intentionally decoupled from Storybook so the same engine can later feed other documentation targets such as Fumadocs. That wiring does not exist in this package yet - the Fumadocs docs site (`apps/site`) currently has its own separate generator.

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

### Global docs defaults

Pass `docsDefaults` to avoid repeating the same `getComponentDocs`/`getTypeDocs` options in every story. They are merged UNDER each call's own options: a key you set on the call replaces that key from the defaults, absent keys inherit the defaults, and `include`/`exclude` move together (setting either on a call drops both from the defaults).

```ts
// .storybook/main.ts
export default {
  addons: [
    {
      name: '@bento/storybook-addon-helpers',
      options: {
        docsDefaults: {
          categories: { Events: [/^on/], Aria: [/^aria-/] }
        }
      }
    }
  ]
};
```

Defaults apply to both `getComponentDocs` and `getTypeDocs`. Because matchers can be arbitrary strings, global defaults are component-agnostic (a category like `Events: [/^on/]` applies wherever an `on*` prop exists). Other consumers of the neutral model (see [How it works](#how-it-works)) apply the same defaults by passing them to `resolvePropsDoc`.

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

`getComponentDocs` and `getTypeDocs` accept an options object that filters, orders, and categorizes the documented props. Keys are autocompleted against the target type, and arbitrary strings are also accepted (so you can reference props the extractor can't see, such as an added override).

- **`include` / `exclude`** - allowlist or blocklist props. Mutually exclusive.
- **`ignoreSourceFiles`** - drop props by the file that declared them. Accepts a single matcher or an array; a `string` matches when the prop's `sourceFile` path _contains_ it (so `'@types/react'` works), a `RegExp` is tested against the path. It is a hard exclusion applied on top of `include`/`exclude` (a prop from an ignored file is dropped even if `include`d), and props with no known `sourceFile` are never ignored. Handy for hiding inherited third-party props, e.g. `ignoreSourceFiles: '@types/react'`.
- **`overrides`** - change a prop's `description`, `defaultValue`, `type`, or `required`. An exact name that no prop matches adds a new prop (handy for documenting props the extractor can't see) - a regular expression only patches props that already exist. Applied before the options below, so an added prop is filtered, categorized, and ordered like any other.
- **`primary`** - props shown first, at the top of the table and outside any category (even one that would otherwise match them), in the order you list them.
- **`categories`** - map a category label to its props. Each category renders as its own section in the props table, in the order the categories are declared.

Within `primary` or a single category, props appear in the order their entries are listed. When several props match the same entry, required props come first, then the rest alphabetically.

```ts
getComponentDocs(Button, {
  primary: ['onPress'],           // shown first, at the root
  categories: {
    Events: [/^onChange/, /^on/], // onChange first, then the rest of on*
    Styling: ['className', 'style']
  }
});
```

```ts
getComponentDocs(Button, {
  overrides: [
    { name: 'onPress', description: 'Fired when the button is pressed.' }, // patch existing
    { name: 'customId', type: 'string', description: 'Custom DOM id.' }                 // add a missing prop
  ]
});
```

Every option accepts either an exact prop name (autocompleted) or any string, or a regular expression that matches prop names (for example, `/^on/` matches every `on*` prop). When more than one category matches a prop, the **first declared** category wins.

## How it works

The build-time pipeline is `extract → neutral model → adapter`: the engine reads TypeScript types into a target-agnostic `PropsDoc` model, and an adapter converts that model to a documentation target. The neutral model is decoupled from Storybook so the same engine feeds multiple targets.

- The Storybook adapter (`toStorybookArgTypes`) is used by the CSF transform on the `.` entry.
- The neutral model is exposed on a separate, Storybook-free `./docs` entry. Any other documentation target resolves a stories-file export to the `PropsDoc` model and adapts it to whatever it renders:

```ts
import { resolvePropsDoc } from '@bento/storybook-addon-helpers/docs';

// Resolve a stories-file export to the neutral model, then adapt it yourself.
const doc = await resolvePropsDoc({ filePath: 'button/button.stories.tsx', exportName: 'Props' });
// doc: { name, props: [{ name, type, required, defaultValue, description, category, ... }] }
```

The addon stays framework-agnostic: it knows nothing about how a consumer renders the model. `resolvePropsDoc` and the internal `docFromCall` are shared by the CSF transform, so extraction and processing are identical across targets - only the adapter differs.

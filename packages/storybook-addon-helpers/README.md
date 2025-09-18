***REMOVED***Storybook Addon Helpers

This addon helps you write less code in your stories (`*.stories.tsx`), less repetitive Storybook boilerplate, less manual typing, less manual documentation, by using the helpers provided which extract the components, args and props from your components and interfaces while keeping your stories type safe.

##***REMOVED***Key Benefits

- **Less Code** - Reduce the amount of repetitive Storybook boilerplate in your stories with helpers such as `getMeta`, `getStory`, `getVariants`, `getComponentDocs` and `getInterfaceDocs`.
- **Auto Documentation** - Extract component docs directly from components and interfaces using JSDoc to prevent stale documentation.
- **Type Safe** - Full TypeScript support with IntelliSense while authoring stories.
- **CSF compatible** - The final output is just a standard [CSF], so you can use them in your stories without any runtime helpers. This helper is designed to align with the new [CSF Factories].

##***REMOVED***Quick Comparison

```ts
// ❌ Before: Repetitive manual typing

const meta = {
  title: 'button',
} satisfies Meta<ButtonProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export default meta;

export const Button: Story = {
  title: 'Button',
  component: Button,
  render: (args) => <Button {...args} />,
};

export const ButtonProps = {
  tags: ['!dev'],
  argTypes: {
    name: {
      description: 'The name of the button',
      name: 'name',
      type: { name: 'string', required: true },
    },
    // ... manually typing more props
  },
};

// ✅ After: Using the helpers

export default getMeta({ title: 'Button' });
export const Button = getStory(Button);
export const ButtonProps = getComponentDocs(Button);
```

#***REMOVED***Installation

```bash
npm install --save-dev @bento/storybook-addon-helpers
```

#***REMOVED***Setup

Add the addon to your `.storybook/main.ts`:

```ts
export default {
  addons: [
    // ... other addons
    '@bento/storybook-addon-helpers',
  ],
};
```

#***REMOVED***Usage

You can use the following helpers in your story (`*.stories.tsx`) files:

```ts
import {
  getMeta,
  getStory,
  getVariants,
  getComponentDocs,
  getInterfaceDocs,
} from '@bento/storybook-addon-helpers';
```

##***REMOVED***`getMeta(storyObj)`

Generates a type-safe Storybook Meta object:

```ts
export default getMeta({
  title: 'Components/Button',
  component: Button,
});
```

##***REMOVED***`getStory(Component, storyObj)`

Generates individual stories with full type safety:

```ts
export const Default = getStory(Button);

export const MyButton = getStory(Button, {
  args: { name: 'my button' },
});
```

##***REMOVED***`getVariants(Component, variants)`

Generate multiple stories based on the variants object:

```ts
export const ButtonVariants = getVariants(Button, {
  primary: { args: { variant: 'primary' } },
  secondary: { args: { variant: 'secondary' } },
  loading: { args: { isLoading: true } },
});

// Creates the following stories:

export const ButtonVariantsPrimary = { ... }
export const ButtonVariantsSecondary = { ... }
export const ButtonVariantsLoading = { ... }
```

##***REMOVED***`getComponentDocs(Component)`

Generates a story useful for documentation from component props and JSDoc using [`react-docgen-typescript`](https://github.com/styleguidist/react-docgen-typescript):

```ts
export const ButtonDocs = getComponentDocs(Button);

// Creates the following story:

export const ButtonDocs = {
  tags: ['!dev'],
  argTypes: {
    onClick: {
      description: 'this is the onClick handler',
      name: 'onClick',
    },
  },
};
```

##***REMOVED***`getInterfaceDocs<InterfaceName>()`

Generates a story useful for documentation from TypeScript interfaces and JSDoc comments:

```ts
export const ButtonPropsDocs = getInterfaceDocs<ButtonProps>();

// Generates similar story to the one using getComponentDocs
```

##***REMOVED***Comprehensive example

We use the following files for testing the addon, it showcases multiple ways to use the helpers:

- **How you would write your stories**: [comp-stories.tsx](./test/fixtures/comp-stories.tsx)
- **How the addon transforms your stories**: [comp-stories-expected.tsx](./test/fixtures/comp-stories-expected.tsx)

#***REMOVED***How It Works

This addon analyzes your story files and performs a lightweight transformation step:

1. **Transforms your stories**:
   Helper functions (e.g. `getMeta`, `getStory`, `getVariants`, etc.) are converted into standard [CSF] exports.
   This means your final stories look like native Storybook stories, without any runtime helpers.

2. **Preserves type safety**:
   You still get **TypeScript type checking and IntelliSense** when authoring your stories.
   Your editor will catch mistakes while outputting clean CSF.

#***REMOVED***References

- [Writing Presets](https://storybook.js.org/docs/addons/writing-presets#advanced-configuration)
- [Indexers](https://storybook.js.org/docs/api/main-config/main-config-indexers)
- [CSF]
- [CSF Factories]

[CSF]: https://storybook.js.org/docs/api/csf
[CSF Factories]: https://storybook.js.org/docs/api/csf/csf-factories

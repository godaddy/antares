import type { DocsDefaults } from '../packages/dev/storybook-addon-helpers/src/types.ts';

/** Shared docs prop-table defaults for Antares components (Storybook + docs site). */
export const docsDefaults = {
  primary: ['id', 'children', 'className', 'style', 'disabled'],
  categories: {
    Events: [/^onPress/, /^onChange/, /^onHover/, /^on/],
    Form: [/^form/, /^onSubmit/, /^onReset/],
    Aria: [/^aria-/]
  }
} satisfies DocsDefaults;

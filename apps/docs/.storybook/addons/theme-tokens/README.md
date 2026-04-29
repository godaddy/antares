# theme-tokens

Powers the **Theme** dropdown that `@storybook/addon-themes` adds to
the toolbar. Each recipe applies a set of token stylesheets to the
preview iframe via [constructable
stylesheets](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/CSSStyleSheet),
so stories can be viewed under any predefined token combination —
including `None`.

## Wiring

Add the package addon to `main.ts`:

```ts
// apps/docs/.storybook/main.ts
addons: [
  // …other addons…
  '@storybook/addon-themes',
]
```

Then wire the decorator in `preview.ts`:

```ts
import { withThemeTokens } from './addons/theme-tokens/decorator.tsx';
import { RECIPES } from './addons/theme-tokens/recipes.ts';

const preview: Preview = {
  decorators: [withThemeTokens({ themes: RECIPES, defaultTheme: 'Legacy' })]
};
```

`defaultTheme` is constrained to keys of `RECIPES`.

## Adding a recipe

Edit `recipes.ts`:

```ts
export const RECIPES = {
  Legacy: [legacy],
  Nextgen: [nextgen],
  Both: [legacy, nextgen],
  None: [],
  BothLegacyWins: [nextgen, legacy] // Legacy wins collisions
} as const satisfies Record<string, readonly CSSStyleSheet[]>;
```

For a new source: add a `?inline` import and a `makeSheet(...)`
binding at the top of the file, then reference it from one or more
recipes.

## Pinning a recipe to a story

```ts
// Doesn't update the toolbar visual:
export const TokensCollision = {
  parameters: { themes: { themeOverride: 'Both' } }
};

// Updates the toolbar visual when active:
export default {
  globals: { theme: 'Nextgen' }
};
```

Resolution: `parameters.themes.themeOverride` → `globals.theme` →
`defaultTheme`.

## Gotchas

- **`@property` registrations don't unregister.** Removing a sheet
  drops cascaded values but leaves `@property` registrations in place
  for the document lifetime.
- **MDX-only pages don't run decorators.** Pure MDX docs reflect
  whatever the last visited story left in `adoptedStyleSheets`.
- **DevTools surfaces these as "Constructed style sheets"** under the
  Sources panel, not as `<style>` nodes in Elements.
- **Editing `recipes.ts` may leave stale sheets adopted in dev.** New
  `CSSStyleSheet` instances aren't recognized as "owned" by the prior
  factory closure; refresh the preview iframe to clear them.

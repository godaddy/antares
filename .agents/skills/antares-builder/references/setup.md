# Consumer setup

Read this for package installation, import resolution, missing CSS or framework integration. Resolve API differences using the installed package's metadata, public types and matching README.

## Install and import

Add `@godaddy/antares` using the application's package manager. Respect the React and React DOM peer-dependency ranges declared by the package being installed.

```tsx
import { Button, Flex, Text } from '@godaddy/antares';
// Public subpaths allow focused component JS/CSS imports:
import { Button } from '@godaddy/antares/Button';
import { Flex } from '@godaddy/antares/Layout';
```

Subpaths follow component families rather than every exported name: charts come from `@godaddy/antares/Chart`, structural parts from `@godaddy/antares/Structure`, RangeCalendar from `Calendar`, and both date-picker families from `DatePicker`. Confirm the public export map before constructing an import path.

The root barrel loads CSS custom properties as a side effect; component subpaths ship CSS through their JS chunks. Use the bundler's CSS pipeline. Do not add guessed stylesheet paths or copy library source. Ordinary rendering needs no Antares provider.

Date constructors and helpers are available separately from `@godaddy/antares/date`, which re-exports `@internationalized/date`. They are intentionally absent from the root barrel. Import component props/types from the same public path as the component.

## Framework integration

- **Vite SPA:** standard CSS import handling is sufficient.
- **Next.js:** add `@godaddy/antares` to the existing `transpilePackages` array for package CSS.
- **Remix/Vite SSR:** add `@godaddy/antares` to the existing `ssr.noExternal` array.
- **Other bundlers:** confirm that CSS imports from `node_modules` are processed.

```js
// Merge into the existing Next.js configuration.
const nextConfig = {
  transpilePackages: ['@godaddy/antares']
};
```

```ts
// Merge into the existing Vite SSR configuration.
import { defineConfig } from 'vite';

export default defineConfig({
  ssr: { noExternal: ['@godaddy/antares'] }
});
```

Preserve unrelated configuration entries. In Next.js App Router, put `"use client"` on the boundary that owns hooks, event handlers or browser APIs. Inspect the actual import/rendering path when diagnosing server/client errors.

For date and number formatting, use the application's locale setup. If an explicit React Aria `I18nProvider` is needed, import it from an explicitly declared dependency rather than assuming Antares exports it.

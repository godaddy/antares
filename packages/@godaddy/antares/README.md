# Antares

A collection of accessible, composable React components built on React Aria.

[Documentation](https://scaling-adventure-4379gjj.pages.github.io/site/) | [Storybook](https://scaling-adventure-4379gjj.pages.github.io/)

## Quick Start

Install the package:

```bash
npm install --save @godaddy/antares
```

Import and use a component:

```tsx
import { Button } from '@godaddy/antares';

export default function App() {
  return <Button variant="primary">Get Started</Button>;
}
```

### Per-Component Imports

Each component is available as a standalone entry point. This lets your bundler load only the JavaScript and CSS for the components you use:

```tsx
import { Button } from '@godaddy/antares/Button';
import { Flex } from '@godaddy/antares/Layout';
import { BarChart } from '@godaddy/antares/Chart';
```

This also works with autocomplete in IDEs and LLMs, so you can import from the root package and let your editor/agent suggest the available components.

## Framework Setup

Antares ships CSS alongside its JavaScript modules. Each component chunk imports a corresponding `.css` file (e.g., `import './src-BZhWcxqJ.css'`). Most bundlers handle this automatically, but some frameworks need extra configuration to process CSS imports from `node_modules`.

### Next.js

Add `@godaddy/antares` to [`transpilePackages`](https://nextjs.org/docs/app/api-reference/config/next-config-js/transpilePackages) so Next.js processes the package through its own CSS pipeline instead of treating it as a pre-built external:

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@godaddy/antares'],
};

module.exports = nextConfig;
```

Without this, Next.js will throw:

```text
Global CSS cannot be imported from within node_modules.
```

### Remix

Remix with Vite handles CSS imports from `node_modules` in the client bundle automatically. However, during SSR, Vite treats `node_modules` as externals by default, which bypasses CSS processing. Add `@godaddy/antares` to [`ssr.noExternal`](https://vite.dev/config/ssr-options#ssr-noexternal) to fix this:

```ts
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  ssr: {
    noExternal: ['@godaddy/antares'],
  },
});
```

### Vite

Vite processes CSS imports from `node_modules` out of the box. No additional configuration is needed for client-side SPAs.

If you are using Vite with SSR (e.g., custom SSR setup, not Remix), add `@godaddy/antares` to `ssr.noExternal` as shown in the [Remix section](#remix).

### Other Bundlers

Any bundler that supports CSS imports will work with Antares. If your bundler does not process CSS imports from `node_modules` by default, ensure it is configured to do so. For example, with raw webpack you may need [`css-loader`](https://webpack.js.org/loaders/css-loader/) configured to handle `.css` files from `node_modules`.

# Antares

[![CI](https://github.com/godaddy/antares/actions/workflows/ci.yaml/badge.svg)](https://github.com/godaddy/antares/actions/workflows/ci.yaml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/node-%3E%3D24-brightgreen)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![Changesets](https://img.shields.io/badge/maintained%20with-changesets-blue)](https://github.com/changesets/changesets)

A two-tier React component architecture for building accessible design systems.

**Bento** (`@bento/*`) provides unstyled accessibility primitives built on [React Aria](https://react-spectrum.adobe.com/react-aria/). **Antares** (`@godaddy/antares`) provides the styled GoDaddy design system built on top of Bento. The monorepo is managed by [Nx](https://nx.dev/).

## Repository Structure

```text
packages/@bento/*/                # Unstyled accessibility primitives
packages/@godaddy/antares/        # Styled design system
packages/@godaddy/design-tokens/  # Design tokens (SCSS, CSS-in-JS, classnames, DTCG)
packages/@godaddy/generate-cdn-url/ # CDN URL generator for GoDaddy assets
packages/dev/                     # Dev tooling (storybook-addon-helpers, environment)
apps/docs/                        # Storybook documentation
apps/site/                        # Documentation site (Next.js)
configs/                          # Shared build and test configs
```

## Packages

### @godaddy

- [**antares**](./packages/@godaddy/antares) - The GoDaddy design component library built on Bento primitives
- [**design-tokens**](./packages/@godaddy/design-tokens) - Design tokens in SCSS, CSS-in-JS, classnames, and DTCG formats
- [**generate-cdn-url**](./packages/@godaddy/generate-cdn-url) - Generates CDN URLs for GoDaddy assets

### @bento Components

- [**box**](./packages/@bento/box) - React context for passing configuration through component tree
- [**button**](./packages/@bento/button) - Button component with press interactions and disabled states
- [**checkbox**](./packages/@bento/checkbox) - Checkbox controls supporting single, grouped, and indeterminate selections
- [**container**](./packages/@bento/container) - Polymorphic component that renders as any HTML element via `as` prop
- [**dismiss**](./packages/@bento/dismiss) - Visually hidden, focusable dismissal control for accessible modal dismissal
- [**divider**](./packages/@bento/divider) - Horizontal or vertical content separator
- [**field-error**](./packages/@bento/field-error) - Error messages for form controls such as RadioGroup or CheckboxGroup
- [**focus-lock**](./packages/@bento/focus-lock) - Focus management primitive for containing and controlling focus within a scope
- [**heading**](./packages/@bento/heading) - Heading component with automatic level tracking through nesting
- [**icon**](./packages/@bento/icon) - Icon component with lazy loading and sprite mode
- [**illustration**](./packages/@bento/illustration) - SVG illustration component with rotation and flip support
- [**input**](./packages/@bento/input) - Universal input primitive supporting all HTML input types
- [**listbox**](./packages/@bento/listbox) - List selection primitive for building Select, Combobox, and Menu
- [**overlay**](./packages/@bento/overlay) - Overlay primitive for modals, drawers, and popups
- [**portal**](./packages/@bento/portal) - Render children into a target DOM container outside the component hierarchy
- [**pressable**](./packages/@bento/pressable) - Make any element clickable with keyboard and interaction state support
- [**radio**](./packages/@bento/radio) - Radio button controls with single-selection group management
- [**text**](./packages/@bento/text) - Text component with alignment, wrapping, and line clamping
- [**visually-hidden**](./packages/@bento/visually-hidden) - Content accessible to screen readers while visually hidden from sighted users

### @bento Hooks

- [**scroll-lock**](./packages/@bento/scroll-lock) - Prevent document scrolling while exposing Bento debugging hooks
- [**use-data-attributes**](./packages/@bento/use-data-attributes) - Expose component state to DOM via data attributes for CSS styling
- [**use-props**](./packages/@bento/use-props) - Unify component and slot-based props with render prop support
- [**use-svg-sprite**](./packages/@bento/use-svg-sprite) - Optimize repeated SVG usage by registering icons into shared sprite

### @bento Utilities

- [**create-external-store**](./packages/@bento/create-external-store) - Low-level external store for useSyncExternalStore hook integration
- [**error**](./packages/@bento/error) - Enhanced error objects with documentation links and support information
- [**forward**](./packages/@bento/forward) - React 19-compatible forwardRef utility
- [**internal-props**](./packages/@bento/internal-props) - Internal prop passing mechanism bypassing slot system restrictions
- [**slots**](./packages/@bento/slots) - Enable infinite component customization without exposing individual props
- [**svg-parser**](./packages/@bento/svg-parser) - Parse SVG strings into React elements with custom node transformations
- [**to-attribute-value**](./packages/@bento/to-attribute-value) - Serialize JavaScript values into HTML attribute-compatible strings
- [**types**](./packages/@bento/types) - Centralized TypeScript type definitions shared across Bento packages

### Dev Tooling

- [**storybook-addon-helpers**](./packages/dev/storybook-addon-helpers) - Auto-generate Storybook metadata from TypeScript types and JSDoc
- [**environment**](./packages/dev/environment) - Setup a custom environment for your Bento application

## Getting Started

See individual package READMEs for installation and usage instructions.

## Documentation

Documentation is powered by Storybook and a Next.js docs site.

**Storybook** — interactive component explorer:

```sh
npm run storybook
```

**Docs site** — full documentation site:

```sh
npm run site
```

Storybook is configured to automatically scan `packages/**` for `.mdx` and `.stories.{ts|tsx}` files, so documentation is co-located with the code.

Examples should be placed in each package's `examples` folder as individual component exports. This allows reuse in both Storybook documentation and tests.

## Development

### Prerequisites

- Node.js >= 24
- npm >= 11

### Setup

```sh
# Clone the repository
git clone https://github.com/godaddy/antares.git
cd antares

# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm run test
```

### Vitest in VS Code or Cursor

Run and debug component tests right from your editor with the [Vitest extension](https://marketplace.visualstudio.com/items?itemName=vitest.explorer) (`vitest.explorer`). Drop the snippet below into [`.vscode/settings.json`](./.vscode/settings.json) (or your user settings) and reload the window. It points the extension at `@godaddy/antares` and keeps it focused on the `SSR` and `Browser` projects, so your test runs stay quick:

```json
"vitest.rootConfig": "packages/@godaddy/antares/vitest.config.ts",
"vitest.cliArguments": "--project=SSR --project=Browser"
```

### Conventional Commits

The repo is configured only to accept conventional commits as commit syntax.
This is enforced using `@commitlint`.

### Changesets

When contributing changes to packages, you must include a changeset:

```sh
npm run changeset
```

Select the affected packages, choose the version bump type (patch/minor/major),
and write a description using conventional commit syntax (e.g., "fix: resolve issue",
"feat: add feature", "docs: update readme").

**Note:** Documentation changes in packages should use `patch` version bumps with
a `docs:` prefix, as they improve the published package for consumers and AI tooling.

The [Changeset Bot](https://github.com/apps/changeset-bot) will automatically comment on pull requests to remind you if a changeset is needed.

## Contributing

We welcome contributions from the community! Please read our [Contributing Guide](./CONTRIBUTING.md) to get started.

## License

MIT License - Copyright (c) 2025 GoDaddy Operating Company, LLC.

See [LICENSE.md](./LICENSE.md) for details.

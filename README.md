# 🍱 Bento

[![CI](https://github.com/godaddy/bento/actions/workflows/ci.yaml/badge.svg)](https://github.com/godaddy/bento/actions/workflows/ci.yaml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/node-%3E%3D23-brightgreen)](https://nodejs.org/)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)](https://github.com/godaddy/bento)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![Changesets](https://img.shields.io/badge/maintained%20with-changesets-blue)](https://github.com/changesets/changesets)

A component library of accessibility primitives for building React design systems.

Bento provides unstyled, accessible building blocks built on [React Aria](https://react-spectrum.adobe.com/react-aria/) that you can use to create your own component library or design system. It embodies the "Primitives" concept - fundamental, highly customizable components with no business logic.

## 📦 Getting Started

See individual package READMEs in [`packages/`](./packages) for installation and usage instructions.

## 📖 Documentation

Our documentation is powered by Storybook and can be started by running:

```sh
npm run storybook
```

From inside of the `apps/docs` folder. Storybook is configured to automatically
scan our `packages/**` folder for `.mdx` and `.stories.{ts|tsx}` files. This
allows our documentation to be co-located with the actual code.

The examples that are part of the Storybook documentation should be placed in
the `examples` folder as individual component exports. This allows us to re-use
the examples as part of our testing strategy, as well as run tests against
our examples folder to ensure our documentation and examples are always up to
date and working as expected.

## 🛠️ Development

### Prerequisites

- Node.js >= 23
- npm >= 10

### Setup

```sh
# Clone the repository
git clone https://github.com/godaddy/bento.git
cd bento

# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm run test
```

### 📝 Conventional Commits

The repo is configured only to accept conventional commits as commit syntax.
This is enforced using `@commitlint`.

### 📦 Changesets

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

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guide](./CONTRIBUTING.md) to get started.

## 📄 License

MIT License - Copyright (c) 2025 GoDaddy Operating Company, LLC.

See [LICENSE.md](./LICENSE.md) for details.

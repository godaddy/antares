# 🍱 Bento

Bento is a component library built to support our GoDaddy design system. It is a
collection of reusable components (i.e., primitives) that can be used to build
more complex components.

## 🛠️ Development

```sh
npm install .
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

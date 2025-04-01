***REMOVED***🍱 Bento

Bento is a component library built to support our GoDaddy design system. It is a
collection of reusable components (i.e., primitives) that can be used to build
more complex components.

#***REMOVED***🛠️ Development

```sh
npm install .
```

##***REMOVED***📝 Conventional Commits

The repo is configured only to accept conventional commits as commit syntax.
This is enforced using `@commitlint`.

#***REMOVED***📖 Documentation

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

# Documentation

This application contains our documentation site which is powered by Storybook.

## Preview

In order to preview the documentation simply run the following command:

```sh
npm run storybook
```

The application is configured to not open a browser window every time you start
the documentation application. The message in your console will tell you the
what port number the application is hosted on. Defaults to <http://localhost:6006/>

## Adding new components

Storybook is configured to automatically detect the following files in the
`packages/<package-name>` folders:

- `*.mdx` Any MDX file that is present in the package will automatically be
  added to the documentation. A package should expose the following pages:
  - `README.mdx` The main entry point of the documentation page for the package
    or component that you're building.
  - `CONCEPTS.mdx` An optional file that introduces consumers of the framework
    to the concepts or patterns that a given package introduces. It teaches
    consumers on how to use these patterns while the `README.mdx` files focuses
    on how to build and use the package.
- `<package-name>.stories.tsx` The purpose of this file is to import the
  various of `examples/*` files into Storybook so they can be referenced through
  the above mentioned `.mdx` files. This should just be seen as a translation
  layer, you should not be writing any examples inside these files.

### Examples

As mentioned above, you should not be writing working examples inside your
`.stories.tsx` files, you should instead be creating isolated example files
in pure JSX/TypeScript. These examples can then be re-used for testing to
ensure that the examples that we present in our documentation are fully tested
and working as intended.

### Story Title Naming Conventions

Story titles follow the format `[category]/[element]` where:
- `[category]` (components, hooks, utility, internal) is always lowercase
- `[element]` uses **PascalCase** for React Components, **dash-case** for everything else

**PascalCase** - React Components:
- `components/Button`
- `components/VisuallyHidden`

**dash-case** - hooks, utilities, and other non-components:
- `hooks/use-props`
- `utility/to-attribute-value`
- `internal/box`
- `higher-order components/slots`

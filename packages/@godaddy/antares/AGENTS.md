# @godaddy/antares

Guide for working in the Antares component library package.

## Component work

For component source, examples, tests, stories, docs, layout, styling, and RAC integration, invoke the `antares-components` skill. It is the source of truth for the component recipe, props, CSS and token/intent fallbacks, testing, examples, stories, README, and accessibility conventions.

## Build/Test

Run tasks through Nx, scoped to `@godaddy/antares` (prefix with the package manager, e.g. `npm exec nx`; don't run these on other workspaces):

```sh
npm exec nx run @godaddy/antares:typecheck
npm exec nx run @godaddy/antares:lint
npm exec nx run @godaddy/antares:build
npm exec nx run @godaddy/antares:test
```

See the `antares-components` skill for testing conventions, coverage, and the snapshot/visual update commands.

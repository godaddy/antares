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

- Three Vitest projects: `*.node.test.tsx` (SSR snapshots via `renderToString`), `*.browser.test.tsx` (interactions via `vitest-browser-react`), `*.visual.test.tsx` (visual regression). Coverage threshold: 100%.
- Update node snapshots when they legitimately change: `npm exec nx run @godaddy/antares:test:node:update`.
- Visual tests run in CI on the cloud — skip locally unless inspecting: `npm exec nx run @godaddy/antares:test:visual` (`:test:visual:update` to refresh baselines).

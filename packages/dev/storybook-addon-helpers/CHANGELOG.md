# @bento/storybook-addon-helpers

## 0.3.1

### Patch Changes

- Extract props from qualified type names (`React.FC`) and from `ForwardRefExoticComponent`, `ComponentType`, `ExoticComponent`, and `NamedExoticComponent`. Components re-exported straight from a built `.d.ts`, such as `FileTrigger`, previously documented no props at all.

  Also drop imports left unused after the CSF transform rewrites a stories file, and fail the build when a generated example story is named after a binding the file still declares, instead of emitting two declarations of that name. ([#308](https://github.com/godaddy/bento/pull/308) by @egaitan-godaddy)

## 0.3.0

### Minor Changes

- introduces `getExamples` helper for auto-generated examples documentation ([#288](https://github.com/godaddy/bento/pull/288) by @egaitan-godaddy)

## 0.2.0

### Minor Changes

- - Add AST-based prop docs engine with `./docs` and `./runtime` exports for Fumadocs and Next.js sites.
  - Add ability to filter, order, and categorize props with type-checked keys. ([#253](https://github.com/godaddy/bento/pull/253) by @egaitan-godaddy)

## 0.1.1

### Patch Changes

- feat: remove styles from @bento/icon and fix build issues in antares ([#162](https://github.com/godaddy/bento/pull/162) by @rmarkins-godaddy)

## 0.1.0

### Minor Changes

- chore: configure automated release workflow with changesets and GitHub Actions ([#168](https://github.com/godaddy/antares/pull/168) by @kbader-godaddy)

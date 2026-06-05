# @bento/types

## 0.1.1

### Patch Changes

- fix: correct tsdown migration issues and indeterminate checkbox group behavior

  - `@bento/checkbox`: rewrite indeterminate-group example to drive selection through the group's `value`/`onChange` exclusively, eliminating the mixed-control pattern that prevented `data-value` from settling. Update browser test to click the underlying `input` element so react-aria's press handler fires correctly.
  - `@bento/types`: point the `types` export entry to `dist/index.d.mts` to match the actual file emitted by tsdown for ESM-only packages.
  - `@godaddy/antares`: add explicit `include` to `tsconfig.json` so tsgo does not walk `tsdown.config.ts` and emit stray declaration files into sibling package source directories. ([#205](https://github.com/godaddy/bento/pull/205) by @rmarkins-godaddy)

## 0.1.0

### Minor Changes

- chore: configure automated release workflow with changesets and GitHub Actions ([#168](https://github.com/godaddy/antares/pull/168) by @kbader-godaddy)

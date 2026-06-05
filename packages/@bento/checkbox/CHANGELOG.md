# @bento/checkbox

## 0.2.3

### Patch Changes

- feat(antares): add drawer, inline-drawer, also dep fixes for react-aria and react-aria-compoennts ([#186](https://github.com/godaddy/bento/pull/186) by @rmarkins-godaddy)
- fix: correct tsdown migration issues and indeterminate checkbox group behavior

  - `@bento/checkbox`: rewrite indeterminate-group example to drive selection through the group's `value`/`onChange` exclusively, eliminating the mixed-control pattern that prevented `data-value` from settling. Update browser test to click the underlying `input` element so react-aria's press handler fires correctly.
  - `@bento/types`: point the `types` export entry to `dist/index.d.mts` to match the actual file emitted by tsdown for ESM-only packages.
  - `@godaddy/antares`: add explicit `include` to `tsconfig.json` so tsgo does not walk `tsdown.config.ts` and emit stray declaration files into sibling package source directories. ([#205](https://github.com/godaddy/bento/pull/205) by @rmarkins-godaddy)

<details>
<summary>Updated dependencies</summary>

- @bento/use-props@0.2.3
- @bento/input@0.1.1
</details>

## 0.2.2

### Patch Changes

<details>
<summary>Updated dependencies</summary>

- @bento/icon@0.2.0
</details>

## 0.2.1

### Patch Changes

- Adds @bento/input to the repo and to the @bento/checkbox and @bento/radio primitives. ([#54](https://github.com/godaddy/antares/pull/54) by @amarques-godaddy)

<details>
<summary>Updated dependencies</summary>

- @bento/slots@0.3.0
- @bento/use-props@0.2.1
- @bento/input@0.1.0
- @bento/container@0.2.1
- @bento/icon@0.1.4
- @bento/visually-hidden@0.1.1
</details>

## 0.2.0

### Minor Changes

- Radio and Checkbox redesign with improved architecture to better support the composition pattern we expect with Bento ([#33](https://github.com/godaddy/antares/pull/33) by @egaitan-godaddy)

### Patch Changes

<details>
<summary>Updated dependencies</summary>

- @bento/use-props@0.2.0
- @bento/slots@0.2.0
- @bento/visually-hidden@0.1.0
- @bento/container@0.2.0
- @bento/icon@0.1.3
</details>

## 0.1.3

### Patch Changes

- Adds documentation to all packages; no API or functionality changes. ([#23](https://github.com/godaddy/antares/pull/23) by @kawikabader)

<details>
<summary>Updated dependencies</summary>

- @bento/control@0.1.2
- @bento/use-data-attributes@0.1.1
- @bento/use-props@0.1.1
- @bento/slots@0.1.3
- @bento/icon@0.1.2
</details>

## 0.1.2

### Patch Changes

- fix: slot namespaces now resolved relative to the slotted component, also updated slot tests across multiple components ([b9ddb93](https://github.com/godaddy/antares/commit/b9ddb932628bf84b5b3c969aa7f08dcf6b58ade6))

<details>
<summary>Updated dependencies</summary>

- @bento/slots@0.1.2
</details>

## 0.1.1

### Patch Changes

<details>
<summary>Updated dependencies</summary>

- @bento/control@0.1.1
- @bento/slots@0.1.1
- @bento/icon@0.1.1
</details>

## 0.1.0

### Minor Changes

- chore: configure automated release workflow with changesets and GitHub Actions ([#168](https://github.com/godaddy/antares/pull/168) by @kbader-godaddy)

### Patch Changes

<details>
<summary>Updated dependencies</summary>

- @bento/use-data-attributes@0.1.0
- @bento/use-props@0.1.0
- @bento/control@0.1.0
- @bento/slots@0.1.0
- @bento/icon@0.1.0
</details>

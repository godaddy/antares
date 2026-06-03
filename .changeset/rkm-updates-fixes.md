---
'@bento/checkbox': patch
'@bento/types': patch
'@godaddy/antares': patch
---

fix: correct tsdown migration issues and indeterminate checkbox group behavior

- `@bento/checkbox`: rewrite indeterminate-group example to drive selection through the group's `value`/`onChange` exclusively, eliminating the mixed-control pattern that prevented `data-value` from settling. Update browser test to click the underlying `input` element so react-aria's press handler fires correctly.
- `@bento/types`: point the `types` export entry to `dist/index.d.mts` to match the actual file emitted by tsdown for ESM-only packages.
- `@godaddy/antares`: add explicit `include` to `tsconfig.json` so tsgo does not walk `tsdown.config.ts` and emit stray declaration files into sibling package source directories.

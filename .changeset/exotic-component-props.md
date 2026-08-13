---
'@bento/storybook-addon-helpers': patch
---

Extract props from qualified type names (`React.FC`) and from `ForwardRefExoticComponent`, `ComponentType`, `ExoticComponent`, and `NamedExoticComponent`. Components re-exported straight from a built `.d.ts`, such as `FileTrigger`, previously documented no props at all.

Also drop imports left unused after the CSF transform rewrites a stories file, and fail the build when a generated example story is named after a binding the file still declares, instead of emitting two declarations of that name.

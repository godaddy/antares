# Internal vs Public API PDR

## Table of Contents

- [Problem](#problem)
- [Current State](#current-state)
- [Proposed Solutions](#proposed-solutions)
  - [Convention: _internal/ Folders](#convention-_internal-folders)
  - [Convention: @internal Tags](#convention-internal-tags)
  - [When to Use Which](#when-to-use-which)
  - [Docs Site: URL Param Toggle](#docs-site-url-param-toggle)
- [Scope](#scope)
- [Examples from the Repo](#examples-from-the-repo)
- [Resolved Questions](#resolved-questions)
- [Open Questions](#open-questions)

---

## Problem

We don't have a single rule for what's internal vs public. Some components, hooks, and utils are exported from the package (public API), others live in the repo but aren't exported (chart pieces like Tooltip, Legend, AxisTitle), and a few are exported but documented as "internal use only" in the README. The docs site doesn't distinguish between them either.

Ideally, consumers would only see the public API on the docs site. But we as maintainers still need access to internal component docs without losing grouping context.

## Current State

Today we have four internal chart pieces that aren't exported from the package:

| Component | Path | How it's marked internal |
| --------- | ---- | ---------------------- |
| `Legend` | `components/chart/legend/` | README.mdx prose, omitted from barrel |
| `Tooltip` | `components/chart/tooltip/` | README.mdx prose, omitted from barrel |
| `AxisTitle` | `components/chart/axis-title/` | README.mdx prose, omitted from barrel |
| `useChartColor` | `components/chart/use-chart-color/` | README.mdx prose, omitted from barrel |

We also have `FieldFrame` (`components/field-frame/`), which is documented as internal in its README but IS exported from the barrel file. This is a different case: it's part of the public API surface despite being intended for internal composition by field components (TextField, NumberField, etc).

We also have shared chart types (`components/chart/types.ts`) and utils (`components/chart/utils.ts`) that aren't exported.

**What's working:**

- **Export control**: internal components are omitted from `packages/uxcore/index.tsx`, so consumers can't import them
- **Documentation**: each internal README.mdx has an "Internal Component" heading with bold "internal-only" text

**What's not working:**

- **Folder structure**: internal components sit alongside where public chart components would go, no visual separation
- **Storybook**: shows everything, no filtering between internal and public
- **Docs site**: not yet distinguishing internal from public
- **Consistency**: the only signal is prose in README.mdx, which requires reading the file to discover

## Proposed Solutions

### Convention: `_internal/` Folders

It may be ideal to move internal components into an `_internal/` subfolder within their parent scope.

Here's what the chart directory looks like today vs what it would look like:

**Before (current):**

```text
components/chart/
  axis-title/        ← internal, but nothing signals that
  legend/            ← internal, but nothing signals that
  tooltip/           ← internal, but nothing signals that
  use-chart-color/   ← internal, but nothing signals that
  types.ts
  utils.ts
```

**After:**

```text
components/chart/
  _internal/
    axis-title/
    legend/
    tooltip/
    use-chart-color/
  types.ts
  utils.ts
```

**Why this approach may work well:**

- Intent is visible at a glance in any tool (IDE, GitHub, file browser) without reading metadata
- Easy to glob-match for tooling: `**/_internal/**` covers lint rules, Storybook filters, doc generators
- Underscore prefix is a well-known convention (Python, Sass)
- Barrel file omission remains the enforcement mechanism, folder structure is the signal

### Convention: `@internal` Tags

For finer-grained cases, use the [`@internal`](https://typedoc.org/documents/Tags._internal.html) TSDoc tag. This covers scenarios where an entire folder doesn't make sense, like a single exported component with props intended only for internal composition.

```ts
// components/field-frame/src/index.tsx
export interface FieldFrameProps {
  /** @internal Used by TextField, NumberField, etc. */
  __inputRef?: React.Ref<HTMLInputElement>;
}
```

**Why this complements folders:**

- Lower friction for individual exports or props vs creating a folder for one item
- TypeScript's [`stripInternal`](https://www.typescriptlang.org/tsconfig/#stripInternal) can omit `@internal` members from `.d.ts` output
- [fumadocs supports `@internal`](https://fumadocs.dev) to hide fields from generated type docs
- [MUI uses both patterns](https://github.com/mui/material-ui/tree/master/packages/mui-material/src/internal): `internal/` folders for grouped components, `@internal` tags on individual props

### When to Use Which

| Signal | Use when | Example |
| ------ | -------- | ------- |
| `_internal/` folder | A cluster of related internal modules lives under one parent | `chart/_internal/legend/`, `chart/_internal/tooltip/` |
| `@internal` tag | A single export, prop, or type within an otherwise public module | `FieldFrameProps.__inputRef`, a helper type re-exported for tests |

Both mechanisms can coexist. The folder is the coarse signal (visible in file trees, glob-friendly for tooling). The tag is the fine signal (visible in source, supported by TypeScript and doc generators).

### Docs Site

For the docs site, the internal components will always be hidden.

### Storybook Site

For the Storybook site, the stories with the tag `internal` will be hidden by default and can be shown using the Search filters.

## Scope

This covers chart internals only (Legend, AxisTitle, Tooltip, useChartColor). The `_internal/` convention could appear at any level (e.g. `components/chart/_internal/`, `components/_internal/`), but only the chart case is in scope here.

## Examples from the Repo

### What changes for internal component authors

Today, Legend imports shared chart types via a relative path:

```ts
// components/chart/legend/src/index.tsx (current)
import type { SeriesConfig } from '../../types.ts';
```

After the move, the relative path changes:

```ts
// components/chart/_internal/legend/src/index.tsx (proposed)
import type { SeriesConfig } from '../../../types.ts';
```

The `#components/*` subpath mapping in package.json already supports `_internal/` nesting because Node's subpath pattern `*` matches across `/` separators.

### What changes for internal component consumers

Today there are no in-repo consumers importing chart internals via subpath (chart components haven't landed yet). When they do, the import would look like:

```ts
// Inside a future chart component
import { Legend } from '#components/chart/_internal/legend';
import { useChartColor } from '#components/chart/_internal/use-chart-color';
```

External consumers can't import internal components because they're not in the barrel file (`index.tsx`).

### What changes for README.mdx files

Today each internal component has a manual prose section, e.g. from `legend/README.mdx`:

```mdx
## Internal Component

This component is **internal-only** and not exported from the package.
It is designed for use within chart components.
```

With the `_internal/` folder convention, the path itself signals intent. We could keep the prose for clarity or drop it since the folder makes it obvious. Either way, the docs site would use the file path (not the prose) to filter.

### What stays the same

The barrel file (`packages/uxcore/index.tsx`) already omits internal components, nothing changes here. For reference, here's a snippet of what's exported today:

```ts
// packages/uxcore/index.tsx (unchanged)
export { Button, type ButtonProps, LinkButton, type LinkButtonProps } from '#components/button';
export { Text, type TextProps } from '#components/text';
export { Box, type BoxProps, type BoxOwnProps } from '#components/layout/box';
// ...no chart internals exported
```

### Identifying internal vs public

When creating a new component, the choice is binary: if consumers need it, export it from the barrel file and place it at the top level. Otherwise, place it under `_internal/`. For individual props or types that are exported but not meant for consumer use, tag them with `@internal` in their JSDoc comment.

## Resolved Questions

**Should `_internal/` folders get their own barrel file?**
Probably not. Only 3-4 internal chart components today. Direct imports (`#components/chart/_internal/legend`) are explicit and grep-friendly. We can revisit if the count grows.

**Should Storybook also filter internal components by default?**
Yes. Storybook is consumer-facing, so internal components should be hidden by default. Storybook's [`tags` config](https://storybook.js.org/docs/api/main-config/main-config-tags) with `defaultFilterSelection: 'exclude'` on a custom `internal` tag handles this natively. Stories in `_internal/` folders set `tags: ['internal']` at the meta level; Storybook hides them from the sidebar while keeping them accessible via the filter menu.

**Should we use `@internal` tags instead of `_internal/` folders?**
Both. Folders handle clusters of internal modules (one glob config vs per-file tagging). Tags handle finer-grained cases like individual props or single internal exports within public modules. This mirrors [MUI's approach](https://github.com/mui/material-ui/tree/master/packages/mui-material/src/internal).

## Follow-up

- Update `packages/uxcore/AGENTS.md` Component Recipe with the `_internal/` and `@internal` conventions
- Evaluate enabling [`stripInternal`](https://www.typescriptlang.org/tsconfig/#stripInternal) in tsconfig to omit `@internal` members from `.d.ts` output

## Open Questions

None at this time.

## References

- [Original discussion](https://github.com/gdcorp-uxp/uxcore/pull/83)

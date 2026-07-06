# Storybook Addon Helpers — Props Extraction Rewrite

**Date:** 2026-07-06
**Package:** `@bento/storybook-addon-helpers`
**Status:** Design approved, pending spec review

## Summary

Rewrite `@bento/storybook-addon-helpers` from scratch to give story authors a
type-safe way to **filter, group, and sort** documented props, and to **remove
`react-docgen-typescript`** — replacing it with a custom, shallow AST parser
that also resolves inherited props through `node_modules` (e.g. React Aria
Components `extends` chains).

This is a **greenfield rewrite**: all existing `src/` and `test/` files are
deleted and rebuilt. There is **no backward-compatibility constraint** — the
package's consumers (Vite config, `.stories.tsx` files) will be updated as part
of the migration.

## Goals

- Authors configure prop documentation per story via a **type-safe options
  object** (prop-name keys autocompleted and type-checked).
- Support **filtering** (allowlist / blocklist), **sorting** (explicit order +
  sensible fallback), and **grouping** (Storybook categories).
- **Remove `react-docgen-typescript`.** It builds a TypeScript `Program` per
  file, which is slow — especially when digging through `node_modules`.
- Extract inherited props **through `node_modules`** (RAC `extends` chains,
  intersections, `Omit`/`Pick`) so component prop tables are complete.
- Emit a **tool-agnostic prop-docs model** with a Storybook adapter, so the same
  engine can later feed other consumers (e.g. fumadocs) without rework.

## Non-Goals

- **No `ts.Program` / TypeChecker.** Its load time is the reason for the
  rewrite. The parser is manual, AST-based, and intentionally shallow — it does
  not aim for 100% type-resolution fidelity.
- **No fumadocs wiring in this effort.** The neutral model is designed so
  `apps/site` *could* adopt it later, but `apps/site/lib/filtered-generator.ts`
  is left untouched for now. Only the Storybook adapter ships.
- **No automatic grouping.** Grouping is manual (author-declared) only. Auto
  categorization by declaring interface is out of scope.

## Public API

Two getters, one shared extraction engine. Both take an optional, type-safe
options object.

```ts
interface DocsOptions<P> {
  /** Allowlist — only these props are documented. Mutually exclusive with exclude. */
  include?: (keyof P)[];
  /** Blocklist — all props except these. Mutually exclusive with include. */
  exclude?: (keyof P)[];
  /** Pin these props first, in this order. Unlisted props follow (see Sorting). */
  order?: (keyof P)[];
  /** Group label -> props in that group. Maps to Storybook table.category. */
  groups?: Record<string, (keyof P)[]>;
}

// Pass a component value; the engine resolves its props type from the signature.
getComponentDocs<C>(component: C, options?: DocsOptions<ComponentProps<C>>): StoryObj<C>;

// Pass any type (interface OR type alias). Renamed from getInterfaceDocs.
getTypeDocs<T>(options?: DocsOptions<T>): StoryObj<T>;
```

`include` and `exclude` are **mutually exclusive** — enforced at the type level
(the options parameter is a union so both cannot be supplied together).

### Rename: `getInterfaceDocs` → `getTypeDocs`

`getInterfaceDocs` is a misnomer — it accepts (and after the rewrite, fully
handles) both `interface` declarations and `type` aliases. Its real-world uses
document API/context/args types (`SlotsContext`, `EnvContext`, `StoreType`,
`Slots`, `BentoErrorArgs`), not just component props — so `getPropDocs` would be
wrong. `getTypeDocs` is the honest umbrella name.

### Dropped: `Pick`/`Omit` generic feature

The `getInterfaceDocs<Pick<Props, 'a' | 'b'>>()` / `Omit<...>` **user-facing
generic** feature is removed entirely — from the getters and from the parser's
transform logic (`filterInterfaceArgTypes`, `extractUnionKeys`, and the
`Pick`/`Omit` branch). `include` / `exclude` replace it.

> Note: this is distinct from the *parser's internal* ability to resolve
> `Pick`/`Omit` when it encounters them inside a resolved type definition (see
> Extraction Engine) — that stays, because RAC types use them heavily.

### The other getters

`getMeta`, `getStory`, `getVariants` are re-implemented in the new structure.
Their observable behavior (and the CSF transform that rewrites them into
Storybook story objects) is preserved; consumers are updated only where
signatures change. They are not the focus of this effort.

## Architecture

Layered so the extraction engine is independent of Storybook:

```
src/
  types.ts                 PropDoc, PropsDoc, DocsOptions
  engine/
    resolve.ts             import/module resolution + parsed-file cache
    component-type.ts      resolve a component value -> its props type node
    utility-types.ts       Pick / Omit / Partial / Required resolution
    jsdoc.ts               description + @default extraction
    extract.ts             core: type node -> PropDoc[] (shallow AST walk)
  process.ts               filter + sort + group over PropDoc[]
  adapters/
    storybook.ts           toStorybookArgTypes(doc) -> { argTypes }
  storybook/
    getters.ts             getMeta/getStory/getVariants/getComponentDocs/getTypeDocs
    getters-parser.ts      static reading of getter calls + options literal
    csf-transformer.ts     rewrites getter calls; emits argTypes via adapter
    plugin.ts              Vite plugin (load hook)
    indexer.ts             stories indexer
  index.ts                 public exports
```

Data flow:

```
.stories.tsx  --(Vite load)-->  csf-transformer
                                     |
                    reads getter call + options literal (AST)
                                     v
                              engine.extract  --> PropDoc[]  (all props, incl. node_modules)
                                     v
                              process(filter, sort, group)  --> PropsDoc
                                     v
                              toStorybookArgTypes  --> { tags:['!dev'], argTypes }
                                     v
                              emitted into the transformed story
```

## Neutral Model

Tool-agnostic. The engine + `process` produce this; adapters translate it.

```ts
interface PropDoc {
  name: string;
  type: string;               // type text, e.g. "'primary' | 'secondary'"
  required: boolean;
  description?: string;
  defaultValue?: string | null;
  group?: string;             // category label, if grouped
  sourceFile?: string;        // declaring file path (provenance / debug)
  declaringType?: string;     // declaring interface/alias name (provenance / debug)
}

interface PropsDoc {
  name: string;               // the documented component/type name
  props: PropDoc[];           // already filtered + sorted + grouped, in render order
}
```

`props` is an **ordered array** (not a keyed object) so sort order is
first-class and lossless.

## Extraction Engine (shallow, manual AST)

No `ts.Program`. Uses `ts.createSourceFile` + manual module resolution
(`ts.resolveModuleName`). Parsed source files are **cached by resolved absolute
path** and reused across the whole build. A `visited` set guards circular
`extends`.

### Resolving the starting type node

- **`getTypeDocs<T>()`** — `T` is a type reference; resolve its declaration
  (interface or type alias), local or imported.
- **`getComponentDocs(Comp)`** — resolve `Comp`'s declaration, then read its
  props type from the signature, shallowly:
  - function / arrow component → first parameter's type annotation
  - `forwardRef<Ref, Props>` → 2nd type argument
  - `FC<Props>` / `FunctionComponent<Props>` → type argument
  - feed the resulting type into the same extractor.

### Shapes handled

- `interface X { ... }` with `extends A, B` — recurse each parent, including
  into `node_modules`.
- `type X = { ... }` — type literal.
- `type X = A & B & { ... }` — intersection; walk each member.
- References to other interfaces / aliases — resolve + recurse, across imports
  into `node_modules` `.d.ts`.
- Utility wrappers when encountered inside a resolved type:
  - `Pick<T, K>` — resolve `T`'s members, keep keys in `K`.
  - `Omit<T, K>` — resolve `T`'s members, drop keys in `K`.
  - `Partial<T>` — resolve `T`, mark all members optional.
  - `Required<T>` — resolve `T`, mark all members required.
  - `K` is read as a string-literal union. `keyof U` is best-effort (resolve
    `U`'s keys; if not resolvable, skip that subtraction).

### Shapes skipped (shallow — logs a debug note, never throws)

- Mapped types, conditional types, unions of object literals, arbitrary generic
  instantiation. Their members simply don't appear.

### node_modules reach

When a parent or reference resolves to a package (e.g. `@react-types/shared`),
resolve it to its `.d.ts` and parse just that file. `.d.ts` files are cheap to
parse, and caching prevents re-parsing shared bases.

### Per-prop extraction

For each property signature: `name`, `required` (from `?` optionality, adjusted
by `Partial`/`Required`), `description` (leading JSDoc), `defaultValue` (`@default`
JSDoc tag), `type` (type node text), plus `sourceFile` and `declaringType`.

### Error handling

Unresolved symbols or unsupported shapes degrade gracefully — return partial or
empty results and optionally log a debug note. The build is never broken by an
extraction failure.

## Processing: filter → sort → group

Applied in fixed order over `PropDoc[]`:

1. **Filter**
   - `include` set → keep only those props (allowlist).
   - else `exclude` set → drop those props (blocklist).
   - else → keep all (including `node_modules`-inherited props). No default
     exclusion of DOM/CSS/ARIA props.
2. **Sort**
   - Props named in `order` come first, in the given order.
   - Remaining props follow: required-first, then alphabetical.
   - Sorting is applied **within each group** when `groups` is used.
3. **Group**
   - Each prop listed under a `groups` label gets `group = <label>`.
   - Props in no group get `group = undefined` (ungrouped).

## Storybook Adapter

`toStorybookArgTypes(doc: PropsDoc): { tags: string[]; argTypes: Record<string, ArgType> }`

- Iterates `doc.props` in order, building the `argTypes` object with matching key
  insertion order (Storybook renders in insertion order).
- Each `PropDoc` maps to:
  ```ts
  {
    name, description, required,
    type: { name: type, required },
    table: {
      defaultValue: { summary: defaultValue ?? null },
      category: group,            // omitted when ungrouped
    },
  }
  ```
- Emits `tags: ['!dev']` alongside `argTypes`, matching current behavior.

## Testing (all new, independent)

- **engine/extract**: interface + `extends`; intersection; type literal;
  `Pick`/`Omit`/`Partial`/`Required`; reference resolution.
- **node_modules resolution**: a fixture package under `test/fixtures`
  simulating an installed dependency, plus one integration check against a real
  RAC type to prove `node_modules` reach.
- **engine/component-type**: function param, `forwardRef`, `FC` resolution.
- **process**: filter (include / exclude / default), sort (order + fallback,
  within-group), group.
- **adapters/storybook**: `toStorybookArgTypes` shape, order preservation,
  `table.category` mapping, ungrouped omission.
- **csf-transformer**: end-to-end — a story file with `getComponentDocs` /
  `getTypeDocs` (with options) transforms to the expected argTypes literal.

## Migration

1. Remove `react-docgen-typescript` from `package.json`; run `npm install`
   (`--ignore-scripts` in sandbox) to sync the lockfile.
2. Delete all existing `src/` and `test/` files; build the new structure.
3. Rename all `getInterfaceDocs` usages → `getTypeDocs` (19 call sites).
4. Convert the 3 `Pick`/`Omit` generic call sites (`error`, `box`, `slots`) to
   `getTypeDocs<Props>({ include: [...] })`.
5. Update `apps/docs/.storybook` / Vite wiring if any signature changed.
6. Verify: typecheck, lint, run the package test suite, and build the docs
   Storybook to confirm stories render with correct prop tables.

## Open Risks

- **Shallow parser gaps**: exotic RAC type shapes (deep conditional/mapped
  types) may yield incomplete prop sets. Acceptable per "shallow"; the fixture +
  real-RAC integration test bounds the risk and documents what's covered.
- **Module resolution edge cases**: monorepo/workspace symlinks and `.d.ts`
  layout. Mitigated by reusing TypeScript's `resolveModuleName` and caching.

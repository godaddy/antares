# Fumadocs Props Adapter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `apps/site` (Fumadocs) generate its prop tables from the same engine and the same `*.stories.tsx` files Storybook uses, by adding a Fumadocs adapter parallel to `toStorybookArgTypes`, and retire the site's separate `fumadocs-typescript` generator.

**Architecture:** The `@bento/storybook-addon-helpers` package already has a target-agnostic pipeline `extract → neutral PropsDoc → adapter`. Today only the Storybook adapter exists, and the site runs a wholly separate `fumadocs-typescript` generator with duplicated, divergent filtering/categorization. We lift the "parse a `getComponentDocs`/`getTypeDocs` call → processed `PropsDoc`" core into a Storybook-free module (`src/docs.ts`), add a `toFumadocsPropTable` adapter, expose both via a new Storybook-free `./docs` subpath export, and rewire the site's `remarkArgTypes` plugin to call them. The stories file becomes the single source of truth for both targets.

**Tech Stack:** TypeScript compiler API (parse-only AST, no type-checker), tsdown (bundler), Vitest (`*.node.test.ts`), Next.js 16 + Fumadocs MDX (remark plugins), React.

## Global Constraints

- Node/TS engine is **parse-only** (`ts.createSourceFile`), never a `ts.Program`/type-checker. No new heavy type resolution.
- **Pure parity, no site-only filtering.** The stories file's `include`/`exclude`/`primary`/`categories`/`overrides` are the *only* prop controls. Do not reintroduce aria/DOM/csstype/no-description filters anywhere.
- Never use the em dash (`—`); use a hyphen (`-`).
- Internal workspace deps use **caret ranges** (`^`), imported by package name.
- Commits: one-line Conventional Commits, **no** `Co-Authored-By` trailer. In this repo commit with `git commit --no-verify` after running typecheck/lint/relevant tests manually (the pre-commit hook runs the full uncached suite and is too slow).
- Run `npm install` after any `package.json` edit; in this sandbox use `npm install --ignore-scripts`.
- Package public entry `.` stays Storybook-only; the new `./docs` entry must import **zero** Storybook runtime.
- Site Vitest enforces **100% coverage** (statements/functions/branches/lines) for `lib/**`. Every new/changed `lib` branch needs a test.

**Paths (absolute base):** repo root is `/Users/goerwin/.supacode/repos/antares/refactor-storybook-helpers`.
- Package: `packages/dev/storybook-addon-helpers` (referred to below as `PKG`)
- Site: `apps/site` (referred to below as `SITE`)
- Component fixtures: `packages/@godaddy/antares/components`

---

## File Structure

**Package (`PKG`):**
- Create `src/docs.ts` - Storybook-free orchestration: `docFromCall` (shared core) + `resolvePropsDoc` (export-name lookup). Re-exports the Fumadocs adapter + doc types.
- Create `src/adapters/fumadocs.ts` - `toFumadocsPropTable(doc)` + `FumadocsPropEntry`/`FumadocsPropTable` types.
- Modify `src/types.ts` - add optional `deprecated` to `PropDoc`.
- Modify `src/engine/jsdoc.ts` - read `@deprecated`.
- Modify `src/engine/extract.ts` - set `deprecated: true` on props only when the tag is present.
- Modify `src/storybook/csf-transformer.ts` - replace inline extract/process with `docFromCall`.
- Modify `tsdown.config.ts` - add `src/docs.ts` entry.
- Modify `package.json` - add `./docs` export map entry.
- Tests: `test/fumadocs-adapter.node.test.ts`, `test/docs.node.test.ts`, plus a fixture dir `test/fixtures/`. Update `test/jsdoc.node.test.ts`.

**Site (`SITE`):**
- Modify `lib/remark-arg-types.ts` - drop generator/fallback; call `resolvePropsDoc` + `toFumadocsPropTable`.
- Modify `components/prop-table.tsx` - render categories in given order (drop alphabetical sort).
- Modify `source.config.ts` - remove `fumadocs-typescript` generator + `remarkAutoTypeTable`.
- Modify `next.config.mjs` - make the webpack alias for the package exact (`$`) so the `./docs` subpath is not shadowed by the browser shim.
- Modify `package.json` - add `@bento/storybook-addon-helpers` dep; remove `fumadocs-typescript`.
- Delete `lib/filtered-generator.ts` + `test/filtered-generator.node.test.ts`.
- Rewrite `test/remark-arg-types.node.test.ts`.

---

## Task 1: Add `deprecated` to the neutral model (jsdoc + PropDoc + extract)

**Files:**
- Modify: `PKG/src/engine/jsdoc.ts`
- Modify: `PKG/src/types.ts:35-42` (the `PropDoc` interface)
- Modify: `PKG/src/engine/extract.ts:113-121` (the `extractMembers` push)
- Test: `PKG/test/jsdoc.node.test.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: `getPropJSDoc(node)` now returns `{ description?: string; defaultValue: string | null; deprecated: boolean }`. `PropDoc` gains optional `deprecated?: boolean`, present (`true`) only when the prop has an `@deprecated` tag.

- [ ] **Step 1: Update the jsdoc test to expect `deprecated`**

Replace the two existing `expect(getPropJSDoc(member)).toEqual({...})` assertions in `PKG/test/jsdoc.node.test.ts` and add a deprecation case. The file's final `describe` body becomes:

```ts
describe('getPropJSDoc', function getPropJSDocTests() {
  it('extracts description and default tag', function extractsDocs() {
    const member = getFirstProperty(`
      interface Props {
        /**
         * The visible label.
         * @default "Save"
         */
        label?: string;
      }
    `);

    expect(getPropJSDoc(member)).toEqual({
      description: 'The visible label.',
      defaultValue: '"Save"',
      deprecated: false
    });
  });

  it('returns undefined description and null default when docs are absent', function absentDocs() {
    const member = getFirstProperty(`
      interface Props {
        label: string;
      }
    `);

    expect(getPropJSDoc(member)).toEqual({
      description: undefined,
      defaultValue: null,
      deprecated: false
    });
  });

  it('flags props tagged @deprecated', function flagsDeprecated() {
    const member = getFirstProperty(`
      interface Props {
        /**
         * Old prop.
         * @deprecated use something else
         */
        legacy?: string;
      }
    `);

    expect(getPropJSDoc(member)).toEqual({
      description: 'Old prop.',
      defaultValue: null,
      deprecated: true
    });
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd packages/dev/storybook-addon-helpers && npx vitest run test/jsdoc.node.test.ts`
Expected: FAIL - existing cases fail on the new `deprecated` key; the new case errors because `deprecated` is missing.

- [ ] **Step 3: Implement `@deprecated` reading in `jsdoc.ts`**

Replace the body of `getPropJSDoc` in `PKG/src/engine/jsdoc.ts`:

```ts
export function getPropJSDoc(node: ts.Node): { description?: string; defaultValue: string | null; deprecated: boolean } {
  const docs = ts.getJSDocCommentsAndTags(node);
  const jsDoc = docs.find(ts.isJSDoc);
  const description = normalizeComment(jsDoc?.comment);
  const defaultTag = jsDoc?.tags?.find((tag) => tag.tagName.text === 'default');
  const deprecated = jsDoc?.tags?.some((tag) => tag.tagName.text === 'deprecated') ?? false;

  return {
    description,
    defaultValue: normalizeComment(defaultTag?.comment) ?? null,
    deprecated
  };
}
```

- [ ] **Step 4: Add `deprecated` to `PropDoc`**

In `PKG/src/types.ts`, add the field to the `PropDoc` interface (after `defaultValue`):

```ts
export interface PropDoc {
  name: string;
  type: string;
  required: boolean;
  description?: string;
  defaultValue?: string | null;
  deprecated?: boolean;
  category?: string;
  sourceFile?: string;
  declaringType?: string;
}
```

- [ ] **Step 5: Emit `deprecated` from `extract.ts` only when true**

In `PKG/src/engine/extract.ts`, inside `extractMembers`, change the `props.push({...})` to spread `deprecated` conditionally so non-deprecated props keep their existing shape (avoids churning other `toEqual` tests):

```ts
    const jsDoc = getPropJSDoc(member);
    props.push({
      name,
      type: member.type?.getText(sourceFile) ?? 'any',
      required: !member.questionToken,
      description: jsDoc.description,
      defaultValue: jsDoc.defaultValue,
      sourceFile: sourceFile.fileName,
      declaringType,
      ...(jsDoc.deprecated ? { deprecated: true } : {})
    });
```

- [ ] **Step 6: Run jsdoc + extract tests to verify they pass**

Run: `cd packages/dev/storybook-addon-helpers && npx vitest run test/jsdoc.node.test.ts test/extract.node.test.ts`
Expected: PASS (extract tests unchanged because non-deprecated props are unmodified).

- [ ] **Step 7: Commit**

```bash
cd /Users/goerwin/.supacode/repos/antares/refactor-storybook-helpers
git add packages/dev/storybook-addon-helpers/src/engine/jsdoc.ts packages/dev/storybook-addon-helpers/src/types.ts packages/dev/storybook-addon-helpers/src/engine/extract.ts packages/dev/storybook-addon-helpers/test/jsdoc.node.test.ts
git commit --no-verify -m "feat(storybook-addon-helpers): capture @deprecated in neutral prop docs"
```

---

## Task 2: `toFumadocsPropTable` adapter

**Files:**
- Create: `PKG/src/adapters/fumadocs.ts`
- Test: `PKG/test/fumadocs-adapter.node.test.ts`

**Interfaces:**
- Consumes: `PropsDoc`/`PropDoc` from `../types.ts` (with `deprecated` from Task 1).
- Produces:
  - `FumadocsPropEntry = { name: string; type: string; default?: string; description?: string; required: boolean; deprecated?: boolean }`
  - `FumadocsPropTable = { entries: FumadocsPropEntry[]; categories: Record<string, string[]> }`
  - `toFumadocsPropTable(doc: PropsDoc): FumadocsPropTable` - entries in `doc.props` order; `categories` keys inserted in first-seen order (which, after `processPropsDoc`, is category declaration order).

- [ ] **Step 1: Write the failing test**

Create `PKG/test/fumadocs-adapter.node.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { toFumadocsPropTable } from '../src/adapters/fumadocs.ts';

describe('toFumadocsPropTable', function toFumadocsPropTableTests() {
  it('maps neutral docs to entries + categories preserving order', function mapsDocs() {
    const result = toFumadocsPropTable({
      name: 'Thing',
      props: [
        { name: 'children', type: 'ReactNode', required: false, defaultValue: null },
        { name: 'onPress', type: '() => void', required: false, description: 'Fired on press.', category: 'Events' },
        { name: 'onChange', type: '() => void', required: false, category: 'Events' },
        { name: 'aria-label', type: 'string', required: false, category: 'ARIA' }
      ]
    });

    expect(result.entries).toEqual([
      { name: 'children', type: 'ReactNode', default: undefined, description: undefined, required: false, deprecated: undefined },
      { name: 'onPress', type: '() => void', default: undefined, description: 'Fired on press.', required: false, deprecated: undefined },
      { name: 'onChange', type: '() => void', default: undefined, description: undefined, required: false, deprecated: undefined },
      { name: 'aria-label', type: 'string', default: undefined, description: undefined, required: false, deprecated: undefined }
    ]);

    // Insertion order = declaration order after processing.
    expect(Object.keys(result.categories)).toEqual(['Events', 'ARIA']);
    expect(result.categories).toEqual({ Events: ['onPress', 'onChange'], ARIA: ['aria-label'] });
  });

  it('maps defaultValue and deprecated', function mapsExtras() {
    const result = toFumadocsPropTable({
      name: 'Thing',
      props: [{ name: 'size', type: "'sm' | 'lg'", required: true, defaultValue: "'sm'", deprecated: true }]
    });

    expect(result.entries[0]).toEqual({
      name: 'size',
      type: "'sm' | 'lg'",
      default: "'sm'",
      description: undefined,
      required: true,
      deprecated: true
    });
    expect(result.categories).toEqual({});
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd packages/dev/storybook-addon-helpers && npx vitest run test/fumadocs-adapter.node.test.ts`
Expected: FAIL with "Cannot find module '../src/adapters/fumadocs.ts'".

- [ ] **Step 3: Implement the adapter**

Create `PKG/src/adapters/fumadocs.ts`:

```ts
import type { PropsDoc } from '../types.ts';

/** A single prop entry shaped for the docs-site `<PropTable>` component. */
export interface FumadocsPropEntry {
  name: string;
  type: string;
  default?: string;
  description?: string;
  required: boolean;
  deprecated?: boolean;
}

/** Full prop table: ordered entries plus a category -> prop-name index. */
export interface FumadocsPropTable {
  entries: FumadocsPropEntry[];
  categories: Record<string, string[]>;
}

/**
 * Converts a processed neutral `PropsDoc` into the `{ entries, categories }`
 * shape consumed by the docs-site `<PropTable>`. Entries keep `doc.props`
 * order; category keys are inserted in first-seen order, which - after
 * `processPropsDoc` - is the category declaration order from the stories file.
 */
export function toFumadocsPropTable(doc: PropsDoc): FumadocsPropTable {
  const entries: FumadocsPropEntry[] = [];
  const categories: Record<string, string[]> = {};

  for (const prop of doc.props) {
    entries.push({
      name: prop.name,
      type: prop.type,
      default: prop.defaultValue ?? undefined,
      description: prop.description,
      required: prop.required,
      deprecated: prop.deprecated
    });

    if (prop.category) {
      (categories[prop.category] ??= []).push(prop.name);
    }
  }

  return { entries, categories };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd packages/dev/storybook-addon-helpers && npx vitest run test/fumadocs-adapter.node.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/goerwin/.supacode/repos/antares/refactor-storybook-helpers
git add packages/dev/storybook-addon-helpers/src/adapters/fumadocs.ts packages/dev/storybook-addon-helpers/test/fumadocs-adapter.node.test.ts
git commit --no-verify -m "feat(storybook-addon-helpers): add fumadocs prop-table adapter"
```

---

## Task 3: `docs.ts` - shared `docFromCall` + `resolvePropsDoc`

**Files:**
- Create: `PKG/src/docs.ts`
- Create fixtures: `PKG/test/fixtures/widget.tsx`, `PKG/test/fixtures/widget.stories.tsx`
- Test: `PKG/test/docs.node.test.ts`

**Interfaces:**
- Consumes: `extractComponentDocs`, `extractTypeDocs`, `createResolver`, `processPropsDoc`, `toLiteralValue`, `GET_COMPONENT_DOCS`/`GET_TYPE_DOCS`, and `toFumadocsPropTable` (Task 2).
- Produces:
  - `docFromCall(node: ts.CallExpression, sourceFile: ts.SourceFile, resolver?: Resolver): PropsDoc | undefined`
  - `resolvePropsDoc(input: { filePath?: string; code?: string; exportName: string }): Promise<PropsDoc | undefined>`
  - Re-exports `toFumadocsPropTable`, `FumadocsPropEntry`, `FumadocsPropTable`, and `export type * from './types.ts'`.

- [ ] **Step 1: Create the fixtures**

Create `PKG/test/fixtures/widget.tsx`:

```tsx
export interface WidgetProps {
  /** The visible label. */
  label: string;
  /** Click handler. */
  onPress?: () => void;
  /** Change handler. */
  onChange?: () => void;
  size?: 'sm' | 'lg';
}

export function Widget(_props: WidgetProps) {
  return null;
}
```

Create `PKG/test/fixtures/widget.stories.tsx`:

```tsx
import { getComponentDocs, getTypeDocs } from '../../src/storybook/getters.ts';
import { Widget, type WidgetProps } from './widget.tsx';

export const Props = getComponentDocs(Widget, {
  primary: ['label'],
  categories: {
    Events: [/^on/]
  }
});

export const TypeProps = getTypeDocs<WidgetProps>({ exclude: ['size'] });

export const NotADoc = 'just a string';
```

- [ ] **Step 2: Write the failing test**

Create `PKG/test/docs.node.test.ts`:

```ts
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { resolvePropsDoc } from '../src/docs.ts';

const storiesPath = join(__dirname, 'fixtures/widget.stories.tsx');

describe('resolvePropsDoc', function resolvePropsDocTests() {
  it('resolves a getComponentDocs export with options applied', async function resolvesComponent() {
    const doc = await resolvePropsDoc({ filePath: storiesPath, exportName: 'Props' });

    expect(doc?.name).toBe('Widget');
    // `label` is primary (root, first); on* fall into Events.
    expect(doc?.props.map((p) => p.name)).toEqual(['label', 'onPress', 'onChange']);
    expect(doc?.props.find((p) => p.name === 'onPress')?.category).toBe('Events');
    expect(doc?.props.find((p) => p.name === 'label')?.category).toBeUndefined();
  });

  it('resolves a getTypeDocs export with options applied', async function resolvesType() {
    const doc = await resolvePropsDoc({ filePath: storiesPath, exportName: 'TypeProps' });

    expect(doc?.name).toBe('WidgetProps');
    expect(doc?.props.map((p) => p.name)).not.toContain('size'); // excluded
    expect(doc?.props.map((p) => p.name)).toContain('label');
  });

  it('returns undefined for an export that is not a docs getter', async function ignoresNonDocs() {
    expect(await resolvePropsDoc({ filePath: storiesPath, exportName: 'NotADoc' })).toBeUndefined();
  });

  it('returns undefined for a missing export', async function missingExport() {
    expect(await resolvePropsDoc({ filePath: storiesPath, exportName: 'Nope' })).toBeUndefined();
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `cd packages/dev/storybook-addon-helpers && npx vitest run test/docs.node.test.ts`
Expected: FAIL with "Cannot find module '../src/docs.ts'".

- [ ] **Step 4: Implement `docs.ts`**

Create `PKG/src/docs.ts`:

```ts
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import { extractComponentDocs } from './engine/component-type.ts';
import { extractTypeDocs } from './engine/extract.ts';
import { createResolver, type Resolver } from './engine/resolve.ts';
import { processPropsDoc } from './process.ts';
import { GET_COMPONENT_DOCS, GET_TYPE_DOCS } from './storybook/getters-parser.ts';
import { toLiteralValue } from './storybook/literal.ts';
import type { DocsOptions, PropsDoc } from './types.ts';

export { toFumadocsPropTable } from './adapters/fumadocs.ts';
export type { FumadocsPropEntry, FumadocsPropTable } from './adapters/fumadocs.ts';
export type * from './types.ts';

/** Reads the docs-options object literal at `argIndex` of a getter call. */
function getDocsOptions(node: ts.CallExpression, argIndex: number): DocsOptions<Record<string, unknown>> {
  const argument = node.arguments[argIndex];
  if (!argument || !ts.isObjectLiteralExpression(argument)) return {};
  return toLiteralValue(argument) as DocsOptions<Record<string, unknown>>;
}

/** Unwraps `satisfies`/`as`/type-assertion wrappers to reach the inner expression. */
function unwrap(expr: ts.Expression): ts.Expression {
  if (ts.isSatisfiesExpression(expr) || ts.isAsExpression(expr) || ts.isTypeAssertionExpression(expr)) {
    return unwrap(expr.expression);
  }
  return expr;
}

/**
 * Produces a processed neutral `PropsDoc` from a `getComponentDocs`/`getTypeDocs`
 * call node. Shared by the Storybook CSF transformer and the docs-site resolver,
 * so both targets extract and process identically - only the adapter differs.
 *
 * @returns the processed doc, or `undefined` if the node is not a docs getter.
 */
export function docFromCall(
  node: ts.CallExpression,
  sourceFile: ts.SourceFile,
  resolver: Resolver = createResolver(sourceFile.fileName || 'inline.tsx')
): PropsDoc | undefined {
  if (!ts.isIdentifier(node.expression)) return undefined;
  const callee = node.expression.text;

  if (callee === GET_COMPONENT_DOCS && ts.isIdentifier(node.arguments[0])) {
    const rawDoc = extractComponentDocs(node.arguments[0].text, sourceFile, resolver);
    return processPropsDoc(rawDoc, getDocsOptions(node, 1));
  }

  if (callee === GET_TYPE_DOCS && node.typeArguments?.length === 1) {
    const typeArg = node.typeArguments[0];
    if (!ts.isTypeReferenceNode(typeArg) || !ts.isIdentifier(typeArg.typeName)) return undefined;
    const rawDoc = extractTypeDocs(typeArg.typeName.text, sourceFile, resolver);
    return processPropsDoc(rawDoc, getDocsOptions(node, 0));
  }

  return undefined;
}

/**
 * Resolves the processed `PropsDoc` for a named export of a stories file. The
 * export must be `export const <exportName> = getComponentDocs(...)` or
 * `getTypeDocs<...>(...)`.
 *
 * @returns the processed doc, or `undefined` if the export is missing or is not
 * a docs getter.
 */
export async function resolvePropsDoc(input: {
  filePath?: string;
  code?: string;
  exportName: string;
}): Promise<PropsDoc | undefined> {
  const filePath = input.filePath ?? '';
  const code = input.filePath ? await readFile(input.filePath, 'utf8') : (input.code ?? '');
  const sourceFile = ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  let callNode: ts.CallExpression | undefined;

  sourceFile.forEachChild(function findExport(statement) {
    if (callNode || !ts.isVariableStatement(statement)) return;
    if (!statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) return;

    for (const declaration of statement.declarationList.declarations) {
      if (declaration.name.getText(sourceFile) !== input.exportName || !declaration.initializer) continue;
      const initializer = unwrap(declaration.initializer);
      if (ts.isCallExpression(initializer)) callNode = initializer;
    }
  });

  if (!callNode) return undefined;
  return docFromCall(callNode, sourceFile);
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `cd packages/dev/storybook-addon-helpers && npx vitest run test/docs.node.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
cd /Users/goerwin/.supacode/repos/antares/refactor-storybook-helpers
git add packages/dev/storybook-addon-helpers/src/docs.ts packages/dev/storybook-addon-helpers/test/docs.node.test.ts packages/dev/storybook-addon-helpers/test/fixtures
git commit --no-verify -m "feat(storybook-addon-helpers): add storybook-free docs resolver"
```

---

## Task 4: Refactor `csf-transformer` to use `docFromCall`

**Files:**
- Modify: `PKG/src/storybook/csf-transformer.ts:1-17` (imports) and the two transform functions + `getDocsOptions`
- Test: `PKG/test/csf-transformer.node.test.ts` (existing - must stay green)

**Interfaces:**
- Consumes: `docFromCall` from `../docs.ts`.
- Produces: no signature change; `transformGetComponentDocs`/`transformGetTypeDocs` behavior identical, sourced through the shared core.

- [ ] **Step 1: Replace the inline extract/process with `docFromCall`**

In `PKG/src/storybook/csf-transformer.ts`:

1. Update imports - remove `extractComponentDocs`, `extractTypeDocs`, `createResolver`, `processPropsDoc`, and the `DocsOptions` type import; add `docFromCall`. The import block becomes:

```ts
import ts from 'typescript';
import { readFile } from 'node:fs/promises';
import {
  extractVariantNames,
  GET_COMPONENT_DOCS,
  GET_META,
  GET_STORY,
  GET_TYPE_DOCS,
  GET_VARIANTS
} from './getters-parser.ts';
import { toStorybookArgTypes } from '../adapters/storybook.ts';
import { docFromCall } from '../docs.ts';
import { toLiteralValue, toTsExpression } from './literal.ts';
```

2. Delete the local `getDocsOptions` function (now lives in `docs.ts`).

3. Replace `transformGetComponentDocs` with:

```ts
function transformGetComponentDocs(node: ts.Node, sourceFile: ts.SourceFile) {
  if (!isCallTo(node, GET_COMPONENT_DOCS) || !ts.isIdentifier(node.arguments[0])) return;

  const doc = docFromCall(node, sourceFile);
  if (!doc) return;

  return toTsExpression(toStorybookArgTypes(doc));
}
```

4. Replace `transformGetTypeDocs` with:

```ts
function transformGetTypeDocs(node: ts.Node, sourceFile: ts.SourceFile): ts.Expression | undefined {
  if (!isCallTo(node, GET_TYPE_DOCS) || node.typeArguments?.length !== 1) return;

  const doc = docFromCall(node, sourceFile);
  if (!doc) return;

  return toTsExpression(toStorybookArgTypes(doc));
}
```

Note: `docFromCall` re-validates the type argument, so `transformGetTypeDocs` safely returns when the doc is undefined. `toLiteralValue` remains imported for the other transforms (`getMeta`/`getStory`/`getVariants`).

- [ ] **Step 2: Run the full package test suite to verify no regression**

Run: `cd packages/dev/storybook-addon-helpers && npx vitest run`
Expected: PASS (all existing csf-transformer, adapter, extract, docs, jsdoc tests green).

- [ ] **Step 3: Typecheck the package**

Run: `cd packages/dev/storybook-addon-helpers && npx tsgo --noEmit`
Expected: no errors. (If `toLiteralValue` is now unused, remove it from the import; re-run.)

- [ ] **Step 4: Commit**

```bash
cd /Users/goerwin/.supacode/repos/antares/refactor-storybook-helpers
git add packages/dev/storybook-addon-helpers/src/storybook/csf-transformer.ts
git commit --no-verify -m "refactor(storybook-addon-helpers): share docFromCall between csf transform and docs resolver"
```

---

## Task 5: Expose the `./docs` subpath export and build

**Files:**
- Modify: `PKG/tsdown.config.ts`
- Modify: `PKG/package.json` (exports map)

**Interfaces:**
- Consumes: `src/docs.ts` (Task 3).
- Produces: importable `@bento/storybook-addon-helpers/docs` resolving to `dist/docs.{mjs,cjs}` with `dist/docs.d.{mts,cts}` types.

- [ ] **Step 1: Add the `docs` entry to tsdown**

Replace `PKG/tsdown.config.ts`:

```ts
import { config } from '../../../configs/tsdown.config.mts';
import { mergeConfig } from 'tsdown';

export default mergeConfig(config, {
  entry: ['src/index.ts', 'src/docs.ts'],
  inlineOnly: false
});
```

- [ ] **Step 2: Add the `./docs` export to package.json**

In `PKG/package.json`, add a `./docs` key to `exports` (after the `.` entry, before `./package.json`):

```json
    "./docs": {
      "import": {
        "types": "./dist/docs.d.mts",
        "default": "./dist/docs.mjs"
      },
      "require": {
        "types": "./dist/docs.d.cts",
        "default": "./dist/docs.cjs"
      }
    },
```

- [ ] **Step 3: Build the package**

Run: `cd packages/dev/storybook-addon-helpers && npm run build`
Expected: build succeeds; `dist/docs.mjs`, `dist/docs.cjs`, `dist/docs.d.mts`, `dist/docs.d.cts` exist.

- [ ] **Step 4: Verify the subpath is Storybook-free and importable**

Run:
```bash
cd packages/dev/storybook-addon-helpers
node -e "import('./dist/docs.mjs').then(m => console.log(Object.keys(m).sort().join(',')))"
grep -l "storybook" dist/docs.mjs || echo "OK: no storybook runtime in docs bundle"
```
Expected: keys include `resolvePropsDoc,toFumadocsPropTable,docFromCall`; the grep prints "OK: no storybook runtime in docs bundle".

- [ ] **Step 5: Commit**

```bash
cd /Users/goerwin/.supacode/repos/antares/refactor-storybook-helpers
git add packages/dev/storybook-addon-helpers/tsdown.config.ts packages/dev/storybook-addon-helpers/package.json
git commit --no-verify -m "feat(storybook-addon-helpers): expose storybook-free ./docs entry"
```

---

## Task 6: Wire the package into the site (dependency + alias)

**Files:**
- Modify: `SITE/package.json` (add dependency)
- Modify: `SITE/next.config.mjs:42-49` (webpack alias exact match)

**Interfaces:**
- Consumes: `@bento/storybook-addon-helpers/docs` (Task 5).
- Produces: the site can import the real Node engine at build time via the `/docs` subpath, while the bare specifier still resolves to the browser shim for the app bundle.

- [ ] **Step 1: Add the package as a site dependency**

In `SITE/package.json`, add to `dependencies` (keep alphabetical-ish order near the other scoped dep):

```json
    "@bento/storybook-addon-helpers": "^0.1.1",
```

- [ ] **Step 2: Make the webpack alias exact so `/docs` is not shadowed**

In `SITE/next.config.mjs`, in the `webpack(config)` block, change the bento key to an exact (`$`) alias so only the bare specifier maps to the shim:

```js
    config.resolve.alias = {
      ...config.resolve.alias,
      '@storybook/addon-docs/blocks': join(__dirname, 'lib/storybook-bridge/blocks.tsx'),
      '@storybook/react-vite': join(__dirname, 'lib/storybook-bridge/react-vite.ts'),
      '@bento/storybook-addon-helpers$': join(__dirname, 'lib/storybook-addon-helpers-shim.ts')
    };
```

Leave the `turbopack.resolveAlias` bento entry unchanged - Turbopack matches the request exactly and does not prefix-expand to `/docs`.

- [ ] **Step 3: Install dependencies**

Run: `cd /Users/goerwin/.supacode/repos/antares/refactor-storybook-helpers && npm install --ignore-scripts`
Expected: lockfile updates; `@bento/storybook-addon-helpers` linked into `apps/site`.

- [ ] **Step 4: Verify the subpath resolves from the site**

Run:
```bash
cd apps/site
node -e "console.log(require.resolve('@bento/storybook-addon-helpers/docs'))"
```
Expected: prints a path ending in `dist/docs.cjs` (proves the exports map + install work; the shim alias is webpack-only and does not affect Node resolution).

- [ ] **Step 5: Commit**

```bash
cd /Users/goerwin/.supacode/repos/antares/refactor-storybook-helpers
git add apps/site/package.json apps/site/next.config.mjs package-lock.json
git commit --no-verify -m "chore(site): depend on storybook-addon-helpers and scope its shim alias"
```

---

## Task 7: Rewrite `remarkArgTypes` to use the shared engine

**Files:**
- Modify: `SITE/lib/remark-arg-types.ts` (full rewrite)
- Test: `SITE/test/remark-arg-types.node.test.ts` (full rewrite)

**Interfaces:**
- Consumes: `resolvePropsDoc`, `toFumadocsPropTable` from `@bento/storybook-addon-helpers/docs`; `addMdxDependency` from `./remark-mdx-utils`.
- Produces: `remarkArgTypes: Plugin<[], Root>` (no options). Replaces `<ArgTypes of={Stories.X}>` with `<PropTable entries={[...]} categories={{...}} />`. When the export is missing / not a docs getter, emits `<PropTable entries={[]} categories={{}} />`.

**Assumption (documented):** the stories file lives at `<componentDir>/<componentDir>.stories.tsx` relative to the README, matching every current component (e.g. `button/button.stories.tsx`). This mirrors the dirname convention the old plugin already relied on.

- [ ] **Step 1: Write the failing test (rewrite)**

Replace `SITE/test/remark-arg-types.node.test.ts` entirely:

```ts
import { describe, expect, it, vi } from 'vitest';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { VFile } from 'vfile';

const resolvePropsDoc = vi.fn();
const toFumadocsPropTable = vi.fn();

vi.mock('@bento/storybook-addon-helpers/docs', () => ({
  resolvePropsDoc: (...args: unknown[]) => resolvePropsDoc(...args),
  toFumadocsPropTable: (...args: unknown[]) => toFumadocsPropTable(...args)
}));

const { remarkArgTypes } = await import('../lib/remark-arg-types.ts');

function run(markdown: string, path: string) {
  return remark()
    .use(remarkMdx)
    .use(remarkArgTypes)
    .process(new VFile({ value: markdown, path }));
}

describe('remarkArgTypes', function remarkArgTypesTests() {
  it('replaces <ArgTypes of={Stories.Props}> with a populated <PropTable>', async function populated() {
    resolvePropsDoc.mockResolvedValue({ name: 'Button', props: [] });
    toFumadocsPropTable.mockReturnValue({
      entries: [{ name: 'children', type: 'ReactNode', required: false }],
      categories: { Events: ['onPress'] }
    });

    const file = await run('<ArgTypes of={Stories.Props} />\n', '/repo/components/button/README.mdx');

    expect(resolvePropsDoc).toHaveBeenCalledWith({
      filePath: '/repo/components/button/button.stories.tsx',
      exportName: 'Props'
    });
    expect(String(file)).toContain('<PropTable');
    expect(String(file)).toContain('children');
    expect(String(file)).toContain('Events');
  });

  it('emits an empty <PropTable> when the export resolves to nothing', async function empty() {
    resolvePropsDoc.mockResolvedValue(undefined);

    const file = await run('<ArgTypes of={Stories.Missing} />\n', '/repo/components/button/README.mdx');

    expect(toFumadocsPropTable).not.toHaveBeenCalled();
    expect(String(file)).toContain('<PropTable');
  });

  it('ignores non-ArgTypes JSX nodes', async function ignoresOthers() {
    const file = await run('<Story of={Stories.Default} />\n', '/repo/components/button/README.mdx');

    expect(resolvePropsDoc).not.toHaveBeenCalled();
    expect(String(file)).toContain('<Story');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd apps/site && npx vitest run test/remark-arg-types.node.test.ts`
Expected: FAIL - current `remarkArgTypes` still expects a `generator` option and emits `auto-type-table`, so assertions on `<PropTable>` and the mock call fail.

- [ ] **Step 3: Rewrite the plugin**

Replace `SITE/lib/remark-arg-types.ts` entirely:

```ts
import { basename, dirname, join } from 'node:path';
import type { MdxJsxFlowElement, MdxJsxAttribute } from 'mdast-util-mdx-jsx';
import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import { valueToEstree } from 'estree-util-value-to-estree';
import { visit, SKIP } from 'unist-util-visit';
import { resolvePropsDoc, toFumadocsPropTable } from '@bento/storybook-addon-helpers/docs';
import { addMdxDependency } from './remark-mdx-utils';

/**
 * Extracts the Stories export name from an `<ArgTypes of={Stories.X}>` node.
 *
 * @param node - The MDX JSX flow element to inspect
 * @returns The export name (e.g. `"Props"`, `"LinkButtonProps"`), or undefined
 */
function getArgTypesExportName(node: MdxJsxFlowElement): string | undefined {
  if (node.name !== 'ArgTypes') return;
  const ofAttr = node.attributes.find(
    (attr): attr is MdxJsxAttribute => attr.type === 'mdxJsxAttribute' && attr.name === 'of'
  );
  if (!ofAttr || typeof ofAttr.value !== 'object' || ofAttr.value?.type !== 'mdxJsxAttributeValueExpression') return;
  return ofAttr.value.value.split('.').at(-1);
}

/** Wraps a plain JS value as an MDX JSX attribute value (embedded estree). */
function toEstreeAttrValue(value: unknown): MdxJsxAttribute['value'] {
  return {
    type: 'mdxJsxAttributeValueExpression',
    value: '',
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        body: [{ type: 'ExpressionStatement', expression: valueToEstree(value) }]
      }
    }
  };
}

/** Builds a `<PropTable entries={...} categories={...} />` node. */
function buildPropTable(entries: unknown, categories: unknown): MdxJsxFlowElement {
  return {
    type: 'mdxJsxFlowElement',
    name: 'PropTable',
    attributes: [
      { type: 'mdxJsxAttribute', name: 'entries', value: toEstreeAttrValue(entries) },
      { type: 'mdxJsxAttribute', name: 'categories', value: toEstreeAttrValue(categories) }
    ],
    children: []
  };
}

/**
 * Replaces `<ArgTypes of={Stories.X}>` with `<PropTable>` generated from the
 * component's `*.stories.tsx` docs getter, via the shared type engine. The
 * stories file is resolved by convention as `<dir>/<dir>.stories.tsx` relative
 * to the README, and both it and the component source are registered as MDX
 * dependencies so edits trigger a rebuild.
 *
 * The transform is invisible to Storybook, which sees the real `ArgTypes` block.
 */
export const remarkArgTypes: Plugin<[], Root> = function remarkArgTypes() {
  return function transform(tree, file) {
    const promises: Promise<void>[] = [];

    visit(tree, 'mdxJsxFlowElement', function visitArgTypes(node, index, parent) {
      if (typeof index !== 'number' || !parent) return;
      const exportName = getArgTypesExportName(node);
      if (!exportName) return;

      const componentDir = dirname(file.path);
      const storiesPath = join(componentDir, `${basename(componentDir)}.stories.tsx`);
      addMdxDependency(file, storiesPath);
      addMdxDependency(file, join(componentDir, 'src/index.tsx'));

      const placeholder: MdxJsxFlowElement = {
        type: 'mdxJsxFlowElement',
        name: 'span',
        attributes: [],
        children: []
      };
      parent.children.splice(index, 1, placeholder);

      promises.push(
        resolvePropsDoc({ filePath: storiesPath, exportName }).then(function applyResult(doc) {
          const table = doc ? toFumadocsPropTable(doc) : { entries: [], categories: {} };
          const idx = parent.children.indexOf(placeholder);
          parent.children.splice(idx, 1, buildPropTable(table.entries, table.categories));
        })
      );

      return [SKIP, index];
    });

    return Promise.all(promises).then(() => undefined);
  };
};
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd apps/site && npx vitest run test/remark-arg-types.node.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/goerwin/.supacode/repos/antares/refactor-storybook-helpers
git add apps/site/lib/remark-arg-types.ts apps/site/test/remark-arg-types.node.test.ts
git commit --no-verify -m "feat(site): generate prop tables from shared type engine"
```

---

## Task 8: Remove the `fumadocs-typescript` generator from `source.config.ts`

**Files:**
- Modify: `SITE/source.config.ts`

**Interfaces:**
- Consumes: the rewritten `remarkArgTypes` (Task 7, no options).
- Produces: MDX config with no `fumadocs-typescript` generator and no `remarkAutoTypeTable`.

- [ ] **Step 1: Rewrite `source.config.ts`**

Replace `SITE/source.config.ts` (remove the generator imports/const and the `remarkAutoTypeTable` plugin entry; call `remarkArgTypes` bare):

```ts
import { remarkStripLeadingHeading } from './lib/remark-strip-leading-heading';
import { applyMdxPreset, defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { remarkRawLoader } from './lib/remark-raw-loader.ts';
import { remarkArgTypes } from './lib/remark-arg-types.ts';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true
    },
    mdxOptions: (env) =>
      applyMdxPreset({
        remarkPlugins: (v) => [remarkStripLeadingHeading, ...v]
      })(env)
  },
  meta: {
    schema: metaSchema
  }
});

export const components = defineDocs({
  dir: '../../packages/@godaddy/antares/components',
  docs: {
    files: ['**/README.mdx', '!**/_internal/**'],
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true
    },
    // Wrap with applyMdxPreset so remarkStructure (search indexing) still runs.
    mdxOptions: (env) =>
      applyMdxPreset({
        remarkPlugins: (v) => [remarkStripLeadingHeading, remarkArgTypes, remarkRawLoader, ...v]
      })(env)
  },
  meta: {
    schema: metaSchema
  }
});

export default defineConfig({});
```

- [ ] **Step 2: Typecheck the site**

Run: `cd apps/site && npx tsgo --noEmit`
Expected: no errors from `source.config.ts` (it no longer references removed symbols). `filtered-generator.ts` still exists at this point and is fine; it is removed in Task 9.

- [ ] **Step 3: Commit**

```bash
cd /Users/goerwin/.supacode/repos/antares/refactor-storybook-helpers
git add apps/site/source.config.ts
git commit --no-verify -m "refactor(site): drop fumadocs-typescript generator wiring"
```

---

## Task 9: Delete `filtered-generator` and the `fumadocs-typescript` dependency

**Files:**
- Delete: `SITE/lib/filtered-generator.ts`
- Delete: `SITE/test/filtered-generator.node.test.ts`
- Modify: `SITE/package.json` (remove `fumadocs-typescript`)

**Interfaces:**
- Consumes: nothing (dead code removal).
- Produces: no remaining references to `fumadocs-typescript` in site source/tests.

- [ ] **Step 1: Confirm nothing else imports the removed modules**

Run:
```bash
cd apps/site
grep -rn "filtered-generator\|fumadocs-typescript\|CategorizedTypeTable\|createFilteredGenerator" lib app components source.config.ts test | grep -v filtered-generator.node.test.ts | grep -v "lib/filtered-generator.ts"
```
Expected: no output (the only hits are the two files being deleted).

- [ ] **Step 2: Delete the files**

Run:
```bash
cd apps/site
git rm lib/filtered-generator.ts test/filtered-generator.node.test.ts
```

- [ ] **Step 3: Remove the dependency**

In `SITE/package.json`, delete the `"fumadocs-typescript": "^5.2.6",` line from `dependencies`.

- [ ] **Step 4: Reinstall**

Run: `cd /Users/goerwin/.supacode/repos/antares/refactor-storybook-helpers && npm install --ignore-scripts`
Expected: lockfile updates; `fumadocs-typescript` removed from `apps/site`.

- [ ] **Step 5: Run the full site test suite (coverage)**

Run: `cd apps/site && npx vitest run`
Expected: PASS, and coverage stays at 100% for `lib/**` (the removed generator no longer counts; `remark-arg-types.ts` is fully covered by Task 7's test - both the populated and empty branches).

- [ ] **Step 6: Commit**

```bash
cd /Users/goerwin/.supacode/repos/antares/refactor-storybook-helpers
git add apps/site/package.json package-lock.json
git commit --no-verify -m "chore(site): remove fumadocs-typescript generator and dependency"
```

---

## Task 10: Preserve category order in `PropTable`

**Files:**
- Modify: `SITE/components/prop-table.tsx:107-135` (the `PropTable` function)

**Interfaces:**
- Consumes: `{ entries, categories }` from `toFumadocsPropTable` (categories already in declaration order).
- Produces: categories rendered in the given (insertion) order, not alphabetical.

- [ ] **Step 1: Drop the alphabetical sort**

In `SITE/components/prop-table.tsx`, inside `PropTable`, replace:

```tsx
  const sortedCategories = Object.entries(categories).sort(([a], [b]) => a.localeCompare(b));
```

with:

```tsx
  // Render categories in the order the engine emitted them (stories-file
  // declaration order), so the site table matches Storybook.
  const orderedCategories = Object.entries(categories);
```

Then rename the single usage below from `sortedCategories.map(...)` to `orderedCategories.map(...)`.

- [ ] **Step 2: Typecheck the site**

Run: `cd apps/site && npx tsgo --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/goerwin/.supacode/repos/antares/refactor-storybook-helpers
git add apps/site/components/prop-table.tsx
git commit --no-verify -m "fix(site): render prop-table categories in declaration order"
```

---

## Task 11: End-to-end verification (site build + Storybook parity)

**Files:** none (verification only).

**Interfaces:** exercises the full pipeline on real component fixtures (`button`).

- [ ] **Step 1: Lint and typecheck both projects**

Run:
```bash
cd /Users/goerwin/.supacode/repos/antares/refactor-storybook-helpers
npx nx run storybook-addon-helpers:lint
npx nx run site:lint
cd packages/dev/storybook-addon-helpers && npx tsgo --noEmit
cd ../../../apps/site && npx tsgo --noEmit
```
Expected: all clean.

- [ ] **Step 2: Build the site and confirm the Button page renders a populated PropTable**

Run:
```bash
cd /Users/goerwin/.supacode/repos/antares/refactor-storybook-helpers
npx nx run site:build 2>&1 | tail -30
```
Expected: build succeeds. Then inspect the compiled Button page output for a `PropTable` with entries and the Button categories (`Events`, `ARIA`, `Forms`, `Other`) in that order:

```bash
grep -rl "PropTable" apps/site/.next 2>/dev/null | head
```

If a static/dev inspection is easier, run `npx nx run site:dev` and open the Button docs page; confirm:
- Primary props (`id`, `children`, `className`, `style`) appear first, uncategorized.
- Category sections appear in order `Events`, `ARIA`, `Forms`, `Other` (NOT alphabetical).
- `autoFocus` is absent (excluded in `button.stories.tsx`).
- `LinkButtonProps` renders its full (unfiltered) prop set, confirming pure parity for a bare `getComponentDocs`.

- [ ] **Step 3: Confirm Storybook still builds unchanged**

Run:
```bash
cd /Users/goerwin/.supacode/repos/antares/refactor-storybook-helpers
npx nx run docs:build-storybook 2>&1 | tail -20
```
Expected: succeeds (the `csf-transformer` refactor is behavior-preserving). If `docs` has no `build-storybook` target, run `npm run storybook` briefly and confirm the Button `Props`/`LinkButtonProps` docs tables render as before.

- [ ] **Step 4: Full monorepo test sweep for the two affected projects**

Run:
```bash
cd /Users/goerwin/.supacode/repos/antares/refactor-storybook-helpers
npx nx run storybook-addon-helpers:test
npx nx run site:test
```
Expected: all pass; site coverage 100% for `lib/**`.

- [ ] **Step 5: Update package READMEs to reflect the wired Fumadocs adapter**

The `PKG/README.md` "How it works" section currently ends with "That wiring does not exist in this package yet - the Fumadocs docs site (`apps/site`) currently has its own separate generator." Replace that sentence with a short note that the `./docs` entry now exposes `resolvePropsDoc` + `toFumadocsPropTable` and the docs site consumes them. Also update `SITE/README.md` if it documents the old `fumadocs-typescript`/`filtered-generator` flow.

- [ ] **Step 6: Final commit**

```bash
cd /Users/goerwin/.supacode/repos/antares/refactor-storybook-helpers
git add packages/dev/storybook-addon-helpers/README.md apps/site/README.md
git commit --no-verify -m "docs: describe the unified fumadocs prop-table pipeline"
```

---

## Self-Review Notes

- **Spec coverage:** Q1 full unification → Tasks 3-9; Q2 high-level resolver + storybook-free subpath → Tasks 3, 5; Q3 adapter shape, drop `typeHref`, add `deprecated` → Tasks 1, 2; Q4 preserve category order → Tasks 2, 10; Q5 pure parity (no site filters) → Tasks 7-9 (verified in Task 11); Q6 delete `fumadocs-typescript`/`auto-type-table` → Tasks 8, 9; Q7 no cache, per-call resolver → default `createResolver` param in `docFromCall`; Q8 naming → Tasks 3, 5; Q9 testing (`{filePath|code}`, TDD, fixtures, delete old tests) → Tasks 1-3, 7, 9.
- **Type consistency:** `resolvePropsDoc`/`docFromCall`/`toFumadocsPropTable`/`FumadocsPropTable` names are used identically across Tasks 3, 5, 7. `getPropJSDoc`'s new `deprecated` field flows Task 1 → adapter Task 2 → site.
- **Behavior-change flag (accepted):** the first site build after Task 9 changes several component pages - aria (`ARIA`) and DOM (`Other`) props now render on Button, and bare `getComponentDocs` exports (e.g. `LinkButtonProps`) show their full extracted prop set. A follow-up pass to add `exclude`/`categories` to noisy stories files is expected and out of scope for this plan.

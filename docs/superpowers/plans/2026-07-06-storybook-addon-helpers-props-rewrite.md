# Storybook Addon Helpers Props Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `@bento/storybook-addon-helpers` so Storybook prop docs are produced by a shallow, cached TypeScript AST extractor with type-safe filtering, ordering, and grouping options.

**Architecture:** Replace the current `react-docgen-typescript` path with a neutral `PropDoc[]` extraction engine, a pure processing step, and a Storybook adapter. Keep the existing Vite plugin, stories indexer, and `getMeta` / `getStory` / `getVariants` observable behavior, while changing docs calls from `getInterfaceDocs` to `getTypeDocs`.

**Tech Stack:** TypeScript 6, Storybook React Vite, Vite plugin load transform, Vitest, Nx via `npx nx`, npm workspaces.

---

## Spec Reference

Approved design: `docs/superpowers/specs/2026-07-06-storybook-addon-helpers-props-rewrite-design.md`

## Checkpoint Status

**Last updated:** 2026-07-06

**Status: COMPLETE.** All 10 tasks implemented, reviewed, and verified. Plus a
post-plan cleanup pass (dead fixtures + `src/storybook/` reorg) not in the
original task list.

**Completed and reviewed:**
- Task 1: Public model, processing, and Storybook adapter.
  - `e1e2caf0a feat(storybook-addon-helpers): add docs model processor and adapter`
  - `443b187c3 fix(storybook-addon-helpers): expose docs helpers from root`
- Task 2: Resolver and JSDoc parser.
  - `e4993d941 feat(storybook-addon-helpers): add ast resolver and jsdoc parser`
  - `4f3265198 fix(storybook-addon-helpers): resolve re-exported type symbols`
  - `e3e1e8900 fix(storybook-addon-helpers): harden resolver module boundaries`
  - `90ebed9f0 fix(storybook-addon-helpers): resolve local export lists`
  - `e817d3a06 fix(storybook-addon-helpers): resolve imported export lists and tsconfig paths`
- Task 3: Core type extraction engine. Reviewed `e817d3a06..674a2d157` — spec-compliant and hardened beyond the plan's starter code (circular-ref `active` set with try/finally, graceful `Pick`/`Omit` degradation, `normalizeProps` override semantics).
  - `8f9b109ba feat(storybook-addon-helpers): extract prop docs from type nodes`
  - `68d1a6995 fix(storybook-addon-helpers): harden type extraction recursion`
  - `1cc0d23a8 fix(storybook-addon-helpers): extract utility heritage props`
  - `674a2d157 fix(storybook-addon-helpers): normalize duplicate extracted props`
- Task 4: Component props type resolution.
  - `a34f5fd75 feat(storybook-addon-helpers): resolve component props types`
- Task 5: Getter runtime types (`getTypeDocs`, options on `getComponentDocs`).
  - `0981c9fd8 feat(storybook-addon-helpers): add type-safe docs getter options`
- Task 6: Getter parser and CSF transformer wired to the AST engine.
  - `4dc343208 feat(storybook-addon-helpers): wire ast docs into csf transform`
- Task 7: Delete old react-docgen extractor path (added `literal.node.test.ts` for per-file coverage; adjusted `stories-indexer` test).
  - `cce083c0d refactor(storybook-addon-helpers): remove react docgen extractor path`
- Task 8: Consumer migration to `getTypeDocs` (+ `scripts/compile-readme.ts` migrated to the new engine).
  - `583bf8541 refactor(storybook-addon-helpers): migrate docs stories to getTypeDocs`
- Task 9: Remove `react-docgen-typescript` dependency and sync lockfile.
  - `254d6ce75 chore(storybook-addon-helpers): remove react docgen dependency`
- Task 10: Final verification. Surfaced and fixed a real defect — the emitted
  arg-type object keys were bare identifiers, so newly-included ARIA props
  (`aria-label`, etc.) produced invalid JS and broke the Storybook build; keys
  are now quoted.
  - `57a1c04c6 fix(storybook-addon-helpers): quote emitted arg type keys`

**Post-plan cleanup (requested after Task 10):**
- Removed 6 orphaned fixtures under `test/fixtures/{components,interfaces}/` (only used by the deleted `ats-extractor-*` tests) and fixed `getVariants`' unused param.
  - `501ce0a09 chore(storybook-addon-helpers): remove orphaned ats extractor fixtures`
- Moved the Storybook glue (getters, getters-parser, csf-transformer, plugin, stories-indexer, literal) into `src/storybook/` per the design spec's intended layout; `engine/`, `process.ts`, `adapters/`, `types.ts` stay as the neutral core.
  - `72ee9e1b8 refactor(storybook-addon-helpers): group storybook glue under src/storybook`

**Final verification (all green):**
- `npx nx run @bento/storybook-addon-helpers:test --no-tui --skipNxCache` — 67 tests pass, per-file coverage thresholds met.
- `npx nx run @bento/storybook-addon-helpers:typecheck --no-tui --skipNxCache` — passed.
- `npx nx run @bento/storybook-addon-helpers:lint --no-tui --skipNxCache` — passed.
- `npx nx run @bento/storybook-addon-helpers:build --no-tui --skipNxCache` — passed.
- `npx nx run docs:build:storybook --no-tui --skipNxCache` — passed (exercises the new transformer over all migrated stories end-to-end).

**Known behavioral change (per approved design):** the new engine no longer
filters inherited DOM/ARIA props, so `getComponentDocs(Comp)` without
`include`/`exclude` now renders the fuller inherited-prop set. Authors narrow it
via options.

**Deliberately left untouched (out of scope):** `apps/site/lib/filtered-generator.ts`
and `apps/site/lib/storybook-addon-helpers-shim.ts` — both contain now-stale
comments referencing the removed `prop-filter.ts` / `react-docgen-typescript`.

**Known unrelated worktree items to ignore:**
- `.claude/.settings.json.lock`

**Do next:** Nothing — implementation complete. Branch `refactor-storybook-helpers`
kept as-is for later integration (PR/merge).

## File Structure

- Create `packages/dev/storybook-addon-helpers/src/types.ts`: neutral `PropDoc`, `PropsDoc`, Storybook arg type shape, and type-safe `DocsOptions`.
- Create `packages/dev/storybook-addon-helpers/src/process.ts`: pure `filter -> sort -> group` pipeline.
- Create `packages/dev/storybook-addon-helpers/src/adapters/storybook.ts`: neutral docs to `{ tags, argTypes }`.
- Create `packages/dev/storybook-addon-helpers/src/engine/resolve.ts`: parsed-file cache, module resolution with `ts.resolveModuleName`, local/imported symbol lookup.
- Create `packages/dev/storybook-addon-helpers/src/engine/jsdoc.ts`: JSDoc description and `@default` extraction.
- Create `packages/dev/storybook-addon-helpers/src/engine/utility-types.ts`: `Pick`, `Omit`, `Partial`, and `Required` transforms over extracted props.
- Create `packages/dev/storybook-addon-helpers/src/engine/extract.ts`: shallow AST extraction for interfaces, type aliases, intersections, type literals, references, and utility wrappers.
- Create `packages/dev/storybook-addon-helpers/src/engine/component-type.ts`: resolve component value to props type node.
- Modify `packages/dev/storybook-addon-helpers/src/getters.ts`: add `DocsOptions`, `getTypeDocs`, options parameter for docs getters, and remove `getInterfaceDocs`.
- Modify `packages/dev/storybook-addon-helpers/src/getters-parser.ts`: recognize `getTypeDocs`, parse docs options object literals for indexer unwrapping.
- Modify `packages/dev/storybook-addon-helpers/src/csf-transformer.ts`: wire extraction, processing, and adapter; remove old Pick/Omit generic branch.
- Modify `packages/dev/storybook-addon-helpers/src/index.ts`, `plugin.ts`, `stories-indexer.ts`: preserve behavior; only update imports/types if needed.
- Delete `packages/dev/storybook-addon-helpers/src/ats-extractor-component-doc.ts`, `ats-extractor-interface-doc.ts`, `ats-utils.ts`, and `prop-filter.ts` after replacement tests are in place.
- Replace package tests under `packages/dev/storybook-addon-helpers/test` with focused tests for engine, process, adapter, getters, parser, transformer, plugin, and indexer.
- Create test fixtures under `packages/dev/storybook-addon-helpers/test/fixtures`.
- Modify consumer stories that import/use `getInterfaceDocs`.
- Modify `packages/dev/storybook-addon-helpers/package.json` and root `package-lock.json` to remove `react-docgen-typescript`.

## Commands

- Use Nx for package tasks:
  - `npx nx run @bento/storybook-addon-helpers:test --no-tui`
  - `npx nx run @bento/storybook-addon-helpers:typecheck --no-tui`
  - `npx nx run @bento/storybook-addon-helpers:lint --no-tui`
  - `npx nx run @bento/storybook-addon-helpers:build --no-tui`
- Use npm only for dependency lockfile sync:
  - `npm install --ignore-scripts`

---

### Task 1: Public Model, Processing, And Storybook Adapter

**Files:**
- Create: `packages/dev/storybook-addon-helpers/src/types.ts`
- Create: `packages/dev/storybook-addon-helpers/src/process.ts`
- Create: `packages/dev/storybook-addon-helpers/src/adapters/storybook.ts`
- Create: `packages/dev/storybook-addon-helpers/test/process.node.test.ts`
- Create: `packages/dev/storybook-addon-helpers/test/storybook-adapter.node.test.ts`

- [ ] **Step 1: Write failing tests for processing**

Create `packages/dev/storybook-addon-helpers/test/process.node.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { processPropsDoc } from '../src/process.ts';
import type { PropDoc } from '../src/types.ts';

const props: PropDoc[] = [
  { name: 'zeta', type: 'string', required: false },
  { name: 'alpha', type: 'number', required: true },
  { name: 'beta', type: 'boolean', required: false },
  { name: 'gamma', type: '() => void', required: true }
];

describe('processPropsDoc', function processPropsDocTests() {
  it('includes only allowlisted props', function includeOnly() {
    const actual = processPropsDoc({ name: 'Thing', props }, { include: ['beta', 'alpha'] });

    expect(actual.props.map((prop) => prop.name)).toEqual(['alpha', 'beta']);
  });

  it('excludes blocklisted props', function excludeSome() {
    const actual = processPropsDoc({ name: 'Thing', props }, { exclude: ['alpha'] });

    expect(actual.props.map((prop) => prop.name)).toEqual(['gamma', 'beta', 'zeta']);
  });

  it('pins explicit order before required-first alphabetical fallback', function explicitOrder() {
    const actual = processPropsDoc({ name: 'Thing', props }, { order: ['zeta'] });

    expect(actual.props.map((prop) => prop.name)).toEqual(['zeta', 'alpha', 'gamma', 'beta']);
  });

  it('groups props and sorts within each group', function groupProps() {
    const actual = processPropsDoc(
      { name: 'Thing', props },
      {
        groups: {
          Events: ['gamma', 'beta'],
          Layout: ['zeta']
        }
      }
    );

    expect(actual.props).toMatchObject([
      { name: 'gamma', group: 'Events' },
      { name: 'beta', group: 'Events' },
      { name: 'zeta', group: 'Layout' },
      { name: 'alpha', group: undefined }
    ]);
  });
});
```

- [ ] **Step 2: Run processing tests to verify they fail**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:test --no-tui -- --run test/process.node.test.ts
```

Expected: FAIL because `../src/process.ts` and `../src/types.ts` do not exist.

- [ ] **Step 3: Implement neutral types and processor**

Create `packages/dev/storybook-addon-helpers/src/types.ts`:

```ts
import type { ComponentProps, ComponentType } from 'react';

type DocsOptionsBase<P> = {
  order?: (keyof P)[];
  groups?: Record<string, (keyof P)[]>;
};

type IncludeDocsOptions<P> = DocsOptionsBase<P> & {
  include?: (keyof P)[];
  exclude?: never;
};

type ExcludeDocsOptions<P> = DocsOptionsBase<P> & {
  include?: never;
  exclude?: (keyof P)[];
};

export type DocsOptions<P> = IncludeDocsOptions<P> | ExcludeDocsOptions<P>;

export type ComponentDocsOptions<C extends ComponentType<any>> = DocsOptions<ComponentProps<C>>;

export interface PropDoc {
  name: string;
  type: string;
  required: boolean;
  description?: string;
  defaultValue?: string | null;
  group?: string;
  sourceFile?: string;
  declaringType?: string;
}

export interface PropsDoc {
  name: string;
  props: PropDoc[];
}

export interface StorybookArgType {
  name: string;
  description?: string;
  required: boolean;
  type: {
    name: string;
    required: boolean;
  };
  table: {
    defaultValue: { summary: string | null };
    category?: string;
  };
}

export interface StorybookDocs {
  tags: string[];
  argTypes: Record<string, StorybookArgType>;
}
```

Create `packages/dev/storybook-addon-helpers/src/process.ts`:

```ts
import type { DocsOptions, PropDoc, PropsDoc } from './types.ts';

export function processPropsDoc<P>(doc: PropsDoc, options: DocsOptions<P> = {}): PropsDoc {
  const filtered = filterProps(doc.props, options);
  const grouped = applyGroups(filtered, options.groups);

  return {
    name: doc.name,
    props: sortProps(grouped, options.order)
  };
}

function filterProps<P>(props: PropDoc[], options: DocsOptions<P>): PropDoc[] {
  const include = new Set((options.include ?? []).map(String));
  const exclude = new Set((options.exclude ?? []).map(String));

  if (include.size > 0) return props.filter((prop) => include.has(prop.name));
  if (exclude.size > 0) return props.filter((prop) => !exclude.has(prop.name));

  return [...props];
}

function applyGroups<P>(props: PropDoc[], groups: DocsOptions<P>['groups']): PropDoc[] {
  if (!groups) return props.map((prop) => ({ ...prop }));

  const groupByProp = new Map<string, string>();
  for (const [group, propNames] of Object.entries(groups)) {
    for (const propName of propNames) groupByProp.set(String(propName), group);
  }

  return props.map((prop) => ({ ...prop, group: groupByProp.get(prop.name) }));
}

function sortProps<P>(props: PropDoc[], order: DocsOptions<P>['order']): PropDoc[] {
  const orderIndex = new Map((order ?? []).map((name, index) => [String(name), index]));
  const groupOrder = new Map<string, number>();

  for (const prop of props) {
    const group = prop.group ?? '';
    if (!groupOrder.has(group)) groupOrder.set(group, groupOrder.size);
  }

  return [...props].sort((left, right) => {
    const groupDelta = (groupOrder.get(left.group ?? '') ?? 0) - (groupOrder.get(right.group ?? '') ?? 0);
    if (groupDelta !== 0) return groupDelta;

    const leftOrder = orderIndex.get(left.name);
    const rightOrder = orderIndex.get(right.name);
    if (leftOrder !== undefined || rightOrder !== undefined) {
      return (leftOrder ?? Number.MAX_SAFE_INTEGER) - (rightOrder ?? Number.MAX_SAFE_INTEGER);
    }

    if (left.required !== right.required) return left.required ? -1 : 1;
    return left.name.localeCompare(right.name);
  });
}
```

- [ ] **Step 4: Run processing tests to verify they pass**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:test --no-tui -- --run test/process.node.test.ts
```

Expected: PASS.

- [ ] **Step 5: Write failing Storybook adapter tests**

Create `packages/dev/storybook-addon-helpers/test/storybook-adapter.node.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { toStorybookArgTypes } from '../src/adapters/storybook.ts';

describe('toStorybookArgTypes', function toStorybookArgTypesTests() {
  it('maps neutral docs to Storybook argTypes in prop order', function mapsDocs() {
    const actual = toStorybookArgTypes({
      name: 'Thing',
      props: [
        {
          name: 'size',
          type: "'sm' | 'lg'",
          required: true,
          description: 'Size description',
          defaultValue: "'sm'",
          group: 'Appearance'
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          defaultValue: null
        }
      ]
    });

    expect(actual.tags).toEqual(['!dev']);
    expect(Object.keys(actual.argTypes)).toEqual(['size', 'disabled']);
    expect(actual.argTypes.size).toEqual({
      name: 'size',
      description: 'Size description',
      required: true,
      type: { name: "'sm' | 'lg'", required: true },
      table: {
        defaultValue: { summary: "'sm'" },
        category: 'Appearance'
      }
    });
    expect(actual.argTypes.disabled.table).toEqual({
      defaultValue: { summary: null }
    });
  });
});
```

- [ ] **Step 6: Run adapter tests to verify they fail**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:test --no-tui -- --run test/storybook-adapter.node.test.ts
```

Expected: FAIL because `src/adapters/storybook.ts` does not exist.

- [ ] **Step 7: Implement Storybook adapter**

Create `packages/dev/storybook-addon-helpers/src/adapters/storybook.ts`:

```ts
import type { PropsDoc, StorybookDocs } from '../types.ts';

export function toStorybookArgTypes(doc: PropsDoc): StorybookDocs {
  const argTypes: StorybookDocs['argTypes'] = {};

  for (const prop of doc.props) {
    argTypes[prop.name] = {
      name: prop.name,
      description: prop.description,
      required: prop.required,
      type: {
        name: prop.type,
        required: prop.required
      },
      table: {
        defaultValue: { summary: prop.defaultValue ?? null },
        ...(prop.group ? { category: prop.group } : {})
      }
    };
  }

  return {
    tags: ['!dev'],
    argTypes
  };
}
```

- [ ] **Step 8: Run adapter tests to verify they pass**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:test --no-tui -- --run test/storybook-adapter.node.test.ts
```

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add packages/dev/storybook-addon-helpers/src/types.ts packages/dev/storybook-addon-helpers/src/process.ts packages/dev/storybook-addon-helpers/src/adapters/storybook.ts packages/dev/storybook-addon-helpers/test/process.node.test.ts packages/dev/storybook-addon-helpers/test/storybook-adapter.node.test.ts
git commit -m "feat(storybook-addon-helpers): add docs model processor and adapter"
```

---

### Task 2: Resolver, JSDoc, And Literal Helpers

**Files:**
- Create: `packages/dev/storybook-addon-helpers/src/engine/resolve.ts`
- Create: `packages/dev/storybook-addon-helpers/src/engine/jsdoc.ts`
- Create: `packages/dev/storybook-addon-helpers/src/storybook/getters-parser.ts` is not used; keep parser at existing path.
- Modify: `packages/dev/storybook-addon-helpers/src/getters-parser.ts`
- Create: `packages/dev/storybook-addon-helpers/test/engine-resolve.node.test.ts`
- Create: `packages/dev/storybook-addon-helpers/test/jsdoc.node.test.ts`
- Create: `packages/dev/storybook-addon-helpers/test/fixtures/engine/types.ts`
- Create: `packages/dev/storybook-addon-helpers/test/fixtures/engine/imported.ts`

- [ ] **Step 1: Write failing resolver fixture files**

Create `packages/dev/storybook-addon-helpers/test/fixtures/engine/imported.ts`:

```ts
export interface ImportedProps {
  imported: string;
}

export type RenamedProps = {
  renamed?: number;
};
```

Create `packages/dev/storybook-addon-helpers/test/fixtures/engine/types.ts`:

```ts
import type { ImportedProps, RenamedProps as AliasProps } from './imported.ts';

export interface LocalProps {
  local: boolean;
}

export interface UsesImportedProps extends ImportedProps {
  own: string;
}

export type UsesAliasProps = AliasProps & {
  ownAlias: boolean;
};
```

- [ ] **Step 2: Write failing resolver tests**

Create `packages/dev/storybook-addon-helpers/test/engine-resolve.node.test.ts`:

```ts
import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { createResolver } from '../src/engine/resolve.ts';

const fixturesPath = path.join(__dirname, 'fixtures/engine/types.ts');

describe('createResolver', function createResolverTests() {
  it('finds local symbols', function findsLocalSymbol() {
    const resolver = createResolver(fixturesPath);
    const sourceFile = resolver.getSourceFile(fixturesPath);
    const actual = resolver.resolveSymbol('LocalProps', sourceFile);

    expect(actual?.name).toBe('LocalProps');
    expect(actual?.sourceFile.fileName).toBe(fixturesPath);
    expect(ts.isInterfaceDeclaration(actual?.declaration)).toBe(true);
  });

  it('resolves imported and aliased type symbols', function resolvesImports() {
    const resolver = createResolver(fixturesPath);
    const sourceFile = resolver.getSourceFile(fixturesPath);

    expect(resolver.resolveSymbol('ImportedProps', sourceFile)?.name).toBe('ImportedProps');
    expect(resolver.resolveSymbol('AliasProps', sourceFile)?.name).toBe('RenamedProps');
  });

  it('caches parsed source files by absolute path', function cachesFiles() {
    const resolver = createResolver(fixturesPath);

    expect(resolver.getSourceFile(fixturesPath)).toBe(resolver.getSourceFile(fixturesPath));
  });
});
```

- [ ] **Step 3: Run resolver tests to verify they fail**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:test --no-tui -- --run test/engine-resolve.node.test.ts
```

Expected: FAIL because `src/engine/resolve.ts` does not exist.

- [ ] **Step 4: Implement resolver**

Create `packages/dev/storybook-addon-helpers/src/engine/resolve.ts`:

```ts
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

export interface ResolvedSymbol {
  name: string;
  declaration: ts.Declaration;
  sourceFile: ts.SourceFile;
}

export interface Resolver {
  getSourceFile(fileName: string): ts.SourceFile;
  resolveModule(moduleName: string, containingFile: string): string | undefined;
  resolveSymbol(symbolName: string, sourceFile: ts.SourceFile): ResolvedSymbol | undefined;
}

export function createResolver(entryFileName: string): Resolver {
  const parsedFiles = new Map<string, ts.SourceFile>();
  const compilerOptions: ts.CompilerOptions = {
    allowJs: true,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    jsx: ts.JsxEmit.ReactJSX,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.Latest
  };

  function getSourceFile(fileName: string): ts.SourceFile {
    const absolutePath = path.resolve(fileName);
    const cached = parsedFiles.get(absolutePath);
    if (cached) return cached;

    const code = fs.readFileSync(absolutePath, 'utf8');
    const sourceFile = ts.createSourceFile(absolutePath, code, ts.ScriptTarget.Latest, true, getScriptKind(absolutePath));
    parsedFiles.set(absolutePath, sourceFile);
    return sourceFile;
  }

  function resolveModule(moduleName: string, containingFile: string): string | undefined {
    const resolved = ts.resolveModuleName(moduleName, containingFile, compilerOptions, ts.sys);
    if (resolved.resolvedModule?.resolvedFileName) return path.resolve(resolved.resolvedModule.resolvedFileName);

    if (moduleName.startsWith('.')) {
      const basePath = path.resolve(path.dirname(containingFile), moduleName);
      for (const extension of ['.ts', '.tsx', '.d.ts', '.js', '.jsx']) {
        const candidate = basePath.endsWith(extension) ? basePath : `${basePath}${extension}`;
        if (fs.existsSync(candidate)) return candidate;
      }
    }

    return undefined;
  }

  function resolveSymbol(symbolName: string, sourceFile: ts.SourceFile): ResolvedSymbol | undefined {
    const local = findDeclaration(symbolName, sourceFile);
    if (local) return { name: symbolName, declaration: local, sourceFile };

    for (const statement of sourceFile.statements) {
      if (!ts.isImportDeclaration(statement)) continue;
      if (!statement.importClause || !ts.isStringLiteral(statement.moduleSpecifier)) continue;

      const namedBindings = statement.importClause.namedBindings;
      if (!namedBindings || !ts.isNamedImports(namedBindings)) continue;

      for (const element of namedBindings.elements) {
        if (element.name.text !== symbolName) continue;

        const resolvedFileName = resolveModule(statement.moduleSpecifier.text, sourceFile.fileName);
        if (!resolvedFileName) return undefined;

        const importedFile = getSourceFile(resolvedFileName);
        const actualName = element.propertyName?.text ?? element.name.text;
        const declaration = findDeclaration(actualName, importedFile);
        if (!declaration) return undefined;

        return { name: actualName, declaration, sourceFile: importedFile };
      }
    }

    return undefined;
  }

  getSourceFile(entryFileName);

  return {
    getSourceFile,
    resolveModule,
    resolveSymbol
  };
}

function getScriptKind(fileName: string): ts.ScriptKind {
  if (fileName.endsWith('.tsx')) return ts.ScriptKind.TSX;
  if (fileName.endsWith('.jsx')) return ts.ScriptKind.JSX;
  if (fileName.endsWith('.js')) return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}

function findDeclaration(symbolName: string, sourceFile: ts.SourceFile): ts.Declaration | undefined {
  for (const statement of sourceFile.statements) {
    if (
      (ts.isInterfaceDeclaration(statement) ||
        ts.isTypeAliasDeclaration(statement) ||
        ts.isFunctionDeclaration(statement) ||
        ts.isClassDeclaration(statement) ||
        ts.isEnumDeclaration(statement)) &&
      statement.name?.text === symbolName
    ) {
      return statement;
    }

    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name) && declaration.name.text === symbolName) return declaration;
      }
    }
  }

  return undefined;
}
```

- [ ] **Step 5: Run resolver tests to verify they pass**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:test --no-tui -- --run test/engine-resolve.node.test.ts
```

Expected: PASS.

- [ ] **Step 6: Write failing JSDoc tests**

Create `packages/dev/storybook-addon-helpers/test/jsdoc.node.test.ts`:

```ts
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { getPropJSDoc } from '../src/engine/jsdoc.ts';

function getFirstProperty(code: string): ts.PropertySignature {
  const sourceFile = ts.createSourceFile('doc.ts', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const declaration = sourceFile.statements[0];
  if (!ts.isInterfaceDeclaration(declaration)) throw new Error('Expected interface declaration');
  const member = declaration.members[0];
  if (!ts.isPropertySignature(member)) throw new Error('Expected property signature');
  return member;
}

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
      defaultValue: '"Save"'
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
      defaultValue: null
    });
  });
});
```

- [ ] **Step 7: Run JSDoc tests to verify they fail**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:test --no-tui -- --run test/jsdoc.node.test.ts
```

Expected: FAIL because `src/engine/jsdoc.ts` does not exist.

- [ ] **Step 8: Implement JSDoc extraction**

Create `packages/dev/storybook-addon-helpers/src/engine/jsdoc.ts`:

```ts
import ts from 'typescript';

export function getPropJSDoc(node: ts.Node): { description?: string; defaultValue: string | null } {
  const docs = ts.getJSDocCommentsAndTags(node);
  const jsDoc = docs.find(ts.isJSDoc);
  const description = normalizeComment(jsDoc?.comment);
  const defaultTag = jsDoc?.tags?.find((tag) => tag.tagName.text === 'default');

  return {
    description,
    defaultValue: normalizeComment(defaultTag?.comment) ?? null
  };
}

function normalizeComment(comment: string | ts.NodeArray<ts.JSDocComment> | undefined): string | undefined {
  if (typeof comment === 'string') {
    const trimmed = comment.trim();
    return trimmed || undefined;
  }

  if (comment) {
    const text = comment
      .map((part) => part.getText())
      .join('')
      .trim();
    return text || undefined;
  }

  return undefined;
}
```

- [ ] **Step 9: Run JSDoc tests to verify they pass**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:test --no-tui -- --run test/jsdoc.node.test.ts
```

Expected: PASS.

- [ ] **Step 10: Commit**

```bash
git add packages/dev/storybook-addon-helpers/src/engine/resolve.ts packages/dev/storybook-addon-helpers/src/engine/jsdoc.ts packages/dev/storybook-addon-helpers/test/engine-resolve.node.test.ts packages/dev/storybook-addon-helpers/test/jsdoc.node.test.ts packages/dev/storybook-addon-helpers/test/fixtures/engine
git commit -m "feat(storybook-addon-helpers): add ast resolver and jsdoc parser"
```

---

### Task 3: Core Type Extraction Engine

**Files:**
- Create: `packages/dev/storybook-addon-helpers/src/engine/utility-types.ts`
- Create: `packages/dev/storybook-addon-helpers/src/engine/extract.ts`
- Create: `packages/dev/storybook-addon-helpers/test/extract.node.test.ts`
- Modify: `packages/dev/storybook-addon-helpers/test/fixtures/engine/types.ts`

- [ ] **Step 1: Extend extraction fixture**

Replace `packages/dev/storybook-addon-helpers/test/fixtures/engine/types.ts` with:

```ts
import type { ImportedProps, RenamedProps as AliasProps } from './imported.ts';

export interface LocalProps {
  /** local description */
  local: boolean;
}

export interface ParentProps {
  /** parent description */
  parent?: string;
}

export interface UsesImportedProps extends ImportedProps {
  own: string;
}

export interface ChildProps extends ParentProps {
  child: number;
}

export type LiteralProps = {
  /** type literal description */
  literal?: 'a' | 'b';
};

export type IntersectedProps = ParentProps & LiteralProps & {
  intersected: boolean;
};

export type PickedProps = Pick<ChildProps, 'parent'>;

export type OmittedProps = Omit<ChildProps, 'parent'>;

export type PartialProps = Partial<ChildProps>;

export type RequiredProps = Required<ChildProps>;

export type UsesAliasProps = AliasProps & {
  ownAlias: boolean;
};
```

- [ ] **Step 2: Write failing extraction tests**

Create `packages/dev/storybook-addon-helpers/test/extract.node.test.ts`:

```ts
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { createResolver } from '../src/engine/resolve.ts';
import { extractTypeDocs } from '../src/engine/extract.ts';

const fixturePath = path.join(__dirname, 'fixtures/engine/types.ts');

function extract(name: string) {
  const resolver = createResolver(fixturePath);
  const sourceFile = resolver.getSourceFile(fixturePath);
  return extractTypeDocs(name, sourceFile, resolver);
}

describe('extractTypeDocs', function extractTypeDocsTests() {
  it('extracts interface properties and JSDoc', function extractsInterface() {
    expect(extract('LocalProps')).toEqual({
      name: 'LocalProps',
      props: [
        {
          name: 'local',
          type: 'boolean',
          required: true,
          description: 'local description',
          defaultValue: null,
          sourceFile: fixturePath,
          declaringType: 'LocalProps'
        }
      ]
    });
  });

  it('extracts inherited and imported interface properties', function extractsExtends() {
    expect(extract('UsesImportedProps').props.map((prop) => prop.name)).toEqual(['imported', 'own']);
    expect(extract('ChildProps').props.map((prop) => prop.name)).toEqual(['parent', 'child']);
  });

  it('extracts type literals and intersections', function extractsAliases() {
    expect(extract('LiteralProps').props.map((prop) => prop.name)).toEqual(['literal']);
    expect(extract('IntersectedProps').props.map((prop) => prop.name)).toEqual(['parent', 'literal', 'intersected']);
  });

  it('resolves utility wrappers inside type aliases', function extractsUtilities() {
    expect(extract('PickedProps').props).toMatchObject([{ name: 'parent', required: false }]);
    expect(extract('OmittedProps').props.map((prop) => prop.name)).toEqual(['child']);
    expect(extract('PartialProps').props).toMatchObject([
      { name: 'parent', required: false },
      { name: 'child', required: false }
    ]);
    expect(extract('RequiredProps').props).toMatchObject([
      { name: 'parent', required: true },
      { name: 'child', required: true }
    ]);
  });
});
```

- [ ] **Step 3: Run extraction tests to verify they fail**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:test --no-tui -- --run test/extract.node.test.ts
```

Expected: FAIL because extraction files do not exist.

- [ ] **Step 4: Implement utility type transforms**

Create `packages/dev/storybook-addon-helpers/src/engine/utility-types.ts`:

```ts
import ts from 'typescript';
import type { PropDoc } from '../types.ts';

export function applyUtilityType(name: string, props: PropDoc[], typeArgs: readonly ts.TypeNode[]): PropDoc[] | undefined {
  if (name === 'Pick' && typeArgs.length >= 2) {
    const keys = extractStringKeys(typeArgs[1]);
    return props.filter((prop) => keys.has(prop.name));
  }

  if (name === 'Omit' && typeArgs.length >= 2) {
    const keys = extractStringKeys(typeArgs[1]);
    return props.filter((prop) => !keys.has(prop.name));
  }

  if (name === 'Partial') {
    return props.map((prop) => ({ ...prop, required: false }));
  }

  if (name === 'Required') {
    return props.map((prop) => ({ ...prop, required: true }));
  }

  return undefined;
}

export function getUtilityInnerType(name: string, typeArgs: readonly ts.TypeNode[]): ts.TypeNode | undefined {
  if (['Pick', 'Omit', 'Partial', 'Required'].includes(name)) return typeArgs[0];
  return undefined;
}

function extractStringKeys(typeNode: ts.TypeNode): Set<string> {
  const keys = new Set<string>();

  if (ts.isUnionTypeNode(typeNode)) {
    for (const type of typeNode.types) addStringKey(type, keys);
    return keys;
  }

  addStringKey(typeNode, keys);
  return keys;
}

function addStringKey(typeNode: ts.TypeNode, keys: Set<string>): void {
  if (ts.isLiteralTypeNode(typeNode) && ts.isStringLiteral(typeNode.literal)) {
    keys.add(typeNode.literal.text);
  }
}
```

- [ ] **Step 5: Implement extraction engine**

Create `packages/dev/storybook-addon-helpers/src/engine/extract.ts`:

```ts
import ts from 'typescript';
import { getPropJSDoc } from './jsdoc.ts';
import type { Resolver } from './resolve.ts';
import { applyUtilityType, getUtilityInnerType } from './utility-types.ts';
import type { PropDoc, PropsDoc } from '../types.ts';

export function extractTypeDocs(typeName: string, sourceFile: ts.SourceFile, resolver: Resolver): PropsDoc {
  const symbol = resolver.resolveSymbol(typeName, sourceFile);
  if (!symbol) return { name: typeName, props: [] };

  return {
    name: symbol.name,
    props: extractFromDeclaration(symbol.declaration, symbol.sourceFile, resolver, new Set())
  };
}

export function extractFromTypeNode(
  typeNode: ts.TypeNode,
  sourceFile: ts.SourceFile,
  resolver: Resolver,
  visited = new Set<string>()
): PropDoc[] {
  if (ts.isTypeLiteralNode(typeNode)) return extractMembers(typeNode.members, sourceFile, 'anonymous');

  if (ts.isIntersectionTypeNode(typeNode)) {
    return typeNode.types.flatMap((node) => extractFromTypeNode(node, sourceFile, resolver, visited));
  }

  if (ts.isTypeReferenceNode(typeNode) && ts.isIdentifier(typeNode.typeName)) {
    const typeName = typeNode.typeName.text;
    const innerType = getUtilityInnerType(typeName, typeNode.typeArguments ?? []);

    if (innerType) {
      const props = extractFromTypeNode(innerType, sourceFile, resolver, visited);
      return applyUtilityType(typeName, props, typeNode.typeArguments ?? []) ?? props;
    }

    const symbol = resolver.resolveSymbol(typeName, sourceFile);
    if (!symbol) return [];
    return extractFromDeclaration(symbol.declaration, symbol.sourceFile, resolver, visited);
  }

  return [];
}

function extractFromDeclaration(
  declaration: ts.Declaration,
  sourceFile: ts.SourceFile,
  resolver: Resolver,
  visited: Set<string>
): PropDoc[] {
  if (ts.isInterfaceDeclaration(declaration)) {
    const key = `${sourceFile.fileName}:${declaration.name.text}`;
    if (visited.has(key)) return [];
    visited.add(key);

    const inherited = declaration.heritageClauses?.flatMap((clause) =>
      clause.types.flatMap((typeExpression) => {
        const typeNode = ts.factory.createTypeReferenceNode(
          typeExpression.expression.getText(sourceFile),
          typeExpression.typeArguments
        );
        return extractFromTypeNode(typeNode, sourceFile, resolver, visited);
      })
    ) ?? [];

    return [...inherited, ...extractMembers(declaration.members, sourceFile, declaration.name.text)];
  }

  if (ts.isTypeAliasDeclaration(declaration)) {
    return extractFromTypeNode(declaration.type, sourceFile, resolver, visited).map((prop) => ({
      ...prop,
      declaringType: prop.declaringType === 'anonymous' ? declaration.name.text : prop.declaringType
    }));
  }

  return [];
}

function extractMembers(
  members: ts.NodeArray<ts.TypeElement>,
  sourceFile: ts.SourceFile,
  declaringType: string
): PropDoc[] {
  const props: PropDoc[] = [];

  for (const member of members) {
    if (!ts.isPropertySignature(member)) continue;
    const name = getPropertyName(member.name);
    if (!name) continue;

    const jsDoc = getPropJSDoc(member);
    props.push({
      name,
      type: member.type?.getText(sourceFile) ?? 'any',
      required: !member.questionToken,
      description: jsDoc.description,
      defaultValue: jsDoc.defaultValue,
      sourceFile: sourceFile.fileName,
      declaringType
    });
  }

  return props;
}

function getPropertyName(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  return undefined;
}
```

- [ ] **Step 6: Run extraction tests to verify they pass**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:test --no-tui -- --run test/extract.node.test.ts
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add packages/dev/storybook-addon-helpers/src/engine/utility-types.ts packages/dev/storybook-addon-helpers/src/engine/extract.ts packages/dev/storybook-addon-helpers/test/extract.node.test.ts packages/dev/storybook-addon-helpers/test/fixtures/engine/types.ts
git commit -m "feat(storybook-addon-helpers): extract prop docs from type nodes"
```

---

### Task 4: Component Props Type Resolution

**Files:**
- Create: `packages/dev/storybook-addon-helpers/src/engine/component-type.ts`
- Create: `packages/dev/storybook-addon-helpers/test/component-type.node.test.ts`
- Create: `packages/dev/storybook-addon-helpers/test/fixtures/engine/components.tsx`

- [ ] **Step 1: Write component fixture**

Create `packages/dev/storybook-addon-helpers/test/fixtures/engine/components.tsx`:

```tsx
import React, { forwardRef, type FC } from 'react';

export interface FunctionProps {
  fnRequired: string;
  fnOptional?: boolean;
}

export function FunctionComponent(props: FunctionProps) {
  return <div>{props.fnRequired}</div>;
}

export interface ArrowProps {
  arrowRequired: string;
}

export const ArrowComponent = (props: ArrowProps) => <div>{props.arrowRequired}</div>;

export interface ForwardRefProps {
  forwarded: string;
}

export const ForwardRefComponent = forwardRef<HTMLDivElement, ForwardRefProps>(function ForwardRefComponent(
  props,
  ref
) {
  return <div ref={ref}>{props.forwarded}</div>;
});

export interface FCProps {
  fc: string;
}

export const FCComponent: FC<FCProps> = (props) => <div>{props.fc}</div>;
```

- [ ] **Step 2: Write failing component type tests**

Create `packages/dev/storybook-addon-helpers/test/component-type.node.test.ts`:

```ts
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { createResolver } from '../src/engine/resolve.ts';
import { extractComponentDocs } from '../src/engine/component-type.ts';

const fixturePath = path.join(__dirname, 'fixtures/engine/components.tsx');

function extract(name: string) {
  const resolver = createResolver(fixturePath);
  const sourceFile = resolver.getSourceFile(fixturePath);
  return extractComponentDocs(name, sourceFile, resolver);
}

describe('extractComponentDocs', function extractComponentDocsTests() {
  it('extracts function parameter props', function extractsFunction() {
    expect(extract('FunctionComponent').props.map((prop) => prop.name)).toEqual(['fnRequired', 'fnOptional']);
  });

  it('extracts arrow function parameter props', function extractsArrow() {
    expect(extract('ArrowComponent').props.map((prop) => prop.name)).toEqual(['arrowRequired']);
  });

  it('extracts forwardRef second type argument props', function extractsForwardRef() {
    expect(extract('ForwardRefComponent').props.map((prop) => prop.name)).toEqual(['forwarded']);
  });

  it('extracts FC type argument props', function extractsFC() {
    expect(extract('FCComponent').props.map((prop) => prop.name)).toEqual(['fc']);
  });
});
```

- [ ] **Step 3: Run component tests to verify they fail**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:test --no-tui -- --run test/component-type.node.test.ts
```

Expected: FAIL because `src/engine/component-type.ts` does not exist.

- [ ] **Step 4: Implement component type resolution**

Create `packages/dev/storybook-addon-helpers/src/engine/component-type.ts`:

```ts
import ts from 'typescript';
import { extractFromTypeNode } from './extract.ts';
import type { Resolver } from './resolve.ts';
import type { PropsDoc } from '../types.ts';

export function extractComponentDocs(componentName: string, sourceFile: ts.SourceFile, resolver: Resolver): PropsDoc {
  const symbol = resolver.resolveSymbol(componentName, sourceFile);
  if (!symbol) return { name: componentName, props: [] };

  const propsType = getComponentPropsType(symbol.declaration, symbol.sourceFile);
  if (!propsType) return { name: componentName, props: [] };

  return {
    name: componentName,
    props: extractFromTypeNode(propsType, symbol.sourceFile, resolver)
  };
}

function getComponentPropsType(declaration: ts.Declaration, sourceFile: ts.SourceFile): ts.TypeNode | undefined {
  if (ts.isFunctionDeclaration(declaration)) return declaration.parameters[0]?.type;

  if (!ts.isVariableDeclaration(declaration)) return undefined;

  if (declaration.type && ts.isTypeReferenceNode(declaration.type) && isNamedType(declaration.type, ['FC', 'FunctionComponent'])) {
    return declaration.type.typeArguments?.[0];
  }

  const initializer = declaration.initializer;
  if (!initializer) return undefined;

  if (ts.isArrowFunction(initializer) || ts.isFunctionExpression(initializer)) {
    return initializer.parameters[0]?.type;
  }

  if (ts.isCallExpression(initializer) && ts.isIdentifier(initializer.expression) && initializer.expression.text === 'forwardRef') {
    return initializer.typeArguments?.[1];
  }

  if (ts.isCallExpression(initializer) && initializer.arguments.length > 1) {
    const functionArg = initializer.arguments.find((arg) => ts.isArrowFunction(arg) || ts.isFunctionExpression(arg));
    if (functionArg && (ts.isArrowFunction(functionArg) || ts.isFunctionExpression(functionArg))) {
      return functionArg.parameters[0]?.type;
    }
  }

  return undefined;
}

function isNamedType(typeNode: ts.TypeReferenceNode, names: string[]): boolean {
  return ts.isIdentifier(typeNode.typeName) && names.includes(typeNode.typeName.text);
}
```

- [ ] **Step 5: Run component tests to verify they pass**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:test --no-tui -- --run test/component-type.node.test.ts
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add packages/dev/storybook-addon-helpers/src/engine/component-type.ts packages/dev/storybook-addon-helpers/test/component-type.node.test.ts packages/dev/storybook-addon-helpers/test/fixtures/engine/components.tsx
git commit -m "feat(storybook-addon-helpers): resolve component props types"
```

---

### Task 5: Getter Runtime Types

**Files:**
- Modify: `packages/dev/storybook-addon-helpers/src/getters.ts`
- Modify: `packages/dev/storybook-addon-helpers/test/getters.node.test.tsx`

- [ ] **Step 1: Replace getters type tests with new API coverage**

Replace the docs-specific sections in `packages/dev/storybook-addon-helpers/test/getters.node.test.tsx` so imports and docs tests use `getTypeDocs`:

```ts
import { expectTypeOf, it, describe } from 'vitest';
import type { Meta, StoryObj } from '@storybook/react';
import { getMeta, getStory, getVariants, getComponentDocs, getTypeDocs } from '../src/getters.ts';

function TestComponent(props: { size: string; disabled?: boolean }) {
  return <div>Test {JSON.stringify(props)}</div>;
}

describe('getComponentDocs', function getComponentDocsSuite() {
  it('accepts type-safe docs options', function typeChecking() {
    getComponentDocs(TestComponent);
    getComponentDocs(TestComponent, {
      include: ['size'],
      order: ['size'],
      groups: { Main: ['size'] }
    });
    getComponentDocs(TestComponent, {
      exclude: ['disabled']
    });

    // @ts-expect-error include and exclude are mutually exclusive
    getComponentDocs(TestComponent, { include: ['size'], exclude: ['disabled'] });

    // @ts-expect-error unknown prop
    getComponentDocs(TestComponent, { include: ['missing'] });

    type ReturnTypeTestCompProps = ReturnType<typeof getComponentDocs<typeof TestComponent>>;

    expectTypeOf<ReturnTypeTestCompProps>().toEqualTypeOf<StoryObj<typeof TestComponent>>();
  });
});

describe('getTypeDocs', function getTypeDocsSuite() {
  it('accepts type-safe docs options', function typeChecking() {
    const actual = getTypeDocs<{ a: string; b: number }>({
      include: ['a'],
      order: ['a'],
      groups: { Required: ['a'] }
    });

    expectTypeOf<typeof actual>().toEqualTypeOf<StoryObj<{ a: string; b: number }>>();

    // @ts-expect-error invalid prop
    getTypeDocs<{ a: string }>({ include: ['b'] });

    // @ts-expect-error include and exclude are mutually exclusive
    getTypeDocs<{ a: string; b: number }>({ include: ['a'], exclude: ['b'] });
  });
});
```

Keep the existing `getMeta`, `getStory`, and `getVariants` tests from the file unchanged.

- [ ] **Step 2: Run getters tests to verify they fail**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:test --no-tui -- --run test/getters.node.test.tsx
```

Expected: FAIL because `getTypeDocs` is not exported and docs options are not accepted.

- [ ] **Step 3: Implement getter signatures**

Modify `packages/dev/storybook-addon-helpers/src/getters.ts`:

```ts
import type { ComponentProps, ComponentType } from 'react';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import type { ComponentDocsOptions, DocsOptions } from './types.ts';

export function getMeta<T extends ComponentType<any>>(
  args: Omit<Meta<T>, 'component' | 'title'> & {
    title: string;
    component?: T;
    args?: ComponentProps<T>;
  }
) {
  return args;
}

export function getStory<T extends ComponentType<any>>(component: T, _storyObj?: StoryObj<T>): T {
  return component;
}

export function getComponentDocs<T extends ComponentType<any>>(
  _component: T,
  _options?: ComponentDocsOptions<T>
) {
  return {} as StoryObj<T>;
}

export function getTypeDocs<T>(_options?: DocsOptions<T>) {
  return {} as StoryObj<T>;
}

export function getVariants<T extends ComponentType<any>>(component: T, variants: Record<string, StoryObj<T>>) {
  return variants;
}
```

- [ ] **Step 4: Run getters tests to verify they pass**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:test --no-tui -- --run test/getters.node.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/dev/storybook-addon-helpers/src/getters.ts packages/dev/storybook-addon-helpers/test/getters.node.test.tsx
git commit -m "feat(storybook-addon-helpers): add type-safe docs getter options"
```

---

### Task 6: Getter Parser And CSF Transformer

**Files:**
- Modify: `packages/dev/storybook-addon-helpers/src/getters-parser.ts`
- Modify: `packages/dev/storybook-addon-helpers/src/csf-transformer.ts`
- Create: `packages/dev/storybook-addon-helpers/src/literal.ts`
- Modify: `packages/dev/storybook-addon-helpers/test/getters-parser.node.test.ts`
- Modify: `packages/dev/storybook-addon-helpers/test/csf-transformer.node.test.ts`
- Modify: `packages/dev/storybook-addon-helpers/test/fixtures/comp-stories.tsx`
- Modify: `packages/dev/storybook-addon-helpers/test/fixtures/comp-stories-expected.tsx`

- [ ] **Step 1: Create literal helpers and parser tests**

Create `packages/dev/storybook-addon-helpers/src/literal.ts`:

```ts
import ts from 'typescript';

export function toTsExpression(value: unknown): ts.Expression {
  const factory = ts.factory;

  if (value === null || value === undefined) return factory.createNull();
  if (typeof value === 'string') return factory.createStringLiteral(value);
  if (typeof value === 'number') return factory.createNumericLiteral(value);
  if (typeof value === 'boolean') return value ? factory.createTrue() : factory.createFalse();

  if (Array.isArray(value)) {
    return factory.createArrayLiteralExpression(
      value.map((item) => toTsExpression(item)),
      true
    );
  }

  if (typeof value === 'object') {
    return factory.createObjectLiteralExpression(
      Object.entries(value as Record<string, unknown>).map(([key, item]) =>
        factory.createPropertyAssignment(key, toTsExpression(item))
      ),
      true
    );
  }

  return factory.createNull();
}

export function toLiteralValue(node: ts.Expression): unknown {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;

  if (ts.isArrayLiteralExpression(node)) return node.elements.map((element) => toLiteralValue(element as ts.Expression));

  if (ts.isObjectLiteralExpression(node)) {
    const value: Record<string, unknown> = {};
    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) continue;
      const key = getObjectPropertyName(property.name);
      if (!key) continue;
      value[key] = toLiteralValue(property.initializer as ts.Expression);
    }
    return value;
  }

  return null;
}

function getObjectPropertyName(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  return undefined;
}
```

Update `packages/dev/storybook-addon-helpers/test/getters-parser.node.test.ts` with a test that `getTypeDocs` is unwrapped like docs stories:

```ts
it('unwraps getTypeDocs as a docs-only story for the indexer', async function unwrapsGetTypeDocs() {
  const exported = await getExportedVariables({
    code: `
      import { getTypeDocs } from '@bento/storybook-addon-helpers';
      export const Props = getTypeDocs<PropsType>({ include: ['name'] });
    `
  });

  expect(exported.get('Props')).toEqual({ tags: ['!dev'] });
});
```

- [ ] **Step 2: Run parser tests to verify they fail**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:test --no-tui -- --run test/getters-parser.node.test.ts
```

Expected: FAIL because parser still references `getInterfaceDocs` and old literal helpers.

- [ ] **Step 3: Update parser constants and literal imports**

Modify `packages/dev/storybook-addon-helpers/src/getters-parser.ts`:

```ts
import ts from 'typescript';
import { readFile } from 'node:fs/promises';
import camelCase from 'camelcase';
import { toLiteralValue } from './literal.ts';

export const GET_META = 'getMeta';
export const GET_STORY = 'getStory';
export const GET_VARIANTS = 'getVariants';
export const GET_COMPONENT_DOCS = 'getComponentDocs';
export const GET_TYPE_DOCS = 'getTypeDocs';
```

In `unwrapInitializer`, replace the docs check with:

```ts
if (callee === GET_COMPONENT_DOCS || callee === GET_TYPE_DOCS) {
  return ts.factory.createObjectLiteralExpression([
    ts.factory.createPropertyAssignment(
      'tags',
      ts.factory.createArrayLiteralExpression([ts.factory.createStringLiteral('!dev')])
    )
  ]);
}
```

- [ ] **Step 4: Run parser tests to verify they pass**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:test --no-tui -- --run test/getters-parser.node.test.ts
```

Expected: PASS.

- [ ] **Step 5: Update CSF transformer tests and fixtures**

In `packages/dev/storybook-addon-helpers/test/fixtures/comp-stories.tsx`:

```tsx
import React from 'react';
import { getComponentDocs, getMeta, getStory, getTypeDocs, getVariants } from '@bento/storybook-addon-helpers';
import { Button, type InterfaceProps } from './comp.tsx';

const meta = getMeta({
  title: 'meta1'
});

export default meta;

export const ButtonProps = getComponentDocs(Button, {
  include: ['onClick'],
  groups: { Events: ['onClick'] }
});

export const FromTypeProps = getTypeDocs<InterfaceProps>();

export const FromTypeIncludeProps = getTypeDocs<InterfaceProps>({
  include: ['prop1']
});

export const FromTypeExcludeProps = getTypeDocs<InterfaceProps>({
  exclude: ['prop1', 'prop3']
});

export const NewButton1 = getStory(Button);

export const NewButton2 = getStory(Button, {
  args: { children: 'mundo' }
});

export const NewButton3 = getStory(Button, {
  args: { children: 'mundo' },
  render: () => <div>override render</div>
});

export const Styles = getVariants(Button, {
  primary: {
    args: {
      children: 'Primary!',
      onClick: function handleClick() {
        console.log('primary clicked!');
      }
    }
  },
  secondary: {
    args: {
      style: { backgroundColor: 'red', color: 'white' },
      children: 'secondary button!'
    }
  }
});
```

Update `packages/dev/storybook-addon-helpers/test/csf-transformer.node.test.ts` so it still formats actual and expected fixture output. Add a string-code test for `getTypeDocs`:

```ts
it('transforms getTypeDocs with options from code strings', async function transformTypeDocsCode() {
  const code = `
    import { getTypeDocs } from '@bento/storybook-addon-helpers';
    interface Props {
      /** label description */
      label: string;
      hidden?: boolean;
    }
    export const PropsDocs = getTypeDocs<Props>({ include: ['label'] });
  `;

  const actual = await csfTransformer({ code });

  expect(actual).toContain('"label"');
  expect(actual).not.toContain('"hidden"');
  expect(actual).toContain('"!dev"');
});
```

- [ ] **Step 6: Run transformer tests to verify they fail**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:test --no-tui -- --run test/csf-transformer.node.test.ts
```

Expected: FAIL because transformer still calls old extractors and old `getInterfaceDocs`.

- [ ] **Step 7: Implement CSF transformer wiring**

In `packages/dev/storybook-addon-helpers/src/csf-transformer.ts`, replace imports from old extractors with:

```ts
import { toStorybookArgTypes } from './adapters/storybook.ts';
import { extractComponentDocs } from './engine/component-type.ts';
import { extractTypeDocs } from './engine/extract.ts';
import { createResolver } from './engine/resolve.ts';
import { GET_COMPONENT_DOCS, GET_META, GET_STORY, GET_TYPE_DOCS, GET_VARIANTS, extractVariantNames } from './getters-parser.ts';
import { toLiteralValue, toTsExpression } from './literal.ts';
import { processPropsDoc } from './process.ts';
import type { DocsOptions } from './types.ts';
```

Add:

```ts
function getDocsOptions(node: ts.CallExpression, index: number): DocsOptions<Record<string, unknown>> {
  const argument = node.arguments[index];
  if (!argument || !ts.isObjectLiteralExpression(argument)) return {};
  return toLiteralValue(argument) as DocsOptions<Record<string, unknown>>;
}
```

Replace docs transforms:

```ts
function transformGetComponentDocs(node: ts.Node, sourceFile: ts.SourceFile) {
  if (!isCallTo(node, GET_COMPONENT_DOCS) || !ts.isIdentifier(node.arguments[0])) return;

  const resolver = createResolver(sourceFile.fileName || 'inline.tsx');
  const componentName = node.arguments[0].text;
  const rawDoc = extractComponentDocs(componentName, sourceFile, resolver);
  const processedDoc = processPropsDoc(rawDoc, getDocsOptions(node, 1));

  return toTsExpression(toStorybookArgTypes(processedDoc));
}

function transformGetTypeDocs(node: ts.Node, sourceFile: ts.SourceFile): ts.Expression | undefined {
  if (!isCallTo(node, GET_TYPE_DOCS) || node.typeArguments?.length !== 1) return;

  const typeArg = node.typeArguments[0];
  if (!ts.isTypeReferenceNode(typeArg) || !ts.isIdentifier(typeArg.typeName)) return;

  const resolver = createResolver(sourceFile.fileName || 'inline.tsx');
  const rawDoc = extractTypeDocs(typeArg.typeName.text, sourceFile, resolver);
  const processedDoc = processPropsDoc(rawDoc, getDocsOptions(node, 0));

  return toTsExpression(toStorybookArgTypes(processedDoc));
}
```

Update the transformer list from `transformGetInterfaceDocs` to `transformGetTypeDocs`. Delete `filterInterfaceArgTypes` and `extractUnionKeys`.

- [ ] **Step 8: Run transformer tests to verify they pass**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:test --no-tui -- --run test/csf-transformer.node.test.ts
```

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add packages/dev/storybook-addon-helpers/src/literal.ts packages/dev/storybook-addon-helpers/src/getters-parser.ts packages/dev/storybook-addon-helpers/src/csf-transformer.ts packages/dev/storybook-addon-helpers/test/getters-parser.node.test.ts packages/dev/storybook-addon-helpers/test/csf-transformer.node.test.ts packages/dev/storybook-addon-helpers/test/fixtures/comp-stories.tsx packages/dev/storybook-addon-helpers/test/fixtures/comp-stories-expected.tsx
git commit -m "feat(storybook-addon-helpers): wire ast docs into csf transform"
```

---

### Task 7: Delete Old Extractor Path And Replace Remaining Tests

**Files:**
- Delete: `packages/dev/storybook-addon-helpers/src/ats-extractor-component-doc.ts`
- Delete: `packages/dev/storybook-addon-helpers/src/ats-extractor-interface-doc.ts`
- Delete: `packages/dev/storybook-addon-helpers/src/ats-utils.ts`
- Delete: `packages/dev/storybook-addon-helpers/src/prop-filter.ts`
- Delete: `packages/dev/storybook-addon-helpers/test/ats-extractor-component-doc.node.test.ts`
- Delete: `packages/dev/storybook-addon-helpers/test/ats-extractor-interface-doc.node.test.ts`
- Delete: `packages/dev/storybook-addon-helpers/test/ats-utils.node.test.ts`
- Keep/adjust: `packages/dev/storybook-addon-helpers/test/plugin.node.test.ts`, `index.node.test.ts`, `stories-indexer.node.test.ts`

- [ ] **Step 1: Delete obsolete files**

Run:

```bash
rm packages/dev/storybook-addon-helpers/src/ats-extractor-component-doc.ts packages/dev/storybook-addon-helpers/src/ats-extractor-interface-doc.ts packages/dev/storybook-addon-helpers/src/ats-utils.ts packages/dev/storybook-addon-helpers/src/prop-filter.ts packages/dev/storybook-addon-helpers/test/ats-extractor-component-doc.node.test.ts packages/dev/storybook-addon-helpers/test/ats-extractor-interface-doc.node.test.ts packages/dev/storybook-addon-helpers/test/ats-utils.node.test.ts
```

Expected: files removed. Do not remove `plugin.ts`, `index.ts`, or `stories-indexer.ts`.

- [ ] **Step 2: Search for obsolete imports**

Run:

```bash
rg "ats-|atsUtils|prop-filter|GET_INTERFACE_DOCS|getInterfaceDocs|extractInterfaceDoc|extractComponentDoc" packages/dev/storybook-addon-helpers
```

Expected: no matches except changelog or historical text if present. If source/test matches remain, update them to new names before continuing.

- [ ] **Step 3: Run full package tests**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:test --no-tui
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add packages/dev/storybook-addon-helpers
git commit -m "refactor(storybook-addon-helpers): remove react docgen extractor path"
```

---

### Task 8: Consumer Migration

**Files:**
- Modify: all `*.stories.tsx` files with `getInterfaceDocs`
- Modify: `scripts/compile-readme.ts` only if it imports old extractor internals
- Do not modify: `apps/site/lib/filtered-generator.ts`

- [ ] **Step 1: Find consumer call sites**

Run:

```bash
rg -n "getInterfaceDocs|Pick<|Omit<" packages apps scripts
```

Expected before migration: matches in stories and old scripts/tests.

- [ ] **Step 2: Rename imports and calls**

For each story import:

```ts
import { getMeta, getInterfaceDocs, getStory } from '@bento/storybook-addon-helpers';
```

change to:

```ts
import { getMeta, getStory, getTypeDocs } from '@bento/storybook-addon-helpers';
```

For each call:

```ts
getInterfaceDocs<SomeType>()
```

change to:

```ts
getTypeDocs<SomeType>()
```

- [ ] **Step 3: Convert user-facing Pick/Omit generic docs calls**

Make these exact migrations:

In `packages/@bento/error/error.stories.tsx`:

```ts
export const Required = getTypeDocs<BentoErrorArgs>({
  include: ['name', 'method', 'message']
});

export const Optional = getTypeDocs<BentoErrorArgs>({
  include: ['scope', 'channel', 'docs', 'args']
});
```

In any `box` or `slots` story call that currently uses `Pick` or `Omit`, replace with `getTypeDocs<BaseType>({ include: [...] })` using the same string literal keys from the generic.

- [ ] **Step 4: Update `scripts/compile-readme.ts`**

If `scripts/compile-readme.ts` still imports deleted internals, either remove the README extractor integration or update it to call the new public engine:

```ts
import { extractComponentDocs } from '../packages/dev/storybook-addon-helpers/src/engine/component-type.ts';
import { extractTypeDocs } from '../packages/dev/storybook-addon-helpers/src/engine/extract.ts';
import { createResolver } from '../packages/dev/storybook-addon-helpers/src/engine/resolve.ts';
```

Use `toStorybookArgTypes(processPropsDoc(...))` only when it needs Storybook-shaped output.

- [ ] **Step 5: Verify migration search is clean**

Run:

```bash
rg -n "getInterfaceDocs|GET_INTERFACE_DOCS|Pick<.*getTypeDocs|Omit<.*getTypeDocs" packages apps scripts
```

Expected: no source/test matches. If docs mention the old API intentionally, leave them only if the text explicitly says it was removed.

- [ ] **Step 6: Commit**

```bash
git add packages apps scripts
git commit -m "refactor(storybook-addon-helpers): migrate docs stories to getTypeDocs"
```

---

### Task 9: Dependency Removal And Lockfile Sync

**Files:**
- Modify: `packages/dev/storybook-addon-helpers/package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Remove dependency**

In `packages/dev/storybook-addon-helpers/package.json`, remove:

```json
"react-docgen-typescript": "^2.4.0",
```

Keep:

```json
"typescript": "^6.0.3"
```

- [ ] **Step 2: Sync lockfile without lifecycle scripts**

Run:

```bash
npm install --ignore-scripts
```

Expected: `package-lock.json` updates and no package build/postinstall script runs.

- [ ] **Step 3: Verify dependency is gone**

Run:

```bash
rg -n "react-docgen-typescript" packages/dev/storybook-addon-helpers/package.json package-lock.json packages/dev/storybook-addon-helpers/src
```

Expected: no matches.

- [ ] **Step 4: Commit**

```bash
git add packages/dev/storybook-addon-helpers/package.json package-lock.json
git commit -m "chore(storybook-addon-helpers): remove react docgen dependency"
```

---

### Task 10: Final Verification

**Files:**
- No planned source edits unless verification exposes failures.

- [ ] **Step 1: Run package tests**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:test --no-tui
```

Expected: PASS.

- [ ] **Step 2: Run package typecheck**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:typecheck --no-tui
```

Expected: PASS.

- [ ] **Step 3: Run package lint**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:lint --no-tui
```

Expected: PASS.

- [ ] **Step 4: Run package build**

Run:

```bash
npx nx run @bento/storybook-addon-helpers:build --no-tui
```

Expected: PASS.

- [ ] **Step 5: Build docs Storybook**

Run:

```bash
npx nx run docs:build-storybook --no-tui
```

If this target does not exist, inspect the docs project targets:

```bash
npx nx show project docs --json
```

Then run the Storybook build target shown by Nx.

Expected: PASS and transformed docs stories build.

- [ ] **Step 6: Final search**

Run:

```bash
rg -n "react-docgen-typescript|getInterfaceDocs|GET_INTERFACE_DOCS|ats-extractor|prop-filter" packages/dev/storybook-addon-helpers packages apps scripts
```

Expected: no source/test matches except historical docs that explicitly describe removed behavior.

- [ ] **Step 7: Commit verification fixes if any**

Only if verification required edits:

```bash
git add packages apps scripts package-lock.json
git commit -m "fix(storybook-addon-helpers): resolve rewrite verification issues"
```

---

## Self-Review

**Spec coverage:** Covered public API rename/options, neutral model, shallow AST extraction, node/module resolution via TypeScript module resolution, internal utility type handling, processing order, Storybook adapter, tests, migration, dependency removal, and docs Storybook verification. Fumadocs wiring is intentionally omitted.

**Placeholder scan:** No placeholder tokens or deferred-work instructions are present. The only conditional instructions are bounded verification branches where the exact next command depends on Nx target discovery.

**Type consistency:** Public docs options use `DocsOptions<P>`, `ComponentDocsOptions<C>`, `getComponentDocs`, and `getTypeDocs` consistently. Internal extraction returns `PropsDoc` and `PropDoc[]`; Storybook conversion returns `StorybookDocs`.

**Known implementation notes:** The planned extractor is intentionally shallow. If real RAC types expose mapped or conditional object members, extraction should return partial docs without throwing, per the design.

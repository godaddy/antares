/**
 * Discovers public imports and runtime exports from package build files.
 * Eligible `PublicEntry` records become `ConsumerCase` records for `bundle-analysis.ts` to measure.
 * This module does not build packages or calculate sizes.
 * See `docs/pdrs/antares/bundle-size.md` for the design and coverage details.
 */
import { createHash } from 'node:crypto';
import { glob, readFile } from 'node:fs/promises';
import { isAbsolute, join, relative, resolve } from 'node:path';
import * as ts from 'typescript/unstable/ast';
import { createVirtualFileSystem } from 'typescript/unstable/fs';
import { API, SymbolFlags, type Snapshot, type Symbol as TsSymbol } from 'typescript/unstable/sync';

/** One public import and the exports its consumer fixture keeps reachable. */
export interface ConsumerCase {
  /** Stable ID shared by the fixture, measurement, report, and package budget. */
  id: string;
  /** Package that owns the import and its budget. */
  package: string;
  /** `entry` keeps all runtime exports reachable; `export` keeps one name reachable. */
  scope?: 'entry' | 'export';
  /** Consumer import path, such as `@godaddy/antares/Button`. */
  from: string;
  /** Export names to retain; an empty array creates a side-effect import. */
  names: string[];
}

/** Package manifest data used to discover entries and configure package measurements. */
export interface Workspace {
  /** Package name used in consumer imports and reports. */
  name: string;
  /** Absolute package directory. */
  root: string;
  /** Version read from the package manifest. */
  version?: string;
  /** Private workspaces are inventoried but not measured as public consumers. */
  private?: boolean;
  /** Peer dependencies excluded from this package's consumer bundles. */
  peerDependencies?: Record<string, string>;
}

/** A public package import resolved to its file and runtime exports. */
export interface PublicEntry {
  /** Package that declares the import. */
  package: string;
  /** Public import path. */
  from: string;
  /** Resolved file path relative to the monorepo root. */
  target: string;
  /** Resource type used to decide whether a consumer case can be created. */
  kind: 'javascript' | 'css' | 'json' | 'types' | 'metadata' | 'source' | 'asset';
  /** Runtime export names; may include `default` for CSS modules or JSON. */
  exports: string[];
  /** Why the entry is catalogued without a consumer case. */
  reason?: string;
}

/** Recursive shape accepted in the `exports` field of a package manifest. */
type ExportTarget = string | null | ExportTarget[] | { [condition: string]: ExportTarget };

/** Export conditions considered when selecting a runtime import target. */
const importConditions = new Set(['import', 'module', 'browser', 'production', 'default']);

/** Selects the first supported runtime target from a package export condition. */
function importTarget(value: ExportTarget): string | undefined {
  if (typeof value === 'string') return value;
  if (value === null) return undefined;
  if (Array.isArray(value)) {
    for (const item of value) {
      const target = importTarget(item);
      if (target) return target;
    }
    return undefined;
  }
  for (const [condition, item] of Object.entries(value)) {
    if (importConditions.has(condition)) {
      const target = importTarget(item);
      if (target) return target;
    }
  }
  return undefined;
}

/** Classifies an export target by its file extension, independent of path separators. */
export function entryKind(path: string): PublicEntry['kind'] {
  const normalizedPath = path.replaceAll('\\', '/');
  if (/\.d\.(?:ts|mts|cts)$/.test(normalizedPath)) return 'types';
  if (/\.(?:mjs|cjs|js)$/.test(normalizedPath)) return 'javascript';
  if (normalizedPath.endsWith('.css')) return 'css';
  if (normalizedPath.endsWith('/package.json')) return 'metadata';
  if (normalizedPath.endsWith('.json')) return 'json';
  if (/\.(?:scss|sass|less|ts|tsx|jsx)$/.test(normalizedPath)) return 'source';
  return 'asset';
}

/** Resolves public imports from a package's `exports` map, expanding wildcard targets against build files. */
async function packageEntries(root: string, pkg: Workspace): Promise<PublicEntry[]> {
  const manifest = JSON.parse(await readFile(join(pkg.root, 'package.json'), 'utf8')) as {
    exports?: ExportTarget;
    module?: string;
    main?: string;
  };
  const declared = manifest.exports;
  const exports =
    declared !== undefined
      ? typeof declared === 'object' &&
        declared !== null &&
        !Array.isArray(declared) &&
        Object.keys(declared).some((key) => key.startsWith('.'))
        ? (declared as Record<string, ExportTarget>)
        : { '.': declared }
      : { '.': manifest.module ?? manifest.main ?? null };
  const found = new Map<string, PublicEntry>();
  for (const [key, value] of Object.entries(exports)) {
    // A types-only export is still catalogued, but is never a browser runtime fixture.
    const target =
      importTarget(value) ??
      (value && !Array.isArray(value) && typeof value === 'object' && typeof value.types === 'string'
        ? value.types
        : undefined);
    if (!target) {
      if (value !== null) throw new Error(`No supported import target for ${pkg.name}${key.slice(1)}`);
      continue;
    }
    if (isAbsolute(target) || relative(pkg.root, resolve(pkg.root, target)).startsWith('..'))
      throw new Error(`Export outside package: ${pkg.name} ${target}`);
    const wildcard = key.includes('*');
    if (
      (key.match(/\*/g)?.length ?? 0) > 1 ||
      (target.match(/\*/g)?.length ?? 0) > 1 ||
      wildcard !== target.includes('*')
    )
      throw new Error(`Unsupported export pattern: ${pkg.name} ${key} -> ${target}`);
    const paths = wildcard ? await Array.fromAsync(glob(target, { cwd: pkg.root })) : [target];
    if (wildcard && !paths.length) throw new Error(`Public export pattern has no build output: ${pkg.name} ${target}`);
    for (const path of paths.sort()) {
      let subpath = key;
      if (wildcard) {
        const [prefix, suffix] = target.replace(/^\.\//, '').split('*');
        const actual = path.replace(/^\.\//, '');
        const captured = actual.slice(prefix.length, suffix ? -suffix.length : undefined);
        subpath = key.replace('*', captured);
        if (Object.hasOwn(exports, subpath)) continue; // Explicit overrides, including null, win.
      }
      const absolute = resolve(pkg.root, path);
      await readFile(absolute); // A stale export must fail before measuring a misleading empty case.
      const from = subpath === '.' ? pkg.name : `${pkg.name}${subpath.slice(1)}`;
      if (found.has(from)) throw new Error(`Ambiguous public export patterns for ${from}`);
      found.set(from, {
        package: pkg.name,
        from,
        target: relative(root, absolute),
        kind: entryKind(absolute),
        exports: []
      });
    }
  }
  return [...found.values()];
}

/**
 * Discovers package entries and runtime exports without importing or executing package modules.
 * The TypeScript checker follows aliases and `export *`; unsupported entries remain catalogued with
 * a reason so the report can explain why they do not produce consumer cases.
 *
 * @param root Monorepo root used to resolve package files.
 * @param packages Packages to inspect.
 * @returns Public entries sorted by import path.
 */
export async function discoverPublicApi(root: string, packages: Workspace[]): Promise<PublicEntry[]> {
  const entries = (await Promise.all(packages.map((pkg) => packageEntries(root, pkg))))
    .flat()
    .sort((a, b) => a.from.localeCompare(b.from));
  const paths = entries.filter((entry) => entry.kind === 'javascript').map((entry) => resolve(root, entry.target));
  const configFile = join(root, '.bundle-analysis', 'tsconfig.bundle-discovery.json');
  const virtualFiles = {
    [configFile]: JSON.stringify({
      compilerOptions: {
        allowJs: true,
        checkJs: false,
        noEmit: true,
        noLib: true,
        types: [],
        skipLibCheck: true,
        module: 'ESNext',
        moduleResolution: 'bundler',
        jsx: 'react-jsx'
      },
      files: paths,
      include: []
    })
  };
  const virtual = createVirtualFileSystem(virtualFiles);
  const api = new API({
    cwd: root,
    fs: {
      readFile: (fileName) => virtualFiles[fileName],
      fileExists: (fileName) => (fileName in virtualFiles ? true : undefined),
      directoryExists: (directoryName) => virtual.directoryExists?.(directoryName) || undefined
    }
  });
  let snapshot: Snapshot | undefined;
  try {
    snapshot = api.updateSnapshot({ openProjects: [configFile] });
    const project = snapshot.getProject(configFile);
    if (!project) throw new Error(`TypeScript could not load ${configFile}`);
    const checker = project.checker;
    /** Resolves aliases and keeps symbols that produce runtime values. */
    function isRuntime(symbol: TsSymbol): boolean {
      const target = symbol.flags & SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
      return !checker.isUnknownSymbol(target) && Boolean(target.flags & SymbolFlags.Value);
    }
    /** Lists runtime exports from a source file, following aliases and star re-exports. */
    function names(source: ts.SourceFile): string[] {
      const module = checker.getSymbolAtLocation(source);
      if (!module) return [];
      return checker
        .getExportsOfModule(module)
        .filter(isRuntime)
        .map((symbol) => symbol.name)
        .sort();
    }
    const privateNames = new Set(packages.filter((pkg) => pkg.private).map((pkg) => pkg.name));
    for (const entry of entries) {
      if (entry.kind === 'javascript') {
        const source = project.program.getSourceFile(resolve(root, entry.target));
        if (!source) throw new Error(`Missing public entry: ${entry.target}`);
        entry.exports = names(source);
        const hasSideEffects = source.statements.some(
          (statement) =>
            !(ts.isExportDeclaration(statement) && !statement.moduleSpecifier) && !ts.isEmptyStatement(statement)
        );
        if (!entry.exports.length && !hasSideEffects)
          entry.reason = 'Published JavaScript has no runtime exports or statements (types-only package).';
      } else if (entry.kind === 'css' && entry.target.endsWith('.module.css')) entry.exports = ['default'];
      else if (entry.kind === 'json') entry.exports = ['default'];
      if (privateNames.has(entry.package))
        entry.reason = 'Private development workspace; output and public API inventoried, no public browser consumer.';
      else if (entry.kind === 'types') entry.reason = 'Type declarations; no browser runtime.';
      else if (entry.kind === 'metadata') entry.reason = 'Package metadata; not a runtime entrypoint.';
      else if (entry.kind === 'source')
        entry.reason = 'Source/preprocessor resource; inventoried as output, requires a consumer-specific compiler.';
      else if (entry.kind === 'asset')
        entry.reason = 'Non-module resource; inventoried as output, included in consumers when referenced.';
    }
    return entries;
  } finally {
    try {
      snapshot?.dispose();
    } finally {
      api.close();
    }
  }
}

/** Creates a stable fixture and budget key from the import path, scope, and optional export name. */
function automaticId(scope: 'entry' | 'export', from: string, name?: string): string {
  const readable = [from, name]
    .filter(Boolean)
    .join('-')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 100);
  const hash = createHash('sha256')
    .update(JSON.stringify([scope, from, name]))
    .digest('hex')
    .slice(0, 12);
  return `auto-${scope}-${readable}-${hash}`;
}

/** Creates one full-entry case and one case per runtime export for eligible entries. */
export function consumerCases(entries: PublicEntry[]): ConsumerCase[] {
  const cases: ConsumerCase[] = [];
  for (const entry of entries) {
    if (entry.reason) continue;
    cases.push({
      id: automaticId('entry', entry.from),
      package: entry.package,
      scope: 'entry',
      from: entry.from,
      names: entry.exports
    });
    if (entry.kind === 'javascript') {
      for (const name of entry.exports)
        cases.push({
          id: automaticId('export', entry.from, name),
          package: entry.package,
          scope: 'export',
          from: entry.from,
          names: [name]
        });
    }
  }
  if (new Set(cases.map((item) => item.id)).size !== cases.length) throw new Error('Duplicate consumer IDs');
  return cases;
}

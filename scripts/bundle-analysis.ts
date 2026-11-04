/**
 * Builds and checks package bundle reports.
 * `bundle-size:build` runs the Nx package builds and analyses; `bundle-size:check` checks saved
 * reports against budgets without rebuilding. Use `--package-from-cwd` for one package.
 * Reports connect public entries to consumer cases; consumer measurement IDs match case IDs.
 *
 * See `docs/pdrs/antares/bundle-size.md` for the measurement scope and contributor workflow.
 */
import { readFileSync } from 'node:fs';
import { appendFile, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';
import { parseArgs } from 'node:util';
import sizeLimit from 'size-limit';
import filePlugin from '@size-limit/file';
import { visualizer } from 'rollup-plugin-visualizer';
import { build } from 'vite';
import {
  consumerBudgetKey,
  consumerCases,
  discoverPublicApi,
  type ConsumerCase,
  type PublicEntry,
  type Workspace
} from './bundle-discovery.ts';

/** Per-package output and consumer limits read from `bundle-size.json`. */
export interface BundleSizePackageConfig {
  /** Maximum raw bytes across the package's `dist/` files. */
  outputBudget?: number;
  /** Maximum gzip bytes per readable entry/export key. */
  consumerBudgets?: Record<string, number>;
}

/** Package details recorded in a report and used when bundling consumer cases. */
export interface PackageMetadata {
  /** Package name. */
  name: string;
  /** Version from the package manifest. */
  version: string;
  /** Peer dependencies excluded from the consumer bundle. */
  externals: string[];
}

/** Measured package output or one consumer bundle. */
export interface Measurement {
  /** Package name for output measurements, or consumer case ID. */
  id: string;
  /** Whether this row measures all package output or one consumer import. */
  kind: 'output' | 'consumer';
  /** Package that owns the measured files. */
  package: string;
  /** Raw bytes: all package `dist/` files or the consumer's emitted runtime files. */
  raw: number;
  /** Sum of per-file gzip sizes for consumer measurements. */
  gzip?: number;
  /** Sum of per-file Brotli sizes for consumer measurements. */
  brotli?: number;
  /** Raw bytes grouped by artifact kind. */
  groups: Record<string, number>;
  /** Emitted consumer files and raw bytes, relative to the case's output directory. */
  files?: { path: string; raw: number }[];
}

/** Serialized measurements and metadata for one package or the aggregate report. */
export interface Report {
  /** Versions and peer dependencies for packages in the report. */
  packages: PackageMetadata[];
  /** Node and tool versions used for analysis. */
  toolchain: Record<string, string>;
  /** Package output and consumer sizes. Consumer IDs match `cases`; output IDs are package names. */
  measurements: Measurement[];
  /** Public imports found in package manifests, including entries without consumer cases. */
  publicEntries: PublicEntry[];
  /** Consumer imports measured by the analyzer. */
  cases: ConsumerCase[];
}

/** Lookup tables for package output and consumer gzip limits. */
export interface Budgets {
  /** Raw output limits keyed by package name. */
  output: Record<string, number>;
  /** Gzip consumer limits keyed by `ConsumerCase.id`. */
  consumer: Record<string, number>;
}

const repositoryRoot = resolve(import.meta.dirname, '..');

/** Reads a JSON file as the caller's expected type. */
async function json<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, 'utf8')) as T;
}

/** Lists build files in stable path order and rejects symlinks. */
export async function filesIn(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = await Promise.all(
    entries.map(
      /** Resolve a directory entry to its file path or recursively list its children. */
      async function readEntry(entry) {
        const path = join(directory, entry.name);
        if (entry.isSymbolicLink()) throw new Error(`Unexpected symlink in build output: ${path}`);
        return entry.isDirectory() ? filesIn(path) : [path];
      }
    )
  );
  return paths.flat().sort();
}

/** Classifies a build file for size groups and consumer filtering. */
export function category(path: string): 'maps' | 'types' | 'css' | 'cjs' | 'esm' | 'assets' {
  if (path.endsWith('.map')) return 'maps';
  if (/\.d\.(?:ts|mts|cts)$/.test(path)) return 'types';
  if (path.endsWith('.css')) return 'css';
  if (path.endsWith('.cjs')) return 'cjs';
  if (/\.(?:js|mjs)$/.test(path)) return 'esm';
  return 'assets';
}

/** Removes source maps and declarations from consumer sizes; package output still counts them. */
export function consumerFiles(files: string[]): string[] {
  return files.filter((path) => !['maps', 'types'].includes(category(path)));
}

/** Returns raw byte totals for a file list and its artifact groups. */
async function rawSizes(files: string[]): Promise<{ raw: number; groups: Record<string, number> }> {
  let raw = 0;
  const groups: Record<string, number> = {};
  for (const path of files) {
    const bytes = (await stat(path)).size;
    raw += bytes;
    const group = category(path);
    groups[group] = (groups[group] ?? 0) + bytes;
  }
  return { raw, groups };
}

/** Creates a temporary ESM fixture that keeps the case's requested exports reachable. */
export function fixtureSource(consumerCase: ConsumerCase): string {
  let symbol = 0;
  const references: string[] = [];
  /** Alias each requested export so the fixture can retain it in a global reference. */
  const bindings = consumerCase.names.map(
    /** Convert an exported name into a local binding and remember that binding. */
    function importName(name) {
      const alias = `fixture${symbol++}`;
      references.push(alias);
      return `${/^[$A-Z_a-z][$\w]*$/.test(name) ? name : JSON.stringify(name)} as ${alias}`;
    }
  );
  const statement = bindings.length
    ? `import { ${bindings.join(', ')} } from ${JSON.stringify(consumerCase.from)};`
    : `import ${JSON.stringify(consumerCase.from)};`;
  // A visible use prevents the optimizer removing the import being measured.
  return `${statement}\nglobalThis.__bundle_fixture__ = [${references.join(', ')}];\n`;
}

/** Loads package metadata for the root npm workspace patterns. */
export async function workspaces(root: string): Promise<Workspace[]> {
  const manifest = await json<{ workspaces: string[] }>(join(root, 'package.json'));
  const result: Workspace[] = [];
  for (const pattern of manifest.workspaces) {
    if (!pattern.endsWith('/*')) throw new Error(`Unsupported workspace pattern: ${pattern}`);
    const parent = join(root, pattern.slice(0, -2));
    for (const entry of await readdir(parent, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const directory = join(parent, entry.name);
      const pkg = await json<{
        name: string;
        version?: string;
        private?: boolean;
        peerDependencies?: Record<string, string>;
      }>(join(directory, 'package.json'));
      result.push({ ...pkg, root: directory });
    }
  }
  return result.sort((a, b) => a.name.localeCompare(b.name));
}

/** Creates report metadata and the peer dependency list externalized from consumer bundles. */
export function packageMetadata(pkg: Workspace): PackageMetadata {
  if (typeof pkg.version !== 'string' || !pkg.version.trim())
    throw new Error(`Missing package version in ${join(pkg.root, 'package.json')}`);
  return {
    name: pkg.name,
    version: pkg.version,
    externals: Object.keys(pkg.peerDependencies ?? {}).sort()
  };
}

/** Returns publishable library workspaces, excluding private packages and applications under `apps/`. */
function measuredWorkspaces(root: string, packages: Workspace[]): Workspace[] {
  return packages.filter((pkg) => !pkg.private && relative(root, pkg.root).split(sep)[0] !== 'apps');
}

/** Resolves a package report directory under `.bundle-analysis/`. */
function packageOutput(root: string, pkg: Workspace): string {
  const projectRoot = relative(root, pkg.root);
  if (projectRoot.startsWith('..')) throw new Error(`Package is outside the workspace: ${pkg.name}`);
  return join(root, '.bundle-analysis', projectRoot);
}

/** Checks whether a parsed JSON value is a non-array object. */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Checks whether a value is a non-negative safe integer. */
function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
}

/** Checks the readable key format used by consumer budgets. */
function isConsumerBudgetKey(value: string): boolean {
  if (value.startsWith('entry:')) return value.length > 'entry:'.length && !value.includes('#');
  if (!value.startsWith('export:')) return false;
  const separator = value.indexOf('#', 'export:'.length);
  return separator > 'export:'.length && separator < value.length - 1 && !value.slice(separator + 1).includes('#');
}

/** Validates the keys and byte limits in a package's budget config. */
function validatePackageConfig(value: unknown, pkg: Workspace, configPath: string): BundleSizePackageConfig {
  if (!isRecord(value))
    throw new Error(`Invalid bundle-size config for ${pkg.name}: expected a JSON object in ${configPath}.`);
  const allowedKeys = new Set(['outputBudget', 'consumerBudgets']);
  const unknownKey = Object.keys(value).find((key) => !allowedKeys.has(key));
  if (unknownKey) throw new Error(`Unknown bundle-size config key ${unknownKey} in ${configPath}`);

  if (value.outputBudget !== undefined && !isNonNegativeInteger(value.outputBudget))
    throw new Error(`Invalid outputBudget in ${configPath}: expected a non-negative integer.`);

  if (value.consumerBudgets !== undefined) {
    if (!isRecord(value.consumerBudgets))
      throw new Error(`Invalid consumerBudgets in ${configPath}: expected readable keys and byte limits.`);
    for (const [key, limit] of Object.entries(value.consumerBudgets)) {
      if (!isConsumerBudgetKey(key) || !isNonNegativeInteger(limit))
        throw new Error(
          `Invalid consumer budget ${key} in ${configPath}: expected an entry/export key and non-negative integer.`
        );
    }
  }

  return value as BundleSizePackageConfig;
}

/** Loads a package's `bundle-size.json`; an absent file means no limits are configured. */
async function packageConfig(pkg: Workspace): Promise<BundleSizePackageConfig> {
  const configPath = join(pkg.root, 'bundle-size.json');
  let source: string;
  try {
    source = await readFile(configPath, 'utf8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return {};
    throw error;
  }
  let value: unknown;
  try {
    value = JSON.parse(source);
  } catch (error) {
    throw new Error(`Invalid JSON in ${configPath}: ${(error as Error).message}`);
  }
  return validatePackageConfig(value, pkg, configPath);
}

/** Converts readable config keys to stable IDs used by measurements and generated artifacts. */
function packageBudgets(pkg: Workspace, config: BundleSizePackageConfig, cases: ConsumerCase[]): Budgets {
  const idsByBudgetKey = new Map<string, string>();
  for (const consumerCase of cases) {
    if (consumerCase.package !== pkg.name)
      throw new Error(`Consumer case belongs to the wrong package: ${consumerCase.id}`);
    const key = consumerBudgetKey(consumerCase);
    if (consumerCase.budgetKey !== undefined && consumerCase.budgetKey !== key)
      throw new Error(`Invalid readable budget key for ${consumerCase.id}: expected ${key}.`);
    if (idsByBudgetKey.has(key)) throw new Error(`Duplicate consumer budget key in ${pkg.name}: ${key}`);
    idsByBudgetKey.set(key, consumerCase.id);
  }
  const consumer = Object.fromEntries(
    Object.entries(config.consumerBudgets ?? {}).map(([key, limit]) => [idsByBudgetKey.get(key) ?? key, limit])
  );
  return {
    output: config.outputBudget === undefined ? {} : { [pkg.name]: config.outputBudget },
    consumer
  };
}

/** Combines summary limits using only budgets from each measurement's owning package. */
function mergeBudgets(reports: Report[], budgets: Budgets[]): Budgets {
  const combined: Budgets = { output: {}, consumer: {} };
  for (const [index, report] of reports.entries()) {
    for (const item of report.measurements) {
      const limit = budgets[index][item.kind][item.id];
      if (limit !== undefined) combined[item.kind][item.id] = limit;
    }
  }
  return combined;
}

/** Returns versions for the root analysis tools and the running Node process. */
function toolchain(): Record<string, string> {
  return Object.fromEntries(
    ['vite', 'rolldown', 'tsdown', 'typescript', 'size-limit', '@size-limit/file', 'rollup-plugin-visualizer']
      .map(
        /** Read a tool's installed package version from this checkout. */
        function toolVersion(name) {
          // The measurement harness and its tools always come from the current checkout.
          const manifest = JSON.parse(readFileSync(join(repositoryRoot, 'node_modules', name, 'package.json'), 'utf8'));
          return [name, manifest.version as string];
        }
      )
      .concat([['node', process.versions.node]])
  );
}

/**
 * Bundles and measures one consumer case, then writes treemap, sunburst, and network reports.
 * Peer dependencies stay external; source maps and declarations are excluded from consumer sizes.
 * Raw, gzip, and Brotli totals are calculated from the emitted files.
 *
 * @param consumerCase One automatically discovered import produced by `consumerCases`.
 * @param root Monorepo root used for dependency resolution and Visualizer paths.
 * @param output Package report directory containing per-case output subdirectories.
 * @param externals Peer package names that remain imports instead of being bundled.
 */
export async function measureConsumer(
  consumerCase: ConsumerCase,
  root: string,
  output: string,
  externals: string[]
): Promise<Measurement> {
  if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(consumerCase.id))
    throw new Error(`Unsafe consumer case ID: ${consumerCase.id}`);
  const directory = join(output, 'consumers', consumerCase.id);
  const entry = join(output, 'entries', `${consumerCase.id}.mjs`);
  await mkdir(join(output, 'entries'), { recursive: true });
  await writeFile(entry, fixtureSource(consumerCase));
  const reportDirectory = join(output, 'reports', consumerCase.id);
  await mkdir(reportDirectory, { recursive: true });
  await build({
    root,
    configFile: false,
    mode: 'production',
    envFile: false,
    publicDir: false,
    logLevel: 'error',
    define: { 'process.env.NODE_ENV': JSON.stringify('production') },
    plugins: [
      visualizer({
        filename: join(reportDirectory, 'treemap.html'),
        title: `${consumerCase.id} · bundle treemap`,
        template: 'treemap',
        gzipSize: true,
        projectRoot: root
      }),
      visualizer({
        filename: join(reportDirectory, 'sunburst.html'),
        title: `${consumerCase.id} · bundle sunburst`,
        template: 'sunburst',
        projectRoot: root
      }),
      visualizer({
        filename: join(reportDirectory, 'network.html'),
        title: `${consumerCase.id} · dependency network`,
        template: 'network',
        projectRoot: root
      })
    ],
    build: {
      outDir: directory,
      emptyOutDir: true,
      target: 'es2022',
      minify: true,
      sourcemap: true,
      cssCodeSplit: false,
      assetsInlineLimit: 0,
      reportCompressedSize: false,
      modulePreload: false,
      rolldownOptions: {
        input: entry,
        external: (id) => externals.some((name) => id === name || id.startsWith(`${name}/`)),
        output: { format: 'es' }
      }
    }
  });
  const files = consumerFiles(await filesIn(directory));
  if (!files.length) throw new Error(`Consumer ${consumerCase.id} produced no runtime files`);
  const sizes = await rawSizes(files);
  if (!sizes.raw) throw new Error(`Consumer ${consumerCase.id} produced an empty bundle`);
  // Upstream declares Promise<object>; its API returns an array of check results.
  const results = await sizeLimit([filePlugin], {
    checks: [{ files, gzip: true }, { files }]
  });
  if (!Array.isArray(results) || results.length !== 2 || results.some((item) => !Number.isSafeInteger(item.size))) {
    throw new Error(`Invalid Size Limit result for ${consumerCase.id}`);
  }
  const [gzip, brotli] = results as { size: number }[];
  return {
    id: consumerCase.id,
    kind: 'consumer',
    package: consumerCase.package,
    ...sizes,
    gzip: gzip.size,
    brotli: brotli.size,
    files: await Promise.all(
      files.map(
        /** Store each emitted file's package-relative path and raw byte count. */
        async function fileSize(path) {
          return { path: relative(directory, path), raw: (await stat(path)).size };
        }
      )
    )
  };
}

/**
 * Returns diagnostics for missing or unused budgets, invalid measurements, or limits that were exceeded.
 * Output uses raw bytes; consumer cases use gzip bytes. This function does not rebuild or remeasure.
 */
export function checkBudgets(report: Report, budgets: Budgets): string[] {
  const measuredIds = { output: new Set<string>(), consumer: new Set<string>() };
  const failures = report.measurements.flatMap(
    /** Check the relevant budget and measurement for one report row. */
    function checkMeasurement(item) {
      measuredIds[item.kind].add(item.id);
      const metric = item.kind === 'consumer' ? 'gzip' : 'raw';
      const size = item[metric];
      const limit = budgets[item.kind][item.id];
      if (!Number.isSafeInteger(limit) || limit < 0) return [`${item.id}: missing or invalid ${metric} budget`];
      if (size === undefined || !Number.isSafeInteger(size) || size < 0)
        return [`${item.id}: invalid ${metric} measurement`];
      return size > limit ? [`${item.id}: ${size} B ${metric} > ${limit} B (+${size - limit} B)`] : [];
    }
  );
  for (const kind of ['output', 'consumer'] as const) {
    for (const id of Object.keys(budgets[kind])) {
      if (!measuredIds[kind].has(id)) failures.push(`${id}: unused ${kind} budget (no matching measurement)`);
    }
  }
  return failures;
}

/** Adds the owning package to diagnostics, including budgets with no matching case. */
function packageBudgetFailures(report: Report, budgets: Budgets): string[] {
  return checkBudgets(report, budgets).map((failure) => `${report.packages[0].name}: ${failure}`);
}

/** Renders package metadata, measurements, and budget diagnostics as Markdown. */
export function markdown(
  report: Report,
  budgets: Budgets,
  failures = report.packages.length === 1 ? packageBudgetFailures(report, budgets) : checkBudgets(report, budgets)
): string {
  const lines = [
    '# Bundle analysis',
    '',
    "Consumer builds use production ES2022 settings; each package's peer dependencies are externalized.",
    '',
    '| Package | Version | External peer dependencies |',
    '| --- | --- | --- |',
    ...report.packages.map(
      (pkg) => `| ${pkg.name} | ${pkg.version} | ${pkg.externals.length ? pkg.externals.join(', ') : 'None'} |`
    ),
    '',
    '| Case | Metric | Size | Limit | Status |',
    '| --- | --- | ---: | ---: | --- |'
  ];
  for (const item of report.measurements) {
    const metric = item.kind === 'consumer' ? 'gzip' : 'raw';
    const size = item[metric];
    const limit = budgets[item.kind][item.id];
    const validSize = typeof size === 'number' && Number.isSafeInteger(size) && size >= 0;
    const validLimit = Number.isSafeInteger(limit) && limit >= 0;
    lines.push(
      `| ${item.kind}: ${item.id} | ${metric} | ${validSize ? `${size} B` : 'invalid'} | ${validLimit ? `${limit} B` : 'missing'} | ${validSize && validLimit && typeof size === 'number' && size <= limit ? 'PASS' : 'FAIL'} |`
    );
  }
  lines.push('', `## Budget check: ${failures.length ? 'FAIL' : 'PASS'}`);
  if (failures.length) lines.push('', ...failures.map((failure) => `- ${failure}`));
  lines.push(
    '',
    'Output raw includes both module formats, CSS, declarations, maps and assets in dist. It is not a browser transfer size or an npm tarball size.',
    '',
    'Consumer gzip/Brotli totals sum each emitted file independently; source maps and declarations are excluded. Assets fetched from remote services at runtime are outside these bundle metrics.',
    ''
  );
  return lines.join('\n');
}

/** Escapes report values before embedding them in HTML. */
function htmlEscape(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

const reportStyles = readFileSync(join(import.meta.dirname, 'bundle-report.css'), 'utf8');

/** Builds the searchable HTML index and links each case to its Visualizer reports. */
function indexHtml(report: Report, reportLink: (item: Measurement) => string = (item) => `reports/${item.id}`): string {
  const cases = new Map(report.cases.map((consumerCase) => [consumerCase.id, consumerCase]));
  const consumerMeasurements = report.measurements.filter((item) => item.kind === 'consumer');
  const formatNumber = new Intl.NumberFormat('en-US').format;
  const packageCount = new Set(report.measurements.map((item) => item.package)).size;
  const rows = consumerMeasurements.map(
    /** Render one consumer measurement as a searchable table row with report links. */
    function caseRow(item) {
      const consumerCase = cases.get(item.id);
      const label =
        consumerCase?.scope === 'entry'
          ? `${consumerCase.from} (all exports)`
          : consumerCase?.scope === 'export'
            ? `${consumerCase.from}#${consumerCase.names[0]}`
            : item.id;
      const href = htmlEscape(reportLink(item));
      const searchText = htmlEscape(`${item.package} ${label} ${item.id}`);
      return `<tr class="case-row" data-search="${searchText}"><td><span class="package-name">${htmlEscape(item.package)}</span><span class="case-name">${htmlEscape(label)}</span></td><td class="number">${formatNumber(item.raw)} B</td><td class="number">${formatNumber(item.gzip ?? 0)} B</td><td class="number">${formatNumber(item.brotli ?? 0)} B</td><td><nav class="explore-links" aria-label="Visualizations for ${htmlEscape(item.id)}"><a href="${href}/treemap.html">Treemap</a><a href="${href}/sunburst.html">Sunburst</a><a href="${href}/network.html">Network</a></nav></td></tr>`;
    }
  );
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>Antares · Bundle report</title>
  <style>${reportStyles}</style>
</head>
<body>
  <header class="page-header">
    <p class="eyebrow">Antares · bundle report</p>
    <h1>Bundle size</h1>
    <p class="intro">Production consumer bundles; each package's declared peer dependencies are externalized. Sizes are in bytes.</p>
    <p class="summary">${packageCount} packages <span aria-hidden="true">·</span> ${consumerMeasurements.length} consumer cases</p>
  </header>
  <main class="page">
    <div class="toolbar">
      <label class="filter-label">
        <span>Filter</span>
        <input class="filter" id="filter" type="search" placeholder="Package or import" aria-label="Filter by package or import">
      </label>
      <span class="result-count" id="result-count" aria-live="polite">${consumerMeasurements.length} cases</span>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Package / import</th><th>Raw</th><th>Gzip</th><th>Brotli</th><th>Visualize</th></tr></thead>
        <tbody>
          ${rows.join('')}
          <tr class="empty-row" id="empty-row" hidden><td colspan="5">No consumer cases match this filter.</td></tr>
        </tbody>
      </table>
    </div>
  </main>
  <script>
    const filter = document.querySelector('#filter');
    const rows = [...document.querySelectorAll('.case-row')];
    const count = document.querySelector('#result-count');
    const empty = document.querySelector('#empty-row');
    filter.addEventListener('input', () => {
      const query = filter.value.trim().toLocaleLowerCase();
      let visible = 0;
      for (const row of rows) {
        row.hidden = !row.dataset.search.toLocaleLowerCase().includes(query);
        if (!row.hidden) visible++;
      }
      count.textContent = visible + ' of ' + rows.length + ' cases';
      empty.hidden = visible !== 0;
    });
  </script>
</body>
</html>`;
}

/** Maps work with bounded concurrency, preserving input order and draining started work before rejecting. */
export async function mapConcurrent<T, U>(items: T[], concurrency: number, run: (item: T) => Promise<U>): Promise<U[]> {
  if (!Number.isSafeInteger(concurrency) || concurrency < 1)
    throw new RangeError('Concurrency must be a positive integer.');
  const results: U[] = [];
  let next = 0;
  let failed = false;
  let failureIndex = Infinity;
  let failure: unknown;

  /** Stops taking work after a failure while allowing every started operation to settle. */
  async function worker(): Promise<void> {
    while (!failed && next < items.length) {
      const index = next++;
      try {
        results[index] = await run(items[index]);
      } catch (error) {
        failed = true;
        // Keep the same diagnostic as sequential execution if more than one started case fails.
        if (index < failureIndex) {
          failureIndex = index;
          failure = error;
        }
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  if (failed) throw failure;
  return results;
}

/** Discovers, measures, and returns one package report after Nx has built its `dist/`. */
async function analyzePackage(root: string, pkg: Workspace, output: string): Promise<Report> {
  const metadata = packageMetadata(pkg);
  const publicEntries = await discoverPublicApi(root, [pkg]);
  const consumers = consumerCases(publicEntries);
  await mkdir(output, { recursive: true });
  await mkdir(join(output, 'entries'), { recursive: true });
  const measurements: Measurement[] = [];
  const files = await filesIn(join(pkg.root, 'dist'));
  if (!files.length) throw new Error(`Missing output for ${pkg.name}; run the Nx build first.`);
  measurements.push({ id: pkg.name, package: pkg.name, kind: 'output', ...(await rawSizes(files)) });
  measurements.push(
    ...(await mapConcurrent(
      consumers,
      2,
      /** Vite resolves each independent consumer from this checkout and its workspace dependencies. */
      async function measureCase(consumerCase) {
        const measurement = await measureConsumer(consumerCase, root, output, metadata.externals);
        console.log(`Measured ${consumerCase.id}`);
        return measurement;
      }
    ))
  );
  return {
    packages: [metadata],
    toolchain: toolchain(),
    measurements,
    publicEntries,
    cases: consumers
  };
}

/**
 * Checks a generated report's package metadata and measurement coverage before checking budgets.
 * It does not rediscover exports or verify that measurements match the current source; rebuild to refresh them.
 */
function validateReport(report: Report, pkg: Workspace, reportPath: string): Report {
  if (!Array.isArray(report?.packages) || !Array.isArray(report?.cases) || !Array.isArray(report?.measurements))
    throw new Error(`Invalid bundle report for ${pkg.name}; run its bundle-size:build target first: ${reportPath}`);
  const expectedPackage = packageMetadata(pkg);
  const reportedPackage = report.packages[0];
  if (
    report.packages.length !== 1 ||
    reportedPackage?.name !== expectedPackage.name ||
    reportedPackage.version !== expectedPackage.version ||
    JSON.stringify(reportedPackage.externals) !== JSON.stringify(expectedPackage.externals)
  ) {
    throw new Error(`Stale package metadata for ${pkg.name}; run its bundle-size:build target first.`);
  }

  const expectedIds = new Set([
    `output:${pkg.name}`,
    ...report.cases.map((consumerCase) => `consumer:${consumerCase.id}`)
  ]);
  const budgetKeys = report.cases.map(consumerBudgetKey);
  if (
    expectedIds.size !== report.cases.length + 1 ||
    new Set(budgetKeys).size !== report.cases.length ||
    report.cases.some(
      (consumerCase, index) => consumerCase.budgetKey !== undefined && consumerCase.budgetKey !== budgetKeys[index]
    ) ||
    report.measurements.length !== expectedIds.size ||
    report.cases.some((consumerCase) => consumerCase.package !== pkg.name)
  ) {
    throw new Error(`Inconsistent measurements in bundle report for ${pkg.name}: ${reportPath}`);
  }
  for (const item of report.measurements) {
    // Each expected identity must be matched exactly once, including the package output.
    if (item.package !== pkg.name || !expectedIds.delete(`${item.kind}:${item.id}`))
      throw new Error(`Inconsistent measurements in bundle report for ${pkg.name}: ${reportPath}`);
  }
  return report;
}

/** Merges package reports that share a toolchain and have unique measurement IDs. */
function mergeReports(reports: Report[]): Report {
  if (!reports.length) throw new Error('No package bundle reports were found.');
  const first = reports[0];
  for (const report of reports.slice(1)) {
    if (JSON.stringify(report.toolchain) !== JSON.stringify(first.toolchain))
      throw new Error('Package reports use different toolchains.');
  }
  const measurements = reports.flatMap((report) => report.measurements);
  if (new Set(measurements.map((item) => `${item.kind}:${item.id}`)).size !== measurements.length)
    throw new Error('Duplicate bundle measurement IDs across packages.');
  const packages = reports.flatMap((report) => report.packages);
  if (new Set(packages.map((item) => item.name)).size !== packages.length)
    throw new Error('Duplicate package metadata across package reports.');
  return {
    packages,
    toolchain: first.toolchain,
    measurements,
    publicEntries: reports.flatMap((report) => report.publicEntries),
    cases: reports.flatMap((report) => report.cases)
  };
}

/** Writes a package's metrics, API catalog, Markdown summary, and HTML index. */
async function writePackageArtifacts(report: Report, pkg: Workspace, output: string, budgets: Budgets): Promise<void> {
  const summary = markdown(report, budgets);
  await mkdir(output, { recursive: true });
  await writeFile(join(output, 'index.html'), indexHtml(report));
  await writeFile(join(output, 'public-api.json'), `${JSON.stringify(report.publicEntries, null, 2)}\n`);
  await writeFile(join(output, 'summary.md'), summary);
  // Publish checkable measurements only after all package artifacts have been written.
  await writeFile(join(output, 'metrics.json'), `${JSON.stringify(report, null, 2)}\n`);
  console.log(`${report.measurements.length} measurements for ${pkg.name}. Reports: ${output}/index.html`);
}

/** Rebuilds one package report, invalidating previous artifacts before any analysis can fail. */
export async function buildPackageReport(root: string, pkg: Workspace, output: string): Promise<void> {
  await rm(join(output, 'metrics.json'), { force: true });
  for (const artifact of ['index.html', 'public-api.json', 'summary.md', 'consumers', 'reports', 'entries']) {
    await rm(join(output, artifact), { recursive: true, force: true });
  }
  const config = await packageConfig(pkg);
  const report = await analyzePackage(root, pkg, output);
  const budgets = packageBudgets(pkg, config, report.cases);
  await writePackageArtifacts(report, pkg, output, budgets);
}

/** Writes aggregate reports before failing check mode on package budget diagnostics. */
async function writeAggregateArtifacts(
  root: string,
  output: string,
  packages: Workspace[],
  reports: Report[],
  options: { check: boolean }
): Promise<void> {
  const report = mergeReports(reports);
  const configs = await Promise.all(packages.map(packageConfig));
  const packageLimits = configs.map((config, index) => packageBudgets(packages[index], config, reports[index].cases));
  const budgets = mergeBudgets(reports, packageLimits);
  const failures = reports.flatMap((packageReport, index) =>
    packageBudgetFailures(packageReport, packageLimits[index])
  );
  const summary = markdown(report, budgets, failures);
  const reportDirectories = new Map(
    packages.map((pkg) => [pkg.name, relative(output, packageOutput(root, pkg)).replaceAll('\\', '/')])
  );
  const reportLink = (item: Measurement) => `${reportDirectories.get(item.package)}/reports/${item.id}`;
  await mkdir(output, { recursive: true });
  await writeFile(join(output, 'metrics.json'), `${JSON.stringify(report, null, 2)}\n`);
  await writeFile(join(output, 'index.html'), indexHtml(report, reportLink));
  await writeFile(join(output, 'public-api.json'), `${JSON.stringify(report.publicEntries, null, 2)}\n`);
  await writeFile(join(output, 'summary.md'), summary);
  if (options.check && process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
  console.log(
    `${report.measurements.length} measurements across ${packages.length} packages. Reports: ${output}/index.html`
  );
  if (options.check && failures.length) throw new Error(`Bundle check failed:\n${failures.join('\n')}`);
}

/** Reads package reports from disk and writes their aggregate without remeasuring. */
export async function aggregateReportsFromDisk(
  root: string,
  output: string,
  options: { check: boolean }
): Promise<void> {
  const packages = measuredWorkspaces(root, await workspaces(root));
  const reports: Report[] = [];
  for (const pkg of packages) {
    const reportPath = join(packageOutput(root, pkg), 'metrics.json');
    try {
      reports.push(validateReport(await json<Report>(reportPath), pkg, reportPath));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT')
        throw new Error(`Missing analysis for ${pkg.name}; run npm run bundle-size:build first.`);
      throw error;
    }
  }
  await writeAggregateArtifacts(root, output, packages, reports, { check: options.check });
}

/** Checks one package's saved report and budgets without rebuilding it. */
export async function checkPackageReportFromDisk(pkg: Workspace, output: string): Promise<void> {
  const reportPath = join(output, 'metrics.json');
  let report: Report;
  try {
    report = validateReport(await json<Report>(reportPath), pkg, reportPath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT')
      throw new Error(`Missing analysis for ${pkg.name} at ${reportPath}; run its bundle-size:build target first.`);
    throw error;
  }

  const budgets = packageBudgets(pkg, await packageConfig(pkg), report.cases);
  const failures = packageBudgetFailures(report, budgets);
  await writeFile(join(output, 'summary.md'), markdown(report, budgets, failures));
  if (failures.length) throw new Error(`Bundle check failed for ${pkg.name}:\n${failures.join('\n')}`);
  console.log(`${report.measurements.length} measurements for ${pkg.name}; all bundle budgets passed.`);
}

/**
 * Parses CLI options and runs one package analysis, aggregate, or budget check.
 * `--check` alone checks all packages; combine it with `--package-from-cwd` to check one package.
 * `--output` overrides the report destination.
 */
async function main(): Promise<void> {
  const { values } = parseArgs({
    options: {
      output: { type: 'string' },
      check: { type: 'boolean' },
      aggregate: { type: 'boolean' },
      'package-from-cwd': { type: 'boolean' }
    }
  });
  const root = repositoryRoot;
  const output = resolve(values.output ?? join(root, '.bundle-analysis'));
  if (output === root) throw new Error('Use a dedicated report output directory.');

  // --check alone checks all packages; alongside --package-from-cwd it checks only that package.
  const packageMode = Boolean(values['package-from-cwd']);
  const aggregateMode = Boolean(values.aggregate || (values.check && !packageMode));
  const modes = [aggregateMode, packageMode].filter(Boolean).length;
  if (modes !== 1) throw new Error('Choose exactly one mode: --package-from-cwd, --aggregate, or --check.');

  if (values['package-from-cwd']) {
    const manifest = await json<{ name: string }>(join(process.cwd(), 'package.json'));
    const pkg = measuredWorkspaces(root, await workspaces(root)).find((item) => item.name === manifest.name);
    if (!pkg) throw new Error(`Unknown measured workspace: ${manifest.name}`);
    const packageReportDirectory = values.output ? output : packageOutput(root, pkg);
    if (values.check) return checkPackageReportFromDisk(pkg, packageReportDirectory);
    return buildPackageReport(root, pkg, packageReportDirectory);
  }
  await aggregateReportsFromDisk(root, output, { check: Boolean(values.check) });
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename)) {
  main().catch(
    /** Print a CLI failure and return a non-zero exit status. */
    function reportError(error) {
      console.error(error);
      process.exitCode = 1;
    }
  );
}

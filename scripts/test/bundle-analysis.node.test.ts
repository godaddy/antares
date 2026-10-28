import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { discoverPublicApi, consumerCases, entryKind, type PublicEntry, type Workspace } from '../bundle-discovery.ts';
import {
  aggregateReportsFromDisk,
  checkPackageReportFromDisk,
  category,
  checkBudgets,
  consumerFiles,
  filesIn,
  fixtureSource,
  markdown,
  measureConsumer,
  packageMetadata,
  type Budgets,
  type Report
} from '../bundle-analysis.ts';

const temporaryDirectories: string[] = [];
afterEach(async function cleanFixtures() {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

/** Create a small report fixture for budget and summary contract tests. */
function report(): Report {
  return {
    packages: [{ name: '@test/package', version: '1.0.0', externals: ['react', 'react-dom'] }],
    toolchain: { node: '24.14.1', vite: '8.3.4', rolldown: '1.2.14' },
    measurements: [
      { id: '@test/package', kind: 'output', package: '@test/package', raw: 100, groups: { esm: 100 } },
      {
        id: 'button',
        kind: 'consumer',
        package: '@test/package',
        raw: 80,
        gzip: 50,
        brotli: 45,
        groups: { esm: 60, css: 20 },
        files: [{ path: 'consumers/button/index.js', raw: 80 }]
      }
    ],
    publicEntries: [],
    cases: [{ id: 'button', package: '@test/package', from: '@test/package', names: ['Button'] }]
  };
}

const budgets: Budgets = { output: { '@test/package': 100 }, consumer: { button: 50 } };

/** Create a package workspace containing one saved report for disk-check tests. */
async function savedReportWorkspace(value: Report = report()) {
  const root = await mkdtemp(join(tmpdir(), 'bundle-saved-report-'));
  temporaryDirectories.push(root);
  const packageRoot = join(root, 'packages', 'fixture-package');
  const output = join(root, '.bundle-analysis', 'packages', 'fixture-package');
  await mkdir(packageRoot, { recursive: true });
  await mkdir(output, { recursive: true });
  await writeFile(join(root, 'package.json'), JSON.stringify({ workspaces: ['packages/*'] }));
  await writeFile(
    join(packageRoot, 'package.json'),
    JSON.stringify({
      name: '@test/package',
      version: '1.0.0',
      peerDependencies: { react: '^19.0.0', 'react-dom': '^19.0.0' }
    })
  );
  await writeFile(
    join(packageRoot, 'bundle-size.json'),
    JSON.stringify({ outputBudget: 100, consumerBudgets: { button: 50 } })
  );
  await writeFile(join(output, 'metrics.json'), `${JSON.stringify(value)}\n`);
  const pkg: Workspace = {
    name: '@test/package',
    root: packageRoot,
    version: '1.0.0',
    peerDependencies: { react: '^19.0.0', 'react-dom': '^19.0.0' }
  };
  return { root, output, pkg };
}

describe('bundle measurement contracts', function bundleMeasurementTests() {
  it('classifies package metadata paths with Windows separators', function classifiesWindowsMetadata() {
    expect(entryKind(String.raw`C:\workspace\packages\button\package.json`)).toBe('metadata');
  });

  it('checks valid saved reports in package and aggregate modes', async function checksSavedReports() {
    const fixture = await savedReportWorkspace();
    await expect(checkPackageReportFromDisk(fixture.pkg, fixture.output)).resolves.toBeUndefined();
    await expect(
      aggregateReportsFromDisk(fixture.root, join(fixture.root, '.bundle-analysis'), { check: true })
    ).resolves.toBeUndefined();
  });

  const invalidSavedReports: {
    name: string;
    update: (value: Report) => void;
    expectedError: RegExp;
  }[] = [
    {
      name: 'a missing consumer measurement',
      update(value) {
        value.measurements = value.measurements.filter((item) => item.kind !== 'consumer');
      },
      expectedError: /Inconsistent measurements/
    },
    {
      name: 'a duplicate consumer measurement',
      update(value) {
        value.measurements.push({ ...value.measurements[1] });
      },
      expectedError: /Inconsistent measurements/
    },
    {
      name: 'a stale package version',
      update(value) {
        value.packages[0].version = '2.0.0';
      },
      expectedError: /Stale package metadata/
    },
    {
      name: 'stale peer dependency metadata',
      update(value) {
        value.packages[0].externals = ['react'];
      },
      expectedError: /Stale package metadata/
    }
  ];

  for (const scenario of invalidSavedReports) {
    it(`rejects ${scenario.name} before loading budgets in both check modes`, async function rejectsInvalidSavedReports() {
      const value = report();
      scenario.update(value);
      const fixture = await savedReportWorkspace(value);
      // This invalid config makes a budget-loading regression distinguishable from report validation.
      await writeFile(join(fixture.pkg.root, 'bundle-size.json'), JSON.stringify({ unexpected: true }));

      await expect(checkPackageReportFromDisk(fixture.pkg, fixture.output)).rejects.toThrow(scenario.expectedError);
      await expect(
        aggregateReportsFromDisk(fixture.root, join(fixture.root, '.bundle-analysis'), { check: true })
      ).rejects.toThrow(scenario.expectedError);
    });
  }

  it('reads package version and external peers from package metadata', function reportsPackageMetadata() {
    expect(
      packageMetadata({
        name: '@fixture/ui',
        root: '/fixture',
        version: '1.2.3',
        peerDependencies: { 'react-dom': '^19.0.0', react: '^19.0.0', '@godaddy/antares': '^0.11.0' }
      })
    ).toEqual({
      name: '@fixture/ui',
      version: '1.2.3',
      externals: ['@godaddy/antares', 'react', 'react-dom']
    });
  });

  it('accepts the exact cap and rejects a one-byte regression', function enforcesCaps() {
    expect(checkBudgets(report(), budgets)).toEqual([]);
    const current = report();
    current.measurements[1].gzip = 51;
    expect(checkBudgets(current, budgets)).toEqual(['button: 51 B gzip > 50 B (+1 B)']);
  });

  it('fails closed when a package or case has no valid budget', function requiresBudgets() {
    expect(checkBudgets(report(), { ...budgets, consumer: {} })).toEqual(['button: missing or invalid gzip budget']);
    expect(checkBudgets(report(), { ...budgets, consumer: { button: -1 } })).toHaveLength(1);
  });

  it('excludes declarations and maps but retains CSS and arbitrary emitted assets', function countsTransferFiles() {
    const files = ['a.js', 'a.js.map', 'a.d.mts', 'style.css', 'icon.svg', 'font.woff2'];
    expect(consumerFiles(files)).toEqual(['a.js', 'style.css', 'icon.svg', 'font.woff2']);
    expect(category('index.d.cts.map')).toBe('maps');
    expect(category('index.d.cts')).toBe('types');
    expect(category('index.cjs')).toBe('cjs');
  });

  it('reports measured sizes against budgets without historical deltas', function reportsBudgetResults() {
    const summary = markdown(report(), budgets);
    expect(summary).toContain('| consumer: button | gzip | 50 B | 50 B | PASS |');
    expect(summary).toContain('| @test/package | 1.0.0 | react, react-dom |');
    expect(summary).not.toContain('Change');
    const current = report();
    current.measurements[1].gzip = 51;
    expect(markdown(current, budgets)).toContain('| consumer: button | gzip | 51 B | 50 B | FAIL |');
  });

  it('discovers manifests, patterns, aliases and star re-exports, then includes new exports automatically', async function discoversAllRuntime() {
    const root = await mkdtemp(join(tmpdir(), 'bundle-public-api-'));
    temporaryDirectories.push(root);
    const pkg = join(root, 'fixture');
    await mkdir(join(pkg, 'dist/components'), { recursive: true });
    await writeFile(
      join(pkg, 'package.json'),
      JSON.stringify({
        name: '@fixture/ui',
        type: 'module',
        exports: {
          '.': { types: './dist/index.d.mts', import: './dist/index.mjs', require: './not-the-import.cjs' },
          './components/*': './dist/components/*.mjs',
          './package.json': './package.json',
          './types': { types: './dist/index.d.mts' }
        }
      })
    );
    await writeFile(join(pkg, 'dist/values.mjs'), 'export const Button = () => 1; export const ButtonContext = {};');
    await writeFile(join(pkg, 'dist/dates.mjs'), 'export class CalendarDate {} export const today = () => 1;');
    await writeFile(join(pkg, 'dist/index.d.mts'), 'export interface Props { label: string }');
    await writeFile(
      join(pkg, 'dist/index.mjs'),
      'export { Button as Action } from "./values.mjs"; export * from "./dates.mjs"; export const RootOnly = 1;'
    );
    await writeFile(join(pkg, 'dist/components/Button.mjs'), 'export {Button, ButtonContext} from "../values.mjs";');
    const workspaces = [{ name: '@fixture/ui', root: pkg }];
    const surface = await discoverPublicApi(root, workspaces);
    expect(surface.find((entry) => entry.from === '@fixture/ui')?.exports).toEqual([
      'Action',
      'CalendarDate',
      'RootOnly',
      'today'
    ]);
    const button = surface.find((entry) => entry.from === '@fixture/ui/components/Button')!;
    expect(button.exports).toEqual(['Button', 'ButtonContext']);
    expect(surface.find((entry) => entry.kind === 'types')?.reason).toContain('no browser runtime');
    const before = consumerCases(surface);
    expect(
      before.some((consumerCase) => consumerCase.names[0] === 'ButtonContext' && consumerCase.scope === 'export')
    ).toBe(true);
    expect(before.every((consumerCase) => !consumerCase.from.endsWith('/types'))).toBe(true);
    await writeFile(
      join(pkg, 'dist/components/Button.mjs'),
      'export {Button, ButtonContext} from "../values.mjs"; export const NewButton = () => 2;'
    );
    await writeFile(join(pkg, 'dist/components/Calendar.mjs'), 'export const Calendar = () => 3;');
    const after = consumerCases(await discoverPublicApi(root, workspaces));
    expect(after.some((consumerCase) => consumerCase.scope === 'export' && consumerCase.names[0] === 'NewButton')).toBe(
      true
    );
    expect(after.some((consumerCase) => consumerCase.from === '@fixture/ui/components/Calendar')).toBe(true);
    expect(after.filter((consumerCase) => before.some((old) => old.id === consumerCase.id))).toHaveLength(
      before.length
    );
    expect(new Set(after.map((consumerCase) => consumerCase.id)).size).toBe(after.length);
  });

  it('discovers the real public runtime surface without a component inventory', async function discoversWorkspace() {
    const root = resolve(import.meta.dirname, '../..');
    const surface = await discoverPublicApi(root, [
      { name: '@godaddy/antares', root: join(root, 'packages/@godaddy/antares') }
    ]);
    const cases = consumerCases(surface);
    const rootEntry = surface.find((entry) => entry.from === '@godaddy/antares')!;
    expect(rootEntry.exports).toContain('FocusScope');
    expect(surface.find((entry) => entry.from === '@godaddy/antares/Chart')?.exports).toEqual([
      'BarChart',
      'DonutChart',
      'GaugeChart',
      'LineChart'
    ]);
    expect(surface.find((entry) => entry.from === '@godaddy/antares/date')?.exports).toContain('parseDate');
    for (const entry of surface.filter((item) => !item.reason)) {
      expect(cases.some((consumerCase) => consumerCase.scope === 'entry' && consumerCase.from === entry.from)).toBe(
        true
      );
      for (const name of entry.exports)
        expect(
          cases.some(
            (consumerCase) =>
              consumerCase.scope === 'export' && consumerCase.from === entry.from && consumerCase.names[0] === name
          )
        ).toBe(true);
    }
  });

  it('catalogues CSS, data, types and private tooling with explicit policy reasons', async function classifiesResources() {
    const root = await mkdtemp(join(tmpdir(), 'bundle-resource-api-'));
    temporaryDirectories.push(root);
    await writeFile(
      join(root, 'package.json'),
      JSON.stringify({
        name: '@fixture/data',
        type: 'module',
        exports: {
          '.': './index.mjs',
          './style': './style.module.css',
          './data': './data.json',
          './source': './style.scss',
          './package.json': './package.json'
        }
      })
    );
    await writeFile(join(root, 'index.mjs'), 'export {};');
    await writeFile(join(root, 'style.module.css'), '.test {color: red}');
    await writeFile(join(root, 'style.scss'), '$color: red;');
    await writeFile(join(root, 'data.json'), '{"test":42}');
    const surface = await discoverPublicApi(root, [{ name: '@fixture/data', root }]);
    expect(surface.find((entry) => entry.from === '@fixture/data')?.reason).toContain('types-only');
    expect(consumerCases(surface).map((consumerCase) => consumerCase.from)).toEqual([
      '@fixture/data/data',
      '@fixture/data/style'
    ]);
    const privateSurface = await discoverPublicApi(root, [{ name: '@fixture/data', root, private: true }]);
    expect(privateSurface.every((entry) => entry.reason?.includes('Private'))).toBe(true);
    expect(consumerCases(privateSurface)).toEqual([]);
    expect(fixtureSource({ id: 'css', package: '@fixture/data', from: '@fixture/data/style', names: [] })).toContain(
      'import "@fixture/data/style";'
    );
  });

  it('fails on stale export targets instead of silently losing coverage', async function rejectsStaleManifest() {
    const root = await mkdtemp(join(tmpdir(), 'bundle-stale-api-'));
    temporaryDirectories.push(root);
    await writeFile(join(root, 'package.json'), '{"exports":{".":"./missing.mjs"}}');
    await expect(discoverPublicApi(root, [{ name: '@fixture/stale', root }])).rejects.toMatchObject({ code: 'ENOENT' });
  });

  it('adds new exports to the discovered consumer cases automatically', function discoversNewExports() {
    const entries: PublicEntry[] = [
      { package: '@fixture/ui', from: '@fixture/ui', target: 'index.mjs', kind: 'javascript', exports: ['Button'] }
    ];
    const expanded = [{ ...entries[0], exports: ['Button', 'NewButton'] }];
    const before = consumerCases(entries);
    const after = consumerCases(expanded);
    const added = after.filter((item) => !before.some((old) => old.id === item.id));
    expect(added).toHaveLength(1);
    expect(added[0].names).toEqual(['NewButton']);
  });

  it('rejects missing build output', async function requiresBuiltFiles() {
    await expect(filesIn(join(tmpdir(), 'antares-output-does-not-exist'))).rejects.toMatchObject({ code: 'ENOENT' });
  });

  it('bundles runtime dependencies, externalizes declared peers, tree shakes unused exports, and rejects missing exports', async function verifiesConsumerBuild() {
    const root = await mkdtemp(join(tmpdir(), 'antares-bundle-'));
    temporaryDirectories.push(root);
    const pkg = join(root, 'node_modules/size-fixture');
    const dependency = join(root, 'node_modules/fixture-dependency');
    const peer = join(root, 'node_modules/fixture-peer');
    await mkdir(pkg, { recursive: true });
    await mkdir(dependency, { recursive: true });
    await mkdir(peer, { recursive: true });
    await writeFile(join(root, 'package.json'), '{"type":"module"}');
    const manifest = {
      name: 'size-fixture',
      version: '1.2.3',
      type: 'module',
      exports: './index.js',
      peerDependencies: { 'fixture-peer': '^1.0.0' }
    };
    await writeFile(join(pkg, 'package.json'), JSON.stringify(manifest));
    await writeFile(join(peer, 'package.json'), '{"name":"fixture-peer","type":"module","exports":"./index.js"}');
    await writeFile(join(peer, 'index.js'), 'export const peerValue = "PEER_SENTINEL";');
    await writeFile(
      join(dependency, 'package.json'),
      '{"name":"fixture-dependency","type":"module","exports":"./index.js"}'
    );
    await writeFile(
      join(dependency, 'index.js'),
      'export const value = globalThis.transitiveValue || "TRANSITIVE_SENTINEL";'
    );
    await writeFile(
      join(pkg, 'index.js'),
      'import "./styles.css"; import {value} from "fixture-dependency"; import {peerValue} from "fixture-peer"; export const used = () => [value, peerValue]; export const unused = "UNUSED_SENTINEL";'
    );
    await writeFile(join(pkg, 'styles.css'), '.fixture { color: red; background: url("./icon.svg") }');
    await writeFile(join(pkg, 'icon.svg'), '<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0h10v10z"/></svg>');
    const consumerCase = {
      id: 'fixture',
      package: 'size-fixture',
      from: 'size-fixture',
      names: ['used']
    };
    const output = join(root, 'report');
    const metadata = packageMetadata({ ...manifest, root: pkg });
    const measurement = await measureConsumer(consumerCase, root, output, metadata.externals);
    const paths = await filesIn(join(output, 'consumers/fixture'));
    const javascript = await readFile(paths.find((path) => path.endsWith('.js'))!, 'utf8');
    expect(javascript).toContain('TRANSITIVE_SENTINEL');
    expect(javascript).toContain('fixture-peer');
    expect(javascript).not.toContain('PEER_SENTINEL');
    expect(javascript).not.toContain('UNUSED_SENTINEL');
    expect(measurement.groups.css).toBeGreaterThan(0);
    expect(measurement.groups.assets).toBeGreaterThan(0);
    expect(measurement.gzip).toBeGreaterThan(0);
    expect(paths.some((path) => path.endsWith('.map'))).toBe(true);
    const runtime = consumerFiles(paths);
    const bytes = (await Promise.all(runtime.map((path) => readFile(path)))).reduce(
      (sum, contents) => sum + contents.length,
      0
    );
    expect(measurement.raw).toBe(bytes);
    await expect(
      measureConsumer({ ...consumerCase, from: 'size-fixture', names: ['missing'] }, root, output, metadata.externals)
    ).rejects.toThrow();
  }, 20_000);
});

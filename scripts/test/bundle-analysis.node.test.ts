import { mkdtemp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  discoverPublicApi,
  consumerCases,
  entryKind,
  type ConsumerCase,
  type PublicEntry,
  type Workspace
} from '../bundle-discovery.ts';
import {
  aggregateReportsFromDisk,
  buildPackageReport,
  checkPackageReportFromDisk,
  category,
  checkBudgets,
  consumerFiles,
  filesIn,
  fixtureSource,
  markdown,
  mapConcurrent,
  measureConsumer,
  packageMetadata,
  workspaces,
  type Budgets,
  type Measurement,
  type Report
} from '../bundle-analysis.ts';

const temporaryDirectories: string[] = [];
afterEach(async function cleanFixtures() {
  vi.unstubAllEnvs();
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
    cases: [
      {
        id: 'button',
        budgetKey: 'export:@test/package#Button',
        package: '@test/package',
        scope: 'export',
        from: '@test/package',
        names: ['Button']
      }
    ]
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
  await writeFile(join(root, 'pnpm-workspace.yaml'), 'packages:\n  - packages/*\n');
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
    JSON.stringify({ outputBudget: 100, consumerBudgets: { 'export:@test/package#Button': 50 } })
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

describe('pnpm workspace discovery', function pnpmWorkspaceDiscovery() {
  it('discovers packages from pnpm-workspace.yaml', async function discoversPnpmPackages() {
    const root = await mkdtemp(join(tmpdir(), 'antares-bundle-workspaces-'));
    temporaryDirectories.push(root);
    const packageRoot = join(root, 'packages', 'fixture-package');
    await mkdir(packageRoot, { recursive: true });
    await writeFile(join(root, 'package.json'), JSON.stringify({ name: 'fixture-root' }));
    await writeFile(join(root, 'pnpm-workspace.yaml'), 'packages:\n  - packages/*\n');
    await writeFile(join(packageRoot, 'package.json'), JSON.stringify({ name: '@fixture/package', version: '1.0.0' }));

    expect((await workspaces(root)).map(({ name }) => name)).toEqual(['@fixture/package']);
  });
});

describe('bounded consumer work', function boundedConsumerTests() {
  it('runs at most two jobs and retains input order when jobs finish out of order', async function preservesOrder() {
    const gates = Array.from({ length: 4 }, () => Promise.withResolvers<number>());
    const starts = Array.from({ length: 4 }, () => Promise.withResolvers<void>());
    const started: number[] = [];
    let active = 0;
    let peak = 0;
    const pending = mapConcurrent([0, 1, 2, 3], 2, async function controlledJob(item) {
      started.push(item);
      active++;
      peak = Math.max(peak, active);
      starts[item].resolve();
      try {
        return await gates[item].promise;
      } finally {
        active--;
      }
    });
    await Promise.all([starts[0].promise, starts[1].promise]);
    expect(started).toEqual([0, 1]);
    expect(active).toBe(2);
    gates[1].resolve(11);
    await starts[2].promise;
    expect(started).toEqual([0, 1, 2]);
    gates[0].resolve(10);
    await starts[3].promise;
    gates[3].resolve(13);
    gates[2].resolve(12);
    await expect(pending).resolves.toEqual([10, 11, 12, 13]);
    expect(peak).toBe(2);
    expect(active).toBe(0);
  });

  it('drains started work after a failure without starting another case', async function drainsAfterFailure() {
    const first = Promise.withResolvers<number>();
    const second = Promise.withResolvers<number>();
    const started: number[] = [];
    const error = new Error('Consumer build failed');
    let settled = false;
    const pending = mapConcurrent([0, 1, 2], 2, async function controlledFailure(item) {
      started.push(item);
      return item === 0 ? first.promise : second.promise;
    });
    const outcome = pending.then(
      function unexpectedSuccess() {
        settled = true;
        return { status: 'fulfilled' };
      },
      function expectedFailure(reason) {
        settled = true;
        return { status: 'rejected', reason };
      }
    );
    expect(started).toEqual([0, 1]);
    second.reject(new Error('Later consumer failed first'));
    // Let the failure reach the scheduler before checking that it waits for the other case.
    await new Promise<void>(function nextTurn(resolve) {
      setImmediate(resolve);
    });
    expect(settled).toBe(false);
    expect(started).toEqual([0, 1]);
    first.reject(error);
    await expect(outcome).resolves.toEqual({ status: 'rejected', reason: error });
    expect(started).toEqual([0, 1]);
  });

  it('preserves complete measurements and all artifacts for concurrent consumer builds', async function preservesConsumerBuilds() {
    const root = await mkdtemp(join(tmpdir(), 'bundle-concurrent-consumers-'));
    temporaryDirectories.push(root);
    const pkg = join(root, 'node_modules/concurrent-fixture');
    await mkdir(pkg, { recursive: true });
    await writeFile(join(root, 'package.json'), '{"type":"module"}');
    await writeFile(
      join(pkg, 'package.json'),
      JSON.stringify({ name: 'concurrent-fixture', type: 'module', exports: './index.js' })
    );
    await writeFile(
      join(pkg, 'index.js'),
      'import "./style.css"; import { peer } from "fixture-peer"; export const first = () => peer; export const second = () => "SECOND_SENTINEL";'
    );
    await writeFile(join(pkg, 'style.css'), '.fixture { color: red; background: url("./icon.svg") }');
    await writeFile(join(pkg, 'icon.svg'), '<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0h10v10z"/></svg>');
    const cases: ConsumerCase[] = [
      {
        id: 'fixture-entry',
        package: 'concurrent-fixture',
        from: 'concurrent-fixture',
        target: 'node_modules/concurrent-fixture/index.js',
        names: ['first', 'second'],
        scope: 'entry'
      },
      {
        id: 'fixture-first',
        package: 'concurrent-fixture',
        from: 'concurrent-fixture',
        target: 'node_modules/concurrent-fixture/index.js',
        names: ['first'],
        scope: 'export'
      },
      {
        id: 'fixture-second',
        package: 'concurrent-fixture',
        from: 'concurrent-fixture',
        target: 'node_modules/concurrent-fixture/index.js',
        names: ['second'],
        scope: 'export'
      }
    ];
    const sequentialOutput = join(root, 'sequential');
    const concurrentOutput = join(root, 'concurrent');
    const sequential: Measurement[] = [];
    for (const consumerCase of cases) {
      sequential.push(await measureConsumer(consumerCase, root, sequentialOutput, ['fixture-peer']));
    }
    const concurrent = await mapConcurrent(cases, 2, async function measureCase(consumerCase) {
      return measureConsumer(consumerCase, root, concurrentOutput, ['fixture-peer']);
    });
    expect(concurrent).toEqual(sequential);
    for (const output of [sequentialOutput, concurrentOutput]) {
      for (const consumerCase of cases) {
        for (const template of ['treemap', 'sunburst', 'network']) {
          expect((await stat(join(output, 'reports', consumerCase.id, `${template}.html`))).size).toBeGreaterThan(0);
        }
        const paths = await filesIn(join(output, 'consumers', consumerCase.id));
        expect(paths.some((path) => path.endsWith('.map'))).toBe(true);
      }
    }
  }, 20_000);
});

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

  it('invalidates completed reports before a rebuild fails', async function invalidatesFailedRebuild() {
    const fixture = await savedReportWorkspace();
    const dist = join(fixture.pkg.root, 'dist');
    await mkdir(dist);
    await writeFile(join(dist, 'index.d.ts'), 'export type Marker = string;');
    const manifest = {
      name: fixture.pkg.name,
      version: fixture.pkg.version,
      peerDependencies: fixture.pkg.peerDependencies,
      exports: { '.': './dist/index.d.ts' }
    };
    await writeFile(join(fixture.pkg.root, 'package.json'), JSON.stringify(manifest));
    await writeFile(join(fixture.pkg.root, 'bundle-size.json'), JSON.stringify({ outputBudget: 1024 }));

    await buildPackageReport(fixture.root, fixture.pkg, fixture.output);
    await expect(checkPackageReportFromDisk(fixture.pkg, fixture.output)).resolves.toBeUndefined();
    const artifacts = ['metrics.json', 'index.html', 'public-api.json', 'summary.md'];
    for (const artifact of artifacts) expect((await stat(join(fixture.output, artifact))).size).toBeGreaterThan(0);
    const directories = ['consumers', 'reports', 'entries'];
    for (const directory of directories) {
      await mkdir(join(fixture.output, directory), { recursive: true });
      await writeFile(join(fixture.output, directory, 'previous-build'), 'obsolete');
    }

    manifest.exports['.'] = './dist/missing.mjs';
    await writeFile(join(fixture.pkg.root, 'package.json'), JSON.stringify(manifest));
    await expect(buildPackageReport(fixture.root, fixture.pkg, fixture.output)).rejects.toMatchObject({
      code: 'ENOENT'
    });
    for (const artifact of [...artifacts, ...directories]) {
      await expect(stat(join(fixture.output, artifact))).rejects.toMatchObject({ code: 'ENOENT' });
    }
    await expect(checkPackageReportFromDisk(fixture.pkg, fixture.output)).rejects.toThrow('Missing analysis');
    await expect(
      aggregateReportsFromDisk(fixture.root, join(fixture.root, '.bundle-analysis'), { check: true })
    ).rejects.toThrow('Missing analysis');
  });

  it('refreshes package summaries when budgets change after report generation', async function refreshesPackageSummary() {
    const fixture = await savedReportWorkspace();
    const summaryPath = join(fixture.output, 'summary.md');
    await checkPackageReportFromDisk(fixture.pkg, fixture.output);
    expect(await readFile(summaryPath, 'utf8')).toContain('## Budget check: PASS');

    await writeFile(
      join(fixture.pkg.root, 'bundle-size.json'),
      JSON.stringify({
        outputBudget: 100,
        consumerBudgets: { 'export:@test/package#Button': 49, 'export:@test/package#Obsolete': 50 }
      })
    );
    await expect(checkPackageReportFromDisk(fixture.pkg, fixture.output)).rejects.toThrow('Bundle check failed');
    const failedSummary = await readFile(summaryPath, 'utf8');
    expect(failedSummary).toContain('## Budget check: FAIL');
    expect(failedSummary).toContain('@test/package: button: 50 B gzip > 49 B (+1 B)');
    expect(failedSummary).toContain(
      '@test/package: export:@test/package#Obsolete: unused consumer budget (no matching measurement)'
    );

    await writeFile(
      join(fixture.pkg.root, 'bundle-size.json'),
      JSON.stringify({ outputBudget: 100, consumerBudgets: { 'export:@test/package#Button': 50 } })
    );
    await checkPackageReportFromDisk(fixture.pkg, fixture.output);
    const passingSummary = await readFile(summaryPath, 'utf8');
    expect(passingSummary).toContain('## Budget check: PASS');
    expect(passingSummary).not.toContain('obsolete');
  });

  it('maps readable config keys when a saved report predates budgetKey metadata', async function readsLegacyMetrics() {
    const savedReport = report();
    delete savedReport.cases[0].budgetKey;
    const fixture = await savedReportWorkspace(savedReport);

    await expect(checkPackageReportFromDisk(fixture.pkg, fixture.output)).resolves.toBeUndefined();
  });

  it('rejects hashed IDs in readable consumer budget configs', async function rejectsInternalBudgetIDs() {
    const fixture = await savedReportWorkspace();
    await writeFile(
      join(fixture.pkg.root, 'bundle-size.json'),
      JSON.stringify({ outputBudget: 100, consumerBudgets: { 'auto-export-test-package-Button-deadbeef0123': 50 } })
    );

    await expect(checkPackageReportFromDisk(fixture.pkg, fixture.output)).rejects.toThrow(
      'expected an entry/export key and non-negative integer'
    );
  });

  it('invalidates old metrics and rejects invalid config before inspecting build output', async function validatesConfigFirst() {
    const fixture = await savedReportWorkspace();
    await writeFile(join(fixture.pkg.root, 'bundle-size.json'), JSON.stringify({ unexpected: true }));
    // This fixture has no dist/ output, so discovery or measurement would otherwise fail first.
    await expect(buildPackageReport(fixture.root, fixture.pkg, fixture.output)).rejects.toThrow(
      'Unknown bundle-size config key unexpected'
    );
    await expect(stat(join(fixture.output, 'metrics.json'))).rejects.toMatchObject({ code: 'ENOENT' });
  });

  it('publishes aggregate diagnostics to the job summary only during checking', async function publishesJobSummaryOnce() {
    const fixture = await savedReportWorkspace();
    const output = join(fixture.root, '.bundle-analysis');
    const jobSummaryPath = join(fixture.root, 'job-summary.md');
    await writeFile(jobSummaryPath, '');
    vi.stubEnv('GITHUB_STEP_SUMMARY', jobSummaryPath);
    await writeFile(
      join(fixture.pkg.root, 'bundle-size.json'),
      JSON.stringify({
        outputBudget: 100,
        consumerBudgets: { 'export:@test/package#Button': 50, 'export:@test/package#Obsolete': 50 }
      })
    );

    await aggregateReportsFromDisk(fixture.root, output, { check: false });
    expect(await readFile(jobSummaryPath, 'utf8')).toBe('');
    await expect(aggregateReportsFromDisk(fixture.root, output, { check: true })).rejects.toThrow(
      '@test/package: export:@test/package#Obsolete: unused consumer budget (no matching measurement)'
    );
    const summary = await readFile(join(output, 'summary.md'), 'utf8');
    expect(summary).toContain('## Budget check: FAIL');
    expect(summary).toContain('| consumer: button | gzip | 50 B | 50 B | PASS |');
    expect(summary).toContain(
      '@test/package: export:@test/package#Obsolete: unused consumer budget (no matching measurement)'
    );
    expect(await readFile(jobSummaryPath, 'utf8')).toBe(summary);
  });

  it('aggregates publishable libraries without requiring private or app reports', async function skipsUnmeasuredWorkspaces() {
    const fixture = await savedReportWorkspace();
    await writeFile(join(fixture.root, 'pnpm-workspace.yaml'), 'packages:\n  - packages/*\n  - apps/*\n');
    for (const [directory, manifest] of [
      ['packages/private-package', { name: '@test/private', private: true }],
      ['apps/docs', { name: 'docs' }]
    ] as const) {
      const root = join(fixture.root, directory);
      await mkdir(root, { recursive: true });
      await writeFile(join(root, 'package.json'), JSON.stringify(manifest));
      await writeFile(join(root, 'bundle-size.json'), JSON.stringify({ unexpected: true }));
    }

    const output = join(fixture.root, '.bundle-analysis');
    await expect(aggregateReportsFromDisk(fixture.root, output, { check: true })).resolves.toBeUndefined();
    const aggregate = JSON.parse(await readFile(join(output, 'metrics.json'), 'utf8')) as Report;
    expect(aggregate.packages).toEqual(report().packages);
    expect(aggregate.measurements).toEqual(report().measurements);
  });

  it.each(['removed', 'renamed'] as const)(
    'rejects obsolete budgets for %s exports in package and aggregate modes',
    async function rejectsObsoleteBudgets(change) {
      const value = report();
      const buttonBudgetKey = 'export:@test/package#Button';
      const renamedBudgetKey = 'export:@test/package#RenamedButton';
      const consumerBudgets: Record<string, number> = { [buttonBudgetKey]: 50 };
      if (change === 'removed') {
        value.measurements = value.measurements.filter((item) => item.kind !== 'consumer');
        value.cases = [];
      } else {
        value.measurements[1].id = 'renamed-button';
        value.cases[0] = {
          ...value.cases[0],
          id: 'renamed-button',
          budgetKey: renamedBudgetKey,
          names: ['RenamedButton']
        };
        consumerBudgets[renamedBudgetKey] = 50;
      }
      const fixture = await savedReportWorkspace(value);
      const configPath = join(fixture.pkg.root, 'bundle-size.json');
      await writeFile(configPath, JSON.stringify({ outputBudget: 100, consumerBudgets }));

      const diagnostic = `${buttonBudgetKey}: unused consumer budget (no matching measurement)`;
      await expect(checkPackageReportFromDisk(fixture.pkg, fixture.output)).rejects.toThrow(diagnostic);
      await expect(
        aggregateReportsFromDisk(fixture.root, join(fixture.root, '.bundle-analysis'), { check: true })
      ).rejects.toThrow(diagnostic);

      delete consumerBudgets[buttonBudgetKey];
      await writeFile(configPath, JSON.stringify({ outputBudget: 100, consumerBudgets }));
      await expect(checkPackageReportFromDisk(fixture.pkg, fixture.output)).resolves.toBeUndefined();
      await expect(
        aggregateReportsFromDisk(fixture.root, join(fixture.root, '.bundle-analysis'), { check: true })
      ).resolves.toBeUndefined();
    }
  );

  it.each(['first', 'second'] as const)(
    'rejects a budget for another package in the %s package config without changing summary limits',
    async function rejectsMisplacedBudget(configOwner) {
      const fixture = await savedReportWorkspace();
      const secondName = '@test/second-package';
      const secondPackage: Workspace = {
        ...fixture.pkg,
        name: secondName,
        root: join(fixture.root, 'packages', 'second-package')
      };
      const secondOutput = join(fixture.root, '.bundle-analysis', 'packages', 'second-package');
      const secondReport = report();
      secondReport.packages[0].name = secondName;
      for (const item of secondReport.measurements) {
        item.package = secondName;
        item.id = item.kind === 'output' ? secondName : 'second-button';
      }
      secondReport.cases[0] = {
        ...secondReport.cases[0],
        id: 'second-button',
        budgetKey: 'export:@test/second-package#Button',
        package: secondName,
        from: secondName
      };
      await mkdir(secondPackage.root, { recursive: true });
      await mkdir(secondOutput, { recursive: true });
      await writeFile(
        join(secondPackage.root, 'package.json'),
        JSON.stringify({ name: secondName, version: '1.0.0', peerDependencies: secondPackage.peerDependencies })
      );
      await writeFile(join(secondOutput, 'metrics.json'), JSON.stringify(secondReport));
      await writeFile(
        join(secondPackage.root, 'bundle-size.json'),
        JSON.stringify({ outputBudget: 100, consumerBudgets: { 'export:@test/second-package#Button': 50 } })
      );

      const firstBudgetKey = 'export:@test/package#Button';
      const secondBudgetKey = 'export:@test/second-package#Button';
      const misplacedKey = configOwner === 'first' ? secondBudgetKey : firstBudgetKey;
      const ownKey = configOwner === 'first' ? firstBudgetKey : secondBudgetKey;
      const owner = configOwner === 'first' ? fixture.pkg : secondPackage;
      const ownerOutput = configOwner === 'first' ? fixture.output : secondOutput;
      const configPath = join(owner.root, 'bundle-size.json');
      await writeFile(
        configPath,
        JSON.stringify({ outputBudget: 100, consumerBudgets: { [ownKey]: 50, [misplacedKey]: 1 } })
      );
      const diagnostic = `${misplacedKey}: unused consumer budget (no matching measurement)`;
      await expect(checkPackageReportFromDisk(owner, ownerOutput)).rejects.toThrow(diagnostic);
      const aggregateOutput = join(fixture.root, '.bundle-analysis');
      await expect(aggregateReportsFromDisk(fixture.root, aggregateOutput, { check: true })).rejects.toThrow(
        diagnostic
      );
      const summary = await readFile(join(aggregateOutput, 'summary.md'), 'utf8');
      expect(summary).toContain('| consumer: button | gzip | 50 B | 50 B | PASS |');
      expect(summary).toContain('| consumer: second-button | gzip | 50 B | 50 B | PASS |');
      expect(summary).toContain('## Budget check: FAIL');
      expect(summary).toContain(`${owner.name}: ${diagnostic}`);

      await writeFile(configPath, JSON.stringify({ outputBudget: 100, consumerBudgets: { [ownKey]: 50 } }));
      await expect(aggregateReportsFromDisk(fixture.root, aggregateOutput, { check: true })).resolves.toBeUndefined();
    }
  );

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
      name: 'a consumer measurement with no matching case',
      update(value) {
        value.measurements[1].id = 'unexpected-case';
      },
      expectedError: /Inconsistent measurements/
    },
    {
      name: 'duplicate cases with distinct measurements',
      update(value) {
        value.cases.push({ ...value.cases[0] });
        value.measurements.push({ ...value.measurements[1], id: 'unexpected-case' });
      },
      expectedError: /Inconsistent measurements/
    },
    {
      name: 'a missing package output measurement',
      update(value) {
        value.measurements = value.measurements.filter((item) => item.kind !== 'output');
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

  it('rejects budgets without a measurement of the same kind', function rejectsUnmeasuredBudgets() {
    expect(
      checkBudgets(report(), {
        output: { ...budgets.output, button: 100 },
        consumer: { ...budgets.consumer, '@test/package': 50 }
      })
    ).toEqual([
      'button: unused output budget (no matching measurement)',
      '@test/package: unused consumer budget (no matching measurement)'
    ]);
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

  it('catalogues CSS, data and types with explicit policy reasons', async function classifiesResources() {
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
    const pkg = join(root, 'packages/size-fixture');
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
      target: 'packages/size-fixture/index.js',
      names: ['used']
    };
    const output = join(root, 'report');
    const metadata = packageMetadata({ ...manifest, root: pkg });
    const measurement = await measureConsumer(consumerCase, root, output, metadata.externals);
    for (const template of ['treemap', 'sunburst', 'network']) {
      expect((await stat(join(output, 'reports', consumerCase.id, `${template}.html`))).size).toBeGreaterThan(0);
    }
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

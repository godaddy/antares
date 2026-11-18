import { spawnSync } from 'node:child_process';
import { cp, mkdir, mkdtemp, readFile, readdir, realpath, rm, symlink, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, it, vi } from 'vitest';

const root = fileURLToPath(new URL('../../', import.meta.url));
const require = createRequire(import.meta.url);
const cli = require.resolve('@changesets/cli/bin.js');
const temporaryDirectories: string[] = [];

afterEach(async function cleanWorkspaces() {
  vi.unstubAllEnvs();
  await Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

function fixtureEnvironment() {
  // Git hooks export repository-local variables that must not reach fixture Git commands.
  const env = Object.fromEntries(Object.entries(process.env).filter(([name]) => !name.startsWith('GIT_')));
  return { ...env, GITHUB_TOKEN: '', GH_TOKEN: '', GIT_CONFIG_NOSYSTEM: '1' };
}

async function createWorkspace() {
  const directory = await mkdtemp(join(tmpdir(), 'antares-changesets-'));
  temporaryDirectories.push(directory);
  await mkdir(join(directory, '.changeset'));
  await mkdir(join(directory, 'node_modules/@changesets'), { recursive: true });
  await symlink(
    await realpath(join(root, 'node_modules/@changesets/get-github-info')),
    join(directory, 'node_modules/@changesets/get-github-info'),
    'dir'
  );
  await cp(join(root, '.changeset/config.json'), join(directory, '.changeset/config.json'));
  await cp(join(root, '.changeset/changelog-config.mjs'), join(directory, '.changeset/changelog-config.mjs'));
  await writeFile(join(directory, 'package.json'), JSON.stringify({ name: 'release-fixture', private: true }));
  await writeFile(join(directory, 'pnpm-workspace.yaml'), "packages:\n  - 'packages/*'\n");
  for (const [name, isPrivate] of [
    ['public', false],
    ['private', true]
  ] as const) {
    const packageDirectory = join(directory, 'packages', name);
    await mkdir(packageDirectory, { recursive: true });
    await writeFile(
      join(packageDirectory, 'package.json'),
      JSON.stringify({
        name: `@fixture/${name}`,
        version: '1.0.0',
        private: isPrivate,
        dependencies: isPrivate ? { '@fixture/public': 'workspace:^1.0.0' } : undefined
      })
    );
  }
  const git = spawnSync('git', ['init', '--initial-branch=main', directory], {
    encoding: 'utf8',
    env: fixtureEnvironment()
  });
  expect(git.status, git.stderr).toBe(0);
  return directory;
}

function runChangeset(directory: string, command: string) {
  return spawnSync(process.execPath, [cli, command], {
    cwd: directory,
    encoding: 'utf8',
    timeout: 20_000,
    env: fixtureEnvironment()
  });
}

describe('Changesets version integration', function changesetsVersionSuite() {
  it('isolates fixture Git commands from the calling Git hook', async function isolatesHookEnvironment() {
    const hookDirectory = await mkdtemp(join(tmpdir(), 'antares-changesets-hook-'));
    temporaryDirectories.push(hookDirectory);
    vi.stubEnv('GIT_DIR', join(hookDirectory, 'hook.git'));
    vi.stubEnv('GIT_WORK_TREE', hookDirectory);
    vi.stubEnv('GIT_INDEX_FILE', join(hookDirectory, 'index'));

    const directory = await createWorkspace();
    expect(await readdir(directory)).toContain('.git');
    const result = runChangeset(directory, 'version');
    expect(result.stdout + result.stderr).toContain('No unreleased changesets found.');
    expect(await readdir(hookDirectory)).toEqual([]);
  });

  it('loads the real config and ESM changelog and preserves private package versioning', async function versionsPackages() {
    const directory = await createWorkspace();
    await writeFile(
      join(directory, '.changeset/fixture.md'),
      '---\n"@fixture/public": patch\n"@fixture/private": patch\n---\n\nVerify the release migration.\n'
    );

    const result = runChangeset(directory, 'version');
    expect(result.status, result.stdout + result.stderr).toBe(0);
    for (const name of ['public', 'private']) {
      const manifest = JSON.parse(await readFile(join(directory, 'packages', name, 'package.json'), 'utf8'));
      expect(manifest.version).toBe('1.0.1');
      if (name === 'private') expect(manifest.dependencies['@fixture/public']).toBe('workspace:^1.0.1');
      expect(await readFile(join(directory, 'packages', name, 'CHANGELOG.md'), 'utf8')).toContain(
        '- Verify the release migration.'
      );
    }
  });

  it('reports the v3 no-changesets exit status', async function rejectsEmptyVersionStep() {
    const directory = await createWorkspace();
    const result = runChangeset(directory, 'version');

    expect(result.status, result.stdout + result.stderr).toBe(1);
    expect(result.stdout + result.stderr).toContain('No unreleased changesets found.');
    expect(JSON.parse(await readFile(join(directory, 'packages/public/package.json'), 'utf8')).version).toBe('1.0.0');
  });
});

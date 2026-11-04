import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';

type WorkflowStep = {
  name?: string;
  uses?: string;
  with?: Record<string, unknown>;
  run?: string;
};

type WorkflowJob = {
  steps?: WorkflowStep[];
  permissions?: Record<string, string>;
};

type Workflow = {
  jobs: Record<string, WorkflowJob>;
  on?: Record<string, { paths?: string[] }>;
  permissions?: Record<string, string>;
};

const workflowsDir = fileURLToPath(new URL('../../.github/workflows/', import.meta.url));
const root = fileURLToPath(new URL('../../', import.meta.url));
const installJobs = [
  ['ci.yaml', 'ci'],
  ['release.yaml', 'release'],
  ['docs-site-main.yaml', 'deploy'],
  ['docs-site-preview.yaml', 'build-preview'],
  ['storybook-main.yaml', 'deploy-main'],
  ['storybook-preview.yaml', 'build-preview'],
  ['update-screenshots.yaml', 'render']
] as const;

function readWorkflow(file: string): Workflow {
  return parse(readFileSync(join(workflowsDir, file), 'utf8')) as Workflow;
}

function stepsFor(file: string, job: string): WorkflowStep[] {
  return readWorkflow(file).jobs[job].steps ?? [];
}

function findStep(steps: WorkflowStep[], predicate: (step: WorkflowStep) => boolean): WorkflowStep {
  const step = steps.find(predicate);
  expect(step).toBeDefined();
  return step!;
}

describe('pnpm GitHub workflows', function pnpmWorkflowsSuite() {
  it.each(installJobs)('%s:%s pins pnpm and uses a frozen install', function pinsPnpm(file, job) {
    const steps = stepsFor(file, job);
    const setup = findStep(steps, (step) => step.uses?.startsWith('pnpm/action-setup@') ?? false);

    expect(setup.uses).toMatch(/^pnpm\/action-setup@[a-f0-9]{40}$/);
    expect(setup.with?.version).toBe('12.16.1');
    expect(steps.some((step) => step.run?.trim() === 'pnpm install --frozen-lockfile')).toBe(true);
  });

  it('caches the pnpm store except in the restricted screenshot renderer', function configuresPnpmCaching() {
    for (const [file, job] of installJobs.filter(([file]) => file !== 'update-screenshots.yaml')) {
      const setup = findStep(stepsFor(file, job), (step) => step.uses?.startsWith('actions/setup-node@') ?? false);
      expect(setup.with?.cache, `${file}:${job}`).toBe('pnpm');
      expect(setup.with?.['cache-dependency-path'], `${file}:${job}`).toBe('pnpm-lock.yaml');
    }

    const screenshotWorkflow = readWorkflow('update-screenshots.yaml');
    const screenshotSetup = findStep(
      stepsFor('update-screenshots.yaml', 'render'),
      (step) => step.uses?.startsWith('actions/setup-node@') ?? false
    );
    expect(screenshotSetup.with?.['package-manager-cache']).toBe(false);
    expect(screenshotSetup.with?.cache).toBeUndefined();
    expect(screenshotWorkflow.permissions).toEqual({});
    expect(screenshotWorkflow.jobs.render.permissions).toEqual({ contents: 'read' });
  });

  it('installs Chromium before each CI browser test job', function installsBrowserDependencies() {
    for (const [file, job, testCommand] of [
      ['ci.yaml', 'ci', 'pnpm run test:visual'],
      ['update-screenshots.yaml', 'render', 'pnpm run test:visual:update']
    ]) {
      const steps = stepsFor(file, job);
      const browserIndex = steps.findIndex(
        (step) => step.run?.trim() === 'pnpm exec playwright install --with-deps chromium'
      );
      const testIndex = steps.findIndex((step) => step.run?.trim() === testCommand);
      expect(browserIndex, `${file}:${job} browser install`).toBeGreaterThan(-1);
      expect(testIndex, `${file}:${job} test`).toBeGreaterThan(browserIndex);
    }
  });

  it('installs Chromium before the full CI test command', function installsChromiumBeforeCiTest() {
    const steps = stepsFor('ci.yaml', 'ci');
    const browserIndex = steps.findIndex(
      (step) => step.run?.trim() === 'pnpm exec playwright install --with-deps chromium'
    );
    const testIndex = steps.findIndex((step) => step.run?.trim() === 'pnpm run test');

    expect(browserIndex).toBeGreaterThan(-1);
    expect(testIndex).toBeGreaterThan(browserIndex);
  });

  it('uses pnpm commands in workflows and in the Changesets action', function migratesWorkflowCommands() {
    for (const [file, job] of installJobs) {
      for (const step of stepsFor(file, job)) {
        expect(step.run ?? '').not.toMatch(/\b(?:npm ci|npm run|npx nx)\b/);
      }
    }

    const changesets = findStep(
      stepsFor('release.yaml', 'release'),
      (step) => step.uses?.startsWith('changesets/action@') ?? false
    );
    expect(changesets.with?.version).toBe('pnpm run version');
    expect(changesets.with?.publish).toBe('pnpm run release');
    expect(changesets.with?.commitMode).toBe('github-api');
  });

  it('builds before recursively publishing workspace packages', function configuresPnpmPublish() {
    const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as {
      scripts: Record<string, string>;
    };

    expect(manifest.scripts.release).toBe('pnpm run build && node scripts/publish-workspaces.mjs');
    expect(manifest.scripts.version).toBe('changeset version && pnpm install --no-frozen-lockfile');
  });

  it('uses pnpm in both Husky hooks', function huskyHooksUsePnpm() {
    const preCommit = readFileSync(join(root, '.husky/pre-commit'), 'utf8');
    const commitMsg = readFileSync(join(root, '.husky/commit-msg'), 'utf8');

    expect(preCommit).not.toMatch(/\b(?:npm|npx)\b/);
    expect(commitMsg).not.toMatch(/\b(?:npm|npx)\b/);
    expect(preCommit).toContain('pnpm exec lint-staged');
    expect(preCommit).toContain('pnpm run scripts:test');
    expect(preCommit).toContain('pnpm nx run-many -t test --output-style=static --skipNxCache');
    expect(preCommit).not.toContain('pnpm run test --');
    expect(commitMsg).toContain('pnpm run commitlint');
    expect(commitMsg).toContain('pnpm run commitlint "${1}"');
    const generatedBuildIndex = preCommit.indexOf('pnpm nx run @godaddy/generate-cdn-url:build');
    const depsCheckIndex = preCommit.indexOf('pnpm run deps:check');

    expect(generatedBuildIndex).toBeGreaterThan(-1);
    expect(depsCheckIndex).toBeGreaterThan(generatedBuildIndex);
  });

  it('builds generated docs dependencies before dependency checks', function buildsGeneratedDocsDependenciesBeforeKnip() {
    const steps = stepsFor('ci.yaml', 'ci');
    const generatedBuildIndex = steps.findIndex((step) => step.run === 'pnpm nx run @godaddy/generate-cdn-url:build');
    const dependencyCheckIndex = steps.findIndex((step) => step.run === 'pnpm run deps:check');

    expect(generatedBuildIndex).toBeGreaterThan(-1);
    expect(dependencyCheckIndex).toBeGreaterThan(generatedBuildIndex);
  });

  it('runs docs and Storybook deployments when workspace metadata changes', function watchesWorkspaceMetadata() {
    for (const file of ['docs-site-main.yaml', 'storybook-main.yaml']) {
      const paths = readWorkflow(file).on?.push?.paths ?? [];
      expect(paths).toContain('pnpm-lock.yaml');
      expect(paths).toContain('pnpm-workspace.yaml');
    }
  });

  it('keeps Dependabot on GitHub’s npm ecosystem for pnpm catalog support', function keepsDependabotCatalogSupport() {
    const dependabot = parse(readFileSync(join(root, '.github/dependabot.yml'), 'utf8')) as {
      updates: Array<{ 'package-ecosystem': string }>;
    };
    expect(dependabot.updates.some((update) => update['package-ecosystem'] === 'npm')).toBe(true);
  });
});

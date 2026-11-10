import { spawnSync } from 'node:child_process';
import { readFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const summaryPath = resolve('pnpm-publish-summary.json');

export function formatChangesetsTags(summary) {
  if (!Array.isArray(summary?.publishedPackages)) {
    throw new TypeError('Pnpm publish summary must include a publishedPackages array');
  }

  return summary.publishedPackages.map(function publishedPackageTag({ name, version }) {
    if (typeof name !== 'string' || typeof version !== 'string') {
      throw new TypeError('Each published package must have a string name and version');
    }

    return `New tag: ${name}@${version}`;
  });
}

function publishWorkspaces() {
  rmSync(summaryPath, { force: true });

  const result = spawnSync('pnpm', ['publish', '-r', '--report-summary'], { stdio: 'inherit' });
  if (result.error) {
    rmSync(summaryPath, { force: true });
    throw result.error;
  }

  let tags;
  try {
    tags = formatChangesetsTags(JSON.parse(readFileSync(summaryPath, 'utf8')));
  } finally {
    rmSync(summaryPath, { force: true });
  }

  for (const tag of tags) process.stdout.write(`${tag}\n`);
  process.exitCode = result.status ?? 1;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) publishWorkspaces();

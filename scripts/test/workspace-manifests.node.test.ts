import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';

type PackageManifest = {
  name: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

const rootDir = resolve(import.meta.dirname, '../..');
const rootManifest = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf8')) as PackageManifest;
const docsTsConfig = JSON.parse(readFileSync(join(rootDir, 'apps/docs/tsconfig.json'), 'utf8')) as {
  exclude?: string[];
};
const pnpmWorkspace = parse(readFileSync(join(rootDir, 'pnpm-workspace.yaml'), 'utf8')) as {
  packages: string[];
  catalog?: Record<string, string>;
};
const workspaceManifestPaths = pnpmWorkspace.packages.flatMap(function getWorkspaceManifestPaths(workspaceGlob) {
  const parentPath = workspaceGlob.replace(/\/\*$/, '');
  return readdirSync(join(rootDir, parentPath), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(rootDir, parentPath, entry.name, 'package.json'));
});
const packages = [
  rootManifest,
  ...workspaceManifestPaths.map((path) => JSON.parse(readFileSync(path, 'utf8')) as PackageManifest)
];

describe('workspace manifests', function workspaceManifestTests() {
  it('uses workspace protocol for direct dependencies on local packages', function usesWorkspaceProtocol() {
    const localPackageNames = new Set(packages.map((manifest) => manifest.name));
    const violations = packages.flatMap((manifest) =>
      (['dependencies', 'devDependencies', 'optionalDependencies'] as const).flatMap((section) =>
        Object.entries(manifest[section] ?? {})
          .filter(([name, range]) => localPackageNames.has(name) && !range.startsWith('workspace:'))
          .map(([name, range]) => `${manifest.name}: ${name}@${range}`)
      )
    );

    expect(violations).toEqual([]);
  });

  it('resolves every catalog reference from the default catalog', function resolvesCatalogReferences() {
    const references = packages.flatMap((manifest) =>
      (['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies'] as const).flatMap((section) =>
        Object.entries(manifest[section] ?? {})
          .filter(([, range]) => range.startsWith('catalog:'))
          .map(([name, range]) => ({ manifest: manifest.name, name, range }))
      )
    );
    const violations = references.filter(
      ({ name, range }) => range !== 'catalog:' || !Object.hasOwn(pnpmWorkspace.catalog ?? {}, name)
    );

    expect(references.length).toBeGreaterThan(0);
    expect(violations).toEqual([]);
  });

  it('preserves Antares React peer ranges', function preservesReactPeerRanges() {
    const antares = packages.find((manifest) => manifest.name === '@godaddy/antares');

    expect(antares?.peerDependencies?.react).toBe('18.x || 19.x');
    expect(antares?.peerDependencies?.['react-dom']).toBe('18.x || 19.x');
  });

  it('declares the d3 scale types used by Antares public declarations', function declaresD3ScaleTypes() {
    const antares = packages.find((manifest) => manifest.name === '@godaddy/antares');

    expect(antares?.dependencies?.['@types/d3-scale']).toBe('^4.0.2');
    expect(antares?.devDependencies?.['@types/d3-scale']).toBeUndefined();
  });

  it('declares mdast types directly in workspaces that import them', function declaresMdastTypes() {
    for (const name of ['site', 'docs', '@bento/block-explorer']) {
      const manifest = packages.find((candidate) => candidate.name === name);

      expect(manifest?.devDependencies?.['@types/mdast'], `${name} should declare @types/mdast`).toBe('catalog:');
    }

    expect(pnpmWorkspace.catalog?.['@types/mdast']).toBe('^4.0.4');
  });

  it('declares React types used by the environment package', function declaresEnvironmentReactTypes() {
    const environment = packages.find((manifest) => manifest.name === '@bento/environment');

    expect(environment?.devDependencies?.['@types/react']).toBe('catalog:');
  });

  it('excludes the disabled why-did-you-render addon from docs typecheck', function excludesDisabledAddon() {
    expect(docsTsConfig.exclude).toContain('.storybook/addons/why-did-you-render/**/*');
  });

  it('keeps the Storybook core catalog compatible with its addons', function keepsStorybookCatalogCompatible() {
    expect(pnpmWorkspace.catalog?.storybook).toBe('^10.6.5');
  });

  it('keeps tsdown and its CSS package on matching catalog ranges', function keepsTsdownCatalogCompatible() {
    expect(pnpmWorkspace.catalog?.tsdown).toBe('^0.23.7');
    expect(pnpmWorkspace.catalog?.['@tsdown/css']).toBe('^0.23.7');
  });

  it('keeps installs free of build and browser setup lifecycle hooks', function keepsInstallLifecycleLightweight() {
    const docs = packages.find((manifest) => manifest.name === 'docs');

    expect(rootManifest.scripts?.postinstall).toBeUndefined();
    expect(docs?.scripts?.preinstall).toBeUndefined();
  });
});

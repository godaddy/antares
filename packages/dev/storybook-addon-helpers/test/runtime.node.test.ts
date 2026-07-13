import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'vitest';
import assume from 'assume';
import type { ComponentType } from 'react';
import { getComponentDocs, getMeta, getStory, getTypeDocs, getVariants } from '../src/runtime.ts';

const distDir = join(dirname(fileURLToPath(import.meta.url)), '../dist');

describe('runtime entry', function runtimeEntryTests() {
  it('exports browser-safe getters', function exportsGetters() {
    const meta = { title: 'Button', component: {} as ComponentType };
    const component = (() => null) as ComponentType;
    const variants = { primary: { args: { variant: 'primary' } } };

    assume(getMeta(meta)).equals(meta);
    assume(getStory(component, { name: 'Default' })).equals(component);
    assume(getComponentDocs(component)).deep.equals({});
    assume(getTypeDocs()).deep.equals({});
    assume(getVariants(component, variants)).equals(variants);
  });

  it('does not bundle Node-only dependencies', async function excludesNodeDeps() {
    const runtimeSource = await readFile(join(distDir, 'runtime.mjs'), 'utf8');

    assume(runtimeSource).not.match(/from "typescript"/);
    assume(runtimeSource).not.match(/node:fs/);
  });
});

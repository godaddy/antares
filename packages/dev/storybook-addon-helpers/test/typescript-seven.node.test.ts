import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import * as ts from 'typescript/unstable/ast';
import { docFromCall, resolvePropsDoc } from '../src/docs.ts';
import { parseSource } from './typescript.ts';
import { API, Emitter, Snapshot } from 'typescript/unstable/sync';
import { version } from 'typescript';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { csfTransformer } from '../src/storybook/csf-transformer.ts';
import { openTypeScriptSession } from '../src/engine/typescript-session.ts';
import * as examples from '../src/examples.ts';

afterEach(() => vi.restoreAllMocks());

describe('TypeScript 7 integration', function typeScriptSevenTests() {
  it('releases native sessions before asynchronous example discovery', async function closesBeforeDiscovery() {
    const directory = mkdtempSync(join(tmpdir(), 'antares-ts7-discovery-'));
    const filePath = join(directory, 'widget.stories.tsx');
    const open = vi.spyOn(API.prototype, 'updateSnapshot');
    const close = vi.spyOn(API.prototype, 'close');
    const discover = vi.spyOn(examples, 'discoverExamples').mockImplementation(async function inspectSessions() {
      expect(open).toHaveBeenCalled();
      expect(close).toHaveBeenCalledTimes(open.mock.calls.length);
      return [];
    });
    try {
      writeFileSync(filePath, 'export const examples = getExamples();');
      await csfTransformer({ filePath });
      expect(discover).toHaveBeenCalledOnce();
      expect(close).toHaveBeenCalledTimes(open.mock.calls.length);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it('emits valid TSX without duplicating leading comments on generated nodes', async function keepsComments() {
    expect(version).toBe('7.0.2');
    const output = await csfTransformer({
      code: `/** Authored documentation. */
      import { getStory, getVariants } from '@bento/storybook-addon-helpers';
      const Button = () => <button />;
      export const Default = getStory(Button);
      export const Sizes = getVariants(Button, { small: { args: { size: 'sm' } } });
    `
    });
    expect(output.match(/Authored documentation\./g)).toHaveLength(1);
    expect(output).toContain('export const SizesSmall');
    const session = openTypeScriptSession({ fileName: 'output.tsx', code: output, isolated: true });
    try {
      expect(session.project.program.getSyntacticDiagnostics(session.sourceFile.fileName)).toEqual([]);
    } finally {
      session.close();
    }
  });

  it('closes snapshots and native processes when emitting a story fails', async function closesFailedTransform() {
    const close = vi.spyOn(API.prototype, 'close');
    const dispose = vi.spyOn(Snapshot.prototype, 'dispose');
    vi.spyOn(Emitter.prototype, 'printNode').mockImplementation(function failEmit() {
      throw new Error('Native emit failed');
    });
    await expect(csfTransformer({ code: 'export const Default = getStory(Button);' })).rejects.toThrow(
      'Native emit failed'
    );
    expect(close).toHaveBeenCalledTimes(1);
    expect(dispose).toHaveBeenCalledTimes(1);
  });
});

describe('native documentation operations', function nativeDocumentationTests() {
  it('retains the optional resolver contract for docs calls', function optionalResolver() {
    const source = parseSource('interface Props { label?: string; } export const Docs = getTypeDocs<Props>();');
    const statement = source.statements.find(ts.isVariableStatement);
    const call = statement?.declarationList.declarations[0].initializer;
    if (!call || !ts.isCallExpression(call)) throw new Error('Expected docs call');
    expect(docFromCall(call, source)?.props).toMatchObject([{ name: 'label', required: false }]);
  });

  it('reads changed imports on the next operation without retaining stale native projects', async function changedImports() {
    const directory = mkdtempSync(join(tmpdir(), 'antares-ts7-watch-'));
    const filePath = join(directory, 'widget.stories.tsx');
    const propsPath = join(directory, 'props.ts');
    try {
      writeFileSync(filePath, "import type { Props } from './props.ts'; export const Docs = getTypeDocs<Props>();");
      writeFileSync(propsPath, 'export interface Props { before: string; }');
      expect((await resolvePropsDoc({ filePath, exportName: 'Docs' }))?.props.map((prop) => prop.name)).toEqual([
        'before'
      ]);
      writeFileSync(propsPath, 'export interface Props { after?: boolean; }');
      expect((await resolvePropsDoc({ filePath, exportName: 'Docs' }))?.props).toMatchObject([
        { name: 'after', type: 'boolean', required: false }
      ]);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});

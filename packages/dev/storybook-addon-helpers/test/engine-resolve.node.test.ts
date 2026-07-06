import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { createResolver } from '../src/engine/resolve.ts';
import type { ResolvedSymbol } from '../src/engine/resolve.ts';

const fixturesPath = path.join(__dirname, 'fixtures/engine/types.ts');

describe('createResolver', function createResolverTests() {
  it('finds local symbols', function findsLocalSymbol() {
    const resolver = createResolver(fixturesPath);
    const sourceFile = resolver.getSourceFile(fixturesPath);
    const actual: ResolvedSymbol | undefined = resolver.resolveSymbol('LocalProps', sourceFile);

    expect(actual).toBeDefined();
    if (!actual) throw new Error('Expected LocalProps to resolve');

    expect(actual.name).toBe('LocalProps');
    expect(actual.sourceFile.fileName).toBe(fixturesPath);
    expect(ts.isInterfaceDeclaration(actual.declaration)).toBe(true);
  });

  it('resolves imported and aliased type symbols', function resolvesImports() {
    const resolver = createResolver(fixturesPath);
    const sourceFile = resolver.getSourceFile(fixturesPath);

    expect(resolver.resolveSymbol('ImportedProps', sourceFile)?.name).toBe('ImportedProps');
    expect(resolver.resolveSymbol('AliasProps', sourceFile)?.name).toBe('RenamedProps');
  });

  it('caches parsed source files by absolute path', function cachesFiles() {
    const resolver = createResolver(fixturesPath);

    expect(resolver.getSourceFile(fixturesPath)).toBe(resolver.getSourceFile(fixturesPath));
  });
});

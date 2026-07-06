import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { createResolver } from '../src/engine/resolve.ts';
import type { ResolvedSymbol } from '../src/engine/resolve.ts';

const fixturesPath = path.join(__dirname, 'fixtures/engine/types.ts');
const importedFixturesPath = path.join(__dirname, 'fixtures/engine/imported.ts');

function expectResolvedSymbol(
  actual: ResolvedSymbol | undefined,
  expected: {
    name: string;
    sourceFileName: string;
    isDeclarationKind: (declaration: ts.Declaration) => boolean;
  }
): ResolvedSymbol {
  expect(actual).toBeDefined();
  if (!actual) throw new Error(`Expected ${expected.name} to resolve`);

  expect(actual.name).toBe(expected.name);
  expect(actual.sourceFile.fileName).toBe(expected.sourceFileName);
  expect(expected.isDeclarationKind(actual.declaration)).toBe(true);

  return actual;
}

describe('createResolver', function createResolverTests() {
  it('finds local symbols', function findsLocalSymbol() {
    const resolver = createResolver(fixturesPath);
    const sourceFile = resolver.getSourceFile(fixturesPath);
    const actual: ResolvedSymbol | undefined = resolver.resolveSymbol('LocalProps', sourceFile);

    expectResolvedSymbol(actual, {
      name: 'LocalProps',
      sourceFileName: fixturesPath,
      isDeclarationKind: ts.isInterfaceDeclaration
    });
  });

  it('resolves imported and aliased type symbols', function resolvesImports() {
    const resolver = createResolver(fixturesPath);
    const sourceFile = resolver.getSourceFile(fixturesPath);

    const imported = resolver.resolveSymbol('ImportedProps', sourceFile);
    const alias = resolver.resolveSymbol('AliasProps', sourceFile);

    expectResolvedSymbol(imported, {
      name: 'ImportedProps',
      sourceFileName: importedFixturesPath,
      isDeclarationKind: ts.isInterfaceDeclaration
    });

    expectResolvedSymbol(alias, {
      name: 'RenamedProps',
      sourceFileName: importedFixturesPath,
      isDeclarationKind: ts.isTypeAliasDeclaration
    });
  });

  it('resolves named and aliased re-exported type symbols', function resolvesReExports() {
    const resolver = createResolver(fixturesPath);
    const sourceFile = resolver.getSourceFile(fixturesPath);

    const reExported = resolver.resolveSymbol('ReExportedImportedProps', sourceFile);
    const exportedAlias = resolver.resolveSymbol('ExportedAliasProps', sourceFile);

    expectResolvedSymbol(reExported, {
      name: 'ImportedProps',
      sourceFileName: importedFixturesPath,
      isDeclarationKind: ts.isInterfaceDeclaration
    });

    expectResolvedSymbol(exportedAlias, {
      name: 'RenamedProps',
      sourceFileName: importedFixturesPath,
      isDeclarationKind: ts.isTypeAliasDeclaration
    });
  });

  it('resolves star re-exported type symbols', function resolvesStarReExports() {
    const resolver = createResolver(fixturesPath);
    const sourceFile = resolver.getSourceFile(fixturesPath);

    const starExported = resolver.resolveSymbol('StarExportedRenamedProps', sourceFile);

    expectResolvedSymbol(starExported, {
      name: 'RenamedProps',
      sourceFileName: importedFixturesPath,
      isDeclarationKind: ts.isTypeAliasDeclaration
    });
  });

  it('caches parsed source files by absolute path', function cachesFiles() {
    const resolver = createResolver(fixturesPath);

    expect(resolver.getSourceFile(fixturesPath)).toBe(resolver.getSourceFile(fixturesPath));
  });
});

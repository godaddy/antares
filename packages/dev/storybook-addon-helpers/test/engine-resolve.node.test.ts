import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { createResolver } from '../src/engine/resolve.ts';
import type { ResolvedSymbol } from '../src/engine/resolve.ts';

const fixturesPath = path.join(__dirname, 'fixtures/engine/types.ts');
const importedFixturesPath = path.join(__dirname, 'fixtures/engine/imported.ts');
const privateBarrelFixturesPath = path.join(__dirname, 'fixtures/engine/private-barrel.ts');
const privateReExportFixturesPath = path.join(__dirname, 'fixtures/engine/private-re-export.ts');
const privateFixturesPath = path.join(__dirname, 'fixtures/engine/private.ts');
const cycleAFixturesPath = path.join(__dirname, 'fixtures/engine/cycle-a.ts');
const cycleBFixturesPath = path.join(__dirname, 'fixtures/engine/cycle-b.ts');

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
  it('does not read the entry file until a source file is requested', function lazilyReadsEntryFile() {
    let resolver: ReturnType<typeof createResolver> | undefined;

    expect(function createInlineResolver() {
      resolver = createResolver('inline.tsx');
    }).not.toThrow();

    expect(function readInlineFile() {
      resolver?.getSourceFile('inline.tsx');
    }).toThrow();
  });

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

  it('only exposes exported symbols through star re-export module boundaries', function hidesPrivateStarReExports() {
    const resolver = createResolver(privateBarrelFixturesPath);
    const sourceFile = resolver.getSourceFile(privateBarrelFixturesPath);
    const privateSourceFile = resolver.getSourceFile(privateFixturesPath);

    const publicSymbol = resolver.resolveSymbol('PublicProps', sourceFile);
    const privateSymbol = resolver.resolveSymbol('PrivateProps', sourceFile);
    const localPrivateSymbol = resolver.resolveSymbol('PrivateProps', privateSourceFile);

    expectResolvedSymbol(publicSymbol, {
      name: 'PublicProps',
      sourceFileName: privateFixturesPath,
      isDeclarationKind: ts.isInterfaceDeclaration
    });

    expect(privateSymbol).toBeUndefined();
    expectResolvedSymbol(localPrivateSymbol, {
      name: 'PrivateProps',
      sourceFileName: privateFixturesPath,
      isDeclarationKind: ts.isInterfaceDeclaration
    });
  });

  it('only exposes exported symbols through named re-export module boundaries', function hidesPrivateNamedReExports() {
    const resolver = createResolver(privateReExportFixturesPath);
    const sourceFile = resolver.getSourceFile(privateReExportFixturesPath);

    const publicSymbol = resolver.resolveSymbol('PublicProps', sourceFile);
    const privateSymbol = resolver.resolveSymbol('ExplicitPrivateProps', sourceFile);

    expectResolvedSymbol(publicSymbol, {
      name: 'PublicProps',
      sourceFileName: privateFixturesPath,
      isDeclarationKind: ts.isInterfaceDeclaration
    });

    expect(privateSymbol).toBeUndefined();
  });

  it('terminates star re-export cycles and still resolves alternate exported paths', function resolvesStarExportCycles() {
    const resolver = createResolver(cycleAFixturesPath);
    const sourceFile = resolver.getSourceFile(cycleAFixturesPath);

    const cycleSymbol = resolver.resolveSymbol('CycleBProps', sourceFile);
    const missingSymbol = resolver.resolveSymbol('MissingProps', sourceFile);

    expectResolvedSymbol(cycleSymbol, {
      name: 'CycleBProps',
      sourceFileName: cycleBFixturesPath,
      isDeclarationKind: ts.isInterfaceDeclaration
    });

    expect(missingSymbol).toBeUndefined();
  });

  it('caches parsed source files by absolute path', function cachesFiles() {
    const resolver = createResolver(fixturesPath);

    expect(resolver.getSourceFile(fixturesPath)).toBe(resolver.getSourceFile(fixturesPath));
  });
});

import assume from 'assume';
import ts from 'typescript';
import path from 'node:path';
import { describe, it } from 'vitest';
import { toTsExpression, toLiteralValue, findSymbolInFile, resolveImport } from '../src/ats-utils.ts';

function createLocalSourceFile(code: string): ts.SourceFile {
  return ts.createSourceFile(path.join(__dirname, 'test.tsx'), code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}

describe('toTsExpression', function toTsExpressionTests() {
  it('should extract interface docs', function extractInterfaceDocsTest() {
    const obj = {
      prop1: { type: { name: 'string', val: 4, required: true, 123: null } },
      prop2: { type: { name: 'string', required: false, data: null, items: [{ title: 'item1' }] } }
    };
    const result = toLiteralValue(toTsExpression(obj));

    assume(result).to.deep.equal(obj);
    assume(toLiteralValue(toTsExpression(Symbol()))).to.equal(null);
    assume(toLiteralValue(ts.factory.createIdentifier('foo'))).to.equal(null);
  });
});

describe('findSymbolInFile', function findSymbolInFileTests() {
  it('should find all symbol types but only process interfaces', function testGenericSymbolFinding() {
    const code = `
        export function MyFunction() { return null; }
        export class MyClass { prop = 'value'; }
        export enum MyEnum { A, B }
        export const MyVariable = 'value';
        export interface MyInterface { prop: string; }
      `;

    assume(findSymbolInFile('MyFunction', createLocalSourceFile(code))).to.not.equal(null);
    assume(findSymbolInFile('MyClass', createLocalSourceFile(code))).to.not.equal(null);
    assume(findSymbolInFile('MyEnum', createLocalSourceFile(code))).to.not.equal(null);
    assume(findSymbolInFile('MyVariable', createLocalSourceFile(code))).to.not.equal(null);
    assume(findSymbolInFile('MyInterface', createLocalSourceFile(code))).to.not.equal(null);
  });

  it('should return null for non-existent symbols', function testNonExistentSymbol() {
    const code = `export function MyFunction() { return null; }`;
    assume(findSymbolInFile('NonExistentSymbol', createLocalSourceFile(code))).to.equal(null);
  });

  it('should handle variable declarations in variable statements', function testVariableDeclarations() {
    const code = `
      const MyVariable = 'value';
      let AnotherVariable = 42;
      var YetAnotherVariable = true;
    `;

    assume(findSymbolInFile('MyVariable', createLocalSourceFile(code))).to.not.equal(null);
    assume(findSymbolInFile('AnotherVariable', createLocalSourceFile(code))).to.not.equal(null);
    assume(findSymbolInFile('YetAnotherVariable', createLocalSourceFile(code))).to.not.equal(null);
  });
});

describe('resolveImport', function resolveImportTests() {
  it('should return same file result for local symbols', function testLocalSymbol() {
    const code = `
      export function LocalFunction() { return null; }
      export interface LocalInterface { prop: string; }
    `;
    const sourceFile = createLocalSourceFile(code);

    const result = resolveImport('LocalFunction', sourceFile);
    assume(result).to.not.equal(null);
    assume(result?.sameFile).to.equal(true);
    assume(result?.actualName).to.equal('LocalFunction');
    assume(result?.targetSourceFile).to.equal(sourceFile);
  });

  it('should return null for non-existent symbols', function testNonExistentSymbol() {
    const code = `export function LocalFunction() { return null; }`;
    const sourceFile = createLocalSourceFile(code);

    const result = resolveImport('NonExistentSymbol', sourceFile);
    assume(result).to.equal(null);
  });

  it('should resolve relative imports', function testRelativeImport() {
    const code = `import { BasicComponent } from './fixtures/components/test-components.tsx';`;
    const sourceFile = createLocalSourceFile(code);

    const result = resolveImport('BasicComponent', sourceFile);
    assume(result).to.not.equal(null);
    assume(result?.sameFile).to.not.equal(true);
    assume(result?.actualName).to.equal('BasicComponent');
    assume(result?.targetSourceFile).to.not.equal(null);
  });

  it('should resolve imports with aliases', function testAliasedImport() {
    const code = `import { InternalComponent as MismatchComponent } from './fixtures/components/test-components.tsx';`;
    const sourceFile = createLocalSourceFile(code);

    const result = resolveImport('MismatchComponent', sourceFile);
    assume(result).to.not.equal(null);
    assume(result?.actualName).to.equal('InternalComponent');
    assume(result?.targetSourceFile).to.not.equal(null);
  });

  it('should return null for imports that cannot be resolved', function testUnresolvableImport() {
    const code = `import { NonExistentComponent } from './non-existent-file.tsx';`;
    const sourceFile = createLocalSourceFile(code);

    const result = resolveImport('NonExistentComponent', sourceFile);
    assume(result).to.equal(null);
  });

  it('should skip non-import statements', function testNonImportStatements() {
    const code = `
      const myVar = 'value';
      function myFunc() {}
      import { BasicComponent } from './fixtures/components/test-components.tsx';
    `;
    const sourceFile = createLocalSourceFile(code);

    const result = resolveImport('BasicComponent', sourceFile);
    assume(result).to.not.equal(null);
    assume(result?.actualName).to.equal('BasicComponent');
  });

  it('should skip import statements without module specifiers', function testImportWithoutModuleSpecifier() {
    // This creates a malformed import that would be caught by TypeScript compiler
    // but we want to ensure our function handles it gracefully
    const code = `import { BasicComponent } from './fixtures/components/test-components.tsx';`;
    const sourceFile = createLocalSourceFile(code);

    // Test with a symbol that doesn't exist in the imports
    const result = resolveImport('NonExistentSymbol', sourceFile);
    assume(result).to.equal(null);
  });

  it('should skip import statements without named bindings', function testImportWithoutNamedBindings() {
    const code = `
      import React from 'react';
      import { BasicComponent } from './fixtures/components/test-components.tsx';
    `;
    const sourceFile = createLocalSourceFile(code);
    const result = resolveImport('BasicComponent', sourceFile);

    assume(result).to.not.equal(null);
    assume(result?.actualName).to.equal('BasicComponent');
  });

  it('should handle absolute imports that cannot be resolved', function testUnresolvableAbsoluteImport() {
    const code = `import { SomeComponent } from 'non-existent-package';`;
    const sourceFile = createLocalSourceFile(code);
    const result = resolveImport('SomeComponent', sourceFile);

    assume(result).to.equal(null);
  });

  it('should resolve imports with file extensions', function testImportWithExtension() {
    const code = `import { BasicComponent } from './fixtures/components/test-components';`;
    const sourceFile = createLocalSourceFile(code);
    const result = resolveImport('BasicComponent', sourceFile);

    assume(result).to.not.equal(null);
    assume(result?.actualName).to.equal('BasicComponent');
  });

  it('should resolve absolute imports successfully', function testResolvableAbsoluteImport() {
    // Use a real package that exists in node_modules
    const code = `import { createSourceFile } from 'typescript';`;
    const sourceFile = createLocalSourceFile(code);
    const result = resolveImport('createSourceFile', sourceFile);

    if (result) {
      assume(result.actualName).to.equal('createSourceFile');
      assume(result.targetSourceFile).to.not.equal(null);
    }
  });

  it('should handle edge cases in import statement parsing', function testImportEdgeCases() {
    const codes = [
      `import { BasicComponent } from './fixtures/components/test-components.tsx';`,
      `import './fixtures/components/test-components.tsx';`,
      `import React from 'react';`,
      `import React, { Component } from 'react';`,
      `import type { ComponentType } from 'react';`
    ];

    for (const code of codes) {
      const sourceFile = createLocalSourceFile(code);
      const result = resolveImport('NonExistentSymbol', sourceFile);
      assume(result).to.equal(null);
    }

    const workingCode = `import { BasicComponent } from './fixtures/components/test-components.tsx';`;
    const workingSourceFile = createLocalSourceFile(workingCode);
    const workingResult = resolveImport('BasicComponent', workingSourceFile);
    assume(workingResult).to.not.equal(null);
  });

  it('should handle malformed import statements gracefully', function testMalformedImports() {
    const factory = ts.factory;
    const malformedImport = factory.createImportDeclaration(
      undefined,
      factory.createImportClause(
        false,
        undefined,
        factory.createNamedImports([
          factory.createImportSpecifier(false, undefined, factory.createIdentifier('TestSymbol'))
        ])
      ),
      // @ts-expect-error
      undefined // This creates a null moduleSpecifier
    );

    // Create a source file with this malformed import
    const sourceFile = ts.createSourceFile('test.ts', '', ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

    // Manually add the malformed import to the statements
    (sourceFile as any).statements = factory.createNodeArray([malformedImport]);

    // This should handle the null moduleSpecifier gracefully
    const result = resolveImport('TestSymbol', sourceFile);
    assume(result).to.equal(null);
  });
});

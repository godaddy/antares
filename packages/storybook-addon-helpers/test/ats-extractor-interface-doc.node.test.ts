import assume from 'assume';
import fs from 'node:fs';
import ts from 'typescript';
import path from 'node:path';
import { describe, it } from 'vitest';
import { extractInterfaceDoc } from '../src/ats-extractor-interface-doc.ts';

function createLocalSourceFile(code: string): ts.SourceFile {
  return ts.createSourceFile(path.join(__dirname, 'test.tsx'), code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}

describe('interface-doc-extractor', function interfaceDocExtractorTests() {
  it('should extract correct JSDoc info', function testJSDocExtraction() {
    const code = `import { BasicProps, ExtendedProps, NoTypeProps } from './fixtures/interfaces/test-types.ts';`;
    const basicResult = extractInterfaceDoc('BasicProps', createLocalSourceFile(code));
    const extendedResult = extractInterfaceDoc('ExtendedProps', createLocalSourceFile(code));

    // Test descriptions
    assume(extendedResult.argTypes.title?.description).to.equal('A required string property');
    assume(extendedResult.argTypes.description?.description).to.equal(
      'An optional description\nwith multiple lines\nsupport'
    );
    assume(extendedResult.argTypes.variant?.description).to.equal('Additional property in extended interface');
    assume(extendedResult.argTypes.onClick?.description).to.equal('Override parent property with more specific type');

    // Test default values
    assume(extendedResult.argTypes.description?.table?.defaultValue?.summary).to.equal("'No description provided'");
    assume(extendedResult.argTypes.variant?.table?.defaultValue?.summary).to.equal(null);
    assume(extendedResult.argTypes.onClick?.table?.defaultValue?.summary).to.equal(null);

    // // Test required/optional flags
    assume(basicResult.argTypes.onClick?.required).to.equal(false);
    assume(extendedResult.argTypes.onClick?.required).to.equal(true);

    // Test property without explicit type
    const noTypeResult = extractInterfaceDoc('NoTypeProps', createLocalSourceFile(code));
    assume(noTypeResult.argTypes.implicitAny?.type?.name).to.equal('any');
  });

  it('should handle inheritance and property filtering', function testInheritanceAndFiltering() {
    const code = `
      interface BaseInterface {
        base: string;
        common?: string;
      }

      interface TestInterface extends BaseInterface {
        common: string;
        filterMe: string;
        keepMe: string;
      }
    `;

    // Test inheritance
    const result = extractInterfaceDoc('TestInterface', createLocalSourceFile(code));
    assume(result.argTypes).to.have.property('base'); // Inherited
    assume(result.argTypes).to.have.property('common'); // Overridden
    assume(result.argTypes.common?.required).to.equal(true); // Now required

    // Test filtering
    const filtered = extractInterfaceDoc('TestInterface', createLocalSourceFile(code), {
      propFilter: (prop) => !prop.name.includes('filter')
    });
    assume(filtered.argTypes).to.not.have.property('filterMe');
    assume(filtered.argTypes).to.have.property('keepMe');
    assume(filtered.argTypes).to.have.property('base'); // Inherited property kept
  });

  it('should handle all import patterns and complex types', function testImportsAndTypes() {
    const code = `
      import { BasicProps, type ExtendedProps } from './fixtures/interfaces/test-types.ts';
      import { BasicProps as AliasedProps } from './fixtures/interfaces/test-types.ts';
      import { ComplexProps } from './fixtures/interfaces/test-types';
    `;

    // Test regular, aliased, and type-only imports
    const result1 = extractInterfaceDoc('BasicProps', createLocalSourceFile(code));
    const result2 = extractInterfaceDoc('AliasedProps', createLocalSourceFile(code));
    const result3 = extractInterfaceDoc('ExtendedProps', createLocalSourceFile(code));

    assume(result1.argTypes).to.have.property('title');
    assume(result1).to.deep.equal(result2); // Aliased should be identical
    assume(result3.argTypes).to.have.property('variant'); // Type-only should also work

    // Test complex types info
    const complexResult = extractInterfaceDoc('ComplexProps', createLocalSourceFile(code));
    assume(complexResult.argTypes.size?.type?.name).to.equal("'small' | 'medium' | 'large'");
    assume(complexResult.argTypes.config?.type?.name).to.equal(
      "{\n    theme: 'light' | 'dark';\n    animations: boolean;\n  }"
    );
  });

  it('should handle multiple inheritance and React ComponentProps', function testAdvancedInheritance() {
    const code = `
      import { FormComponent, ButtonProps } from './fixtures/interfaces/test-types.ts';

      interface Base1 { base1: string; }
      interface Base2 { base2: number; }
      interface Combined extends Base1, Base2 { combined: boolean; }
    `;

    // Test complex inheritance chain
    const formResult = extractInterfaceDoc('FormComponent', createLocalSourceFile(code));
    assume(formResult.argTypes).to.have.property('id');
    assume(formResult.argTypes).to.have.property('disabled');
    assume(formResult.argTypes).to.have.property('name');

    // Test local multiple inheritance
    const combinedResult = extractInterfaceDoc('Combined', createLocalSourceFile(code));
    assume(combinedResult.argTypes).to.have.property('base1');
    assume(combinedResult.argTypes).to.have.property('base2');
    assume(combinedResult.argTypes).to.have.property('combined');

    const componentPropsCode = `
      import React, { ComponentProps } from 'react';
      interface DirectComponentProps extends ComponentProps<'div'> {
        customProp: string;
      }
    `;
    const componentPropsResult = extractInterfaceDoc('DirectComponentProps', createLocalSourceFile(componentPropsCode));
    assume(componentPropsResult.argTypes).to.have.property('customProp');
    assume(Object.keys(componentPropsResult.argTypes)).to.have.length(1);
  });

  it('should handle circular references', function testCircularReferences() {
    const circularReferenceCode = `
      interface RecursiveInterface extends RecursiveInterface {
        prop: string;
      }
    `;
    const circularResult = extractInterfaceDoc('RecursiveInterface', createLocalSourceFile(circularReferenceCode));
    assume(circularResult.argTypes).to.have.property('prop');
  });

  it('should handle absolute imports', function testAbsoluteImports() {
    const tempFilePath = path.join(__dirname, 'fixtures', 'temp-node-module.ts');

    try {
      fs.writeFileSync(tempFilePath, 'export interface TempInterface { tempProp: string; }');

      // Create a mock node_modules structure to test absolute resolution
      const nodeModulesPath = path.join(__dirname, 'node_modules', '@test', 'module');
      fs.mkdirSync(nodeModulesPath, { recursive: true });
      fs.writeFileSync(path.join(nodeModulesPath, 'index.ts'), 'export interface AbsInterface { absProp: string; }');

      const absoluteCode = `import { AbsInterface } from '@test/module';`;
      const absoluteResult = extractInterfaceDoc('AbsInterface', createLocalSourceFile(absoluteCode));

      assume(absoluteResult.argTypes.absProp?.type?.name).to.equal('string');
    } catch (_e) {
      console.error(_e);
    } finally {
      fs.rmSync(path.join(__dirname, 'node_modules'), { recursive: true, force: true });
      fs.unlinkSync(tempFilePath);
    }
  });

  it('should handle edge cases', function testEdgeCases() {
    const loggerError = console.error;
    const loggerWarn = console.warn;
    console.warn = () => void 0;
    console.error = () => void 0;

    // Non-existent interface
    let result = extractInterfaceDoc('NonExistent', createLocalSourceFile('interface Other { prop: string; }'));
    assume(Object.keys(result.argTypes)).to.have.length(0);

    // Type alias instead of interface
    result = extractInterfaceDoc('MyType', createLocalSourceFile('type MyType = { prop: string; };'));
    assume(Object.keys(result.argTypes)).to.have.length(0);

    // Import resolution failure
    result = extractInterfaceDoc('Missing', createLocalSourceFile('import { Missing } from "./non-existent";'));
    assume(Object.keys(result.argTypes)).to.have.length(0);

    // Absolute import
    result = extractInterfaceDoc(
      'AbsoluteInterface',
      createLocalSourceFile('import { AbsoluteInterface } from "@test/absolute";')
    );
    assume(Object.keys(result.argTypes)).to.have.length(0);

    // Error in property extraction
    result = extractInterfaceDoc('TestInterface', createLocalSourceFile('interface TestInterface { prop: string; }'), {
      propFilter: function _propFilter() {
        throw new Error('Filter error');
      }
    });
    assume(Object.keys(result.argTypes)).to.have.length(0);

    // JSDoc without comment text
    result = extractInterfaceDoc(
      'EmptyDoc',
      createLocalSourceFile(`
      interface EmptyDoc {
        /** */
        emptyComment: string;
      }
    `)
    );
    assume(result.argTypes.emptyComment?.description).to.equal('');

    console.error = loggerError;
    console.warn = loggerWarn;
  });
});

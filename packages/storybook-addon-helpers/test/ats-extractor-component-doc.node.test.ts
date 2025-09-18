import assume from 'assume';
import ts from 'typescript';
import path from 'node:path';
import { describe, it } from 'vitest';
import { extractComponentDoc } from '../src/ats-extractor-component-doc.ts';

function createLocalSourceFile(code: string): ts.SourceFile {
  return ts.createSourceFile(path.join(__dirname, 'test.tsx'), code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}

describe('component-doc-extractor', function componentDocExtractorTests() {
  it('should extract basic component documentation', function testBasicComponent() {
    const code = `import { BasicComponent } from './fixtures/components/test-components.tsx';`;
    const result = extractComponentDoc('BasicComponent', createLocalSourceFile(code));

    // Extracted properties
    assume(result.argTypes).to.have.property('title');
    assume(result.argTypes).to.have.property('description');
    assume(result.argTypes).to.have.property('onClick');
    assume(result.argTypes).to.have.property('isLoading');

    // Descriptions
    assume(result.argTypes.title?.description).to.equal('A required title property');
    assume(result.argTypes.description?.description).to.equal('An optional description\nwith multiple lines');
    assume(result.argTypes.onClick?.description).to.equal('Click handler function');
    assume(result.argTypes.isLoading?.description).to.equal('Loading state');

    // required flags
    assume(result.argTypes.title?.required).to.equal(true);
    assume(result.argTypes.description?.required).to.equal(false);
    assume(result.argTypes.onClick?.required).to.equal(false);
    assume(result.argTypes.isLoading?.required).to.equal(false);

    // default values
    assume(result.argTypes.description?.table?.defaultValue?.summary).to.equal("'Default description'");
  }, 20_000);

  it('should not extract JSDoc info found in the same file as the component', function testSameFileComponent() {
    const code = `
      interface LocalProps {
        prop: string;
      }

      const LocalComponent = (props: LocalProps) => <div>{props.prop}</div>;
    `;
    const result = extractComponentDoc('LocalComponent', createLocalSourceFile(code));

    assume(result.argTypes).to.deep.equal({});
  });

  it('should return empty argTypes when component is not found in parsed docs', function testComponentNotFound() {
    const code = `import { MismatchComponent } from './fixtures/components/test-components.tsx';`;
    const result = extractComponentDoc('MismatchComponent', createLocalSourceFile(code));

    assume(result.argTypes).to.deep.equal({});
  }, 20_000);
});

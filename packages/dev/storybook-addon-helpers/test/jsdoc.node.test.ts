import * as ts from 'typescript/unstable/ast';
import { parseSource } from './typescript.ts';
import { describe, expect, it } from 'vitest';
import { getPropJSDoc } from '../src/engine/jsdoc.ts';

function getFirstProperty(code: string): ts.PropertySignatureDeclaration {
  const sourceFile = parseSource(code, 'doc.ts');
  const declaration = sourceFile.statements[0];
  if (!ts.isInterfaceDeclaration(declaration)) throw new Error('Expected interface declaration');
  const member = declaration.members[0];
  if (!ts.isPropertySignatureDeclaration(member)) throw new Error('Expected property signature');
  return member;
}

describe('getPropJSDoc', function getPropJSDocTests() {
  it('extracts description and default tag', function extractsDocs() {
    const member = getFirstProperty(`
      interface Props {
        /**
         * The visible label.
         * @default "Save"
         */
        label?: string;
      }
    `);

    expect(getPropJSDoc(member)).toEqual({
      description: 'The visible label.',
      defaultValue: '"Save"',
      deprecated: false
    });
  });

  it('returns undefined description and null default when docs are absent', function absentDocs() {
    const member = getFirstProperty(`
      interface Props {
        label: string;
      }
    `);

    expect(getPropJSDoc(member)).toEqual({
      description: undefined,
      defaultValue: null,
      deprecated: false
    });
  });

  it('flags props tagged @deprecated', function flagsDeprecated() {
    const member = getFirstProperty(`
      interface Props {
        /**
         * Old prop.
         * @deprecated use something else
         */
        legacy?: string;
      }
    `);

    expect(getPropJSDoc(member)).toEqual({
      description: 'Old prop.',
      defaultValue: null,
      deprecated: true
    });
  });
});

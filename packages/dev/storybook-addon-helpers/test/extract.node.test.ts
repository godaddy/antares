import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { extractFromTypeNode, extractTypeDocs } from '../src/engine/extract.ts';
import { createResolver } from '../src/engine/resolve.ts';

const fixturePath = path.join(__dirname, 'fixtures/engine/types.ts');

function extract(name: string) {
  const resolver = createResolver(fixturePath);
  const sourceFile = resolver.getSourceFile(fixturePath);
  return extractTypeDocs(name, sourceFile, resolver);
}

function getTypeAlias(name: string) {
  const resolver = createResolver(fixturePath);
  const sourceFile = resolver.getSourceFile(fixturePath);
  const symbol = resolver.resolveSymbol(name, sourceFile);

  if (!symbol || !ts.isTypeAliasDeclaration(symbol.declaration)) {
    throw new Error(`Expected ${name} to resolve to a type alias`);
  }

  return { resolver, sourceFile: symbol.sourceFile, type: symbol.declaration.type };
}

describe('extractTypeDocs', function extractTypeDocsTests() {
  it('extracts interface properties and JSDoc', function extractsInterface() {
    expect(extract('LocalProps')).toEqual({
      name: 'LocalProps',
      props: [
        {
          name: 'local',
          type: 'boolean',
          required: true,
          description: 'local description',
          defaultValue: null,
          sourceFile: fixturePath,
          declaringType: 'LocalProps'
        }
      ]
    });
  });

  it('extracts inherited and imported interface properties', function extractsExtends() {
    expect(extract('UsesImportedProps').props.map((prop) => prop.name)).toEqual(['imported', 'own']);
    expect(extract('ChildProps').props.map((prop) => prop.name)).toEqual(['parent', 'child']);
  });

  it('extracts type literals and intersections', function extractsAliases() {
    expect(extract('LiteralProps').props.map((prop) => prop.name)).toEqual(['literal']);
    expect(extract('IntersectedProps').props.map((prop) => prop.name)).toEqual(['parent', 'literal', 'intersected']);
  });

  it('resolves utility wrappers inside type aliases', function extractsUtilities() {
    expect(extract('PickedProps').props).toMatchObject([{ name: 'parent', required: false }]);
    expect(extract('OmittedProps').props.map((prop) => prop.name)).toEqual(['child']);
    expect(extract('PartialProps').props).toMatchObject([
      { name: 'parent', required: false },
      { name: 'child', required: false }
    ]);
    expect(extract('RequiredProps').props).toMatchObject([
      { name: 'parent', required: true },
      { name: 'child', required: true }
    ]);
  });
});

describe('extractFromTypeNode', function extractFromTypeNodeTests() {
  it('extracts properties directly from a type node', function extractsTypeNode() {
    const { resolver, sourceFile, type } = getTypeAlias('LiteralProps');

    expect(extractFromTypeNode(type, sourceFile, resolver)).toMatchObject([
      {
        name: 'literal',
        required: false,
        description: 'type literal description',
        declaringType: 'anonymous'
      }
    ]);
  });
});

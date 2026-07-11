import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { extractFromTypeNode, extractTypeDocs } from '../src/engine/extract.ts';
import { createResolver } from '../src/engine/resolve.ts';

const fixturePath = path.join(__dirname, 'fixtures/engine/types.ts');
const importedFixturePath = path.join(__dirname, 'fixtures/engine/imported.ts');

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

  it('extracts own props first, then inherited and imported ones', function extractsExtends() {
    expect(extract('UsesImportedProps').props.map((prop) => prop.name)).toEqual(['own', 'imported']);
    expect(extract('ChildProps').props.map((prop) => prop.name)).toEqual(['child', 'parent']);
    expect(extract('UsesImportedProps').props[1]).toMatchObject({
      name: 'imported',
      required: true,
      sourceFile: importedFixturePath,
      declaringType: 'ImportedProps'
    });
    expect(extract('ChildProps').props[1]).toMatchObject({
      name: 'parent',
      required: false,
      description: 'parent description',
      sourceFile: fixturePath,
      declaringType: 'ParentProps'
    });
  });

  it('extracts type literals and intersections', function extractsAliases() {
    expect(extract('LiteralProps').props.map((prop) => prop.name)).toEqual(['literal']);
    expect(extract('IntersectedProps').props.map((prop) => prop.name)).toEqual(['parent', 'literal', 'intersected']);
  });

  it('resolves utility wrappers inside type aliases', function extractsUtilities() {
    expect(extract('PickedProps').props).toMatchObject([
      { name: 'parent', required: false, declaringType: 'ParentProps', sourceFile: fixturePath }
    ]);
    expect(extract('OmittedProps').props.map((prop) => prop.name)).toEqual(['child']);
    expect(extract('PartialProps').props).toMatchObject([
      { name: 'child', required: false },
      { name: 'parent', required: false }
    ]);
    expect(extract('RequiredProps').props).toMatchObject([
      { name: 'child', required: true },
      { name: 'parent', required: true }
    ]);
  });

  it('keeps sibling utility branches independent', function extractsSiblingUtilities() {
    expect(extract('SiblingUtilityProps').props.map((prop) => prop.name)).toEqual(['a', 'b']);
  });

  it('extracts utility wrapper heritage props', function extractsUtilityHeritage() {
    expect(extract('PickExtendsProps').props.map((prop) => prop.name)).toEqual(['ownPick', 'a']);
    expect(extract('OmitExtendsProps').props.map((prop) => prop.name)).toEqual(['ownOmit', 'a']);
  });

  it('lets own interface props override inherited props', function extractsInterfaceOverrides() {
    const props = extract('OverrideChildProps').props;

    expect(props.map((prop) => prop.name)).toEqual(['override']);
    expect(props[0]).toMatchObject({
      name: 'override',
      required: true,
      description: 'child description',
      declaringType: 'OverrideChildProps'
    });
  });

  it('lets rightmost intersection props override earlier props', function extractsIntersectionOverrides() {
    expect(extract('IntersectionOverrideProps').props).toMatchObject([{ name: 'value', required: true }]);
    expect(extract('IntersectionOverrideProps').props.map((prop) => prop.name)).toEqual(['value']);
  });

  it('keeps base props for unsupported utility key expressions', function extractsUnsupportedUtilityKeys() {
    expect(extract('UnsupportedKeyofPickProps').props.map((prop) => prop.name)).toEqual(['child', 'parent']);
    expect(extract('UnsupportedKeyofOmitProps').props.map((prop) => prop.name)).toEqual(['child', 'parent']);
  });

  it('substitutes a generic type argument used directly in an alias body', function extractsGenericArgument() {
    expect(extract('UsesGenericWrapperProps').props.map((prop) => prop.name)).toEqual(['own', 'wrapped']);
    expect(extract('UsesGenericWrapperProps').props[0]).toMatchObject({
      name: 'own',
      required: true,
      description: 'own description',
      declaringType: 'GenericOwnProps'
    });
  });

  it('substitutes generic arguments threaded through nested aliases and heritage', function extractsGenericHeritage() {
    expect(extract('UsesGenericHeritageProps').props.map((prop) => prop.name)).toEqual(['extra', 'layout']);
    expect(extract('UsesGenericHeritageProps').props[1]).toMatchObject({
      name: 'layout',
      required: true,
      declaringType: 'GenericLayoutOwnProps'
    });
  });

  it('does not overflow on type alias cycles', function extractsAliasCycles() {
    let doc: ReturnType<typeof extract> | undefined;

    expect(function extractAliasCycle() {
      doc = extract('AliasCycleAProps');
    }).not.toThrow();

    expect(doc?.props.map((prop) => prop.name)).toEqual(['b', 'a']);
  });

  it('does not overflow on mixed interface and type alias cycles', function extractsMixedCycles() {
    let doc: ReturnType<typeof extract> | undefined;

    expect(function extractMixedCycle() {
      doc = extract('MixedCycleInterfaceProps');
    }).not.toThrow();

    expect(doc?.props.map((prop) => prop.name)).toEqual(['mixedInterface', 'mixedAlias']);
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

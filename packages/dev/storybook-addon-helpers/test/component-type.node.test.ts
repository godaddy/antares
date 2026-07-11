import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { createResolver } from '../src/engine/resolve.ts';
import { extractComponentDocs } from '../src/engine/component-type.ts';

const fixturePath = path.join(__dirname, 'fixtures/engine/components.tsx');

function extract(name: string) {
  const resolver = createResolver(fixturePath);
  const sourceFile = resolver.getSourceFile(fixturePath);
  return extractComponentDocs(name, sourceFile, resolver);
}

describe('extractComponentDocs', function extractComponentDocsTests() {
  it('extracts function parameter props', function extractsFunction() {
    expect(extract('FunctionComponent').props.map((prop) => prop.name)).toEqual(['fnRequired', 'fnOptional']);
  });

  it('extracts arrow function parameter props', function extractsArrow() {
    expect(extract('ArrowComponent').props.map((prop) => prop.name)).toEqual(['arrowRequired']);
  });

  it('extracts forwardRef second type argument props', function extractsForwardRef() {
    expect(extract('ForwardRefComponent').props.map((prop) => prop.name)).toEqual(['forwarded']);
  });

  it('extracts FC type argument props', function extractsFC() {
    expect(extract('FCComponent').props.map((prop) => prop.name)).toEqual(['fc']);
  });

  it('extracts polymorphic forwardRef props cast with `as`', function extractsPolymorphicForwardRef() {
    expect(extract('PolymorphicForwardRefComponent').props.map((prop) => prop.name)).toEqual(['polyProp', 'as']);
  });
});

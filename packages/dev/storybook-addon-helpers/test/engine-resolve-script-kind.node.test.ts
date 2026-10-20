import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it, vi } from 'vitest';
import { createResolver } from '../src/engine/resolve.ts';

vi.mock('typescript', async function mockTypescript(importOriginal) {
  const actual = await importOriginal<{ default: typeof ts }>();
  return { default: { ...actual.default, getScriptKindFromFileName: undefined } };
});

const componentsFixturePath = path.join(__dirname, 'fixtures/engine/components.tsx');
const typesFixturePath = path.join(__dirname, 'fixtures/engine/types.ts');

describe('createResolver without ts.getScriptKindFromFileName', function scriptKindFallbackTests() {
  it('infers the script kind from the file extension', function infersScriptKind() {
    const resolver = createResolver(componentsFixturePath);

    expect(resolver.getSourceFile(componentsFixturePath).languageVariant).toBe(ts.LanguageVariant.JSX);
    expect(resolver.getSourceFile(typesFixturePath).languageVariant).toBe(ts.LanguageVariant.Standard);
  });
});

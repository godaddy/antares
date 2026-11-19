import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { extractTypeDocs } from '../src/engine/extract.ts';
import { testResolver } from './typescript.ts';

const fixturePath = path.join(__dirname, 'fixtures/engine/literal-props.ts');

function extract(code: string, name = 'Props', isolated = true) {
  const resolver = testResolver(fixturePath, code, { isolated });
  return extractTypeDocs(name, resolver.getSourceFile(fixturePath), resolver).props;
}

function display(declarations: string, type = 'Value') {
  return extract(`${declarations}\ninterface Props { value?: ${type}; }`)[0].type;
}

describe('literal union type displays', function literalUnionDisplayTests() {
  it('expands aliases for required and optional props while keeping their metadata', function expandsAliases() {
    const props = extract(`
      type Emphasis = 'error' | 'message';
      interface Props {
        /** Status message. @default 'message' */
        emphasis?: Emphasis;
        required: Emphasis;
      }
    `);

    expect(props).toMatchObject([
      {
        name: 'emphasis',
        type: "'error' | 'message'",
        required: false,
        description: 'Status message.',
        defaultValue: "'message'",
        declaringType: 'Props'
      },
      { name: 'required', type: "'error' | 'message'", required: true }
    ]);
  });

  it('flattens alias chains and parentheses, deduplicating literals in authored order', function expandsChains() {
    expect(
      display(`
        type Base = 'error' | 'message';
        type Extra = (Base | 'success');
        type Value = Extra | Base | "error" | 2 | -1 | 0x2;
      `)
    ).toBe("'error' | 'message' | 'success' | 2 | -1");
  });

  it('expands aliases inside an inline union and inside type literals', function expandsInlineUnion() {
    const props = extract(`
      type Emphasis = 'error' | 'message';
      type Props = { emphasis: Emphasis | 'success' };
    `);
    expect(props[0]).toMatchObject({
      type: "'error' | 'message' | 'success'",
      declaringType: 'Props'
    });
  });

  it('resolves renamed imports, re-exports, and inherited props in their declaration scopes', function expandsImports() {
    const props = extract(
      `
        import type { Emphasis as ImportedEmphasis, LiteralBaseProps } from './literal-values.ts';
        import type { ReExportedEmphasis } from './literal-values-barrel.ts';
        type Emphasis = 'local';
        interface Props extends LiteralBaseProps {
          imported: ImportedEmphasis;
          reExported: ReExportedEmphasis;
        }
      `,
      'Props',
      false
    );
    expect(props.map((prop) => [prop.name, prop.type])).toEqual([
      ['imported', "'error' | 'message'"],
      ['reExported', "'error' | 'message' | 'success'"],
      ['emphasis', "'error' | 'message' | 'success'"]
    ]);
  });

  it('expands a single literal alias', function expandsSingleLiteral() {
    expect(display(`type Value = 'only';`)).toBe("'only'");
  });

  it.each([
    ['object', '{ label: string }'],
    ['callback', '() => void'],
    ['unrestricted string', "'error' | string"],
    ['mixed complex union', "'error' | { message: string }"],
    ['boolean union', 'true | false'],
    ['nullable union', "'error' | null"],
    ['unresolved union member', "'error' | Missing"],
    ['array', "('error' | 'message')[]"],
    ['conditional', "string extends string ? 'yes' : 'no'"]
  ])('preserves the alias for a %s type', function preservesComplexType(_label, type) {
    expect(display(`type Value = ${type};`)).toBe('Value');
  });

  it('keeps the whole authored expression when a union cannot fully expand', function preservesWholeExpression() {
    expect(display(`type Value = 'error' | 'message';`, 'Value | undefined')).toBe('Value | undefined');
    expect(display('', 'Missing')).toBe('Missing');
    expect(display('', "'error'  |  'message'")).toBe("'error'  |  'message'");
  });

  it('preserves generic aliases and parameters that shadow a local alias', function preservesGenerics() {
    expect(display(`type Value<T = string> = 'error' | 'message';`)).toBe('Value');
    expect(display(`type Value<T> = T;`, "Value<'error' | 'message'>")).toBe("Value<'error' | 'message'>");
    for (const declaration of [
      'interface Props<Value> { value: Value }',
      'type Props<Value> = { value: Value } & { own: boolean }'
    ]) {
      expect(extract(`type Value = 'error' | 'message'; ${declaration}`)[0].type).toBe('Value');
    }
  });

  it('resolves alias bodies in their own scope when a prop declaration has a generic parameter', function scopesAliases() {
    const props = extract(`
      type Value = 'error' | 'message';
      type Emphasis = Value;
      interface Props<Value> { emphasis: Emphasis; value: Value }
    `);
    expect(props.map((prop) => prop.type)).toEqual(["'error' | 'message'", 'Value']);
  });

  it('retains cyclic aliases without partially expanding or overflowing', function preservesCycles() {
    expect(display(`type Value = 'error' | Other; type Other = 'message' | Value;`)).toBe('Value');
  });

  it('expands ten distinct values but retains aliases with eleven', function limitsValueCount() {
    const ten = Array.from({ length: 10 }, (_, index) => `'value-${index}'`).join(' | ');
    expect(display(`type Value = ${ten};`)).toBe(ten);
    expect(display(`type Value = ${ten} | 'extra';`)).toBe('Value');
  });

  it('expands 200 characters but retains longer aliases', function limitsDisplayLength() {
    const twoHundred = `'${'a'.repeat(192)}' | 'b'`;
    expect(twoHundred).toHaveLength(200);
    expect(display(`type Value = ${twoHundred};`)).toBe(twoHundred);
    expect(display(`type Value = '${'a'.repeat(193)}' | 'b';`)).toBe('Value');
  });

  it('bounds deep alias chains', function limitsDepth() {
    const chain = Array.from({ length: 40 }, (_, index) => `type A${index} = A${index + 1};`).join('\n');
    expect(display(`${chain}\ntype A40 = 'error' | 'message'; type Value = A0;`)).toBe('Value');
  });

  it('bounds branching aliases even when they repeatedly resolve to the same literals', function limitsTraversal() {
    const chain = Array.from({ length: 20 }, (_, index) => `type A${index} = A${index + 1} | A${index + 1};`).join(
      '\n'
    );
    expect(display(`${chain}\ntype A20 = 'error' | 'message'; type Value = A0;`)).toBe('Value');
  });
});

import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { toLiteralValue, toTsExpression } from '../src/literal.ts';

function parseExpression(code: string): ts.Expression {
  const sourceFile = ts.createSourceFile('expr.ts', `const value = ${code};`, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const statement = sourceFile.statements[0] as ts.VariableStatement;
  const initializer = statement.declarationList.declarations[0].initializer;
  if (!initializer) throw new Error('Expected an initializer');
  return initializer;
}

describe('toTsExpression', function toTsExpressionTests() {
  it('round-trips primitives, arrays, and objects through toLiteralValue', function roundTrips() {
    const values = [
      'text',
      42,
      true,
      false,
      null,
      ['a', 1, false],
      { a: 1, b: 'x', c: [true], d: { e: null } }
    ];

    for (const value of values) {
      expect(toLiteralValue(toTsExpression(value))).toEqual(value);
    }
  });

  it('maps undefined to a null literal', function mapsUndefined() {
    expect(toTsExpression(undefined).kind).toBe(ts.SyntaxKind.NullKeyword);
    expect(toLiteralValue(toTsExpression(undefined))).toBeNull();
  });

  it('falls back to null for unsupported values', function fallsBack() {
    expect(toTsExpression((() => undefined) as unknown).kind).toBe(ts.SyntaxKind.NullKeyword);
  });
});

describe('toLiteralValue', function toLiteralValueTests() {
  it('reads no-substitution template literals', function readsTemplate() {
    expect(toLiteralValue(parseExpression('`hello`'))).toBe('hello');
  });

  it('returns null for unsupported expressions', function unsupported() {
    expect(toLiteralValue(parseExpression('someIdentifier'))).toBeNull();
  });

  it('skips methods and computed keys while reading string and numeric keys', function skipsMembers() {
    const actual = toLiteralValue(parseExpression("{ 'k': 1, 3: 'x', method() { return 2; }, ['computed']: 4 }"));

    expect(actual).toEqual({ k: 1, '3': 'x' });
  });
});

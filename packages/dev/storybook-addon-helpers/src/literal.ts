import ts from 'typescript';

export function toTsExpression(value: unknown): ts.Expression {
  const factory = ts.factory;

  if (value === null || value === undefined) return factory.createNull();
  if (typeof value === 'string') return factory.createStringLiteral(value);
  if (typeof value === 'number') return factory.createNumericLiteral(value);
  if (typeof value === 'boolean') return value ? factory.createTrue() : factory.createFalse();

  if (Array.isArray(value)) {
    return factory.createArrayLiteralExpression(
      value.map((item) => toTsExpression(item)),
      true
    );
  }

  if (typeof value === 'object') {
    return factory.createObjectLiteralExpression(
      Object.entries(value as Record<string, unknown>).map(([key, item]) =>
        factory.createPropertyAssignment(key, toTsExpression(item))
      ),
      true
    );
  }

  return factory.createNull();
}

export function toLiteralValue(node: ts.Expression): unknown {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;

  if (ts.isArrayLiteralExpression(node)) return node.elements.map((element) => toLiteralValue(element as ts.Expression));

  if (ts.isObjectLiteralExpression(node)) {
    const value: Record<string, unknown> = {};
    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) continue;
      const key = getObjectPropertyName(property.name);
      if (!key) continue;
      value[key] = toLiteralValue(property.initializer as ts.Expression);
    }
    return value;
  }

  return null;
}

function getObjectPropertyName(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  return undefined;
}

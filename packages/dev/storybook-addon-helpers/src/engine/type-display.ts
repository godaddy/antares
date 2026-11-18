import * as ts from 'typescript/unstable/ast';
import type { Resolver } from './resolve.ts';

const MAX_VALUES = 10;
const MAX_LENGTH = 200;
const MAX_DEPTH = 32;
const MAX_NODES = 256;

/** Expand only small, finite literal aliases; preserve authored syntax otherwise. */
export function getTypeDisplay(
  typeNode: ts.TypeNode | undefined,
  sourceFile: ts.SourceFile,
  resolver: Resolver,
  typeParameters: ReadonlySet<string>
): string {
  if (!typeNode) return 'any';

  const original = typeNode.getText(sourceFile);
  const values = new Map<string, string>();
  const active = new Set<string>();
  let expanded = false;
  let length = 0;
  let remainingNodes = MAX_NODES;

  function collect(node: ts.TypeNode, source: ts.SourceFile, depth: number, inAlias = false): boolean {
    if (depth > MAX_DEPTH || --remainingNodes < 0) return false;
    if (ts.isParenthesizedTypeNode(node)) return collect(node.type, source, depth + 1, inAlias);
    if (ts.isUnionTypeNode(node)) return node.types.every((type) => collect(type, source, depth + 1, inAlias));

    if (ts.isLiteralTypeNode(node)) {
      const literal = node.literal;
      let key: string;
      if (ts.isStringLiteral(literal) || ts.isNoSubstitutionTemplateLiteral(literal)) {
        key = `string:${literal.text}`;
      } else if (ts.isNumericLiteral(literal)) {
        key = `number:${Number(literal.text.replaceAll('_', ''))}`;
      } else if (
        ts.isPrefixUnaryExpression(literal) &&
        literal.operator === ts.SyntaxKind.MinusToken &&
        ts.isNumericLiteral(literal.operand)
      ) {
        key = `number:${-Number(literal.operand.text.replaceAll('_', ''))}`;
      } else {
        return false;
      }

      if (!values.has(key)) {
        const text = node.getText(source);
        length += text.length + (values.size ? 3 : 0);
        values.set(key, text);
      }
      return values.size <= MAX_VALUES && length <= MAX_LENGTH;
    }

    if (!ts.isTypeReferenceNode(node) || !ts.isIdentifier(node.typeName) || node.typeArguments?.length) return false;
    // A generic parameter shadows a same-named alias in the declaration's file.
    if (!inAlias && typeParameters.has(node.typeName.text)) return false;

    const symbol = resolver.resolveSymbol(node.typeName.text, source);
    if (!symbol || !ts.isTypeAliasDeclaration(symbol.declaration) || symbol.declaration.typeParameters?.length)
      return false;

    const key = `${symbol.sourceFile.fileName}:${symbol.name}`;
    if (active.has(key)) return false;
    active.add(key);
    expanded = true;
    try {
      return collect(symbol.declaration.type, symbol.sourceFile, depth + 1, true);
    } finally {
      active.delete(key);
    }
  }

  return collect(typeNode, sourceFile, 0) && expanded ? [...values.values()].join(' | ') : original;
}

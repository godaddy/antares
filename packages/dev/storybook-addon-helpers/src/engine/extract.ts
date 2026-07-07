import ts from 'typescript';
import { getPropJSDoc } from './jsdoc.ts';
import type { Resolver } from './resolve.ts';
import { applyUtilityType, getUtilityInnerType } from './utility-types.ts';
import type { PropDoc, PropsDoc } from '../types.ts';

export function extractTypeDocs(typeName: string, sourceFile: ts.SourceFile, resolver: Resolver): PropsDoc {
  const symbol = resolver.resolveSymbol(typeName, sourceFile);
  if (!symbol) return { name: typeName, props: [] };

  return {
    name: symbol.name,
    props: extractFromDeclaration(symbol.declaration, symbol.sourceFile, resolver, new Set())
  };
}

export function extractFromTypeNode(
  typeNode: ts.TypeNode,
  sourceFile: ts.SourceFile,
  resolver: Resolver,
  active = new Set<string>()
): PropDoc[] {
  if (ts.isTypeLiteralNode(typeNode)) return extractMembers(typeNode.members, sourceFile, 'anonymous');

  if (ts.isIntersectionTypeNode(typeNode)) {
    return normalizeProps(typeNode.types.flatMap((node) => extractFromTypeNode(node, sourceFile, resolver, active)));
  }

  if (ts.isTypeReferenceNode(typeNode) && ts.isIdentifier(typeNode.typeName)) {
    const typeName = typeNode.typeName.text;
    const innerType = getUtilityInnerType(typeName, typeNode.typeArguments ?? []);

    if (innerType) {
      const props = extractFromTypeNode(innerType, sourceFile, resolver, active);
      return applyUtilityType(typeName, props, typeNode.typeArguments ?? []) ?? props;
    }

    const symbol = resolver.resolveSymbol(typeName, sourceFile);
    if (!symbol) return [];
    return extractFromDeclaration(symbol.declaration, symbol.sourceFile, resolver, active);
  }

  return [];
}

function extractFromDeclaration(
  declaration: ts.Declaration,
  sourceFile: ts.SourceFile,
  resolver: Resolver,
  active: Set<string>
): PropDoc[] {
  if (ts.isInterfaceDeclaration(declaration)) {
    const key = `${sourceFile.fileName}:${declaration.name.text}`;
    if (active.has(key)) return [];
    active.add(key);

    try {
      const inherited =
        declaration.heritageClauses?.flatMap((clause) =>
          clause.types.flatMap(function extractHeritageType(typeExpression) {
            return extractFromHeritageType(typeExpression, sourceFile, resolver, active);
          })
        ) ?? [];

      return normalizeProps([...inherited, ...extractMembers(declaration.members, sourceFile, declaration.name.text)]);
    } finally {
      active.delete(key);
    }
  }

  if (ts.isTypeAliasDeclaration(declaration)) {
    const key = `${sourceFile.fileName}:${declaration.name.text}`;
    if (active.has(key)) return [];
    active.add(key);

    try {
      return extractFromTypeNode(declaration.type, sourceFile, resolver, active).map((prop) => ({
        ...prop,
        declaringType: prop.declaringType === 'anonymous' ? declaration.name.text : prop.declaringType
      }));
    } finally {
      active.delete(key);
    }
  }

  return [];
}

function extractFromHeritageType(
  typeExpression: ts.ExpressionWithTypeArguments,
  sourceFile: ts.SourceFile,
  resolver: Resolver,
  active: Set<string>
): PropDoc[] {
  if (!ts.isIdentifier(typeExpression.expression)) return [];

  const typeNode = ts.factory.createTypeReferenceNode(typeExpression.expression, typeExpression.typeArguments);
  return extractFromTypeNode(typeNode, sourceFile, resolver, active);
}

function extractMembers(
  members: ts.NodeArray<ts.TypeElement>,
  sourceFile: ts.SourceFile,
  declaringType: string
): PropDoc[] {
  const props: PropDoc[] = [];

  for (const member of members) {
    if (!ts.isPropertySignature(member)) continue;
    const name = getPropertyName(member.name);
    if (!name) continue;

    const jsDoc = getPropJSDoc(member);
    props.push({
      name,
      type: member.type?.getText(sourceFile) ?? 'any',
      required: !member.questionToken,
      description: jsDoc.description,
      defaultValue: jsDoc.defaultValue,
      sourceFile: sourceFile.fileName,
      declaringType
    });
  }

  return normalizeProps(props);
}

function getPropertyName(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  return undefined;
}

function normalizeProps(props: PropDoc[]): PropDoc[] {
  const normalized: PropDoc[] = [];
  const propIndexes = new Map<string, number>();

  for (const prop of props) {
    const existingIndex = propIndexes.get(prop.name);

    if (existingIndex === undefined) {
      propIndexes.set(prop.name, normalized.length);
      normalized.push(prop);
      continue;
    }

    // Keep the first render position while replacing metadata with the later override.
    normalized[existingIndex] = prop;
  }

  return normalized;
}

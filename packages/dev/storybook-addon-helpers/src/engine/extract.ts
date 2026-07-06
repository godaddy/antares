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
  visited = new Set<string>()
): PropDoc[] {
  if (ts.isTypeLiteralNode(typeNode)) return extractMembers(typeNode.members, sourceFile, 'anonymous');

  if (ts.isIntersectionTypeNode(typeNode)) {
    return typeNode.types.flatMap((node) => extractFromTypeNode(node, sourceFile, resolver, visited));
  }

  if (ts.isTypeReferenceNode(typeNode) && ts.isIdentifier(typeNode.typeName)) {
    const typeName = typeNode.typeName.text;
    const innerType = getUtilityInnerType(typeName, typeNode.typeArguments ?? []);

    if (innerType) {
      const props = extractFromTypeNode(innerType, sourceFile, resolver, visited);
      return applyUtilityType(typeName, props, typeNode.typeArguments ?? []) ?? props;
    }

    const symbol = resolver.resolveSymbol(typeName, sourceFile);
    if (!symbol) return [];
    return extractFromDeclaration(symbol.declaration, symbol.sourceFile, resolver, visited);
  }

  return [];
}

function extractFromDeclaration(
  declaration: ts.Declaration,
  sourceFile: ts.SourceFile,
  resolver: Resolver,
  visited: Set<string>
): PropDoc[] {
  if (ts.isInterfaceDeclaration(declaration)) {
    const key = `${sourceFile.fileName}:${declaration.name.text}`;
    if (visited.has(key)) return [];
    visited.add(key);

    const inherited =
      declaration.heritageClauses?.flatMap((clause) =>
        clause.types.flatMap(function extractHeritageType(typeExpression) {
          const typeNode = ts.factory.createTypeReferenceNode(
            typeExpression.expression.getText(sourceFile),
            typeExpression.typeArguments
          );
          return extractFromTypeNode(typeNode, sourceFile, resolver, visited);
        })
      ) ?? [];

    return [...inherited, ...extractMembers(declaration.members, sourceFile, declaration.name.text)];
  }

  if (ts.isTypeAliasDeclaration(declaration)) {
    return extractFromTypeNode(declaration.type, sourceFile, resolver, visited).map((prop) => ({
      ...prop,
      declaringType: prop.declaringType === 'anonymous' ? declaration.name.text : prop.declaringType
    }));
  }

  return [];
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

  return props;
}

function getPropertyName(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  return undefined;
}

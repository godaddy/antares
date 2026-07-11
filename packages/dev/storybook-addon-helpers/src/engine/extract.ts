import ts from 'typescript';
import { getPropJSDoc } from './jsdoc.ts';
import type { Resolver } from './resolve.ts';
import { applyUtilityType, getUtilityInnerType } from './utility-types.ts';
import type { PropDoc, PropsDoc } from '../types.ts';

/**
 * A generic type parameter bound to a concrete type argument. `sourceFile` is
 * the file the argument node lives in, and `env` is the parameter scope that
 * the argument itself should be interpreted under (so nested generics chain
 * to the right binding without leaking parameters across declarations).
 */
interface TypeParamBinding {
  typeNode: ts.TypeNode;
  sourceFile: ts.SourceFile;
  env: TypeParamEnv;
}

type TypeParamEnv = ReadonlyMap<string, TypeParamBinding>;

const EMPTY_ENV: TypeParamEnv = new Map();

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
  active = new Set<string>(),
  env: TypeParamEnv = EMPTY_ENV
): PropDoc[] {
  if (ts.isTypeLiteralNode(typeNode)) return extractMembers(typeNode.members, sourceFile, 'anonymous');

  if (ts.isIntersectionTypeNode(typeNode)) {
    return normalizeProps(
      typeNode.types.flatMap((node) => extractFromTypeNode(node, sourceFile, resolver, active, env))
    );
  }

  if (ts.isTypeReferenceNode(typeNode) && ts.isIdentifier(typeNode.typeName)) {
    const typeName = typeNode.typeName.text;

    // A bound type parameter shadows any same-named declaration, so resolve it
    // against its argument (in the scope that argument came from).
    const binding = env.get(typeName);
    if (binding) return extractFromTypeNode(binding.typeNode, binding.sourceFile, resolver, active, binding.env);

    const innerType = getUtilityInnerType(typeName, typeNode.typeArguments ?? []);

    if (innerType) {
      const props = extractFromTypeNode(innerType, sourceFile, resolver, active, env);
      return applyUtilityType(typeName, props, typeNode.typeArguments ?? []) ?? props;
    }

    const symbol = resolver.resolveSymbol(typeName, sourceFile);
    if (!symbol) return [];

    const nextEnv = bindTypeParameters(
      symbol.declaration,
      typeNode.typeArguments ?? [],
      sourceFile,
      symbol.sourceFile,
      env
    );
    return extractFromDeclaration(symbol.declaration, symbol.sourceFile, resolver, active, nextEnv);
  }

  return [];
}

function extractFromDeclaration(
  declaration: ts.Declaration,
  sourceFile: ts.SourceFile,
  resolver: Resolver,
  active: Set<string>,
  env: TypeParamEnv = EMPTY_ENV
): PropDoc[] {
  if (ts.isInterfaceDeclaration(declaration)) {
    const key = `${sourceFile.fileName}:${declaration.name.text}`;
    if (active.has(key)) return [];
    active.add(key);

    try {
      const inherited = normalizeProps(
        declaration.heritageClauses?.flatMap((clause) =>
          clause.types.flatMap(function extractHeritageType(typeExpression) {
            return extractFromHeritageType(typeExpression, sourceFile, resolver, active, env);
          })
        ) ?? []
      );

      const own = extractMembers(declaration.members, sourceFile, declaration.name.text);

      // Own members lead, then inherited; own declarations win on a name clash.
      return normalizeProps([...own, ...inherited], { preferFirst: true });
    } finally {
      active.delete(key);
    }
  }

  if (ts.isTypeAliasDeclaration(declaration)) {
    const key = `${sourceFile.fileName}:${declaration.name.text}`;
    if (active.has(key)) return [];
    active.add(key);

    try {
      return extractFromTypeNode(declaration.type, sourceFile, resolver, active, env).map((prop) => ({
        ...prop,
        declaringType: prop.declaringType === 'anonymous' ? declaration.name.text : prop.declaringType
      }));
    } finally {
      active.delete(key);
    }
  }

  return [];
}

/**
 * Binds a generic declaration's type parameters to the arguments supplied at a
 * reference site. Explicit arguments live in `argSourceFile` and are read in
 * the caller's `env`; a parameter's default lives in `declSourceFile`.
 */
function bindTypeParameters(
  declaration: ts.Declaration,
  typeArguments: readonly ts.TypeNode[],
  argSourceFile: ts.SourceFile,
  declSourceFile: ts.SourceFile,
  env: TypeParamEnv
): TypeParamEnv {
  const typeParameters = getTypeParameters(declaration);
  if (!typeParameters || typeParameters.length === 0) return EMPTY_ENV;

  const bindings = new Map<string, TypeParamBinding>();

  typeParameters.forEach(function bindParameter(parameter, index) {
    const argument = typeArguments[index];

    if (argument) {
      bindings.set(parameter.name.text, { typeNode: argument, sourceFile: argSourceFile, env });
      return;
    }

    if (parameter.default) {
      bindings.set(parameter.name.text, { typeNode: parameter.default, sourceFile: declSourceFile, env: EMPTY_ENV });
    }
  });

  return bindings;
}

function getTypeParameters(declaration: ts.Declaration): ts.NodeArray<ts.TypeParameterDeclaration> | undefined {
  if (ts.isInterfaceDeclaration(declaration) || ts.isTypeAliasDeclaration(declaration)) {
    return declaration.typeParameters;
  }
  return undefined;
}

function extractFromHeritageType(
  typeExpression: ts.ExpressionWithTypeArguments,
  sourceFile: ts.SourceFile,
  resolver: Resolver,
  active: Set<string>,
  env: TypeParamEnv
): PropDoc[] {
  if (!ts.isIdentifier(typeExpression.expression)) return [];

  const typeNode = ts.factory.createTypeReferenceNode(typeExpression.expression, typeExpression.typeArguments);
  return extractFromTypeNode(typeNode, sourceFile, resolver, active, env);
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
      declaringType,
      ...(jsDoc.deprecated ? { deprecated: true } : {})
    });
  }

  return normalizeProps(props);
}

function getPropertyName(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  return undefined;
}

function normalizeProps(props: PropDoc[], options: { preferFirst?: boolean } = {}): PropDoc[] {
  const normalized: PropDoc[] = [];
  const propIndexes = new Map<string, number>();

  for (const prop of props) {
    const existingIndex = propIndexes.get(prop.name);

    if (existingIndex === undefined) {
      propIndexes.set(prop.name, normalized.length);
      normalized.push(prop);
      continue;
    }

    // A later duplicate wins its metadata by default; `preferFirst` keeps the first.
    if (!options.preferFirst) normalized[existingIndex] = prop;
  }

  return normalized;
}

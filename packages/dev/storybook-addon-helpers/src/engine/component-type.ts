import ts from 'typescript';
import { extractFromTypeNode } from './extract.ts';
import type { Resolver } from './resolve.ts';
import type { PropsDoc } from '../types.ts';

export function extractComponentDocs(componentName: string, sourceFile: ts.SourceFile, resolver: Resolver): PropsDoc {
  const symbol = resolver.resolveSymbol(componentName, sourceFile);
  if (!symbol) return { name: componentName, props: [] };

  const propsType = getComponentPropsType(symbol.declaration, symbol.sourceFile);
  if (!propsType) return { name: componentName, props: [] };

  return {
    name: componentName,
    props: extractFromTypeNode(propsType, symbol.sourceFile, resolver)
  };
}

function getComponentPropsType(declaration: ts.Declaration, sourceFile: ts.SourceFile): ts.TypeNode | undefined {
  if (ts.isFunctionDeclaration(declaration)) return declaration.parameters[0]?.type;

  if (!ts.isVariableDeclaration(declaration)) return undefined;

  if (
    declaration.type &&
    ts.isTypeReferenceNode(declaration.type) &&
    isNamedType(declaration.type, ['FC', 'FunctionComponent'])
  ) {
    return declaration.type.typeArguments?.[0];
  }

  const initializer = declaration.initializer;
  if (!initializer) return undefined;

  if (ts.isArrowFunction(initializer) || ts.isFunctionExpression(initializer)) {
    return initializer.parameters[0]?.type;
  }

  if (
    ts.isCallExpression(initializer) &&
    ts.isIdentifier(initializer.expression) &&
    initializer.expression.text === 'forwardRef'
  ) {
    return initializer.typeArguments?.[1];
  }

  if (ts.isCallExpression(initializer) && initializer.arguments.length > 1) {
    const functionArg = initializer.arguments.find((arg) => ts.isArrowFunction(arg) || ts.isFunctionExpression(arg));
    if (functionArg && (ts.isArrowFunction(functionArg) || ts.isFunctionExpression(functionArg))) {
      return functionArg.parameters[0]?.type;
    }
  }

  return undefined;
}

function isNamedType(typeNode: ts.TypeReferenceNode, names: string[]): boolean {
  return ts.isIdentifier(typeNode.typeName) && names.includes(typeNode.typeName.text);
}

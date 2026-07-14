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

  if (!declaration.initializer) return undefined;
  const initializer = unwrapExpression(declaration.initializer);

  if (ts.isArrowFunction(initializer) || ts.isFunctionExpression(initializer)) {
    return initializer.parameters[0]?.type;
  }

  if (
    ts.isCallExpression(initializer) &&
    ts.isIdentifier(initializer.expression) &&
    initializer.expression.text === 'forwardRef'
  ) {
    // Props are the second type arg, or the render fn's first parameter when omitted.
    return initializer.typeArguments?.[1] ?? getFunctionArgPropsType(initializer);
  }

  if (ts.isCallExpression(initializer) && initializer.arguments.length > 1) {
    return getFunctionArgPropsType(initializer);
  }

  return undefined;
}

/** Returns the props type from the first parameter of a call's function argument. */
function getFunctionArgPropsType(call: ts.CallExpression): ts.TypeNode | undefined {
  const functionArg = call.arguments.find((arg) => ts.isArrowFunction(arg) || ts.isFunctionExpression(arg));
  if (functionArg && (ts.isArrowFunction(functionArg) || ts.isFunctionExpression(functionArg))) {
    return functionArg.parameters[0]?.type;
  }
  return undefined;
}

/** Unwraps `as`, `satisfies`, type assertions, and parentheses to reach the inner expression. */
function unwrapExpression(expr: ts.Expression): ts.Expression {
  if (ts.isAsExpression(expr) || ts.isSatisfiesExpression(expr) || ts.isTypeAssertionExpression(expr)) {
    return unwrapExpression(expr.expression);
  }
  if (ts.isParenthesizedExpression(expr)) return unwrapExpression(expr.expression);
  return expr;
}

function isNamedType(typeNode: ts.TypeReferenceNode, names: string[]): boolean {
  return ts.isIdentifier(typeNode.typeName) && names.includes(typeNode.typeName.text);
}

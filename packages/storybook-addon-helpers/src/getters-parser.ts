import ts from 'typescript';
import fs from 'node:fs';
import camelCase from 'camelcase';
import { toLiteralValue } from './ats-utils';

export const GET_META = 'getMeta';
export const GET_STORY = 'getStory';
export const GET_VARIANTS = 'getVariants';
export const GET_COMPONENT_DOCS = 'getComponentDocs';
export const GET_INTERFACE_DOCS = 'getInterfaceDocs';

export function getExportedVariables(input: { filePath?: string; code?: string }) {
  const filePath = input.filePath ?? '';
  const code = input.filePath ? fs.readFileSync(input.filePath, 'utf8') : (input.code ?? '');

  const sourceFile = ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  const exported = new Map<string, any>();
  const locals = new Map<string, ts.VariableDeclaration>();

  // collect top-level const declarations
  sourceFile.forEachChild(function _forEachChild(node) {
    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (ts.isIdentifier(decl.name)) {
          locals.set(decl.name.text, decl);
        }
      }
    }
  });

  // iterate exports
  sourceFile.forEachChild(function _forEachChild(node) {
    // export const ...
    if (ts.isVariableStatement(node) && node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) {
      for (const decl of node.declarationList.declarations) {
        const varName = decl.name.getText();
        const initializer = decl.initializer;

        // Handle getVariants calls
        if (initializer && ts.isCallExpression(initializer)) {
          const callee = initializer.expression;
          if (ts.isIdentifier(callee) && callee.text === GET_VARIANTS) {
            const variants = initializer.arguments[1];

            // Extract variant names and add them as separate exports
            if (variants && ts.isObjectLiteralExpression(variants)) {
              const variantNames = extractVariantNames(varName, variants);
              for (const variantName of variantNames) {
                exported.set(variantName, {});
              }
            }

            continue;
          }
        }

        // Handle other calls (getMeta, getComponentDocs, etc.)
        const unwrappedInit = initializer ? unwrapInitializer(initializer) : undefined;

        if (unwrappedInit && ts.isObjectLiteralExpression(unwrappedInit)) {
          exported.set(varName, toLiteralValue(unwrappedInit));
        } else {
          exported.set(varName, {});
        }
      }
    }

    // export default ...
    if (ts.isExportAssignment(node)) {
      const unwrappedInit = unwrapInitializer(node.expression);

      if (ts.isObjectLiteralExpression(unwrappedInit)) {
        exported.set('default', toLiteralValue(unwrappedInit));
        return;
      }

      if (ts.isIdentifier(unwrappedInit)) {
        const decl = locals.get(unwrappedInit.text);

        if (!decl?.initializer) return;

        const init = unwrapInitializer(decl.initializer);

        if (init && ts.isObjectLiteralExpression(init)) {
          exported.set('default', toLiteralValue(init));
        }
      }
    }
  });

  return exported;
}

/**
 * Extracts variant names from a getVariants call expression
 */
export function extractVariantNames(baseName: string, variants: ts.ObjectLiteralExpression): string[] {
  const variantNames: string[] = [];

  for (const p of variants.properties) {
    const key = (p.name as ts.Identifier).text;

    const exportName = camelCase([baseName, key], { pascalCase: true });
    variantNames.push(exportName);
  }

  return variantNames;
}

/**
 * Unwraps an initializer especially if functions such as getMeta, getComponentDocs are used
 */
function unwrapInitializer(expr: ts.Expression): ts.Expression {
  if (ts.isSatisfiesExpression(expr) || ts.isAsExpression(expr) || ts.isTypeAssertionExpression(expr))
    return unwrapInitializer(expr.expression);

  if (!ts.isCallExpression(expr)) return expr;

  const callee = expr.expression;
  const isCallee = ts.isIdentifier(callee);

  if (isCallee && callee.text === GET_META && expr.arguments.length === 1) {
    return unwrapInitializer(expr.arguments[0]);
  }

  if (isCallee && (callee.text === GET_COMPONENT_DOCS || callee.text === GET_INTERFACE_DOCS)) {
    return ts.factory.createObjectLiteralExpression([
      ts.factory.createPropertyAssignment(
        'tags',
        ts.factory.createArrayLiteralExpression([ts.factory.createStringLiteral('!dev')])
      )
    ]);
  }

  return expr;
}

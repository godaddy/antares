import ts from 'typescript';
import { readFile } from 'node:fs/promises';
import camelCase from 'camelcase';
import { toLiteralValue } from './ats-utils.ts';

export const GET_META = 'getMeta';
export const GET_STORY = 'getStory';
export const GET_VARIANTS = 'getVariants';
export const GET_COMPONENT_DOCS = 'getComponentDocs';
export const GET_INTERFACE_DOCS = 'getInterfaceDocs';

/**
 * Extract exported variables from a TypeScript file
 *
 * @param input - The input file path or code string
 * @returns Promise resolving to Map of exported variable names and their values
 */
export async function getExportedVariables(input: { filePath?: string; code?: string }) {
  const filePath = input.filePath ?? '';
  const code = input.filePath ? await readFile(input.filePath, 'utf8') : (input.code ?? '');

  const sourceFile = ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  /* v8 ignore start - V8 coverage bug: marking Map constructor as not covered */
  const exported = new Map();
  const locals = new Map();
  /* v8 ignore stop */

  sourceFile.forEachChild(function collectLocals(node) {
    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        locals.set(decl.name.getText(), decl);
      }
    }
  });

  sourceFile.forEachChild(function collectExports(node) {
    if (ts.isVariableStatement(node) && node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) {
      for (const decl of node.declarationList.declarations) {
        const varName = decl.name.getText();
        const initializer = decl.initializer;

        if (initializer && ts.isCallExpression(initializer)) {
          const callee = initializer.expression;
          if (ts.isIdentifier(callee) && callee.text === GET_VARIANTS) {
            const variants = initializer.arguments[1];

            if (variants && ts.isObjectLiteralExpression(variants)) {
              for (const variantName of extractVariantNames(varName, variants)) {
                exported.set(variantName, {});
              }
            }

            continue;
          }
        }

        const unwrappedInit = initializer ? unwrapInitializer(initializer) : undefined;

        if (unwrappedInit && ts.isObjectLiteralExpression(unwrappedInit)) {
          exported.set(varName, toLiteralValue(unwrappedInit));
        } else {
          exported.set(varName, {});
        }
      }
    }

    if (ts.isExportAssignment(node)) {
      const unwrappedInit = unwrapInitializer(node.expression);

      if (ts.isObjectLiteralExpression(unwrappedInit)) {
        exported.set('default', toLiteralValue(unwrappedInit));
        return;
      }

      const decl = locals.get(unwrappedInit.getText());

      if (!decl?.initializer) return;

      const init = unwrapInitializer(decl.initializer);

      exported.set('default', toLiteralValue(init));
    }
  });

  return exported;
}

/**
 * Extracts variant names from a getVariants call expression
 */
export function extractVariantNames(baseName: string, variants: ts.ObjectLiteralExpression): string[] {
  return variants.properties.map((p) => camelCase([baseName, (p.name as ts.Identifier).text], { pascalCase: true }));
}

/**
 * Unwraps an initializer especially if functions such as getMeta, getComponentDocs are used
 *
 * @returns The unwrapped expression
 */
function unwrapInitializer(expr: ts.Expression): ts.Expression {
  if (ts.isSatisfiesExpression(expr) || ts.isAsExpression(expr) || ts.isTypeAssertionExpression(expr))
    return unwrapInitializer(expr.expression);

  if (!ts.isCallExpression(expr)) return expr;
  if (!ts.isIdentifier(expr.expression)) return expr;

  const callee = expr.expression.text;

  if (callee === GET_META && expr.arguments.length === 1) return unwrapInitializer(expr.arguments[0]);

  if (callee === GET_COMPONENT_DOCS || callee === GET_INTERFACE_DOCS) {
    return ts.factory.createObjectLiteralExpression([
      ts.factory.createPropertyAssignment(
        'tags',
        ts.factory.createArrayLiteralExpression([ts.factory.createStringLiteral('!dev')])
      )
    ]);
  }

  return expr;
}

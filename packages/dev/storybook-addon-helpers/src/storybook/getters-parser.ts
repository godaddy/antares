import * as ts from 'typescript/unstable/ast';
import { openTypeScriptSession } from '../engine/typescript-session.ts';
import * as factory from 'typescript/unstable/ast/factory';
import { readFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import camelCase from 'camelcase';
import { toLiteralValue } from '../engine/literal.ts';
import { discoverExamples } from '../examples.ts';
import { GET_COMPONENT_DOCS, GET_EXAMPLES, GET_META, GET_TYPE_DOCS, GET_VARIANTS } from '../getter-names.ts';

/**
 * Extract exported variables from a TypeScript file
 *
 * @param input - The input file path or code string
 * @returns Promise resolving to Map of exported variable names and their values
 */
export async function getExportedVariables(input: { filePath?: string; code?: string }) {
  const filePath = input.filePath ?? '';
  const code = input.filePath ? await readFile(input.filePath, 'utf8') : (input.code ?? '');

  const session = openTypeScriptSession({ fileName: filePath || 'inline.tsx', code, isolated: true });
  try {
    const sourceFile = session.sourceFile;

    /* v8 ignore start - V8 coverage bug: marking Map constructor as not covered */
    const exported = new Map();
    const locals = new Map();
    /* v8 ignore stop */

    let examplesArg: string | undefined;
    let hasExamples = false;

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
                const variantNames = extractVariantNames(varName, variants);
                for (let i = 0; i < variants.properties.length; i++) {
                  if (ts.isPropertyAssignment(variants.properties[i])) {
                    exported.set(variantNames[i], {});
                  }
                }
              }

              continue;
            }

            if (ts.isIdentifier(callee) && callee.text === GET_EXAMPLES) {
              hasExamples = true;
              const arg = initializer.arguments[0];
              if (arg && ts.isStringLiteral(arg)) examplesArg = arg.text;
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

    session.close();

    if (hasExamples && input.filePath) {
      const descriptors = await discoverExamples({ dir: dirname(input.filePath), examplesDir: examplesArg });
      for (const descriptor of descriptors) {
        exported.set(descriptor.storyName, {});
      }
    }

    return exported;
  } finally {
    session.close();
  }
}

/**
 * Extracts variant names from a getVariants call expression
 */
export function extractVariantNames(baseName: string, variants: ts.ObjectLiteralExpression): string[] {
  return variants.properties.map((p) =>
    camelCase([baseName, 'name' in p && p.name ? (p.name as ts.Identifier).text : ''], { pascalCase: true })
  );
}

/**
 * Unwraps an initializer especially if functions such as getMeta, getComponentDocs are used
 *
 * @returns The unwrapped expression
 */
function unwrapInitializer(expr: ts.Expression): ts.Expression {
  if (ts.isSatisfiesExpression(expr) || ts.isAsExpression(expr) || ts.isTypeAssertion(expr))
    return unwrapInitializer(expr.expression);

  if (!ts.isCallExpression(expr)) return expr;
  if (!ts.isIdentifier(expr.expression)) return expr;

  const callee = expr.expression.text;

  if (callee === GET_META && expr.arguments.length === 1) return unwrapInitializer(expr.arguments[0]);

  if (callee === GET_COMPONENT_DOCS || callee === GET_TYPE_DOCS) {
    return factory.createObjectLiteralExpression([
      factory.createPropertyAssignment(
        undefined,
        factory.createIdentifier('tags'),
        undefined,
        undefined!,
        factory.createArrayLiteralExpression([factory.createStringLiteral('!dev', ts.TokenFlags.None)])
      )
    ]);
  }

  return expr;
}

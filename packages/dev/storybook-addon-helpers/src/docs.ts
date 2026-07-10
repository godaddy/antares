import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import { extractComponentDocs } from './engine/component-type.ts';
import { extractTypeDocs } from './engine/extract.ts';
import { createResolver, type Resolver } from './engine/resolve.ts';
import { mergeDocsOptions, processPropsDoc } from './process.ts';
import { GET_COMPONENT_DOCS, GET_TYPE_DOCS } from './storybook/getters-parser.ts';
import { toLiteralValue } from './storybook/literal.ts';
import type { DocsDefaults, DocsOptions, PropsDoc } from './types.ts';

export { toFumadocsPropTable } from './adapters/fumadocs.ts';
export type { FumadocsPropEntry, FumadocsPropTable } from './adapters/fumadocs.ts';
export type * from './types.ts';

/** Reads the docs-options object literal at `argIndex` of a getter call. */
function getDocsOptions(node: ts.CallExpression, argIndex: number): DocsOptions<Record<string, unknown>> {
  const argument = node.arguments[argIndex];
  if (!argument || !ts.isObjectLiteralExpression(argument)) return {};
  return toLiteralValue(argument) as DocsOptions<Record<string, unknown>>;
}

/** Unwraps `satisfies`/`as`/type-assertion wrappers to reach the inner expression. */
function unwrap(expr: ts.Expression): ts.Expression {
  if (ts.isSatisfiesExpression(expr) || ts.isAsExpression(expr) || ts.isTypeAssertionExpression(expr)) {
    return unwrap(expr.expression);
  }
  return expr;
}

/**
 * Produces a processed neutral `PropsDoc` from a `getComponentDocs`/`getTypeDocs`
 * call node. Shared by the Storybook CSF transformer and the docs-site resolver,
 * so both targets extract and process identically - only the adapter differs.
 *
 * @returns the processed doc, or `undefined` if the node is not a docs getter.
 */
export function docFromCall(
  node: ts.CallExpression,
  sourceFile: ts.SourceFile,
  resolver: Resolver = createResolver(sourceFile.fileName || 'inline.tsx'),
  defaults?: DocsDefaults
): PropsDoc | undefined {
  if (!ts.isIdentifier(node.expression)) return undefined;
  const callee = node.expression.text;

  if (callee === GET_COMPONENT_DOCS && ts.isIdentifier(node.arguments[0])) {
    const rawDoc = extractComponentDocs(node.arguments[0].text, sourceFile, resolver);
    return processPropsDoc(rawDoc, mergeDocsOptions(defaults, getDocsOptions(node, 1)));
  }

  if (callee === GET_TYPE_DOCS && node.typeArguments?.length === 1) {
    const typeArg = node.typeArguments[0];
    if (!ts.isTypeReferenceNode(typeArg) || !ts.isIdentifier(typeArg.typeName)) return undefined;
    const rawDoc = extractTypeDocs(typeArg.typeName.text, sourceFile, resolver);
    return processPropsDoc(rawDoc, mergeDocsOptions(defaults, getDocsOptions(node, 0)));
  }

  return undefined;
}

/**
 * Resolves the processed `PropsDoc` for a named export of a stories file. The
 * export must be `export const <exportName> = getComponentDocs(...)` or
 * `getTypeDocs<...>(...)`.
 *
 * @returns the processed doc, or `undefined` if the export is missing or is not
 * a docs getter.
 */
export async function resolvePropsDoc(input: {
  filePath?: string;
  code?: string;
  exportName: string;
  defaults?: DocsDefaults;
}): Promise<PropsDoc | undefined> {
  const filePath = input.filePath ?? '';
  const code = input.filePath ? await readFile(input.filePath, 'utf8') : (input.code ?? '');
  const sourceFile = ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  let callNode: ts.CallExpression | undefined;

  sourceFile.forEachChild(function findExport(statement) {
    if (callNode || !ts.isVariableStatement(statement)) return;
    if (!statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) return;

    for (const declaration of statement.declarationList.declarations) {
      if (declaration.name.getText(sourceFile) !== input.exportName || !declaration.initializer) continue;
      const initializer = unwrap(declaration.initializer);
      if (ts.isCallExpression(initializer)) callNode = initializer;
    }
  });

  if (!callNode) return undefined;
  return docFromCall(callNode, sourceFile, undefined, input.defaults);
}

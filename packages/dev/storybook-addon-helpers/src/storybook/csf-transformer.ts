import ts from 'typescript';
import { readFile } from 'node:fs/promises';
import {
  extractVariantNames,
  GET_COMPONENT_DOCS,
  GET_META,
  GET_STORY,
  GET_TYPE_DOCS,
  GET_VARIANTS
} from './getters-parser.ts';
import { toStorybookArgTypes } from '../adapters/storybook.ts';
import { extractComponentDocs } from '../engine/component-type.ts';
import { extractTypeDocs } from '../engine/extract.ts';
import { createResolver } from '../engine/resolve.ts';
import { toLiteralValue, toTsExpression } from './literal.ts';
import { processPropsDoc } from '../process.ts';
import type { DocsOptions } from '../types.ts';

const RENDER_STR = 'render';
const factory = ts.factory;

type TransformerFn = (node: ts.Node, sourceFile: ts.SourceFile) => ts.VisitResult<ts.Node> | undefined;

/**
 * Applies transformers to a CSF file or code and outputs the transformed CSF code.
 *
 * @param input - The input to transform. Can be a file path or a code string.
 * @returns Promise resolving to the transformed CSF file.
 */
export async function csfTransformer(input: { filePath?: string; code?: string }): Promise<string> {
  const filePath = input.filePath ?? '';
  const code = input.filePath ? await readFile(input.filePath, 'utf8') : (input.code ?? '');
  const sourceFile = ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  const result = ts.transform(sourceFile, [
    applyTransformers([
      transformGetMeta,
      transformGetStory,
      transformGetVariants,
      transformGetComponentDocs,
      transformGetTypeDocs
    ])
  ]);
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  return printer.printFile(result.transformed[0] as ts.SourceFile);
}

/**
 * Transforms the getMeta function to return the meta object.
 * @param node - The node to transform.
 * @returns The transformed node.
 *
 * @example
 * ```ts
 * const meta = getMeta({ title: 'meta1' });
 *
 * // transformed to:
 * const meta = { title: 'meta1' };
 * ```
 */
function transformGetMeta(node: ts.Node) {
  if (!isCallTo(node, GET_META) || node.arguments.length !== 1) return;
  return node.arguments[0];
}

/**
 * Transforms the getStory function to return the story object.
 * @param node - The node to transform.
 * @returns The transformed node.
 *
 * @example
 * ```ts
 * export const Button = getStory(Button, {
 *   args: { children: 'mundo' }
 * });
 *
 * // transformed to:
 * export const Button = {
 *   args: { children: 'mundo' },
 *   render: (args) => <Button {...args} />
 * };
 * ```
 */
function transformGetStory(node: ts.Node) {
  if (!isCallTo(node, GET_STORY) || node.arguments.length < 1) return;

  const component = node.arguments[0];
  const storyObj = node.arguments[1];
  const isValidObj = storyObj && ts.isObjectLiteralExpression(storyObj);
  const renderFn = createRenderFunction(factory, component);

  if (isValidObj) return upsertObjectProp(storyObj, RENDER_STR, renderFn);

  return factory.createObjectLiteralExpression([factory.createPropertyAssignment(RENDER_STR, renderFn)], true);
}

/**
 * Transforms the getVariants function to return the variant story objects.
 * @param node - The node to transform.
 * @returns The transformed node.
 *
 * @example
 * ```ts
 * export const ButtonVariants = getVariants(Button, {
 *   primary: { args: { variant: 'primary' } },
 *   secondary: { args: { variant: 'secondary' } },
 *   loading: { args: { isLoading: true } },
 * });
 *
 * // transformed to:
 * export const ButtonVariantsPrimary = { ... };
 * export const ButtonVariantsSecondary = { ... };
 * export const ButtonVariantsLoading = { ... };
 * ```
 */
function transformGetVariants(node: ts.Node) {
  if (!ts.isVariableStatement(node)) return;

  const decl = node.declarationList.declarations[0];
  const init = decl?.initializer;

  if (!init || !isCallTo(init, GET_VARIANTS)) return;

  const component = init.arguments[0];
  const variants = init.arguments[1];

  if (!ts.isObjectLiteralExpression(variants) || variants.properties.length === 0 || !ts.isIdentifier(decl.name))
    return;

  const baseName = decl.name.text;
  const renderFn = createRenderFunction(factory, component);
  const variantNames = extractVariantNames(baseName, variants);
  const out: ts.Statement[] = [];

  for (let i = 0; i < variants.properties.length; i++) {
    const p = variants.properties[i];
    if (!ts.isPropertyAssignment(p)) continue;

    const exportName = variantNames[i];

    const variantInitializer = upsertObjectProp(p.initializer as ts.ObjectLiteralExpression, RENDER_STR, renderFn);

    out.push(
      factory.createVariableStatement(
        [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        factory.createVariableDeclarationList(
          [factory.createVariableDeclaration(exportName, undefined, undefined, variantInitializer)],
          ts.NodeFlags.Const
        )
      )
    );
  }

  return out;
}

/**
 * Reads the docs options object literal from a getter call argument.
 *
 * @param node - The getter call expression.
 * @param index - The argument index of the options object literal.
 * @returns The parsed docs options, or an empty object when absent.
 */
function getDocsOptions(node: ts.CallExpression, index: number): DocsOptions<Record<string, unknown>> {
  const argument = node.arguments[index];
  if (!argument || !ts.isObjectLiteralExpression(argument)) return {};
  return toLiteralValue(argument) as DocsOptions<Record<string, unknown>>;
}

/**
 * Transforms the getComponentDocs function to return the
 * component docs story object.
 * @param node - The node to transform.
 * @returns The transformed node.
 *
 * @example
 * ```ts
 * export const ButtonDocs = getComponentDocs(Button, { include: ['onClick'] });
 *
 * // transformed to:
 * export const ButtonDocs = { tags: ['!dev'], argTypes: { ... } };
 * ```
 */
function transformGetComponentDocs(node: ts.Node, sourceFile: ts.SourceFile) {
  if (!isCallTo(node, GET_COMPONENT_DOCS) || !ts.isIdentifier(node.arguments[0])) return;

  const resolver = createResolver(sourceFile.fileName || 'inline.tsx');
  const componentName = node.arguments[0].text;
  const rawDoc = extractComponentDocs(componentName, sourceFile, resolver);
  const processedDoc = processPropsDoc(rawDoc, getDocsOptions(node, 1));

  return toTsExpression(toStorybookArgTypes(processedDoc));
}

/**
 * Transforms the getTypeDocs function to return the
 * type docs story object.
 * @param node - The node to transform.
 * @returns The transformed node.
 *
 * @example
 * ```ts
 * import { type ButtonProps } from './button.tsx';
 * export const ButtonDocs = getTypeDocs<ButtonProps>({ include: ['onClick'] });
 *
 * // transformed to:
 * export const ButtonDocs = { tags: ['!dev'], argTypes: { ... } };
 * ```
 */
function transformGetTypeDocs(node: ts.Node, sourceFile: ts.SourceFile): ts.Expression | undefined {
  if (!isCallTo(node, GET_TYPE_DOCS) || node.typeArguments?.length !== 1) return;

  const typeArg = node.typeArguments[0];
  if (!ts.isTypeReferenceNode(typeArg) || !ts.isIdentifier(typeArg.typeName)) return;

  const resolver = createResolver(sourceFile.fileName || 'inline.tsx');
  const rawDoc = extractTypeDocs(typeArg.typeName.text, sourceFile, resolver);
  const processedDoc = processPropsDoc(rawDoc, getDocsOptions(node, 0));

  return toTsExpression(toStorybookArgTypes(processedDoc));
}

/**
 * Applies transformers to a CSF file or code and outputs the transformed CSF code.
 *
 * @param transformers - The transformers to apply.
 * @returns The transformed CSF file.
 */
function applyTransformers(transformers: TransformerFn[]): ts.TransformerFactory<ts.SourceFile> {
  return function _transformer(context) {
    return function _visit(sourceFile: ts.SourceFile): ts.SourceFile {
      function visit(node: ts.Node): ts.VisitResult<ts.Node> {
        for (const transformer of transformers) {
          const result = transformer(node, sourceFile);
          if (result) return result;
        }
        return ts.visitEachChild(node, visit, context);
      }
      return ts.visitNode(sourceFile, visit) as ts.SourceFile;
    };
  };
}

/**
 * Checks if the node is a call expression to the given callee name.
 * @returns True if the node is a call expression to the given callee name, otherwise false.
 */
function isCallTo(node: ts.Node, calleeName: string): node is ts.CallExpression {
  return ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === calleeName;
}

/**
 * Checks if the object literal expression has the given property.
 * @returns True if the object literal expression has the given property, otherwise false.
 */
function objectHasProp(obj: ts.ObjectLiteralExpression, propName: string): boolean {
  return obj.properties.some((p) => ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === propName);
}

/**
 * Upserts a property into an object literal expression.
 * @returns The object literal expression with the property upserted.
 */
function upsertObjectProp(
  obj: ts.ObjectLiteralExpression,
  propName: string,
  valueExpr: ts.Expression
): ts.ObjectLiteralExpression {
  if (objectHasProp(obj, propName)) return obj;
  return ts.factory.createObjectLiteralExpression(
    [...obj.properties, ts.factory.createPropertyAssignment(propName, valueExpr)],
    true
  );
}

/**
 * Creates a render function: args => <Component {...args} />
 */
function createRenderFunction(factory: ts.NodeFactory, component: ts.Expression): ts.ArrowFunction {
  return factory.createArrowFunction(
    undefined,
    undefined,
    [factory.createParameterDeclaration(undefined, undefined, 'args')],
    undefined,
    factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
    factory.createJsxSelfClosingElement(
      component as ts.JsxTagNameExpression,
      undefined,
      factory.createJsxAttributes([factory.createJsxSpreadAttribute(factory.createIdentifier('args'))])
    )
  );
}

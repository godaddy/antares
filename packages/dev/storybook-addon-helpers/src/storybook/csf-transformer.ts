import ts from 'typescript';
import { readFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { extractVariantNames } from './getters-parser.ts';
import { GET_COMPONENT_DOCS, GET_EXAMPLES, GET_META, GET_STORY, GET_TYPE_DOCS, GET_VARIANTS } from '../getter-names.ts';
import { toStorybookArgTypes } from './arg-types.ts';
import { docFromCall } from '../docs.ts';
import { discoverExamples, type ExampleDescriptor } from '../examples.ts';
import { toTsExpression } from '../engine/literal.ts';
import type { DocsDefaults } from '../types.ts';

const RENDER_STR = 'render';
const factory = ts.factory;

type TransformerFn = (
  node: ts.Node,
  sourceFile: ts.SourceFile,
  defaults?: DocsDefaults
) => ts.VisitResult<ts.Node> | undefined;

/**
 * Applies transformers to a CSF file or code and outputs the transformed CSF code.
 *
 * @param input - The input to transform. Can be a file path or a code string.
 * @returns Promise resolving to the transformed CSF file.
 */
export async function csfTransformer(input: {
  filePath?: string;
  code?: string;
  defaults?: DocsDefaults;
}): Promise<string> {
  const filePath = input.filePath ?? '';
  const code = input.filePath ? await readFile(input.filePath, 'utf8') : (input.code ?? '');
  const sourceFile = ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  const examples = await scanExamples(filePath, code);

  const result = ts.transform(sourceFile, [
    applyTransformers(
      [transformGetMeta, transformGetStory, transformGetVariants, transformGetComponentDocs, transformGetTypeDocs],
      input.defaults
    ),
    transformExamples(examples),
    pruneUnusedImports(),
    assertNoStoryCollisions(examples, filePath)
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
 * Discovers the examples referenced by an `export const examples = getExamples(...)`
 * statement, reading the optional folder-override argument. Returns an empty list
 * when the file has no such statement or was transformed from an inline string
 * (no `filePath` to resolve the `examples/` folder against).
 */
async function scanExamples(filePath: string, code: string): Promise<ExampleDescriptor[]> {
  if (!filePath || !code.includes(GET_EXAMPLES)) return [];

  const sourceFile = ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  let examplesDir: string | undefined;
  let present = false;

  sourceFile.forEachChild(function find(statement) {
    if (present) return;
    const call = getExamplesGetterCall(statement);
    if (!call) return;
    present = true;
    const arg = call.arguments[0];
    if (arg && ts.isStringLiteral(arg)) examplesDir = arg.text;
  });

  if (!present) return [];

  return discoverExamples({ dir: dirname(filePath), examplesDir });
}

/**
 * Returns the `getExamples(...)` call of an `export const <name> = getExamples(...)`
 * statement, or `undefined` for any other statement.
 */
function getExamplesGetterCall(statement: ts.Node): ts.CallExpression | undefined {
  if (!ts.isVariableStatement(statement)) return;
  if (!statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) return;
  const init = statement.declarationList.declarations[0]?.initializer;
  if (init && isCallTo(init, GET_EXAMPLES)) return init;
  return undefined;
}

/**
 * SourceFile transformer that replaces the `getExamples(...)` statement with one
 * exported story per discovered example (`export const Primary = PrimaryExample`)
 * and prepends the matching example-component imports.
 *
 * @example
 * ```ts
 * export const examples = getExamples();
 *
 * // transformed to:
 * import { PrimaryExample } from './examples/primary.tsx';
 * export const Primary = PrimaryExample;
 * ```
 */
function transformExamples(examples: ExampleDescriptor[]): ts.TransformerFactory<ts.SourceFile> {
  return function _transformer() {
    return function _visit(sourceFile: ts.SourceFile): ts.SourceFile {
      // Nothing resolved (no file path, or an empty folder): leave the call in place
      // rather than dropping the declaration and emitting nothing in its stead.
      if (examples.length === 0) return sourceFile;

      let found = false;
      const body: ts.Statement[] = [];

      for (const statement of sourceFile.statements) {
        if (getExamplesGetterCall(statement)) {
          found = true;
          for (const example of examples) {
            body.push(createStoryExport(example.storyName, example.componentExportName));
          }
        } else {
          body.push(statement);
        }
      }

      if (!found) return sourceFile;

      const imports = examples.map((example) => createNamedImport(example.componentExportName, example.importPath));
      return factory.updateSourceFile(sourceFile, [...imports, ...body]);
    };
  };
}

/**
 * Fails the build when a generated example story is named after a binding the file
 * still declares, which would emit two top-level declarations of that name.
 *
 * Pruning clears the common case, where the binding existed only to feed a getter.
 * It cannot clear a binding that survives on its own merits - `getMeta({ component })`
 * keeps its reference - so the remaining overlap is reported instead of emitted.
 */
function assertNoStoryCollisions(
  examples: ExampleDescriptor[],
  filePath: string
): ts.TransformerFactory<ts.SourceFile> {
  return function _transformer() {
    return function _visit(sourceFile: ts.SourceFile): ts.SourceFile {
      if (examples.length === 0) return sourceFile;

      const where = filePath || 'stories file';
      const byStoryName = new Map(examples.map((example) => [example.storyName, example]));

      for (const statement of sourceFile.statements) {
        if (isGeneratedStory(statement, byStoryName)) continue;

        for (const [name, origin] of declaredNames(statement)) {
          const example = byStoryName.get(name);
          if (!example) continue;

          throw new Error(
            `${where}: the "${example.storyName}" story generated from ` +
              `${example.importPath} collides with the \`${name}\` ${origin} in this file. ` +
              `Rename the example file or the colliding binding.`
          );
        }
      }

      return sourceFile;
    };
  };
}

/** Whether the statement is the `export const <storyName> = <ExampleName>` a story generated. */
function isGeneratedStory(statement: ts.Statement, byStoryName: Map<string, ExampleDescriptor>): boolean {
  if (!ts.isVariableStatement(statement) || statement.declarationList.declarations.length !== 1) return false;

  const declaration = statement.declarationList.declarations[0];
  if (!ts.isIdentifier(declaration.name)) return false;

  const example = byStoryName.get(declaration.name.text);
  if (!example) return false;

  return Boolean(
    declaration.initializer &&
      ts.isIdentifier(declaration.initializer) &&
      declaration.initializer.text === example.componentExportName
  );
}

/** The top-level bindings a statement introduces, each with a phrase describing it. */
function declaredNames(statement: ts.Statement): [name: string, origin: string][] {
  if (ts.isImportDeclaration(statement)) {
    const clause = statement.importClause;
    if (!clause) return [];

    // Not `getText()`: the example imports are synthesized and have no source position.
    const specifier = ts.isStringLiteral(statement.moduleSpecifier) ? statement.moduleSpecifier.text : 'another module';
    const origin = `import from '${specifier}'`;
    const names = clause.name ? [clause.name.text] : [];
    const bindings = clause.namedBindings;

    if (bindings && ts.isNamespaceImport(bindings)) names.push(bindings.name.text);
    if (bindings && ts.isNamedImports(bindings)) names.push(...bindings.elements.map((el) => el.name.text));

    return names.map((name) => [name, origin]);
  }

  if (ts.isVariableStatement(statement)) {
    return statement.declarationList.declarations.flatMap((declaration) =>
      bindingIdentifiers(declaration.name).map((name) => [name, 'declaration'] as [string, string])
    );
  }

  if ((ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement)) && statement.name) {
    return [[statement.name.text, 'declaration']];
  }

  return [];
}

/** Every identifier a binding name introduces, destructuring patterns included. */
function bindingIdentifiers(name: ts.BindingName): string[] {
  if (ts.isIdentifier(name)) return [name.text];
  return name.elements.flatMap((element) => (ts.isBindingElement(element) ? bindingIdentifiers(element.name) : []));
}

/**
 * Drops named import specifiers the transformed output no longer references.
 *
 * The getters compile down to literals, so they and any component imported only to
 * feed them are dead by this point. A leftover binding also collides with the story
 * export an example of the same name produces.
 *
 * Default, namespace, side-effect and type-only imports are left untouched.
 */
function pruneUnusedImports(): ts.TransformerFactory<ts.SourceFile> {
  return function _transformer() {
    return function _visit(sourceFile: ts.SourceFile): ts.SourceFile {
      const references = collectValueReferences(
        sourceFile.statements.filter((statement) => !ts.isImportDeclaration(statement))
      );

      let changed = false;
      const statements: ts.Statement[] = [];

      for (const statement of sourceFile.statements) {
        if (!ts.isImportDeclaration(statement)) {
          statements.push(statement);
          continue;
        }

        const clause = statement.importClause;
        const pruned =
          clause && clause.phaseModifier === undefined ? keepReferencedBindings(clause, references) : clause;
        if (pruned === clause) {
          statements.push(statement);
          continue;
        }

        changed = true;
        if (pruned) {
          statements.push(
            factory.updateImportDeclaration(
              statement,
              statement.modifiers,
              pruned,
              statement.moduleSpecifier,
              statement.attributes
            )
          );
        }
      }

      return changed ? factory.updateSourceFile(sourceFile, statements) : sourceFile;
    };
  };
}

/**
 * Narrows an import clause to the bindings still referenced. Returns the clause
 * unchanged when nothing is dead, `undefined` when the whole import is.
 */
function keepReferencedBindings(clause: ts.ImportClause, references: Set<string>): ts.ImportClause | undefined {
  const bindings = clause.namedBindings;
  if (!bindings || ts.isNamespaceImport(bindings)) return clause;

  const kept = bindings.elements.filter((element) => references.has(element.name.text));
  if (kept.length === bindings.elements.length) return clause;
  if (kept.length === 0 && !clause.name) return undefined;

  return factory.updateImportClause(
    clause,
    clause.phaseModifier,
    clause.name,
    kept.length > 0 ? factory.createNamedImports(kept) : undefined
  );
}

/** Collects the identifiers the statements reference, ignoring names that only declare or label. */
function collectValueReferences(statements: readonly ts.Statement[]): Set<string> {
  const references = new Set<string>();

  function visit(node: ts.Node): void {
    if (ts.isIdentifier(node)) {
      references.add(node.text);
      return;
    }

    if (ts.isPropertyAccessExpression(node)) {
      visit(node.expression);
      return;
    }

    const name = nonReferenceName(node);
    ts.forEachChild(node, function visitReference(child) {
      if (child !== name) visit(child);
    });
  }

  statements.forEach(visit);
  return references;
}

/**
 * The child of `node` that names rather than references a binding: an object or JSX
 * key, or the identifier a declaration introduces. Anything else, including computed
 * keys and destructuring patterns, is treated as a reference so imports are kept.
 */
function nonReferenceName(node: ts.Node): ts.Node | undefined {
  if (ts.isPropertyAssignment(node) || ts.isJsxAttribute(node)) {
    return ts.isComputedPropertyName(node.name) ? undefined : node.name;
  }

  const declaresName =
    ts.isVariableDeclaration(node) ||
    ts.isParameter(node) ||
    ts.isBindingElement(node) ||
    ts.isFunctionDeclaration(node) ||
    ts.isFunctionExpression(node) ||
    ts.isClassDeclaration(node) ||
    ts.isMethodDeclaration(node) ||
    ts.isPropertyDeclaration(node) ||
    ts.isInterfaceDeclaration(node) ||
    ts.isTypeAliasDeclaration(node) ||
    ts.isEnumDeclaration(node);

  return declaresName && node.name && ts.isIdentifier(node.name) ? node.name : undefined;
}

/** Builds `import { <name> } from '<modulePath>';` */
function createNamedImport(name: string, modulePath: string): ts.ImportDeclaration {
  return factory.createImportDeclaration(
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamedImports([factory.createImportSpecifier(false, undefined, factory.createIdentifier(name))])
    ),
    factory.createStringLiteral(modulePath)
  );
}

/** Builds `export const <storyName> = <componentName>;` */
function createStoryExport(storyName: string, componentName: string): ts.VariableStatement {
  return factory.createVariableStatement(
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [factory.createVariableDeclaration(storyName, undefined, undefined, factory.createIdentifier(componentName))],
      ts.NodeFlags.Const
    )
  );
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
function transformGetComponentDocs(node: ts.Node, sourceFile: ts.SourceFile, defaults?: DocsDefaults) {
  if (!isCallTo(node, GET_COMPONENT_DOCS) || !ts.isIdentifier(node.arguments[0])) return;

  const doc = docFromCall(node, sourceFile, undefined, defaults);
  if (!doc) return;

  return toTsExpression(toStorybookArgTypes(doc));
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
function transformGetTypeDocs(
  node: ts.Node,
  sourceFile: ts.SourceFile,
  defaults?: DocsDefaults
): ts.Expression | undefined {
  if (!isCallTo(node, GET_TYPE_DOCS) || node.typeArguments?.length !== 1) return;

  const doc = docFromCall(node, sourceFile, undefined, defaults);
  if (!doc) return;

  return toTsExpression(toStorybookArgTypes(doc));
}

/**
 * Applies transformers to a CSF file or code and outputs the transformed CSF code.
 *
 * @param transformers - The transformers to apply.
 * @returns The transformed CSF file.
 */
function applyTransformers(
  transformers: TransformerFn[],
  defaults?: DocsDefaults
): ts.TransformerFactory<ts.SourceFile> {
  return function _transformer(context) {
    return function _visit(sourceFile: ts.SourceFile): ts.SourceFile {
      function visit(node: ts.Node): ts.VisitResult<ts.Node> {
        for (const transformer of transformers) {
          const result = transformer(node, sourceFile, defaults);
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

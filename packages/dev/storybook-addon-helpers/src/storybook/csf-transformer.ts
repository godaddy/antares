import * as ts from 'typescript/unstable/ast';
import { createResolver, type Resolver } from '../engine/resolve.ts';
import { openTypeScriptSession } from '../engine/typescript-session.ts';
import * as factory from 'typescript/unstable/ast/factory';
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

type TransformerFn = (
  node: ts.Node,
  sourceFile: ts.SourceFile,
  defaults: DocsDefaults | undefined,
  resolver: Resolver
) => ts.Node | undefined;

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
  const examples = await scanExamples(filePath, code);
  const resolver = createResolver(filePath || 'inline.tsx', code, {
    isolated: !code.includes(GET_COMPONENT_DOCS) && !code.includes(GET_TYPE_DOCS)
  });
  try {
    const sourceFile = resolver.getSourceFile(filePath || 'inline.tsx');
    const statements = applyTransformers(
      sourceFile,
      [transformGetMeta, transformGetStory, transformGetComponentDocs, transformGetTypeDocs],
      resolver,
      input.defaults
    );
    const expanded = transformExamples(statements, examples, filePath);
    const pruned = pruneUnusedImports(expanded);
    const transformed = updateSourceFile(sourceFile, pruned);
    prepareForEmit(transformed, sourceFile.end);
    const output = resolver.printNode(transformed);
    assertNoStoryCollisions(output, examples, filePath);
    return output;
  } finally {
    resolver.close();
  }
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

  return factory.createObjectLiteralExpression(
    [
      factory.createPropertyAssignment(undefined, factory.createIdentifier(RENDER_STR), undefined, undefined!, renderFn)
    ],
    true
  );
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
        [factory.createToken(ts.SyntaxKind.ExportKeyword)],
        factory.createVariableDeclarationList(
          [
            factory.createVariableDeclaration(
              factory.createIdentifier(exportName),
              undefined,
              undefined,
              variantInitializer
            )
          ],
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

  let examplesDir: string | undefined;
  let present = false;
  const session = openTypeScriptSession({ fileName: filePath, code, isolated: true });
  try {
    session.sourceFile.forEachChild(function find(statement) {
      if (present) return;
      const call = getExamplesGetterCall(statement);
      if (!call) return;
      present = true;
      const arg = call.arguments[0];
      if (arg && ts.isStringLiteral(arg)) examplesDir = arg.text;
    });
  } finally {
    session.close();
  }

  if (!present) return [];

  // File discovery yields to other Vite transforms. Keep native sessions out of
  // that wait so concurrent stories do not retain one compiler process each.
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
 * exported story per discovered example and prepends the matching example imports.
 *
 * Each import is aliased to a reserved local name, so it cannot collide with anything
 * the file already imports or declares - including a type-only or aliased import of the
 * same example. Only the story export names, which Storybook derives story IDs from,
 * are placed in the file's own namespace.
 *
 * @example
 * ```ts
 * export const examples = getExamples();
 *
 * // transformed to:
 * import { PrimaryExample as __example_Primary } from './examples/primary.tsx';
 * export const Primary = __example_Primary;
 * ```
 */
function transformExamples(
  statements: readonly ts.Statement[],
  examples: ExampleDescriptor[],
  filePath: string
): readonly ts.Statement[] {
  if (examples.length === 0 && !filePath) return statements;
  let found = false;
  const body = statements.flatMap(function expandExamples(statement) {
    if (!getExamplesGetterCall(statement)) return [statement];
    found = true;
    const stories = examples.map((example) => createStoryExport(example.storyName, exampleLocalName(example)));
    return stories.length
      ? stories.map((story, index) => (index === 0 ? retainSourceRange(story, statement) : story))
      : [omitStatement(statement)];
  });
  if (!found) return statements;
  const imports = examples.map((example) =>
    createNamedImport(example.componentExportName, exampleLocalName(example), example.importPath)
  );
  const firstNonDirective = body.findIndex(
    (statement) => !ts.isExpressionStatement(statement) || !ts.isStringLiteral(statement.expression)
  );
  const importIndex = firstNonDirective < 0 ? body.length : firstNonDirective;
  return [...body.slice(0, importIndex), ...imports, ...body.slice(importIndex)];
}

/** The reserved local an example is imported as. Story names are unique, so these are too. */
function exampleLocalName(example: ExampleDescriptor): string {
  return `__example_${example.storyName}`;
}

/**
 * The diagnostics TypeScript reports when a name is declared or exported twice. Asking
 * the checker avoids enumerating the syntax that can introduce a binding - destructuring,
 * enums, re-exports, aliased and type-only imports - and it already knows which forms are
 * exempt, such as `declare` statements and overload signatures.
 *
 * Every shape a story export can clash with was measured against this list; the codes,
 * unlike the syntax, are a closed set.
 */
const COLLISION_DIAGNOSTICS = new Set([
  2300, // Duplicate identifier
  2323, // Cannot redeclare exported variable
  2393, // Duplicate function implementation
  2395, // Individual declarations in merged declaration must be all exported or all local
  2440, // Import declaration conflicts with local declaration
  2448, // Block-scoped variable used before its declaration
  2451, // Cannot redeclare block-scoped variable
  2484, // Export declaration conflicts with exported declaration
  2567 // Enum declarations can only merge with namespace or other enum declarations
]);

/**
 * Fails the build when a generated example story collides with something the file
 * already declares or exports, rather than emitting a module that cannot load.
 *
 * Pruning clears the common case, where the colliding binding existed only to feed a
 * getter. It cannot clear one that survives on its own merits - `getMeta({ component })`
 * keeps its reference - so the remainder is reported here.
 */
function assertNoStoryCollisions(code: string, examples: ExampleDescriptor[], filePath: string): void {
  if (examples.length === 0) return;

  const where = filePath || 'stories file';
  const byStoryName = new Map<string, ExampleDescriptor>();

  // Two examples reducing to one story name collide on their own, and naming both
  // files beats the checker's report of a redeclared variable.
  for (const example of examples) {
    const existing = byStoryName.get(example.storyName);
    if (existing) {
      throw new Error(
        `${where}: ${existing.importPath} and ${example.importPath} both generate a story ` +
          `named "${example.storyName}". Rename one of the example exports.`
      );
    }
    byStoryName.set(example.storyName, example);
  }

  const collision = findCollision(code);
  if (!collision) return;

  const stories = examples.map((example) => `"${example.storyName}" (${example.importPath})`).join(', ');

  throw new Error(
    `${where}: the transformed stories file is invalid - ${collision} Generated example ` +
      `stories: ${stories}. Rename the example export or the binding it collides with.`
  );
}

/** Type-checks the printed output in isolation, returning the first name-collision error. */
function findCollision(code: string): string | undefined {
  const session = openTypeScriptSession({ fileName: 'transformed.tsx', code, isolated: true });
  try {
    const found = session.project.program
      .getSemanticDiagnostics(session.sourceFile.fileName)
      .find((diagnostic) => COLLISION_DIAGNOSTICS.has(diagnostic.code));
    return found?.text;
  } finally {
    session.close();
  }
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
function pruneUnusedImports(statements: readonly ts.Statement[]): ts.Statement[] {
  const references = collectValueReferences(statements.filter((statement) => !ts.isImportDeclaration(statement)));
  return statements.flatMap(function pruneImport(statement) {
    if (!ts.isImportDeclaration(statement)) return [statement];
    const clause = statement.importClause;
    const pruned = clause && clause.phaseModifier === undefined ? keepReferencedBindings(clause, references) : clause;
    if (pruned === clause) return [statement];
    if (!pruned) return [omitStatement(statement)];
    return [
      retainSourceRange(
        factory.updateImportDeclaration(
          statement,
          statement.modifiers,
          pruned,
          statement.moduleSpecifier,
          statement.attributes
        ),
        statement
      )
    ];
  });
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

  return retainSourceRange(
    factory.updateImportClause(
      clause,
      clause.name,
      kept.length > 0
        ? retainSourceRange(
            factory.createNamedImports(factory.createNodeArray(kept, bindings.elements.pos, kept[kept.length - 1].end)),
            bindings
          )
        : undefined
    ),
    clause
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
    node.forEachChild(function visitReference(child) {
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
    ts.isParameterDeclaration(node) ||
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

/** Builds `import { <exportName> as <localName> } from '<modulePath>';` */
function createNamedImport(exportName: string, localName: string, modulePath: string): ts.ImportDeclaration {
  return factory.createImportDeclaration(
    undefined,
    factory.createImportClause(
      undefined,
      undefined,
      factory.createNamedImports([
        factory.createImportSpecifier(false, factory.createIdentifier(exportName), factory.createIdentifier(localName))
      ])
    ),
    factory.createStringLiteral(modulePath, ts.TokenFlags.None)
  );
}

/** Builds `export const <storyName> = <componentName>;` */
function createStoryExport(storyName: string, componentName: string): ts.VariableStatement {
  return factory.createVariableStatement(
    [factory.createToken(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createIdentifier(storyName),
          undefined,
          undefined,
          factory.createIdentifier(componentName)
        )
      ],
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
function transformGetComponentDocs(
  node: ts.Node,
  sourceFile: ts.SourceFile,
  defaults: DocsDefaults | undefined,
  resolver: Resolver
) {
  if (!isCallTo(node, GET_COMPONENT_DOCS) || !ts.isIdentifier(node.arguments[0])) return;

  const doc = docFromCall(node, sourceFile, resolver, defaults);
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
  defaults: DocsDefaults | undefined,
  resolver: Resolver
): ts.Expression | undefined {
  if (!isCallTo(node, GET_TYPE_DOCS) || node.typeArguments?.length !== 1) return;

  const doc = docFromCall(node, sourceFile, resolver, defaults);
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
  sourceFile: ts.SourceFile,
  transformers: TransformerFn[],
  resolver: Resolver,
  defaults?: DocsDefaults
): ts.Statement[] {
  function visit(node: ts.Node): ts.Node {
    for (const transformer of transformers) {
      const result = transformer(node, sourceFile, defaults, resolver);
      if (result) return retainSourceRange(result, node);
    }
    const result = ts.visitEachChild(node, visit);
    return result === node ? node : retainSourceRange(result, node);
  }
  return sourceFile.statements.flatMap(function expandVariants(statement) {
    const variants = transformGetVariants(statement);
    if (!variants) return [visit(statement) as ts.Statement];
    return variants.length
      ? variants.map((variant, index) => (index === 0 ? retainSourceRange(variant, statement) : variant))
      : [omitStatement(statement)];
  });
}

/** Preserves EOF comments too: TS7 can omit them when emitting an updated file. */
function updateSourceFile(sourceFile: ts.SourceFile, statements: readonly ts.Statement[]): ts.SourceFile {
  const eof = sourceFile.endOfFileToken;
  const hasFooter = ts.getLeadingCommentRanges(sourceFile.text, eof.pos)?.length;
  const body = hasFooter ? [...statements, retainSourceRange(factory.createEmptyStatement(), eof)] : statements;
  const endOfFile = hasFooter
    ? Object.assign(factory.cloneNode(eof), { pos: sourceFile.end, end: sourceFile.end })
    : eof;
  const statementList = factory.createNodeArray(
    body,
    sourceFile.statements.pos,
    hasFooter ? sourceFile.end : sourceFile.statements.end
  );
  return retainSourceRange(factory.updateSourceFile(sourceFile, statementList, endOfFile), sourceFile);
}

/** An empty AST statement keeps comments on removed syntax; TS7 drops them on NotEmittedStatement. */
function omitStatement(statement: ts.Statement): ts.EmptyStatement {
  return retainSourceRange(factory.createEmptyStatement(), statement);
}

/**
 * Keeps source trivia without mutating a parsed native node. For the same syntax
 * kind, corresponding child lists occupy the same visitor slots; factory updates
 * reset their ranges too, so retain those unless a narrower range was supplied.
 */
function retainSourceRange<T extends ts.Node>(node: T, original: ts.Node): T {
  const replacement = Object.assign(factory.cloneNode(node), { pos: original.pos, end: original.end });
  if (node.kind === original.kind) {
    const sourceLists: ts.NodeArray<ts.Node>[] = [];
    original.forEachChild(
      () => undefined,
      function collectSourceList(children) {
        sourceLists.push(children);
      }
    );
    let index = 0;
    replacement.forEachChild(
      () => undefined,
      function retainListRange(children) {
        const source = sourceLists[index++];
        if (source && source !== children) {
          if (children.pos < 0) Object.assign(children, { pos: source.pos });
          if (children.end < 0) Object.assign(children, { end: source.end });
        }
      }
    );
  }
  return replacement;
}

/**
 * TS7 encodes synthetic negative ranges as zero, which would attach the file's
 * first comment to every generated node. Anchor synthetic nodes and lists at EOF
 * instead; retained source ranges continue to supply authored comments.
 */
function prepareForEmit(node: ts.Node, sourceEnd: number): void {
  if (node.pos < 0 || node.end < 0) {
    Object.assign(node, {
      pos: node.pos < 0 ? sourceEnd : node.pos,
      end: node.end < 0 ? sourceEnd : node.end
    });
  }
  node.forEachChild(
    (child) => prepareForEmit(child, sourceEnd),
    function prepareListForEmit(children) {
      if (children.pos < 0 || children.end < 0) {
        Object.assign(children, {
          pos: children.pos < 0 ? sourceEnd : children.pos,
          end: children.end < 0 ? sourceEnd : children.end
        });
      }
      children.forEach((child) => prepareForEmit(child, sourceEnd));
    }
  );
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
  return retainSourceRange(
    factory.createObjectLiteralExpression(
      [
        ...obj.properties,
        factory.createPropertyAssignment(
          undefined,
          factory.createIdentifier(propName),
          undefined,
          undefined!,
          valueExpr
        )
      ],
      obj.multiLine
    ),
    obj
  );
}

/**
 * Creates a render function: args => <Component {...args} />
 */
function createRenderFunction(
  factory: typeof import('typescript/unstable/ast/factory'),
  component: ts.Expression
): ts.ArrowFunction {
  return factory.createArrowFunction(
    undefined,
    undefined,
    [factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier('args'))],
    undefined,
    factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
    factory.createJsxSelfClosingElement(
      component as ts.JsxTagNameExpression,
      undefined,
      factory.createJsxAttributes([factory.createJsxSpreadAttribute(factory.createIdentifier('args'))])
    )
  );
}

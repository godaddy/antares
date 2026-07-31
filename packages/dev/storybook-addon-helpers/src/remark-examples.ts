import { discoverExamplesForReadme, type ExampleDescriptor } from './examples.ts';

/**
 * A documentation target. `storybook` references generated CSF stories via the
 * `Stories` namespace already imported by the README; `fumadocs` imports each
 * example component directly (its build never runs the CSF transform).
 */
export type RemarkExamplesTarget = 'storybook' | 'fumadocs';

export interface RemarkExamplesOptions {
  /** Which documentation pipeline is expanding `<Examples />`. */
  target: RemarkExamplesTarget;
  /**
   * Registers an example file as a build dependency so edits trigger a rebuild.
   * Apps pass their own implementation (e.g. `addMdxDependency`).
   */
  onDependency?: (file: RemarkFile, path: string) => void;
}

/** Minimal mdast node shape - avoids pulling mdast/unified type deps into this package. */
interface MdNode {
  type: string;
  [key: string]: unknown;
}

interface MdRoot {
  type: 'root';
  children: MdNode[];
}

interface RemarkFile {
  path?: string;
  data: Record<string, unknown>;
}

type Estree = Record<string, unknown>;

const EXAMPLES_ELEMENT = 'Examples';

/**
 * Remark plugin that expands an `<Examples of={Stories.<name>} />` node into a
 * live-rendered, documented example per file discovered by following that
 * reference to the colocated stories file and its `getExamples(<dir>)` folder
 * (via the shared {@link discoverExamplesForReadme} core). For each example it
 * emits an `### Title` heading, an optional description paragraph, a `<Story>`
 * preview, and a `<Source>` code block.
 *
 * The two targets differ only in how the preview is referenced:
 * - `storybook`: `<Story of={Stories.X} inline />` (uses the README's existing
 *   `import * as Stories`).
 * - `fumadocs`: `<Story of={XExample} />` plus a prepended direct import, since
 *   fumadocs cannot consume the CSF-generated `Stories` exports.
 *
 * READMEs without an `<Examples />` node are left untouched.
 */
export function remarkExamples(options: RemarkExamplesOptions) {
  return async function transform(tree: MdRoot, file: RemarkFile): Promise<void> {
    if (!file.path) return;

    const index = tree.children.findIndex(isExamplesNode);
    if (index === -1) return;

    const exportName = examplesOfName(tree.children[index]);
    const { descriptors, storiesPath } = await discoverExamplesForReadme({ readmePath: file.path, exportName });
    if (storiesPath) options.onDependency?.(file, storiesPath);

    const blocks: MdNode[] = [];
    const imports: MdNode[] = [];

    for (const descriptor of descriptors) {
      options.onDependency?.(file, descriptor.filePath);

      blocks.push(headingNode(descriptor.title));
      if (descriptor.description) blocks.push(paragraphNode(descriptor.description));
      blocks.push(storyNode(descriptor, options.target));
      blocks.push(sourceNode(descriptor.source));

      if (options.target === 'fumadocs') {
        imports.push(esmImportNode(descriptor.componentExportName, descriptor.importPath));
      }
    }

    tree.children.splice(index, 1, ...blocks);
    if (imports.length > 0) tree.children.unshift(...imports);
  };
}

function isExamplesNode(node: MdNode): boolean {
  return node.type === 'mdxJsxFlowElement' && node.name === EXAMPLES_ELEMENT;
}

/** Extracts the export name from `<Examples of={Stories.<name>} />`, if present. */
function examplesOfName(node: MdNode): string | undefined {
  const attributes = node.attributes as Array<{ type: string; name?: string; value?: unknown }> | undefined;
  const ofAttr = attributes?.find((attr) => attr.type === 'mdxJsxAttribute' && attr.name === 'of');
  const expression = ofAttr?.value;
  if (
    expression &&
    typeof expression === 'object' &&
    (expression as { type?: string }).type === 'mdxJsxAttributeValueExpression'
  ) {
    return String((expression as { value: string }).value)
      .split('.')
      .at(-1);
  }
  return undefined;
}

function headingNode(title: string): MdNode {
  return { type: 'heading', depth: 3, children: [{ type: 'text', value: title }] };
}

function paragraphNode(text: string): MdNode {
  return { type: 'paragraph', children: [{ type: 'text', value: text }] };
}

function storyNode(descriptor: ExampleDescriptor, target: RemarkExamplesTarget): MdNode {
  const ofExpression =
    target === 'storybook'
      ? memberExpression('Stories', descriptor.storyName)
      : identifier(descriptor.componentExportName);
  const ofSource = target === 'storybook' ? `Stories.${descriptor.storyName}` : descriptor.componentExportName;

  const attributes: MdNode[] = [expressionAttribute('of', ofExpression, ofSource)];
  if (target === 'storybook') attributes.push({ type: 'mdxJsxAttribute', name: 'inline', value: null });

  return { type: 'mdxJsxFlowElement', name: 'Story', attributes, children: [] };
}

function sourceNode(code: string): MdNode {
  return {
    type: 'mdxJsxFlowElement',
    name: 'Source',
    attributes: [
      { type: 'mdxJsxAttribute', name: 'language', value: 'tsx' },
      expressionAttribute('code', literal(code), JSON.stringify(code))
    ],
    children: []
  };
}

function expressionAttribute(name: string, expression: Estree, value: string): MdNode {
  return {
    type: 'mdxJsxAttribute',
    name,
    value: {
      type: 'mdxJsxAttributeValueExpression',
      value,
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [{ type: 'ExpressionStatement', expression }]
        }
      }
    }
  };
}

function esmImportNode(name: string, source: string): MdNode {
  return {
    type: 'mdxjsEsm',
    value: `import { ${name} } from ${JSON.stringify(source)};`,
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [{ type: 'ImportSpecifier', imported: identifier(name), local: identifier(name) }],
            source: literal(source),
            attributes: []
          }
        ]
      }
    }
  };
}

function identifier(name: string): Estree {
  return { type: 'Identifier', name };
}

function memberExpression(object: string, property: string): Estree {
  return {
    type: 'MemberExpression',
    object: identifier(object),
    property: identifier(property),
    computed: false,
    optional: false
  };
}

function literal(value: string): Estree {
  return { type: 'Literal', value, raw: JSON.stringify(value) };
}

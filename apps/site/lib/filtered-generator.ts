import { SyntaxKind } from 'typescript';
import type { Generator, GeneratedDoc } from 'fumadocs-typescript';

type GenerateTypeTableOptions = Parameters<Generator['generateTypeTable']>[1];
type PropertySymbol = Parameters<NonNullable<NonNullable<GenerateTypeTableOptions>['transform']>>[2];

/**
 * Declaration file path segments that indicate generic DOM/HTML/SVG/CSS props to exclude entirely.
 * Keep in sync with `packages/dev/storybook-addon-helpers/src/prop-filter.ts`.
 */
const EXCLUDED_PATH_SEGMENTS = ['@types/react', 'csstype', '@react-types/shared/src/dom'];

/**
 * Returns true if a DocEntry's type string represents a React DOM synthetic event handler.
 *
 * React's DOM event handlers always use the `*EventHandler<T>` pattern (e.g.
 * `MouseEventHandler<HTMLButtonElement>`). React Aria's custom events use function
 * signature syntax like `(e: PressEvent) => void`, so they are NOT matched.
 *
 * This check is applied as a secondary, cache-proof filter: the fumadocs-typescript
 * file system cache returns GeneratedDoc[] directly on cache hits without calling the
 * transform callback, so the transform-based path exclusion cannot run. The type-string
 * check always runs on the final entries regardless of cache state.
 *
 * @param type - The type string from a DocEntry
 * @returns true if the prop is a React DOM event handler and should be excluded
 */
function isDomEventHandler(type: string): boolean {
  return type.includes('EventHandler<');
}

function isAriaAttribute(name: string): boolean {
  return name.startsWith('aria-');
}

/**
 * Maps containing interface names to human-readable category labels.
 * Props from interfaces not listed here are uncategorized (shown at top level).
 */
const INTERFACE_CATEGORY: Record<string, string> = {
  PressEvents: 'Events',
  FocusEvents: 'Events',
  KeyboardEvents: 'Events',
  HoverEvents: 'Events',
  FocusableProps: 'Events',

  SingleSelection: 'Selection',
  MultipleSelection: 'Selection',
  SpectrumSelectionProps: 'Selection',

  Validation: 'Validation',
  SpectrumFieldValidation: 'Validation',

  ValueBase: 'Value',

  InputBase: 'Input',
  TextInputBase: 'Input',

  CollectionBase: 'Collections',

  LabelableProps: 'Labeling',
  SpectrumLabelableProps: 'Labeling'
};

/**
 * Returns true if a declaration file path originates from generic DOM/HTML/SVG/CSS
 * type definitions that should not appear in component prop tables.
 *
 * @param filePath - Absolute path to the TypeScript declaration file
 * @returns true if props from this file should be excluded
 */
function isExcludedPath(filePath: string): boolean {
  return EXCLUDED_PATH_SEGMENTS.some((segment) => filePath.includes(segment));
}

/**
 * Filters GeneratedDoc entries, removing props that originate from excluded paths,
 * are DOM event handlers, are ARIA attributes, or lack a description.
 *
 * @param docs - Raw GeneratedDoc array from the base generator
 * @param excluded - Set of prop names identified as excluded via the transform callback
 * @returns Filtered docs with only relevant entries
 */
function filterEntries(docs: GeneratedDoc[], excluded: Set<string>): GeneratedDoc[] {
  return docs.map((doc) => ({
    ...doc,
    entries: doc.entries.filter(
      (entry) =>
        !excluded.has(entry.name) &&
        !isDomEventHandler(entry.type) &&
        !isAriaAttribute(entry.name) &&
        !!entry.description
    )
  }));
}

/**
 * Resolves the name of the interface that directly declares a property symbol.
 * Walks up the AST from the property declaration to the nearest
 * InterfaceDeclaration ancestor.
 *
 * @param propertySymbol - The property symbol from the generateTypeTable transform callback
 * @returns The interface name, or undefined if the property is not inside an interface
 */
function getContainingInterfaceName(propertySymbol: PropertySymbol): string | undefined {
  const decl = (propertySymbol.getDeclarations() ?? [])[0];
  if (!decl) return undefined;
  return decl.getFirstAncestorByKind(SyntaxKind.InterfaceDeclaration)?.getName();
}

/**
 * The shape returned by generateCategorizedTypeTable.
 * Contains the filtered docs plus a mapping of category names to the prop names
 * in that category.
 */
export interface CategorizedTypeTable {
  /** Filtered GeneratedDoc results (DOM/CSS props already removed). */
  docs: GeneratedDoc[];
  /**
   * Category name -> list of prop names in that category.
   * Props not in any category are uncategorized and should be shown at the top level.
   */
  categories: Record<string, string[]>;
}

/**
 * Wraps a fumadocs-typescript Generator to automatically exclude props that
 * originate from generic DOM, HTML, SVG, or CSS type definitions.
 *
 * The filter runs as a post-processing step after the generator resolves all
 * prop types, so full type information (including generic parameters) is
 * preserved for the props that remain.
 *
 * Excluded sources:
 * - `@types/react` -- HTMLAttributes, SVGAttributes, DOMAttributes, AriaAttributes
 * - `csstype` -- CSS property types
 * - `@react-types/shared/src/dom` -- RAC re-declarations of id, role, tabIndex, etc.
 *
 * @param base - The base generator to wrap
 * @returns A new Generator that applies prop filtering on every generateTypeTable call,
 *          plus a `generateCategorizedTypeTable` method for categorized rendering
 *
 * @example
 * ```typescript
 * const generator = createGenerator({ tsconfigPath: '...' });
 * const filtered = createFilteredGenerator(generator);
 * const { docs, categories } = await filtered.generateCategorizedTypeTable({ path, name });
 * ```
 */
export function createFilteredGenerator(base: Generator): Generator & {
  generateCategorizedTypeTable(props: Parameters<Generator['generateTypeTable']>[0]): Promise<CategorizedTypeTable>;
} {
  return {
    generateDocumentation: base.generateDocumentation.bind(base),

    async generateTypeTable(props, options?: GenerateTypeTableOptions) {
      const excluded = new Set<string>();

      const results = await base.generateTypeTable(props, {
        ...options,
        transform(entry, propertyType, propertySymbol) {
          options?.transform?.call(this, entry, propertyType, propertySymbol);

          const declarations = propertySymbol.getDeclarations() ?? [];
          if (declarations.some((d) => isExcludedPath(d.getSourceFile().getFilePath()))) {
            excluded.add(entry.name);
          }
        }
      });

      return filterEntries(results, excluded);
    },

    async generateCategorizedTypeTable(props) {
      const excluded = new Set<string>();
      const propToCategory = new Map<string, string>();

      const results = await base.generateTypeTable(props, {
        transform(entry, propertyType, propertySymbol) {
          const declarations = propertySymbol.getDeclarations() ?? [];
          if (declarations.some((d) => isExcludedPath(d.getSourceFile().getFilePath()))) {
            excluded.add(entry.name);
            return;
          }

          const interfaceName = getContainingInterfaceName(propertySymbol);
          if (interfaceName) {
            const category = INTERFACE_CATEGORY[interfaceName];
            if (category) {
              propToCategory.set(entry.name, category);
            }
          }
        }
      });

      const docs = filterEntries(results, excluded);

      const categories: Record<string, string[]> = {};
      for (const [propName, category] of propToCategory) {
        (categories[category] ??= []).push(propName);
      }

      return { docs, categories };
    }
  };
}

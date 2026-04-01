import { describe, it, vi } from 'vitest';
import assume from 'assume';
import type { Generator, GeneratedDoc } from 'fumadocs-typescript';
import { createFilteredGenerator } from '../lib/filtered-generator';

/**
 * Builds a minimal GeneratedDoc fixture with the given prop names.
 *
 * @param entries - Array of prop names to include
 * @returns A GeneratedDoc-shaped object
 */
function makeDoc(entries: string[]): GeneratedDoc {
  return {
    id: 'test',
    name: 'TestProps',
    entries: entries.map((name) => ({
      name,
      description: 'A prop.',
      type: 'string',
      simplifiedType: 'string',
      tags: [],
      required: false,
      deprecated: false
    }))
  };
}

/**
 * Creates a mock base Generator whose generateTypeTable:
 * 1. Calls the transform callback for each provided prop, using the given file path
 *    as declaration source and optionally a containing interface name
 * 2. Returns a GeneratedDoc containing all props
 *
 * @param props - Array of {name, filePath, interfaceName?} pairs
 * @returns A partial Generator mock
 */
function makeBaseGenerator(props: Array<{ name: string; filePath: string; interfaceName?: string }>): Generator {
  return {
    generateDocumentation: vi.fn(),
    generateTypeTable: vi.fn(async function mockGenerateTypeTable(_input: unknown, options?: { transform?: Function }) {
      if (options?.transform) {
        for (const prop of props) {
          options.transform.call(
            {},
            {
              name: prop.name,
              tags: [],
              description: '',
              type: 'string',
              simplifiedType: 'string',
              required: false,
              deprecated: false
            },
            null,
            {
              getDeclarations: () => [
                {
                  getSourceFile: () => ({ getFilePath: () => prop.filePath }),
                  getFirstAncestorByKind: (_kind: number) =>
                    prop.interfaceName ? { getName: () => prop.interfaceName } : undefined
                }
              ]
            }
          );
        }
      }
      return [makeDoc(props.map((p) => p.name))];
    })
  } as unknown as Generator;
}

describe('site', function siteTests() {
  describe('#createFilteredGenerator', function filteredGeneratorTests() {
    it('excludes props from @types/react', async function excludesTypesReact() {
      const base = makeBaseGenerator([
        { name: 'icon', filePath: '/project/node_modules/@bento/icon/dist/index.d.ts' },
        { name: 'className', filePath: '/project/node_modules/@types/react/index.d.ts' }
      ]);

      const filtered = createFilteredGenerator(base);
      const docs = await filtered.generateTypeTable({ path: '/fake/index.tsx', name: 'IconProps' });

      const names = docs.flatMap((d) => d.entries.map((e) => e.name));
      assume(names).includes('icon');
      assume(names).not.includes('className');
    });

    it('excludes props from csstype', async function excludesCsstype() {
      const base = makeBaseGenerator([
        { name: 'size', filePath: '/project/node_modules/@bento/icon/dist/index.d.ts' },
        { name: 'color', filePath: '/project/node_modules/csstype/index.d.ts' }
      ]);

      const filtered = createFilteredGenerator(base);
      const docs = await filtered.generateTypeTable({ path: '/fake/index.tsx', name: 'IconProps' });

      const names = docs.flatMap((d) => d.entries.map((e) => e.name));
      assume(names).includes('size');
      assume(names).not.includes('color');
    });

    it('excludes props from @react-types/shared/src/dom', async function excludesReactTypesDom() {
      const base = makeBaseGenerator([
        { name: 'isDisabled', filePath: '/project/node_modules/@react-types/shared/src/events.d.ts' },
        { name: 'id', filePath: '/project/node_modules/@react-types/shared/src/dom.d.ts' }
      ]);

      const filtered = createFilteredGenerator(base);
      const docs = await filtered.generateTypeTable({ path: '/fake/index.tsx', name: 'ButtonProps' });

      const names = docs.flatMap((d) => d.entries.map((e) => e.name));
      assume(names).includes('isDisabled');
      assume(names).not.includes('id');
    });

    it('passes through @bento/* and local source props', async function passesThroughBentoAndLocal() {
      const base = makeBaseGenerator([
        { name: 'icon', filePath: '/project/node_modules/@bento/icon/dist/index.d.ts' },
        { name: 'size', filePath: '/project/packages/uxcore/components/icon/src/index.tsx' }
      ]);

      const filtered = createFilteredGenerator(base);
      const docs = await filtered.generateTypeTable({ path: '/fake/index.tsx', name: 'IconProps' });

      const names = docs.flatMap((d) => d.entries.map((e) => e.name));
      assume(names).includes('icon');
      assume(names).includes('size');
    });

    it('passes through @react-types/shared props that are not in /src/dom', async function passesThroughRacEvents() {
      const base = makeBaseGenerator([
        { name: 'onPress', filePath: '/project/node_modules/@react-types/shared/src/events.d.ts' },
        { name: 'onFocus', filePath: '/project/node_modules/@react-types/shared/src/events.d.ts' }
      ]);

      const filtered = createFilteredGenerator(base);
      const docs = await filtered.generateTypeTable({ path: '/fake/index.tsx', name: 'ButtonProps' });

      const names = docs.flatMap((d) => d.entries.map((e) => e.name));
      assume(names).includes('onPress');
      assume(names).includes('onFocus');
    });

    it('excludes DOM event handler props by type string even on cache hit (excluded set empty)', async function excludesDomEventHandlerByTypeString() {
      const base = makeBaseGenerator([{ name: 'onMouseDown', filePath: '/project/packages/uxcore/src/index.tsx' }]);
      vi.mocked(base.generateTypeTable).mockResolvedValueOnce([
        {
          id: 'btn',
          name: 'ButtonProps',
          entries: [
            {
              name: 'onMouseDown',
              description: '',
              type: 'React.MouseEventHandler<HTMLButtonElement>',
              simplifiedType: 'MouseEventHandler<HTMLButtonElement>',
              tags: [],
              required: false,
              deprecated: false
            },
            {
              name: 'onPress',
              description: 'Fired when pressed.',
              type: '(e: PressEvent) => void',
              simplifiedType: '(e: PressEvent) => void',
              tags: [],
              required: false,
              deprecated: false
            }
          ]
        }
      ]);

      const filtered = createFilteredGenerator(base);
      const docs = await filtered.generateTypeTable({ path: '/fake/index.tsx', name: 'ButtonProps' });

      const names = docs.flatMap((d) => d.entries.map((e) => e.name));
      assume(names).not.includes('onMouseDown');
      assume(names).includes('onPress');
    });

    it('excludes props re-declared in RAC dist when any declaration is in an excluded path', async function excludesAnyDeclarationInExcludedPath() {
      const base = {
        generateDocumentation: vi.fn(),
        generateTypeTable: vi.fn(async function mockGenerate(_input: unknown, options?: { transform?: Function }) {
          if (options?.transform) {
            options.transform.call(
              {},
              {
                name: 'onMouseDown',
                tags: [],
                description: '',
                type: 'MouseEventHandler<HTMLButtonElement>',
                simplifiedType: 'MouseEventHandler<HTMLButtonElement>',
                required: false,
                deprecated: false
              },
              null,
              {
                getDeclarations: () => [
                  {
                    getSourceFile: () => ({
                      getFilePath: () => '/project/node_modules/react-aria-components/dist/types.d.ts'
                    })
                  },
                  { getSourceFile: () => ({ getFilePath: () => '/project/node_modules/@types/react/index.d.ts' }) }
                ]
              }
            );
          }
          return [makeDoc(['onMouseDown'])];
        })
      } as unknown as Generator;

      const filtered = createFilteredGenerator(base);
      const docs = await filtered.generateTypeTable({ path: '/fake/index.tsx', name: 'ButtonProps' });

      const names = docs.flatMap((d) => d.entries.map((e) => e.name));
      assume(names).not.includes('onMouseDown');
    });

    it('excludes aria-* props from generateTypeTable', async function excludesAriaProps() {
      const base = makeBaseGenerator([{ name: 'size', filePath: '/project/packages/uxcore/src/index.tsx' }]);
      vi.mocked(base.generateTypeTable).mockResolvedValueOnce([
        {
          id: 'icon',
          name: 'IconProps',
          entries: [
            {
              name: 'size',
              description: 'The size.',
              type: 'string',
              simplifiedType: 'string',
              tags: [],
              required: false,
              deprecated: false
            },
            {
              name: 'aria-label',
              description: 'ARIA label.',
              type: 'string',
              simplifiedType: 'string',
              tags: [],
              required: false,
              deprecated: false
            }
          ]
        }
      ]);

      const filtered = createFilteredGenerator(base);
      const docs = await filtered.generateTypeTable({ path: '/fake/index.tsx', name: 'IconProps' });

      const names = docs.flatMap((d) => d.entries.map((e) => e.name));
      assume(names).includes('size');
      assume(names).not.includes('aria-label');
    });

    it('excludes props without a description', async function excludesUndescribed() {
      const base = makeBaseGenerator([{ name: 'size', filePath: '/project/packages/uxcore/src/index.tsx' }]);
      vi.mocked(base.generateTypeTable).mockResolvedValueOnce([
        {
          id: 'icon',
          name: 'IconProps',
          entries: [
            {
              name: 'size',
              description: 'The size.',
              type: 'string',
              simplifiedType: 'string',
              tags: [],
              required: false,
              deprecated: false
            },
            {
              name: 'internalFlag',
              description: '',
              type: 'boolean',
              simplifiedType: 'boolean',
              tags: [],
              required: false,
              deprecated: false
            }
          ]
        }
      ]);

      const filtered = createFilteredGenerator(base);
      const docs = await filtered.generateTypeTable({ path: '/fake/index.tsx', name: 'IconProps' });

      const names = docs.flatMap((d) => d.entries.map((e) => e.name));
      assume(names).includes('size');
      assume(names).not.includes('internalFlag');
    });

    it('chains caller-provided transform before applying the filter', async function chainsCallerTransform() {
      const callerTransform = vi.fn();
      const base = makeBaseGenerator([{ name: 'icon', filePath: '/project/node_modules/@bento/icon/dist/index.d.ts' }]);

      const filtered = createFilteredGenerator(base);
      await filtered.generateTypeTable({ path: '/fake/index.tsx', name: 'IconProps' }, { transform: callerTransform });

      assume(callerTransform.mock.calls.length).equals(1);
      assume(callerTransform.mock.calls[0][0].name).equals('icon');
    });

    it('keeps props when symbol has an empty declarations array', async function keepsPropsWithEmptyDeclarations() {
      const base = {
        generateDocumentation: vi.fn(),
        generateTypeTable: vi.fn(async function mockGenerate(_input: unknown, options?: { transform?: Function }) {
          if (options?.transform) {
            options.transform.call(
              {},
              {
                name: 'size',
                tags: [],
                description: '',
                type: 'string',
                simplifiedType: 'string',
                required: false,
                deprecated: false
              },
              null,
              { getDeclarations: () => [] }
            );
          }
          return [makeDoc(['size'])];
        })
      } as unknown as Generator;

      const filtered = createFilteredGenerator(base);
      const docs = await filtered.generateTypeTable({ path: '/fake/index.tsx', name: 'Props' });

      const names = docs.flatMap((d) => d.entries.map((e) => e.name));
      assume(names).includes('size');
    });

    it('keeps props when symbol returns null declarations', async function keepsPropsWithNullDeclarations() {
      const base = {
        generateDocumentation: vi.fn(),
        generateTypeTable: vi.fn(async function mockGenerate(_input: unknown, options?: { transform?: Function }) {
          if (options?.transform) {
            options.transform.call(
              {},
              {
                name: 'size',
                tags: [],
                description: '',
                type: 'string',
                simplifiedType: 'string',
                required: false,
                deprecated: false
              },
              null,
              { getDeclarations: () => null }
            );
          }
          return [makeDoc(['size'])];
        })
      } as unknown as Generator;

      const filtered = createFilteredGenerator(base);
      const docs = await filtered.generateTypeTable({ path: '/fake/index.tsx', name: 'Props' });

      const names = docs.flatMap((d) => d.entries.map((e) => e.name));
      assume(names).includes('size');
    });

    it('preserves existing doc fields (id, name, description) on filtered results', async function preservesDocFields() {
      const base = makeBaseGenerator([
        { name: 'size', filePath: '/project/packages/uxcore/components/icon/src/index.tsx' }
      ]);
      vi.mocked(base.generateTypeTable).mockResolvedValueOnce([
        {
          id: 'my-id',
          name: 'IconProps',
          description: 'A doc',
          entries: [
            {
              name: 'size',
              description: '',
              type: 'string',
              simplifiedType: 'string',
              tags: [],
              required: false,
              deprecated: false
            }
          ]
        }
      ]);

      const filtered = createFilteredGenerator(base);
      const docs = await filtered.generateTypeTable({ path: '/fake/index.tsx', name: 'IconProps' });

      assume(docs[0].id).equals('my-id');
      assume(docs[0].name).equals('IconProps');
      assume(docs[0].description).equals('A doc');
    });
  });

  describe('#generateCategorizedTypeTable', function categorizedTests() {
    it('assigns Events category for PressEvents interface props', async function assignsEventsCategory() {
      const base = makeBaseGenerator([
        {
          name: 'onPress',
          filePath: '/project/node_modules/@react-types/shared/src/events.d.ts',
          interfaceName: 'PressEvents'
        }
      ]);

      const filtered = createFilteredGenerator(base);
      const { categories } = await filtered.generateCategorizedTypeTable({
        path: '/fake/index.tsx',
        name: 'ButtonProps'
      });

      assume(categories['Events']).includes('onPress');
    });

    it('assigns Validation category for Validation interface props', async function assignsValidationCategory() {
      const base = makeBaseGenerator([
        {
          name: 'isRequired',
          filePath: '/project/node_modules/@react-types/shared/src/inputs.d.ts',
          interfaceName: 'Validation'
        }
      ]);

      const filtered = createFilteredGenerator(base);
      const { categories } = await filtered.generateCategorizedTypeTable({
        path: '/fake/index.tsx',
        name: 'FieldProps'
      });

      assume(categories['Validation']).includes('isRequired');
    });

    it('leaves local props uncategorized (no entry in categories)', async function leavesLocalPropsUncategorized() {
      const base = makeBaseGenerator([
        {
          name: 'label',
          filePath: '/project/packages/uxcore/components/button/src/index.tsx'
        }
      ]);

      const filtered = createFilteredGenerator(base);
      const { docs, categories } = await filtered.generateCategorizedTypeTable({
        path: '/fake/index.tsx',
        name: 'ButtonProps'
      });

      const allCategorized = Object.values(categories).flat();
      assume(allCategorized).not.includes('label');
      assume(docs.flatMap((d) => d.entries.map((e) => e.name))).includes('label');
    });

    it('excludes DOM props from both docs and categories', async function excludesDomPropsFromCategories() {
      const base = makeBaseGenerator([
        {
          name: 'id',
          filePath: '/project/node_modules/@react-types/shared/src/dom.d.ts',
          interfaceName: 'DOMProps'
        },
        {
          name: 'onPress',
          filePath: '/project/node_modules/@react-types/shared/src/events.d.ts',
          interfaceName: 'PressEvents'
        }
      ]);

      const filtered = createFilteredGenerator(base);
      const { docs, categories } = await filtered.generateCategorizedTypeTable({
        path: '/fake/index.tsx',
        name: 'ButtonProps'
      });

      const allNames = docs.flatMap((d) => d.entries.map((e) => e.name));
      assume(allNames).not.includes('id');
      assume(Object.values(categories).flat()).not.includes('id');
      assume(categories['Events']).includes('onPress');
    });

    it('groups multiple props from the same category together', async function groupsMultiplePropsInCategory() {
      const base = makeBaseGenerator([
        {
          name: 'onPress',
          filePath: '/project/node_modules/@react-types/shared/src/events.d.ts',
          interfaceName: 'PressEvents'
        },
        {
          name: 'onFocus',
          filePath: '/project/node_modules/@react-types/shared/src/events.d.ts',
          interfaceName: 'FocusEvents'
        }
      ]);

      const filtered = createFilteredGenerator(base);
      const { categories } = await filtered.generateCategorizedTypeTable({
        path: '/fake/index.tsx',
        name: 'ButtonProps'
      });

      assume(categories['Events']).includes('onPress');
      assume(categories['Events']).includes('onFocus');
    });

    it('excludes DOM event handler entries by type string in generateCategorizedTypeTable', async function excludesDomEventHandlerByTypeStringCategorized() {
      const base = {
        generateDocumentation: vi.fn(),
        generateTypeTable: vi.fn(async function mockGenerate(_input: unknown, options?: { transform?: Function }) {
          if (options?.transform) {
            options.transform.call(
              {},
              {
                name: 'onMouseDown',
                tags: [],
                description: '',
                type: 'React.MouseEventHandler<HTMLButtonElement>',
                simplifiedType: 'MouseEventHandler<HTMLButtonElement>',
                required: false,
                deprecated: false
              },
              null,
              { getDeclarations: () => [], getFirstAncestorByKind: () => undefined }
            );
          }
          return [
            {
              id: 'btn',
              name: 'ButtonProps',
              entries: [
                {
                  name: 'onMouseDown',
                  description: '',
                  type: 'React.MouseEventHandler<HTMLButtonElement>',
                  simplifiedType: 'MouseEventHandler<HTMLButtonElement>',
                  tags: [],
                  required: false,
                  deprecated: false
                },
                {
                  name: 'onPress',
                  description: 'Fired when pressed.',
                  type: '(e: PressEvent) => void',
                  simplifiedType: '(e: PressEvent) => void',
                  tags: [],
                  required: false,
                  deprecated: false
                }
              ]
            }
          ];
        })
      } as unknown as Generator;

      const filtered = createFilteredGenerator(base);
      const { docs } = await filtered.generateCategorizedTypeTable({
        path: '/fake/index.tsx',
        name: 'ButtonProps'
      });

      const names = docs.flatMap((d) => d.entries.map((e) => e.name));
      assume(names).not.includes('onMouseDown');
      assume(names).includes('onPress');
    });

    it('excludes re-declared DOM event handler when any declaration is in an excluded path', async function excludesReDeclaredDomEvent() {
      const base = {
        generateDocumentation: vi.fn(),
        generateTypeTable: vi.fn(async function mockGenerate(_input: unknown, options?: { transform?: Function }) {
          if (options?.transform) {
            options.transform.call(
              {},
              {
                name: 'onMouseDown',
                tags: [],
                description: '',
                type: 'MouseEventHandler<HTMLButtonElement>',
                simplifiedType: 'MouseEventHandler<HTMLButtonElement>',
                required: false,
                deprecated: false
              },
              null,
              {
                getDeclarations: () => [
                  {
                    getSourceFile: () => ({
                      getFilePath: () => '/project/node_modules/react-aria-components/dist/types.d.ts'
                    }),
                    getFirstAncestorByKind: () => undefined
                  },
                  {
                    getSourceFile: () => ({ getFilePath: () => '/project/node_modules/@types/react/index.d.ts' }),
                    getFirstAncestorByKind: () => undefined
                  }
                ]
              }
            );
          }
          return [makeDoc(['onMouseDown'])];
        })
      } as unknown as Generator;

      const filtered = createFilteredGenerator(base);
      const { docs, categories } = await filtered.generateCategorizedTypeTable({
        path: '/fake/index.tsx',
        name: 'ButtonProps'
      });

      assume(docs.flatMap((d) => d.entries.map((e) => e.name))).not.includes('onMouseDown');
      assume(Object.values(categories).flat()).not.includes('onMouseDown');
    });

    it('excludes aria-* props from generateCategorizedTypeTable', async function excludesAriaPropsCategorized() {
      const base = makeBaseGenerator([{ name: 'label', filePath: '/project/packages/uxcore/src/index.tsx' }]);
      vi.mocked(base.generateTypeTable).mockResolvedValueOnce([
        {
          id: 'btn',
          name: 'ButtonProps',
          entries: [
            {
              name: 'label',
              description: 'The label.',
              type: 'string',
              simplifiedType: 'string',
              tags: [],
              required: false,
              deprecated: false
            },
            {
              name: 'aria-describedby',
              description: 'ARIA described by.',
              type: 'string',
              simplifiedType: 'string',
              tags: [],
              required: false,
              deprecated: false
            }
          ]
        }
      ]);

      const filtered = createFilteredGenerator(base);
      const { docs } = await filtered.generateCategorizedTypeTable({ path: '/fake/index.tsx', name: 'ButtonProps' });

      const names = docs.flatMap((d) => d.entries.map((e) => e.name));
      assume(names).includes('label');
      assume(names).not.includes('aria-describedby');
    });

    it('excludes props without a description in generateCategorizedTypeTable', async function excludesUndescribedCategorized() {
      const base = makeBaseGenerator([{ name: 'label', filePath: '/project/packages/uxcore/src/index.tsx' }]);
      vi.mocked(base.generateTypeTable).mockResolvedValueOnce([
        {
          id: 'btn',
          name: 'ButtonProps',
          entries: [
            {
              name: 'label',
              description: 'The label.',
              type: 'string',
              simplifiedType: 'string',
              tags: [],
              required: false,
              deprecated: false
            },
            {
              name: 'internalFlag',
              description: '',
              type: 'boolean',
              simplifiedType: 'boolean',
              tags: [],
              required: false,
              deprecated: false
            }
          ]
        }
      ]);

      const filtered = createFilteredGenerator(base);
      const { docs } = await filtered.generateCategorizedTypeTable({ path: '/fake/index.tsx', name: 'ButtonProps' });

      const names = docs.flatMap((d) => d.entries.map((e) => e.name));
      assume(names).includes('label');
      assume(names).not.includes('internalFlag');
    });

    it('leaves prop uncategorized when interface name is not in the category map', async function leavesUnknownInterface() {
      const base = makeBaseGenerator([
        {
          name: 'customProp',
          filePath: '/project/packages/uxcore/components/button/src/index.tsx',
          interfaceName: 'SomeUnknownInterface'
        }
      ]);

      const filtered = createFilteredGenerator(base);
      const { docs, categories } = await filtered.generateCategorizedTypeTable({
        path: '/fake/index.tsx',
        name: 'ButtonProps'
      });

      assume(docs.flatMap((d) => d.entries.map((e) => e.name))).includes('customProp');
      assume(Object.values(categories).flat()).not.includes('customProp');
    });

    it('keeps prop when declarations array is empty in generateCategorizedTypeTable', async function keepsPropWithEmptyDeclarationsCategorized() {
      const base = {
        generateDocumentation: vi.fn(),
        generateTypeTable: vi.fn(async function mockGenerate(_input: unknown, options?: { transform?: Function }) {
          if (options?.transform) {
            options.transform.call(
              {},
              {
                name: 'label',
                tags: [],
                description: '',
                type: 'string',
                simplifiedType: 'string',
                required: false,
                deprecated: false
              },
              null,
              { getDeclarations: () => [] }
            );
          }
          return [makeDoc(['label'])];
        })
      } as unknown as Generator;

      const filtered = createFilteredGenerator(base);
      const { docs } = await filtered.generateCategorizedTypeTable({
        path: '/fake/index.tsx',
        name: 'Props'
      });

      assume(docs.flatMap((d) => d.entries.map((e) => e.name))).includes('label');
    });

    it('keeps prop when getDeclarations returns null in generateCategorizedTypeTable', async function keepsPropWithNullDeclarationsCategorized() {
      const base = {
        generateDocumentation: vi.fn(),
        generateTypeTable: vi.fn(async function mockGenerate(_input: unknown, options?: { transform?: Function }) {
          if (options?.transform) {
            options.transform.call(
              {},
              {
                name: 'label',
                tags: [],
                description: '',
                type: 'string',
                simplifiedType: 'string',
                required: false,
                deprecated: false
              },
              null,
              { getDeclarations: () => null }
            );
          }
          return [makeDoc(['label'])];
        })
      } as unknown as Generator;

      const filtered = createFilteredGenerator(base);
      const { docs } = await filtered.generateCategorizedTypeTable({
        path: '/fake/index.tsx',
        name: 'Props'
      });

      assume(docs.flatMap((d) => d.entries.map((e) => e.name))).includes('label');
    });

    it('leaves prop uncategorized when declaration has no interface ancestor', async function leavesUncategorizedWhenNoInterface() {
      const base = {
        generateDocumentation: vi.fn(),
        generateTypeTable: vi.fn(async function mockGenerate(_input: unknown, options?: { transform?: Function }) {
          if (options?.transform) {
            options.transform.call(
              {},
              {
                name: 'size',
                tags: [],
                description: '',
                type: 'string',
                simplifiedType: 'string',
                required: false,
                deprecated: false
              },
              null,
              {
                getDeclarations: () => [
                  {
                    getSourceFile: () => ({ getFilePath: () => '/project/packages/uxcore/src/index.tsx' }),
                    getFirstAncestorByKind: () => undefined
                  }
                ]
              }
            );
          }
          return [makeDoc(['size'])];
        })
      } as unknown as Generator;

      const filtered = createFilteredGenerator(base);
      const { docs, categories } = await filtered.generateCategorizedTypeTable({
        path: '/fake/index.tsx',
        name: 'Props'
      });

      assume(docs.flatMap((d) => d.entries.map((e) => e.name))).includes('size');
      assume(Object.values(categories).flat()).not.includes('size');
    });
  });
});

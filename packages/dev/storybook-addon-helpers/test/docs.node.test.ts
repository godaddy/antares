import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { resolvePropsDoc } from '../src/docs.ts';

const storiesPath = fileURLToPath(new URL('./fixtures/widget.stories.tsx', import.meta.url));

describe('resolvePropsDoc', function resolvePropsDocTests() {
  it('resolves a getComponentDocs export with options applied', async function resolvesComponent() {
    const doc = await resolvePropsDoc({ filePath: storiesPath, exportName: 'Props' });

    expect(doc?.name).toBe('Widget');
    // All props extracted (no exclude on this export).
    expect(doc?.props.map((p) => p.name).sort()).toEqual(['label', 'onChange', 'onPress', 'size']);
    // Options applied: on* categorized as Events, primary `label` left at root.
    expect(doc?.props.find((p) => p.name === 'onPress')?.category).toBe('Events');
    expect(doc?.props.find((p) => p.name === 'onChange')?.category).toBe('Events');
    expect(doc?.props.find((p) => p.name === 'label')?.category).toBeUndefined();
    expect(doc?.props.find((p) => p.name === 'size')?.category).toBeUndefined();
  });

  it('resolves a getTypeDocs export with options applied', async function resolvesType() {
    const doc = await resolvePropsDoc({ filePath: storiesPath, exportName: 'TypeProps' });

    expect(doc?.name).toBe('WidgetProps');
    expect(doc?.props.map((p) => p.name)).not.toContain('size'); // excluded
    expect(doc?.props.map((p) => p.name)).toContain('label');
  });

  it('returns undefined for an export that is not a docs getter', async function ignoresNonDocs() {
    expect(await resolvePropsDoc({ filePath: storiesPath, exportName: 'NotADoc' })).toBeUndefined();
  });

  it('returns undefined for a missing export', async function missingExport() {
    expect(await resolvePropsDoc({ filePath: storiesPath, exportName: 'Nope' })).toBeUndefined();
  });

  it('reads from inline code and applies getTypeDocs options', async function fromCodeType() {
    const code = `
      import { getTypeDocs } from '../../src/storybook/getters.ts';
      interface Local {
        /** first */
        a: string;
        b?: number;
      }
      export const T = getTypeDocs<Local>({ exclude: ['b'] });
    `;

    const doc = await resolvePropsDoc({ code, exportName: 'T' });
    expect(doc?.name).toBe('Local');
    expect(doc?.props.map((p) => p.name)).toEqual(['a']);
  });

  it('reads a bare getComponentDocs (no options) from inline code', async function bareComponent() {
    const code = `
      import { getComponentDocs } from '../../src/storybook/getters.ts';
      interface WProps {
        /** x */
        x: string;
      }
      function W(_p: WProps) {
        return null;
      }
      export const B = getComponentDocs(W);
    `;

    const doc = await resolvePropsDoc({ code, exportName: 'B' });
    expect(doc?.name).toBe('W');
    expect(doc?.props.map((p) => p.name)).toEqual(['x']);
  });

  it('unwraps an `as` expression around the getter call', async function unwrapsAs() {
    const code = `
      import { getTypeDocs } from '../../src/storybook/getters.ts';
      interface L {
        a: string;
      }
      export const A = getTypeDocs<L>({}) as unknown as Record<string, never>;
    `;

    const doc = await resolvePropsDoc({ code, exportName: 'A' });
    expect(doc?.props.map((p) => p.name)).toEqual(['a']);
  });

  it('returns undefined when the export initializer is a non-getter call', async function nonGetterCall() {
    const code = `export const X = other();`;
    expect(await resolvePropsDoc({ code, exportName: 'X' })).toBeUndefined();
  });

  it('returns undefined when getComponentDocs first arg is not an identifier', async function nonIdentifierComponent() {
    const code = `
      import { getComponentDocs } from '../../src/storybook/getters.ts';
      export const X = getComponentDocs({}, {});
    `;
    expect(await resolvePropsDoc({ code, exportName: 'X' })).toBeUndefined();
  });

  it('applies global defaults under getComponentDocs; call keys win per key', async function componentDefaults() {
    const code = `
      import { getComponentDocs } from '../../src/storybook/getters.ts';
      interface WProps { label: string; onPress?: () => void; onChange?: () => void; }
      function W(_p: WProps) { return null; }
      export const B = getComponentDocs(W, { primary: ['label'] });
    `;

    const doc = await resolvePropsDoc({ code, exportName: 'B', defaults: { categories: { Events: [/^on/] } } });
    expect(doc?.props.find((p) => p.name === 'onPress')?.category).toBe('Events');
    expect(doc?.props.find((p) => p.name === 'onChange')?.category).toBe('Events');
    expect(doc?.props.find((p) => p.name === 'label')?.category).toBeUndefined();
  });

  it('lets a call category replace the defaults category wholesale', async function categoryOverride() {
    const code = `
      import { getComponentDocs } from '../../src/storybook/getters.ts';
      interface WProps { label: string; onPress?: () => void; }
      function W(_p: WProps) { return null; }
      export const B = getComponentDocs(W, { categories: { Handlers: [/^on/] } });
    `;

    const doc = await resolvePropsDoc({ code, exportName: 'B', defaults: { categories: { Events: [/^on/] } } });
    expect(doc?.props.find((p) => p.name === 'onPress')?.category).toBe('Handlers');
  });

  it('applies global defaults under getTypeDocs too', async function typeDefaults() {
    const code = `
      import { getTypeDocs } from '../../src/storybook/getters.ts';
      interface WProps { label: string; onPress?: () => void; }
      export const T = getTypeDocs<WProps>({});
    `;

    const doc = await resolvePropsDoc({ code, exportName: 'T', defaults: { categories: { Events: [/^on/] } } });
    expect(doc?.props.find((p) => p.name === 'onPress')?.category).toBe('Events');
  });
});

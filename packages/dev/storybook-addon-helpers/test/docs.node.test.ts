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
});

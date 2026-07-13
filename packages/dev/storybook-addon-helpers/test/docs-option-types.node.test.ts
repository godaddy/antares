import { describe, expect, it } from 'vitest';
import type { ComponentDocsOptions, DocsDefaults } from '../src/types.ts';

type Btn = (props: { onPress?: () => void; label: string }) => null;

// Widened matchers: arbitrary strings allowed alongside real keys (autocomplete kept).
const opts = {
  primary: ['label', 'customId'],
  categories: { Events: [/^on/], Extra: ['somethingNotOnBtn'] },
  overrides: [{ name: 'customId', type: 'string', description: 'Custom id.' }]
} satisfies ComponentDocsOptions<Btn>;

// Global defaults are component-agnostic string/RegExp matchers.
const defaults = {
  categories: { Events: [/^on/], Aria: [/^aria-/] },
  exclude: ['key', 'ref']
} satisfies DocsDefaults;

describe('docs option types', function docsOptionTypes() {
  it('accepts arbitrary string matchers and a component-agnostic DocsDefaults', function widened() {
    expect(opts.primary).toContain('customId');
    expect(defaults.categories?.Events).toBeDefined();
  });
});

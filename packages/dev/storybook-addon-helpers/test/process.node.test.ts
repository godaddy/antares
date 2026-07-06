import { describe, expect, it } from 'vitest';
import { processPropsDoc } from '../src/process.ts';
import type { ComponentDocsOptions, PropDoc } from '../src/types.ts';

type TestComponent = (props: { alpha: number; beta?: boolean }) => null;

const includeOptions = { include: ['beta', 'alpha'] } as const satisfies ComponentDocsOptions<TestComponent>;

const props: PropDoc[] = [
  { name: 'zeta', type: 'string', required: false },
  { name: 'alpha', type: 'number', required: true },
  { name: 'beta', type: 'boolean', required: false },
  { name: 'gamma', type: '() => void', required: true }
];

describe('processPropsDoc', function processPropsDocTests() {
  it('includes only allowlisted props', function includeOnly() {
    const actual = processPropsDoc({ name: 'Thing', props }, includeOptions);

    expect(actual.props.map((prop) => prop.name)).toEqual(['alpha', 'beta']);
  });

  it('excludes blocklisted props', function excludeSome() {
    const actual = processPropsDoc({ name: 'Thing', props }, { exclude: ['alpha'] });

    expect(actual.props.map((prop) => prop.name)).toEqual(['gamma', 'beta', 'zeta']);
  });

  it('pins explicit order before required-first alphabetical fallback', function explicitOrder() {
    const actual = processPropsDoc({ name: 'Thing', props }, { order: ['zeta'] });

    expect(actual.props.map((prop) => prop.name)).toEqual(['zeta', 'alpha', 'gamma', 'beta']);
  });

  it('groups props and sorts within each group', function groupProps() {
    const actual = processPropsDoc(
      { name: 'Thing', props },
      {
        groups: {
          Events: ['gamma', 'beta'],
          Layout: ['zeta']
        }
      }
    );

    expect(actual.props).toMatchObject([
      { name: 'gamma', group: 'Events' },
      { name: 'beta', group: 'Events' },
      { name: 'zeta', group: 'Layout' },
      { name: 'alpha', group: undefined }
    ]);
  });
});

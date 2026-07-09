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

  it('categorizes props and sorts within each category', function categorizeProps() {
    const actual = processPropsDoc(
      { name: 'Thing', props },
      {
        categories: {
          Events: ['gamma', 'beta'],
          Layout: ['zeta']
        }
      }
    );

    expect(actual.props).toMatchObject([
      { name: 'gamma', category: 'Events' },
      { name: 'beta', category: 'Events' },
      { name: 'zeta', category: 'Layout' },
      { name: 'alpha', category: undefined }
    ]);
  });

  it('matches include, exclude, and categories with RegExp', function regexMatchers() {
    const eventProps: PropDoc[] = [
      { name: 'onClick', type: '() => void', required: false },
      { name: 'onPress', type: '() => void', required: false },
      { name: 'label', type: 'string', required: true }
    ];

    const included = processPropsDoc({ name: 'Thing', props: eventProps }, { include: [/^on/] });
    expect(included.props.map((prop) => prop.name)).toEqual(['onClick', 'onPress']);

    const excluded = processPropsDoc({ name: 'Thing', props: eventProps }, { exclude: [/^on/] });
    expect(excluded.props.map((prop) => prop.name)).toEqual(['label']);

    const categorized = processPropsDoc({ name: 'Thing', props: eventProps }, { categories: { Events: [/^on/] } });
    expect(categorized.props).toMatchObject([
      { name: 'onClick', category: 'Events' },
      { name: 'onPress', category: 'Events' },
      { name: 'label', category: undefined }
    ]);
  });

  it('assigns a prop to the first declared category that matches', function firstMatchWins() {
    const eventProps: PropDoc[] = [{ name: 'onClick', type: '() => void', required: false }];

    const actual = processPropsDoc(
      { name: 'Thing', props: eventProps },
      { categories: { Events: [/^on/], Special: ['onClick'] } }
    );

    expect(actual.props).toMatchObject([{ name: 'onClick', category: 'Events' }]);
  });
});

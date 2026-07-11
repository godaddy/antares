import { describe, expect, it } from 'vitest';
import { mergeDocsOptions, processPropsDoc } from '../src/process.ts';
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

  it('pins primary props before the required-first alphabetical fallback', function explicitPrimary() {
    const actual = processPropsDoc({ name: 'Thing', props }, { primary: ['zeta'] });

    expect(actual.props.map((prop) => prop.name)).toEqual(['zeta', 'alpha', 'gamma', 'beta']);
  });

  it('pins a RegExp-matched group to the front, required-first then alphabetical within it', function regexPrimary() {
    // All three share rank 0, so they tie-break required-first then alphabetical;
    // the unmatched required `gamma` follows the pinned optionals.
    const actual = processPropsDoc({ name: 'Thing', props }, { primary: [/^(alpha|beta|zeta)$/] });

    expect(actual.props.map((prop) => prop.name)).toEqual(['alpha', 'beta', 'zeta', 'gamma']);
  });

  it('lets an earlier primary entry shadow a later one (first match wins)', function primaryShadowing() {
    // `alpha` matches /^a/ at index 0, so the later explicit 'alpha' is unreachable.
    const actual = processPropsDoc({ name: 'Thing', props }, { primary: [/^a/, 'beta', 'alpha'] });

    expect(actual.props.map((prop) => prop.name)).toEqual(['alpha', 'beta', 'gamma', 'zeta']);
  });

  it('orders a mix of string and RegExp primary entries', function mixedPrimary() {
    const actual = processPropsDoc({ name: 'Thing', props }, { primary: ['gamma', /^(beta|zeta)$/] });

    expect(actual.props.map((prop) => prop.name)).toEqual(['gamma', 'beta', 'zeta', 'alpha']);
  });

  it('hoists a primary prop to the root even when a category matches it', function primaryBeatsCategory() {
    const actual = processPropsDoc(
      { name: 'Thing', props },
      { primary: ['alpha'], categories: { Greek: [/^(alpha|beta)$/] } }
    );

    expect(actual.props).toMatchObject([
      { name: 'beta', category: 'Greek' },
      { name: 'alpha', category: undefined },
      { name: 'gamma', category: undefined },
      { name: 'zeta', category: undefined }
    ]);
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

  it("orders props within a section by the category's matcher order, then required-first", function categoryOrder() {
    const eventProps: PropDoc[] = [
      { name: 'onClick', type: '() => void', required: false },
      { name: 'onChange', type: '() => void', required: false },
      { name: 'onBlur', type: '() => void', required: true }
    ];

    // `onChange` matches the first matcher (rank 0); `onBlur`/`onClick` tie at rank 1
    // and break required-first, then alphabetical.
    const actual = processPropsDoc(
      { name: 'Thing', props: eventProps },
      { categories: { Events: [/^onChange/, /^on/] } }
    );

    expect(actual.props.map((prop) => prop.name)).toEqual(['onChange', 'onBlur', 'onClick']);
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

  it('patches an existing prop and leaves its other fields intact', function overridePatch() {
    const actual = processPropsDoc(
      { name: 'Thing', props },
      { overrides: [{ name: 'alpha', description: 'custom', defaultValue: '1' }] }
    );

    expect(actual.props.find((prop) => prop.name === 'alpha')).toMatchObject({
      type: 'number',
      required: true,
      description: 'custom',
      defaultValue: '1'
    });
  });

  it('adds a prop for an exact name that was not extracted', function overrideAdd() {
    const actual = processPropsDoc(
      { name: 'Thing', props },
      { overrides: [{ name: 'onClick', type: '() => void', description: 'click' }] }
    );

    expect(actual.props.find((prop) => prop.name === 'onClick')).toEqual({
      name: 'onClick',
      type: '() => void',
      required: false,
      description: 'click'
    });
  });

  it('adds a bare prop with an unknown type when only a name is given', function overrideAddBare() {
    const actual = processPropsDoc({ name: 'Thing', props }, { overrides: [{ name: 'id' }] });

    expect(actual.props.find((prop) => prop.name === 'id')).toEqual({ name: 'id', type: 'unknown', required: false });
  });

  it('never creates a prop for a RegExp that matches nothing', function overrideRegexNoCreate() {
    const actual = processPropsDoc({ name: 'Thing', props }, { overrides: [{ name: /^zzz/, description: 'x' }] });

    expect(actual.props.map((prop) => prop.name)).toEqual(['alpha', 'gamma', 'beta', 'zeta']);
  });

  it('stacks matching overrides, later fields winning', function overrideStacking() {
    const actual = processPropsDoc(
      { name: 'Thing', props },
      {
        overrides: [
          { name: /^a/, description: 'family' },
          { name: 'alpha', defaultValue: '() => {}' }
        ]
      }
    );

    expect(actual.props.find((prop) => prop.name === 'alpha')).toMatchObject({
      description: 'family',
      defaultValue: '() => {}'
    });
  });

  it('applies overrides before filtering, so exclude can still drop an added prop', function overrideThenExclude() {
    const added = processPropsDoc({ name: 'Thing', props }, { overrides: [{ name: 'id', type: 'string' }] });
    expect(added.props.some((prop) => prop.name === 'id')).toBe(true);

    const excluded = processPropsDoc(
      { name: 'Thing', props },
      { overrides: [{ name: 'id', type: 'string' }], exclude: ['id'] }
    );
    expect(excluded.props.some((prop) => prop.name === 'id')).toBe(false);
  });
});

describe('processPropsDoc ignoreSourceFiles', function ignoreSourceFilesTests() {
  const sourcedProps: PropDoc[] = [
    { name: 'variant', type: 'string', required: true, sourceFile: '/repo/packages/button/button.tsx' },
    { name: 'className', type: 'string', required: false, sourceFile: '/repo/node_modules/@types/react/index.d.ts' },
    { name: 'onClick', type: '() => void', required: false, sourceFile: '/repo/node_modules/@types/react/index.d.ts' },
    { name: 'added', type: 'string', required: false }
  ];

  it('drops props whose sourceFile contains a string matcher', function stringSubstring() {
    const actual = processPropsDoc({ name: 'Btn', props: sourcedProps }, { ignoreSourceFiles: '@types/react' });

    expect(actual.props.map((prop) => prop.name).sort()).toEqual(['added', 'variant']);
  });

  it('drops props whose sourceFile matches a RegExp', function regexMatch() {
    const actual = processPropsDoc({ name: 'Btn', props: sourcedProps }, { ignoreSourceFiles: /node_modules/ });

    expect(actual.props.map((prop) => prop.name).sort()).toEqual(['added', 'variant']);
  });

  it('never ignores a prop that has no sourceFile', function keepsUndefinedSource() {
    const actual = processPropsDoc({ name: 'Btn', props: sourcedProps }, { ignoreSourceFiles: [/.*/] });

    expect(actual.props.map((prop) => prop.name)).toEqual(['added']);
  });

  it('accepts an array of matchers', function arrayOfMatchers() {
    const actual = processPropsDoc(
      { name: 'Btn', props: sourcedProps },
      { ignoreSourceFiles: ['@types/react', /button\.tsx$/] }
    );

    expect(actual.props.map((prop) => prop.name)).toEqual(['added']);
  });

  it('ANDs with include, so an included prop from an ignored file is still dropped', function andsWithInclude() {
    const actual = processPropsDoc(
      { name: 'Btn', props: sourcedProps },
      { include: ['variant', 'onClick'], ignoreSourceFiles: '@types/react' }
    );

    expect(actual.props.map((prop) => prop.name)).toEqual(['variant']);
  });
});

describe('mergeDocsOptions ignoreSourceFiles', function mergeIgnoreSourceFilesTests() {
  it('inherits ignoreSourceFiles from defaults when the call omits it', function inherits() {
    const merged = mergeDocsOptions({ ignoreSourceFiles: '@types/react' }, { primary: ['label'] });

    expect(merged.ignoreSourceFiles).toBe('@types/react');
  });

  it('lets the call replace the defaults ignoreSourceFiles', function replaces() {
    const merged = mergeDocsOptions({ ignoreSourceFiles: '@types/react' }, { ignoreSourceFiles: [/node_modules/] });

    expect(merged.ignoreSourceFiles).toEqual([/node_modules/]);
  });
});

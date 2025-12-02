import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { beforeEach, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { withSlots, library } from '@bento/slots';
import { Nested } from '../examples/nested.tsx';
import { Box, defaults } from '@bento/box';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import assume from 'assume';
import React from 'react';

describe('@bento/slots', function bento() {
  describe('withSlots', function slots() {
    it('is a function', function fn() {
      assume(withSlots).is.a('function');
    });

    it('returns a Component with a displayName', function component() {
      const Component = withSlots('Test', () => null);
      assume(Component.displayName).equals('Slotted(Test)');
    });
  });

  describe('library', function registration() {
    beforeEach(function each() {
      library.clear();
    });

    it('is a set', function set() {
      assume(library).is.a('set');
      assume(library.size).equals(0);
    });

    it('registers the component', function register() {
      withSlots('example', () => null);

      assume(library.has('example')).is.true();
    });

    it('throws a @bento/error when registering a duplicate name', function dupe() {
      withSlots('example', () => null);

      assume(library.has('example')).is.true();
      assume(() => withSlots('example', () => null)).throws('@bento/slots(withSlots)');
      assume(() => withSlots('example', () => null)).throws('has already been registered.');

      assume(library.size).equals(1);
    });
  });

  describe('slots', function nested() {
    it('can render components without a `slot` property', function render() {
      const Plain = withSlots('Plain', (props: any) => React.createElement('p', props, 'Hello World'));
      const plain = renderToString(React.createElement(Plain, { id: 'example' }));

      assume(plain).contains('<p id="example">Hello World</p>');
    });

    it('renders the nested components', function render() {
      const nested = renderToString(React.createElement(Nested, null));

      assume(nested).contains('Hello World');
      assume(nested).contains('Click Me');
    });

    it('uses dot notation to deeply affect slots', function override() {
      const verify = assume.plan(6);
      const nested = renderToString(
        React.createElement(Nested, {
          slots: {
            'example-container.label': function overrideLabel({ props, original }: any) {
              assume(props.htmlFor).equals('example');
              assume(props.children).equals('Hello World');

              assume(original.props.htmlFor).equals('example');
              assume(original.props.children).equals('Hello World');

              return 'Overridden';
            }
          }
        })
      );

      assume(nested).contains('Overridden');
      assume(nested).contains('Click Me');

      verify();
    });

    it('can override the components used', function override() {
      let id;

      const value = defaults();
      value.env.components = {
        SlotsButton: function Button(props) {
          assume(props['data-override']).equals('context');
          assume(props.id).startsWith(':R');
          id = props.id;

          return React.createElement('p', props, 'No more button, only text');
        }
      };

      const nested = renderToString(React.createElement(Box.Provider, { value }, React.createElement(Nested)));

      assume(nested).contains('Hello World');
      assume(nested).does.not.contain('Click Me');
      assume(nested).contains(`<p id="${id}" data-override="context" data-slot="button">No more button, only text</p>`);
    });
  });

  describe('data-slot attribute', function dataSlot() {
    it('adds data-slot attribute when slot prop is provided', function withSlot() {
      const Component = withSlots('TestSlot', (props: any) => React.createElement('div', props, 'Content'));
      const html = renderToString(React.createElement(Component, { slot: 'example' }));

      assume(html).contains('data-slot="example"');
      assume(html).contains('<div data-slot="example">Content</div>');
    });

    it('does not add data-slot attribute when slot prop is not provided', function noSlot() {
      const Component = withSlots('NoSlot', (props: any) => React.createElement('div', props, 'Content'));
      const html = renderToString(React.createElement(Component));

      assume(html).does.not.contain('data-slot');
      assume(html).contains('<div>Content</div>');
    });

    it('adds data-slot with direct slot name when nested', function nestedSlot() {
      const Inner = withSlots('Inner', (props: any) => React.createElement('span', props, 'Inner'));
      const Outer = withSlots('Outer', (props: any) =>
        React.createElement('div', props, React.createElement(Inner, { slot: 'inner' }))
      );

      const html = renderToString(React.createElement(Outer, { slot: 'outer' }));

      assume(html).contains('data-slot="outer"');
      assume(html).contains('data-slot="inner"');
    });

    it('preserves data-slot when other data attributes are present', function multipleDataAttrs() {
      const Component = withSlots('MultiData', (props: any) => React.createElement('div', props, 'Content'));
      const html = renderToString(
        React.createElement(Component, {
          slot: 'test',
          'data-testid': 'my-test'
        })
      );

      assume(html).contains('data-slot="test"');
      assume(html).contains('data-testid="my-test"');
    });

    it('adds data-slot to deeply nested components', function deepNesting() {
      const nested = renderToString(
        React.createElement(Nested, {
          slots: {
            'example-container': { slot: 'custom-container' }
          }
        })
      );

      assume(nested).contains('data-slot');
    });
  });

  describe('modifiers', function modifiers() {
    it('allows custom modifiers to be passed', function custom() {
      let ran = false;

      function Custom() {
        return null;
      }

      function modifier(data: any) {
        assume(data).is.a('object');
        assume(data.props).is.a('object');
        assume(data.props.id).equals('example');
        // Custom is wrapped with forwardRef since it has 0 parameters (length !== 1)
        // so data.Component will be the wrapped version, not the original
        assume(data.Component).exist();

        assume(data.context.env).is.a('object');
        assume(data.context.slots).is.a('object');
        assume(data.context.slots.assigned).is.a('object');
        assume(data.context.slots.namespace).is.a('array');
        assume(data.context.slots.override).is.false();
        assume(data.context.env.components).is.a('object');

        assume(data.name).equals('CustomNameHere');

        ran = true;
      }

      const Component: any = withSlots('CustomNameHere', Custom, [modifier as any]);

      renderToString(React.createElement(Component, { id: 'example' }));
      assume(ran).is.true();
    });

    it('throws when the modifier is not a function', function invalid() {
      let index = 0;
      function trigger() {
        withSlots('InvalidModifier' + index++, () => null, [{} as any]);
      }

      assume(trigger).throws('@bento/slots(withSlots)');
      assume(trigger).throws('The supplied component modifier is not a function.');
      assume(trigger).throws('https://example.com/docs/errors/#9F4D92');
    });
  });

  describe('Public API', function packageSuite() {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    describe('#exports', function exportsSuite() {
      Object.keys(pkg.exports).forEach(function each(subpaths) {
        describe(`${subpaths}`, function subpathsSuite() {
          const exportPath = (pkg.exports as any)[subpaths];

          if (typeof exportPath === 'string') {
            return it(`exports ${subpaths} exists`, async function exportedTest() {
              const path = resolve(__dirname, '..', exportPath);
              await fs.access(path, fs.constants.F_OK);
            });
          }

          Object.keys(exportPath).forEach(function each(exported) {
            if (typeof exportPath[exported] === 'string') {
              it(`conditional export "${exported}" exists for ${join(pkg.name, subpaths)}`, async function exportedTest() {
                const path = resolve(__dirname, '..', exportPath[exported]);
                await fs.access(path, fs.constants.F_OK);
              });
            } else {
              Object.keys(exportPath[exported]).forEach(function each(key) {
                it(`conditional export "${exported}.${key}" exists for ${join(pkg.name, subpaths)}`, async function exportedTest() {
                  const path = resolve(__dirname, '..', exportPath[exported][key]);
                  await fs.access(path, fs.constants.F_OK);
                });
              });
            }
          });
        });
      });
    });
  });
});

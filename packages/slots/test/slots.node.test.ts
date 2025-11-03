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
      assume(nested).contains(`<p id="${id}" data-override="context">No more button, only text</p>`);
    });
  });

  describe('generation tracking', function generationTracking() {
    it('verifies generation tracking is initialized', function initialization() {
      const ctx = defaults();

      // Check that generation tracking properties exist
      assume(ctx.env.lockGeneration).equals(0);
      assume(ctx.env.locked).equals(false);
      assume(ctx.slots.slotGenerations).is.a('object');
    });

    it('slots are correctly applied and tracked', function application() {
      const Child = withSlots('TrackChild', (props: any) => {
        return React.createElement('span', props, 'child');
      });

      const Parent = withSlots('TrackParent', (props: any) => {
        return React.createElement('div', props, React.createElement(Child, { slot: 'child' }));
      });

      const ctx = defaults();
      ctx.env.lockGeneration = 1;

      const html = renderToString(
        React.createElement(
          Box.Provider,
          { value: ctx },
          React.createElement(Parent, {
            slot: 'parent',
            slots: { child: { className: 'tracked' } }
          })
        )
      );

      // Verify slot is applied (with data-override since lockGeneration > 0)
      assume(html).contains('data-override="className slot"');
      assume(html).contains('child');
    });

    it('generation tracking does not break existing functionality', function noBreakage() {
      const Component = withSlots('NoBreakTest', (props: any) => {
        return React.createElement('div', props, props.children);
      });

      const ctx = defaults();

      const html = renderToString(
        React.createElement(
          Box.Provider,
          { value: ctx },
          React.createElement(Component, {
            id: 'test',
            className: 'example'
          }, 'content')
        )
      );

      // Verify normal rendering works
      assume(html).contains('id="test"');
      assume(html).contains('class="example"');
      assume(html).contains('content');
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
        assume(data.Component).equals(Custom);

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

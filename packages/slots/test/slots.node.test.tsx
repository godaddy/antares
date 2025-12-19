import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { beforeEach, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { withSlots, library, contains } from '@bento/slots';
import { Nested } from '../examples/nested.tsx';
import { SlotFunction } from '../examples/slot-function.tsx';
import { Box, defaults } from '@bento/box';
import { useProps } from '@bento/use-props';
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
      const Plain = withSlots('Plain', (props: any) => <p {...props}>Hello World</p>);
      const plain = renderToString(<Plain id="example" />);

      assume(plain).contains('<p id="example">Hello World</p>');
    });

    it('renders the nested components', function render() {
      const nested = renderToString(<Nested />);

      assume(nested).contains('Hello World');
      assume(nested).contains('Click Me');
    });

    it('uses dot notation to deeply affect slots', function override() {
      const verify = assume.plan(6);
      const nested = renderToString(
        <Nested
          slots={{
            'example-container.label': function overrideLabel({ props, original }: any) {
              assume(props.htmlFor).equals('example');
              assume(props.children).equals('Hello World');

              assume(original.props.htmlFor).equals('example');
              assume(original.props.children).equals('Hello World');

              return 'Overridden';
            }
          }}
        />
      );

      assume(nested).contains('Overridden');
      assume(nested).contains('Click Me');

      verify();
    });

    it('can override the components used', function override() {
      let id;

      const value = defaults();
      // Set locked: true to trigger data-override behavior
      value.env.locked = true;
      value.env.lockGeneration = 1;
      value.env.components = {
        SlotsButton: function Button(props) {
          assume(props['data-override']).equals('context');
          assume(props.id).startsWith(':R');
          id = props.id;

          return <p {...props}>No more button, only text</p>;
        }
      };

      const nested = renderToString(
        <Box.Provider value={value}>
          <Nested />
        </Box.Provider>
      );

      assume(nested).contains('Hello World');
      assume(nested).does.not.contain('Click Me');
      // data-slot is added for slotted components (from main)
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

    it('adds data-slot when a slot override function is provided', function slotOverride() {
      const slotFunction = renderToString(React.createElement(SlotFunction));

      assume(slotFunction).contains('data-slot="example-container"');
      assume(slotFunction).contains('data-slot="label"');
      assume(slotFunction).contains('data-slot="button"');
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

      renderToString(<Component id="example" />);
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

  describe('contains', function containsSuite() {
    it('is a function', function fn() {
      assume(contains).is.a('function');
    });

    it('validates slots in a real compositional component', function realComponent() {
      // Create a parent component that requires specific child slots
      const Dialog = withSlots('ContainsDialog', function Dialog(props: any) {
        const { children } = props;

        // Validate that required slots are present
        if (!contains(['title', 'content'], children)) {
          throw new Error('Dialog requires title and content slots');
        }

        return <div className="dialog">{children}</div>;
      });

      const Title = withSlots('ContainsDialogTitle', (props: any) => <h1 {...props} />);
      const Content = withSlots('ContainsDialogContent', (props: any) => <div {...props} />);

      // Valid usage - should not throw
      const valid = renderToString(
        <Dialog>
          <Title slot="title">My Title</Title>
          <Content slot="content">My Content</Content>
        </Dialog>
      );

      assume(valid).contains('My Title');
      assume(valid).contains('My Content');

      // Invalid usage - missing content slot should throw
      assume(() =>
        renderToString(
          <Dialog>
            <Title slot="title">My Title</Title>
          </Dialog>
        )
      ).throws('Dialog requires title and content slots');
    });

    it('works with namespaced slots in nested components', function namespacedSlots() {
      // Parent component that validates deeply nested slot paths
      const Form = withSlots('ContainsForm', function Form(props: any) {
        const { children } = props;

        // Should find the top-level 'submit' slot
        assume(contains(['submit'], children)).is.true();

        // Should also find the nested 'submit.icon' path by traversing children
        assume(contains(['submit.icon'], children)).is.true();

        return <form>{children}</form>;
      });

      // Button component that can have nested icon slots - must use useProps to get slot values
      const Button = withSlots('ContainsButton', function Button(args: any) {
        const { props } = useProps(args);
        return <button {...props}>{props.children}</button>;
      });

      const Icon = withSlots('ContainsIcon', function Icon(args: any) {
        const { props } = useProps(args);
        return <span {...props} />;
      });

      // Valid: Button has slot="submit", Icon is nested inside with namespaced slot values
      const valid = renderToString(
        <Form slots={{ 'submit.icon': { className: 'custom-icon' } }}>
          <Button slot="submit">
            <Icon slot="icon">→</Icon>
            Submit
          </Button>
        </Form>
      );

      assume(valid).contains('<form>');
      assume(valid).contains('<button');
      assume(valid).contains('Submit');
      // The icon should get the custom class from namespaced slots prop
      assume(valid).contains('custom-icon');
    });

    it('validates with render prop children', function renderPropValidation() {
      const Dropdown = withSlots('ContainsDropdown', function Dropdown(props: any) {
        const { children } = props;
        const [open, setOpen] = React.useState(false);

        // Render props can't be validated - contains returns true for functions
        assume(contains(['trigger', 'menu'], children)).is.true();

        // Execute the render prop
        const rendered = typeof children === 'function' ? children({ open, setOpen }) : children;

        return <div className="dropdown">{rendered}</div>;
      });

      const Button = withSlots('ContainsDropdownButton', (props: any) => <button {...props} />);
      const Menu = withSlots('ContainsDropdownMenu', (props: any) => <ul {...props} />);

      // Render prop usage
      const output = renderToString(
        <Dropdown>
          {({ open }: any) => (
            <>
              <Button slot="trigger">Toggle</Button>
              {open && (
                <Menu slot="menu">
                  <li>Item</li>
                </Menu>
              )}
            </>
          )}
        </Dropdown>
      );

      assume(output).contains('dropdown');
    });

    it('returns false when children are null or undefined', function nullUndefined() {
      assume(contains(['trigger'], null)).is.false();
      assume(contains(['trigger'], undefined)).is.false();
    });

    it('returns true when checking for empty slot array', function emptyArray() {
      assume(contains([], <div>anything</div>)).is.true();
    });

    it('searches through wrapper components without slot props', function wrapperSearch() {
      const Content = withSlots('ContainsWrapperContent', (props: any) => <div {...props} />);

      // Content with slot="content" is wrapped in a div without a slot prop
      // contains() should still find it by searching through the wrapper
      const children = (
        <div className="wrapper">
          <Content slot="content">My Content</Content>
        </div>
      );

      assume(contains(['content'], children)).is.true();
    });

    it('ignores raw HTML elements with slot props (not withSlots components)', function ignoresRawElements() {
      const Content = withSlots('ContainsValidContent', (props: any) => <div {...props} />);

      // A raw div with slot="invalid" should be ignored
      // Only the withSlots component with slot="content" should be found
      const children = (
        <>
          <div slot="invalid">This is not a withSlots component</div>
          <Content slot="content">Valid slotted content</Content>
        </>
      );

      assume(contains(['content'], children)).is.true();
      assume(contains(['invalid'], children)).is.false(); // Raw div is ignored
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

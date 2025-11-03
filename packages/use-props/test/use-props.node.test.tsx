import { useProps, renderProp, isEventListener, execute } from '../src/index.ts';
import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { renderToString } from 'react-dom/server';
import { Box, defaults } from '@bento/box';
import { withSlots } from '@bento/slots';
import { UnknownObject } from '@bento/types';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'vitest';
import fs from 'node:fs/promises';
import util from 'node:util';
import assume from 'assume';
import React from 'react';

describe('@bento/use-props', function bento() {
  describe('isEventListener', function listener() {
    it('is a function', function fn() {
      assume(isEventListener).is.a('function');
    });

    it('detects event listeners', function event() {
      assume(isEventListener('onClick')).is.true();
      assume(isEventListener('onMouseOver')).is.true();
      assume(isEventListener('onFocus')).is.true();
      assume(isEventListener('onBlur')).is.true();
      assume(isEventListener('onTouchStart')).is.true();
    });

    it('does not detect non-event listeners', function nonEvent() {
      assume(isEventListener('foo')).is.false();
      assume(isEventListener('bar')).is.false();
      assume(isEventListener('baz')).is.false();
    });
  });

  describe('execute', function exec() {
    it('is a function', function fn() {
      assume(execute).is.a('function');
    });
  });

  describe('renderProp', function render() {
    it('is a function', function fn() {
      assume(renderProp).is.a('function');
    });

    it('can look up undefined properties', function undef() {
      const result = renderProp('foo', {
        props: {},
        slots: {},
        state: {}
      });

      assume(result).is.a('undefined');
    });

    it('returns the value from the props if it doesnt exist in slots', function props() {
      const result = renderProp('foo', {
        props: { foo: 'bar' },
        slots: {},
        state: {}
      });

      assume(result).equals('bar');
    });

    it('returns the value from the slots if it exists', function slots() {
      const result = renderProp('foo', {
        props: { foo: 'bar' },
        slots: { foo: 'baz' },
        state: {}
      });

      assume(result).equals('baz');
    });

    it('executes the function if the value is a function', function func() {
      const result = renderProp('foo', {
        original: 'batman',
        props: { foo: 'bar' },
        slots: {
          foo: function foo(args: Record<string, any>) {
            assume(args).is.a('object');
            assume(args.props.foo).equals('bar');
            assume(args.original).equals('batman');
            assume(args.state).is.a('object');
            assume(args.slots.foo).equals(args.slots.foo);
            assume(args.slots.foo).equals(foo);

            return args.original.toUpperCase();
          }
        },
        state: {}
      });

      assume(result).equals('BATMAN');
    });

    it('receives the original, state, and props as arguments', function args() {
      const done = assume.plan(6);
      const allProps = { foo: 'bar' };
      const currentState = { foo: 'baz' };

      function foo({ original, state, props, slots, ...rest }: Record<string, any>) {
        assume(rest).is.size(0);
        assume(original).equals('bar');
        assume(props).equals(allProps);
        assume(state).equals(currentState);
        assume(slots.foo).equals(foo);

        return `${original}-${state.foo}-${original}`;
      }

      const result = renderProp('foo', {
        original: 'bar',
        props: allProps,
        slots: { foo },
        state: currentState
      });

      assume(result).equals('bar-baz-bar');
      done();
    });
  });

  describe('useProps', function renderProps() {
    /**
     * Creates a component with the specified name, props, and slots.
     *
     * @param {string} name - The name of the component.
     * @param {object} [props={}] - The props to pass to the component.
     * @param {object} [slots={}] - The slots to pass to the component.
     * @returns {object} An object containing the rendered HTML string, the props, and the apply function.
     * @property {string} html - The rendered HTML string.
     * @property {object} props - The props used in the component.
     * @property {function} apply - The apply function returned by useProps.
     * @private
     */
    function createComponent(name: string, props = {}, slots = {}) {
      let result: any;

      const TestReturn = withSlots(`BentoRenderProps-${name}`, function Component(args) {
        result = useProps(args, { hello: 'world' });
        return React.createElement('div', result.props);
      });

      // Use defaults for context and override slots
      const context = defaults();
      context.slots.assigned = { test: slots };
      context.slots.namespace = [];
      context.slots.override = false;

      return {
        html: renderToString(
          React.createElement(
            Box.Provider,
            { value: context },
            React.createElement(TestReturn, { slot: 'test', ...props })
          )
        ),
        props: result.props,
        apply: result.apply
      };
    }

    it('is a function', function fn() {
      assume(useProps).is.a('function');
    });

    it('can be used without a provided context', function noContext() {
      function Component(args: UnknownObject) {
        const { props } = useProps(args);

        return React.createElement('div', props);
      }

      const html = renderToString(React.createElement(Component, { id: 'example' }));
      assume(html).contains('<div id="example"></div>');
    });

    it('returns a destructured array', function array() {
      const { html, props, apply } = createComponent('array', { id: 'example' });

      assume(html).contains('<div id="example"></div>');
      assume(props.id).equals('example');
      assume(apply).is.a('function');
    });

    describe('props', function props() {
      it('is a proxy', function proxy() {
        const { props } = createComponent('proxy', { id: 'example' });

        assume(util.types.isProxy(props)).is.true();
      });

      it('can access the props through the props-proxy', function access() {
        const { props } = createComponent('access', { id: 'example' });

        assume(props.id).equals('example');
        assume(props.foo).is.a('undefined');
      });

      it('uses the slot value if it exists', function slot() {
        const { props } = createComponent('slot', { id: 'example' }, { id: 'modified' });

        assume(props.id).equals('modified');
      });

      it('executes the slot function if it exists', function slot() {
        const { props } = createComponent(
          'slotfn',
          { id: 'example' },
          {
            id: function idFunction({ original, props, slots, state }: Record<string, any>) {
              assume(original).equals('example');
              assume(props.id).equals('example');

              assume(slots).is.a('object');
              assume(slots).is.size(1);
              assume(slots.id).equals(idFunction);

              assume(state.hello).equals('world');

              return 'modified';
            }
          }
        );

        assume(props.id).equals('modified');
      });

      it('executes render prop functions through proxy getter', function proxyGetter() {
        const { props } = createComponent('proxy-getter', {
          title: function titleFunction(args: Record<string, any>) {
            if (!args.original) return 'my title';
            return args.original.toUpperCase();
          }
        });

        assume(props.title).equals('my title');
      });

      it('merges slot props directly without internal-props separation', function noInternalProps() {
        const { props } = createComponent(
          'no-internal',
          {
            id: 'component',
            className: 'from-props'
          },
          {
            className: 'from-slot',
            'data-test': 'slot-data'
          }
        );

        // Slot values should override component props directly
        assume(props.id).equals('component');
        assume(props.className).equals('from-slot');
        assume(props['data-test']).equals('slot-data');
      });
    });

    describe('apply', function applying() {
      it('is a function', function fn() {
        const { apply } = createComponent('apply', { id: 'example' });

        assume(apply).is.a('function');
      });

      it('returns the props if no arguments are provided', function noArgs() {
        const { apply } = createComponent('noargs', { id: 'example' });

        const result = apply();

        assume(result).is.size(1);
        assume(result).deep.equals({ id: 'example' });
      });

      it('executes the renderProp function if it exists', function renderProp() {
        const { apply } = createComponent('idfunction', {
          title: function titleFunction(args: Record<string, any>) {
            if (!args.original) return 'my title';
            return args.original.toUpperCase();
          }
        });

        const result = apply({ title: 'example-world' });

        assume(result).is.size(1);
        assume(result.title).equals('EXAMPLE-WORLD');
      });

      it('uses the slot value if it exists', function slot() {
        const { apply } = createComponent(
          'apply-slot',
          {
            id: 'example'
          },
          {
            id: 'modified'
          }
        );

        const result = apply();

        assume(result).is.size(2);
        assume(result).deep.equals({ id: 'modified', 'data-override': 'slot' });
      });

      it('excludes specified properties when no attributes are provided', function excludeNoAttrs() {
        const { apply } = createComponent('exclude-no-attrs', {
          foo: 'bar',
          baz: 'qux'
        });

        const result = apply(undefined, ['foo']);

        assume(result).is.size(1);
        assume(result).deep.equals({ baz: 'qux' });
      });

      it('excludes specified properties when attributes are provided', function excludeWithAttrs() {
        const { apply } = createComponent('exclude-with-attrs', {
          foo: 'bar',
          baz: 'qux'
        });

        const result = apply({ id: 'example' }, ['foo']);

        assume(result).is.size(2);
        assume(result).deep.equals({ id: 'example', baz: 'qux' });
      });
    });

    it('it prefers the slot value over the supplied prop', function requested() {
      const { apply } = createComponent(
        'supplied',
        {
          id: 'example'
        },
        {
          id: 'modified'
        }
      );

      const result = apply({ id: 'hello-there' });
      assume(result.id).equals('modified');
      assume(result['data-override']).equals('slot');
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
            Object.keys(exportPath[exported]).forEach(function each(key) {
              it(`conditional export "${exported}.${key}" exists for ${join(pkg.name, subpaths)}`, async function exportedTest() {
                const path = resolve(__dirname, '..', exportPath[exported][key]);
                await fs.access(path, fs.constants.F_OK);
              });
            });
          });
        });
      });
    });
  });
});

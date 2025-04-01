import { override } from '@bento/slots/modifiers/override';
import { renderToString } from 'react-dom/server';
import { Slot } from '@bento/slots/context';
import { withSlots } from '@bento/slots';
import { describe, it } from 'vitest';
import assume from 'assume';
import React from 'react';

describe('@bento/modifiers/override', function bento() {
  function createComponent(name: string, props = {}, slots = {}, components = {}) {
    const TestReturn = withSlots(`BentoOverride-${name}`, function Component(args: any) {
      return React.createElement('div', { ...args });
    });

    return renderToString(
      React.createElement(
        Slot.Provider,
        {
          value: {
            override: false,
            namespace: [],
            slots: { test: slots },
            components: components
          }
        },
        React.createElement(TestReturn, { slot: 'test', ...props })
      )
    );
  }

  it('exposes the function', function exposes() {
    assume(override).is.a('function');
  });

  it('does not introduce data-override by default', function noOverride() {
    const html = createComponent('noOverride', { id: 'example', role: 'presentation' });
    assume(html).contains('<div id="example" role="presentation"></div>');
  });

  it('introduces data-override when style is present', function style() {
    const html = createComponent('style', { style: { color: 'red' } });
    assume(html).contains('<div style="color:red" data-override="style"></div>');
  });

  it('introduces data-override when className is present', function className() {
    const html = createComponent('className', { className: 'example' });
    assume(html).contains('<div class="example" data-override="className"></div>');
  });

  it('adds to an existing data-override', function existing() {
    const html = createComponent('existing', { style: { color: 'red' }, 'data-override': 'boink' });
    assume(html).contains('<div style="color:red" data-override="boink style"></div>');
  });

  it('seperates multiple causes with a space', function multiple() {
    const html = createComponent('multiple', {
      style: { color: 'red' },
      className: 'example'
    });

    assume(html).contains('<div style="color:red" class="example" data-override="className style"></div>');
  });

  it('introduces data-override when a slot override is used', function slot() {
    const html = createComponent(
      'slot',
      {},
      {
        style: { color: 'red' }
      }
    );

    assume(html).contains('<div data-override="style slot"></div>');
  });

  it('introduces data-override when a component is replaced through Slot.Context', function context() {
    const html = createComponent(
      'context',
      {
        style: { color: 'red' }
      },
      {},
      {
        'BentoOverride-context': function Component(props: any) {
          assume(props['data-override']).equals('context style');
          return React.createElement('div', props);
        }
      }
    );

    assume(html).contains('<div style="color:red" data-override="context style"></div>');
  });

  it('inherits the context override from the parent component', function parent() {
    const Kiddo = withSlots(`BentoOverride-Kiddo`, function Component(args: any) {
      return React.createElement('p', args, args.children);
    });

    const Parent = withSlots(`BentoOverride-Parent`, function Component(args) {
      return React.createElement(
        'section',
        args,
        React.createElement(
          Kiddo,
          {
            id: 'example',
            slot: 'kiddo'
          },
          'Hello World'
        )
      );
    });

    const html = renderToString(
      React.createElement(
        Slot.Provider,
        {
          value: {
            override: false,
            namespace: [],
            slots: {},
            components: {
              'BentoOverride-Parent': function Parent(props) {
                assume(props['data-override']).equals('context');

                //
                // It is intentional that we are not passing down the props into
                // the created element below, this is to simulate if someone
                // would remove the props from the component. A child component
                // should still be able to indicate that a parent was overridden.
                //
                return React.createElement('div', null, React.createElement(Kiddo, null, 'Should have data-override'));
              }
            }
          }
        },
        React.createElement(Parent)
      )
    );

    assume(html).equals('<div><p data-override="context">Should have data-override</p></div>');
  });
});

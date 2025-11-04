import { override } from '@bento/slots';
import { renderToString } from 'react-dom/server';
import { withSlots } from '@bento/slots';
import { describe, it } from 'vitest';
import { Box, defaults } from '@bento/box';
import { Environment } from '@bento/environment';
import { useProps } from '@bento/use-props';
import assume from 'assume';
import React from 'react';

describe('@bento/slots override', function bento() {
  function createComponent(name: string, props = {}, slots = {}, components = {}) {
    const TestReturn = withSlots(`BentoOverride-${name}`, function Component(args: any) {
      return React.createElement('div', { ...args });
    });

    const value = defaults();
    value.slots.assigned = { test: slots };
    value.env.components = components;

    return renderToString(
      React.createElement(Box.Provider, { value }, React.createElement(TestReturn, { slot: 'test', ...props }))
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

  it('does not introduce a data-override when CSS variables are introduced', function cssVariables() {
    const html = createComponent('cssVariables', { style: { '--color': 'red' } });
    assume(html).contains('<div style="--color:red"></div>');
  });

  it('introduces data-override when CSS variables and another style property are present', function cssVariablesAndStyle() {
    const html = createComponent('cssVariablesAndStyle', { style: { '--color': 'red', color: 'blue' } });
    assume(html).contains('<div style="--color:red;color:blue" data-override="style"></div>');
  });

  it('introduces data-override when className is present', function className() {
    const html = createComponent('className', { className: 'example' });
    assume(html).contains('<div class="example" data-override="className"></div>');
  });

  it('adds to an existing data-override', function existing() {
    const html = createComponent('existing', { style: { color: 'red' }, 'data-override': 'boink' });
    assume(html).contains('<div style="color:red" data-override="boink style"></div>');
  });

  it('separates multiple causes with a space', function multiple() {
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

    const value = defaults();
    value.env.components = {
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
    };

    const html = renderToString(React.createElement(Box.Provider, { value }, React.createElement(Parent)));

    assume(html).equals('<div><p data-override="context">Should have data-override</p></div>');
  });

  describe('lock-based override detection', function lockBasedOverrides() {
    it('does not flag className when environment is locked and slot is from same generation', function lockedSameGen() {
      const TestComponent = withSlots('LockSameGen', function Component(args: any) {
        const { props } = useProps(args);
        return React.createElement('div', props);
      });

      const html = renderToString(
        React.createElement(Environment, {
          lock: true,
          children: React.createElement(TestComponent, { slot: 'test', className: 'internal' })
        })
      );

      // Should NOT have data-override since it's internal composition (same generation)
      assume(html).contains('<div class="internal"></div>');
      assume(html).does.not.contain('data-override');
    });

    it('flags className when environment is locked and slot is from earlier generation', function lockedEarlierGen() {
      const InnerComponent = withSlots('LockEarlierGen', function Component(args: any) {
        const { props } = useProps(args);
        return React.createElement('div', props);
      });

      const LockedDesignComponent = withSlots('LockEarlierGenDesign', function Component(props: any) {
        return React.createElement(Environment, {
          lock: true,
          children: React.createElement(InnerComponent, { ...props, slot: 'test' })
        });
      });

      const html = renderToString(
        React.createElement(Environment, {
          children: React.createElement(LockedDesignComponent, {
            className: 'consumer',
            slots: {
              test: {}
            }
          })
        })
      );

      // SHOULD have data-override since it's from earlier generation (consumer modification)
      assume(html).contains('<div class="consumer" data-override="className slot"></div>');
    });

    it('flags slot modifications from earlier generation even without className or style', function slotOnly() {
      const InnerComponent = withSlots('LockSlotOnly', function Component(args: any) {
        const { props } = useProps(args);
        return React.createElement('div', props);
      });

      const LockedDesignComponent = withSlots('LockSlotOnlyDesign', function Component(props: any) {
        return React.createElement(Environment, {
          lock: true,
          children: React.createElement(InnerComponent, { ...props, slot: 'test' })
        });
      });

      const html = renderToString(
        React.createElement(Environment, {
          children: React.createElement(LockedDesignComponent, {
            slots: {
              test: { children: 'Hello' }
            }
          })
        })
      );

      // SHOULD have data-override="slot" since slot is from earlier generation
      assume(html).contains('<div data-override="slot">Hello</div>');
    });

    it('does not flag slots when not locked', function notLocked() {
      const InnerComponent = withSlots('NotLocked', function Component(args: any) {
        const { props } = useProps(args);
        return React.createElement('div', props);
      });

      const Component = withSlots('NotLockedDesign', function Component(props: any) {
        return React.createElement(InnerComponent, { ...props, slot: 'test' });
      });

      const html = renderToString(
        React.createElement(Environment, {
          children: React.createElement(Component, {
            style: { color: 'red' },
            slots: {
              test: { className: 'test' }
            }
          })
        })
      );

      // Original behavior: flags className and style
      assume(html).contains('<div style="color:red" data-override="style className slot"></div>');
    });

    it('flags style modifications from earlier generation when locked', function lockedStyleEarlier() {
      const InnerComponent = withSlots('LockStyleEarlier', function Component(args: any) {
        const { props } = useProps(args);
        return React.createElement('div', props);
      });

      const LockedDesignComponent = withSlots('LockStyleEarlierDesign', function Component(props: any) {
        return React.createElement(Environment, {
          lock: true,
          children: React.createElement(InnerComponent, { ...props, slot: 'test' })
        });
      });

      const html = renderToString(
        React.createElement(Environment, {
          children: React.createElement(LockedDesignComponent, {
            style: { color: 'blue' },
            slots: {
              test: {}
            }
          })
        })
      );

      // SHOULD have data-override for style from earlier generation
      assume(html).contains('<div style="color:blue" data-override="style slot"></div>');
    });
  });
});

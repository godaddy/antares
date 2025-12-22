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
  function createComponent(name: string, props = {}, slots = {}, components = {}, locked = false) {
    const TestReturn = withSlots(`BentoOverride-${name}`, function Component(args: any) {
      return React.createElement('div', { ...args });
    });

    if (locked) {
      // When locked, just pass slots directly to the component via the slots prop
      const child = React.createElement(TestReturn, { slot: 'test', slots: { test: slots }, ...props });
      return renderToString(React.createElement(Environment, { lock: true, components, children: child }));
    }

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

  describe('default behavior (no locked Environment)', function defaultBehavior() {
    it('does not introduce data-override by default', function noOverride() {
      const html = createComponent('noOverride', { id: 'example', role: 'presentation' });
      // data-slot="test" is added for slotted components (from main)
      assume(html).contains('<div id="example" role="presentation" data-slot="test"></div>');
      assume(html).does.not.contain('data-override');
    });

    it('does not add data-override when style is present', function style() {
      const html = createComponent('style', { style: { color: 'red' } });
      assume(html).contains('<div style="color:red" data-slot="test"></div>');
      assume(html).does.not.contain('data-override');
    });

    it('does not introduce data-override for CSS variables', function cssVariables() {
      const html = createComponent('cssVariables', { style: { '--color': 'red' } });
      assume(html).contains('<div style="--color:red" data-slot="test"></div>');
      assume(html).does.not.contain('data-override');
    });

    it('does not add data-override when CSS variables and style are present', function cssVariablesAndStyle() {
      const html = createComponent('cssVariablesAndStyle', { style: { '--color': 'red', color: 'blue' } });
      assume(html).contains('<div style="--color:red;color:blue" data-slot="test"></div>');
      assume(html).does.not.contain('data-override');
    });

    it('does not introduce data-override when className is present', function className() {
      const html = createComponent('className', { className: 'example' });
      assume(html).contains('<div class="example" data-slot="test"></div>');
      assume(html).does.not.contain('data-override');
    });

    it('does not introduce data-override when existing data-override is present', function existing() {
      const html = createComponent('existing', { style: { color: 'red' }, 'data-override': 'boink' });
      assume(html).contains('<div style="color:red" data-override="boink" data-slot="test"></div>');
    });

    it('does not add data-override for multiple style triggers', function multiple() {
      const html = createComponent('multiple', {
        style: { color: 'red' },
        className: 'example'
      });

      assume(html).contains('<div style="color:red" class="example" data-slot="test"></div>');
      assume(html).does.not.contain('data-override="');
    });

    it('does not introduce data-override when a slot override is used', function slot() {
      const html = createComponent(
        'slot',
        {},
        {
          style: { color: 'red' }
        }
      );

      assume(html).contains('<div data-slot="test"></div>');
      assume(html).does.not.contain('data-override');
    });

    it('does not introduce data-override when a component is replaced through Slot.Context', function context() {
      const html = createComponent(
        'context',
        {
          style: { color: 'red' }
        },
        {},
        {
          'BentoOverride-context': function Component(props: any) {
            assume(props['data-override']).equals(undefined);
            return React.createElement('div', props);
          }
        }
      );

      assume(html).contains('<div style="color:red" data-slot="test"></div>');
      assume(html).does.not.contain('data-override');
    });
  });

  describe('locked Environment behavior', function lockedBehavior() {
    it('introduces data-override when style is present via slot in locked environment', function styleWithLock() {
      // Style must be passed via slots (not direct props) to trigger override detection
      const InnerComponent = withSlots('StyleLockInner', function Component(args: any) {
        const { props } = useProps(args);
        return React.createElement('div', props);
      });

      const LockedComponent = withSlots('StyleLockOuter', function Component(props: any) {
        return React.createElement(Environment, {
          lock: true,
          children: React.createElement(InnerComponent, { ...props, slot: 'test' })
        });
      });

      // Pass style via slots prop to trigger slot-based override detection
      const html = renderToString(
        React.createElement(LockedComponent, { slots: { test: { style: { color: 'red' } } } })
      );

      assume(html).contains('data-override');
      assume(html).contains('style');
      assume(html).contains('data-slot="test"');
    });

    it('introduces data-override when className is present via slot in locked environment', function classNameWithLock() {
      const InnerComponent = withSlots('ClassLockInner', function Component(args: any) {
        const { props } = useProps(args);
        return React.createElement('div', props);
      });

      const LockedComponent = withSlots('ClassLockOuter', function Component(props: any) {
        return React.createElement(Environment, {
          lock: true,
          children: React.createElement(InnerComponent, { ...props, slot: 'test' })
        });
      });

      // Pass className via slots prop to trigger slot-based override detection
      const html = renderToString(React.createElement(LockedComponent, { slots: { test: { className: 'example' } } }));

      assume(html).contains('data-override');
      assume(html).contains('className');
      assume(html).contains('data-slot="test"');
    });

    it('does not introduce data-override for CSS variables in locked environment', function cssVariablesLocked() {
      const InnerComponent = withSlots('CSSVarLockInner', function Component(args: any) {
        const { props } = useProps(args);
        return React.createElement('div', props);
      });

      const LockedComponent = withSlots('CSSVarLockOuter', function Component(props: any) {
        return React.createElement(Environment, {
          lock: true,
          children: React.createElement(InnerComponent, { ...props, slot: 'test' })
        });
      });

      const html = renderToString(
        React.createElement(LockedComponent, { slots: { test: { style: { '--color': 'red' } } } })
      );

      // CSS-variable-only style should NOT trigger data-override
      assume(html).contains('style="--color:red"');
      assume(html).contains('data-slot="test"');
      assume(html).does.not.contain('data-override');
    });

    it('separates multiple causes with a space in locked environment', function multipleLocked() {
      const InnerComponent = withSlots('MultipleLockInner', function Component(args: any) {
        const { props } = useProps(args);
        return React.createElement('div', props);
      });

      const LockedComponent = withSlots('MultipleLockOuter', function Component(props: any) {
        return React.createElement(Environment, {
          lock: true,
          children: React.createElement(InnerComponent, { ...props, slot: 'test' })
        });
      });

      const html = renderToString(
        React.createElement(LockedComponent, {
          slots: {
            test: {
              style: { color: 'red' },
              className: 'example'
            }
          }
        })
      );

      assume(html).contains('data-override="className style slot"');
      assume(html).contains('data-slot="test"');
    });
  });

  describe('parent component override inheritance', function parentTests() {
    it('does not inherit context override without locked environment', function parentNoLock() {
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
          assume(props['data-override']).equals(undefined);
          return React.createElement('div', null, React.createElement(Kiddo, null, 'No data-override'));
        }
      };

      const html = renderToString(React.createElement(Box.Provider, { value }, React.createElement(Parent)));

      assume(html).equals('<div><p>No data-override</p></div>');
    });

    it('inherits context override when environment is locked', function parentWithLock() {
      const Kiddo = withSlots(`BentoOverride-KiddoLocked`, function Component(args: any) {
        return React.createElement('p', args, args.children);
      });

      const Parent = withSlots(`BentoOverride-ParentLocked`, function Component(args) {
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
      value.env.locked = true;
      value.env.lockGeneration = 1;
      value.env.components = {
        'BentoOverride-ParentLocked': function Parent(props) {
          assume(props['data-override']).equals('context');
          return React.createElement('div', null, React.createElement(Kiddo, null, 'Should have data-override'));
        }
      };

      const html = renderToString(React.createElement(Box.Provider, { value }, React.createElement(Parent)));

      assume(html).equals('<div><p data-override="context">Should have data-override</p></div>');
    });
  });

  describe('lock-based override detection', function lockBasedOverrides() {
    it('flags className when passed via slots to component inside locked environment', function lockedSameGen() {
      const TestComponent = withSlots('LockSameGen', function Component(args: any) {
        const { props } = useProps(args);
        return React.createElement('div', props);
      });

      // Wrap in a design system component pattern: slots are passed from outside the lock
      const DesignSystemComponent = withSlots('LockSameGenDesign', function Component(props: any) {
        return React.createElement(Environment, {
          lock: true,
          children: React.createElement(TestComponent, { ...props, slot: 'test' })
        });
      });

      // Pass className via slots from the "consumer" (before lock)
      const html = renderToString(
        React.createElement(DesignSystemComponent, {
          slots: { test: { className: 'internal' } }
        })
      );

      // SHOULD have data-override since className is passed via slot from outside the lock
      assume(html).contains('data-override');
      assume(html).contains('className');
      assume(html).contains('class="internal"');
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
            slots: {
              test: { className: 'consumer' }
            }
          })
        })
      );

      // SHOULD have data-override since it's from earlier generation (consumer modification)
      assume(html).contains('data-override="className slot"');
      assume(html).contains('class="consumer"');
      assume(html).contains('data-slot="test"');
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

      assume(html).contains('<div data-override="slot" data-slot="test">Hello</div>');
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
            slots: {
              test: { className: 'test', style: { color: 'red' } }
            }
          })
        })
      );

      // Without lock, no data-override should be added
      assume(html).contains('class="test"');
      assume(html).contains('style="color:red"');
      assume(html).contains('data-slot="test"');
      assume(html).does.not.contain('data-override');
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
            slots: {
              test: { style: { color: 'blue' } }
            }
          })
        })
      );

      assume(html).contains('data-override="style slot"');
      assume(html).contains('style="color:blue"');
      assume(html).contains('data-slot="test"');
    });
  });
});

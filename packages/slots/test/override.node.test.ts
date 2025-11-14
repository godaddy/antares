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
      assume(html).contains('<div id="example" role="presentation"></div>');
      assume(html).does.not.contain('data-override');
    });

    it('does not add data-override when style is present', function style() {
      const html = createComponent('style', { style: { color: 'red' } });
      assume(html).contains('<div style="color:red"></div>');
      assume(html).does.not.contain('data-override');
    });

    it('does not introduce data-override for CSS variables', function cssVariables() {
      const html = createComponent('cssVariables', { style: { '--color': 'red' } });
      assume(html).contains('<div style="--color:red"></div>');
      assume(html).does.not.contain('data-override');
    });

    it('does not add data-override when CSS variables and style are present', function cssVariablesAndStyle() {
      const html = createComponent('cssVariablesAndStyle', { style: { '--color': 'red', color: 'blue' } });
      assume(html).contains('<div style="--color:red;color:blue"></div>');
      assume(html).does.not.contain('data-override');
    });

    it('does not introduce data-override when className is present', function className() {
      const html = createComponent('className', { className: 'example' });
      assume(html).contains('<div class="example"></div>');
      assume(html).does.not.contain('data-override');
    });

    it('does not introduce data-override when existing data-override is present', function existing() {
      const html = createComponent('existing', { style: { color: 'red' }, 'data-override': 'boink' });
      assume(html).contains('<div style="color:red" data-override="boink"></div>');
    });

    it('does not add data-override for multiple style triggers', function multiple() {
      const html = createComponent('multiple', {
        style: { color: 'red' },
        className: 'example'
      });

      assume(html).contains('<div style="color:red" class="example"></div>');
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

      assume(html).contains('<div></div>');
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

      assume(html).contains('<div style="color:red"></div>');
      assume(html).does.not.contain('data-override');
    });
  });

  describe('locked Environment behavior', function lockedBehavior() {
    it('introduces data-override when style is present in locked environment', function styleWithLock() {
      // First need to set up a scenario where slot is from earlier generation
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

      const html = renderToString(React.createElement(LockedComponent, { style: { color: 'red' } }));

      assume(html).contains('data-override="style"');
    });

    it('introduces data-override when className is present in locked environment', function classNameWithLock() {
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

      const html = renderToString(React.createElement(LockedComponent, { className: 'example' }));

      assume(html).contains('data-override="className"');
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

      const html = renderToString(React.createElement(LockedComponent, { style: { '--color': 'red' } }));

      assume(html).contains('<div style="--color:red"></div>');
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
          style: { color: 'red' },
          className: 'example'
        })
      );

      assume(html).contains('data-override="className style"');
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
    it('flags className when passed to component inside locked environment', function lockedSameGen() {
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

      // SHOULD have data-override since className is passed from outside the lock
      assume(html).contains('<div class="internal" data-override="className"></div>');
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

      // Without lock, no data-override should be added
      assume(html).contains('<div style="color:red" class="test"></div>');
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
            style: { color: 'blue' },
            slots: {
              test: {}
            }
          })
        })
      );

      assume(html).contains('<div style="color:blue" data-override="style slot"></div>');
    });
  });
});

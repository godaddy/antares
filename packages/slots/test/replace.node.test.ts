import { replace } from '@bento/slots';
import { describe, it } from 'vitest';
import assume from 'assume';
import { renderToString } from 'react-dom/server';
import { withSlots } from '@bento/slots';
import { Environment } from '@bento/environment';
import React from 'react';

describe('@bento/slots replace', function bento() {
  function renderWithEnvironment(
    name: string,
    props: Record<string, any>,
    components: Record<string, any>,
    lock: boolean
  ) {
    const TestReturn = withSlots(`BentoReplace-${name}`, function Component(args: any) {
      return React.createElement('div', { ...args });
    });

    const child = React.createElement(TestReturn, { slot: 'test', ...props });

    return renderToString(React.createElement(Environment, { lock, components, children: child }));
  }

  function renderWithoutEnvironment(name: string, props: Record<string, any>) {
    const TestReturn = withSlots(`BentoReplace-${name}`, function Component(args: any) {
      return React.createElement('div', { ...args });
    });

    return renderToString(React.createElement(TestReturn, { slot: 'test', ...props }));
  }

  it('exposes the function', function exposes() {
    assume(replace).is.a('function');
  });

  describe('default behavior (no Environment component)', function defaultBehavior() {
    it('renders without data-override attributes by default', function noDataOverride() {
      const html = renderWithoutEnvironment('noDataOverride', { id: 'example', className: 'test-class' });

      assume(html).contains('<div');
      assume(html).contains('id="example"');
      assume(html).contains('class="test-class"');
      assume(html).does.not.contain('data-override');
    });

    it('renders without data-override when no component replacement occurs', function noReplacement() {
      const html = renderWithoutEnvironment('noReplacement', { style: { color: 'blue' } });

      assume(html).contains('style="color:blue"');
      assume(html).does.not.contain('data-override');
    });

    it('handles multiple props without adding data-override', function multipleProps() {
      const html = renderWithoutEnvironment('multipleProps', {
        id: 'test',
        className: 'my-class',
        'aria-label': 'Test Label',
        style: { margin: '10px' }
      });

      assume(html).contains('id="test"');
      assume(html).contains('class="my-class"');
      assume(html).contains('aria-label="Test Label"');
      assume(html).contains('style="margin:10px"');
      assume(html).does.not.contain('data-override');
    });
  });

  describe('component replacement', function componentReplacement() {
    it('renders without data-override when Environment is unlocked', function unlockedNoOverride() {
      const html = renderWithEnvironment(
        'componentReplacement-unlocked',
        { id: 'example' },
        {
          'BentoReplace-componentReplacement-unlocked': function Component(props: any) {
            assume(props['data-override']).equals(undefined);
            return React.createElement('div', props);
          }
        },
        false
      );

      assume(html).contains('<div id="example"></div>');
      assume(html).does.not.contain('data-override');
    });

    it('flags context with data-override when Environment is locked', function lockedWithOverride() {
      const html = renderWithEnvironment(
        'componentReplacement-locked',
        { id: 'example' },
        {
          'BentoReplace-componentReplacement-locked': function Component(props: any) {
            assume(props['data-override']).equals('context');
            return React.createElement('div', props);
          }
        },
        true
      );

      assume(html).contains('<div id="example" data-override="context"></div>');
    });
  });

  describe('props-based overrides', function propsOverride() {
    it('renders props override without data-override when unlocked', function unlockedPropsOverride() {
      const html = renderWithEnvironment(
        'propsOverride-unlocked',
        { id: 'original' },
        {
          'BentoReplace-propsOverride-unlocked': {
            props: {
              id: 'overridden',
              className: 'custom-class'
            }
          }
        },
        false
      );

      assume(html).contains('<div id="overridden" class="custom-class"></div>');
      assume(html).does.not.contain('data-override');
    });

    it('flags context and className with data-override when locked', function lockedPropsOverride() {
      const html = renderWithEnvironment(
        'propsOverride-locked',
        { id: 'original' },
        {
          'BentoReplace-propsOverride-locked': {
            props: {
              id: 'overridden',
              className: 'custom-class'
            }
          }
        },
        true
      );

      // Context and className should both be flagged
      assume(html).contains('<div id="overridden" data-override="context className" class="custom-class"></div>');
    });
  });

  describe('merging data-override values', function combinedOverrides() {
    it('renders without data-override when unlocked', function unlockedNoMerge() {
      const html = renderWithEnvironment(
        'combinedOverrides-unlocked',
        { style: { color: 'red' } },
        {
          'BentoReplace-combinedOverrides-unlocked': function Component(props: any) {
            assume(props['data-override']).equals(undefined);
            return React.createElement('div', props);
          }
        },
        false
      );

      assume(html).contains('<div style="color:red"></div>');
      assume(html).does.not.contain('data-override');
    });

    it('merges context and style into data-override when locked', function lockedMerge() {
      const html = renderWithEnvironment(
        'combinedOverrides-locked',
        { style: { color: 'red' } },
        {
          'BentoReplace-combinedOverrides-locked': function Component(props: any) {
            assume(props['data-override']).equals('context style');
            return React.createElement('div', props);
          }
        },
        true
      );

      assume(html).contains('<div style="color:red" data-override="context style"></div>');
    });
  });

  describe('edge cases', function edgeCases() {
    it('handles falsy target components without data-override when unlocked', function falsyTargetUnlocked() {
      const html = renderWithEnvironment(
        'falsyTarget-unlocked',
        { id: 'example' },
        {
          'BentoReplace-falsyTarget-unlocked': null
        },
        false
      );

      assume(html).contains('<div id="example"></div>');
      assume(html).does.not.contain('data-override');
    });

    it('handles falsy target components without data-override when locked', function falsyTargetLocked() {
      const html = renderWithEnvironment(
        'falsyTarget-locked',
        { id: 'example' },
        {
          'BentoReplace-falsyTarget-locked': null
        },
        true
      );

      assume(html).contains('<div id="example"></div>');
      assume(html).does.not.contain('data-override');
    });
  });
});

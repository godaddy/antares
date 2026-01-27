import { replace } from '@bento/slots';
import { describe, it } from 'vitest';
import assume from 'assume';
import { renderToString } from 'react-dom/server';
import { withSlots } from '@bento/slots';
import { Box, defaults } from '@bento/box';
import React from 'react';

describe('@bento/slots replace', function bento() {
  function createComponent(name: string, props = {}, slots = {}, components = {}) {
    const TestReturn = withSlots(`BentoReplace-${name}`, function Component(args: any) {
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
    assume(replace).is.a('function');
  });

  it('introduces data-override with context when component is replaced', function componentReplacement() {
    const html = createComponent(
      'componentReplacement',
      { id: 'example' },
      {},
      {
        'BentoReplace-componentReplacement': function Component(props: any) {
          assume(props['data-override']).equals('context');
          return React.createElement('div', props);
        }
      }
    );

    assume(html).contains('<div id="example" data-override="context" data-slot="test"></div>');
  });

  it('allows props to be overridden through component replacement', function propsOverride() {
    const html = createComponent(
      'propsOverride',
      { id: 'original' },
      {},
      {
        'BentoReplace-propsOverride': {
          props: {
            id: 'overridden',
            className: 'custom-class'
          }
        }
      }
    );

    assume(html).contains(
      '<div id="overridden" class="custom-class" data-override="context className" data-slot="test"></div>'
    );
  });

  it('combines data-override values when component has existing overrides', function combinedOverrides() {
    const html = createComponent(
      'combinedOverrides',
      { style: { color: 'red' } },
      {},
      {
        'BentoReplace-combinedOverrides': function Component(props: any) {
          assume(props['data-override']).equals('context style');
          return React.createElement('div', props);
        }
      }
    );

    assume(html).contains('<div style="color:red" data-override="context style" data-slot="test"></div>');
  });

  it('handles falsy target components gracefully', function falsyTarget() {
    const html = createComponent(
      'falsyTarget',
      { id: 'example' },
      {},
      {
        'BentoReplace-falsyTarget': null
      }
    );

    // Should render the original component without any replacement
    assume(html).contains('<div id="example" data-slot="test"></div>');
  });
});

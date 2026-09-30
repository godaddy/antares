import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { MultipleExample } from '../examples/multiple.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { FormStepsExample } from '../examples/form-steps.tsx';
import { NestedExample } from '../examples/nested.tsx';
import { CompositionExample } from '../examples/composition.tsx';
import { PlaygroundExample } from '../examples/accordion-playground.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Accordion', function accordionTests() {
    it.each([
      ['default-open', <DefaultExample />],
      ['all-collapsed', <DefaultExample defaultExpandedKeys={[]} />],
      ['multiple-open', <MultipleExample />],
      ['controlled', <ControlledExample />],
      ['controlled-multiple', <ControlledExample allowsMultipleExpanded />],
      ['disabled-item', <DisabledExample />],
      ['disabled-group', <DisabledExample isGroupDisabled />],
      ['form-steps', <FormStepsExample />],
      ['nested', <NestedExample />],
      ['composition', <CompositionExample />],
      ['context-disabled', <CompositionExample isDisabled />],
      ['button-overrides', <CompositionExample triggerProps={{ variant: 'primary', size: 'sm', isDisabled: true }} />],
      [
        'functional-presentation',
        <CompositionExample
          triggerProps={{
            className: function triggerClass({ isDisabled }) {
              return isDisabled ? 'custom-disabled' : 'custom-enabled';
            },
            style: function triggerStyle() {
              return { textDecoration: 'underline' };
            }
          }}
        />
      ],
      ['playground', <PlaygroundExample defaultExpandedKeys={['second']} />]
    ] as const)('renders %s', function renderExample(_name, example) {
      const result = renderToString(example);

      expect(result).toMatchSnapshot();
    });
  });
});

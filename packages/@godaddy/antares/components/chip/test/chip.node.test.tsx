import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ConsumerClassesExample } from '../examples/consumer-classes.tsx';
import { ContextOverridesExample } from '../examples/context-overrides.tsx';
import { ControlledSelectionExample } from '../examples/controlled-selection.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { RemovableChipsExample } from '../examples/removable-chips.tsx';
import { SizesExample } from '../examples/sizes.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Chip', function chipTests() {
    it('renders DefaultExample', function defaultExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders RemovableChipsExample', function removableChipsExample() {
      expect(renderToString(<RemovableChipsExample />)).toMatchSnapshot();
    });

    it('renders ControlledSelectionExample', function controlledSelectionExample() {
      expect(renderToString(<ControlledSelectionExample />)).toMatchSnapshot();
    });

    it('renders SizesExample', function sizesExample() {
      expect(renderToString(<SizesExample />)).toMatchSnapshot();
    });

    it('renders ConsumerClassesExample', function consumerClassesExample() {
      expect(renderToString(<ConsumerClassesExample />)).toMatchSnapshot();
    });

    it('renders ContextOverridesExample', function contextOverridesExample() {
      expect(renderToString(<ContextOverridesExample />)).toMatchSnapshot();
    });
  });
});

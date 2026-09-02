import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ConsumerClassesExample } from '../examples/consumer-classes.tsx';
import { ContextOverridesExample } from '../examples/context-overrides.tsx';
import { ControlledSelectionExample } from '../examples/controlled-selection.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { EmptyStateExample } from '../examples/empty-state.tsx';
import { PrimitiveAndComposedExample } from '../examples/primitive-and-composed.tsx';
import { RemovableChipsExample } from '../examples/removable-chips.tsx';
import { SelectionModesExample } from '../examples/selection-modes.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { ToggleChipsExample } from '../examples/toggle-chips.tsx';
import { TruncationExample } from '../examples/truncation.tsx';

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

    it('renders ToggleChipsExample', function toggleChipsExample() {
      expect(renderToString(<ToggleChipsExample />)).toMatchSnapshot();
    });

    it('renders SizesExample', function sizesExample() {
      expect(renderToString(<SizesExample />)).toMatchSnapshot();
    });

    it('renders DisabledExample', function disabledExample() {
      expect(renderToString(<DisabledExample />)).toMatchSnapshot();
    });

    it('renders EmptyStateExample', function emptyStateExample() {
      expect(renderToString(<EmptyStateExample />)).toMatchSnapshot();
    });

    it('renders TruncationExample', function truncationExample() {
      expect(renderToString(<TruncationExample />)).toMatchSnapshot();
    });

    it('renders SelectionModesExample', function selectionModesExample() {
      expect(renderToString(<SelectionModesExample />)).toMatchSnapshot();
    });

    it('renders PrimitiveAndComposedExample', function primitiveAndComposedExample() {
      expect(renderToString(<PrimitiveAndComposedExample />)).toMatchSnapshot();
    });

    it('renders ConsumerClassesExample', function consumerClassesExample() {
      expect(renderToString(<ConsumerClassesExample />)).toMatchSnapshot();
    });

    it('renders ContextOverridesExample', function contextOverridesExample() {
      expect(renderToString(<ContextOverridesExample />)).toMatchSnapshot();
    });
  });
});

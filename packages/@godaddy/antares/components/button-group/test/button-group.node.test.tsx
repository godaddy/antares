import { renderToString } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import { DefaultExample } from '../examples/default.tsx';
import { MultipleSelectionExample } from '../examples/multiple-selection.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { IconOnlyExample } from '../examples/icon-only.tsx';
import { IconAndTextExample } from '../examples/icon-and-text.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { RTLExample } from '../examples/rtl.tsx';
import { PlaygroundExample } from '../examples/button-group-playground.tsx';

describe('@godaddy/antares', function antares() {
  describe('#ButtonGroup', function buttonGroupTests() {
    it('renders DefaultExample', function defaultExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders MultipleSelectionExample', function multipleSelectionExample() {
      expect(renderToString(<MultipleSelectionExample />)).toMatchSnapshot();
    });

    it('renders ControlledExample', function controlledExample() {
      expect(renderToString(<ControlledExample />)).toMatchSnapshot();
    });

    it('renders SizesExample', function sizesExample() {
      expect(renderToString(<SizesExample />)).toMatchSnapshot();
    });

    it('renders IconOnlyExample', function iconOnlyExample() {
      expect(renderToString(<IconOnlyExample />)).toMatchSnapshot();
    });

    it('renders IconAndTextExample', function iconAndTextExample() {
      expect(renderToString(<IconAndTextExample />)).toMatchSnapshot();
    });

    it('renders DisabledExample', function disabledExample() {
      expect(renderToString(<DisabledExample />)).toMatchSnapshot();
    });

    it('renders RTLExample', function rtlExample() {
      expect(renderToString(<RTLExample />)).toMatchSnapshot();
    });

    it('renders PlaygroundExample with default props', function playgroundExample() {
      expect(renderToString(<PlaygroundExample />)).toMatchSnapshot();
    });

    it('renders PlaygroundExample with sm size', function playgroundExampleSm() {
      expect(renderToString(<PlaygroundExample size="sm" />)).toMatchSnapshot();
    });

    it('renders PlaygroundExample with multiple selectionMode', function playgroundExampleMultiple() {
      expect(renderToString(<PlaygroundExample selectionMode="multiple" />)).toMatchSnapshot();
    });

    it('renders PlaygroundExample disabled', function playgroundExampleDisabled() {
      expect(renderToString(<PlaygroundExample isDisabled />)).toMatchSnapshot();
    });
  });
});

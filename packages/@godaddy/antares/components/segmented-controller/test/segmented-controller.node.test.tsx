import { ControlledExample } from '../examples/controlled.tsx';
import { IconOnlyExample } from '../examples/icon-only.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { PlaygroundExample } from '../examples/segmented-controller-playground.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { BasicExample } from '../examples/basic.tsx';
import { IconExample } from '../examples/icon.tsx';
import { OverflowExample } from '../examples/overflow.tsx';
import { RTLExample } from '../examples/rtl.tsx';
import { renderToString } from 'react-dom/server';
import { describe, it, expect } from 'vitest';

describe('@godaddy/antares', function antares() {
  describe('#SegmentedController', function segmentedControllerTests() {
    it('renders BasicExample', function basicExample() {
      expect(renderToString(<BasicExample />)).toMatchSnapshot();
    });

    it('renders ControlledExample', function controlledExample() {
      expect(renderToString(<ControlledExample />)).toMatchSnapshot();
    });

    it('renders SizesExample', function sizesExample() {
      expect(renderToString(<SizesExample />)).toMatchSnapshot();
    });

    it('renders IconExample', function iconExample() {
      expect(renderToString(<IconExample />)).toMatchSnapshot();
    });

    it('renders IconOnlyExample', function iconOnlyExample() {
      expect(renderToString(<IconOnlyExample />)).toMatchSnapshot();
    });

    it('renders DisabledExample', function disabledExample() {
      expect(renderToString(<DisabledExample />)).toMatchSnapshot();
    });

    it('renders PlaygroundExample with default props', function playgroundExample() {
      expect(renderToString(<PlaygroundExample />)).toMatchSnapshot();
    });

    it('renders OverflowExample with scroll buttons', function overflowExample() {
      expect(renderToString(<OverflowExample />)).toMatchSnapshot();
    });

    it('renders RTLExample with scroll buttons', function rtlExample() {
      expect(renderToString(<RTLExample />)).toMatchSnapshot();
    });
  });
});

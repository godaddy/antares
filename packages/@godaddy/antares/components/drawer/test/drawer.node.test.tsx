import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { BottomSheetExample } from '../examples/bottom-sheet.tsx';
import { PlaygroundExample } from '../examples/drawer-playground.tsx';
import { PlacementsExample } from '../examples/placements.tsx';
import { NestedPopoverExample } from '../examples/nested-popover.tsx';
import { RTLPlacementExample } from '../examples/rtl-placement.tsx';
import { DefaultOpenExample } from '../examples/default-open.tsx';
import { NoEscapeDismissExample } from '../examples/no-escape-dismiss.tsx';
import { FilteredDismissExample } from '../examples/filtered-dismiss.tsx';
import { AriaLabelExample } from '../examples/aria-label.tsx';
import { AriaLabelWithTitleExample } from '../examples/aria-label-with-title.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Drawer', function drawerTests() {
    it('renders DefaultExample', function defaultExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders BottomSheetExample', function bottomSheetExample() {
      expect(renderToString(<BottomSheetExample />)).toMatchSnapshot();
    });

    it('renders PlaygroundExample', function playgroundExample() {
      expect(renderToString(<PlaygroundExample placement="right" />)).toMatchSnapshot();
    });

    it('renders PlaygroundExample with numeric maxSize', function playgroundNumericMaxSize() {
      expect(renderToString(<PlaygroundExample placement="bottom" maxSize={320} />)).toMatchSnapshot();
    });

    it('renders PlaygroundExample with string maxSize', function playgroundStringMaxSize() {
      expect(renderToString(<PlaygroundExample placement="bottom" maxSize="60%" />)).toMatchSnapshot();
    });

    it('renders PlacementsExample', function placementsExample() {
      expect(renderToString(<PlacementsExample />)).toMatchSnapshot();
    });

    it('renders NestedPopoverExample', function nestedPopoverExample() {
      expect(renderToString(<NestedPopoverExample />)).toMatchSnapshot();
    });

    it('renders RTLPlacementExample', function rtlPlacementExample() {
      expect(renderToString(<RTLPlacementExample />)).toMatchSnapshot();
    });

    it('renders DefaultOpenExample', function defaultOpenExample() {
      expect(renderToString(<DefaultOpenExample />)).toMatchSnapshot();
    });

    it('renders NoEscapeDismissExample', function noEscapeDismissExample() {
      expect(renderToString(<NoEscapeDismissExample />)).toMatchSnapshot();
    });

    it('renders FilteredDismissExample', function filteredDismissExample() {
      expect(renderToString(<FilteredDismissExample />)).toMatchSnapshot();
    });

    it('renders AriaLabelExample', function ariaLabelExample() {
      expect(renderToString(<AriaLabelExample />)).toMatchSnapshot();
    });

    it('renders AriaLabelWithTitleExample', function ariaLabelWithTitleExample() {
      expect(renderToString(<AriaLabelWithTitleExample />)).toMatchSnapshot();
    });
  });
});

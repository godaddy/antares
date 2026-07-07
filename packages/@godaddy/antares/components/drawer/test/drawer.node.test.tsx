import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { BottomSheetExample } from '../examples/bottom-sheet.tsx';
import { PlaygroundExample } from '../examples/drawer-playground.tsx';
import { PlacementsExample } from '../examples/placements.tsx';
import { NestedPopoverExample } from '../examples/nested-popover.tsx';
import { NoEscapeDismissExample } from '../examples/no-escape-dismiss.tsx';
import { FilteredDismissExample } from '../examples/filtered-dismiss.tsx';

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

    it('renders PlaygroundExample with numeric minSize', function playgroundNumericMinSize() {
      expect(renderToString(<PlaygroundExample placement="right" minSize={320} />)).toMatchSnapshot();
    });

    it('renders PlaygroundExample with string minSize', function playgroundStringMinSize() {
      expect(renderToString(<PlaygroundExample placement="bottom" minSize="40%" />)).toMatchSnapshot();
    });

    it('renders PlaygroundExample with close button floor', function playgroundCloseFloor() {
      expect(renderToString(<PlaygroundExample placement="right" showCloseButton />)).toMatchSnapshot();
    });

    it('renders PlacementsExample', function placementsExample() {
      expect(renderToString(<PlacementsExample />)).toMatchSnapshot();
    });

    it('renders NestedPopoverExample', function nestedPopoverExample() {
      expect(renderToString(<NestedPopoverExample />)).toMatchSnapshot();
    });

    it('renders NoEscapeDismissExample', function noEscapeDismissExample() {
      expect(renderToString(<NoEscapeDismissExample />)).toMatchSnapshot();
    });

    it('renders FilteredDismissExample', function filteredDismissExample() {
      expect(renderToString(<FilteredDismissExample />)).toMatchSnapshot();
    });
  });
});

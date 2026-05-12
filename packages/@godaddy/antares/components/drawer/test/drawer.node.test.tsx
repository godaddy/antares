import { describe, expect, it } from 'vitest';
import { DefaultExample } from '../examples/default.tsx';
import { BottomSheetExample } from '../examples/bottom-sheet.tsx';
import { PlaygroundExample } from '../examples/drawer-playground.tsx';
import { SnapPointsExample } from '../examples/snap-points.tsx';
import { ControlledSnapExample } from '../examples/controlled-snap.tsx';
import { NestedPopoverExample } from '../examples/nested-popover.tsx';
import { RTLPlacementExample } from '../examples/rtl-placement.tsx';
import { HandleNoSnapsExample } from '../examples/handle-no-snaps.tsx';
import { DefaultOpenExample } from '../examples/default-open.tsx';
import { NoEscapeDismissExample } from '../examples/no-escape-dismiss.tsx';
import { FilteredDismissExample } from '../examples/filtered-dismiss.tsx';
import { PercentSnapPointsExample } from '../examples/percent-snap-points.tsx';
import { renderToString } from 'react-dom/server';

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

    it('renders SnapPointsExample', function snapPointsExample() {
      expect(renderToString(<SnapPointsExample />)).toMatchSnapshot();
    });

    it('renders ControlledSnapExample', function controlledSnapExample() {
      expect(renderToString(<ControlledSnapExample />)).toMatchSnapshot();
    });

    it('renders NestedPopoverExample', function nestedPopoverExample() {
      expect(renderToString(<NestedPopoverExample />)).toMatchSnapshot();
    });

    it('renders RTLPlacementExample', function rtlPlacementExample() {
      expect(renderToString(<RTLPlacementExample />)).toMatchSnapshot();
    });

    it('renders HandleNoSnapsExample', function handleNoSnapsExample() {
      expect(renderToString(<HandleNoSnapsExample />)).toMatchSnapshot();
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

    it('renders PercentSnapPointsExample', function percentSnapPointsExample() {
      expect(renderToString(<PercentSnapPointsExample />)).toMatchSnapshot();
    });
  });
});

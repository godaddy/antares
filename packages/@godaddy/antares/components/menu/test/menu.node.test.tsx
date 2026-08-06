import { renderToString } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import { DefaultExample } from '../examples/default.tsx';
import { GroupsExample } from '../examples/groups.tsx';
import { SingleSelectionExample } from '../examples/single-selection.tsx';
import { MultipleSelectionExample } from '../examples/multiple-selection.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { SubmenuExample } from '../examples/submenu.tsx';
import { PlaygroundExample } from '../examples/menu-playground.tsx';
import { BottomSheetExample } from '../examples/bottom-sheet.tsx';
import { RichContentExample } from '../examples/rich-content.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Menu', function menuTests() {
    it('renders BasicExample', function basicExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders GroupsExample', function groupsExample() {
      expect(renderToString(<GroupsExample />)).toMatchSnapshot();
    });

    it('renders SingleSelectionExample', function singleSelectionExample() {
      expect(renderToString(<SingleSelectionExample />)).toMatchSnapshot();
    });

    it('renders MultipleSelectionExample', function multipleSelectionExample() {
      expect(renderToString(<MultipleSelectionExample />)).toMatchSnapshot();
    });

    it('renders SizesExample', function sizesExample() {
      expect(renderToString(<SizesExample />)).toMatchSnapshot();
    });

    it('renders ControlledExample', function controlledExample() {
      expect(renderToString(<ControlledExample />)).toMatchSnapshot();
    });

    it('renders SubmenuExample', function submenuExample() {
      expect(renderToString(<SubmenuExample />)).toMatchSnapshot();
    });

    it('renders PlaygroundExample with all features', function playgroundExample() {
      expect(
        renderToString(<PlaygroundExample size="sm" multiSelect withIcons withGroups disabledItems />)
      ).toMatchSnapshot();
    });

    it('renders BottomSheetExample', function bottomSheetExample() {
      expect(renderToString(<BottomSheetExample />)).toMatchSnapshot();
    });

    it('renders RichContentExample', function richContentExample() {
      expect(renderToString(<RichContentExample />)).toMatchSnapshot();
    });
  });
});

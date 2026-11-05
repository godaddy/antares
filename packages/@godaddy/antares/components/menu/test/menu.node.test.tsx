import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { AccountMenuExample } from '../examples/account-menu.tsx';
import { BottomSheetExample } from '../examples/bottom-sheet.tsx';
import { ComplexExample } from '../examples/complex.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { LinksExample } from '../examples/links.tsx';
import { MultipleSelectionExample } from '../examples/multiple-selection.tsx';
import { OpenFromDialogExample } from '../examples/open-from-dialog.tsx';
import { PlaygroundExample } from '../examples/menu-playground.tsx';
import { SingleSelectionExample } from '../examples/single-selection.tsx';
import { SubmenuExample } from '../examples/submenu.tsx';
import { TitleAndGroupsExample } from '../examples/sections.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Menu', function menuTests() {
    it('renders the default example', function rendersDefault() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders the submenu example', function rendersSubmenu() {
      expect(renderToString(<SubmenuExample />)).toMatchSnapshot();
    });

    it('renders the single selection example', function rendersSingleSelection() {
      expect(renderToString(<SingleSelectionExample />)).toMatchSnapshot();
    });

    it('renders the multiple selection example', function rendersMultipleSelection() {
      expect(renderToString(<MultipleSelectionExample />)).toMatchSnapshot();
    });

    it('renders the title and groups example', function rendersTitleAndGroups() {
      expect(renderToString(<TitleAndGroupsExample />)).toMatchSnapshot();
    });

    it('renders the account menu example', function rendersAccountMenu() {
      expect(renderToString(<AccountMenuExample />)).toMatchSnapshot();
    });

    it('renders the bottom sheet example', function rendersBottomSheet() {
      expect(renderToString(<BottomSheetExample />)).toMatchSnapshot();
    });

    it('renders the links example', function rendersLinks() {
      expect(renderToString(<LinksExample />)).toMatchSnapshot();
    });

    it('renders the dialog example', function rendersDialog() {
      expect(renderToString(<OpenFromDialogExample />)).toMatchSnapshot();
    });

    it('renders the complex example', function rendersComplex() {
      expect(renderToString(<ComplexExample />)).toMatchSnapshot();
    });

    it('renders the playground example', function rendersPlayground() {
      expect(renderToString(<PlaygroundExample />)).toMatchSnapshot();
    });
  });
});

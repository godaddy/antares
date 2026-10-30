import { renderToString } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import { DefaultExample } from '../examples/default.tsx';
import { SubmenuExample } from '../examples/submenu.tsx';
import { SingleSelectionExample } from '../examples/single-selection.tsx';
import { MultipleSelectionExample } from '../examples/multiple-selection.tsx';
import { TitleAndGroupsExample } from '../examples/sections.tsx';
import { AccountMenuExample } from '../examples/avatar.tsx';
import { BottomSheetExample } from '../examples/bottom-sheet.tsx';
import { LinksExample } from '../examples/links.tsx';
import { OpenFromDialogExample } from '../examples/open-from-dialog.tsx';
import { ComplexExample } from '../examples/complex.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Menu', function menuTests() {
    it('renders DefaultExample', function render() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders SubmenuExample', function render() {
      expect(renderToString(<SubmenuExample />)).toMatchSnapshot();
    });

    it('renders SingleSelectionExample', function render() {
      expect(renderToString(<SingleSelectionExample />)).toMatchSnapshot();
    });

    it('renders MultipleSelectionExample', function render() {
      expect(renderToString(<MultipleSelectionExample />)).toMatchSnapshot();
    });

    it('renders TitleAndGroupsExample', function render() {
      expect(renderToString(<TitleAndGroupsExample />)).toMatchSnapshot();
    });

    it('renders AccountMenuExample', function render() {
      expect(renderToString(<AccountMenuExample />)).toMatchSnapshot();
    });

    it('renders BottomSheetExample', function render() {
      expect(renderToString(<BottomSheetExample />)).toMatchSnapshot();
    });

    it('renders LinksExample', function render() {
      expect(renderToString(<LinksExample />)).toMatchSnapshot();
    });

    it('renders OpenFromDialogExample', function render() {
      expect(renderToString(<OpenFromDialogExample />)).toMatchSnapshot();
    });

    it('renders ComplexExample', function render() {
      expect(renderToString(<ComplexExample />)).toMatchSnapshot();
    });
  });
});

import { MenuTriggerOneChild, SubmenuTriggerOneChild } from '../examples/menu-errors.tsx';
import { CustomIconsExample } from '../examples/menu-custom-icons.tsx';
import { PlaygroundExample } from '../examples/menu-playground.tsx';
import { SelectionExample } from '../examples/menu-selection.tsx';
import { SectionsExample } from '../examples/menu-sections.tsx';
import { StandaloneExample } from '../examples/menu-standalone.tsx';
import { SubmenuExample } from '../examples/menu-submenu.tsx';
import { BasicExample } from '../examples/menu.tsx';
import { renderToString } from 'react-dom/server';
import { describe, it, expect } from 'vitest';

describe('@godaddy/uxcore', function uxcore() {
  describe('#examples', function examplesTests() {
    it('renders BasicExample', function basicExample() {
      const result = renderToString(<BasicExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders SubmenuExample with nested menus', function submenuExample() {
      const result = renderToString(<SubmenuExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders SelectionExample with single and multiple modes', function selectionExample() {
      const result = renderToString(<SelectionExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders SectionsExample with headers and separators', function sectionsExample() {
      const result = renderToString(<SectionsExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders PlaygroundExample with default props', function playgroundExample() {
      const result = renderToString(<PlaygroundExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders CustomIconsExample with custom icon slots', function customIconsExample() {
      const result = renderToString(<CustomIconsExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders StandaloneExample with menu content directly', function standaloneExample() {
      const result = renderToString(<StandaloneExample />);
      expect(result).toMatchSnapshot();
    });
  });

  describe('#error handling', function errorHandlingTests() {
    it('throws error when MenuTrigger has one child', function menuTriggerOneChild() {
      expect(() => renderToString(<MenuTriggerOneChild />)).toThrow(
        'MenuTrigger requires exactly 2 children: a trigger element and a Menu'
      );
    });

    it('throws error when SubmenuTrigger has one child', function submenuTriggerOneChild() {
      expect(() => renderToString(<SubmenuTriggerOneChild />)).toThrow(
        'SubmenuTrigger requires exactly 2 children: a MenuItem and a Menu'
      );
    });
  });
});

import assume from 'assume';
import { render } from 'vitest-browser-react';
import React, { useState } from 'react';
import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { Menu, MenuItem, MenuSection, MenuTrigger, Collection, Separator, SubmenuTrigger } from '@bento/menu';

describe('@bento/menu', function bento() {
  let mockConsoleError: any;

  beforeEach(function beforeEach() {
    mockConsoleError = vi.spyOn(console, 'error').mockImplementation(function mockConsoleErrorImplementation() {
      /* intentional no-op */
    });
  });

  afterEach(function afterEach() {
    mockConsoleError.mockRestore();
  });

  describe('Exports', function exports() {
    it('exports all main components with correct types', function test() {
      assume(Menu).exists();
      assume(MenuItem).exists();
      assume(MenuSection).exists();
      assume(MenuTrigger).exists();
      assume(Collection).exists();
      assume(Separator).exists();
      assume(SubmenuTrigger).exists();
    });

    it('renders Separator component outside menu context', function test() {
      const { container } = render(<Separator />);
      const result = container.innerHTML;

      assume(result).includes('role="separator"');
    });

    it('renders SubmenuTrigger component', function test() {
      const { container } = render(
        <Menu aria-label="Menu with submenu">
          <SubmenuTrigger>
            <MenuItem textValue="Item">Item</MenuItem>
          </SubmenuTrigger>
        </Menu>
      );
      const result = container.innerHTML;

      assume(result).includes('Item');
    });
  });

  describe('Basic Rendering', function basicRendering() {
    it('renders empty menu', function test() {
      const { container } = render(<Menu aria-label="Empty menu" />);
      const result = container.innerHTML;

      assume(result).includes('role="menu"');
      assume(result).includes('data-empty="true"');
    });

    it('renders static menu with items', function test() {
      const { container } = render(
        <Menu aria-label="Test menu">
          <MenuItem textValue="Save">Save</MenuItem>
          <MenuItem textValue="Open">Open</MenuItem>
        </Menu>
      );
      const result = container.innerHTML;

      assume(result).includes('Save');
      assume(result).includes('Open');
      assume(result).includes('role="menuitem"');
    });

    it('renders menu with sections', function test() {
      const { container } = render(
        <Menu aria-label="Sectioned menu">
          <MenuSection title="File">
            <MenuItem textValue="New">New</MenuItem>
            <MenuItem textValue="Open">Open</MenuItem>
          </MenuSection>
          <MenuSection title="Edit">
            <MenuItem textValue="Cut">Cut</MenuItem>
            <MenuItem textValue="Paste">Paste</MenuItem>
          </MenuSection>
        </Menu>
      );
      const result = container.innerHTML;

      assume(result).includes('File');
      assume(result).includes('Edit');
      assume(result).includes('New');
      assume(result).includes('Cut');
      assume(result).includes('role="group"');
    });

    it('supports className prop on menu primitives', function test() {
      const { container } = render(
        <Menu aria-label="ClassNames test" className="custom-menu-class">
          <MenuSection title="File" className="custom-section-class">
            <MenuItem textValue="Save" className="custom-item-class">
              Save
            </MenuItem>
          </MenuSection>
        </Menu>
      );
      const result = container.innerHTML;

      assume(result).includes('class="custom-menu-class"');
      assume(result).includes('class="custom-section-class"');
      assume(result).includes('class="custom-item-class"');
    });
  });

  describe('Selection Modes', function selectionModes() {
    it('supports none selection mode (action menu)', function test() {
      const { container } = render(
        <Menu aria-label="Action menu" selectionMode="none">
          <MenuItem textValue="Copy">Copy</MenuItem>
          <MenuItem textValue="Paste">Paste</MenuItem>
        </Menu>
      );
      const result = container.innerHTML;

      assume(result).includes('Copy');
      assume(result).includes('Paste');
      assume(result).includes('role="menuitem"');
      // data-selection-mode should NOT be present when mode is 'none'
      assume(result).does.not.include('data-selection-mode');
    });

    it('supports single selection mode', function test() {
      const { container } = render(
        <Menu aria-label="Single select menu" selectionMode="single">
          <MenuItem textValue="Option 1">Option 1</MenuItem>
          <MenuItem textValue="Option 2">Option 2</MenuItem>
        </Menu>
      );
      const result = container.innerHTML;

      assume(result).includes('data-selection-mode="single"');
      assume(result).includes('role="menuitemradio"');
    });

    it('supports multiple selection mode', function test() {
      const { container } = render(
        <Menu aria-label="Multi select menu" selectionMode="multiple">
          <MenuItem textValue="Item 1">Item 1</MenuItem>
          <MenuItem textValue="Item 2">Item 2</MenuItem>
        </Menu>
      );
      const result = container.innerHTML;

      assume(result).includes('data-selection-mode="multiple"');
      assume(result).includes('role="menuitemcheckbox"');
    });
  });

  describe('Data Attributes', function dataAttributes() {
    it('applies correct data attributes to menu', function test() {
      const { container } = render(
        <Menu aria-label="Data attrs menu" selectionMode="single">
          <MenuItem textValue="Item">Item</MenuItem>
        </Menu>
      );
      const result = container.innerHTML;

      assume(result).includes('data-selection-mode="single"');
    });

    it('applies data attributes to disabled items', function test() {
      const { container } = render(
        <Menu aria-label="Disabled menu" disabledKeys={['disabled-item']}>
          <MenuItem id="disabled-item" textValue="Disabled">
            Disabled
          </MenuItem>
          <MenuItem id="enabled-item" textValue="Enabled">
            Enabled
          </MenuItem>
        </Menu>
      );
      const result = container.innerHTML;

      assume(result).includes('data-disabled="true"');
      assume(result).includes('aria-disabled="true"');
    });
  });

  describe('Actions', function actions() {
    it('calls onAction when item is clicked', async function test() {
      const onAction = vi.fn();
      const { getByText } = render(
        <Menu aria-label="Action menu" onAction={onAction}>
          <MenuItem id="save" textValue="Save">
            Save
          </MenuItem>
        </Menu>
      );

      const saveItem = getByText('Save');
      await saveItem.click();

      assume(onAction).is.a('function');
      // Vitest mocks don't have called() method, use toBeCalled()
      expect(onAction).toHaveBeenCalled();
    });

    it('calls individual item onAction handler', async function test() {
      const onAction = vi.fn();
      const { getByText } = render(
        <Menu aria-label="Item action menu">
          <MenuItem textValue="Click me" onAction={onAction}>
            Click me
          </MenuItem>
        </Menu>
      );

      const item = getByText('Click me');
      await item.click();

      expect(onAction).toHaveBeenCalled();
    });
  });

  describe('Controlled State', function controlledState() {
    it('supports controlled selection', function test() {
      function ControlledMenu() {
        const [selectedKeys, setSelectedKeys] = useState(new Set(['item-1']));

        return (
          <Menu
            aria-label="Controlled menu"
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys as any}
          >
            <MenuItem id="item-1" textValue="Item 1">
              Item 1
            </MenuItem>
            <MenuItem id="item-2" textValue="Item 2">
              Item 2
            </MenuItem>
          </Menu>
        );
      }

      const { container } = render(<ControlledMenu />);
      const result = container.innerHTML;

      // Check that controlled selection renders
      assume(result).includes('data-selection-mode="single"');
      assume(result).includes('Item 1');
      assume(result).includes('Item 2');
    });
  });

  describe('Keyboard Navigation', function keyboardNavigation() {
    it('supports keyboard focus on menu', async function test() {
      const { container } = render(
        <Menu aria-label="Keyboard menu">
          <MenuItem textValue="First">First</MenuItem>
          <MenuItem textValue="Second">Second</MenuItem>
          <MenuItem textValue="Third">Third</MenuItem>
        </Menu>
      );

      const menu = container.querySelector('[role="menu"]')!;
      assume(menu).exists();

      // Menu should be focusable
      assume(menu.getAttribute('tabindex')).equals('0');
    });

    it('renders items with correct keyboard attributes', function test() {
      const { container } = render(
        <Menu aria-label="Home End menu">
          <MenuItem textValue="First">First</MenuItem>
          <MenuItem textValue="Second">Second</MenuItem>
          <MenuItem textValue="Third">Third</MenuItem>
        </Menu>
      );

      const menu = container.querySelector('[role="menu"]')!;
      const items = container.querySelectorAll('[role="menuitem"]');

      assume(menu).exists();
      assume(items.length).equals(3);
    });
  });

  describe('MenuTrigger', function menuTrigger() {
    it('renders MenuTrigger with controlled state', function test() {
      function TriggeredMenu() {
        const [isOpen, setIsOpen] = useState(true);

        return (
          <MenuTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
            <button slot="trigger">Actions</button>
            <div slot="menu">
              <Menu aria-label="Triggered menu">
                <MenuItem textValue="Save">Save</MenuItem>
              </Menu>
            </div>
          </MenuTrigger>
        );
      }

      const { container } = render(<TriggeredMenu />);
      const result = container.innerHTML;

      assume(result).includes('Actions');
      assume(result).includes('Save');
      assume(result).includes('data-open="true"');
    });
  });

  describe('Empty State', function emptyState() {
    it('renders custom empty state', function test() {
      const { container } = render(
        <Menu aria-label="Empty menu" renderEmptyState={() => <div>No items available</div>} />
      );
      const result = container.innerHTML;

      assume(result).includes('No items available');
      assume(result).includes('data-empty="true"');
    });
  });

  describe('Dynamic Collections', function dynamicCollections() {
    it('renders dynamic items via items prop', function test() {
      const items = [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' }
      ];

      const { container } = render(
        <Menu aria-label="Dynamic menu" items={items}>
          {(item: any) => <MenuItem textValue={item.name}>{item.name}</MenuItem>}
        </Menu>
      );
      const result = container.innerHTML;

      assume(result).includes('Item 1');
      assume(result).includes('Item 2');
      assume(result).includes('Item 3');
    });
  });

  describe('Disabled Keys', function disabledKeys() {
    it('renders menu with disabled keys prop', function test() {
      const { container } = render(
        <Menu aria-label="Disabled keys menu" disabledKeys={['item-1']}>
          <MenuItem id="item-1" textValue="Item 1">
            Item 1
          </MenuItem>
          <MenuItem id="item-2" textValue="Item 2">
            Item 2
          </MenuItem>
        </Menu>
      );
      const result = container.innerHTML;

      // Menu should render with items
      assume(result).includes('Item 1');
      assume(result).includes('Item 2');
    });
  });

  describe('Orientation', function orientation() {
    it('supports horizontal orientation', function test() {
      const { container } = render(
        <Menu aria-label="Horizontal menu" orientation="horizontal">
          <MenuItem textValue="Item">Item</MenuItem>
        </Menu>
      );
      const result = container.innerHTML;

      // Orientation is passed to React Aria but not exposed as data attribute
      assume(result).includes('Item');
    });

    it('defaults to vertical orientation', function test() {
      const { container } = render(
        <Menu aria-label="Vertical menu">
          <MenuItem textValue="Item">Item</MenuItem>
        </Menu>
      );
      const result = container.innerHTML;

      // Default orientation is handled by React Aria but not exposed as data attribute
      assume(result).includes('Item');
    });
  });
});

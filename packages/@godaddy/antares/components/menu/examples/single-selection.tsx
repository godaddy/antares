import {
  Button,
  Icon,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  SubmenuTrigger,
  Text,
  type Selection
} from '@godaddy/antares';
import { useState } from 'react';

/**
 * Two levels. One row stays selected in the menu, and one row stays selected in the submenu.
 * @title Single selection
 * @order 3
 */
export function SingleSelectionExample() {
  const [view, setView] = useState<Selection>(new Set(['rulers']));
  const [guides, setGuides] = useState<Selection>(new Set(['layout']));

  return (
    <MenuTrigger>
      <Button variant="primary">View</Button>
      <Popover aria-label="Menu">
        <Menu aria-label="View" selectionMode="single" selectedKeys={view} onSelectionChange={setView}>
          <SelectItem id="grid">Pixel grid</SelectItem>
          <SelectItem id="rulers">Rulers</SelectItem>
          <SelectItem id="comments" isDisabled>
            Comments
          </SelectItem>
          <SubmenuTrigger>
            <MenuItem id="guides" textValue="Guides">
              <Text slot="label">Guides</Text>
              <Icon icon="chevron-right" />
            </MenuItem>
            <Popover aria-label="Menu">
              <Menu aria-label="Guides" selectionMode="single" selectedKeys={guides} onSelectionChange={setGuides}>
                <SelectItem id="layout">Layout</SelectItem>
                <SelectItem id="columns">Columns</SelectItem>
                <SelectItem id="baseline">Baseline</SelectItem>
              </Menu>
            </Popover>
          </SubmenuTrigger>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}

function SelectItem({ id, isDisabled, children }: { id: string; isDisabled?: boolean; children: string }) {
  return (
    <MenuItem id={id} textValue={children} isDisabled={isDisabled}>
      {({ isSelected }) => (
        <>
          <Text slot="label">{children}</Text>
          {isSelected ? <Icon icon="checkmark" /> : null}
        </>
      )}
    </MenuItem>
  );
}

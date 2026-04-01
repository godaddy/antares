import {
  Button,
  Icon,
  Menu,
  MenuHeader,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
  Text
} from '@godaddy/antares';
import { Keyboard as RACKeyboard } from 'react-aria-components';
import type { Selection } from 'react-aria-components';
import { useState } from 'react';

interface PlaygroundExampleProps {
  size?: 'sm' | 'md';
  selectionMode?: 'none' | 'single' | 'multiple';
  matchWidth?: boolean;
  withIcons?: boolean;
  withSections?: boolean;
  withKeyboardShortcuts?: boolean;
  disabledItems?: boolean;
}

export function PlaygroundExample({
  size = 'md',
  selectionMode = 'none',
  matchWidth = false,
  withIcons = false,
  withSections = false,
  withKeyboardShortcuts = false,
  disabledItems = false
}: PlaygroundExampleProps) {
  const [selected, setSelected] = useState<Selection>(new Set());

  const disabledKeys = disabledItems ? ['print', 'export'] : [];

  const menuProps =
    selectionMode !== 'none'
      ? { selectionMode, selectedKeys: selected, onSelectionChange: setSelected, disabledKeys }
      : { disabledKeys };

  if (withSections) {
    return (
      <MenuTrigger matchWidth={matchWidth}>
        <Button style={matchWidth ? { width: '200px' } : undefined}>Actions</Button>
        <Menu size={size} {...menuProps}>
          <MenuSection>
            <MenuHeader>File Operations</MenuHeader>
            <MenuItem id="new">
              {withIcons && <Icon icon="file-plus" />}
              <Text slot="label">New File</Text>
              {withKeyboardShortcuts && <RACKeyboard>⌘N</RACKeyboard>}
            </MenuItem>
            <MenuItem id="open">
              {withIcons && <Icon icon="folder-open" />}
              <Text slot="label">Open</Text>
              {withKeyboardShortcuts && <RACKeyboard>⌘O</RACKeyboard>}
            </MenuItem>
            <MenuItem id="save">
              {withIcons && <Icon icon="save" />}
              <Text slot="label">Save</Text>
              {withKeyboardShortcuts && <RACKeyboard>⌘S</RACKeyboard>}
            </MenuItem>
          </MenuSection>
          <MenuSeparator />
          <MenuSection>
            <MenuHeader>Edit</MenuHeader>
            <MenuItem id="cut">
              {withIcons && <Icon icon="scissors" />}
              <Text slot="label">Cut</Text>
              {withKeyboardShortcuts && <RACKeyboard>⌘X</RACKeyboard>}
            </MenuItem>
            <MenuItem id="copy">
              {withIcons && <Icon icon="copy" />}
              <Text slot="label">Copy</Text>
              {withKeyboardShortcuts && <RACKeyboard>⌘C</RACKeyboard>}
            </MenuItem>
            <MenuItem id="paste">
              {withIcons && <Icon icon="clipboard" />}
              <Text slot="label">Paste</Text>
              {withKeyboardShortcuts && <RACKeyboard>⌘V</RACKeyboard>}
            </MenuItem>
          </MenuSection>
          <MenuSeparator />
          <MenuSection>
            <MenuItem id="print">
              {withIcons && <Icon icon="printer" />}
              <Text slot="label">Print</Text>
            </MenuItem>
            <MenuItem id="export">
              {withIcons && <Icon icon="download" />}
              <Text slot="label">Export</Text>
            </MenuItem>
          </MenuSection>
        </Menu>
      </MenuTrigger>
    );
  }

  return (
    <MenuTrigger matchWidth={matchWidth}>
      <Button style={matchWidth ? { width: '200px' } : undefined}>Actions</Button>
      <Menu size={size} {...menuProps}>
        <MenuItem id="new">
          {withIcons && <Icon icon="file-plus" />}
          <Text slot="label">New File</Text>
          {withKeyboardShortcuts && <RACKeyboard>⌘N</RACKeyboard>}
        </MenuItem>
        <MenuItem id="open">
          {withIcons && <Icon icon="folder-open" />}
          <Text slot="label">Open</Text>
          {withKeyboardShortcuts && <RACKeyboard>⌘O</RACKeyboard>}
        </MenuItem>
        <MenuItem id="save">
          {withIcons && <Icon icon="save" />}
          <Text slot="label">Save</Text>
          {withKeyboardShortcuts && <RACKeyboard>⌘S</RACKeyboard>}
        </MenuItem>
        <MenuSeparator />
        <MenuItem id="cut">
          {withIcons && <Icon icon="scissors" />}
          <Text slot="label">Cut</Text>
          {withKeyboardShortcuts && <RACKeyboard>⌘X</RACKeyboard>}
        </MenuItem>
        <MenuItem id="copy">
          {withIcons && <Icon icon="copy" />}
          <Text slot="label">Copy</Text>
          {withKeyboardShortcuts && <RACKeyboard>⌘C</RACKeyboard>}
        </MenuItem>
        <MenuItem id="paste">
          {withIcons && <Icon icon="clipboard" />}
          <Text slot="label">Paste</Text>
          {withKeyboardShortcuts && <RACKeyboard>⌘V</RACKeyboard>}
        </MenuItem>
        <MenuSeparator />
        <MenuItem id="print">
          {withIcons && <Icon icon="printer" />}
          <Text slot="label">Print</Text>
        </MenuItem>
        <MenuItem id="export">
          {withIcons && <Icon icon="download" />}
          <Text slot="label">Export</Text>
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
}

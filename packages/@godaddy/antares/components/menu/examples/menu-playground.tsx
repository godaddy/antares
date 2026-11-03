import { useState } from 'react';
import {
  Button,
  CheckboxIndicator,
  Header,
  Heading,
  Icon,
  Menu,
  MenuGroup,
  MenuItem,
  Separator,
  MenuTrigger,
  Popover,
  SubmenuTrigger,
  Text,
  type Selection
} from '@godaddy/antares';

/** Props for the menu playground example. */
export interface PlaygroundExampleProps {
  /** Enable single selection mode. */
  singleSelection?: boolean;
  /** Enable multiple selection mode. */
  multipleSelection?: boolean;
  /** Show group headers. */
  showGroups?: boolean;
  /** Show submenu. */
  showSubmenu?: boolean;
  /** Show separators. */
  showSeparators?: boolean;
}

/** @ignore */
export function PlaygroundExample({
  singleSelection = true,
  multipleSelection = false,
  showGroups = true,
  showSubmenu = true,
  showSeparators = true
}: PlaygroundExampleProps) {
  const [selected, setSelected] = useState<Selection>(new Set(['sort-date']));
  const [multiSelected, setMultiSelected] = useState<Selection>(new Set(['name', 'date']));

  const selectionMode = multipleSelection ? 'multiple' : singleSelection ? 'single' : 'none';
  const items =
    selectionMode === 'single'
      ? [
          { id: 'sort-date', label: 'Sort by Date' },
          { id: 'sort-name', label: 'Sort by Name' },
          { id: 'sort-size', label: 'Sort by Size' }
        ]
      : [
          { id: 'name', label: 'Name' },
          { id: 'date', label: 'Date Modified' },
          { id: 'size', label: 'Size' }
        ];
  const rows = items.map(({ id, label }) => (
    <PlaygroundItem key={id} id={id}>
      {label}
    </PlaygroundItem>
  ));

  return (
    <MenuTrigger>
      <Button variant="primary">Menu Playground</Button>
      <Popover aria-label="Menu">
        <Menu
          aria-label="Example Menu"
          selectionMode={selectionMode}
          selectedKeys={
            selectionMode === 'single' ? selected : selectionMode === 'multiple' ? multiSelected : undefined
          }
          onSelectionChange={
            selectionMode === 'single' ? setSelected : selectionMode === 'multiple' ? setMultiSelected : undefined
          }
        >
          {/* First Group */}
          {showGroups ? (
            <MenuGroup>
              <Header>
                <Heading>View</Heading>
              </Header>
              {rows}
            </MenuGroup>
          ) : (
            rows
          )}

          {showGroups && showSeparators && <Separator />}

          {/* Second Group with Submenu */}
          {showGroups && (
            <MenuGroup>
              <Header>
                <Heading>Share</Heading>
              </Header>
              {showSubmenu ? (
                <SubmenuTrigger>
                  <MenuItem id="share-with" textValue="Share with">
                    <Text slot="label">Share with</Text>
                    <Icon icon="chevron-right" />
                  </MenuItem>
                  <Popover aria-label="Share options">
                    <Menu aria-label="Share options">
                      <PlaygroundItem id="email">Email</PlaygroundItem>
                      <PlaygroundItem id="link">Link</PlaygroundItem>
                      <PlaygroundItem id="social">Social Media</PlaygroundItem>
                    </Menu>
                  </Popover>
                </SubmenuTrigger>
              ) : (
                <>
                  <PlaygroundItem id="email">Email</PlaygroundItem>
                  <PlaygroundItem id="link">Link</PlaygroundItem>
                  <PlaygroundItem id="social">Social Media</PlaygroundItem>
                </>
              )}
            </MenuGroup>
          )}

          {showGroups && showSeparators && <Separator />}

          {/* Third Group */}
          {showGroups && (
            <MenuGroup>
              <Header>
                <Heading>More</Heading>
              </Header>
              <PlaygroundItem id="rename">Rename</PlaygroundItem>
              <PlaygroundItem id="duplicate">Duplicate</PlaygroundItem>
              <PlaygroundItem id="delete">Delete</PlaygroundItem>
            </MenuGroup>
          )}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}

function PlaygroundItem({ id, children }: { id: string; children: string }) {
  return (
    <MenuItem id={id} textValue={children}>
      {({ isSelected, selectionMode }) => (
        <>
          {selectionMode === 'multiple' ? <CheckboxIndicator isSelected={isSelected} /> : null}
          <Text slot="label">{children}</Text>
          {selectionMode === 'single' && isSelected ? <Icon icon="checkmark" /> : null}
        </>
      )}
    </MenuItem>
  );
}

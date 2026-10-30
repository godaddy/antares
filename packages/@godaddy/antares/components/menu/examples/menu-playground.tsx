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

  const selectionMode = multipleSelection ? 'multiple' : singleSelection ? 'single' : undefined;

  return (
    <MenuTrigger>
      <Button variant="primary">Menu Playground</Button>
      <Popover aria-label="Menu">
        <Menu
          aria-label="Example Menu"
          selectionMode={selectionMode}
          selectedKeys={selectionMode === 'single' ? selected : multiSelected}
          onSelectionChange={selectionMode === 'single' ? setSelected : setMultiSelected}
        >
          {/* First Group */}
          {showGroups && (
            <MenuGroup>
              <Header>
                <Heading>View</Heading>
              </Header>
              {singleSelection ? (
                <>
                  <MenuItem id="sort-date">Sort by Date</MenuItem>
                  <MenuItem id="sort-name">Sort by Name</MenuItem>
                  <MenuItem id="sort-size">Sort by Size</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem id="name" textValue="Name">
                    {({ isSelected }) => (
                      <>
                        <CheckboxIndicator isSelected={isSelected} />
                        <Text slot="label">Name</Text>
                      </>
                    )}
                  </MenuItem>
                  <MenuItem id="date" textValue="Date Modified">
                    {({ isSelected }) => (
                      <>
                        <CheckboxIndicator isSelected={isSelected} />
                        <Text slot="label">Date Modified</Text>
                      </>
                    )}
                  </MenuItem>
                  <MenuItem id="size" textValue="Size">
                    {({ isSelected }) => (
                      <>
                        <CheckboxIndicator isSelected={isSelected} />
                        <Text slot="label">Size</Text>
                      </>
                    )}
                  </MenuItem>
                </>
              )}
            </MenuGroup>
          )}

          {!showGroups && (
            <>
              <MenuItem id="cut">Cut</MenuItem>
              <MenuItem id="copy">Copy</MenuItem>
              <MenuItem id="paste">Paste</MenuItem>
            </>
          )}

          {showSeparators && <Separator />}

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
                      <MenuItem id="email">Email</MenuItem>
                      <MenuItem id="link">Link</MenuItem>
                      <MenuItem id="social">Social Media</MenuItem>
                    </Menu>
                  </Popover>
                </SubmenuTrigger>
              ) : (
                <>
                  <MenuItem id="email">Email</MenuItem>
                  <MenuItem id="link">Link</MenuItem>
                  <MenuItem id="social">Social Media</MenuItem>
                </>
              )}
            </MenuGroup>
          )}

          {showSeparators && <Separator />}

          {/* Third Group */}
          {showGroups && (
            <MenuGroup>
              <Header>
                <Heading>More</Heading>
              </Header>
              <MenuItem id="rename">Rename</MenuItem>
              <MenuItem id="duplicate">Duplicate</MenuItem>
              <MenuItem id="delete" textValue="Delete">
                <Text slot="label">Delete</Text>
              </MenuItem>
            </MenuGroup>
          )}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}

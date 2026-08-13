import { Button, Icon, Menu, MenuGroup, MenuItem, MenuSeparator, MenuTrigger, type MenuProps } from '@godaddy/antares';
import type { Selection } from 'react-aria-components';
import { useState } from 'react';

interface PlaygroundExampleProps {
  size?: MenuProps<object>['size'];
  multiSelect?: boolean;
  withIcons?: boolean;
  withGroups?: boolean;
  disabledItems?: boolean;
}

export function PlaygroundExample({
  size = 'md',
  multiSelect = false,
  withIcons = false,
  withGroups = false,
  disabledItems = false
}: PlaygroundExampleProps) {
  const [selected, setSelected] = useState<Selection>(new Set(['bold']));

  const items = (
    <>
      <MenuItem id="bold" icon={withIcons ? <Icon icon="star" /> : undefined}>
        Bold
      </MenuItem>
      <MenuItem id="italic" icon={withIcons ? <Icon icon="diamond" /> : undefined} isDisabled={disabledItems}>
        Italic
      </MenuItem>
      <MenuItem id="underline" icon={withIcons ? <Icon icon="information" /> : undefined}>
        Underline
      </MenuItem>
    </>
  );

  return (
    <MenuTrigger>
      <Button variant="primary">Format</Button>
      <Menu
        aria-label="Format"
        size={size}
        selectionMode={multiSelect ? 'multiple' : 'none'}
        selectedKeys={multiSelect ? selected : undefined}
        onSelectionChange={multiSelect ? setSelected : undefined}
      >
        {withGroups ? (
          <>
            <MenuGroup label="Style">{items}</MenuGroup>
            <MenuSeparator />
            <MenuGroup label="More">
              <MenuItem id="clear">Clear formatting</MenuItem>
            </MenuGroup>
          </>
        ) : (
          items
        )}
      </Menu>
    </MenuTrigger>
  );
}

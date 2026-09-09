import { useState } from 'react';
import { ChipButton, Icon, Menu, MenuItem, MenuTrigger, Text } from '@godaddy/antares';

/**
 * Use `ChipButton` for Chip presentation without collection semantics.
 * `MenuTrigger` continues to own open state, focus, and keyboard behavior.
 * @title Menu filter trigger
 * @order 9
 */
export function MenuFilterTriggerExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <ChipButton>
        <Text>Location</Text>
        <Icon icon="chevron-down" flip={isOpen ? 'vertical' : undefined} />
      </ChipButton>
      <Menu aria-label="Location">
        <MenuItem id="austin">Austin</MenuItem>
        <MenuItem id="chicago">Chicago</MenuItem>
        <MenuItem id="denver">Denver</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}

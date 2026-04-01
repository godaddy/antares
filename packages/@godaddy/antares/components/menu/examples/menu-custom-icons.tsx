import { Button, Menu, MenuItem, MenuTrigger, SubmenuTrigger } from '@godaddy/antares';
import type { Selection } from 'react-aria-components';
import { useState } from 'react';

export function CustomIconsExample() {
  const [selectedMultiple, setSelectedMultiple] = useState<Selection>(new Set(['bold']));
  const [selectedSingle, setSelectedSingle] = useState<Selection>(new Set(['left']));

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <MenuTrigger>
        <Button>Custom Check Icon</Button>
        <Menu selectionMode="multiple" selectedKeys={selectedMultiple} onSelectionChange={setSelectedMultiple}>
          <MenuItem id="bold">
            <span slot="check">✅</span>
            Bold
          </MenuItem>
          <MenuItem id="italic">
            <span slot="check">✅</span>
            Italic
          </MenuItem>
        </Menu>
      </MenuTrigger>

      <MenuTrigger>
        <Button>Custom Dot Icon</Button>
        <Menu selectionMode="single" selectedKeys={selectedSingle} onSelectionChange={setSelectedSingle}>
          <MenuItem id="left">
            <span slot="dot">▪</span>
            Left
          </MenuItem>
          <MenuItem id="center">
            <span slot="dot">▪</span>
            Center
          </MenuItem>
        </Menu>
      </MenuTrigger>

      <MenuTrigger>
        <Button>Custom Chevron Icon</Button>
        <Menu>
          <SubmenuTrigger>
            <MenuItem id="share">
              <span slot="chevron">→</span>
              Share
            </MenuItem>
            <Menu>
              <MenuItem id="email">Email</MenuItem>
              <MenuItem id="social">Social</MenuItem>
            </Menu>
          </SubmenuTrigger>
        </Menu>
      </MenuTrigger>
    </div>
  );
}

import React, { useState } from 'react';
import { Menu, MenuItem } from '../src';

export function SelectionMenuExample(props: any) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(['autosave']));

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3 style={{ marginTop: 0 }}>Settings (Single Selection)</h3>
      <Menu
        {...props}
        aria-label="Settings"
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys as any}
        style={{
          background: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          padding: '4px',
          minWidth: '200px'
        }}
      >
        <MenuItem
          key="autosave"
          textValue="Autosave"
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          ✓ Autosave
        </MenuItem>
        <MenuItem
          key="notifications"
          textValue="Notifications"
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Notifications
        </MenuItem>
        <MenuItem
          key="dark-mode"
          textValue="Dark mode"
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Dark mode
        </MenuItem>
      </Menu>
      <p style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
        Selected: {Array.from(selectedKeys).join(', ')}
      </p>
    </div>
  );
}

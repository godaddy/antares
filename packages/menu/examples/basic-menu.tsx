import React from 'react';
import { Menu, MenuItem } from '../src';

export function BasicMenuExample(props: any) {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <Menu
        {...props}
        aria-label="File actions"
        onAction={(key) => console.log('Action:', key)}
        style={{
          background: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          padding: '4px',
          minWidth: '200px'
        }}
      >
        <MenuItem
          id="new"
          textValue="New file"
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          New file
        </MenuItem>
        <MenuItem
          id="open"
          textValue="Open..."
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Open...
        </MenuItem>
        <MenuItem
          id="save"
          textValue="Save"
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Save
        </MenuItem>
        <MenuItem
          id="save-as"
          textValue="Save As..."
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Save As...
        </MenuItem>
      </Menu>
    </div>
  );
}

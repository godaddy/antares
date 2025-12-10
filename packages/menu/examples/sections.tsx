import React from 'react';
import { Menu, MenuItem, MenuSection } from '../src';

export function SectionsExample(props: any) {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3 style={{ marginTop: 0 }}>Menu with Sections</h3>
      <Menu
        {...props}
        aria-label="File menu"
        onAction={(key) => console.log('Action:', key)}
        style={{
          background: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          padding: '4px',
          minWidth: '200px'
        }}
      >
        <MenuSection
          title="File"
          style={{
            marginBottom: '4px'
          }}
        >
          <MenuItem
            key="new"
            textValue="New"
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            New
          </MenuItem>
          <MenuItem
            key="open"
            textValue="Open"
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            Open
          </MenuItem>
        </MenuSection>
        <MenuSection
          title="Edit"
          style={{
            marginBottom: '4px'
          }}
        >
          <MenuItem
            key="cut"
            textValue="Cut"
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            Cut
          </MenuItem>
          <MenuItem
            key="copy"
            textValue="Copy"
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            Copy
          </MenuItem>
          <MenuItem
            key="paste"
            textValue="Paste"
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            Paste
          </MenuItem>
        </MenuSection>
      </Menu>
    </div>
  );
}

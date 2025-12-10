import React from 'react';
import { Menu, MenuItem } from '../src';

export function DynamicMenuExample(props: any) {
  const items = [
    { id: '1', name: 'Apple', category: 'fruit' },
    { id: '2', name: 'Banana', category: 'fruit' },
    { id: '3', name: 'Carrot', category: 'vegetable' },
    { id: '4', name: 'Broccoli', category: 'vegetable' }
  ];

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3 style={{ marginTop: 0 }}>Dynamic Menu</h3>
      <Menu
        {...props}
        aria-label="Food items"
        items={items}
        onAction={(key) => console.log('Selected:', key)}
        style={{
          background: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          padding: '4px',
          minWidth: '200px'
        }}
      >
        {(item: any) => (
          <MenuItem
            key={item.id}
            textValue={item.name}
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            {item.name}
            <span style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }}>({item.category})</span>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}

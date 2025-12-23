import React, { useState } from 'react';
import { Menu, MenuItem, MenuTrigger } from '../src';

export function MenuTriggerExample(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3 style={{ marginTop: 0 }}>Menu with Trigger</h3>
      <MenuTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
        <button
          slot="trigger"
          style={{
            padding: '8px 16px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Actions ▼
        </button>
        <div
          slot="menu"
          style={{
            position: 'relative',
            marginTop: '4px'
          }}
        >
          {isOpen && (
            <Menu
              {...props}
              aria-label="Row actions"
              onAction={function handleAction(key) {
                console.log('Action:', key);
                setIsOpen(false);
              }}
              style={{
                background: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                padding: '4px',
                minWidth: '200px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
            >
              <MenuItem
                id="edit"
                textValue="Edit"
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                id="duplicate"
                textValue="Duplicate"
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
              >
                Duplicate
              </MenuItem>
              <MenuItem
                id="delete"
                textValue="Delete"
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  color: '#dc3545'
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          )}
        </div>
      </MenuTrigger>
      <p style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>Menu is {isOpen ? 'open' : 'closed'}</p>
    </div>
  );
}

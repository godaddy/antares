/* v8 ignore next */
import React, { useState } from 'react';
import { Drawer } from '@bento/drawer';
import { Button } from '@bento/button';

/**
 * Example component demonstrating constrained Drawer usage with min and max width.
 *
 * @param {any} args - The component props.
 * @returns {JSX.Element} The rendered constrained Drawer.
 * @public
 */
export function ConstrainedDrawerExample(args: any) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{ display: 'flex', height: '400px', position: 'relative' }}>
      <Drawer
        {...args}
        placement="left"
        isExpanded={isExpanded}
        minWidth="60px"
        maxWidth="300px"
        aria-expanded={isExpanded}
      >
        <nav style={{ padding: '16px' }}>
          <h3>Navigation</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '8px' }}>Home</li>
            <li style={{ marginBottom: '8px' }}>About</li>
            <li style={{ marginBottom: '8px' }}>Contact Information</li>
          </ul>
        </nav>
      </Drawer>
      <div style={{ flex: 1, padding: '16px' }}>
        <Button onPress={() => setIsExpanded(!isExpanded)}>{isExpanded ? 'Collapse' : 'Expand'} Drawer</Button>
        <p>Main content area</p>
      </div>
    </div>
  );
}

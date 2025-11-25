/* v8 ignore next */
import React, { useState } from 'react';
import { Drawer } from '@bento/drawer';
import { Button } from '@bento/button';
import { Container } from '@bento/container';

/**
 * Example component demonstrating basic Drawer usage.
 *
 * @param {any} args - The component props.
 * @returns {JSX.Element} The rendered Drawer with toggle button.
 * @public
 */
export function BasicDrawerExample(args: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="drawer-parent-flex" id="basic">
      <Drawer {...args} isOpen={isOpen} className="drawer-content">
        <nav>
          <h3>Navigation</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '8px' }}>Home</li>
            <li style={{ marginBottom: '8px' }}>About</li>
            <li style={{ marginBottom: '8px' }}>Contact</li>
          </ul>
        </nav>
      </Drawer>
      <Container className="main-content">
        <p>Main content area</p>
        <Button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Close' : 'Open'} Drawer</Button>
      </Container>
    </div>
  );
}

/* v8 ignore next */
import React, { useState, useRef } from 'react';
import { Drawer } from '@bento/drawer';
import { Button } from '@bento/button';
import { Container } from '@bento/container';

/**
 * Example component demonstrating Drawer dismissal behaviors using React Aria hooks.
 * This example shows how to use useOverlay to enable all dismissal methods:
 * - Dismiss on Escape key
 * - Dismiss on outside click (with optional filter)
 *
 * @param {any} args - The component props.
 * @returns {JSX.Element} The rendered Drawer with dismissal features.
 * @public
 */
export function DismissalDrawerExample(args: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="drawer-parent-flex" id="dismissal">
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

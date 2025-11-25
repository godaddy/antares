/* v8 ignore next */
import React, { useState } from 'react';
import { Drawer } from '@bento/drawer';
import { Button } from '@bento/button';
import { Container } from '@bento/container';

/**
 * Example component demonstrating constrained Drawer usage with min and max width.
 *
 * @param {any} args - The component props.
 * @returns {JSX.Element} The rendered constrained Drawer.
 * @public
 */
export function ConstrainedDrawerExample(args: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="drawer-parent-flex" id="constrained">
      <Drawer {...args} open={open} className="drawer-content">
        <nav>
          <h3>Navigation</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '8px' }}>Home</li>
            <li style={{ marginBottom: '8px' }}>About</li>
            <li style={{ marginBottom: '8px' }}>Contact Information</li>
          </ul>
        </nav>
      </Drawer>
      <Container className="main-content">
        <p>Main content area</p>
        <p>In this example <code>aria-hidden</code> is not used since the content remains visible when the drawer is closed.</p>
        <Button onClick={() => setOpen(!open)}>{open ? 'Close' : 'Open'} Drawer</Button>
      </Container>
    </div>
  );
}

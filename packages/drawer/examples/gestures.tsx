/* v8 ignore next */
/**
 * This example demonstrates gesture-driven bottom sheet using CSS scroll snap features.
 * The drawer uses CSS scroll snap to provide smooth gesture interactions without
 * requiring a motion library dependency.
 */
import React, { useState } from 'react';
import { Drawer } from '@bento/drawer';
import { Button } from '@bento/button';
import { Portal } from '@bento/portal';
import { Container } from '@bento/container';

/**
 * Example component demonstrating bottom sheet Drawer usage with CSS scroll snap gestures.
 *
 * @param {any} args - The component props.
 * @returns {JSX.Element} The rendered bottom sheet Drawer with gesture support.
 * @public
 */
export function GestureDrawerExample(args: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="drawer-parent-flex" id="gestures">
      <div className="main-content">
        <p>Main content area</p>
        <Button onClick={() => setOpen(!open)}>{open ? 'Close' : 'Open'} Bottom Sheet</Button>
      </div>

      <Portal mounted={true}>
        {open && (
          <Container className="drawer-overlay" onClick={() => setOpen(false)} />
        )}
        <Drawer {...args} open={open} aria-hidden={!open} className="drawer-content">
          <section>
            <span className="drawer-handle"/>
            <h2>Bottom Sheet</h2>
            <p>You can drag the handle to expand or collapse the drawer.</p>
            <p>You can add any content here.</p>
            <Button onPress={() => setOpen(false)}>Close</Button>
          </section>
        </Drawer>
      </Portal>
    </div>
  );
}

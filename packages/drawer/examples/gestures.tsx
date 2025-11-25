/* v8 ignore next */
/**
 * This example demonstrates gesture-driven bottom sheet using CSS scroll snap features.
 * The drawer uses CSS scroll snap to provide smooth gesture interactions without
 * requiring a motion library dependency.
 */
import React, { useState, useRef, useEffect } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="drawer-parent-flex" id="gestures">
      <div className="main-content">
        <p>Main content area</p>
        <Button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Close' : 'Open'} Bottom Sheet</Button>
      </div>

      <Portal mounted={isOpen}>
        <Container className="drawer-overlay" onClick={() => setIsOpen(false)} />
        <Drawer {...args} isOpen={isOpen} className="drawer-content">
          <h2>Bottom Sheet</h2>
          <p>This is a bottom sheet drawer example.</p>
          <p>You can add any content here.</p>
          <Button onPress={() => setIsOpen(false)}>Close</Button>
        </Drawer>
      </Portal>
    </div>
  );
}

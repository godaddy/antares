/* v8 ignore next */
import React, { useState } from 'react';
import { Drawer } from '@bento/drawer';
import { Button } from '@bento/button';
import { Portal } from '@bento/portal';
import { Container } from '@bento/container';
import { useOverlay } from 'react-aria';

/**
 * Example component demonstrating bottom sheet Drawer usage.
 *
 * @param {any} args - The component props.
 * @returns {JSX.Element} The rendered bottom sheet Drawer.
 * @public
 */
/* v8 ignore next */
export function BottomSheetExample(args: any) {
  const [isOpen, setIsOpen] = useState(false);
  const { overlayProps } = useOverlay({ onClose: () => setIsOpen(false) }, { isOpen: true });
  return (
    <div className="drawer-parent-flex" id="bottom-sheet">
      <div className="main-content">
        <p>Main content area</p>
        <Button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Close' : 'Open'} Bottom Sheet</Button>
      </div>

      <Portal mounted={isOpen}>
        <Container {...overlayProps} className="drawer-overlay" onClick={() => setIsOpen(false)} role="dialog" />
        <Drawer {...args} isOpen={isOpen} className="drawer-content">
          <section>
            <h2>Bottom Sheet</h2>
            <p>This is a bottom sheet drawer example.</p>
            <p>You can add any content here.</p>
            <Button onPress={() => setIsOpen(false)}>Close</Button>
          </section>
        </Drawer>
      </Portal>
    </div>
  );
}

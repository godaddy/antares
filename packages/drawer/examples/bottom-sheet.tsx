/* v8 ignore next */
import React, { useState, useRef } from 'react';
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
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // onClose callback is triggered by useOverlay when Escape is pressed (delegated functionality)
  /* v8 ignore next */
  const { overlayProps } = useOverlay({ onClose: () => setOpen(false), isOpen: open }, overlayRef);
  return (
    <div className="drawer-parent-flex" id="bottom-sheet">
      <div className="main-content">
        <p>Main content area</p>
        <Button onClick={() => setOpen(!open)}>{open ? 'Close' : 'Open'} Bottom Sheet</Button>
      </div>

      <Portal mounted={true}>
        {open && (
          <Container
            {...overlayProps}
            ref={overlayRef}
            className="drawer-overlay"
            onClick={() => setOpen(false)}
            role="dialog"
          />
        )}
        <Drawer {...args} open={open} aria-hidden={!open} className="drawer-content">
          <section>
            <h2>Bottom Sheet</h2>
            <p>This is a bottom sheet drawer example.</p>
            <p>You can add any content here.</p>
            <Button onPress={() => setOpen(false)}>Close</Button>
          </section>
        </Drawer>
      </Portal>
    </div>
  );
}

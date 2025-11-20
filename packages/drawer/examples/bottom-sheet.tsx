/* v8 ignore next */
import React, { useState } from 'react';
import { Drawer } from '@bento/drawer';
import { Button } from '@bento/button';
import { Portal } from '@bento/portal';

/**
 * Example component demonstrating bottom sheet Drawer usage.
 *
 * @param {any} args - The component props.
 * @returns {JSX.Element} The rendered bottom sheet Drawer.
 * @public
 */
/* v8 ignore next */
export function BottomSheetExample(args: any) {
  const [isExpanded, setIsExpanded] = useState(false);

  /* v8 ignore next */
  const handleOverlayClick = () => setIsExpanded(false);
  /* v8 ignore next */
  const handleDrawerClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div style={{ position: 'relative', height: '400px' }}>
      <div style={{ padding: '16px' }}>
        <Button onPress={() => setIsExpanded(!isExpanded)}>{isExpanded ? 'Close' : 'Open'} Bottom Sheet</Button>
        <p>Main content area</p>
      </div>
      <Portal mounted={true}>
        <div
          style={{
            position: 'fixed',
            display: 'flex',
            inset: 0,
            backgroundColor: isExpanded ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
            pointerEvents: isExpanded ? 'auto' : 'none',
            transition: 'background-color 0.3s ease-in-out'
          }}
          onClick={handleOverlayClick}
        >
          <Drawer
            {...args}
            placement="bottom"
            isExpanded={isExpanded}
            minHeight="0"
            maxHeight="50vh"
            role="dialog"
            aria-expanded={isExpanded}
            aria-hidden={!isExpanded}
            onClick={handleDrawerClick}
          >
            <div
              style={{
                backgroundColor: 'white',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
                padding: '24px'
              }}
            >
              <h2>Bottom Sheet</h2>
              <p>This is a bottom sheet drawer example.</p>
              <p>You can add any content here.</p>
              <Button onPress={() => setIsExpanded(false)}>Close</Button>
            </div>
          </Drawer>
        </div>
      </Portal>
    </div>
  );
}

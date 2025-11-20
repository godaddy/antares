/* v8 ignore next */
import React, { useState, useRef } from 'react';
import { Drawer } from '@bento/drawer';
import { Button } from '@bento/button';
import { useOverlay } from 'react-aria';

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
  const [isExpanded, setIsExpanded] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => setIsExpanded(false);

  /* v8 ignore next 5 */
  function shouldCloseOnInteractOutside(element: Element | null) {
    // Don't dismiss if clicking on the toggle button
    if (element instanceof Element) {
      return !element.closest('[data-dismissal-toggle]');
    }
    return true;
  }

  // Use useOverlay hook to enable dismissal behaviors
  const { overlayProps } = useOverlay(
    {
      isOpen: isExpanded,
      onClose: handleClose,
      // Enable escape key dismissal
      isKeyboardDismissDisabled: false,
      // Enable outside click dismissal
      isDismissable: true,
      // Optional: filter which outside clicks should dismiss
      shouldCloseOnInteractOutside
    },
    drawerRef
  );

  return (
    <div style={{ display: 'flex', height: '400px', position: 'relative' }}>
      <Drawer
        {...args}
        ref={drawerRef}
        {...overlayProps}
        placement="left"
        isExpanded={isExpanded}
        aria-expanded={isExpanded}
      >
        <nav style={{ padding: '16px' }}>
          <h3>Dismissal Example</h3>
          <p>This drawer can be dismissed in multiple ways:</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '8px' }}>
              • Press the <strong>Escape</strong> key
            </li>
            <li style={{ marginBottom: '8px' }}>• Click outside the drawer</li>
          </ul>
          <p style={{ marginTop: '16px' }}>
            <strong>Note:</strong> Clicking the toggle button won't dismiss the drawer (filtered out).
          </p>
          <div style={{ marginTop: '16px' }}>
            <button>Focusable Item 1</button>
            <button style={{ marginLeft: '8px' }}>Focusable Item 2</button>
          </div>
        </nav>
      </Drawer>
      <div style={{ flex: 1, padding: '16px' }}>
        <Button onPress={() => setIsExpanded(!isExpanded)} data-dismissal-toggle>
          {isExpanded ? 'Close' : 'Open'} Drawer
        </Button>
        <p style={{ marginTop: '16px' }}>
          This drawer demonstrates all dismissal methods enabled via the <code>useOverlay</code> hook from React Aria.
        </p>
      </div>
    </div>
  );
}

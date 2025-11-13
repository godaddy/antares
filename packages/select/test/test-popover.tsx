import React from 'react';

/**
 * Minimal Popover wrapper for tests that keeps content in DOM when closed.
 * Uses simple visibility hiding instead of removing from DOM.
 * This matches expected Bento Popover behavior (content stays in DOM for accessibility/SSR).
 */
export function Popover({ children, ...props }: React.PropsWithChildren<any>) {
  return <div {...props}>{children}</div>;
}

/**
 * Simple Value component for tests
 */
export function ValueDisplay({ selectedItem, placeholder, ...props }: any) {
  return <span {...props}>{selectedItem ? selectedItem.textValue : placeholder}</span>;
}

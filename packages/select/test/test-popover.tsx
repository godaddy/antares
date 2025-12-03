import React, { useRef } from 'react';
import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';

/**
 * Minimal Popover wrapper for tests and Storybook.
 * Select handles all positioning and overlay behavior via useOverlay and useOverlayPosition.
 *
 * Wrapped with withSlots to properly receive slot props from Select.
 */
export const Popover = withSlots('TestPopover', function Popover(args: any) {
  const fallbackRef = useRef<HTMLDivElement>(null);
  const { props, apply } = useProps(args);
  const { children, style = {}, ref } = props;
  const open = props['data-open'] === true || props['data-open'] === 'true';

  // Use the ref from Select (passed via slot props), or fallback to local ref
  const popoverRef = ref || fallbackRef;

  return (
    <div
      {...apply(props, ['children', 'style', 'ref'])}
      ref={popoverRef}
      style={{
        ...style,
        display: open ? undefined : 'none',
        background: 'white',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        zIndex: 1000
      }}
    >
      {children}
    </div>
  );
});

/**
 * Simple Value component for tests and Storybook.
 * Displays selected item or placeholder text.
 *
 * Wrapped with withSlots to receive slot props from Select.
 */
export const ValueDisplay = withSlots('TestValueDisplay', function ValueDisplay(args: any) {
  const { props, apply } = useProps(args);
  const { selectedItem, placeholder } = props;
  return (
    <span {...apply(props, ['selectedItem', 'placeholder'])} {...(!selectedItem && { 'data-placeholder': 'true' })}>
      {selectedItem ? selectedItem.textValue : placeholder}
    </span>
  );
});

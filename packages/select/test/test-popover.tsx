import React, { useRef } from 'react';
import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import { useOverlayPosition } from 'react-aria';

/**
 * Minimal Popover wrapper for tests and Storybook with proper positioning.
 * Uses React Aria's positioning. Dismiss behavior is handled by Select's useOverlay.
 *
 * Wrapped with withSlots to properly receive slot props from Select.
 */
export const Popover = withSlots('TestPopover', function Popover(args: any) {
  const { props } = useProps(args);
  const {
    children,
    style,
    isOpen: _isOpen,
    preventFocusOnPress: _preventFocusOnPress,
    isDisabled: _isDisabled,
    onClose: _onClose,
    triggerRef,
    placement,
    offset,
    crossOffset,
    shouldFlip,
    containerPadding,
    ref,
    ...rest
  } = props;
  const open = rest['data-open'] === 'true';

  // Use the ref from Select (passed via slot props), or create a fallback
  const popoverRef = ref || useRef<HTMLDivElement>(null);

  // Only use positioning in browser (not SSR)
  const { overlayProps: positionProps }: { overlayProps: any } = triggerRef
    ? useOverlayPosition({
        targetRef: triggerRef,
        overlayRef: popoverRef,
        placement: placement || 'bottom start',
        offset: offset || 4,
        crossOffset: crossOffset || 0,
        shouldFlip: shouldFlip !== false,
        containerPadding: containerPadding || 12,
        isOpen: open
      })
    : { overlayProps: {} };

  return (
    <div
      {...positionProps}
      {...rest}
      ref={popoverRef}
      style={{
        ...style,
        ...positionProps.style,
        display: open ? undefined : 'none',
        position: triggerRef ? 'absolute' : undefined,
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
  const { props } = useProps(args);
  const { selectedItem, placeholder, ...rest } = props;
  return <span {...rest}>{selectedItem ? selectedItem.textValue : placeholder}</span>;
});

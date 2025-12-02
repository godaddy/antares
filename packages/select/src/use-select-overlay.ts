import React from 'react';
import { useOverlay, useOverlayPosition, usePreventScroll, type Placement } from 'react-aria';

/**
 * Custom hook that manages overlay behavior for Select component.
 * Handles dismiss behavior, positioning, and scroll prevention.
 *
 * @internal
 */
export function useSelectOverlay(
  state: { isOpen: boolean; close: () => void },
  processedProps: {
    placement?: Placement;
    offset?: number;
    crossOffset?: number;
    shouldFlip?: boolean;
    containerPadding?: number;
  },
  popoverRef: React.RefObject<HTMLDivElement>,
  triggerRef: React.RefObject<HTMLButtonElement>
) {
  // Expose close handler via slot props to allow custom popover components
  // to dismiss the overlay without tight coupling to Select internals.
  const handleClose = React.useCallback(
    function handleClose() {
      state.close();
    },
    [state]
  );

  // useOverlay handles dismiss behavior (Escape key, outside clicks).
  // isDismissable allows users to close by clicking outside the popover.
  // shouldCloseOnBlur is false because Select manages focus differently.
  const { overlayProps } = useOverlay(
    {
      isOpen: state.isOpen,
      onClose: handleClose,
      isDismissable: true,
      shouldCloseOnBlur: false
    },
    popoverRef
  );

  // useOverlayPosition calculates optimal popover placement relative to trigger,
  // automatically flipping to opposite side when space is limited.
  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef: popoverRef,
    placement: processedProps.placement ?? 'bottom start',
    offset: processedProps.offset,
    crossOffset: processedProps.crossOffset,
    shouldFlip: processedProps.shouldFlip ?? true,
    containerPadding: processedProps.containerPadding ?? 12,
    isOpen: state.isOpen
  });

  // Prevent body scroll when open to keep options in viewport during keyboard navigation.
  usePreventScroll({ isDisabled: !state.isOpen });

  return { overlayProps, positionProps, onClose: handleClose };
}

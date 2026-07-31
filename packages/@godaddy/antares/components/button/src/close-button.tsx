import { forwardRef } from 'react';
import { Icon } from '#components/icon';
import { Button, type ButtonProps } from './button.tsx';

export interface CloseButtonProps extends Omit<ButtonProps, 'children'> {}

/**
 * A Button preset for dismissing an overlay (Modal, Popover, ...).
 *
 * Always renders an `x` icon with `aria-label="Close"` and defaults to `slot="close"`, so it
 * picks up the overlay's close behavior from RAC with no wiring. `onPress` chains, so extra
 * logic runs in addition to the built-in close. For a labelled dismiss action (e.g. "Cancel"),
 * use a raw `<Button slot="close">Cancel</Button>` instead.
 *
 * @param props - The properties {@link CloseButtonProps} passed to the component.
 *
 * @example
 * ```tsx
 * <CloseButton />
 * ```
 */
export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(function CloseButton(props, ref) {
  return (
    <Button slot="close" aria-label="Close" {...props} ref={ref}>
      <Icon icon="x" />
    </Button>
  );
});

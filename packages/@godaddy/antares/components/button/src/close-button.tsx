import { forwardRef } from 'react';
import { Icon } from '#components/icon';
import { Button, type ButtonProps } from './button.tsx';

export interface CloseButtonProps extends ButtonProps {}

/**
 * A Button preset for dismissing an overlay (Modal, Popover, ...).
 *
 * Defaults to `slot="close"`, so it picks up the overlay's close behavior from
 * RAC with no wiring. With no children it renders an `x` icon and an
 * `aria-label="Close"`; pass children (e.g. "Cancel") to render a labelled
 * button that still closes. Any prop can be overridden and handlers chain, so
 * `onPress` runs in addition to the built-in close.
 *
 * @param props - The properties {@link CloseButtonProps} passed to the component.
 *
 * @example
 * ```tsx
 * <CloseButton />
 * <CloseButton variant="secondary">Cancel</CloseButton>
 * ```
 */
export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(function CloseButton(props, ref) {
  const { children, ...rest } = props;
  const hasChildren = children != null;

  return (
    <Button slot="close" aria-label={hasChildren ? undefined : 'Close'} {...rest} ref={ref}>
      {hasChildren ? children : <Icon icon="x" />}
    </Button>
  );
});

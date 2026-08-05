import { forwardRef, type RefObject, type ReactNode } from 'react';
import { cx } from 'cva';
import {
  Popover as RACPopover,
  type PopoverProps as RACPopoverProps,
  DialogTrigger as RACDialogTrigger,
  type DialogTriggerProps as RACDialogTriggerProps,
  OverlayArrow as RACOverlayArrow
} from 'react-aria-components';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { OverlayDialog } from '#components/_internal/overlay-dialog';
import styles from './index.module.css';

export interface PopoverTriggerProps extends RACDialogTriggerProps {}

export interface PopoverProps extends Omit<RACPopoverProps, 'children' | 'className'>, FlexOwnProps {
  /** The content of the popover. */
  children?: ReactNode;

  /** Whether to hide the arrow. */
  hideArrow?: boolean;

  /** Additional class name for the popover panel. */
  className?: string;

  /**
   * The ref for the element which the popover positions itself with respect to.
   * When used within `PopoverTrigger` component, this is set automatically.
   */
  triggerRef?: RefObject<Element | null>;
}

/**
 * An overlay positioned relative to a trigger.
 *
 * @param props - {@link PopoverProps}
 */
export const Popover = forwardRef<HTMLElement, PopoverProps>(function Popover(props, ref) {
  const {
    className,
    children,
    hideArrow,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    ...rest
  } = props;

  return (
    <Flex
      ref={ref}
      elevation="overlay"
      data-noarrow={hideArrow}
      rounding="md"
      {...rest}
      as={RACPopover}
      className={cx(styles.popover, className)}
    >
      {hideArrow ? null : <RACOverlayArrow aria-hidden="true" className={styles.arrow} />}
      <OverlayDialog
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
      >
        {children}
      </OverlayDialog>
    </Flex>
  );
});

/**
 * Popover trigger component.
 *
 * @param props - {@link PopoverTriggerProps}
 */
export const PopoverTrigger = function PopoverTrigger(props: PopoverTriggerProps) {
  return <RACDialogTrigger {...props} />;
};

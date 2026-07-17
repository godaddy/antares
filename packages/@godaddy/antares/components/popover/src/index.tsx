import { forwardRef, type CSSProperties, type RefObject, type ReactNode } from 'react';
import { cx } from 'cva';
import {
  Dialog as RACDialog,
  type DialogProps as RACDialogProps,
  Popover as RACPopover,
  type PopoverProps as RACPopoverProps,
  DialogTrigger as RACDialogTrigger,
  type DialogTriggerProps as RACDialogTriggerProps,
  OverlayArrow as RACOverlayArrow
} from 'react-aria-components';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { Button } from '#components/button';
import { Icon } from '#components/icon';
import styles from './index.module.css';

interface ContentProps extends RACDialogProps, FlexOwnProps {}

export interface PopoverTriggerProps extends RACDialogTriggerProps {}

export interface PopoverProps extends RACPopoverProps, FlexOwnProps {
  /** The content to display inside the popover. */
  children?: ReactNode;

  /** Whether to show the close button. */
  showCloseButton?: boolean;

  /** Props to pass to the content container. */
  contentProps?: ContentProps;

  /** The placement of the popover relative to the trigger. */
  placement?: RACPopoverProps['placement'];

  /** Whether to hide the arrow. */
  hideArrow?: boolean;

  /** The content to display in the header when `showCloseButton` is `true`. */
  header?: ReactNode;

  /**
   * The ref for the element which the popover positions itself with respect to.
   * When used within `PopoverTrigger` component, this is set automatically.
   */
  triggerRef?: RefObject<Element | null>;
}

/**
 * A popover component.
 *
 * @param props - {@link PopoverProps}
 */
export const Popover = forwardRef<HTMLElement, PopoverProps>(function Popover(props, ref) {
  const {
    className,
    children,
    header,
    showCloseButton,
    hideArrow,
    contentProps,
    containerPadding = 10,
    style,
    ...rest
  } = props;

  return (
    <Flex
      ref={ref}
      elevation="overlay"
      data-noarrow={hideArrow}
      rounding="md"
      containerPadding={containerPadding}
      {...rest}
      as={RACPopover}
      style={{ ...style, '--_container-padding': `${containerPadding}px` } as CSSProperties}
      className={cx(styles.popover, className)}
    >
      {hideArrow ? null : <RACOverlayArrow aria-hidden="true" className={styles.arrow} />}
      <Flex
        direction="column"
        padding="md"
        aria-label="Content"
        {...contentProps}
        as={RACDialog}
        className={cx(styles.content, contentProps?.className)}
      >
        {showCloseButton ? (
          <Flex gap="sm">
            {header}
            <Button className={styles.close} slot="close" aria-label="Close">
              <Icon icon="x" />
            </Button>
          </Flex>
        ) : null}

        {children}
      </Flex>
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

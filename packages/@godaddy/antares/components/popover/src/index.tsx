import { forwardRef, type RefObject, type ReactNode } from 'react';
import { cx } from 'cva';
import {
  Dialog as RACDialog,
  Popover as RACPopover,
  type PopoverProps as RACPopoverProps,
  DialogTrigger as RACDialogTrigger,
  type DialogTriggerProps as RACDialogTriggerProps,
  OverlayArrow as RACOverlayArrow,
  Provider as RACProvider
} from 'react-aria-components';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { ContentContext, HeaderContext, FooterContext, ButtonGroupContext } from '#components/structure';
import styles from './index.module.css';

export interface PopoverTriggerProps extends RACDialogTriggerProps {}

export interface PopoverProps extends Omit<RACPopoverProps, 'children' | 'className'>, FlexOwnProps {
  /** The content to display inside the popover. Compose `Header`, `Content`, and `Footer`. */
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
 * A composition-first popover: an overlay positioned relative to a trigger.
 *
 * The Popover owns only the positioned panel and the scroll layout; compose the interior from
 * `Header`, `Content`, `Footer`, `ButtonGroup`, `Heading slot="title"`, and `CloseButton`.
 *
 * `className` and `style` target the popover panel. Provide a `Heading slot="title"` or an
 * `aria-label` so the dialog has an accessible name.
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
      <Flex
        as={RACDialog}
        direction="column"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        className={styles.dialog}
      >
        <RACProvider
          values={[
            [HeaderContext, { className: styles.header, alignItems: 'start' }],
            [ContentContext, { className: styles.content }],
            [FooterContext, { className: styles.footer }],
            [ButtonGroupContext, { className: styles.buttonGroup }]
          ]}
        >
          {children}
        </RACProvider>
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

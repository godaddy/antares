import { createContext, forwardRef, type ReactNode } from 'react';
import { mergeProps } from 'react-aria';
import {
  Popover as RACPopover,
  type PopoverProps as RACPopoverProps,
  type DialogProps as RACDialogProps,
  DialogTrigger as RACDialogTrigger,
  type DialogTriggerProps as RACDialogTriggerProps,
  OverlayArrow as RACOverlayArrow,
  composeRenderProps,
  useContextProps,
  useSlottedContext,
  type ContextValue
} from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import { OverlayDialog } from '#components/_internal/overlay-dialog';
import { composeClassName, composeStyle } from '#utils/render-props.ts';
import styles from './index.module.css';

export interface PopoverTriggerProps extends RACDialogTriggerProps {}

type PopoverPositioningKeys =
  | 'placement'
  | 'offset'
  | 'crossOffset'
  | 'containerPadding'
  | 'shouldFlip'
  | 'triggerRef'
  | 'isOpen'
  | 'defaultOpen'
  | 'onOpenChange'
  | 'isKeyboardDismissDisabled'
  | 'shouldCloseOnInteractOutside';

export interface PopoverProps extends Omit<RACDialogProps, 'children'>, Pick<RACPopoverProps, PopoverPositioningKeys> {
  /** The content of the popover. */
  children?: ReactNode;

  /** Whether to hide the arrow. */
  hideArrow?: boolean;

  /**
   * The ARIA role of the popover's dialog. Use `alertdialog` for an urgent message
   * that interrupts the user.
   * @default 'dialog'
   */
  role?: RACDialogProps['role'];

  /** Props for the positioned panel that holds the popover's dialog. */
  containerProps?: Omit<RACPopoverProps, 'children' | PopoverPositioningKeys>;
}

/**
 * Lets a parent such as `MenuTrigger` set popover presentation.
 * Local props still win. React Aria's own popover context is left alone.
 */
export const PopoverContext = createContext<ContextValue<PopoverProps, HTMLElement>>(null);

/**
 * An overlay positioned relative to a trigger.
 *
 * @param props - {@link PopoverProps}
 */
export const Popover = forwardRef<HTMLElement, PopoverProps>(function Popover(props, ref) {
  const contextualContainer = useSlottedContext(PopoverContext, props.slot)?.containerProps;
  const localContainer = props.containerProps;

  [props, ref] = useContextProps(
    {
      ...props,
      containerProps: {
        ...mergeProps(contextualContainer, localContainer),
        className: composeRenderProps(contextualContainer?.className, function mergeClassName(contextClass, values) {
          const className = composeClassName(localContainer?.className, contextClass);
          return typeof className === 'function' ? className(values) : className;
        }),
        style: composeRenderProps(contextualContainer?.style, function mergeStyle(contextStyle, values) {
          const style = composeStyle(localContainer?.style, contextStyle ?? {});
          return typeof style === 'function' ? style(values) : style;
        })
      }
    },
    ref,
    PopoverContext
  );
  const {
    children,
    hideArrow,
    containerProps,
    className,
    style,
    placement,
    offset,
    crossOffset,
    containerPadding,
    shouldFlip,
    triggerRef,
    isOpen,
    defaultOpen,
    onOpenChange,
    isKeyboardDismissDisabled,
    shouldCloseOnInteractOutside,
    ...dialogProps
  } = props;

  return (
    <Flex
      elevation="overlay"
      data-noarrow={hideArrow}
      rounding="md"
      {...containerProps}
      as={RACPopover}
      placement={placement}
      offset={offset}
      crossOffset={crossOffset}
      containerPadding={containerPadding}
      shouldFlip={shouldFlip}
      triggerRef={triggerRef}
      isOpen={isOpen}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      shouldCloseOnInteractOutside={shouldCloseOnInteractOutside}
      className={composeClassName(containerProps?.className, styles.popover)}
    >
      {hideArrow ? null : <RACOverlayArrow aria-hidden="true" className={styles.arrow} />}
      <OverlayDialog {...dialogProps} ref={ref} className={className} style={style}>
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

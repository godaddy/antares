import { forwardRef, type ReactNode } from 'react';
import { cx } from 'cva';
import {
  ModalOverlay as RACModalOverlay,
  type ModalOverlayProps as RACModalOverlayProps,
  Modal as RACModal,
  Dialog as RACDialog,
  type DialogProps as RACDialogProps,
  DialogTrigger as RACDialogTrigger,
  type DialogTriggerProps as RACDialogTriggerProps,
  Provider as RACProvider
} from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import { HeaderContext, ButtonGroupContext } from '#components/structure';
import styles from './index.module.css';

export interface ModalProps
  extends Omit<RACDialogProps, 'children'>,
    Pick<
      RACModalOverlayProps,
      | 'isOpen'
      | 'defaultOpen'
      | 'onOpenChange'
      | 'isDismissable'
      | 'isKeyboardDismissDisabled'
      | 'shouldCloseOnInteractOutside'
    > {
  /**
   * Whether the modal can be dismissed by interacting outside it (clicking/pressing the
   * underlay). Escape closes the dialog unless `isKeyboardDismissDisabled` is set.
   * @default true
   */
  isDismissable?: boolean;

  /** Additional class name for the dialog panel. */
  className?: string;

  /** The content of the modal. */
  children?: ReactNode;
}

/**
 * The Modal component presents a dialog window over the page that focuses
 * the user's attention on a single task or piece of information.
 *
 * @param props - {@link ModalProps}
 */
export const Modal = forwardRef<HTMLElement, ModalProps>(function Modal(props, ref) {
  const {
    className,
    isOpen,
    defaultOpen,
    onOpenChange,
    isDismissable = true,
    isKeyboardDismissDisabled,
    shouldCloseOnInteractOutside,
    children,
    ...dialogProps
  } = props;

  return (
    <Flex
      as={RACModalOverlay}
      isOpen={isOpen}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      shouldCloseOnInteractOutside={shouldCloseOnInteractOutside}
      padding="md"
      className={styles.overlay}
    >
      <Flex as={RACModal} className={styles.modal}>
        <Flex
          as={RACDialog}
          elevation="overlay"
          rounding="xl"
          direction="column"
          {...dialogProps}
          ref={ref}
          className={cx(styles.dialog, className)}
        >
          <RACProvider
            values={[
              [HeaderContext, { className: styles.header }],
              [ButtonGroupContext, { justifyContent: 'end' }]
            ]}
          >
            {children}
          </RACProvider>
        </Flex>
      </Flex>
    </Flex>
  );
});

export interface ModalTriggerProps extends RACDialogTriggerProps {}

/**
 * Modal trigger component. Manages open/close state for its child Modal.
 *
 * @param props - {@link ModalTriggerProps}
 */
export const ModalTrigger = function ModalTrigger(props: ModalTriggerProps) {
  return <RACDialogTrigger {...props} />;
};

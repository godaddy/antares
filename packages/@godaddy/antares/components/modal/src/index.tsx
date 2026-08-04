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
import { ContentContext, HeaderContext, FooterContext, ButtonGroupContext } from '#components/structure';
import styles from './index.module.css';

/** Overlay state and dismissal props hoisted from RAC's `ModalOverlay` onto `Modal`. */
type ModalOverlayBehaviorProps = Pick<
  RACModalOverlayProps,
  | 'isOpen'
  | 'defaultOpen'
  | 'onOpenChange'
  | 'isDismissable'
  | 'isKeyboardDismissDisabled'
  | 'shouldCloseOnInteractOutside'
>;

export interface ModalProps extends Omit<RACDialogProps, 'children'>, ModalOverlayBehaviorProps {
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
 * A composition-first modal dialog, modeled on React Aria / Spectrum's `Dialog`.
 *
 * The Modal owns only the overlay, container, and dialog shell plus the scroll layout - it
 * does not decide the interior structure. Author the content by composing the shared
 * containers; the Modal provides their styling via context.
 *
 * `className` and `style` target the dialog panel. The backdrop is styled globally through the
 * public `--modal-overlay-bg` custom property; because the overlay is portaled to
 * `document.body`, that property cannot be set from a React ancestor.
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
      <Flex as={RACModal} className={styles.modalContainer}>
        <Flex
          as={RACDialog}
          elevation="overlay"
          rounding="xl"
          direction="column"
          {...dialogProps}
          ref={ref}
          className={cx(styles.modal, className)}
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

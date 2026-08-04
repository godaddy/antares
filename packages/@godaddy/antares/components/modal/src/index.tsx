import { forwardRef, type ReactNode } from 'react';
import { cx } from 'cva';
import {
  ModalOverlay as RACModalOverlay,
  type ModalOverlayProps as RACModalOverlayProps,
  Modal as RACModal,
  Dialog as RACDialog,
  type DialogProps as RACDialogProps,
  DialogTrigger as RACDialogTrigger,
  type DialogTriggerProps as RACDialogTriggerProps
} from 'react-aria-components';
import { Flex, type FlexProps } from '#components/layout/flex';
import { OverlayRegions } from '#components/_internal/overlay-regions';
import styles from './index.module.css';

export interface ModalProps extends Omit<RACDialogProps, 'children'> {
  /**
   * Whether the modal can be dismissed by interacting outside it (clicking/pressing the
   * underlay). Escape always closes the dialog (a11y); disable that via
   * `overlayProps.isKeyboardDismissDisabled`.
   * @default true
   */
  isDismissable?: boolean;

  /** Additional props for the overlay backdrop. */
  overlayProps?: RACModalOverlayProps;

  /** Additional props for the modal container. */
  containerProps?: Omit<FlexProps, 'as'>;

  /** Additional class name for the dialog. */
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
 * @param props - {@link ModalProps}
 */
export const Modal = forwardRef<HTMLElement, ModalProps>(function Modal(props, ref) {
  const { className, isDismissable = true, overlayProps, containerProps, children, ...dialogProps } = props;

  return (
    <Flex
      as={RACModalOverlay}
      {...overlayProps}
      isDismissable={isDismissable}
      padding="md"
      className={cx(styles.overlay, overlayProps?.className)}
    >
      <Flex as={RACModal} {...containerProps} className={cx(styles.modalContainer, containerProps?.className)}>
        <Flex
          as={RACDialog}
          elevation="overlay"
          rounding="xl"
          direction="column"
          {...dialogProps}
          ref={ref}
          className={cx(styles.modal, className)}
        >
          <OverlayRegions>{children}</OverlayRegions>
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

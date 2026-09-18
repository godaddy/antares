import { forwardRef, type ReactNode } from 'react';
import {
  ModalOverlay as RACModalOverlay,
  type ModalOverlayProps as RACModalOverlayProps,
  Modal as RACModal,
  type DialogProps as RACDialogProps,
  DialogTrigger as RACDialogTrigger,
  type DialogTriggerProps as RACDialogTriggerProps
} from 'react-aria-components';
import { SizeProvider, type InterfaceSize } from '#components/size-provider';
import { TypographyContext, typographyClassName } from '#components/_internal/typography';
import { Flex } from '#components/layout/flex';
import { OverlayDialog } from '#components/_internal/overlay-dialog';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

type ModalFlatKeys =
  | 'isOpen'
  | 'defaultOpen'
  | 'onOpenChange'
  | 'isDismissable'
  | 'isKeyboardDismissDisabled'
  | 'shouldCloseOnInteractOutside';

type ModalLayerProps = Omit<RACModalOverlayProps, 'children' | ModalFlatKeys>;

export interface ModalProps extends Omit<RACDialogProps, 'children'>, Pick<RACModalOverlayProps, ModalFlatKeys> {
  /** Coordinated interior size. Starts a new scope, defaulting to md. */
  size?: InterfaceSize;

  /**
   * Whether the modal can be dismissed by interacting outside it (clicking/pressing the
   * underlay). Escape closes the dialog unless `isKeyboardDismissDisabled` is set.
   * @default true
   */
  isDismissable?: boolean;

  /** Props for the modal's backdrop. */
  overlayProps?: ModalLayerProps;

  /** Props for the modal's positioned container. */
  containerProps?: ModalLayerProps;

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
    size = 'md',
    isOpen,
    defaultOpen,
    onOpenChange,
    isDismissable = true,
    isKeyboardDismissDisabled,
    shouldCloseOnInteractOutside,
    overlayProps,
    containerProps,
    children,
    ...dialogProps
  } = props;

  const titleSize = { sm: 'md', md: 'lg', lg: 'xl' } as const;

  return (
    <SizeProvider size={size}>
      <TypographyContext.Provider value={{ slots: { title: { heading: { size: titleSize[size] } } } }}>
        <Flex
          as={RACModalOverlay}
          isOpen={isOpen}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
          isDismissable={isDismissable}
          isKeyboardDismissDisabled={isKeyboardDismissDisabled}
          shouldCloseOnInteractOutside={shouldCloseOnInteractOutside}
          padding="md"
          {...overlayProps}
          className={composeClassName(overlayProps?.className, styles.overlay)}
        >
          <Flex as={RACModal} {...containerProps} className={composeClassName(containerProps?.className, styles.modal)}>
            <OverlayDialog
              size={size}
              elevation="overlay"
              rounding="xl"
              {...dialogProps}
              ref={ref}
              className={composeClassName(className, styles.dialog, typographyClassName('body', size))}
            >
              {children}
            </OverlayDialog>
          </Flex>
        </Flex>
      </TypographyContext.Provider>
    </SizeProvider>
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

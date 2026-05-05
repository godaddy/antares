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
import { Text, type TextProps } from '#components/text';
import { Flex, type FlexProps } from '#components/layout/flex';
import { Button, type ButtonProps } from '#components/button';
import { Icon } from '#components/icon';
import styles from './index.module.css';

export interface ModalTriggerProps extends RACDialogTriggerProps {}

/**
 * Modal trigger component. Manages open/close state for its child Modal.
 *
 * @param props - {@link ModalTriggerProps}
 */
export function ModalTrigger(props: ModalTriggerProps) {
  return <RACDialogTrigger {...props} />;
}

export interface ModalProps extends RACDialogProps {
  /** Title of the modal. */
  title?: ReactNode;

  /** Description of the modal. */
  description?: ReactNode;

  /** Additional props to pass to the overlay container. */
  overlayProps?: RACModalOverlayProps;

  /** Additional props to pass to the modal container. */
  containerProps?: FlexProps;

  /** Additional class name for the modal. */
  className?: string;

  /** Content of the modal. */
  children?: ReactNode;

  /** Actions to display in the modal. */
  actions?: ReactNode;

  /** Additional props to pass to the actions container. */
  actionProps?: FlexProps;

  /** Media element (e.g. `<img />`) to display in the modal. */
  media?: ReactNode;

  /** Additional props to pass to the media container. */
  mediaProps?: FlexProps;

  /** Variant of the media container. */
  mediaVariant?: 'inset' | 'full';

  /** Position of the media container. */
  mediaPosition?: 'start' | 'end';

  /** Direction of the media container. */
  mediaDirection?: 'column' | 'row';

  /** Additional props to pass to the title. */
  titleProps?: TextProps;

  /** Additional props to pass to the description. */
  descriptionProps?: TextProps;

  /** Additional props to pass to the close button. */
  closeProps?: ButtonProps;

  /** Whether the modal can be dismissed via overlay click or Escape key. @default true */
  isDismissable?: boolean;

  /** Whether the modal content is centered. */
  centered?: boolean;
}

/**
 * A modal dialog component.
 *
 * @param props - {@link ModalProps}
 */
export const Modal = forwardRef<HTMLElement, ModalProps>(function Modal(props, ref) {
  const {
    className,
    title,
    titleProps,
    description,
    descriptionProps,
    closeProps,
    children,
    actions,
    actionProps,
    media,
    mediaProps,
    mediaVariant = 'full',
    mediaDirection = 'column',
    mediaPosition = 'start',
    isDismissable = true,
    containerProps,
    overlayProps,
    centered = false,
    ...modalProps
  } = props;
  return (
    <Flex
      as={RACModalOverlay}
      isDismissable={isDismissable}
      padding="md"
      {...overlayProps}
      className={cx(styles.overlay, overlayProps?.className)}
    >
      <Flex as={RACModal} {...containerProps} className={cx(styles.modalContainer, containerProps?.className)}>
        <Flex
          as={RACDialog}
          elevation="overlay"
          rounding="xl"
          direction={mediaDirection === 'row' && mediaPosition === 'end' ? 'row-reverse' : mediaDirection}
          {...modalProps}
          ref={ref}
          className={cx(styles.modal, className)}
        >
          {media ? (
            <Flex
              {...mediaProps}
              flexShrink={0}
              padding={mediaVariant === 'inset' ? 'md' : undefined}
              blockPaddingEnd={mediaDirection === 'column' && mediaPosition === 'start' ? '0' : undefined}
              inlinePaddingEnd={mediaDirection === 'row' && mediaPosition === 'start' ? '0' : undefined}
              blockPaddingStart={mediaDirection === 'column' && mediaPosition === 'end' ? '0' : undefined}
              inlinePaddingStart={mediaDirection === 'row' && mediaPosition === 'end' ? '0' : undefined}
              className={cx(styles.mediaContainer, mediaProps?.className)}
            >
              <Flex className={styles.media} flexGrow={1} rounding={mediaVariant === 'inset' ? 'md' : undefined}>
                {media}
              </Flex>
            </Flex>
          ) : null}

          <Flex direction="column" padding="md" gap="md">
            <Flex direction="column" gap="xs" className={cx(centered && styles.centered)}>
              {title ? (
                <Text as="h2" {...titleProps} className={cx(styles.title, titleProps?.className)}>
                  {title}
                </Text>
              ) : null}

              {description ? (
                <Text as="p" {...descriptionProps} className={cx(styles.description, descriptionProps?.className)}>
                  {description}
                </Text>
              ) : null}
            </Flex>

            {children}

            {actions ? (
              <Flex gap="md" justifyContent="end" {...actionProps}>
                {actions}
              </Flex>
            ) : null}
          </Flex>

          <Button aria-label="Close" slot="close" {...closeProps} className={cx(styles.close, closeProps?.className)}>
            <Icon icon="x" />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
});

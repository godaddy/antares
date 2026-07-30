/**
 * Prototype a2 - compound subcomponents (RAC slots under the hood).
 *
 * The consumer assembles the modal from Antares subcomponents (`ModalCompound`,
 * `ModalHeader`, `ModalTitle`, `ModalDescription`, `ModalBody`, `ModalActions`,
 * `ModalCloseButton`). Each piece keeps Antares styling/wiring; the consumer owns the
 * structure and can reorder/omit parts freely. This is the PDR's Layer 3, and the
 * React Spectrum `Dialog` model.
 *
 * The close behavior comes from RAC: `ModalCloseButton` renders a Button with
 * `slot="close"`, and the enclosing RAC `Dialog` (rendered by `ModalCompound`)
 * provides the close `onPress` through context. No custom plumbing.
 *
 * Demonstrates on the close button: aria-label, data-track, chained onPress, restyle.
 * Restructuring: FULLY supported - see the example reordering header/body/actions.
 *
 * Trade-off: full control, but the consumer must assemble the pieces correctly or the
 * layout/behavior degrades. Nothing guarantees a "correct" modal the way Layer 1 does.
 */
import { forwardRef, type ReactNode } from 'react';
import { cx } from 'cva';
import {
  ModalOverlay as RACModalOverlay,
  Modal as RACModal,
  Dialog as RACDialog,
  type DialogProps as RACDialogProps
} from 'react-aria-components';
import { Text, type TextProps } from '#components/text';
import { Flex, type FlexProps } from '#components/layout/flex';
import { Button, type ButtonProps } from '#components/button';
import { Icon } from '#components/icon';
import styles from './index-a2-compound.module.css';

type DataAttrs = { [key: `data-${string}`]: string | number | boolean };

export interface ModalCompoundProps extends RACDialogProps {
  /** Whether the modal can be dismissed via overlay click or Escape. @default true */
  isDismissable?: boolean;
  /** Composed subcomponents. */
  children?: ReactNode;
}

/**
 * Container that provides the overlay, box, and RAC `Dialog` context. Consumers place
 * the subcomponents below as children.
 *
 * @param props - {@link ModalCompoundProps}
 */
export const Modal = forwardRef<HTMLElement, ModalCompoundProps>(function ModalCompound(props, ref) {
  const { className, isDismissable = true, children, ...dialogProps } = props;

  return (
    <Flex as={RACModalOverlay} isDismissable={isDismissable} padding="md" className={styles.overlay}>
      <Flex as={RACModal} className={styles.modalContainer}>
        <Flex
          as={RACDialog}
          elevation="overlay"
          rounding="xl"
          direction="column"
          padding="md"
          gap="md"
          {...dialogProps}
          ref={ref}
          className={cx(styles.modal, className)}
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
});

export interface ModalHeaderProps extends Omit<FlexProps, 'as'> {}

/** Header region. Lay out the title and (optionally) the close button here. */
export function ModalHeader(props: ModalHeaderProps) {
  const { className, children, ...rest } = props;
  return (
    <Flex direction="column" gap="xs" {...rest} className={cx(styles.header, className)}>
      {children}
    </Flex>
  );
}

export interface ModalTitleProps extends TextProps {}

/** Title text, wired to RAC's `title` slot for `aria-labelledby`. */
export function ModalTitle(props: ModalTitleProps) {
  const { className, ...rest } = props;
  return <Text as="h2" slot="title" {...rest} className={cx(styles.title, className)} />;
}

export interface ModalDescriptionProps extends TextProps {}

/** Description text. */
export function ModalDescription(props: ModalDescriptionProps) {
  const { className, ...rest } = props;
  return <Text as="p" {...rest} className={cx(styles.description, className)} />;
}

export interface ModalBodyProps extends Omit<FlexProps, 'as'> {}

/** Body content region. */
export function ModalBody(props: ModalBodyProps) {
  const { className, children, ...rest } = props;
  return (
    <Flex direction="column" gap="sm" {...rest} className={className}>
      {children}
    </Flex>
  );
}

export interface ModalActionsProps extends Omit<FlexProps, 'as'> {}

/** Footer actions region. */
export function ModalActions(props: ModalActionsProps) {
  const { className, children, ...rest } = props;
  return (
    <Flex gap="md" justifyContent="end" {...rest} className={className}>
      {children}
    </Flex>
  );
}

export interface ModalCloseButtonProps extends ButtonProps, DataAttrs {}

/**
 * Close ("X") button. Encapsulates RAC's `slot="close"` so the consumer never touches
 * the plumbing. Pass children to render a labelled button instead of the icon.
 */
export function ModalCloseButton(props: ModalCloseButtonProps) {
  const { className, children, 'aria-label': ariaLabel = 'Close', ...rest } = props;
  return (
    <Button slot="close" aria-label={ariaLabel} {...(rest as ButtonProps)} className={cx(styles.close, className)}>
      {children ?? <Icon icon="x" />}
    </Button>
  );
}

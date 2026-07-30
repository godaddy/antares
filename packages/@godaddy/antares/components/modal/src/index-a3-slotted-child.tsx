/**
 * Prototype a3 - slotted child (consumer-provides-children, Modal provides context).
 *
 * `ModalSlottedChild` is a thin container: it renders the overlay, the box, and a RAC
 * `Dialog`, then drops the consumer's children straight in. It ships NO Antares
 * subcomponents. The consumer builds the whole interior themselves and marks their own
 * button with RAC's `slot="close"`; RAC's `Dialog` provides the close `onPress` to any
 * `slot="close"` descendant through `ButtonContext`. This is the second variant the TASK
 * describes (`<Modal><MyButton slot="close" /></Modal>`), and the pure React-Spectrum /
 * RAC-native composition model.
 *
 * Demonstrates on the close button: aria-label, data-track, chained onPress, restyle -
 * all applied directly to the consumer's own button. The chained onPress works natively:
 * RAC merges the context's close handler with the button's local `onPress`.
 *
 * Note: `slot="close"` only wires up components that READ `ButtonContext` (Antares
 * `Button`, RAC `Button`). A plain native `<button slot="close">` does NOT get the close
 * behavior - it would need an `onPress`/`onClick` of its own.
 *
 * Trade-off vs a2: no bespoke subcomponents to maintain, maximum flexibility, but zero
 * guardrails - the consumer owns all structure, styling positioning, and a11y wiring
 * (title slot, close button placement) with nothing steering them toward "correct".
 */
import { forwardRef, type ReactNode } from 'react';
import { cx } from 'cva';
import {
  ModalOverlay as RACModalOverlay,
  Modal as RACModal,
  Dialog as RACDialog,
  type DialogProps as RACDialogProps
} from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import styles from './index-a3-slotted-child.module.css';

export interface ModalSlottedChildProps extends RACDialogProps {
  /** Whether the modal can be dismissed via overlay click or Escape. @default true */
  isDismissable?: boolean;
  /** The entire modal interior, authored by the consumer. */
  children?: ReactNode;
}

/**
 * Thin context-providing modal container. The consumer authors the interior and marks
 * their own close button with `slot="close"`.
 *
 * @param props - {@link ModalSlottedChildProps}
 */
export const Modal = forwardRef<HTMLElement, ModalSlottedChildProps>(function ModalSlottedChild(props, ref) {
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

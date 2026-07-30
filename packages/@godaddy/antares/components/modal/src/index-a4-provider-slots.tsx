/**
 * Prototype a4 - provider slots (Modal decorates consumer-provided children by slot name).
 *
 * The Modal is a thin container that also acts as a PROVIDER: it renders its own RAC
 * contexts inside the Dialog so that consumer children pick up Antares styling + behavior
 * purely by their `slot` name. The consumer authors the interior (like a3) but does NOT
 * restyle or wire anything - they just tag elements:
 *
 *   <ModalProviderSlots aria-label="Delete file?">
 *     <Text slot="title">Delete file?</Text>
 *     <Button slot="close" />          // gets absolute "X" styles + close behavior
 *     <Button slot="dismiss">Cancel</Button>  // different slot, also closes, own styles
 *   </ModalProviderSlots>
 *
 * How it works (see the RAC `Dialog` source):
 *   - Each RAC primitive reads its own context: Button -> ButtonContext, Text -> TextContext.
 *     So we provide BOTH; there is no single "slot router".
 *   - Multiple slot names coexist in one context's `slots` map; each child reads only its
 *     own entry. `close` and `dismiss` below do not interfere.
 *   - We SHADOW RAC Dialog's own ButtonContext (nearest provider wins), so we must:
 *       (a) include `[DEFAULT_SLOT]: {}` so a slotless <Button> inside doesn't throw, and
 *       (b) re-add the close behavior ourselves - we read `close` from
 *           `OverlayTriggerStateContext` and put it back under `close`/`dismiss`.
 *   - RAC merges slot props with the child's local props via `mergeProps`: className
 *     concatenates, handlers chain (a consumer `onPress` runs AND the modal still closes),
 *     scalar props let the consumer win.
 *
 * Limitations this surfaces:
 *   - Slot names are untyped strings, validated at runtime. An unknown `slot` throws
 *     `Invalid slot "...". Valid slot names are ...`. No autocomplete, no compile check.
 *   - There is no context for arbitrary regions. A `slot="body"` of free JSX has nothing
 *     to read it - "body" here is just composed children (see the example). Text regions
 *     can use TextContext (title/description below); anything else needs a real
 *     subcomponent (a2).
 *   - a11y note: RAC wires `aria-labelledby` from a <Heading slot="title">, not <Text>.
 *     Using Text for the title means you should pass `aria-label` (as the example does) or
 *     provide HeadingContext instead.
 */
import { forwardRef, type ReactNode } from 'react';
import { cx } from 'cva';
import {
  ModalOverlay as RACModalOverlay,
  Modal as RACModal,
  Dialog as RACDialog,
  type DialogProps as RACDialogProps,
  ButtonContext,
  TextContext,
  useSlottedContext,
  Provider,
  DEFAULT_SLOT
} from 'react-aria-components';
import { mergeProps } from '@react-aria/utils';
import { Flex } from '#components/layout/flex';
import styles from './index-a4-provider-slots.module.css';

// https://react-aria.adobe.com/customization#provider
// https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/s2/src/Dialog.tsx#L112

/** Provides the styled/behavior-wired slots to consumer children. */
function ModalSlotProvider({ children }: { children?: ReactNode }) {
  const racClose = useSlottedContext(ButtonContext, 'close') ?? {};

  return (
    <Provider
      values={[
        [
          ButtonContext,
          {
            slots: {
              [DEFAULT_SLOT]: {},
              close: mergeProps(racClose, { className: styles.close }),

              myCustomDismiss: mergeProps(racClose, { className: styles.dismiss })
            }
          }
        ],
        [
          TextContext,
          {
            slots: {
              [DEFAULT_SLOT]: {},
              title: { className: styles.title },
              description: { className: styles.description }
            }
          }
        ]
      ]}
    >
      {children}
    </Provider>
  );
}

export interface ModalProviderSlotsProps extends RACDialogProps {
  /** Whether the modal can be dismissed via overlay click or Escape. @default true */
  isDismissable?: boolean;
  /** The modal interior, authored by the consumer and tagged with `slot` names. */
  children?: ReactNode;
}

/**
 * Modal that decorates consumer-provided children by `slot` name via RAC context providers.
 *
 * @param props - {@link ModalProviderSlotsProps}
 */
export const Modal = forwardRef<HTMLElement, ModalProviderSlotsProps>(function ModalProviderSlots(props, ref) {
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
          <ModalSlotProvider>{children}</ModalSlotProvider>
        </Flex>
      </Flex>
    </Flex>
  );
});

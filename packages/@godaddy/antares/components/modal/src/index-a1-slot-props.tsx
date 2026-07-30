/**
 * Prototype a1 - grouped `slotProps` (config-driven).
 *
 * Antares owns the whole structure; the consumer tweaks internal parts through a
 * single typed `slotProps` object keyed by part name. Each part is merged with RAC's
 * `mergeProps`, so consumer handlers CHAIN after Antares behavior, `className`
 * concatenates, and scalar props (aria-label, data-*) let the consumer win. This is
 * the PDR's Layer 2 (MUI-style `slotProps`).
 *
 * Demonstrates on the close button: aria-label, data-track, chained onPress, restyle.
 *
 * Restructuring: NOT supported - the structure is fixed. Reordering header/body/actions
 * needs the compound approach (a2). Deliberate trade-off: a guaranteed-correct
 * structure in exchange for no reordering.
 *
 * Finding: RAC's `ButtonProps`/`TextProps` do not type `data-*` attributes, so the
 * slot part types widen with `DataAttrs`. At runtime RAC forwards data-* fine; the
 * cast at each spread boundary only satisfies the compiler (the component prop types
 * don't declare data-*). A production version would want Antares' own components to
 * accept data-* directly.
 */
import { forwardRef, type ReactNode } from 'react';
import { cx } from 'cva';
import { mergeProps } from '@react-aria/utils';
import {
  ModalOverlay as RACModalOverlay,
  type ModalOverlayProps as RACModalOverlayProps,
  Modal as RACModal,
  Dialog as RACDialog,
  type DialogProps as RACDialogProps
} from 'react-aria-components';
import { Text, type TextProps } from '#components/text';
import { Flex, type FlexProps } from '#components/layout/flex';
import { Button, type ButtonProps } from '#components/button';
import { Icon } from '#components/icon';
import styles from './index-a1-slot-props.module.css';

/** Widen a part's props to also accept arbitrary `data-*` attributes. */
type DataAttrs = { [key: `data-${string}`]: string | number | boolean };

/** Curated set of customizable parts. Internal layout wrappers stay private. */
export interface ModalSlotPropsSlots {
  /** Overlay/backdrop container. */
  overlay?: RACModalOverlayProps;
  /** The title text. */
  title?: TextProps & DataAttrs;
  /** The description text. */
  description?: TextProps & DataAttrs;
  /** The actions container. */
  actions?: FlexProps;
  /** The close ("X") button. */
  close?: ButtonProps & DataAttrs;
}

export interface ModalSlotPropsProps extends RACDialogProps {
  /** Title of the modal. */
  title?: ReactNode;
  /** Description of the modal. */
  description?: ReactNode;
  /** Actions rendered in the footer. */
  actions?: ReactNode;
  /** Body content. */
  children?: ReactNode;
  /** Whether the modal can be dismissed via overlay click or Escape. @default true */
  isDismissable?: boolean;
  /** Forward props to individual internal parts, merged via `mergeProps`. */
  slotProps?: ModalSlotPropsSlots;
}

/**
 * Modal customized via a grouped `slotProps` object.
 *
 * @param props - {@link ModalSlotPropsProps}
 */
export const Modal = forwardRef<HTMLElement, ModalSlotPropsProps>(function ModalSlotProps(props, ref) {
  const { className, title, description, actions, children, isDismissable = true, slotProps, ...dialogProps } = props;

  const closeProps = mergeProps({ className: styles.close }, slotProps?.close ?? {}) as ButtonProps;
  const titleProps = mergeProps({ className: styles.title }, slotProps?.title ?? {}) as TextProps;
  const descriptionProps = mergeProps({ className: styles.description }, slotProps?.description ?? {}) as TextProps;

  return (
    <Flex
      as={RACModalOverlay}
      {...slotProps?.overlay}
      isDismissable={isDismissable}
      padding="md"
      className={cx(styles.overlay, slotProps?.overlay?.className)}
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
          <Flex direction="column" padding="md" gap="md">
            <Flex direction="column" gap="xs">
              {title ? (
                <Text as="h2" slot="title" {...titleProps}>
                  {title}
                </Text>
              ) : null}
              {description ? (
                <Text as="p" {...descriptionProps}>
                  {description}
                </Text>
              ) : null}
            </Flex>

            {children}

            {actions ? (
              <Flex gap="md" justifyContent="end" {...slotProps?.actions}>
                {actions}
              </Flex>
            ) : null}
          </Flex>

          <Button slot="close" aria-label="Close" {...closeProps}>
            <Icon icon="x" />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
});

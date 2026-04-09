import { forwardRef, type ReactNode } from 'react';
import { cva, cx, type VariantProps } from 'cva';
import {
  ModalOverlay as RACModalOverlay,
  Modal as RACModal,
  Dialog as RACDialog,
  type DialogProps as RACDialogProps,
  DialogTrigger as RACDialogTrigger,
  type DialogTriggerProps as RACDialogTriggerProps,
  Heading as RACHeading
} from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import { Button } from '#components/button';
import { Icon } from '#components/icon';
import styles from './index.module.css';

const modalVariants = cva(styles.modal, {
  variants: {
    size: {
      default: styles.default,
      large: styles.large,
      fullscreen: styles.fullscreen
    }
  },
  defaultVariants: {
    size: 'default'
  }
});

export interface ModalTriggerProps extends RACDialogTriggerProps {}

/**
 * Modal trigger component. Manages open/close state for its child Modal.
 *
 * @param props - {@link ModalTriggerProps}
 */
export function ModalTrigger(props: ModalTriggerProps) {
  return <RACDialogTrigger {...props} />;
}

export interface ModalProps extends Omit<RACDialogProps, 'className' | 'children' | 'style'> {
  /** Size of the modal. */
  size?: VariantProps<typeof modalVariants>['size'];

  /** Whether the modal can be dismissed via overlay click, Escape, and shows a close button. */
  isDismissable?: boolean;

  /** Whether keyboard dismissal via Escape is disabled. Only relevant when `isDismissable` is true. */
  isKeyboardDismissDisabled?: boolean;

  /** Additional class name for the modal container. */
  className?: string;

  /** Content of the modal, or a render function receiving a `close` callback. */
  children?: ReactNode | ((opts: { close: () => void }) => ReactNode);

  /** Media element (e.g. `<img />`) to display in the modal. */
  media?: ReactNode;

  /** How the media is displayed. */
  mediaVariant?: 'inset' | 'full-bleed';

  /** Layout direction when media is present. `'horizontal'` places media side-by-side with content. */
  alignment?: 'default' | 'horizontal';

  /** Which side the media appears on in horizontal alignment. */
  mediaPosition?: 'start' | 'end';

  /** Text alignment within the content area. */
  textAlign?: 'start' | 'center';
}

/**
 * A modal dialog component.
 *
 * @param props - {@link ModalProps}
 */
export const Modal = forwardRef<HTMLElement, ModalProps>(function Modal(props, ref) {
  const {
    size,
    isDismissable,
    isKeyboardDismissDisabled,
    className,
    children,
    media,
    mediaVariant,
    alignment = 'default',
    mediaPosition = 'start',
    textAlign,
    ...dialogProps
  } = props;

  const isHorizontal = alignment === 'horizontal' && media;

  const mediaSlot = media ? (
    <div
      className={cx(
        styles.mediaSlot,
        mediaVariant === 'inset' && styles.mediaInset,
        mediaVariant === 'full-bleed' && styles.mediaFullBleed,
        mediaPosition === 'end' && styles.mediaEnd
      )}
    >
      {media}
    </div>
  ) : null;

  const closeButton = isDismissable ? (
    <Button className={styles.close} slot="close" aria-label="Close" variant="tertiary" size="sm">
      <Icon icon="x" />
    </Button>
  ) : null;

  return (
    <RACModalOverlay
      className={cx(styles.overlay, isHorizontal && styles.horizontal)}
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
    >
      <RACModal className={modalVariants({ size, className })}>
        <RACDialog ref={ref} {...dialogProps} className={styles.dialog}>
          {function render(renderProps) {
            const content = typeof children === 'function' ? children(renderProps) : children;

            if (isHorizontal) {
              return (
                <>
                  {mediaSlot}
                  <div className={cx(styles.content, textAlign === 'center' && styles.textCenter)}>
                    {closeButton}
                    {content}
                  </div>
                </>
              );
            }

            return (
              <div className={cx(textAlign === 'center' && styles.textCenter)}>
                {mediaSlot}
                {closeButton}
                {content}
              </div>
            );
          }}
        </RACDialog>
      </RACModal>
    </RACModalOverlay>
  );
});

export interface ModalHeadingProps {
  /** The heading content. */
  children: ReactNode;

  /** Additional class name. */
  className?: string;
}

/**
 * Modal heading component. Renders as the dialog's accessible title.
 *
 * @param props - {@link ModalHeadingProps}
 */
export function ModalHeading(props: ModalHeadingProps) {
  const { children, className } = props;

  return (
    <RACHeading slot="title" className={cx(styles.heading, className)}>
      {children}
    </RACHeading>
  );
}

export interface ModalFooterProps {
  /** Footer content, typically Button components. */
  children: ReactNode;

  /** Additional class name. */
  className?: string;

  /** Whether actions should be sticky at the bottom when content scrolls. */
  fixedActions?: boolean;
}

/**
 * Modal footer component for action buttons.
 *
 * @param props - {@link ModalFooterProps}
 */
export function ModalFooter(props: ModalFooterProps) {
  const { children, className, fixedActions } = props;

  return (
    <Flex gap="sm" justifyContent="end" className={cx(fixedActions ? styles.footerFixed : styles.footer, className)}>
      {children}
    </Flex>
  );
}

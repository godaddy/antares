import { forwardRef, type ReactNode, type CSSProperties } from 'react';
import {
  Dialog as RACDialog,
  DialogTrigger as RACDialogTrigger,
  type DialogTriggerProps as RACDialogTriggerProps,
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
  type ModalOverlayProps as RACModalOverlayProps,
  useLocale as RACUseLocale
} from 'react-aria-components';
import { cx } from 'cva';
import { Box } from '#components/layout/box';
import { Button } from '#components/button';
import { Icon } from '#components/icon';
import { Flex } from '#components/layout/flex';
import styles from './index.module.css';

/** Edge the drawer slides in from. left/right flip in RTL. */
export type DrawerPlacement = 'top' | 'bottom' | 'left' | 'right';

// Props that conflict between our API and RAC's ModalOverlay render props.
type ConflictingProps = 'className' | 'children' | 'style';

export interface DrawerProps extends Omit<RACModalOverlayProps, ConflictingProps> {
  /** Edge the drawer slides in from. left/right flip in RTL. */
  placement: DrawerPlacement;

  /** Accessible label for the dialog. */
  'aria-label'?: string;

  /** Max size of the drawer along its constrained axis. Accepts CSS values.
   * @default 'min(80vw, 400px)' for left/right, 'calc(100dvh - 80px)' for top/bottom
   */
  maxSize?: number | string;

  /**
   * Min size of the drawer along its constrained axis. Accepts CSS values.
   * When unset, `showCloseButton` establishes a floor so the close button is
   * never clipped. Wins over `maxSize` if the two conflict.
   */
  minSize?: number | string;

  /** Show built-in X close button. @default false */
  showCloseButton?: boolean;

  /** Accessible label for the close button. @default 'Close' */
  closeLabel?: string;

  /** Forwarded to the inner Dialog for aria-controls linkage. */
  id?: string;

  /** Content to render inside the drawer. */
  children?: ReactNode;

  /** Additional CSS class for the inner dialog content region. */
  className?: string;
}

export interface DrawerTriggerProps extends RACDialogTriggerProps {}

/**
 * An overlay panel that slides in from a screen edge. Built like `Modal`:
 * RAC modal overlay + an `elevation="overlay"` Box panel + CSS transitions.
 *
 * @param props - {@link DrawerProps}
 */
export const Drawer = forwardRef<HTMLElement, DrawerProps>(function Drawer(props, ref) {
  const {
    placement,
    'aria-label': ariaLabel,
    maxSize,
    minSize,
    showCloseButton = false,
    closeLabel = 'Close',
    id,
    children,
    className,
    ...rest
  } = props;

  const { direction } = RACUseLocale();
  const resolved = resolvePlacement(placement, direction);

  const drawerStyle = {
    '--_slide': getSlideTransform(resolved, direction),
    ...(maxSize !== undefined && {
      '--_max-size': typeof maxSize === 'number' ? `${maxSize}px` : maxSize
    }),
    ...(minSize !== undefined && {
      '--_min-size': typeof minSize === 'number' ? `${minSize}px` : minSize
    })
  } as CSSProperties;

  return (
    <RACModalOverlay className={styles.overlay} {...rest}>
      <Box
        as={RACModal}
        elevation="overlay"
        data-placement={resolved}
        data-has-close={showCloseButton || undefined}
        style={drawerStyle}
        className={styles.drawer}
      >
        <Flex
          as={RACDialog}
          direction="column"
          ref={ref}
          id={id}
          aria-label={ariaLabel}
          className={cx(styles.dialog, className)}
        >
          {showCloseButton ? (
            <Button className={styles.close} slot="close" aria-label={closeLabel}>
              <Icon icon="x" />
            </Button>
          ) : null}
          {children}
        </Flex>
      </Box>
    </RACModalOverlay>
  );
});

/**
 * Drawer trigger component. Wraps RAC DialogTrigger.
 *
 * @param props - {@link DrawerTriggerProps}
 */
export const DrawerTrigger = function DrawerTrigger(props: DrawerTriggerProps) {
  return <RACDialogTrigger {...props} />;
};

/** In RTL, left/right swap so `placement` stays visually consistent. */
function resolvePlacement(placement: DrawerPlacement, direction: string): DrawerPlacement {
  if (direction === 'rtl') {
    if (placement === 'left') return 'right';
    if (placement === 'right') return 'left';
  }
  return placement;
}

/**
 * Off-screen transform for the entering/exiting state. left/right depend on
 * writing direction because CSS `translateX` is physical while the panel is
 * pinned with logical `inset-inline-*`.
 */
function getSlideTransform(resolved: DrawerPlacement, direction: string): string {
  const rtl = direction === 'rtl';
  switch (resolved) {
    case 'right':
      return `translateX(${rtl ? '-100%' : '100%'})`;
    case 'left':
      return `translateX(${rtl ? '100%' : '-100%'})`;
    case 'bottom':
      return 'translateY(100%)';
    case 'top':
      return 'translateY(-100%)';
  }
}

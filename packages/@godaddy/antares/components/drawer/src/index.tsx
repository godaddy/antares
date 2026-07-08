import { forwardRef, type ReactNode, type CSSProperties } from 'react';
import {
  Dialog as RACDialog,
  DialogTrigger as RACDialogTrigger,
  type DialogTriggerProps as RACDialogTriggerProps,
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
  type ModalOverlayProps as RACModalOverlayProps,
  type DialogProps as RACDialogProps,
  useLocale as RACUseLocale
} from 'react-aria-components';
import { cx } from 'cva';
import { Button } from '#components/button';
import { Icon } from '#components/icon';
import { Flex, type FlexProps } from '#components/layout/flex';
import styles from './index.module.css';

/** Edge the drawer slides in from. left/right flip in RTL. */
export type DrawerPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface DrawerProps extends Omit<RACModalOverlayProps, 'className' | 'children' | 'style'> {
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

  /** Animate the open/close slide. @default true */
  animate?: boolean;

  /** Forwarded to the inner Dialog for aria-controls linkage. */
  id?: string;

  /** Content to render inside the drawer. */
  children?: ReactNode;

  /** Additional CSS class for root element. */
  className?: string;

  /** Additional props to pass to the inner modal container. */
  containerProps?: Omit<FlexProps, 'as'>;

  /** Additional props to pass to the inner dialog content region. */
  contentProps?: RACDialogProps;
}

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
    animate,
    id,
    children,
    className,
    containerProps,
    contentProps,
    ...rest
  } = props;

  const { direction } = RACUseLocale();
  const resolved = resolvePlacement(placement, direction);

  const drawerStyle = {
    ...containerProps?.style,
    '--_slide': getSlideTransform(resolved),
    ...(maxSize !== undefined && {
      '--_max-size': typeof maxSize === 'number' ? `${maxSize}px` : maxSize
    }),
    ...(minSize !== undefined && {
      '--_min-size': typeof minSize === 'number' ? `${minSize}px` : minSize
    })
  } as CSSProperties;

  return (
    <RACModalOverlay
      data-animate={animate === false ? 'false' : undefined}
      {...rest}
      className={cx(styles.overlay, className)}
    >
      <Flex
        elevation="overlay"
        data-placement={resolved}
        data-has-close={showCloseButton || undefined}
        {...containerProps}
        style={drawerStyle}
        as={RACModal}
        className={cx(styles.drawer, containerProps?.className)}
      >
        <Flex
          direction="column"
          ref={ref}
          id={id}
          aria-label={ariaLabel}
          {...contentProps}
          as={RACDialog}
          className={cx(styles.dialog, contentProps?.className)}
        >
          {showCloseButton ? (
            <Button className={styles.close} slot="close" aria-label={closeLabel}>
              <Icon icon="x" />
            </Button>
          ) : null}
          {children}
        </Flex>
      </Flex>
    </RACModalOverlay>
  );
});

export interface DrawerTriggerProps extends RACDialogTriggerProps {}

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
 * Off-screen transform for the entering/exiting state. `resolved` is already the
 * physical edge (RTL flipping happens in `resolvePlacement`) and the panel is
 * pinned with physical `left`/`right`, so the slide is purely physical too — no
 * extra direction handling, which previously double-flipped the RTL animation.
 */
function getSlideTransform(resolved: DrawerPlacement): string {
  switch (resolved) {
    case 'right':
      return 'translateX(100%)';
    case 'left':
      return 'translateX(-100%)';
    case 'bottom':
      return 'translateY(100%)';
    case 'top':
      return 'translateY(-100%)';
  }
}

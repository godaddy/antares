import { forwardRef, type ReactNode, type CSSProperties } from 'react';
import {
  Dialog as RACDialog,
  type DialogProps as RACDialogProps,
  DialogTrigger as RACDialogTrigger,
  type DialogTriggerProps as RACDialogTriggerProps,
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
  type ModalOverlayProps as RACModalOverlayProps,
  Provider as RACProvider
} from 'react-aria-components';
import { cx } from 'cva';
import { toCssSize } from '../../../utils/css.ts';
import { Flex } from '#components/layout/flex';
import { HeaderContext } from '#components/structure';
import styles from './index.module.css';

/**
 * Physical edge the drawer slides in from. Positioning is physical (like Base UI
 * and MUI drawers), so placement does not flip for RTL.
 */
export type DrawerPlacement = 'top' | 'bottom' | 'left' | 'right';

/** Overlay state and dismissal props hoisted from RAC's `ModalOverlay` onto `Drawer`. */
type DrawerOverlayBehaviorProps = Pick<
  RACModalOverlayProps,
  | 'isOpen'
  | 'defaultOpen'
  | 'onOpenChange'
  | 'isDismissable'
  | 'isKeyboardDismissDisabled'
  | 'shouldCloseOnInteractOutside'
>;

export interface DrawerProps extends Omit<RACDialogProps, 'children'>, DrawerOverlayBehaviorProps {
  /** Physical edge the drawer slides in from. */
  placement: DrawerPlacement;

  /**
   * Max size of the drawer along its constrained axis. Accepts CSS values.
   * @default 'min(80vw, 25rem)' for left/right, 'calc(100dvh - 5rem)' for top/bottom
   */
  maxSize?: number | string;

  /** Min size of the drawer along its constrained axis. Accepts CSS values. Wins over `maxSize` if the two conflict. */
  minSize?: number | string;

  /** Animate the open/close slide. @default true */
  animate?: boolean;

  /** Additional class name for the drawer panel. */
  className?: string;

  /** Content to render inside the drawer. */
  children?: ReactNode;
}

/**
 * A composition-first overlay panel that slides in from a screen edge. Built on the same RAC
 * stack as `Modal` (modal overlay + `elevation="overlay"` panel + dialog) with edge placement
 * and a slide transition.
 *
 * The Drawer owns only the shell and the scroll layout; compose the interior.
 *
 * `className` and `style` target the drawer panel. The backdrop is styled globally through the
 * public `--drawer-overlay-bg` custom property.
 *
 * @param props - {@link DrawerProps}
 */
export const Drawer = forwardRef<HTMLElement, DrawerProps>(function Drawer(props, ref) {
  const {
    placement,
    maxSize,
    minSize,
    animate,
    isOpen,
    defaultOpen,
    onOpenChange,
    isDismissable,
    isKeyboardDismissDisabled,
    shouldCloseOnInteractOutside,
    className,
    style,
    children,
    ...dialogProps
  } = props;

  const panelStyle = {
    ...style,
    '--_slide': getSlideTransform(placement),
    ...(maxSize !== undefined && { '--_max-size': toCssSize(maxSize) }),
    ...(minSize !== undefined && { '--_min-size': toCssSize(minSize) })
  } as CSSProperties;

  return (
    <RACModalOverlay
      isOpen={isOpen}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      shouldCloseOnInteractOutside={shouldCloseOnInteractOutside}
      data-animate={animate === false ? 'false' : undefined}
      className={styles.overlay}
    >
      <Flex
        as={RACModal}
        elevation="overlay"
        direction="column"
        data-placement={placement}
        style={panelStyle}
        className={cx(styles.drawer, className)}
      >
        <Flex as={RACDialog} direction="column" {...dialogProps} ref={ref} className={styles.dialog}>
          <RACProvider values={[[HeaderContext, { className: styles.header }]]}>{children}</RACProvider>
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

/**
 * Off-screen transform for the entering/exiting state. `placement` is a physical
 * edge and the panel is pinned with physical `left`/`right`, so the slide is purely
 * physical too. Placement never flips in RTL.
 */
function getSlideTransform(placement: DrawerPlacement): string {
  switch (placement) {
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

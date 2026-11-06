import { forwardRef, useRef, type ReactNode, type CSSProperties, type RefObject } from 'react';
import {
  type DialogProps as RACDialogProps,
  Sheet as RACSheet,
  SheetBackdrop as RACSheetBackdrop,
  type SheetBackdropProps as RACSheetBackdropProps,
  SheetContent as RACSheetContent,
  SheetOverlay as RACSheetOverlay,
  type SheetOverlayProps as RACSheetOverlayProps,
  type SheetProps as RACSheetProps,
  SheetTrigger as RACSheetTrigger,
  type SheetTriggerProps as RACSheetTriggerProps,
  composeRenderProps,
  useLocale
} from 'react-aria-components';
import { toCssSize } from '#utils/css.ts';
import { composeClassName } from '#utils/render-props.ts';
import { Flex } from '#components/layout/flex';
import { OverlayDialog } from '#components/_internal/overlay-dialog';
import { useFinishClose } from './use-finish-close.tsx';
import { useRestWhileOpen } from './use-rest-while-open.tsx';
import styles from './index.module.css';

/**
 * Physical edge the drawer slides in from. Positioning is physical (like Base UI
 * and MUI drawers), so placement does not flip for RTL.
 */
export type DrawerPlacement = 'top' | 'bottom' | 'left' | 'right';

type DrawerFlatKeys = 'isOpen' | 'defaultOpen' | 'onOpenChange' | 'shouldCloseOnInteractOutside' | 'preventDismissal';

type DrawerBackdropProps = Omit<RACSheetBackdropProps, 'swipeAnimation' | 'swipeAnimationRange'>;

type DrawerContainerProps = Omit<
  RACSheetProps,
  'children' | 'swipeAnimation' | 'swipeAnimationRange' | 'stackAnimation' | 'overscrollPadding'
>;

export interface DrawerProps extends Omit<RACDialogProps, 'children'>, Pick<RACSheetOverlayProps, DrawerFlatKeys> {
  /** Physical edge the drawer slides in from. It is also the edge the drawer is swiped toward to close. */
  placement: DrawerPlacement;

  /**
   * Max size along the constrained axis. Lengths are capped at the viewport; CSS sizing keywords keep their native behavior.
   * @default 'min(80vw, 25rem)' for left/right, 'calc(100dvh - 5rem)' for top/bottom
   */
  maxSize?: number | string;

  /**
   * Min size along the constrained axis. Wins over `maxSize`. Lengths are capped at the viewport;
   * CSS sizing keywords keep their native behavior.
   */
  minSize?: number | string;

  /** Props for the drawer's backdrop. */
  overlayProps?: DrawerBackdropProps;

  /** Props for the drawer's sliding panel. */
  containerProps?: DrawerContainerProps;

  /** Content to render inside the drawer. */
  children?: ReactNode;
}

/**
 * An overlay panel that slides in from a screen edge, built on React Aria's `Sheet`. It can be
 * swiped closed, and a drawer opened from inside another one stacks on top of it.
 *
 * @param props - {@link DrawerProps}
 */
export const Drawer = forwardRef<HTMLElement, DrawerProps>(function Drawer(props, ref) {
  const {
    placement,
    maxSize,
    minSize,
    isOpen,
    defaultOpen,
    onOpenChange,
    shouldCloseOnInteractOutside,
    preventDismissal,
    overlayProps,
    containerProps,
    className,
    style,
    children,
    ...dialogProps
  } = props;
  const panelRef = useRef<HTMLDivElement>(null);
  const { direction } = useLocale();

  return (
    <RACSheetOverlay
      position={placement}
      isOpen={isOpen}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      shouldCloseOnInteractOutside={shouldCloseOnInteractOutside}
      preventDismissal={preventDismissal}
      className={styles.root}
    >
      <RACSheetBackdrop
        {...overlayProps}
        swipeAnimation={styles['drawer-backdrop']}
        className={composeClassName(overlayProps?.className, styles.overlay)}
      />
      <Flex
        as={RACSheet}
        elevation="overlay"
        direction="column"
        dir={direction}
        {...containerProps}
        ref={panelRef}
        stackAnimation={styles['drawer-stack']}
        className={composeClassName(containerProps?.className, styles.drawer)}
        style={composeRenderProps(containerProps?.style, function composeDrawerStyle(value) {
          return {
            ...value,
            ...(maxSize !== undefined && { '--_max-size': toDrawerSize(maxSize, placement) }),
            ...(minSize !== undefined && { '--_min-size': toDrawerSize(minSize, placement) })
          } as CSSProperties;
        })}
      >
        <SheetRecovery panelRef={panelRef} preventDismissal={preventDismissal} />
        <OverlayDialog
          {...dialogProps}
          as={RACSheetContent}
          ref={ref}
          className={composeClassName(className, styles.dialog)}
          style={style}
        >
          {children}
        </OverlayDialog>
      </Flex>
    </RACSheetOverlay>
  );
});

function toDrawerSize(value: number | string, placement: DrawerPlacement) {
  const size = toCssSize(value);
  const viewport = placement === 'left' || placement === 'right' ? '100dvw' : '100dvh';
  const capped = `min(${size}, ${viewport})`;
  return typeof CSS !== 'undefined' && CSS.supports('max-width', capped) ? capped : size;
}

function SheetRecovery({
  panelRef,
  preventDismissal
}: {
  panelRef: RefObject<HTMLElement | null>;
  preventDismissal?: boolean;
}) {
  useRestWhileOpen(panelRef);
  useFinishClose(panelRef, preventDismissal);
  return null;
}

export interface DrawerTriggerProps extends RACSheetTriggerProps {}

/**
 * Drawer trigger component. Wraps RAC SheetTrigger.
 *
 * @param props - {@link DrawerTriggerProps}
 */
export const DrawerTrigger = function DrawerTrigger(props: DrawerTriggerProps) {
  return <RACSheetTrigger {...props} />;
};

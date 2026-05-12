import { createContext, forwardRef, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { useLayoutEffect } from '@react-aria/utils';
import {
  Dialog as RACDialog,
  DialogTrigger as RACDialogTrigger,
  type DialogTriggerProps as RACDialogTriggerProps,
  Heading as RACHeading,
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
  type ModalOverlayProps as RACModalOverlayProps,
  OverlayTriggerStateContext as RACOverlayTriggerStateContext,
  useLocale as RACUseLocale
} from 'react-aria-components';
import { motion, MotionConfig } from 'motion/react';
import { cx } from 'cva';
import { Button } from '#components/button';
import { Icon } from '#components/icon';
import { type DrawerPlacement, type DrawerSnapPoint, useSnapPoints } from './use-snap-points.tsx';
export type { DrawerPlacement, DrawerSnapPoint } from './use-snap-points.tsx';
import styles from './index.module.css';

// Stable empty array avoids re-creating on every render.
// useSnapPoints requires a non-empty array; [0] is a no-op sentinel.
// Rules of Hooks prevent conditional hook calls, so the hook always runs.
const NO_SNAP_POINTS: DrawerSnapPoint[] = [0];

// FM spring matching current cubic-bezier(0.32, 0.72, 0, 1) @ 150ms
const OPEN_CLOSE_SPRING = { type: 'spring' as const, visualDuration: 0.15, bounce: 0 };

const MotionModal = motion.create(RACModal);

// Slide direction per placement. Used for FM initial (entry) and animate (exit) targets.
function getSlideFrom(placement: DrawerPlacement): { x: string } | { y: string } {
  switch (placement) {
    case 'right':
      return { x: '100%' };
    case 'left':
      return { x: '-100%' };
    case 'bottom':
      return { y: '100%' };
    case 'top':
      return { y: '-100%' };
  }
}

interface DrawerContextValue {
  isDragging: boolean;
  handleProps: { onPointerDown: (e: React.PointerEvent) => void } | null;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

// Props that conflict between RAC and FM (style render-prop, DOM animation events)
type ConflictingProps = 'className' | 'children' | 'style' | 'onAnimationStart' | 'onAnimationEnd';

export interface DrawerProps extends Omit<RACModalOverlayProps, ConflictingProps> {
  /** Edge the drawer slides in from. left/right flip in RTL. */
  placement: DrawerPlacement;
  /** Accessible label for the dialog. Use when `title` is omitted. */
  'aria-label'?: string;
  /** Enable/disable animation. @default true */
  animate?: boolean;
  /** Snap point positions. Number = px, string = CSS length ('50%', '200px'). Percentages resolve against the drawer's rendered size. The largest resolved snap sets the drawer's minimum size along its constrained axis. */
  snapPoints?: readonly DrawerSnapPoint[];
  /** Current active snap point (controlled). */
  activeSnapPoint?: DrawerSnapPoint;
  /** Initial active snap point (uncontrolled). */
  defaultActiveSnapPoint?: DrawerSnapPoint;
  /** Called when snap point changes. */
  onSnapPointChange?: (snapPoint: DrawerSnapPoint) => void;
  /** Human-readable labels for snap points (for aria-valuetext). */
  snapLabels?: string[];
  /** Max size of the drawer along its constrained axis. Accepts CSS values. @default 'min(80vw, 400px)' for left/right, 'calc(100vh - 80px)' for top/bottom */
  maxSize?: number | string;
  /** Show built-in X close button. @default true for top/bottom, false for left/right */
  showCloseButton?: boolean;
  /** Accessible label for the close button. @default 'Close' */
  closeLabel?: string;
  /** Accessible label for the snap-point resize slider. @default 'Resize drawer' */
  snapSliderLabel?: string;
  /** Accessible title rendered as a heading inside the drawer. */
  title?: ReactNode;
  /** Forwarded to the inner Dialog for aria-controls linkage. */
  id?: string;
  /** Content to render inside the drawer. */
  children?: ReactNode;
  /** Additional CSS class for the inner dialog content region. */
  className?: string;
}

export interface DrawerTriggerProps extends RACDialogTriggerProps {}

export interface DrawerHandleProps {
  /** Additional CSS class. */
  className?: string;
}

function resolvePlacement(placement: DrawerPlacement, direction: string): DrawerPlacement {
  if (direction === 'rtl') {
    if (placement === 'left') return 'right';
    if (placement === 'right') return 'left';
  }
  return placement;
}

/**
 * An overlay panel that slides in from a screen edge.
 * Both entry and exit use FM spring animation. RAC's `isExiting` prop delays unmount.
 *
 * @param props - {@link DrawerProps}
 */
export const Drawer = forwardRef<HTMLElement, DrawerProps>(function Drawer(props, ref) {
  const {
    isDismissable,
    isKeyboardDismissDisabled,
    shouldCloseOnInteractOutside,
    isOpen,
    defaultOpen,
    onOpenChange,
    placement,
    'aria-label': ariaLabel,
    maxSize,
    animate = true,
    snapPoints,
    activeSnapPoint,
    defaultActiveSnapPoint,
    onSnapPointChange,
    snapLabels,
    showCloseButton,
    closeLabel = 'Close',
    snapSliderLabel = 'Resize drawer',
    title,
    id,
    children,
    className,
    ...rest
  } = props;

  const { direction } = RACUseLocale();
  const resolved = resolvePlacement(placement, direction);
  const shouldShowClose = showCloseButton ?? (resolved === 'top' || resolved === 'bottom');
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const hasSnapPoints = snapPoints != null && snapPoints.length > 0;
  const safeSnapPoints = hasSnapPoints ? snapPoints : NO_SNAP_POINTS;

  const snap = useSnapPoints({
    snapPoints: safeSnapPoints,
    activeSnapPoint,
    defaultActiveSnapPoint,
    onSnapPointChange,
    placement: resolved,
    drawerRef
  });

  // FM's ref forwarding through motion.create → RAC portal is unreliable for
  // triggering measurement at mount. Instead, a sentinel span inside MotionModal
  // uses a plain React callback ref to walk up to the drawer container.
  const sentinelRef = useCallback(
    function sentinelRef(el: HTMLElement | null) {
      const drawer = el?.closest('[data-ux-drawer]') as HTMLDivElement | null;
      if (drawer) {
        drawerRef.current = drawer;
        snap.measureRef(drawer);
      }
    },
    [snap.measureRef]
  );

  const slideFrom = getSlideFrom(resolved);

  // Exit animation state: holds overlay mounted while FM spring plays.
  // When inside a DialogTrigger, RAC ignores onOpenChange on the overlay.
  // We read the trigger's state via OverlayTriggerStateContext to detect
  // close and start the FM exit animation before paint.
  const [isExiting, setIsExiting] = useState(false);
  const isExitingRef = useRef(false);
  const deferredCloseRef = useRef<((isOpen: boolean) => void) | null>(null);
  const triggerState = useContext(RACOverlayTriggerStateContext);

  // Ref mirrors props that stable callbacks need to read fresh each call.
  const latestRef = useRef({ animate, onOpenChange });
  latestRef.current = { animate, onOpenChange };

  const prevTriggerOpen = useRef(triggerState?.isOpen);
  useLayoutEffect(
    function detectTriggerClose() {
      const wasOpen = prevTriggerOpen.current;
      prevTriggerOpen.current = triggerState?.isOpen;
      if (wasOpen && triggerState && !triggerState.isOpen && !isExitingRef.current) {
        const { animate: anim, onOpenChange: ooc } = latestRef.current;
        if (anim !== false) {
          isExitingRef.current = true;
          setIsExiting(true);
          deferredCloseRef.current = ooc ?? null;
        }
      }
    },
    [triggerState?.isOpen]
  );

  const handleOpenChange = useCallback(function handleOpenChange(nextOpen: boolean) {
    const { animate: anim, onOpenChange: ooc } = latestRef.current;
    if (nextOpen && isExitingRef.current) {
      // Re-open during exit: cancel exit, let FM spring reverse
      isExitingRef.current = false;
      setIsExiting(false);
      deferredCloseRef.current = null;
      return;
    }
    if (!nextOpen && anim !== false) {
      isExitingRef.current = true;
      setIsExiting(true);
      deferredCloseRef.current = ooc ?? null;
      return;
    }
    ooc?.(nextOpen);
  }, []);

  const animateTarget = isExiting ? slideFrom : { [snap.axis]: hasSnapPoints ? snap.activeOffset : 0 };

  const onMotionComplete = useCallback(function onMotionComplete() {
    if (!isExitingRef.current) return;
    isExitingRef.current = false;
    setIsExiting(false);
    deferredCloseRef.current = null;
    latestRef.current.onOpenChange?.(false);
  }, []);

  const drawerStyle: React.CSSProperties = {
    ...(maxSize !== undefined && { '--_max-size': typeof maxSize === 'number' ? `${maxSize}px` : maxSize }),
    ...(hasSnapPoints && {
      [snap.axis === 'y' ? 'minBlockSize' : 'minInlineSize']: `${snap.maxSnap}px`
    })
  } as React.CSSProperties;

  const contextValue = useMemo<DrawerContextValue>(
    function buildDrawerContext() {
      return {
        isDragging: hasSnapPoints ? snap.isDragging : false,
        handleProps: hasSnapPoints ? snap.handleProps : null
      };
    },
    [hasSnapPoints, snap.isDragging, snap.handleProps]
  );

  const guardedHandleOpenChange = useCallback(
    function guarded(nextOpen: boolean) {
      snap.guardedOnOpenChange(nextOpen, handleOpenChange);
    },
    [snap.guardedOnOpenChange, handleOpenChange]
  );

  return (
    <DrawerContext.Provider value={contextValue}>
      <RACModalOverlay
        isDismissable={isDismissable}
        isKeyboardDismissDisabled={isKeyboardDismissDisabled}
        shouldCloseOnInteractOutside={shouldCloseOnInteractOutside}
        isOpen={isOpen}
        defaultOpen={defaultOpen}
        isExiting={isExiting}
        onOpenChange={hasSnapPoints ? guardedHandleOpenChange : handleOpenChange}
        className={styles.overlay}
        {...rest}
      >
        <MotionConfig reducedMotion="user">
          <MotionModal
            ref={drawerRef}
            className={styles.drawer}
            data-ux-drawer=""
            data-placement={resolved}
            style={drawerStyle}
            initial={slideFrom}
            animate={animateTarget}
            transition={animate !== false ? OPEN_CLOSE_SPRING : { duration: 0 }}
            onAnimationComplete={onMotionComplete}
            {...(hasSnapPoints
              ? {
                  drag: snap.axis,
                  dragControls: snap.dragControls,
                  dragListener: false,
                  dragConstraints: snap.dragConstraints,
                  dragElastic: 0,
                  dragMomentum: false,
                  onDragStart: snap.onDragStart,
                  onDragEnd: snap.onDragEnd
                }
              : {})}
          >
            <RACDialog ref={ref} id={id} aria-label={ariaLabel} className={cx(styles.dialog, className)}>
              {hasSnapPoints && <span ref={sentinelRef} hidden aria-hidden="true" />}
              {shouldShowClose ? (
                <Button className={styles.close} slot="close" aria-label={closeLabel}>
                  <Icon icon="x" />
                </Button>
              ) : null}
              {title ? (
                <RACHeading slot="title" className={styles.title}>
                  {title}
                </RACHeading>
              ) : null}
              {hasSnapPoints && snapPoints.length > 1 ? (
                <SnapSlider
                  activeIndex={snap.activeIndex}
                  snapCount={snapPoints.length}
                  snapLabels={snapLabels}
                  label={snapSliderLabel}
                  placement={resolved}
                  snapTo={snap.snapTo}
                />
              ) : null}
              {children}
            </RACDialog>
          </MotionModal>
        </MotionConfig>
      </RACModalOverlay>
    </DrawerContext.Provider>
  );
});

interface SnapSliderProps {
  activeIndex: number;
  snapCount: number;
  snapLabels?: string[];
  label: string;
  placement: DrawerPlacement;
  snapTo: (index: number) => void;
}

function SnapSlider({ activeIndex, snapCount, snapLabels, label, placement, snapTo }: SnapSliderProps) {
  const { direction } = RACUseLocale();
  const orientation = placement === 'top' || placement === 'bottom' ? 'vertical' : 'horizontal';
  const maxIndex = snapCount - 1;
  const valueText = snapLabels?.[activeIndex] ?? `Position ${activeIndex + 1} of ${snapCount}`;
  // In RTL, horizontal ArrowRight decreases and ArrowLeft increases (ARIA spec)
  const rtlFlip = direction === 'rtl' && orientation === 'horizontal' ? -1 : 1;

  function onKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        e.preventDefault();
        snapTo(activeIndex + rtlFlip);
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        e.preventDefault();
        snapTo(activeIndex - rtlFlip);
        break;
      case 'Home':
        e.preventDefault();
        snapTo(0);
        break;
      case 'End':
        e.preventDefault();
        snapTo(maxIndex);
        break;
    }
  }

  return (
    <button
      type="button"
      role="slider"
      aria-label={label}
      aria-orientation={orientation}
      aria-valuenow={activeIndex}
      aria-valuemin={0}
      aria-valuemax={maxIndex}
      aria-valuetext={valueText}
      onKeyDown={onKeyDown}
      className={styles.snapSlider}
    />
  );
}

/**
 * Visual drag handle for touch gestures. Must be inside a Drawer with snapPoints.
 *
 * @param props - {@link DrawerHandleProps}
 */
export const DrawerHandle = forwardRef<HTMLDivElement, DrawerHandleProps>(function DrawerHandle(props, ref) {
  const ctx = useContext(DrawerContext);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-part="handle"
      className={cx(styles.handleHitArea, props.className)}
      data-dragging={ctx?.isDragging ? '' : undefined}
      {...ctx?.handleProps}
    >
      <div className={styles.handle} />
    </div>
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

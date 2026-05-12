import { useCallback, useMemo, useRef, useState, type RefObject } from 'react';
import { useDragControls, type DragControls, type PanInfo } from 'motion/react';
import { useResizeObserver } from '@react-aria/utils';
import { useControlledState } from '@react-stately/utils';

export type DrawerPlacement = 'top' | 'bottom' | 'left' | 'right';

/** Number = px, string = CSS length ('50%', '200px'). Percentages resolve against drawer's rendered size. */
export type DrawerSnapPoint = number | string;

interface UseSnapPointsOptions {
  snapPoints: readonly DrawerSnapPoint[];
  activeSnapPoint?: DrawerSnapPoint;
  defaultActiveSnapPoint?: DrawerSnapPoint;
  onSnapPointChange?: (snapPoint: DrawerSnapPoint) => void;
  placement: DrawerPlacement;
  /** Drawer element ref, needed to resolve percentage snap points to px. */
  drawerRef: RefObject<HTMLElement | null>;
}

interface UseSnapPointsReturn {
  /** onPointerDown for DrawerHandle to initiate drag */
  handleProps: { onPointerDown: (e: React.PointerEvent) => void };
  /** Drag axis for MotionModal */
  axis: 'x' | 'y';
  /** Current snap offset in px for MotionModal animate prop */
  activeOffset: number;
  /** Resolved max snap point in px. Used to set min-size on the drawer so all offsets stay on-screen. */
  maxSnap: number;
  /** FM drag controls for MotionModal */
  dragControls: DragControls;
  /** FM drag constraints for MotionModal */
  dragConstraints: Partial<Record<'top' | 'bottom' | 'left' | 'right', number>>;
  /** FM onDragEnd handler for MotionModal */
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  /** FM onDragStart handler for MotionModal */
  onDragStart: () => void;
  /** Wraps onOpenChange to defer close during active drag */
  guardedOnOpenChange: (isOpen: boolean, original?: (isOpen: boolean) => void) => void;
  isDragging: boolean;
  activeIndex: number;
  snapTo: (index: number) => void;
  /** Callback ref that measures the drawer element. Merge with drawerRef on the element. */
  measureRef: (el: HTMLElement | null) => void;
}

function isVertical(placement: DrawerPlacement): boolean {
  return placement === 'top' || placement === 'bottom';
}

/** Resolve a snap point string to px. Numbers pass through. */
function resolveSnapPointToPx(value: DrawerSnapPoint, referenceSize: number): number {
  if (typeof value === 'number') return value;
  const num = parseFloat(value);
  // Intentional: invalid strings (e.g. "foo") resolve to 0px rather than throwing.
  if (Number.isNaN(num)) return 0;
  if (value.endsWith('%')) return (num / 100) * referenceSize;
  // 'px' or bare number string
  return num;
}

/** Measure the drawer element's max size along its constrained axis. */
function measureDrawerSize(el: HTMLElement, placement: DrawerPlacement): number {
  const rect = el.getBoundingClientRect();
  return isVertical(placement) ? rect.height : rect.width;
}

// Offset = distance from fully-open position. drawerSize is the drawer's rendered
// dimension along the constrained axis, not the largest snap point.
function snapPointToOffset(placement: DrawerPlacement, snapPoint: number, drawerSize: number): number {
  const diff = drawerSize - snapPoint;
  return placement === 'top' || placement === 'left' ? -diff : diff;
}

function offsetToSnapValue(placement: DrawerPlacement, offset: number, drawerSize: number): number {
  const diff = placement === 'top' || placement === 'left' ? -offset : offset;
  return drawerSize - diff;
}

// FM drag velocity is in px/s. Threshold: 500 px/s (~0.5 px/ms)
const VELOCITY_THRESHOLD = 500;
const DRAG_DEAD_ZONE = 0.1;

export function useSnapPoints(options: UseSnapPointsOptions): UseSnapPointsReturn {
  const {
    snapPoints,
    activeSnapPoint: controlledSnap,
    defaultActiveSnapPoint,
    onSnapPointChange,
    placement,
    drawerRef
  } = options;

  // Measure drawer element for resolving % snap points.
  // Falls back to 0 before first layout (string snaps resolve to 0 until measured).
  const [measuredSize, setMeasuredSize] = useState(0);

  const onResize = useCallback(
    function onResize() {
      const el = drawerRef.current;
      if (el) setMeasuredSize(measureDrawerSize(el, placement));
    },
    [placement, drawerRef]
  );

  useResizeObserver({
    ref: drawerRef,
    onResize
  });

  // Callback ref that measures the drawer on mount. In the controlled isOpen
  // pattern, useResizeObserver misses the element because it doesn't exist at
  // mount time. Merge with drawerRef on the target element so this fires when
  // the element actually appears in the DOM.
  const placementRef = useRef(placement);
  placementRef.current = placement;
  const measureRef = useCallback(function measureRef(el: HTMLElement | null) {
    if (el) setMeasuredSize(measureDrawerSize(el, placementRef.current));
  }, []);

  // Resolve string snap points to px, then sort.
  // sortedPx, sortedOriginal, maxSnap are memoized together to avoid new references each render.
  const { sortedPx, sortedOriginal, maxSnap } = useMemo(
    function resolveAndSort() {
      const sorted = snapPoints
        .map(function resolve(sp) {
          return { original: sp, px: resolveSnapPointToPx(sp, measuredSize) };
        })
        .toSorted((a, b) => a.px - b.px);
      return {
        sortedPx: sorted.map(function getPx(r) {
          return r.px;
        }),
        sortedOriginal: sorted.map(function getOriginal(r) {
          return r.original;
        }),
        maxSnap: sorted.length > 0 ? sorted[sorted.length - 1].px : 0
      };
    },
    [snapPoints, measuredSize]
  );

  // The drawer's rendered size along its constrained axis. For pixel snaps this
  // equals maxSnap (minBlockSize forces it). For percent snaps the drawer may be
  // taller than maxSnap when content exceeds minBlockSize.
  const drawerSize = Math.max(measuredSize, maxSnap);

  const [resolvedSnap, setSnap] = useControlledState<DrawerSnapPoint>(
    controlledSnap,
    defaultActiveSnapPoint ?? sortedOriginal[sortedOriginal.length - 1],
    onSnapPointChange
  );
  const rawActiveIndex = sortedOriginal.indexOf(resolvedSnap);
  const activeIndex = rawActiveIndex >= 0 ? rawActiveIndex : sortedOriginal.length - 1;
  const resolvedSnapPx = sortedPx[activeIndex];

  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const closePendingRef = useRef<((isOpen: boolean) => void) | null>(null);

  // Reset drag state when pointer is cancelled (touch-cancel, browser focus loss).
  // Without this, an abandoned drag permanently blocks Escape/overlay close.
  const abandonDrag = useCallback(function abandonDrag() {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    if (closePendingRef.current) {
      const cb = closePendingRef.current;
      closePendingRef.current = null;
      cb(false);
    }
  }, []);

  const dragControls = useDragControls();

  const axis = isVertical(placement) ? 'y' : 'x';
  const activeOffset = snapPointToOffset(placement, resolvedSnapPx, drawerSize);

  // Single ref mirrors all derived/callback values so stable callbacks read fresh data.
  const latest = useRef({
    sortedPx,
    sortedOriginal,
    maxSnap,
    drawerSize,
    resolvedSnapPx,
    resolvedSnap,
    activeOffset,
    axis,
    placement
  });
  latest.current = {
    sortedPx,
    sortedOriginal,
    maxSnap,
    drawerSize,
    resolvedSnapPx,
    resolvedSnap,
    activeOffset,
    axis,
    placement
  };

  const dragConstraints = useMemo(
    function computeConstraints() {
      const minOffset = snapPointToOffset(placement, maxSnap, drawerSize);
      const maxOffset = snapPointToOffset(placement, sortedPx[0], drawerSize);
      const lo = Math.min(minOffset, maxOffset);
      const hi = Math.max(minOffset, maxOffset);

      if (isVertical(placement)) {
        return { top: lo, bottom: hi };
      }
      return { left: lo, right: hi };
    },
    [placement, sortedPx, maxSnap, drawerSize]
  );

  const snapTo = useCallback(
    function snapTo(index: number) {
      const clamped = Math.max(0, Math.min(index, latest.current.sortedOriginal.length - 1));
      setSnap(latest.current.sortedOriginal[clamped]);
    },
    [setSnap]
  );

  const onDragStart = useCallback(
    function onDragStart() {
      isDraggingRef.current = true;
      setIsDragging(true);
      document.addEventListener('pointercancel', abandonDrag, { once: true });
    },
    [abandonDrag]
  );

  const onDragEnd = useCallback(
    function onDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
      document.removeEventListener('pointercancel', abandonDrag);
      isDraggingRef.current = false;
      setIsDragging(false);

      const cur = latest.current;
      const velocity = cur.axis === 'y' ? info.velocity.y : info.velocity.x;
      const offset = cur.axis === 'y' ? info.offset.y : info.offset.x;
      const currentOffset = cur.activeOffset + offset;
      const currentSnapValue = offsetToSnapValue(cur.placement, currentOffset, cur.drawerSize);
      const totalRange = cur.maxSnap - cur.sortedPx[0];
      const dragPercent = totalRange > 0 ? Math.abs(currentSnapValue - cur.resolvedSnapPx) / totalRange : 0;

      let targetIndex: number;
      const absVelocity = Math.abs(velocity);
      const currentIndex = cur.sortedOriginal.indexOf(cur.resolvedSnap);

      if (absVelocity > VELOCITY_THRESHOLD) {
        const movingTowardEdge = cur.placement === 'bottom' || cur.placement === 'right' ? velocity > 0 : velocity < 0;

        if (movingTowardEdge) {
          targetIndex = currentIndex > 0 ? currentIndex - 1 : 0;
        } else {
          targetIndex = currentIndex < cur.sortedOriginal.length - 1 ? currentIndex + 1 : currentIndex;
        }
      } else if (dragPercent < DRAG_DEAD_ZONE) {
        targetIndex = currentIndex >= 0 ? currentIndex : 0;
      } else {
        // Nearest snap by px distance
        let nearestIdx = 0;
        let minDist = Math.abs(currentSnapValue - cur.sortedPx[0]);
        for (let i = 1; i < cur.sortedPx.length; i++) {
          const dist = Math.abs(currentSnapValue - cur.sortedPx[i]);
          if (dist < minDist) {
            minDist = dist;
            nearestIdx = i;
          }
        }
        targetIndex = nearestIdx;
      }

      setSnap(cur.sortedOriginal[targetIndex]);

      // Fire deferred close if Escape was pressed during drag
      if (closePendingRef.current) {
        const cb = closePendingRef.current;
        closePendingRef.current = null;
        cb(false);
      }
    },
    [setSnap, abandonDrag]
  );

  const guardedOnOpenChange = useCallback(function guardedOnOpenChange(
    isOpen: boolean,
    original?: (isOpen: boolean) => void
  ) {
    if (!isOpen && isDraggingRef.current) {
      closePendingRef.current = original ?? null;
      return;
    }
    original?.(isOpen);
  }, []);

  const handleProps = useMemo(
    function memoHandleProps() {
      return {
        onPointerDown: function startDrag(e: React.PointerEvent) {
          dragControls.start(e);
        }
      };
    },
    [dragControls]
  );

  return {
    handleProps,
    axis,
    activeOffset,
    maxSnap,
    dragControls,
    dragConstraints,
    onDragEnd,
    onDragStart,
    guardedOnOpenChange,
    isDragging,
    activeIndex,
    snapTo,
    measureRef
  };
}

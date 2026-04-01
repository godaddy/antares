import { Box, type BoxProps } from '#components/layout/box';
import { TooltipContext } from '@visx/xychart';
import { cx } from 'cva';
import { useContext, useEffect, useRef } from 'react';
import styles from './index.module.css';

/** Props for the {@link TooltipDismissStrip} component. */
export interface TooltipDismissStripProps extends Omit<BoxProps<'div'>, 'style'> {
  /**
   * Width in px on the leading viewport edge (LTR: left); match sticky axis chrome that overlaps the plot after
   * horizontal scroll.
   */
  width: number;
  /** Height in px; align with the visible plot band that receives pointer hover for the tooltip. */
  height: number;
}

/**
 * Closes the chart tooltip when the pointer enters a transparent strip on the leading edge of the viewport.
 *
 * Use when a horizontally scrollable chart stacks sticky axis UI above the plot hit target so moving onto that
 * chrome would otherwise leave the tooltip open.
 *
 * @param props - {@link TooltipDismissStripProps}
 * @returns `null` when tooltip context is missing or `width`/`height` are not positive; otherwise the strip element.
 *
 * @example
 * ```tsx
 * <TooltipProvider hideTooltipDebounceMs={0}>
 *   <XYChart {...} />
 *   {scrollLeft > 0 && (
 *     <TooltipDismissStrip width={axisBandWidthPx} height={chartHeightPx} />
 *   )}
 * </TooltipProvider>
 * ```
 */
export function TooltipDismissStrip(props: TooltipDismissStripProps) {
  const { width, height, className, ...boxProps } = props;
  const tooltipContext = useContext(TooltipContext);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(
    function subscribePointerEnter() {
      const el = layerRef.current;

      if (!el || !tooltipContext?.updateTooltip) {
        return;
      }

      function dismissTooltip() {
        tooltipContext?.updateTooltip({ tooltipOpen: false });
      }

      el.addEventListener('pointerenter', dismissTooltip);
      return function cleanup() {
        el.removeEventListener('pointerenter', dismissTooltip);
      };
    },
    [tooltipContext]
  );

  if (!tooltipContext || width <= 0 || height <= 0) {
    return null;
  }

  return (
    <Box
      ref={layerRef}
      {...boxProps}
      className={cx(styles.strip, className)}
      style={{ width, height }}
      aria-hidden
      data-tooltip-dismiss-strip
    />
  );
}

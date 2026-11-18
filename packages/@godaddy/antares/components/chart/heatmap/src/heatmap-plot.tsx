import { useCallback, useEffect, useId, useMemo, useRef } from 'react';
import { AxisBottom, AxisLeft, AxisRight } from '@visx/axis';
import { Group } from '@visx/group';
import { HeatmapRect } from '@visx/heatmap';
import { cx } from 'cva';
import { Box } from '#components/layout/box';
import type { SyntheticEvent } from 'react';
import { useHeatmapContext } from './context.ts';
import { resolveColor } from './use-heatmap.ts';
import styles from './index.module.css';

/** Space between the axis labels and the cells (px). */
const LABEL_GAP = 8;

/** One bin of the dense grid handed to `HeatmapRect`: a row of one column, present or not. */
interface GridBin<T> {
  xVal: string | Date;
  yVal: string | Date;
  datum: T | undefined;
}

/** One column of the dense grid: exactly one bin per row, in `yValues` order. */
interface GridColumn<T> {
  bins: GridBin<T>[];
}

/** Font, size and color come from the stylesheet; only anchoring and the hover emphasis are set here. */
function getTickLabelProps(isHovered: boolean, textAnchor: 'start' | 'middle' | 'end') {
  return {
    textAnchor,
    dy: '0.35em',
    className: isHovered ? styles.tickLabelHovered : undefined
  };
}

/**
 * Props for HeatmapPlot. The plot takes its size and options from the surrounding `HeatmapChart`.
 * @public
 */
export interface HeatmapPlotProps {
  /** Additional CSS class name applied to the scrolling area. */
  className?: string;
}

/**
 * The grid of a `HeatmapChart`: cells plus the row and column labels. Renders by default when the chart has
 * no children; place it yourself to arrange it with `HeatmapLegend` and other content.
 *
 * @param props - {@link HeatmapPlotProps}
 */
export function HeatmapPlot(props: HeatmapPlotProps) {
  const { className } = props;
  const {
    heatmap,
    layout,
    rtl,
    direction,
    valueAccessor,
    colorBuckets,
    xLabels,
    yLabels,
    xTickFormat,
    yTickFormat,
    cellPadding,
    cellRounding,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    desc
  } = useHeatmapContext<object>('HeatmapPlot');
  const descId = useId();

  const { parentRef, chartWidth, margin, xAxisRef, yAxisRef } = layout;
  const {
    svgRef,
    xValues,
    yValues,
    xByKey,
    yByKey,
    datumIndex,
    xScale,
    yScale,
    svgWidth,
    svgHeight,
    naturalHeight,
    maxHeight,
    hoveredX,
    hoveredY,
    handleCellEnter,
    handleCellLeave
  } = heatmap;

  // The tooltip is `position: fixed`, so it is anchored to the hovered cell's on-screen rect rather than a
  // position computed once at hover time. Scrolling the plot (or the page) moves the cell under a still
  // pointer, so the rect is re-read on every scroll; a cell scrolled out of the plot closes the tooltip.
  const activeCellRef = useRef<{
    el: SVGRectElement;
    datum: object;
    xVal: string | Date;
    yVal: string | Date;
  } | null>(null);

  const anchorTooltip = useCallback(
    function anchorTooltip() {
      const active = activeCellRef.current;
      const area = parentRef.current;
      if (!active || !area) return;
      const cell = active.el.getBoundingClientRect();
      const view = area.getBoundingClientRect();
      // The pinned axes cover the plot's edges, so a cell scrolled under them counts as out of view.
      const left = view.left + (!rtl && yLabels ? margin.left : 0);
      const right = view.right - (rtl && yLabels ? margin.right : 0);
      const bottom = view.bottom - (xLabels ? margin.bottom : 0);
      const centerX = cell.left + cell.width / 2;
      const outside = centerX < left || centerX > right || cell.bottom < view.top || cell.top > bottom;
      if (outside) {
        activeCellRef.current = null;
        handleCellLeave();
        return;
      }
      handleCellEnter(active.datum, active.xVal, active.yVal, centerX, cell.top);
    },
    [parentRef, handleCellEnter, handleCellLeave, rtl, yLabels, xLabels, margin.left, margin.right, margin.bottom]
  );

  const leaveCell = useCallback(
    function leaveCell() {
      activeCellRef.current = null;
      handleCellLeave();
    },
    [handleCellLeave]
  );

  useEffect(
    function followCellOnScroll() {
      const area = parentRef.current;
      function onScroll() {
        if (activeCellRef.current) anchorTooltip();
      }
      area?.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true, capture: true });
      return function stopFollowing() {
        area?.removeEventListener('scroll', onScroll);
        window.removeEventListener('scroll', onScroll, { capture: true });
      };
    },
    [parentRef, anchorTooltip]
  );

  // `HeatmapRect` walks columns of bins by index, so a missing cell would shift every later cell into the
  // wrong row. Normalize to a dense grid: every column has one bin per row, with `datum` undefined when the
  // data has no cell there.
  const grid = useMemo(
    function buildGrid(): GridColumn<object>[] {
      return xValues.map(function buildColumn(xVal) {
        const column = datumIndex.get(String(xVal));
        return {
          bins: yValues.map(function buildBin(yVal) {
            return { xVal, yVal, datum: column?.get(String(yVal)) };
          })
        };
      });
    },
    [xValues, yValues, datumIndex]
  );

  // Band scales key on strings, so recover the original category (e.g. a Date) before formatting.
  function formatXTick(v: unknown) {
    const original = xByKey.get(String(v)) as string | Date;
    return xTickFormat ? xTickFormat(original) : String(original);
  }
  function formatYTick(v: unknown) {
    const original = yByKey.get(String(v)) as string | Date;
    return yTickFormat ? yTickFormat(original) : String(original);
  }

  // Tick marks are hidden through CSS (transparent stroke via `tickClassName`), not `hideTicks`: with
  // zero-length ticks visx would otherwise paint a dot beside each label in its default stroke.
  // `hideTicks` is deliberately not used because it removes the tick elements the scrollable chart
  // hook measures to size the margins, which clips the x-axis labels.
  // The tick length is the space between the labels and the cells: visx moves each label out by it and
  // the hook sizes the margins from the axis box, which includes the tick. The cells are already inset
  // by half of `cellPadding`, so that inset is taken off the 8px gap, which keeps the distance between a
  // label and its cells at 8px whatever `cellPadding` is.
  const tickLength = Math.max(LABEL_GAP - cellPadding / 2, 0);
  const baseTickProps = { tickLength, hideAxisLine: true, tickClassName: styles.tickMark } as const;
  // visx thins band-scale ticks to roughly `numTicks` (10 by default), which would drop every other label
  // from a 24-column grid. A heatmap labels every row and column, so ask for all of them.
  const xTickProps = { ...baseTickProps, numTicks: xValues.length };
  const yTickProps = { ...baseTickProps, numTicks: yValues.length };

  const hasPlot = chartWidth > 0 && yValues.length > 0;
  const bandWidth = xScale.bandwidth();
  const bandHeight = yScale.bandwidth();

  // The row labels pin to the inline start edge and the column labels to the bottom edge of the scrolling
  // area with CSS `position: sticky`, so the browser moves them with the scroll itself. They are separate
  // layers over the cells (not copies drawn inside the SVG), and they own the axes the hook measures.
  const yAxisWidth = rtl ? margin.right : margin.left;

  return (
    <Box
      ref={parentRef}
      dir={direction}
      className={cx(styles.area, className)}
      style={{
        ['--heatmap-natural-height' as string]: `${naturalHeight}px`,
        ['--heatmap-max-height' as string]: Number.isFinite(maxHeight) ? `${maxHeight}px` : 'none',
        // Keyboard focus and tab scrolling stop short of the pinned axes instead of landing under them.
        scrollPaddingInlineStart: yLabels ? `${yAxisWidth}px` : undefined,
        scrollPaddingBlockEnd: xLabels ? `${margin.bottom}px` : undefined
      }}
    >
      {hasPlot && (
        <div className={styles.plot} style={{ width: svgWidth, height: svgHeight }}>
          <svg
            ref={svgRef}
            width={svgWidth}
            height={svgHeight}
            className={styles.cells}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            role="img"
            {...(desc ? { 'aria-describedby': descId } : {})}
          >
            {desc && <desc id={descId}>{desc}</desc>}

            <Group top={margin.top} left={margin.left}>
              {/* Cells. `HeatmapRect` places a cell at `x0 + xScale(column)` and `yScale(row) + gap`, with a
                  width of `binWidth - gap`; the offsets below inset each cell by half the gap on every side. */}
              <HeatmapRect<GridColumn<object>, GridBin<object>>
                data={grid}
                binWidth={bandWidth}
                binHeight={bandHeight}
                gap={cellPadding}
                x0={cellPadding / 2}
                xScale={(column) => xScale(String(xValues[column])) as number}
                yScale={(row) => (yScale(String(yValues[row])) as number) - cellPadding / 2}
              >
                {(columns) =>
                  columns.flatMap(function renderColumn(cells) {
                    return cells.map(function renderCell(cell) {
                      const { xVal, yVal, datum } = cell.bin;
                      const xKey = String(xVal);
                      const yKey = String(yVal);
                      const value = datum ? valueAccessor(datum) : null;
                      const color = resolveColor(value, colorBuckets);
                      const closed = color === null;
                      const cellW = Math.max(cell.width, 0);
                      const cellH = Math.max(cell.height, 0);
                      const highlighted = !closed && (String(hoveredX) === xKey || String(hoveredY) === yKey);

                      function showCell(event: SyntheticEvent<SVGRectElement>) {
                        activeCellRef.current = { el: event.currentTarget, datum: datum as object, xVal, yVal };
                        anchorTooltip();
                      }

                      return (
                        <rect
                          // Index-based: category labels can contain '-' (e.g. "2024-01"), which would collide.
                          key={`cell-${cell.column}-${cell.row}`}
                          x={cell.x}
                          y={cell.y}
                          width={cellW}
                          height={cellH}
                          rx={cellRounding}
                          fill={color ?? 'none'}
                          className={cx(
                            styles.cell,
                            closed && styles.cellClosed,
                            highlighted && styles.cellHighlighted
                          )}
                          tabIndex={closed ? -1 : 0}
                          role={closed ? 'presentation' : 'img'}
                          aria-label={closed ? undefined : `${String(yVal)}, ${String(xVal)}: ${String(value)}`}
                          onPointerEnter={!closed ? showCell : undefined}
                          onPointerLeave={!closed ? leaveCell : undefined}
                          onFocus={!closed ? showCell : undefined}
                          onBlur={!closed ? leaveCell : undefined}
                        />
                      );
                    });
                  })
                }
              </HeatmapRect>
            </Group>
          </svg>

          {/* Column labels, pinned to the bottom edge. They scroll sideways with the cells. */}
          {xLabels && (
            <div className={styles.xAxisLayer} style={{ height: margin.bottom }}>
              <svg width={svgWidth} height={margin.bottom} aria-hidden="true">
                <Group left={margin.left}>
                  <AxisBottom
                    {...xTickProps}
                    axisClassName={styles.axisX}
                    innerRef={xAxisRef}
                    scale={xScale}
                    tickFormat={formatXTick}
                    tickLabelProps={function getXTickProps(v) {
                      return getTickLabelProps(String(v) === String(hoveredX), 'middle');
                    }}
                  />
                </Group>
              </svg>
            </div>
          )}

          {/* Covers the corner where the pinned labels meet, so neither axis draws into it. */}
          {xLabels && yLabels && (
            <div className={styles.corner} style={{ width: yAxisWidth, height: margin.bottom }} aria-hidden="true" />
          )}

          {/* Row labels, pinned to the inline start edge. They scroll up and down with the cells. */}
          {yLabels && (
            <div className={styles.yAxisLayer} style={{ width: yAxisWidth }}>
              {/* Laid out left to right even in RTL: SVG `text-anchor="start"` follows the text direction, so in
                  an RTL context the labels would grow leftwards out of this layer and be clipped. The label text
                  itself still reads in its own direction. */}
              <svg width={yAxisWidth} height={svgHeight} style={{ direction: 'ltr' }} aria-hidden="true">
                <Group top={margin.top} left={rtl ? 0 : margin.left}>
                  {rtl ? (
                    <AxisRight
                      {...yTickProps}
                      axisClassName={styles.axisY}
                      innerRef={yAxisRef}
                      scale={yScale}
                      tickFormat={formatYTick}
                      tickLabelProps={function getYTickPropsRtl(v) {
                        return getTickLabelProps(String(v) === String(hoveredY), 'start');
                      }}
                    />
                  ) : (
                    <AxisLeft
                      {...yTickProps}
                      axisClassName={styles.axisY}
                      innerRef={yAxisRef}
                      scale={yScale}
                      tickFormat={formatYTick}
                      tickLabelProps={function getYTickProps(v) {
                        return getTickLabelProps(String(v) === String(hoveredY), 'end');
                      }}
                    />
                  )}
                </Group>
              </svg>
            </div>
          )}
        </div>
      )}
    </Box>
  );
}

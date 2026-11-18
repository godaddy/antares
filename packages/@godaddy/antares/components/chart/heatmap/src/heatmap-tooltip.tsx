import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { TooltipData } from '@visx/xychart';
import { Tooltip, TooltipContainer } from '#components/chart/_internal/tooltip';
import type { ColorBucket, DataPoint, HeatmapCell, InternalSeriesConfig } from '../../types.ts';
import { useHeatmapContext } from './context.ts';
import type { HeatmapTooltipData } from './use-heatmap.ts';
import styles from './index.module.css';

/**
 * Data passed to a custom tooltip render function.
 * @public
 */
export interface HeatmapTooltipRenderProps<T extends object = HeatmapCell> {
  /** The raw datum at this cell. Tooltips only open for cells that have a value. */
  datum: T;
  /** The color bucket the cell falls in. */
  bucket: ColorBucket | undefined;
  /** Cell value. */
  value: number | null;
  /** Column category from xAccessor. */
  x: string | Date;
  /** Row category from yAccessor. */
  y: string | Date;
}

/**
 * Props for HeatmapTooltip.
 * @template T - The data point type. Defaults to HeatmapCell.
 * @public
 */
export interface HeatmapTooltipProps<T extends object = HeatmapCell> {
  /**
   * Replaces the built-in tooltip content for the hovered or focused cell. The content is wrapped in the
   * shared tooltip container. Return `null` to show no tooltip for a cell.
   */
  children?: (props: HeatmapTooltipRenderProps<T>) => ReactNode;
}

/** Id of the single synthetic series the shared Tooltip renders for the hovered cell. */
const HOVERED_CELL_SERIES_ID = 'heatmap-cell';

function DefaultTooltip<T extends object>({
  data,
  tooltipValueFormatter,
  valueAccessor
}: {
  data: HeatmapTooltipData<T>;
  tooltipValueFormatter?: (d: T) => string;
  valueAccessor: (d: T) => number | null;
}) {
  const { datum, x, y, bucket } = data;

  // The shared Tooltip renders one row per series. A heatmap has no series, so the hovered cell is
  // presented as a single one: its swatch is the bucket color and its name is the "row · column" label.
  const series = [
    {
      id: HOVERED_CELL_SERIES_ID,
      name: `${String(y)} · ${String(x)}`,
      data: [datum],
      _resolvedColor: bucket?.color
    }
  ];

  return (
    <Tooltip
      // Same structural narrowing the bar chart uses: the payload is a subset of visx's TooltipData.
      tooltipData={{ datumByKey: { [HOVERED_CELL_SERIES_ID]: { datum } } } as unknown as TooltipData<DataPoint>}
      showArrow={true}
      formatValue={
        (tooltipValueFormatter ??
          function format(d: T) {
            return String(valueAccessor(d));
          }) as (datum: DataPoint) => string
      }
      series={series as unknown as InternalSeriesConfig[]}
    />
  );
}

/**
 * Tooltip for a `HeatmapChart`. It opens for the hovered or focused cell and is rendered in a portal, so it
 * can be placed anywhere inside the chart. Pass a render function as `children` to replace the content.
 *
 * @template T - The data point type. Defaults to HeatmapCell.
 * @param props - {@link HeatmapTooltipProps}
 */
export function HeatmapTooltip<T extends object = HeatmapCell>(props: HeatmapTooltipProps<T>) {
  const { children: renderContent } = props;
  const {
    heatmap: { tooltip: tooltipState },
    tooltip: enabled,
    tooltipValueFormatter,
    valueAccessor
  } = useHeatmapContext<T>('HeatmapTooltip');
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen } = tooltipState;

  if (!enabled || !tooltipOpen || !tooltipData) return null;

  let node: ReactNode;
  if (renderContent) {
    const content = renderContent({
      datum: tooltipData.datum,
      bucket: tooltipData.bucket,
      value: tooltipData.value,
      x: tooltipData.x,
      y: tooltipData.y
    });
    if (content === null || content === undefined || typeof content === 'boolean') return null;
    // The built-in tooltip is already a container (with arrow); custom content gets a plain one.
    node = <TooltipContainer>{content}</TooltipContainer>;
  } else {
    node = (
      <DefaultTooltip data={tooltipData} tooltipValueFormatter={tooltipValueFormatter} valueAccessor={valueAccessor} />
    );
  }

  return createPortal(
    <div className={styles.tooltipContainer} style={{ top: tooltipTop, left: tooltipLeft }}>
      {node}
    </div>,
    document.body
  );
}

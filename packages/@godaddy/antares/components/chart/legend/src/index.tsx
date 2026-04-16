import type { SeriesConfig } from '../../types.ts';
import { cx } from 'cva';
import { ChartColorProvider, useChartColor } from '#components/chart/use-chart-color';
import { Flex, type FlexProps } from '#components/layout/flex';
import { Box } from '#components/layout/box';
import { Text } from '#components/text';
import styles from './index.module.css';

/**
 * Props for the Legend component.
 *
 * Accepts the same series shape used by chart components (subset of {@link SeriesConfig}:
 * id, name). Use with the same series config as the chart so labels stay in sync.
 * Swatch colors use the same legacy palette as charts (`useChartColor`), in series order.
 */
export interface LegendProps
  extends Omit<FlexProps<'div'>, 'children' | 'direction' | 'display' | 'alignItems' | 'gap'> {
  /** Series to display in the legend (id, name) */
  series: Pick<SeriesConfig, 'id' | 'name'>[];
  /** Optional visible and accessible label for the legend. */
  label?: string;
  /** Size of the legend labels and swatches. @default 'md' */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Layout orientation for legend items. Defaults to horizontal. */
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Legend component for displaying series information.
 *
 * Renders a legend with palette-colored indicators and series names.
 * Each item calls `useChartColor` so swatches align with chart series order; the legend wraps
 * an internal `ChartColorProvider` so it does not consume colors from a parent chart provider.
 * Use the same series order as the chart so swatches match the bars or lines.
 *
 * @param props - {@link LegendProps}
 * @returns JSX element rendering the legend
 *
 * @example
 * ```tsx
 * <Legend
 *   series={[
 *     { id: '1', name: 'Product A' },
 *     { id: '2', name: 'Product B' },
 *   ]}
 * />
 * ```
 */
function LegendSwatch() {
  const color = useChartColor();
  return <Box rounding="full" className={styles.swatch} style={{ backgroundColor: color }} />;
}

interface LegendItemProps {
  seriesItem: Pick<SeriesConfig, 'id' | 'name'>;
}

function LegendItem(props: LegendItemProps) {
  const { seriesItem } = props;
  return (
    <Flex
      role="listitem"
      direction="row"
      alignItems="center"
      gap="var(--legend-gap-item-inline)"
      className={styles.item}
    >
      <LegendSwatch />
      <Text>{seriesItem.name}</Text>
    </Flex>
  );
}

export function Legend(props: LegendProps) {
  const { series, label, size = 'md', orientation = 'horizontal', className, ...rootFlexProps } = props;
  const isHorizontal = orientation === 'horizontal';

  return (
    <ChartColorProvider>
      <Flex
        {...rootFlexProps}
        direction="column"
        alignItems="flex-start"
        display="inline-flex"
        gap="var(--legend-gap-root)"
        className={cx(styles.root, className)}
        data-size={size}
      >
        {label ? <Text className={styles.label}>{label}</Text> : null}
        <Flex
          role="list"
          aria-label={label ?? 'Chart legend'}
          alignItems="flex-start"
          direction={isHorizontal ? 'row' : 'column'}
          gap={isHorizontal ? 'var(--legend-gap-items)' : 'var(--legend-gap-items-stack)'}
          flexShrink={0}
          wrap="wrap"
          justifyContent="center"
        >
          {series.map(function renderLegendItem(seriesItem) {
            return <LegendItem key={seriesItem.id} seriesItem={seriesItem} />;
          })}
        </Flex>
      </Flex>
    </ChartColorProvider>
  );
}

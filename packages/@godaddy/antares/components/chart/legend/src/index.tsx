import type { SeriesConfig } from '../../types.ts';
import { Flex } from '#components/layout/flex';
import { Box } from '#components/layout/box';
import { Text } from '#components/text';
import styles from './index.module.css';

/**
 * Props for the Legend component.
 *
 * Accepts the same series shape used by chart components (subset of {@link SeriesConfig}:
 * id, name). Use with the same series config as the chart so labels stay in sync.
 * Colors are handled by the theme.
 */
export interface LegendProps {
  /** Series to display in the legend (id, name) */
  series: Pick<SeriesConfig, 'id' | 'name'>[];
  /** Additional CSS class name(s) applied to the root element. */
  className?: string;
}

/**
 * Legend component for displaying series information.
 *
 * Renders a horizontally centered legend with theme-colored indicators and series names.
 * Each legend item is a circular swatch (color handled by the theme) plus the series name.
 * Use alongside chart components that share the same series config so the legend matches the chart.
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
export function Legend(props: LegendProps) {
  const { series, className } = props;

  return (
    <Flex role="list" aria-label="Chart legend" justifyContent="center" gap="lg" className={className}>
      {series.map(function renderLegendItem(seriesItem) {
        return (
          <Flex
            key={seriesItem.id}
            role="listitem"
            direction="row"
            alignItems="center"
            gap="sm"
            className={styles.item}
          >
            <Box rounding="full" className={styles.swatch} />
            <Text>{seriesItem.name}</Text>
          </Flex>
        );
      })}
    </Flex>
  );
}

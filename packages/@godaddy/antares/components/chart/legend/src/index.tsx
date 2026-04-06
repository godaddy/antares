import type { SeriesConfig } from '../../types.ts';
import { useMemo } from 'react';
import { cx } from 'cva';
import { Flex, type FlexProps } from '#components/layout/flex';
import { Box } from '#components/layout/box';
import { Text } from '#components/text';
import styles from './index.module.css';

/**
 * Props for the Legend component.
 *
 * Accepts the same series shape used by chart components (subset of {@link SeriesConfig}:
 * id, name). Use with the same series config as the chart so labels stay in sync.
 * Colors are handled by the theme.
 *
 * Inherits {@link FlexProps} for the root container (e.g. `alignSelf`, `justifyContent`, `gap`)
 * so the legend can be aligned within chart layouts.
 */
export interface LegendProps extends Omit<FlexProps<'div'>, 'children'> {
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
 * Renders a legend with theme-colored indicators and series names.
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
  const { series, label, size = 'md', orientation = 'horizontal', className, ...rootFlexProps } = props;
  const isHorizontal = orientation === 'horizontal';

  const items = useMemo(
    function getLegendItems() {
      return series.map(function renderLegendItem(seriesItem) {
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
      });
    },
    [series]
  );

  return (
    <Flex
      direction="column"
      alignItems="flex-start"
      display="inline-flex"
      gap="sm"
      className={cx(styles.root, className)}
      {...rootFlexProps}
      data-size={size}
    >
      {label ? <Text className={styles.label}>{label}</Text> : null}
      <Flex
        role="list"
        aria-label={label ?? 'Chart legend'}
        alignItems="flex-start"
        direction={isHorizontal ? 'row' : 'column'}
        gap={isHorizontal ? 'lg' : 'sm'}
      >
        {items}
      </Flex>
    </Flex>
  );
}

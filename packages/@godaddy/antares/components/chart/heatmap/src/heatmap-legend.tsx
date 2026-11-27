import { cx } from 'cva';
import { Flex, type FlexProps } from '#components/layout/flex';
import { Box } from '#components/layout/box';
import { Text } from '#components/text';
import { textTreatmentClassName } from '#components/_internal/typography';
import { useHeatmapContext } from './context.ts';
import styles from './index.module.css';

/**
 * Props for HeatmapLegend.
 * @public
 */
export interface HeatmapLegendProps extends Omit<FlexProps, 'children' | 'role' | 'aria-label'> {
  /** Legend title. Defaults to the chart's `colorLegendLabel`. */
  label?: string;

  /** Text for the closed-cell entry. Defaults to the chart's `closedLabel`. */
  closedLabel?: string;
}

/**
 * Color legend for a `HeatmapChart`: one swatch per bucket, a divider and the closed-cell entry.
 * Reads the buckets from the chart, so it can be placed anywhere inside it.
 *
 * @param props - {@link HeatmapLegendProps}
 */
export function HeatmapLegend(props: HeatmapLegendProps) {
  const { colorBuckets, colorLegendLabel, closedLabel: chartClosedLabel } = useHeatmapContext('HeatmapLegend');
  const { label = colorLegendLabel, closedLabel = chartClosedLabel, className, ...rest } = props;

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      alignSelf="center"
      wrap="wrap"
      gap="lg"
      {...rest}
      role="list"
      aria-label={label ?? 'Heatmap legend'}
      className={cx(styles.legend, className)}
    >
      {label && <Text className={cx(styles.legendLabel, textTreatmentClassName('inherit'))}>{label}</Text>}
      {colorBuckets.map(function renderBucket(b) {
        return (
          <Flex key={b.label} role="listitem" alignItems="center" gap="sm">
            <Box
              rounding="lg"
              className={styles.legendSwatch}
              style={{ backgroundColor: b.color }}
              aria-hidden="true"
            />
            <Text className={textTreatmentClassName('inherit')}>{b.label}</Text>
          </Flex>
        );
      })}
      {/* One list item so the divider can never wrap onto a line by itself. */}
      <Flex role="listitem" alignItems="center" gap="lg">
        <Box className={styles.legendDivider} aria-hidden="true" />
        <Flex alignItems="center" gap="sm">
          <Box rounding="lg" className={cx(styles.legendSwatch, styles.legendSwatchClosed)} aria-hidden="true" />
          <Text className={textTreatmentClassName('inherit')}>{closedLabel}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

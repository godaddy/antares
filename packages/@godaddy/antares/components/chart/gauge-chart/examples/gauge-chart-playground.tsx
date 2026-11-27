import {
  GaugeChart,
  GaugeChartCenter,
  GaugeChartRange,
  Text,
  type GaugeChartProps,
  type TextProps
} from '@godaddy/antares';

export interface PlaygroundExampleProps {
  /** Value shown inside the arc. */
  label?: string;
  /** Description below the value. */
  description?: string;
  /** Minimum range label. */
  rangeMin?: string;
  /** Maximum range label. */
  rangeMax?: string;
  /** Text emphasis for the value, description, and range labels. */
  emphasis?: TextProps['emphasis'];
  /** Accessible text for the value. */
  valueLabel?: string;
  /** Number of segments (omit for continuous). */
  segments?: GaugeChartProps['segments'];
  /** Font size of the center value. */
  labelType?: GaugeChartProps['labelType'];
  /** Status color variant. */
  variant?: GaugeChartProps['variant'];
  /** Fill value. */
  value: number;
  /** CSS width for the gauge container. */
  width?: string;
}

export function PlaygroundExample({
  label = '50%',
  description,
  rangeMin,
  rangeMax,
  emphasis,
  valueLabel,
  segments,
  labelType = 'value',
  variant = 'default',
  value = 50,
  width
}: PlaygroundExampleProps) {
  return (
    <GaugeChart
      segments={segments}
      labelType={labelType}
      variant={variant}
      value={value}
      valueLabel={valueLabel}
      style={width ? { maxWidth: width, margin: 'auto' } : undefined}
      aria-label="Playground gauge"
    >
      <GaugeChartCenter>
        {label && (
          <Text slot="value" emphasis={emphasis}>
            {label}
          </Text>
        )}
        {description && (
          <Text slot="description" emphasis={emphasis}>
            {description}
          </Text>
        )}
      </GaugeChartCenter>
      {(rangeMin || rangeMax) && (
        <GaugeChartRange>
          {rangeMin && (
            <Text slot="min" emphasis={emphasis}>
              {rangeMin}
            </Text>
          )}
          {rangeMax && (
            <Text slot="max" emphasis={emphasis}>
              {rangeMax}
            </Text>
          )}
        </GaugeChartRange>
      )}
    </GaugeChart>
  );
}

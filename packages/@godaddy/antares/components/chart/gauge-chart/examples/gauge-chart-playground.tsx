import { GaugeChart, type GaugeChartProps } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  /** Primary text label displayed inside the gauge. */
  label: string;
  /** Descriptive label providing context. */
  subLabel?: string;
  /** Minimum range label. */
  rangeMin?: string;
  /** Maximum range label. */
  rangeMax?: string;
  /** Number of segments (omit for continuous). */
  segments?: GaugeChartProps['segments'];
  /** Controls the font size of the primary label. */
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
  subLabel,
  rangeMin,
  rangeMax,
  segments,
  labelType = 'value',
  variant = 'default',
  value = 50,
  width
}: PlaygroundExampleProps) {
  const rangeLabel = rangeMin && rangeMax ? { min: rangeMin, max: rangeMax } : undefined;

  return (
    <GaugeChart
      label={label}
      subLabel={subLabel}
      rangeLabel={rangeLabel}
      segments={segments}
      labelType={labelType}
      variant={variant}
      value={value}
      style={width ? { maxWidth: width, margin: 'auto' } : undefined}
      aria-label="Playground gauge"
    />
  );
}

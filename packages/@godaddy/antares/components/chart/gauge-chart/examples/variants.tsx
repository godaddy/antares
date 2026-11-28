import { GaugeChart, GaugeChartCenter, Grid, Text, type GaugeChartProps } from '@godaddy/antares';

const variants: Array<{ variant: NonNullable<GaugeChartProps['variant']>; name: string }> = [
  { variant: 'default', name: 'Default' },
  { variant: 'success', name: 'Success' },
  { variant: 'warning', name: 'Warning' },
  { variant: 'critical', name: 'Critical' }
];

/**
 * Color variants convey meaning at a glance — use `success`, `warning`, or `critical` alongside descriptive text.
 * @order 5
 */
export function VariantsExample() {
  return (
    <Grid columns="repeat(2, 1fr)" gap="lg" justifyContent="center">
      {variants.map(function renderGauge({ variant, name }) {
        return (
          <GaugeChart key={variant} value={50} variant={variant} aria-label={`${name} variant gauge`}>
            <GaugeChartCenter>
              <Text slot="value">50%</Text>
              <Text slot="description">{name}</Text>
            </GaugeChartCenter>
          </GaugeChart>
        );
      })}
    </Grid>
  );
}

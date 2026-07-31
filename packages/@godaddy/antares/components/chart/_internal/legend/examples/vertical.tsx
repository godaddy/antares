import { Legend, type LegendProps } from '../src/index.tsx';

/**
 * Legend items stacked vertically while keeping swatch and label side-by-side, useful when horizontal space is constrained.
 * @title Vertical orientation
 * @order 4
 */
export function LegendVerticalExample(props: Partial<LegendProps>) {
  const series = [
    { id: 'series-1', name: 'Series 1' },
    { id: 'series-2', name: 'Series 2' },
    { id: 'series-3', name: 'Series 3' }
  ];

  return <Legend series={series} label="City temperatures" orientation="vertical" {...props} />;
}

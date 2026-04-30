import { Box, DonutChart } from '@godaddy/antares';

const DATA_BY_PRESET = {
  three: [
    { id: '1', name: 'Alpha', value: 50 },
    { id: '2', name: 'Beta', value: 30 },
    { id: '3', name: 'Gamma', value: 20 }
  ],
  four: [
    { id: '1', name: 'Product A', value: 40 },
    { id: '2', name: 'Product B', value: 30 },
    { id: '3', name: 'Product C', value: 20 },
    { id: '4', name: 'Product D', value: 10 }
  ],
  five: [
    { id: '1', name: 'Category A', value: 35 },
    { id: '2', name: 'Category B', value: 25 },
    { id: '3', name: 'Category C', value: 18 },
    { id: '4', name: 'Category D', value: 12 },
    { id: '5', name: 'Category E', value: 10 }
  ],
  skewed: [
    { id: '1', name: 'Major', value: 85 },
    { id: '2', name: 'Minor A', value: 10 },
    { id: '3', name: 'Minor B', value: 5 },
    { id: '4', name: 'Minor C', value: 4 },
    { id: '5', name: 'Minor D', value: 3 },
    { id: '6', name: 'Minor E', value: 2 }
  ]
} as const;

export type DonutChartDataPreset = keyof typeof DATA_BY_PRESET;

/** Props for the DonutChart Storybook playground. */
export interface PlaygroundExampleProps {
  dataPreset: DonutChartDataPreset;
  label: string;
  subLabel: string;
  legendPlacement: 'none' | 'bottom' | 'right';
  legendLabel: string;
  smallSliceThreshold: number;
  useCurrencyFormat: boolean;
  width: string;
  'aria-label': string;
}

const PLAYGROUND_WIDTH_PX = '320px';

export function PlaygroundExample({
  dataPreset,
  label,
  subLabel,
  legendPlacement,
  legendLabel,
  smallSliceThreshold,
  useCurrencyFormat,
  'aria-label': ariaLabel,
  width = PLAYGROUND_WIDTH_PX
}: PlaygroundExampleProps) {
  const data = [...DATA_BY_PRESET[dataPreset]];
  const legend = legendPlacement === 'none' ? undefined : legendPlacement;
  const formatValue = useCurrencyFormat
    ? function formatCurrency(value: number) {
        return new Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0
        }).format(value);
      }
    : undefined;

  return (
    <Box style={{ width }}>
      <DonutChart
        data={data}
        label={label}
        subLabel={subLabel.trim() ? subLabel : undefined}
        legend={legend}
        legendLabel={legend ? legendLabel : undefined}
        smallSliceThreshold={smallSliceThreshold}
        formatValue={formatValue}
        aria-label={ariaLabel}
      />
    </Box>
  );
}

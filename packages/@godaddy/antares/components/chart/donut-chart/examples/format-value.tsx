import { DonutChart, type DonutChartProps } from '@godaddy/antares';

const data = [
  { id: '1', name: 'Sales', value: 42 },
  { id: '2', name: 'Services', value: 35 },
  { id: '3', name: 'Support', value: 23 }
];

export function FormatValueExample(props: Partial<DonutChartProps>) {
  return (
    <DonutChart
      data={data}
      label="$100.00"
      formatValue={function format(v: number) {
        return `$${v}.00`;
      }}
      aria-label="Donut with formatted tooltip values for multiple revenue categories"
      {...props}
    />
  );
}

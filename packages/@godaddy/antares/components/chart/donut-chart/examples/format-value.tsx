import { DonutChart, DonutChartCenter, Text } from '@godaddy/antares';

const data = [
  { id: '1', name: 'Sales', value: 42 },
  { id: '2', name: 'Services', value: 35 },
  { id: '3', name: 'Support', value: 23 }
];

/**
 * Use `formatValue` when the raw numbers in the tooltip should read like money, counts with separators, or whatever your product expects. The percentage of the total still formats on its own; your function only shapes the value column.
 * @title Format value
 * @order 5
 */
export function FormatValueExample() {
  return (
    <DonutChart
      data={data}
      formatValue={function format(v: number) {
        return `$${v}.00`;
      }}
      aria-label="Donut with formatted tooltip values for multiple revenue categories"
    >
      <DonutChartCenter>
        <Text slot="value">$100.00</Text>
      </DonutChartCenter>
    </DonutChart>
  );
}

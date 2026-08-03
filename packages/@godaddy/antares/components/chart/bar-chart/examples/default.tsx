import { BarChart } from '@godaddy/antares';
import { cityTemperature } from '@visx/mock-data';

/**
 * You give the chart a `series` array plus `xAccessor` and `yAccessor` so it knows which field is the category and which is the value - this is the everyday setup for one set of vertical bars.
 * @order 1
 */
export function DefaultExample(props: any) {
  const series = [
    {
      id: 'new-york-series',
      name: 'New York',
      data: cityTemperature.slice(0, 10)
    }
  ];

  return (
    <BarChart
      series={series}
      xAccessor={(d: any) => d.date}
      yAccessor={(d: any) => d['New York']}
      xAxisTitle="Date"
      yAxisTitle="Temperature (°F)"
      xBaseline={true}
      yBaseline={true}
      xTickMarks={true}
      yTickMarks={true}
      yGridlines={true}
      xGridlines={true}
      {...props}
    />
  );
}

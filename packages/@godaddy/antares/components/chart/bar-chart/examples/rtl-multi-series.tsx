import { BarChart } from '@godaddy/antares';
import { cityTemperature } from '@visx/mock-data';
import { RTLProvider } from '../../../../utils/rtl-locale-provider.tsx';

export function BarChartRTLMultiSeriesExample(props: any) {
  const cities = ['New York', 'San Francisco', 'Austin'] as const;

  const series = cities.map(function mapCity(city) {
    return {
      id: `city-${city.toLowerCase().replace(/\s+/g, '-')}`,
      name: city,
      data: cityTemperature.slice(0, 10).map(function mapData(d) {
        return {
          x: d.date,
          y: parseFloat(d[city as keyof typeof d])
        };
      })
    };
  });

  return (
    <RTLProvider>
      <BarChart
        series={series}
        xAccessor={(d: any) => d.x}
        yAccessor={(d: any) => d.y}
        xAxisTitle="Date"
        yAxisTitle="Temperature (°F)"
        xBaseline={true}
        yBaseline={true}
        xTickMarks={true}
        yTickMarks={true}
        yGridlines={true}
        {...props}
      />
    </RTLProvider>
  );
}

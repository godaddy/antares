import { LineChart, type LineChartProps } from '@godaddy/antares';

export function BandPaddingExample(props: Partial<LineChartProps>) {
  const xDomain = ['Q1', 'Q2', 'Q3', 'Q4'];

  const series = [
    {
      name: 'Series 1',
      data: [
        { x: 'Q1', y: '100' },
        { x: 'Q2', y: '200' },
        { x: 'Q3', y: '150' },
        { x: 'Q4', y: '300' }
      ]
    }
  ];

  return (
    <LineChart
      series={series}
      xType="band"
      yType="band"
      xLabels={true}
      yLabels={true}
      xDomain={xDomain}
      xPaddingOuter={0.1}
      yPaddingOuter={0.1}
      height={400}
      aria-label="Band padding example chart"
      desc="Line chart demonstrating band scale padding"
      {...props}
    />
  );
}

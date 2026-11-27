import {
  Content,
  Footer,
  Header,
  Heading,
  HeatmapChart,
  HeatmapLegend,
  HeatmapPlot,
  HeatmapTooltip,
  Text,
  type ColorBucket
} from '@godaddy/antares';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = ['8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm'];

const COLOR_BUCKETS: ColorBucket[] = [
  { min: 0, max: 50, color: '#d8efef', label: '0–50' },
  { min: 50, max: 100, color: '#94d7da', label: '50–100' },
  { min: 100, max: 150, color: '#15a4ab', label: '100–150' },
  { min: 150, max: null, color: '#0e7078', label: '150+' }
];

const DATA = DAYS.flatMap(function mapDay(day, dayIndex) {
  return HOURS.map(function mapHour(hour, hourIndex) {
    return { x: hour, y: day, value: (dayIndex * 37 + hourIndex * 29) % 190 };
  });
});

/**
 * The legend can sit anywhere inside the chart, here beside the title, with supporting text under the
 * plot. A render function on `HeatmapTooltip` shows the row, column and value.
 * @title Legend beside the title
 * @order 10
 */
export function ComposedLegendHeaderExample(props: any) {
  return (
    <HeatmapChart data={DATA} colorBuckets={COLOR_BUCKETS} aria-labelledby="visitors-title" {...props}>
      <Header wrap="wrap">
        <Heading id="visitors-title" level={2}>
          Weekly visitors
        </Heading>
        <HeatmapLegend />
      </Header>

      <Content>
        <HeatmapPlot />
      </Content>

      <Footer>
        <Text>Visitors per two-hour window</Text>
      </Footer>

      <HeatmapTooltip>
        {({ x, y, value }) => (
          <Text>
            {String(y)} · {String(x)}: {value} visitors
          </Text>
        )}
      </HeatmapTooltip>
    </HeatmapChart>
  );
}

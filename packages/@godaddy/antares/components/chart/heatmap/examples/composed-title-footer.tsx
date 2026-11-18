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
 * Pass children to arrange the chart yourself. Here a title sits above the plot and the legend moves to
 * the footer. `HeatmapPlot` draws the cells and labels, `HeatmapLegend` the color legend, and
 * `HeatmapTooltip` the hover and focus tooltip; all three read the chart's data and colors.
 * @title Title above, legend in the footer
 * @order 9
 */
export function ComposedTitleFooterExample(props: any) {
  return (
    <HeatmapChart data={DATA} colorBuckets={COLOR_BUCKETS} aria-labelledby="activity-title" {...props}>
      <Header>
        <Heading id="activity-title" level={2}>
          Weekly activity
        </Heading>
      </Header>

      <Content>
        <HeatmapPlot />
      </Content>

      <Footer>
        <HeatmapLegend />
      </Footer>

      <HeatmapTooltip>{({ value }) => <Text>{value} visitors</Text>}</HeatmapTooltip>
    </HeatmapChart>
  );
}

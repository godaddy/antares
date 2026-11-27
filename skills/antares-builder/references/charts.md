# Charts

Read this for any chart implementation, conversion or customization. Check the installed chart props before adapting these patterns. Import `BarChart`, `LineChart`, `DonutChart` and `GaugeChart` from the package root or `@godaddy/antares/Chart`. `Chart` is a public subpath, not a generic chart component. Bar/Line/Donut use Visx; Gauge uses Antares SVG. Do not import internal legends, tooltips or Visx modules as Antares public API.

## BarChart: categorical comparisons

Pass a `series` array of `{ id, name, data }`. The default point shape is `{ x, y }`; custom point shapes need `xAccessor` and `yAccessor`. Multiple series produce grouped bars. Use stable series IDs across filtering/reordering.

Vertical bars use X for categories and Y for values. Horizontal bars reverse that relationship: X must return the numeric value and Y the category. Changing only `orientation` while keeping vertical accessors is insufficient.

```tsx
import { BarChart } from '@godaddy/antares/Chart';

type RegionalRevenuePoint = { region: string; revenue: number };

export function RegionalRevenue() {
  return (
    <BarChart<RegionalRevenuePoint>
      series={[{
        id: 'revenue',
        name: 'Revenue',
        data: [{ region: 'North America', revenue: 12000 }, { region: 'Europe', revenue: 9000 }]
      }]}
      orientation="horizontal"
      xAccessor={(point) => point.revenue}
      yAccessor={(point) => point.region}
      xAxisTitle="Revenue (USD)"
      yAxisTitle="Region"
      height={280}
      aria-label="Revenue by region"
      desc="North America: 12,000 US dollars. Europe: 9,000 US dollars."
    />
  );
}
```

Use `xDomain`/`yDomain` for explicit category order or numeric bounds, matching the orientation. Keep comparison charts on consistent scales. Axis controls include labels, tick formatting, tick counts, baselines and gridlines. Series support palette `colorIndex`, per-category `categoryColors` and `opacity`; preserve meaningful labels alongside color.

## LineChart: continuous and time trends

Pass series with points in intended X order. Use `xType="time"` for Date values, `"linear"` for numeric X, or `"band"` for discrete labels. Custom data requires both accessors. Preserve missing observations as `y: null` rather than inventing zeros. Use `xTitle`/`yTitle`; these differ from BarChart's `xAxisTitle`/`yAxisTitle`.

```tsx
import { LineChart } from '@godaddy/antares/Chart';

export function MonthlyRevenue() {
  return (
    <LineChart
      series={[{
        id: 'revenue',
        name: 'Revenue',
        data: [
          { x: new Date(2026, 0, 1), y: 12000 },
          { x: new Date(2026, 1, 1), y: null },
          { x: new Date(2026, 2, 1), y: 15000 }
        ]
      }]}
      xType="time"
      xTitle="Month"
      yTitle="Revenue (USD)"
      height={280}
      aria-label="Monthly revenue, January to March"
      desc="January: 12,000 US dollars. February: unavailable. March: 15,000 US dollars."
    />
  );
}
```

Check `xDomain`/`yDomain`, tick formatting/values and `xZero`/`yZero` when the scale matters. Zero is inappropriate for log/time scales. Series accept `colorIndex` and `variant="solid" | "dashed" | "dotted"`; do not copy BarChart's category color API onto lines.

## DonutChart: parts of a whole

Pass `data` containing `{ id, name, value }` with numeric non-negative values. Use `DonutChartCenter` for optional content in the ring and `ChartLegend` to display the slice names. Prefer a small set of categories that form a whole.

```tsx
import { ChartLegend, DonutChart, DonutChartCenter } from '@godaddy/antares/Chart';
import { Text } from '@godaddy/antares/Text';

export function TrafficSources() {
  return (
    <DonutChart
      data={[{ id: 'organic', name: 'Organic', value: 70 }, { id: 'direct', name: 'Direct', value: 30 }]}
      aria-label="Traffic sources: 70 percent organic, 30 percent direct"
    >
      <DonutChartCenter>
        <Text slot="value" size="2xl">100%</Text>
        <Text slot="description">Traffic</Text>
      </DonutChartCenter>
      <ChartLegend label="Source" />
    </DonutChart>
  );
}
```

Use `DonutChartCenter` with `Text` in the `value` and `description` slots. The slots can appear in either order. An explicit `Text size` overrides the chart's responsive default. The description also describes the ring.

`legendPosition` defaults to `"bottom"` and accepts `"end"` for a legend beside the ring. `formatValue` formats slice values in the tooltip. Only positive slices appear in the ring. Handle an empty or all-zero total explicitly. `smallSliceThreshold` groups adjacent small slices in the tooltip.

## GaugeChart: one value on a known scale

Provide a numeric `value` and an accessible name. Continuous mode clamps to 0–100. To use a segmented scale, pass a positive integer as `segments`.

```tsx
import { GaugeChart, GaugeChartCenter, GaugeChartRange } from '@godaddy/antares/Chart';
import { Text } from '@godaddy/antares/Text';

export function HealthScore() {
  return (
    <GaugeChart
      value={3}
      segments={5}
      valueLabel="3 of 5"
      variant="warning"
      aria-label="Site health score"
      style={{ maxWidth: '16rem' }}
    >
      <GaugeChartCenter>
        <Text slot="value" size="2xl">3/5</Text>
        <Text slot="description">Site health</Text>
      </GaugeChartCenter>
      <GaugeChartRange>
        <Text slot="min">0</Text>
        <Text slot="max">5</Text>
      </GaugeChartRange>
    </GaugeChart>
  );
}
```

Compose the optional center and range in either order. Use `Text` in the `value` and `description` slots and set `size` to override the responsive default. Set `valueLabel` for accessible value text. Use ProgressBar or CircularProgress for task completion.

## Dimensions, legends and tooltips

Bar/Line measure their container and accept numeric `width`/`height`; ensure usable non-zero dimensions before diagnosing absent data. They scroll when their minimum plot size exceeds available space, with behavior depending on orientation. Avoid adding a competing scroll/axis system. Donut/Gauge size from container width; constrain their parent or max width to suit the layout. Test the actual dashboard cell at narrow widths.

Bar/Line use `legendPosition="top" | "bottom" | null`; the default shows a bottom legend for multiple series. Their `tooltipValueFormatter` receives a datum, not a numeric value alone. Custom `renderTooltip` payloads differ: use the public `BarChartTooltipRenderProps`/`BarChartTooltipSeries` or `LineChartTooltipRenderProps` types. Do not replace built-in tooltip behavior unless the product needs custom content.

## Accessibility and data states

Supply `aria-label` and meaningful series/category/unit labels. Bar/Line also accept `desc`. Make the essential values or takeaway available in nearby text or a semantic table when users need them; do not rely on pointer tooltips or color alone. Verify actual keyboard/assistive behavior instead of assuming every Visx graphic inherits RAC collection behavior. Use the application's locale for dates, numbers and currencies, and check RTL layouts when applicable.

Handle loading, no data, single-point/single-slice data, missing values, long labels and large datasets according to the product. Validate finite values/accessors and domain coverage. Preserve missing versus zero semantics; avoid rendering an empty frame as if it were a valid result. Do not change the library's component internals to solve a consumer data-formatting issue.

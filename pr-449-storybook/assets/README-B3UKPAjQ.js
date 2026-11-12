import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-DpGtm5cK.js";import{a as l,c as u,d,i as f,l as p,n as m,o as h,r as g,s as _,t as v,u as y}from"./heatmap.stories-d3pQ0P0P.js";function b(e){let t={code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(s,{of:y,name:`Overview`}),`
`,(0,S.jsx)(t.h1,{id:`heatmap-chart`,children:`Heatmap Chart`}),`
`,(0,S.jsx)(t.p,{children:`A two-dimensional categorical chart that fills cells with discrete threshold colors, with closed-cell support and hover cross-highlighting.`}),`
`,(0,S.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Discrete color buckets`}),`: Define threshold ranges with explicit colors — no continuous gradient`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Closed cells`}),`: Set `,(0,S.jsx)(t.code,{children:`value: null`}),` to render a dashed-border empty rectangle for unavailable slots`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Hover cross-highlight`}),`: Hovering or focusing a cell bolds the matching row and column axis labels`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Keyboard accessible`}),`: Focusing a cell shows its tooltip, the same as hovering`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Adjustable gap`}),`: `,(0,S.jsx)(t.code,{children:`cellPadding`}),` sets the gap between cells in px`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Sized from its rows`}),`: Without a `,(0,S.jsx)(t.code,{children:`height`}),`, the chart is as tall as its rows (`,(0,S.jsx)(t.code,{children:`minCellHeight`}),`, default 32px, plus the `,(0,S.jsx)(t.code,{children:`cellPadding`}),` gap), so it needs no sized container`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Fills its container`}),`: Give the chart (or its parent) a height and the rows stretch to fill it, up to `,(0,S.jsx)(t.code,{children:`maxCellHeight`}),`; a smaller height makes it scroll`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Touch-friendly`}),`: Default `,(0,S.jsx)(t.code,{children:`minCellSize: 44`}),` keeps each column at 44px or more (the cell plus its `,(0,S.jsx)(t.code,{children:`cellPadding`}),` gap); the SVG expands and the container scrolls`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Sticky axes`}),`: Row and column labels remain visible while scrolling a large grid`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`RTL support`}),`: Right-to-left layout with the row labels on the right (`,(0,S.jsx)(t.code,{children:`AxisRight`}),`)`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Custom tooltips`}),`: Replace the built-in tooltip with any React node via `,(0,S.jsx)(t.code,{children:`renderTooltip`}),`, for example a period-over-period comparison; it is wrapped in the shared chart tooltip container`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`TypeScript`}),`: Generic `,(0,S.jsx)(t.code,{children:`HeatmapChart<T>`}),` — bring your own data shape with typed accessors`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,S.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,S.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,S.jsx)(t.p,{children:`Displays a metric by row and column category. Null values render as dashed-border "No data" cells.`}),`
`,(0,S.jsx)(a,{of:g,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { HeatmapChart, type ColorBucket } from '@godaddy/antares';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const HOURS = ['6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'];

const SEED_VALUES: Record<string, number> = {
  'Monday-6am': 12,
  'Monday-8am': 180,
  'Monday-10am': 340,
  'Monday-12pm': 290,
  'Monday-2pm': 310,
  'Monday-4pm': 270,
  'Monday-6pm': 220,
  'Monday-8pm': 90,
  'Monday-10pm': 30,
  'Tuesday-6am': 18,
  'Tuesday-8am': 200,
  'Tuesday-10am': 380,
  'Tuesday-12pm': 310,
  'Tuesday-2pm': 360,
  'Tuesday-4pm': 290,
  'Tuesday-6pm': 240,
  'Tuesday-8pm': 100,
  'Tuesday-10pm': 35,
  'Wednesday-6am': 22,
  'Wednesday-8am': 190,
  'Wednesday-10am': 370,
  'Wednesday-12pm': 320,
  'Wednesday-2pm': 350,
  'Wednesday-4pm': 300,
  'Wednesday-6pm': 230,
  'Wednesday-8pm': 80,
  'Wednesday-10pm': 28,
  'Thursday-6am': 15,
  'Thursday-8am': 210,
  'Thursday-10am': 400,
  'Thursday-12pm': 350,
  'Thursday-2pm': 380,
  'Thursday-4pm': 310,
  'Thursday-6pm': 250,
  'Thursday-8pm': 120,
  'Thursday-10pm': 40,
  'Friday-6am': 20,
  'Friday-8am': 230,
  'Friday-10am': 420,
  'Friday-12pm': 370,
  'Friday-2pm': 410,
  'Friday-4pm': 330,
  'Friday-6pm': 300,
  'Friday-8pm': 160,
  'Friday-10pm': 60,
  'Saturday-6am': 5,
  'Saturday-8am': 80,
  'Saturday-10am': 200,
  'Saturday-12pm': 260,
  'Saturday-2pm': 280,
  'Saturday-4pm': 240,
  'Saturday-6pm': 220,
  'Saturday-8pm': 180,
  'Saturday-10pm': 90,
  'Sunday-6am': 4,
  'Sunday-8am': 60,
  'Sunday-10am': 150,
  'Sunday-12pm': 210,
  'Sunday-2pm': 230,
  'Sunday-4pm': 200,
  'Sunday-6pm': 180,
  'Sunday-8pm': 140,
  'Sunday-10pm': 70
};

const data = DAYS.flatMap((day) =>
  HOURS.map((hour) => ({
    x: hour,
    y: day,
    value: SEED_VALUES[\`\${day}-\${hour}\`] ?? null
  }))
);

const COLOR_BUCKETS: ColorBucket[] = [
  { min: 0, max: 50, color: '#dbeafe', label: '0–50' },
  { min: 50, max: 150, color: '#93c5fd', label: '50–150' },
  { min: 150, max: 300, color: '#3b82f6', label: '150–300' },
  { min: 300, max: 400, color: '#1d4ed8', label: '300–400' },
  { min: 400, max: null, color: '#1e3a8a', label: '400+' }
];

export function DefaultExample(props: any) {
  return (
    <HeatmapChart
      data={data}
      colorBuckets={COLOR_BUCKETS}
      colorLegendLabel="Visitors"
      aria-label="Heatmap of visitor counts by day and hour"
      {...props}
    />
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`wrap-content`,children:`Wrap content`}),`
`,(0,S.jsxs)(t.p,{children:[`With no `,(0,S.jsx)(t.code,{children:`height`}),`, the chart is as tall as its rows: each row is `,(0,S.jsx)(t.code,{children:`minCellHeight`}),` (32px by default) plus
the gap, with the axis and legend below. No sized container is needed, and the chart grows or shrinks
as rows are added or removed.`]}),`
`,(0,S.jsx)(a,{of:p,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { HeatmapChart, type ColorBucket } from '@godaddy/antares';

const DAYS = [
  'Mon, Oct 19',
  'Tues, Oct 20',
  'Wed, Oct 21',
  'Thurs, Oct 22',
  'Fri, Oct 23',
  'Sat, Oct 24',
  'Sun, Oct 25'
];
const HOURS = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

const COLOR_BUCKETS: ColorBucket[] = [
  { min: 0, max: 50, color: '#d8efef', label: '1–50' },
  { min: 50, max: 100, color: '#94d7da', label: '50–100' },
  { min: 100, max: 150, color: '#15a4ab', label: '100–150' },
  { min: 150, max: 200, color: '#0e7078', label: '150–200' },
  { min: 200, max: null, color: '#063b43', label: '200+' }
];

function buildData(days: string[]) {
  return days.flatMap(function mapDay(day, dayIndex) {
    return HOURS.map(function mapHour(hour, hourIndex) {
      return { x: hour, y: day, value: (dayIndex * 37 + hourIndex * 29) % 240 };
    });
  });
}

export function WrapContentExample(props: any) {
  return (
    <HeatmapChart
      data={buildData(DAYS)}
      colorBuckets={COLOR_BUCKETS}
      colorLegendLabel="Avg. Transactions"
      closedLabel="No Activity (0)"
      aria-label="Heatmap sized from its rows"
      {...props}
    />
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`fixed-height`,children:`Fixed height`}),`
`,(0,S.jsxs)(t.p,{children:[`With a `,(0,S.jsx)(t.code,{children:`height`}),`, the rows stretch to fill it (here 460px for 7 rows). `,(0,S.jsx)(t.code,{children:`height`}),` is the total, including
the axis and legend. When it is smaller than the rows need at `,(0,S.jsx)(t.code,{children:`minCellHeight`}),`, the chart scrolls
vertically instead of squashing the rows; see the `,(0,S.jsx)(t.em,{children:`Scrolling`}),` example.`]}),`
`,(0,S.jsx)(a,{of:f,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { HeatmapChart, type ColorBucket } from '@godaddy/antares';

const DAYS = [
  'Mon, Oct 19',
  'Tues, Oct 20',
  'Wed, Oct 21',
  'Thurs, Oct 22',
  'Fri, Oct 23',
  'Sat, Oct 24',
  'Sun, Oct 25'
];
const HOURS = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

const COLOR_BUCKETS: ColorBucket[] = [
  { min: 0, max: 50, color: '#d8efef', label: '1–50' },
  { min: 50, max: 100, color: '#94d7da', label: '50–100' },
  { min: 100, max: 150, color: '#15a4ab', label: '100–150' },
  { min: 150, max: 200, color: '#0e7078', label: '150–200' },
  { min: 200, max: null, color: '#063b43', label: '200+' }
];

function buildData(days: string[]) {
  return days.flatMap(function mapDay(day, dayIndex) {
    return HOURS.map(function mapHour(hour, hourIndex) {
      return { x: hour, y: day, value: (dayIndex * 37 + hourIndex * 29) % 240 };
    });
  });
}

export function FixedHeightExample(props: any) {
  return (
    <HeatmapChart
      data={buildData(DAYS)}
      colorBuckets={COLOR_BUCKETS}
      colorLegendLabel="Avg. Transactions"
      height={460}
      aria-label="Heatmap filling a fixed height"
      {...props}
    />
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`scrolling`,children:`Scrolling`}),`
`,(0,S.jsxs)(t.p,{children:[`When the `,(0,S.jsx)(t.code,{children:`height`}),` is too small for every row at `,(0,S.jsx)(t.code,{children:`minCellHeight`}),`, rows stop shrinking at that size and
the chart scrolls vertically. The axis labels stay pinned while the rows scroll under them.`]}),`
`,(0,S.jsx)(a,{of:_,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { HeatmapChart, type ColorBucket } from '@godaddy/antares';

const DAYS = [
  'Mon, Oct 19',
  'Tues, Oct 20',
  'Wed, Oct 21',
  'Thurs, Oct 22',
  'Fri, Oct 23',
  'Sat, Oct 24',
  'Sun, Oct 25'
];
const HOURS = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

const COLOR_BUCKETS: ColorBucket[] = [
  { min: 0, max: 50, color: '#d8efef', label: '1–50' },
  { min: 50, max: 100, color: '#94d7da', label: '50–100' },
  { min: 100, max: 150, color: '#15a4ab', label: '100–150' },
  { min: 150, max: 200, color: '#0e7078', label: '150–200' },
  { min: 200, max: null, color: '#063b43', label: '200+' }
];

function buildData(days: string[]) {
  return days.flatMap(function mapDay(day, dayIndex) {
    return HOURS.map(function mapHour(hour, hourIndex) {
      return { x: hour, y: day, value: (dayIndex * 37 + hourIndex * 29) % 240 };
    });
  });
}

export function ScrollingExample(props: any) {
  return (
    <HeatmapChart
      data={buildData(DAYS)}
      colorBuckets={COLOR_BUCKETS}
      colorLegendLabel="Avg. Transactions"
      height={220}
      aria-label="Heatmap that scrolls because the height is too small for every row"
      {...props}
    />
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`maximum-cell-height`,children:`Maximum cell height`}),`
`,(0,S.jsxs)(t.p,{children:[(0,S.jsx)(t.code,{children:`maxCellHeight`}),` stops rows stretching when the chart has more height than it needs. Here a single row
in a 420px chart stays 48px tall instead of filling the space, and the axis and legend follow it.
`,(0,S.jsx)(t.code,{children:`align`}),` decides where the chart sits in the leftover space; the default `,(0,S.jsx)(t.code,{children:`start`}),` keeps it at the top.`]}),`
`,(0,S.jsx)(a,{of:l,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { HeatmapChart, type ColorBucket } from '@godaddy/antares';

const DAYS = [
  'Mon, Oct 19',
  'Tues, Oct 20',
  'Wed, Oct 21',
  'Thurs, Oct 22',
  'Fri, Oct 23',
  'Sat, Oct 24',
  'Sun, Oct 25'
];
const HOURS = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

const COLOR_BUCKETS: ColorBucket[] = [
  { min: 0, max: 50, color: '#d8efef', label: '1–50' },
  { min: 50, max: 100, color: '#94d7da', label: '50–100' },
  { min: 100, max: 150, color: '#15a4ab', label: '100–150' },
  { min: 150, max: 200, color: '#0e7078', label: '150–200' },
  { min: 200, max: null, color: '#063b43', label: '200+' }
];

function buildData(days: string[]) {
  return days.flatMap(function mapDay(day, dayIndex) {
    return HOURS.map(function mapHour(hour, hourIndex) {
      return { x: hour, y: day, value: (dayIndex * 37 + hourIndex * 29) % 240 };
    });
  });
}

export function MaxCellHeightExample(props: any) {
  return (
    <HeatmapChart
      data={buildData(DAYS.slice(0, 1))}
      colorBuckets={COLOR_BUCKETS}
      colorLegendLabel="Avg. Transactions"
      height={420}
      maxCellHeight={48}
      aria-label="Single-row heatmap with a maximum cell height"
      {...props}
    />
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`single-row`,children:`Single row`}),`
`,(0,S.jsxs)(t.p,{children:[`A single row with no `,(0,S.jsx)(t.code,{children:`height`}),` is exactly one row tall. Add `,(0,S.jsx)(t.code,{children:`height`}),` without `,(0,S.jsx)(t.code,{children:`maxCellHeight`}),` and the
row would stretch to fill it; see the `,(0,S.jsx)(t.em,{children:`Maximum cell height`}),` example to stop that.`]}),`
`,(0,S.jsx)(a,{of:u,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { HeatmapChart, type ColorBucket } from '@godaddy/antares';

const DAYS = [
  'Mon, Oct 19',
  'Tues, Oct 20',
  'Wed, Oct 21',
  'Thurs, Oct 22',
  'Fri, Oct 23',
  'Sat, Oct 24',
  'Sun, Oct 25'
];
const HOURS = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

const COLOR_BUCKETS: ColorBucket[] = [
  { min: 0, max: 50, color: '#d8efef', label: '1–50' },
  { min: 50, max: 100, color: '#94d7da', label: '50–100' },
  { min: 100, max: 150, color: '#15a4ab', label: '100–150' },
  { min: 150, max: 200, color: '#0e7078', label: '150–200' },
  { min: 200, max: null, color: '#063b43', label: '200+' }
];

function buildData(days: string[]) {
  return days.flatMap(function mapDay(day, dayIndex) {
    return HOURS.map(function mapHour(hour, hourIndex) {
      return { x: hour, y: day, value: (dayIndex * 37 + hourIndex * 29) % 240 };
    });
  });
}

export function SingleRowExample(props: any) {
  return (
    <HeatmapChart
      data={buildData(DAYS.slice(0, 1))}
      colorBuckets={COLOR_BUCKETS}
      colorLegendLabel="Avg. Transactions"
      aria-label="Single-row heatmap sized from its row"
      {...props}
    />
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`custom-tooltip`,children:`Custom tooltip`}),`
`,(0,S.jsxs)(t.p,{children:[`A `,(0,S.jsx)(t.code,{children:`renderTooltip`}),` example styled as a period-over-period comparison card. The previous value is
carried on the datum and read back in the tooltip, so the chart itself needs no comparison props.`]}),`
`,(0,S.jsx)(a,{of:m,inline:!0}),`
`,(0,S.jsx)(i,{code:`import {
  Box,
  Flex,
  HeatmapChart,
  type HeatmapChartProps,
  type HeatmapTooltipRenderProps,
  type ColorBucket,
  Text
} from '@godaddy/antares';

interface VisitorDatum {
  day: string;
  hour: string;
  visitors: number | null;
  prevVisitors: number | null;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const HOURS = ['8am', '10am', '12pm', '2pm', '4pm', '6pm'];

const BASE: Record<string, [number, number]> = {
  'Monday-8am': [180, 155],
  'Monday-10am': [340, 300],
  'Monday-12pm': [290, 280],
  'Monday-2pm': [310, 270],
  'Monday-4pm': [270, 290],
  'Monday-6pm': [220, 200],
  'Tuesday-8am': [200, 170],
  'Tuesday-10am': [380, 340],
  'Tuesday-12pm': [310, 295],
  'Tuesday-2pm': [360, 320],
  'Tuesday-4pm': [290, 310],
  'Tuesday-6pm': [240, 215],
  'Wednesday-8am': [190, 160],
  'Wednesday-10am': [370, 330],
  'Wednesday-12pm': [320, 305],
  'Wednesday-2pm': [350, 310],
  'Wednesday-4pm': [300, 280],
  'Wednesday-6pm': [230, 210],
  'Thursday-8am': [210, 185],
  'Thursday-10am': [400, 360],
  'Thursday-12pm': [350, 330],
  'Thursday-2pm': [380, 350],
  'Thursday-4pm': [310, 295],
  'Thursday-6pm': [250, 230],
  'Friday-8am': [230, 200],
  'Friday-10am': [420, 380],
  'Friday-12pm': [370, 345],
  'Friday-2pm': [410, 380],
  'Friday-4pm': [330, 300],
  'Friday-6pm': [300, 265]
};

const data: VisitorDatum[] = DAYS.flatMap(function mapDay(day) {
  return HOURS.map(function mapHour(hour) {
    const vals = BASE[\`\${day}-\${hour}\`];
    return {
      day,
      hour,
      visitors: vals ? vals[0] : null,
      prevVisitors: vals ? vals[1] : null
    };
  });
});

const COLOR_BUCKETS: ColorBucket[] = [
  { min: 0, max: 100, color: '#dcfce7', label: '0–100' },
  { min: 100, max: 200, color: '#86efac', label: '100–200' },
  { min: 200, max: 300, color: '#22c55e', label: '200–300' },
  { min: 300, max: 400, color: '#15803d', label: '300–400' },
  { min: 400, max: null, color: '#14532d', label: '400+' }
];

/**
 * Period-over-period tooltip built from \`renderTooltip\`. The previous period's value rides along on
 * each datum, so the tooltip can show both values and the percent change for the hovered cell.
 */
function renderComparisonTooltip({ datum, bucket, x, y }: HeatmapTooltipRenderProps<VisitorDatum>) {
  if (!datum || datum.visitors === null || datum.prevVisitors === null) {
    return null;
  }

  const change = datum.prevVisitors === 0 ? 0 : ((datum.visitors - datum.prevVisitors) / datum.prevVisitors) * 100;
  const isUp = change >= 0;

  return (
    <Flex direction="column" gap="lg" style={{ minWidth: 260 }}>
      <Flex justifyContent="space-between" alignItems="center" gap="2xl">
        <Flex alignItems="center" gap="md">
          <Box rounding="full" style={{ width: 12, height: 12, backgroundColor: bucket?.color }} />
          <Text>{\`\${String(y)} · \${String(x)}\`}</Text>
        </Flex>
        <Text>{datum.visitors.toLocaleString()}</Text>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center" gap="2xl">
        <Flex alignItems="center" gap="md">
          <Box
            rounding="full"
            style={{
              width: 12,
              height: 12,
              border: \`2px solid \${bucket?.color}\`,
              boxSizing: 'border-box'
            }}
          />
          <Text>Previous period</Text>
        </Flex>
        <Text>{datum.prevVisitors.toLocaleString()}</Text>
      </Flex>

      <Flex alignItems="center" gap="sm">
        <Text style={{ color: isUp ? '#2f9e44' : '#e03131' }}>{isUp ? '↑' : '↓'}</Text>
        <Text style={{ fontWeight: 'bolder' }}>{\`\${Math.abs(change).toFixed(0)}%\`}</Text>
        <Text style={{ color: '#868e96' }}>compared to previous period</Text>
      </Flex>
    </Flex>
  );
}

export function CustomTooltipPeriodComparisonExample(props: Partial<HeatmapChartProps<VisitorDatum>>) {
  return (
    <HeatmapChart<VisitorDatum>
      data={data}
      xAccessor={(d) => d.hour}
      yAccessor={(d) => d.day}
      valueAccessor={(d) => d.visitors}
      colorBuckets={COLOR_BUCKETS}
      colorLegendLabel="Visitors"
      renderTooltip={renderComparisonTooltip}
      aria-label="Heatmap comparing current and previous period visitor counts"
      {...props}
    />
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`custom-buckets`,children:`Custom Buckets`}),`
`,(0,S.jsx)(t.p,{children:`Custom color buckets for a satisfaction-score theme: red for low scores, yellow for medium,
greens for high. Null cells represent regions where data was unavailable.`}),`
`,(0,S.jsx)(a,{of:v,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { HeatmapChart, type ColorBucket } from '@godaddy/antares';

const PRODUCTS = ['Widget A', 'Widget B', 'Widget C', 'Widget D'];
const REGIONS = ['North', 'South', 'East', 'West', 'Central'];

const RAW: Record<string, number | null> = {
  'Widget A-North': 92,
  'Widget A-South': 74,
  'Widget A-East': 88,
  'Widget A-West': 61,
  'Widget A-Central': 95,
  'Widget B-North': 45,
  'Widget B-South': 38,
  'Widget B-East': 51,
  'Widget B-West': null,
  'Widget B-Central': 42,
  'Widget C-North': 78,
  'Widget C-South': 85,
  'Widget C-East': 66,
  'Widget C-West': 79,
  'Widget C-Central': 82,
  'Widget D-North': null,
  'Widget D-South': 55,
  'Widget D-East': 62,
  'Widget D-West': 48,
  'Widget D-Central': null
};

const data = PRODUCTS.flatMap((product) =>
  REGIONS.map((region) => ({
    x: region,
    y: product,
    value: RAW[\`\${product}-\${region}\`] ?? null
  }))
);

const SCORE_BUCKETS: ColorBucket[] = [
  { min: 0, max: 40, color: '#fca5a5', label: '< 40' },
  { min: 40, max: 60, color: '#fcd34d', label: '40–60' },
  { min: 60, max: 80, color: '#86efac', label: '60–80' },
  { min: 80, max: null, color: '#16a34a', label: '80+' }
];

export function CustomBucketsExample(props: any) {
  return (
    <HeatmapChart
      data={data}
      colorBuckets={SCORE_BUCKETS}
      colorLegendLabel="Score"
      closedLabel="N/A"
      tooltipValueFormatter={(d: { x: string; y: string; value: number | null }) =>
        d.value !== null ? \`\${d.value}/100\` : ''
      }
      aria-label="Heatmap of customer satisfaction scores"
      {...props}
    />
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h2,{id:`quick-start`,children:`Quick start`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-tsx`,children:`import { HeatmapChart, type ColorBucket } from '@godaddy/antares';

const data = [
  { x: '8am', y: 'Monday', value: 180 },
  { x: '12pm', y: 'Monday', value: null },   // renders as closed cell
  // …
];

const buckets: ColorBucket[] = [
  { min: 0, max: 100, color: '#dbeafe', label: '0–100' },
  { min: 100, max: 300, color: '#3b82f6', label: '100–300' },
  { min: 300, max: null, color: '#1e3a8a', label: '300+' },
];

<HeatmapChart
  data={data}
  colorBuckets={buckets}
  colorLegendLabel="Visitors"
  closedLabel="No activity"
  aria-label="Heatmap of visitor counts"
/>
`})}),`
`,(0,S.jsx)(t.h2,{id:`custom-data-shape`,children:`Custom data shape`}),`
`,(0,S.jsxs)(t.p,{children:[`When your data type is not `,(0,S.jsx)(t.code,{children:`HeatmapCell`}),`, provide typed accessors:`]}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-tsx`,children:`interface MyDatum {
  hour: string;
  day: string;
  count: number | null;
  prevCount: number | null; // extra fields are available in \`renderTooltip\`
}

<HeatmapChart<MyDatum>
  data={myData}
  xAccessor={(d) => d.hour}
  yAccessor={(d) => d.day}
  valueAccessor={(d) => d.count}
  colorBuckets={buckets}
/>
`})}),`
`,(0,S.jsx)(t.h2,{id:`sizing`,children:`Sizing`}),`
`,(0,S.jsx)(t.p,{children:`Cell width fills the available width. Row height has two modes, depending on whether the chart is given a height.`}),`
`,(0,S.jsxs)(t.p,{children:[(0,S.jsx)(t.strong,{children:`Wrap content`}),` (no `,(0,S.jsx)(t.code,{children:`height`}),`, and the parent has none): the chart is as tall as its rows. Each row is `,(0,S.jsx)(t.code,{children:`minCellHeight`}),` (default `,(0,S.jsx)(t.code,{children:`32`}),`) plus the `,(0,S.jsx)(t.code,{children:`cellPadding`}),` gap, with the axis and legend below. It needs no sized container, and it grows or shrinks as rows are added or removed.`]}),`
`,(0,S.jsxs)(t.p,{children:[(0,S.jsx)(t.strong,{children:`Fixed height`}),` (the `,(0,S.jsx)(t.code,{children:`height`}),` prop, or a parent with a height): `,(0,S.jsx)(t.code,{children:`height`}),` is the total, including the axis and legend.`]}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsx)(t.li,{children:`Rows stretch equally to fill the height.`}),`
`,(0,S.jsxs)(t.li,{children:[`Rows never go below `,(0,S.jsx)(t.code,{children:`minCellHeight`}),`. When they do not fit, the chart scrolls vertically and the axis labels stay pinned.`]}),`
`,(0,S.jsxs)(t.li,{children:[`Set `,(0,S.jsx)(t.code,{children:`maxCellHeight`}),` to stop rows stretching past a size, for example a single row in a tall chart. The chart then ends after the last row, and the leftover space sits below it.`]}),`
`]}),`
`,(0,S.jsxs)(t.table,{children:[(0,S.jsx)(t.thead,{children:(0,S.jsxs)(t.tr,{children:[(0,S.jsx)(t.th,{children:`Setup`}),(0,S.jsx)(t.th,{children:`Result`})]})}),(0,S.jsxs)(t.tbody,{children:[(0,S.jsxs)(t.tr,{children:[(0,S.jsx)(t.td,{children:`No height`}),(0,S.jsxs)(t.td,{children:[`Rows at `,(0,S.jsx)(t.code,{children:`minCellHeight`}),`; chart is as tall as its rows`]})]}),(0,S.jsxs)(t.tr,{children:[(0,S.jsx)(t.td,{children:`Height larger than the rows need`}),(0,S.jsxs)(t.td,{children:[`Rows grow to fill it, up to `,(0,S.jsx)(t.code,{children:`maxCellHeight`})]})]}),(0,S.jsxs)(t.tr,{children:[(0,S.jsx)(t.td,{children:`Height smaller than the rows need`}),(0,S.jsxs)(t.td,{children:[`Rows stay at `,(0,S.jsx)(t.code,{children:`minCellHeight`}),`; the chart scrolls`]})]})]})]}),`
`,(0,S.jsxs)(t.p,{children:[`When `,(0,S.jsx)(t.code,{children:`maxCellHeight`}),` leaves the chart shorter than its box, `,(0,S.jsx)(t.code,{children:`align`}),` chooses where it sits: `,(0,S.jsx)(t.code,{children:`start`}),` (default) keeps it at the top, `,(0,S.jsx)(t.code,{children:`end`}),` moves it to the bottom, and `,(0,S.jsx)(t.code,{children:`center`}),` splits the space. It has no effect when the rows fill the height.`]}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-tsx`,children:`// Wrap content: 32px rows, as tall as needed
<HeatmapChart data={data} colorBuckets={buckets} />

// Fixed height: rows fill 420px, or scroll if they do not fit
<HeatmapChart data={data} colorBuckets={buckets} height={420} />

// Rows grow to fill the height but never past 48px
<HeatmapChart data={data} colorBuckets={buckets} height={420} maxCellHeight={48} />
`})}),`
`,(0,S.jsx)(t.h2,{id:`color-buckets`,children:`Color buckets`}),`
`,(0,S.jsxs)(t.p,{children:[(0,S.jsx)(t.code,{children:`colorBuckets`}),` is an ordered array of `,(0,S.jsx)(t.code,{children:`ColorBucket`}),` values. Each cell's fill is resolved by scanning the list and returning the first bucket where `,(0,S.jsx)(t.code,{children:`value < bucket.max`}),`. The last bucket should have `,(0,S.jsx)(t.code,{children:`max: null`}),` (open-ended); a value above every `,(0,S.jsx)(t.code,{children:`max`}),` also uses the last bucket. `,(0,S.jsx)(t.code,{children:`min`}),` is informational and is not used for matching, so list the buckets in ascending order:`]}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-ts`,children:`interface ColorBucket {
  min: number;        // lower bound (informational, not used for matching)
  max: number | null; // upper bound (exclusive); null = open-ended top bucket
  color: string;      // any CSS color string
  label: string;      // shown in the legend, e.g. "100–300" or "300+"
}
`})}),`
`,(0,S.jsx)(t.h2,{id:`closed-cells`,children:`Closed cells`}),`
`,(0,S.jsxs)(t.p,{children:[`A cell with no value renders as a dashed-border rectangle with no fill. That covers `,(0,S.jsx)(t.code,{children:`null`}),`, `,(0,S.jsx)(t.code,{children:`undefined`}),` and `,(0,S.jsx)(t.code,{children:`NaN`}),` values, a row and column with no datum, and an empty `,(0,S.jsx)(t.code,{children:`colorBuckets`}),` list. Its aria role is `,(0,S.jsx)(t.code,{children:`presentation`}),` and it is removed from pointer and keyboard events. Use `,(0,S.jsx)(t.code,{children:`closedLabel`}),` to customize its legend entry (default: `,(0,S.jsx)(t.code,{children:`"No data"`}),`).`]}),`
`,(0,S.jsx)(t.h2,{id:`titles-and-descriptions`,children:`Titles and descriptions`}),`
`,(0,S.jsx)(t.p,{children:`The chart renders only the grid, axes and legend. Render titles, subtitles and date ranges in your own layout around it.`}),`
`,(0,S.jsx)(t.h2,{id:`legend`,children:`Legend`}),`
`,(0,S.jsx)(t.p,{children:`The legend is centered below the chart, like the other chart types. Override its text per use case:`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`colorLegendLabel`}),`: leading label (omitted when not set)`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`closedLabel`}),`: entry for null cells (default `,(0,S.jsx)(t.code,{children:`"No data"`}),`)`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`label`}),` on each `,(0,S.jsx)(t.code,{children:`ColorBucket`}),`: one entry per bucket`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`tooltip`,children:`Tooltip`}),`
`,(0,S.jsxs)(t.p,{children:[`The built-in tooltip is the same one the bar chart uses, with its arrow. It shows one row for the hovered cell: a swatch in the cell's bucket color, `,(0,S.jsx)(t.code,{children:`{row} · {column}`}),`, and the value (for example `,(0,S.jsx)(t.code,{children:`● Monday · 12pm   380`}),`).`]}),`
`,(0,S.jsxs)(t.p,{children:[`Use `,(0,S.jsx)(t.code,{children:`tooltipValueFormatter`}),` to format the value, such as adding a unit:`]}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-tsx`,children:"<HeatmapChart tooltipValueFormatter={(d) => `${d.value} visitors`} /* … */ />\n"})}),`
`,(0,S.jsxs)(t.p,{children:[`For anything else, such as a title or a period-over-period comparison, use `,(0,S.jsx)(t.code,{children:`renderTooltip`}),`. It receives the hovered `,(0,S.jsx)(t.code,{children:`datum`}),`, so any extra field on your data (like a previous value) is available. Custom content is wrapped in the shared tooltip container and, like the other charts, has no arrow:`]}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-tsx`,children:`<HeatmapChart<MyDatum>
  renderTooltip={({ datum, x, y, bucket }) => (
    <div>
      <strong>{String(y)} · {String(x)}</strong>
      <p>{datum?.count ?? 'No data'} (was {datum?.prevCount})</p>
    </div>
  )}
  // …
/>
`})}),`
`,(0,S.jsxs)(t.p,{children:[`See the `,(0,S.jsx)(t.em,{children:`Custom tooltip`}),` example for a full comparison card.`]}),`
`,(0,S.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[`The `,(0,S.jsx)(t.code,{children:`<svg>`}),` element gets `,(0,S.jsx)(t.code,{children:`role="img"`}),` and the `,(0,S.jsx)(t.code,{children:`aria-label`}),` prop`]}),`
`,(0,S.jsxs)(t.li,{children:[`Add `,(0,S.jsx)(t.code,{children:`desc`}),` for a longer screen-reader description: a `,(0,S.jsx)(t.code,{children:`<desc>`}),` element with a unique id is injected and `,(0,S.jsx)(t.code,{children:`aria-describedby`}),` points to it`]}),`
`,(0,S.jsxs)(t.li,{children:[`Each colored cell has `,(0,S.jsx)(t.code,{children:`role="img"`}),` and an `,(0,S.jsx)(t.code,{children:`aria-label`}),` of `,(0,S.jsx)(t.code,{children:`"{row}, {column}: {value}"`})]}),`
`,(0,S.jsxs)(t.li,{children:[`The legend is a `,(0,S.jsx)(t.code,{children:`role="list"`}),` labelled by `,(0,S.jsx)(t.code,{children:`colorLegendLabel`}),`, falling back to `,(0,S.jsx)(t.code,{children:`"Heatmap legend"`})]}),`
`,(0,S.jsx)(t.li,{children:`Focusing a cell with the keyboard shows its tooltip`}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,S.jsx)(o,{of:h})]})}function x(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(b,{...e})}):b(e)}var S;function C(){return(C=e((()=>{S=t(),n(),c(),d()})))()}C();export{x as default};
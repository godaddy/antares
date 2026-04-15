'use client';
import { BarChart } from '#components/chart/bar-chart';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { BarChartCustomDomainExample } from './examples/custom-domain.tsx';
import { BarChartFormattedTickMarksExample } from './examples/formatted-tick-marks.tsx';
import { BarChartHorizontalMultiSeriesExample } from './examples/horizontal-multi-series.tsx';
import { BarChartHorizontalSingleSeriesExample } from './examples/horizontal-single-series.tsx';
import { BarChartMultiSeriesExample } from './examples/multi-series.tsx';
import { BarChartRTLHorizontalMultiSeriesExample } from './examples/rtl-horizontal-multi-series.tsx';
import { BarChartRTLMultiSeriesExample } from './examples/rtl-multi-series.tsx';
import { BarChartExample } from './examples/single-series.tsx';

export default getMeta({
  title: 'Antares/Components/chart/BarChart',
  decorators: [
    (Story: React.FC) => (
      <div
        style={{
          width: '100%',
          height: '80vh'
        }}
      >
        <Story />
      </div>
    )
  ]
});

export const Props = getComponentDocs(BarChart);

export const SingleSeries = getStory(BarChartExample);

export const MultiSeries = getStory(BarChartMultiSeriesExample);

export const HorizontalSingleSeries = getStory(BarChartHorizontalSingleSeriesExample);

export const HorizontalMultiSeries = getStory(BarChartHorizontalMultiSeriesExample);

export const RTLHorizontalMultiSeries = getStory(BarChartRTLHorizontalMultiSeriesExample);

export const RTLMultiSeries = getStory(BarChartRTLMultiSeriesExample);

export const CustomDomain = getStory(BarChartCustomDomainExample);

export const FormattedTickMarks = getStory(BarChartFormattedTickMarksExample);

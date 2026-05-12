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
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/bar-chart-playground.tsx';

export default getMeta({
  title: 'components/Chart/BarChart',
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

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    orientation: 'vertical',
    numSeries: 2,
    xAxisTitle: 'Date',
    yAxisTitle: 'Temperature (°F)',
    xLabels: true,
    yLabels: true,
    xLabelsOrientation: 'auto',
    xTickMarks: true,
    yTickMarks: true,
    xBaseline: true,
    yBaseline: true,
    xGridlines: true,
    yGridlines: true,
    xNumTicks: undefined,
    yNumTicks: undefined,
    legendPosition: undefined,
    tooltip: true,
    height: 500,
    width: undefined,
    'aria-label': 'Playground bar chart',
    desc: '',
    className: '',
    rtl: false
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: 'Orientation of the bars'
    },
    rtl: { control: 'boolean', description: 'Render in right-to-left layout' },
    numSeries: {
      control: 'radio',
      options: [1, 2, 3],
      description: 'Number of series to render'
    },
    xAxisTitle: { control: 'text', description: 'Title for the X-axis' },
    yAxisTitle: { control: 'text', description: 'Title for the Y-axis' },
    xLabels: { control: 'boolean', description: 'Show X-axis labels' },
    yLabels: { control: 'boolean', description: 'Show Y-axis labels' },
    xLabelsOrientation: {
      control: 'radio',
      options: ['auto', 'horizontal', 'vertical'],
      description: 'X-axis label orientation'
    },
    xTickMarks: { control: 'boolean', description: 'Show X-axis tick marks' },
    yTickMarks: { control: 'boolean', description: 'Show Y-axis tick marks' },
    xBaseline: { control: 'boolean', description: 'Show the X-axis baseline' },
    yBaseline: { control: 'boolean', description: 'Show the Y-axis baseline' },
    xGridlines: { control: 'boolean', description: 'Show vertical gridlines' },
    yGridlines: { control: 'boolean', description: 'Show horizontal gridlines' },
    xNumTicks: {
      control: { type: 'number', min: 0, max: 20, step: 1 },
      description: 'Approximate number of X-axis ticks'
    },
    yNumTicks: {
      control: { type: 'number', min: 0, max: 20, step: 1 },
      description: 'Approximate number of Y-axis ticks'
    },
    xDomain: { control: 'object', description: 'Custom X-axis domain (categories or [min, max])' },
    yDomain: { control: 'object', description: 'Custom Y-axis domain ([min, max] or categories)' },
    legendPosition: {
      control: 'radio',
      options: [undefined, 'top', 'bottom', null],
      description: 'Legend position (null to hide)'
    },
    tooltip: { control: 'boolean', description: 'Show the tooltip popover on hover' },
    height: {
      control: { type: 'range', min: 200, max: 900, step: 50 },
      description: 'Height of the chart in pixels'
    },
    width: {
      control: { type: 'number', min: 100, max: 2000, step: 50 },
      description: 'Width of the chart in pixels (omit for 100%)'
    },
    'aria-label': { control: 'text', description: 'Accessibility label for the chart' },
    desc: { control: 'text', description: 'Detailed description for screen readers' },
    className: { control: 'text', description: 'Additional CSS class name' }
  }
};

'use client';
import { LineChart } from '#components/chart/line-chart';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { BandPaddingExample } from './examples/band-padding.tsx';
import { BaselinesExample } from './examples/baselines.tsx';
import { BitcoinPriceExample } from './examples/bitcoin-price.tsx';
import { BrowserUsageExample } from './examples/browser-usage.tsx';
import { CityTemperatureExample } from './examples/city-temperature.tsx';
import { CrosshairOnlyExample } from './examples/crosshair-only.tsx';
import { CustomAccessorsExample } from './examples/custom-accessors.tsx';
import { CustomTicksExample } from './examples/custom-ticks.tsx';
import { CustomTooltipFormattingExample } from './examples/custom-tooltip-formatting.tsx';
import { FixedDomainExample } from './examples/fixed-domain.tsx';
import { FixedSizeExample } from './examples/fixed-size.tsx';
import { FormattingExample } from './examples/formatting.tsx';
import { GridlinesExample } from './examples/gridlines.tsx';
import { LabelsExample } from './examples/labels.tsx';
import { LegendExample } from './examples/legend.tsx';
import { MissingValuesExample } from './examples/missing-values.tsx';
import { MultipleSeriesExample } from './examples/multiple-series.tsx';
import { NiceValuesExample } from './examples/nice-values.tsx';
import { RTLExample } from './examples/rtl.tsx';
import { SingleSeriesExample } from './examples/single-series.tsx';
import { TicksExample } from './examples/ticks.tsx';
import { TitlesExample } from './examples/titles.tsx';
import { TooltipDisabledExample } from './examples/tooltip-disabled.tsx';
import { ZeroIncludedExample } from './examples/zero-included.tsx';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/line-chart-playground.tsx';

export default getMeta({
  title: 'Antares/Components/chart/LineChart'
});

export const Props = getComponentDocs(LineChart);

// Basic
export const SingleSeries = getStory(SingleSeriesExample);

export const MultipleSeries = getStory(MultipleSeriesExample);

// Axis / appearance
export const Gridlines = getStory(GridlinesExample);

export const Titles = getStory(TitlesExample);

export const Labels = getStory(LabelsExample);

export const Ticks = getStory(TicksExample);

export const Baselines = getStory(BaselinesExample);

export const Legend = getStory(LegendExample);

export const Formatting = getStory(FormattingExample);

// Data handling
export const CustomAccessors = getStory(CustomAccessorsExample);

export const MissingValues = getStory(MissingValuesExample);

// Scale configuration
export const FixedDomain = getStory(FixedDomainExample);

export const NiceValues = getStory(NiceValuesExample);

export const ZeroIncluded = getStory(ZeroIncludedExample);

export const CustomTicks = getStory(CustomTicksExample);

export const BandPadding = getStory(BandPaddingExample);

// Interactive
export const TooltipDisabled = getStory(TooltipDisabledExample);

export const CrosshairOnly = getStory(CrosshairOnlyExample);

export const CustomTooltipFormatting = getStory(CustomTooltipFormattingExample);

// Layout
export const FixedSize = getStory(FixedSizeExample);

// Featured
export const BitcoinPrice = getStory(BitcoinPriceExample);

export const CityTemperature = getStory(CityTemperatureExample);

export const BrowserUsage = getStory(BrowserUsageExample);

// RTL
export const RTL = getStory(RTLExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    numSeries: 2,
    xTitle: 'Date',
    yTitle: 'Temperature (°F)',
    xType: 'time',
    yType: 'linear',
    xLabels: true,
    yLabels: true,
    xLabelsOrientation: 'auto',
    xTickMarks: true,
    yTickMarks: true,
    xBaseline: true,
    yBaseline: true,
    xGridlines: true,
    yGridlines: true,
    xNice: true,
    yNice: true,
    xZero: false,
    yZero: false,
    xNumTicks: undefined,
    yNumTicks: undefined,
    xPaddingOuter: undefined,
    yPaddingOuter: undefined,
    legendPosition: undefined,
    tooltip: true,
    showCrosshair: true,
    showDataPoints: true,
    height: 500,
    width: undefined,
    'aria-label': 'Playground line chart',
    desc: '',
    className: '',
    rtl: false
  },
  argTypes: {
    numSeries: {
      control: 'radio',
      options: [1, 2, 3],
      description: 'Number of series to render'
    },
    rtl: { control: 'boolean', description: 'Render in right-to-left layout' },
    xTitle: { control: 'text', description: 'X-axis title' },
    yTitle: { control: 'text', description: 'Y-axis title' },
    xType: {
      control: 'select',
      options: ['linear', 'time', 'band', 'log', 'sqrt', 'pow'],
      description: 'X-axis scale type'
    },
    yType: {
      control: 'select',
      options: ['linear', 'time', 'band', 'log', 'sqrt', 'pow'],
      description: 'Y-axis scale type'
    },
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
    xNice: { control: 'boolean', description: 'Round the X domain to nice values' },
    yNice: { control: 'boolean', description: 'Round the Y domain to nice values' },
    xZero: { control: 'boolean', description: 'Include zero in the X domain' },
    yZero: { control: 'boolean', description: 'Include zero in the Y domain' },
    xNumTicks: {
      control: { type: 'number', min: 0, max: 20, step: 1 },
      description: 'Approximate number of X-axis ticks'
    },
    yNumTicks: {
      control: { type: 'number', min: 0, max: 20, step: 1 },
      description: 'Approximate number of Y-axis ticks'
    },
    xTickValues: { control: 'object', description: 'Explicit X-axis tick values (overrides xNumTicks)' },
    yTickValues: { control: 'object', description: 'Explicit Y-axis tick values (overrides yNumTicks)' },
    xDomain: { control: 'object', description: 'Custom X-axis domain' },
    yDomain: { control: 'object', description: 'Custom Y-axis domain' },
    xPaddingOuter: {
      control: { type: 'number', min: 0, max: 1, step: 0.05 },
      description: 'Outer padding for band/point X scales (0–1)'
    },
    yPaddingOuter: {
      control: { type: 'number', min: 0, max: 1, step: 0.05 },
      description: 'Outer padding for band/point Y scales (0–1)'
    },
    legendPosition: {
      control: 'select',
      options: [undefined, 'top', 'bottom', null],
      description: 'Legend position (null to hide)'
    },
    tooltip: { control: 'boolean', description: 'Show the tooltip popover on hover' },
    showCrosshair: { control: 'boolean', description: 'Show crosshair on hover' },
    showDataPoints: { control: 'boolean', description: 'Show data point glyphs on hover' },
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

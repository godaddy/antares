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
import { SingleSeriesExample } from './examples/single-series.tsx';
import { TicksExample } from './examples/ticks.tsx';
import { TitlesExample } from './examples/titles.tsx';
import { TooltipDisabledExample } from './examples/tooltip-disabled.tsx';
import { ZeroIncludedExample } from './examples/zero-included.tsx';

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

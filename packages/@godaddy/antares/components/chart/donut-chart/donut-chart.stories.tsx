'use client';
import { DonutChart } from '#components/chart/donut-chart';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/donut-chart-playground.tsx';
import { BasicExample } from './examples/basic.tsx';
import { FormatValueExample } from './examples/format-value.tsx';
import { LegendLayoutExample } from './examples/legend-layout.tsx';
import { SingleSliceExample } from './examples/single-slice.tsx';
import { SizesExample } from './examples/sizes.tsx';
import { SmallSlicesExample } from './examples/small-slices.tsx';

export default getMeta({
  title: 'Antares/Components/chart/DonutChart'
});

export const Props = getComponentDocs(DonutChart);

export const Basic = getStory(BasicExample);

export const SingleSlice = getStory(SingleSliceExample);

export const Sizes = getStory(SizesExample);

export const LegendLayout = getStory(LegendLayoutExample);

export const SmallSlices = getStory(SmallSlicesExample);

export const FormatValue = getStory(FormatValueExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    dataPreset: 'four',
    label: '100%',
    subLabel: '',
    size: 'md',
    legendPlacement: 'none',
    legendLabel: 'Legend',
    smallSliceThreshold: 0.05,
    useCurrencyFormat: false,
    'aria-label': 'Donut chart playground'
  },
  argTypes: {
    dataPreset: {
      control: 'select',
      options: ['three', 'four', 'five', 'skewed'],
      description: 'Sample slice data (names and values)'
    },
    label: {
      control: 'text',
      description: 'Primary label in the donut hole'
    },
    subLabel: {
      control: 'text',
      description: 'Secondary label below the primary label (leave empty to hide)'
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Ring thickness and center-label typography'
    },
    legendPlacement: {
      control: 'radio',
      options: ['none', 'horizontal', 'vertical'],
      description: 'Legend position, or none to hide the legend'
    },
    legendLabel: {
      control: 'text',
      description: 'Title shown with the legend when a legend placement is selected'
    },
    smallSliceThreshold: {
      control: { type: 'number', min: 0, max: 1, step: 0.01 },
      description: 'Share of total at or below which slices use combined hover'
    },
    useCurrencyFormat: {
      control: 'boolean',
      description: 'Format slice values as USD in the tooltip'
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible name for the chart'
    },
    width: {
      control: 'text',
      description: 'Width of the chart'
    }
  }
};

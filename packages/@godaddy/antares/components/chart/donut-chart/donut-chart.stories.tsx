'use client';
import { DonutChart } from '#components/chart/donut-chart';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { PlaygroundExample } from './examples/donut-chart-playground.tsx';

export default getMeta({
  title: 'components/Chart/DonutChart'
});

export const Props = getComponentDocs(DonutChart);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    dataPreset: 'four',
    label: '100%',
    subLabel: '',
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
    legendPlacement: {
      control: 'radio',
      options: ['none', 'bottom', 'right'],
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
});

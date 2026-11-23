'use client';
import { DonutChart, DonutChartCenter, DonutChartLegend } from '#components/chart/donut-chart';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { PlaygroundExample } from './examples/donut-chart-playground.tsx';

export default getMeta({
  title: 'components/Chart/DonutChart'
});

export const Props = getComponentDocs(DonutChart);
export const DonutChartCenterProps = getComponentDocs(DonutChartCenter);
export const DonutChartLegendProps = getComponentDocs(DonutChartLegend);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    dataPreset: 'four',
    value: '100%',
    description: '',
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
    value: {
      control: 'text',
      description: 'Primary value in the center of the ring'
    },
    description: {
      control: 'text',
      description: 'Description below the primary value (leave empty to hide)'
    },
    legendPlacement: {
      control: 'radio',
      options: ['none', 'bottom', 'end'],
      description: 'Legend below the ring, at its inline end, or hidden'
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

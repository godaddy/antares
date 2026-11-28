'use client';
import { GaugeChart, GaugeChartCenter, GaugeChartRange } from '#components/chart/gauge-chart';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { PlaygroundExample } from './examples/gauge-chart-playground.tsx';

export default getMeta({
  title: 'components/Chart/GaugeChart'
});

export const Props = getComponentDocs(GaugeChart);
export const GaugeChartCenterProps = getComponentDocs(GaugeChartCenter);
export const GaugeChartRangeProps = getComponentDocs(GaugeChartRange);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    label: '50%',
    description: 'Description',
    rangeMin: '0',
    rangeMax: '100',
    labelType: 'value',
    variant: 'default',
    value: 50,
    width: '80%'
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Value shown inside the arc'
    },
    description: {
      control: 'text',
      description: 'Description below the value (leave empty to hide)'
    },
    valueLabel: {
      control: 'text',
      description: 'Accessible text for the value (defaults to the number)'
    },
    rangeMin: {
      control: 'text',
      description: 'Minimum range label'
    },
    rangeMax: {
      control: 'text',
      description: 'Maximum range label'
    },
    labelType: {
      control: 'radio',
      options: ['value', 'text'],
      description: 'Font size of the center value'
    },
    segments: {
      control: 'select',
      options: [undefined, 1, 2, 3, 4, 5],
      description: 'Number of segments (omit for continuous)'
    },
    variant: {
      control: 'radio',
      options: ['default', 'success', 'warning', 'critical'],
      description: 'Status color variant'
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Fill value (0–100 for continuous, 0–segments for segmented)'
    },
    width: {
      control: 'text',
      description: 'CSS width for the gauge container (e.g. "200px", "50%")'
    }
  }
});

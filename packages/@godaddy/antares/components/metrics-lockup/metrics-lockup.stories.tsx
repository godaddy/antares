'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { MetricsLockup } from './src/index.tsx';
import { PlaygroundExample } from './examples/metrics-lockup-playground.tsx';

export default getMeta({
  title: 'components/MetricsLockup'
});

export const Props = getComponentDocs(MetricsLockup);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    title: 'Total Revenue',
    titleInfo: 'Additional information about this metric.',
    data: '$1,234.56',
    description: 'vs. last month',
    compact: false,
    trend: undefined
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Title text displayed above the metric value'
    },
    titleInfo: {
      control: 'text',
      description: 'Tooltip content shown when the info icon is hovered or focused'
    },
    data: {
      control: 'text',
      description: 'The metric value to display'
    },
    description: {
      control: 'text',
      description: 'Descriptive text displayed below the metric value'
    },
    compact: {
      control: 'boolean',
      description: 'Renders the metric value and description inline rather than stacked'
    },
    trend: {
      control: 'select',
      options: [undefined, 'positive', 'negative', 'neutral'],
      description: 'Indicates the direction of change for the metric'
    }
  }
});

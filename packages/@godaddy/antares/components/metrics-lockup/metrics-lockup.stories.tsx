'use client';
import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { MetricsLockup } from './src/index.tsx';
import { DefaultExample } from './examples/default.tsx';
import { WithTrendExample } from './examples/with-trend.tsx';
import { CompactExample } from './examples/compact.tsx';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/metrics-lockup-playground.tsx';

export default getMeta({
  title: 'components/MetricsLockup'
});

export const Props = getComponentDocs(MetricsLockup);

export const Default = getStory(DefaultExample);

export const WithTrend = getStory(WithTrendExample);

export const Compact = getStory(CompactExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
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
};

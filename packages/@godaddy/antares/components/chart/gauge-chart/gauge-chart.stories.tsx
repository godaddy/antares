'use client';
import { GaugeChart } from '#components/chart/gauge-chart';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { ContinuousExample } from './examples/continuous.tsx';
import { BasicExample } from './examples/basic.tsx';
import { LabelTypeExample } from './examples/label-type.tsx';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/gauge-chart-playground.tsx';
import { SegmentedExample } from './examples/segmented.tsx';
import { VariantsExample } from './examples/variants.tsx';
import { WithRangeLabelsExample } from './examples/with-range-labels.tsx';

export default getMeta({
  title: 'Antares/Components/chart/GaugeChart'
});

export const Props = getComponentDocs(GaugeChart);

export const Basic = getStory(BasicExample);

export const Continuous = getStory(ContinuousExample);

export const Segmented = getStory(SegmentedExample);

export const WithRangeLabels = getStory(WithRangeLabelsExample);

export const Variants = getStory(VariantsExample);

export const LabelType = getStory(LabelTypeExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    label: '50%',
    subLabel: 'Sub Label',
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
      description: 'Primary text label displayed inside the gauge'
    },
    subLabel: {
      control: 'text',
      description: 'Descriptive label providing context'
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
      description: 'Controls the font size of the primary label'
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
};

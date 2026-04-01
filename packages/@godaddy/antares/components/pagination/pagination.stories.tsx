'use client';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/pagination-playground.tsx';
import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { DefaultActiveExample } from './examples/default-active.tsx';
import { ControlledExample } from './examples/controlled.tsx';
import { WithLimitExample } from './examples/with-limit.tsx';
import { OnChangeExample } from './examples/on-change.tsx';
import { DefaultExample } from './examples/default.tsx';
import { Pagination } from './src/index.tsx';

export default getMeta({
  title: 'Antares/Components/Pagination'
});

export const Props = getComponentDocs(Pagination);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    total: 10,
    variant: 'dots',
    hideControls: false,
    limit: 1
  },
  argTypes: {
    total: { control: 'number' },
    variant: { control: 'select', options: ['dots', 'none'] },
    hideControls: { control: 'boolean' },
    limit: { control: 'number' }
  }
};

export const Default = getStory(DefaultExample);

export const Controlled = getStory(ControlledExample);

export const WithLimit = getStory(WithLimitExample);

export const OnChange = getStory(OnChangeExample);

export const DefaultActive = getStory(DefaultActiveExample);

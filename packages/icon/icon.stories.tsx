import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { Icon } from './src/index.tsx';
import { Awesome } from './examples/ondemand.tsx';
import { Loader } from './examples/loading.tsx';
import { Example } from './examples/icon.tsx';

export default getMeta({
  title: 'components/Icon',
  component: Icon,
  argTypes: {
    flip: {
      options: ['none', 'horizontal', 'vertical'],
      control: { type: 'radio' }
    },
    rotate: {
      options: [0, 90, 180, 270],
      control: { type: 'radio' }
    },
    mode: {
      options: ['sprite', 'svg'],
      control: { type: 'radio' }
    }
  }
});

export const Props = getComponentDocs(Icon);

export const Demo = getStory(Example, {
  args: {
    width: 48,
    height: 48
  }
});

export const Ondemand = getStory(Awesome, {
  args: {
    icon: 'boxes-stacked',
    width: 24,
    height: 24
  }
});

export const Loading = getStory(Loader, {
  args: {
    fill: 'crimson',
    icon: 'dragon',
    width: 24,
    height: 24
  }
});

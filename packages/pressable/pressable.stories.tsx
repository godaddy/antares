import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { Pressable } from './src/index.tsx';
import { PressableDivExample } from './examples/pressable-div.tsx';
import { PressableLinkExample } from './examples/pressable-link-example.tsx';
import { PressableCustomExample } from './examples/pressable-custom.tsx';

export default getMeta({
  title: 'components/pressable',
  component: Pressable
});

export const Props = getComponentDocs(Pressable);

export const PressableDiv = getStory(PressableDivExample);

export const PressableLink = getStory(PressableLinkExample);

export const PressableCustom = getStory(PressableCustomExample);

import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { VisuallyHidden } from './src/index.tsx';
import { DefaultExample } from './examples/default.tsx';
import { CustomElementExample } from './examples/custom-element.tsx';

export default getMeta({
  title: 'components/VisuallyHidden'
});

export const Props = getComponentDocs(VisuallyHidden);

export const Default = getStory(DefaultExample);

export const CustomElement = getStory(CustomElementExample);

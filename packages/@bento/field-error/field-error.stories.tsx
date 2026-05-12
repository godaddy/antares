import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { FieldError } from './src/index.tsx';
import { DefaultExample } from './examples/default.tsx';

export default getMeta({
  title: 'Bento/components/FieldError'
});

export const Props = getComponentDocs(FieldError);

export const Default = getStory(DefaultExample);

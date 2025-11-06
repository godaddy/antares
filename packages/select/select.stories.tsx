import { getMeta, getComponentDocs, getStory, getVariants } from '@bento/storybook-addon-helpers';
import { Select } from './src/index.tsx';
import { SelectExample } from './examples/select.tsx';
import { SelectControlledExample } from './examples/select-controlled.tsx';

export default getMeta({
  title: 'components/select'
});

export const Props = getComponentDocs(Select);

export const Default = getStory(SelectExample);

export const Controlled = getStory(SelectControlledExample);

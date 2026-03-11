import { getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Example as OverrideClassNameExample } from './examples/override-classname';

export default getMeta({
  title: 'internal/internal-props'
});

export const Demo = getStory(OverrideClassNameExample);

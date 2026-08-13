import { getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { DefaultExample } from './examples/default.tsx';

export default getMeta({ title: 'components/Reuse' });

// Imported for this hand-written story, so `getExamples` must not import it again.
export const Custom = getStory(DefaultExample);

export const examples = getExamples('./examples');

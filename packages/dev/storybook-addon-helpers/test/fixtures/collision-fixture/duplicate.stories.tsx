import { getExamples, getMeta } from '@bento/storybook-addon-helpers';

export default getMeta({ title: 'components/Collision' });

// Its own folder: the shared `./examples` feeds the tests that must not throw.
export const examples = getExamples('./duplicate-examples');

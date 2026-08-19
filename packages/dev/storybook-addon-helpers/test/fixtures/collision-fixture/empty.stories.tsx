import { getExamples, getMeta } from '@bento/storybook-addon-helpers';

export default getMeta({ title: 'components/Empty' });

// Points at a folder that does not exist, so the marker resolves to nothing.
export const examples = getExamples('./no-such-examples');

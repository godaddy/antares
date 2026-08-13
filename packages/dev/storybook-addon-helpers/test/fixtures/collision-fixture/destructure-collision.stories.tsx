import { getExamples, getMeta } from '@bento/storybook-addon-helpers';

export default getMeta({ title: 'components/Collision' });

// Destructured, so the clashing binding is not the declaration's own name.
const { Default } = { Default: 1 };
export { Default as Reused };

export const examples = getExamples('./examples');

import { getExamples, getMeta } from '@bento/storybook-addon-helpers';
import { Default } from './collision-comp.tsx';

// `component` keeps `Default` referenced, so pruning cannot resolve the clash with
// the story that `examples/default.tsx` generates.
export default getMeta({ title: 'components/Collision', component: Default });

export const examples = getExamples('./examples');

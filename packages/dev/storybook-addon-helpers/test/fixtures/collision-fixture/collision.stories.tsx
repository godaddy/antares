import { getComponentDocs, getExamples, getMeta } from '@bento/storybook-addon-helpers';
import { Default } from './collision-comp.tsx';

export default getMeta({ title: 'components/Collision' });

export const DefaultDocs = getComponentDocs(Default);

export const examples = getExamples('./examples');

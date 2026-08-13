import { getExamples, getMeta } from '@bento/storybook-addon-helpers';
import type { DefaultExample } from './examples/default.tsx';

export default getMeta({ title: 'components/TypeOnly' });

// Type-only, so it binds no value the generated story could render.
export type Alias = typeof DefaultExample;

export const examples = getExamples('./examples');

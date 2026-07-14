import { getMeta, getStory, getTypeDocs } from '@bento/storybook-addon-helpers';
import { ContextExample } from './examples/namespace.tsx';
import type { EnvContext, SlotsContext } from './src/index.tsx';

export default getMeta({
  title: 'Bento/internal/box'
});

export const slots = getTypeDocs<SlotsContext>();

export const env = getTypeDocs<EnvContext<Record<string, unknown>>>();

export const Namespace = getStory(ContextExample);

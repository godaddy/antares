import { getMeta, getInterfaceDocs, getStory } from '@bento/storybook-addon-helpers';
import { ContextExample } from './examples/namespace.tsx';
import type { EnvContext, SlotsContext } from './src/index.tsx';

export default getMeta({
  title: 'Bento/internal/box'
});

export const slots = getInterfaceDocs<SlotsContext>();

export const env = getInterfaceDocs<EnvContext<Record<string, unknown>>>();

export const Namespace = getStory(ContextExample);

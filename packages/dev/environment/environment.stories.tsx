import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { Environment } from './src/index.tsx';
import { ComponentLevelExample } from './examples/component-level.tsx';
import { CustomButtonExample } from './examples/custom-button.tsx';
import { IframeRenderingExample } from './examples/iframe-rendering.tsx';
import { OverrideProps } from './examples/override-props.tsx';
import { Override } from './examples/override.tsx';

export default getMeta({
  title: 'Bento/components/Environment'
});

export const API = getComponentDocs(Environment);

export const Demo = getStory(Override);

export const OverridePropsDemo = getStory(OverrideProps);

export const ComponentLevelOverride = getStory(ComponentLevelExample);

export const IframeRendering = getStory(IframeRenderingExample);

export const Experimentation = getStory(CustomButtonExample);

import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { MergeClassName } from './examples/merge-classname.tsx';
import { Divider as DividerComponent } from './src/index.tsx';
import { Default } from './examples/default-divider.tsx';
import { VerticalStyleOverride } from './examples/vertical-style-override.tsx';
import { VerticalDiv } from './examples/vertical-div.tsx';

export default getMeta({
  title: 'components/Divider'
});

export const Props = getComponentDocs(DividerComponent);

export const Divider = getStory(Default);

export const VerticalDivider = getStory(VerticalStyleOverride);

export const VerticalDividerInADiv = getStory(VerticalDiv);

export const MergeClassNameExample = getStory(MergeClassName);

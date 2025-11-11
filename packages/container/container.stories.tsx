import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { Container as ContainerComponent } from './src/index.tsx';
import { BasicExample } from './examples/basic.tsx';
import { AsExample } from './examples/as.tsx';
import { BuildingBlockExample } from './examples/building-block.tsx';
import { NestedExample } from './examples/nested.tsx';

export default getMeta({
  title: 'components/container'
});

export const Props = getComponentDocs(ContainerComponent);

export const Basic = getStory(BasicExample);

export const As = getStory(AsExample);

export const BuildingBlock = getStory(BuildingBlockExample);

export const Nested = getStory(NestedExample);

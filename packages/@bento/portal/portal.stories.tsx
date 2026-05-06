import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { Portal as PortalComponent } from './src/index.tsx';
import { BasicExample } from './examples/basic.tsx';
import { CustomContainerExample } from './examples/custom-container.tsx';
import { PortalProviderExample } from './examples/portal-provider.tsx';

export default getMeta({
  title: 'Bento/components/Portal'
});

export const Props = getComponentDocs(PortalComponent);

export const Basic = getStory(BasicExample);

export const CustomContainer = getStory(CustomContainerExample);

export const PortalProvider = getStory(PortalProviderExample);

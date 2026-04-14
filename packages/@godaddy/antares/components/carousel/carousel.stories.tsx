'use client';
import { ExternalControlsUncontrolledExample } from './examples/external-controls-uncontrolled.tsx';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/carousel-playground.tsx';
import { ExternalControlsControlledExample } from './examples/external-controls-controlled.tsx';
import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { RtlI18nProvider } from '../../utils/rtl-locale-provider.tsx';
import { VariableWidthsExample } from './examples/variable-widths.tsx';
import { HideControlsExample } from './examples/hide-controls.tsx';
import { RTLDirectionExample } from './examples/rtl-direction.tsx';
import { ControlledExample } from './examples/controlled.tsx';
import { DefaultExample } from './examples/default.tsx';
import { EventsExample } from './examples/events.tsx';
import { Carousel } from './src/index.tsx';

export default getMeta({
  title: 'Antares/Components/Carousel'
});

export const Props = getComponentDocs(Carousel);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    hideDots: false,
    hideNavigationControls: false,
    hideMaskEdges: false
  },
  argTypes: {
    hideDots: { control: 'boolean' },
    hideNavigationControls: { control: 'boolean' },
    hideMaskEdges: { control: 'boolean' }
  }
};

export const Default = getStory(DefaultExample);

export const Controlled = getStory(ControlledExample);

export const ExternalControlsControlled = getStory(ExternalControlsControlledExample);

export const ExternalControlsUncontrolled = getStory(ExternalControlsUncontrolledExample);

export const HideControls = getStory(HideControlsExample);

export const VariableWidths = getStory(VariableWidthsExample);

export const Events = getStory(EventsExample);

function CarouselRTLDirectionStory() {
  return (
    <RtlI18nProvider>
      <RTLDirectionExample />
    </RtlI18nProvider>
  );
}

export const RTLDirection = getStory(CarouselRTLDirectionStory);

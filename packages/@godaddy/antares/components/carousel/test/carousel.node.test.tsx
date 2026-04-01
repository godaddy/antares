import { expect, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { ExternalControlsControlledExample } from '../examples/external-controls-controlled.tsx';
import { ExternalControlsUncontrolledExample } from '../examples/external-controls-uncontrolled.tsx';
import { HideControlsExample } from '../examples/hide-controls.tsx';
import { VariableWidthsExample } from '../examples/variable-widths.tsx';
import { EventsExample } from '../examples/events.tsx';
import { RTLDirectionExample } from '../examples/rtl-direction.tsx';

describe('@godaddy/uxcore', function uxcore() {
  describe('#Carousel', function carouselTests() {
    it('renders the default example', function rendersDefault() {
      const result = renderToString(<DefaultExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the controlled example', function rendersControlled() {
      const result = renderToString(<ControlledExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the external controls controlled example', function rendersExternalControlsControlled() {
      const result = renderToString(<ExternalControlsControlledExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the external controls uncontrolled example', function rendersExternalControlsUncontrolled() {
      const result = renderToString(<ExternalControlsUncontrolledExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the hide controls example', function rendersHideControls() {
      const result = renderToString(<HideControlsExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the events example', function rendersEvents() {
      const result = renderToString(<EventsExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the variable widths example', function rendersVariableWidths() {
      const result = renderToString(<VariableWidthsExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the rtl direction example', function rendersRTLDirection() {
      const result = renderToString(<RTLDirectionExample />);
      expect(result).toMatchSnapshot();
    });
  });
});

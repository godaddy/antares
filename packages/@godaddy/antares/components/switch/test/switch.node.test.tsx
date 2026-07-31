import { SwitchControlledExample } from '../examples/controlled';
import { DefaultExample } from '../examples/default';
import { SwitchDisabledExample } from '../examples/disabled';
import { SwitchLabelPositionExample } from '../examples/label-position';
import { SwitchNoLabelExample } from '../examples/no-label';
import { SwitchSelectedExample } from '../examples/selected';
import { SwitchSizesExample } from '../examples/sizes';
import { PlaygroundExample } from '../examples/switch-playground';
import { renderToString } from 'react-dom/server';
import { describe, it, expect } from 'vitest';

describe('@godaddy/antares', function antares() {
  describe('#Switch', function switchTests() {
    it('renders DefaultExample', function defaultExample() {
      const result = renderToString(<DefaultExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders SwitchSelectedExample', function selectedExample() {
      const result = renderToString(<SwitchSelectedExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders SwitchSizesExample', function sizesExample() {
      const result = renderToString(<SwitchSizesExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders SwitchLabelPositionExample', function labelPositionExample() {
      const result = renderToString(<SwitchLabelPositionExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders SwitchNoLabelExample', function noLabelExample() {
      const result = renderToString(<SwitchNoLabelExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders SwitchDisabledExample', function disabledExample() {
      const result = renderToString(<SwitchDisabledExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders SwitchControlledExample', function controlledExample() {
      const result = renderToString(<SwitchControlledExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders PlaygroundExample with default props', function playgroundExample() {
      const result = renderToString(<PlaygroundExample />);
      expect(result).toMatchSnapshot();
    });
  });
});

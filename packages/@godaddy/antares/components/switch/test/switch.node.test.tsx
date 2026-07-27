import { SwitchControlled } from '../examples/controlled';
import { SwitchDefault } from '../examples/default';
import { SwitchDisabled } from '../examples/disabled';
import { SwitchLabelPosition } from '../examples/label-position';
import { SwitchNoLabel } from '../examples/no-label';
import { SwitchSelected } from '../examples/selected';
import { SwitchSizes } from '../examples/sizes';
import { PlaygroundExample } from '../examples/switch-playground';
import { renderToString } from 'react-dom/server';
import { describe, it, expect } from 'vitest';

describe('@godaddy/antares', function antares() {
  describe('#Switch', function switchTests() {
    it('renders SwitchDefault', function defaultExample() {
      const result = renderToString(<SwitchDefault />);
      expect(result).toMatchSnapshot();
    });

    it('renders SwitchSelected', function selectedExample() {
      const result = renderToString(<SwitchSelected />);
      expect(result).toMatchSnapshot();
    });

    it('renders SwitchSizes', function sizesExample() {
      const result = renderToString(<SwitchSizes />);
      expect(result).toMatchSnapshot();
    });

    it('renders SwitchLabelPosition', function labelPositionExample() {
      const result = renderToString(<SwitchLabelPosition />);
      expect(result).toMatchSnapshot();
    });

    it('renders SwitchNoLabel', function noLabelExample() {
      const result = renderToString(<SwitchNoLabel />);
      expect(result).toMatchSnapshot();
    });

    it('renders SwitchDisabled', function disabledExample() {
      const result = renderToString(<SwitchDisabled />);
      expect(result).toMatchSnapshot();
    });

    it('renders SwitchControlled', function controlledExample() {
      const result = renderToString(<SwitchControlled />);
      expect(result).toMatchSnapshot();
    });

    it('renders PlaygroundExample with default props', function playgroundExample() {
      const result = renderToString(<PlaygroundExample />);
      expect(result).toMatchSnapshot();
    });
  });
});

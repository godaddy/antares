import { DefaultExample } from '../examples/default';
import { ControlledExample } from '../examples/controlled';
import { DisabledExample } from '../examples/disabled';
import { GroupExample } from '../examples/group';
import { IndeterminateExample } from '../examples/indeterminate';
import { InvalidExample } from '../examples/invalid';
import { RequiredExample } from '../examples/required';
import { HorizontalExample } from '../examples/horizontal';
import { PlaygroundExample } from '../examples/checkbox-playground';
import { renderToString } from 'react-dom/server';
import { describe, it, expect } from 'vitest';

describe('@godaddy/antares', function antares() {
  describe('#Checkbox', function checkboxTests() {
    it('renders DefaultExample', function basicExample() {
      const result = renderToString(<DefaultExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders ControlledExample', function controlledExample() {
      const result = renderToString(<ControlledExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders GroupExample', function groupExample() {
      const result = renderToString(<GroupExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders HorizontalExample', function horizontalExample() {
      const result = renderToString(<HorizontalExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders DisabledExample', function disabledExample() {
      const result = renderToString(<DisabledExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders IndeterminateExample', function indeterminateExample() {
      const result = renderToString(<IndeterminateExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders InvalidExample', function invalidExample() {
      const result = renderToString(<InvalidExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders RequiredExample', function requiredExample() {
      const result = renderToString(<RequiredExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders PlaygroundExample with default props', function playgroundExample() {
      const result = renderToString(<PlaygroundExample />);
      expect(result).toMatchSnapshot();
    });
  });
});

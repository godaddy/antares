import { DefaultExample } from '../examples/default';
import { CheckboxGroupControlledExample } from '../examples/controlled';
import { CheckboxGroupDisabledExample } from '../examples/disabled';
import { CheckboxGroupBasicExample } from '../examples/group';
import { CheckboxIndeterminateExample } from '../examples/indeterminate';
import { CheckboxGroupInvalidExample } from '../examples/invalid';
import { CheckboxGroupRequiredExample } from '../examples/required';
import { CheckboxGroupHorizontalExample } from '../examples/horizontal';
import { PlaygroundExample } from '../examples/checkbox-playground';
import { renderToString } from 'react-dom/server';
import { describe, it, expect } from 'vitest';

describe('@godaddy/antares', function antares() {
  describe('#Checkbox', function checkboxTests() {
    it('renders DefaultExample', function basicExample() {
      const result = renderToString(<DefaultExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders CheckboxGroupControlledExample', function controlledExample() {
      const result = renderToString(<CheckboxGroupControlledExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders CheckboxGroupBasicExample', function groupExample() {
      const result = renderToString(<CheckboxGroupBasicExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders CheckboxGroupHorizontalExample', function horizontalExample() {
      const result = renderToString(<CheckboxGroupHorizontalExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders CheckboxGroupDisabledExample', function disabledExample() {
      const result = renderToString(<CheckboxGroupDisabledExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders CheckboxIndeterminateExample', function indeterminateExample() {
      const result = renderToString(<CheckboxIndeterminateExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders CheckboxGroupInvalidExample', function invalidExample() {
      const result = renderToString(<CheckboxGroupInvalidExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders CheckboxGroupRequiredExample', function requiredExample() {
      const result = renderToString(<CheckboxGroupRequiredExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders PlaygroundExample with default props', function playgroundExample() {
      const result = renderToString(<PlaygroundExample />);
      expect(result).toMatchSnapshot();
    });
  });
});

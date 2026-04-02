import { CheckboxBasic } from '../examples/basic';
import { CheckboxGroupControlled } from '../examples/controlled';
import { CheckboxGroupDisabled } from '../examples/disabled';
import { CheckboxGroupBasic } from '../examples/group';
import { CheckboxIndeterminate } from '../examples/indeterminate';
import { CheckboxGroupInvalid } from '../examples/invalid';
import { CheckboxGroupRequired } from '../examples/required';
import { CheckboxGroupHorizontal } from '../examples/horizontal';
import { PlaygroundExample } from '../examples/playground';
import { renderToString } from 'react-dom/server';
import { describe, it, expect } from 'vitest';

describe('@godaddy/antares', function antares() {
  describe('#Checkbox', function checkboxTests() {
    it('renders CheckboxBasic', function basicExample() {
      const result = renderToString(<CheckboxBasic />);
      expect(result).toMatchSnapshot();
    });

    it('renders CheckboxGroupControlled', function controlledExample() {
      const result = renderToString(<CheckboxGroupControlled />);
      expect(result).toMatchSnapshot();
    });

    it('renders CheckboxGroupBasic', function groupExample() {
      const result = renderToString(<CheckboxGroupBasic />);
      expect(result).toMatchSnapshot();
    });

    it('renders CheckboxGroupHorizontal', function horizontalExample() {
      const result = renderToString(<CheckboxGroupHorizontal />);
      expect(result).toMatchSnapshot();
    });

    it('renders CheckboxGroupDisabled', function disabledExample() {
      const result = renderToString(<CheckboxGroupDisabled />);
      expect(result).toMatchSnapshot();
    });

    it('renders CheckboxIndeterminate', function indeterminateExample() {
      const result = renderToString(<CheckboxIndeterminate />);
      expect(result).toMatchSnapshot();
    });

    it('renders CheckboxGroupInvalid', function invalidExample() {
      const result = renderToString(<CheckboxGroupInvalid />);
      expect(result).toMatchSnapshot();
    });

    it('renders CheckboxGroupRequired', function requiredExample() {
      const result = renderToString(<CheckboxGroupRequired />);
      expect(result).toMatchSnapshot();
    });

    it('renders PlaygroundExample with default props', function playgroundExample() {
      const result = renderToString(<PlaygroundExample />);
      expect(result).toMatchSnapshot();
    });
  });
});

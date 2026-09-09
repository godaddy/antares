import { DescriptionExample } from '../examples/description.tsx';
import { HorizontalExample } from '../examples/horizontal.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { PlaygroundExample } from '../examples/radio-playground.tsx';
import { AriaLabelExample } from '../examples/aria-label.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { RequiredExample } from '../examples/required.tsx';
import { ErrorExample } from '../examples/error.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { FormExample } from '../examples/form.tsx';
import { renderToString } from 'react-dom/server';
import { describe, it, expect } from 'vitest';

describe('@godaddy/antares', function antares() {
  describe('#RadioGroup', function radioGroupTests() {
    it('renders DefaultExample', function basicExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders ControlledExample', function controlledExample() {
      expect(renderToString(<ControlledExample />)).toMatchSnapshot();
    });

    it('renders HorizontalExample', function horizontalExample() {
      expect(renderToString(<HorizontalExample />)).toMatchSnapshot();
    });

    it('renders DisabledExample', function disabledExample() {
      expect(renderToString(<DisabledExample />)).toMatchSnapshot();
    });

    it('renders AriaLabelExample', function ariaLabelExample() {
      expect(renderToString(<AriaLabelExample />)).toMatchSnapshot();
    });

    it('renders DescriptionExample', function descriptionExample() {
      expect(renderToString(<DescriptionExample />)).toMatchSnapshot();
    });

    it('renders ErrorExample', function errorExample() {
      expect(renderToString(<ErrorExample />)).toMatchSnapshot();
    });

    it('renders RequiredExample', function requiredExample() {
      expect(renderToString(<RequiredExample />)).toMatchSnapshot();
    });

    it('renders PlaygroundExample with default props', function playgroundExample() {
      expect(renderToString(<PlaygroundExample />)).toMatchSnapshot();
    });

    it('renders FormExample', function formExample() {
      expect(renderToString(<FormExample />)).toMatchSnapshot();
    });
  });
});

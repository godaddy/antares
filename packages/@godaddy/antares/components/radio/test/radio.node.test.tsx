import { RadioDescriptionExample } from '../examples/radio-description.tsx';
import { RadioHorizontalExample } from '../examples/radio-horizontal.tsx';
import { RadioControlledExample } from '../examples/radio-controlled.tsx';
import { PlaygroundExample } from '../examples/radio-playground.tsx';
import { RadioAriaLabelExample } from '../examples/radio-aria-label.tsx';
import { RadioDisabledExample } from '../examples/radio-disabled.tsx';
import { RadioRequiredExample } from '../examples/radio-required.tsx';
import { RadioErrorExample } from '../examples/radio-error.tsx';
import { RadioBasicExample } from '../examples/radio-basic.tsx';
import { RadioFormExample } from '../examples/radio-form.tsx';
import { renderToString } from 'react-dom/server';
import { describe, it, expect } from 'vitest';

describe('@godaddy/antares', function antares() {
  describe('#RadioGroup', function radioGroupTests() {
    it('renders RadioBasicExample', function basicExample() {
      expect(renderToString(<RadioBasicExample />)).toMatchSnapshot();
    });

    it('renders RadioControlledExample', function controlledExample() {
      expect(renderToString(<RadioControlledExample />)).toMatchSnapshot();
    });

    it('renders RadioHorizontalExample', function horizontalExample() {
      expect(renderToString(<RadioHorizontalExample />)).toMatchSnapshot();
    });

    it('renders RadioDisabledExample', function disabledExample() {
      expect(renderToString(<RadioDisabledExample />)).toMatchSnapshot();
    });

    it('renders RadioAriaLabelExample', function ariaLabelExample() {
      expect(renderToString(<RadioAriaLabelExample />)).toMatchSnapshot();
    });

    it('renders RadioDescriptionExample', function descriptionExample() {
      expect(renderToString(<RadioDescriptionExample />)).toMatchSnapshot();
    });

    it('renders RadioErrorExample', function errorExample() {
      expect(renderToString(<RadioErrorExample />)).toMatchSnapshot();
    });

    it('renders RadioRequiredExample', function requiredExample() {
      expect(renderToString(<RadioRequiredExample />)).toMatchSnapshot();
    });

    it('renders PlaygroundExample with default props', function playgroundExample() {
      expect(renderToString(<PlaygroundExample />)).toMatchSnapshot();
    });

    it('renders RadioFormExample', function formExample() {
      expect(renderToString(<RadioFormExample />)).toMatchSnapshot();
    });
  });
});

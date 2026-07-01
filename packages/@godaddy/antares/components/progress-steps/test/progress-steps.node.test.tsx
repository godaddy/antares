import { renderToString } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import { DefaultExample } from '../examples/default.tsx';
import { NotStartedExample } from '../examples/not-started.tsx';
import { VerticalExample } from '../examples/vertical.tsx';
import { InteractiveExample } from '../examples/interactive.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { HideStepNumbersExample } from '../examples/hide-step-numbers.tsx';
import { RTLExample } from '../examples/rtl.tsx';
import { ProgressStepsPlaygroundExample } from '../examples/progress-steps-playground.tsx';

describe('@godaddy/antares', function antares() {
  describe('#ProgressSteps', function progressStepsTests() {
    it('renders DefaultExample', function defaultExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders NotStartedExample', function notStartedExample() {
      expect(renderToString(<NotStartedExample />)).toMatchSnapshot();
    });

    it('renders VerticalExample', function verticalExample() {
      expect(renderToString(<VerticalExample />)).toMatchSnapshot();
    });

    it('renders InteractiveExample', function interactiveExample() {
      expect(renderToString(<InteractiveExample />)).toMatchSnapshot();
    });

    it('renders DisabledExample', function disabledExample() {
      expect(renderToString(<DisabledExample />)).toMatchSnapshot();
    });

    it('renders HideStepNumbersExample', function hideStepNumbersExample() {
      expect(renderToString(<HideStepNumbersExample />)).toMatchSnapshot();
    });

    it('renders RTLExample', function rtlExample() {
      expect(renderToString(<RTLExample />)).toMatchSnapshot();
    });

    it('renders ProgressStepsPlaygroundExample with default props', function playgroundExample() {
      expect(renderToString(<ProgressStepsPlaygroundExample />)).toMatchSnapshot();
    });
  });
});

import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { EmptyExample } from '../examples/empty.tsx';
import { ControlledValidationExample } from '../examples/controlled-validation.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Wizard', function wizardTests() {
    it('renders the trigger before opening', function closedWizard() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders an empty collection before opening', function emptyWizard() {
      expect(renderToString(<EmptyExample />)).toMatchSnapshot();
    });

    it('renders the app-owned controlled workflow before opening', function controlledWizard() {
      expect(renderToString(<ControlledValidationExample />)).toMatchSnapshot();
    });
  });
});

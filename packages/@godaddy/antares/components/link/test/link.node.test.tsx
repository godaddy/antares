import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { InteractionExample } from '../examples/interaction.tsx';
import { StatesExample } from '../examples/states.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Link', function linkTests() {
    it('renders the default link', function renderDefault() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders interaction behavior', function renderInteraction() {
      expect(renderToString(<InteractionExample />)).toMatchSnapshot();
    });

    it('renders link states and native overrides', function renderStates() {
      expect(renderToString(<StatesExample />)).toMatchSnapshot();
    });
  });
});

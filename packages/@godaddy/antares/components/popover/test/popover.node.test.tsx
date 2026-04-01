import { describe, expect, it } from 'vitest';
import { WithCloseButtonExample } from '../examples/with-close-button.tsx';
import { CustomAnchorExample } from '../examples/custom-anchor.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { PlaygroundExample } from '../examples/popover-playground.tsx';
import { renderToString } from 'react-dom/server';

describe('@godaddy/uxcore', function uxcore() {
  describe('#Popover', function popoverTests() {
    it('renders DefaultExample', function defaultExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders CustomAnchorExample', function customAnchorExample() {
      expect(renderToString(<CustomAnchorExample />)).toMatchSnapshot();
    });

    it('renders WithCloseButtonExample', function withCloseButtonExample() {
      expect(renderToString(<WithCloseButtonExample />)).toMatchSnapshot();
    });

    it('renders PlaygroundExample', function playgroundExample() {
      expect(renderToString(<PlaygroundExample />)).toMatchSnapshot();
    });
  });
});

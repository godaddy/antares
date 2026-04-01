import { describe, expect, it } from 'vitest';
import { DefaultExample } from '../examples/default.tsx';
import { CustomAnchorExample } from '../examples/custom-anchor.tsx';
import { PlaygroundExample } from '../examples/tooltip-playground.tsx';
import { renderToString } from 'react-dom/server';

describe('@godaddy/uxcore', function uxcore() {
  describe('#Tooltip', function tooltipTests() {
    it('renders DefaultExample', function defaultExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders CustomAnchorExample', function customAnchorExample() {
      expect(renderToString(<CustomAnchorExample />)).toMatchSnapshot();
    });

    it('renders PlaygroundExample', function playgroundExample() {
      expect(renderToString(<PlaygroundExample />)).toMatchSnapshot();
    });
  });
});

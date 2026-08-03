import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { DefaultExample } from '../examples/default.tsx';
import { PlaygroundExample } from '../examples/image-playground.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Image', function imageTests() {
    it('renders DefaultExample', function defaultExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders PlaygroundExample', function playgroundExample() {
      expect(renderToString(<PlaygroundExample />)).toMatchSnapshot();
    });
  });
});

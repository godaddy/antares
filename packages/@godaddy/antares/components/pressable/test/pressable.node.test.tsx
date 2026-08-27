import { expect, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { PlaygroundExample } from '../examples/pressable-playground.tsx';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Pressable', function pressableTests() {
    it('renders without wrapper', function render() {
      const html = renderToString(<DefaultExample />);
      expect(html).toMatchSnapshot();
    });

    it('preserves the child class name', function renderInteractiveChild() {
      const html = renderToString(<PlaygroundExample childClassName="consumer-child" />);
      expect(html).toMatchSnapshot();
    });
  });
});

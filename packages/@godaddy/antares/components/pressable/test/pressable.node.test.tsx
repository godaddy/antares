import { expect, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { CardExample } from '../examples/card.tsx';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Pressable', function pressableTests() {
    it('renders without wrapper', function render() {
      const html = renderToString(<DefaultExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders a custom card', function renderCard() {
      const html = renderToString(<CardExample />);
      expect(html).toMatchSnapshot();
    });
  });
});

import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Structure', function structure() {
    it('renders the composed structural containers', function rendersDefault() {
      const result = renderToString(<DefaultExample />);
      expect(result).toMatchSnapshot();
    });
  });
});

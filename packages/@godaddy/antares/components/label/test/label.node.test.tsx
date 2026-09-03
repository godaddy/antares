import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { AsExample } from '../examples/as.tsx';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Label', function labelTests() {
    it('renders the default example', function defaultExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders the as example', function asExample() {
      expect(renderToString(<AsExample />)).toMatchSnapshot();
    });
  });
});

import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { PilotExample } from '../examples/pilot.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#SizeProvider', function sizeProviderTests() {
    it('renders without a wrapper', function defaultRender() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });
    it('renders coordinated pilot compositions', function pilotRender() {
      expect(renderToString(<PilotExample />)).toMatchSnapshot();
    });
  });
});

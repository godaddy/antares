import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#useOverlayContainer', function overlayContainerTests() {
    it('chooses a popover on the server when closed', function closed() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('chooses a popover on the server when initially open', function open() {
      expect(renderToString(<DefaultExample defaultOpen />)).toMatchSnapshot();
    });
  });
});

import { describe, expect, it, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ToastQueue, ToastRegion } from '@godaddy/antares';
import { MultipleRegionsExample } from '../examples/multiple-regions.tsx';

// Regions render nothing on the server, so the snapshot locks in the triggers only.
describe('@godaddy/antares', function antares() {
  describe('#Toast', function toastTests() {
    it('renders the multiple regions example', function multipleRegionsExample() {
      expect(renderToString(<MultipleRegionsExample />)).toMatchSnapshot();
    });

    it('rejects invalid visible toast limits', function visibleLimits() {
      for (const maxVisibleToasts of [0, -1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
        expect(() => new ToastQueue({ maxVisibleToasts })).toThrow(/maxVisibleToasts must be a positive safe integer/);
      }
    });

    it('diagnoses a queue created outside this copy of Antares', function foreignQueue() {
      const queue: ToastQueue = { add: () => '', close: vi.fn() };
      expect(() => renderToString(<ToastRegion queue={queue} />)).toThrow(/same copy of Antares/);
    });
  });
});

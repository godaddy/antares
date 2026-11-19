import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MultipleRegionsExample } from '../examples/multiple-regions.tsx';

// Regions render nothing on the server, so the snapshot locks in the triggers only.
describe('@godaddy/antares', function antares() {
  describe('#Toast', function toastTests() {
    it('renders the multiple regions example', function multipleRegionsExample() {
      expect(renderToString(<MultipleRegionsExample />)).toMatchSnapshot();
    });
  });
});

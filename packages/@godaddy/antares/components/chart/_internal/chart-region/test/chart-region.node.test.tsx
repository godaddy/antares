import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { PlacementExample } from '../examples/placement.tsx';

describe('@godaddy/antares', function antares() {
  describe('#ChartRegion', function chartRegionTests() {
    it('renders the placement example', function ssrSnapshot() {
      expect(renderToString(<PlacementExample />)).toMatchSnapshot();
    });
  });
});

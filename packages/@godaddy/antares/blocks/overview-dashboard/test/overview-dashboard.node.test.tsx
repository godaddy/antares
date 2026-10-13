import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { OverviewDashboard } from '../index.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#OverviewDashboard', function overviewDashboardTests() {
    it('renders the accessible dashboard composition', function rendersDashboard() {
      expect(renderToString(<OverviewDashboard />)).toMatchSnapshot();
    });
  });
});

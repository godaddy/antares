import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import { SSRFixtureExample } from '../examples/ssr-fixture.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Virtualizer', function virtualizerTests() {
    afterEach(function restoreEnvironment() {
      vi.unstubAllEnvs();
    });

    it('renders the virtualized collection before viewport measurement', function renderServerCollection() {
      vi.stubEnv('VIRT_ON', '1');
      expect(renderToString(<SSRFixtureExample />)).toMatchSnapshot();
    });
  });
});

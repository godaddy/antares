import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { SSRFixtureExample } from '../examples/ssr-fixture.tsx';

// Intentionally run without VIRT_ON: record the installed upstream SSR test-mode fallback.
// The small fixture prevents an accidental 10,000-row server snapshot.
describe('@godaddy/antares', function packageTests() {
  describe('#Virtualizer', function virtualizerTests() {
    it('renders the server collection fallback', function renderServerCollection() {
      expect(renderToString(<SSRFixtureExample />)).toMatchSnapshot();
    });
  });
});

import { describe, expect, it } from 'vitest';
import { DefaultExample } from '../examples/default.tsx';
import { WithTrendExample } from '../examples/with-trend.tsx';
import { CompactExample } from '../examples/compact.tsx';
import { PlaygroundExample } from '../examples/metrics-lockup-playground.tsx';
import { renderToString } from 'react-dom/server';

describe('@godaddy/uxcore', function uxcore() {
  describe('#MetricsLockup', function metricsLockupTests() {
    it('renders DefaultExample', function defaultExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders WithTrendExample', function withTrendExample() {
      expect(renderToString(<WithTrendExample />)).toMatchSnapshot();
    });

    it('renders CompactExample', function compactExample() {
      expect(renderToString(<CompactExample />)).toMatchSnapshot();
    });

    it('renders PlaygroundExample', function playgroundExample() {
      expect(renderToString(<PlaygroundExample />)).toMatchSnapshot();
    });
  });
});

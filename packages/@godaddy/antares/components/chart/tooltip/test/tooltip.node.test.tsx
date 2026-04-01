import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ArrowExample } from '../examples/arrow.tsx';
import { MultipleSeriesExample } from '../examples/multiple-series.tsx';
import { SingleSeriesExample } from '../examples/single-series.tsx';

describe('@godaddy/uxcore', function uxcore() {
  describe('#single-series', function singleSeriesTests() {
    it('renders single-series example', function singleSeriesSnapshot() {
      const result = renderToString(<SingleSeriesExample />);
      expect(result).toMatchSnapshot();
    });
  });

  describe('#multiple-series', function multipleSeriesTests() {
    it('renders multiple-series example', function multipleSeriesSnapshot() {
      const result = renderToString(<MultipleSeriesExample />);
      expect(result).toMatchSnapshot();
    });
  });

  describe('#arrow', function arrowTests() {
    it('renders arrow example', function arrowSnapshot() {
      const result = renderToString(<ArrowExample />);
      expect(result).toMatchSnapshot();
    });
  });

  describe('#arrow', function arrowTests() {
    it('renders arrow example', function arrowSnapshot() {
      const result = renderToString(<ArrowExample />);
      expect(result).toMatchSnapshot();
    });
  });
});

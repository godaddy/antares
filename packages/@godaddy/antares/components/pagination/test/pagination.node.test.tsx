import { DefaultActiveExample } from '../examples/default-active.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { WithLimitExample } from '../examples/with-limit.tsx';
import { OnChangeExample } from '../examples/on-change.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { renderToString } from 'react-dom/server';
import { expect, describe, it } from 'vitest';

describe('@godaddy/uxcore', function uxcore() {
  describe('#Pagination', function paginationTests() {
    it('renders the default example', function rendersDefault() {
      const result = renderToString(<DefaultExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the controlled example', function rendersControlled() {
      const result = renderToString(<ControlledExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the default active example', function rendersDefaultActive() {
      const result = renderToString(<DefaultActiveExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the on change example', function rendersOnChange() {
      const result = renderToString(<OnChangeExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the with limit example', function rendersWithLimit() {
      const result = renderToString(<WithLimitExample />);
      expect(result).toMatchSnapshot();
    });
  });
});

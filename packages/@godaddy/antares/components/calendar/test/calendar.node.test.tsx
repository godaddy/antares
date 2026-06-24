import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { CalendarBasicExample } from '../examples/basic.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Calendar', function calendar() {
    it('renders basic example', function basic() {
      const html = renderToString(<CalendarBasicExample />);
      expect(html).toMatchSnapshot();
    });
  });
});

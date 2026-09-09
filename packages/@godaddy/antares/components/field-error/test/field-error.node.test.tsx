import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function antares() {
  describe('#FieldError', function fieldErrorTests() {
    it('renders the default example', function defaultExample() {
      const html = renderToString(<DefaultExample />);
      expect(html).toMatchSnapshot();
    });
  });
});

import assume from 'assume';
import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function antares() {
  describe('#TextArea', function textAreaTests() {
    it('renders a multiline textbox', async function rendersTextarea() {
      const { locator } = await render(<DefaultExample />);
      const textbox = locator.getByRole('textbox', { name: /comment/i });

      assume(textbox.element().tagName.toLowerCase()).equals('textarea');
    });
  });
});

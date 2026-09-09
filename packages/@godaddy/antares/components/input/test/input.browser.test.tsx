import assume from 'assume';
import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Input', function inputTests() {
    it('renders a textbox', async function rendersTextbox() {
      const { locator } = await render(<DefaultExample />);
      const textbox = locator.getByRole('textbox', { name: /email/i });

      assume(textbox.element()).exists();
      assume(textbox.element().getAttribute('placeholder')).equals('you@example.com');
    });
  });
});

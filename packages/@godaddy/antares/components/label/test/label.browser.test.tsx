import assume from 'assume';
import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { AsExample } from '../examples/as.tsx';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Label', function labelTests() {
    it('names the textbox', async function namesTextbox() {
      const { locator } = await render(<DefaultExample />);
      const textbox = locator.getByRole('textbox', { name: /email/i });

      assume(textbox.element()).exists();
    });

    it('names the textbox when rendered as a span', async function namesTextboxAsSpan() {
      const { locator } = await render(<AsExample />);
      const textbox = locator.getByRole('textbox', { name: /email/i });

      assume(textbox.element()).exists();
    });
  });
});

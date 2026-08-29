import assume from 'assume';
import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function antares() {
  describe('#ControlButton', function controlButtonTests() {
    it('renders a button inside the group', async function rendersButton() {
      const { locator } = await render(<DefaultExample />);

      assume(locator.getByRole('button', { name: 'Search' }).element()).exists();
      assume(locator.getByRole('textbox').element()).exists();
    });
  });
});

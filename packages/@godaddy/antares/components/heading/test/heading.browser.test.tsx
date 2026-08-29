import assume from 'assume';
import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Heading', function headingTests() {
    it('renders heading levels', async function rendersLevels() {
      const { locator } = await render(<DefaultExample />);

      assume(locator.getByRole('heading', { level: 1, name: 'Heading level 1' }).element()).exists();
      assume(locator.getByRole('heading', { level: 2, name: 'Heading level 2' }).element()).exists();
      assume(locator.getByRole('heading', { level: 3, name: 'Heading level 3' }).element()).exists();
    });
  });
});

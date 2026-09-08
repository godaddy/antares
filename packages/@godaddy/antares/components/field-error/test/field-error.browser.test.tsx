import assume from 'assume';
import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function antares() {
  describe('#FieldError', function fieldErrorTests() {
    it('shows the error message when invalid', async function showsError() {
      const { locator } = await render(<DefaultExample />);

      assume(locator.getByText('Please enter a valid email address').element()).exists();
    });
  });
});

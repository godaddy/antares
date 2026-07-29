import assume from 'assume';
import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { ButtonDisabledExample } from '../examples/button-disabled.tsx';
import { ButtonSelectedExample } from '../examples/button-selected.tsx';

describe('@godaddy/antares', function antares() {
  describe('#AvatarButton', function avatarButtonTests() {
    it('does not activate a disabled avatar button', async function disabledButton() {
      await render(<ButtonDisabledExample />);

      const disabledButton = page.getByRole('button', { name: 'Unavailable account' });
      assume(disabledButton.element().hasAttribute('disabled')).equals(true);
    });

    it('updates the selected avatar button', async function selectedButton() {
      const user = userEvent.setup();
      await render(<ButtonSelectedExample />);

      const uma = page.getByRole('button', { name: 'Switch to Uma Thurman' });
      const jamie = page.getByRole('button', { name: 'Switch to Jamie Rivera' });

      assume(uma.element().hasAttribute('data-selected')).equals(true);
      await user.click(jamie);
      assume(jamie.element().hasAttribute('data-selected')).equals(true);
      assume(uma.element().hasAttribute('data-selected')).equals(false);
    });
  });
});

import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { SignInForm } from '../blocks/sign-in-form/index.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#SignInForm', function signInFormTests() {
    it('exposes labeled required fields and accepts valid form input', async function acceptsFormInput() {
      const { getByLabelText, getByRole } = await render(<SignInForm />);
      const email = getByRole('textbox', { name: 'Email' });
      const password = getByLabelText('Password');

      await expect.element(getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
      expect(email.element().getAttribute('type')).toBe('email');
      expect(email.element().hasAttribute('required')).toBe(true);
      expect(password.element().getAttribute('type')).toBe('password');
      expect(password.element().hasAttribute('required')).toBe(true);

      await userEvent.fill(email, 'person@example.com');
      await userEvent.fill(password, 'correct horse battery staple');
      await userEvent.click(getByRole('button', { name: 'Sign in' }));

      expect(email.element().getAttribute('value')).toBe('person@example.com');
      expect(password.element().getAttribute('value')).toBe('correct horse battery staple');
    });
  });
});

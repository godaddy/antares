import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { BlockCatalogEntry, BlocksCatalog } from '../blocks/blocks-catalog.tsx';
import { SignInForm } from '../blocks/sign-in-form/index.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#BlocksCatalog', function blocksCatalogTests() {
    it('shows the empty state when no blocks are available', async function rendersEmptyState() {
      const { getByText } = await render(<BlocksCatalog />);

      await expect.element(getByText('No blocks are available yet.')).toBeVisible();
    });

    it('renders each supplied explorer inside a catalog entry', async function rendersBlockEntry() {
      const { container, getByRole, getByText } = await render(
        <BlocksCatalog>
          <BlockCatalogEntry>Explorer content</BlockCatalogEntry>
        </BlocksCatalog>
      );

      await expect.element(getByRole('heading', { name: 'Build product experiences with Antares.' })).toBeVisible();
      await expect.element(getByRole('article')).toHaveTextContent('Explorer content');
      await expect.element(getByText('Antares blocks')).toBeVisible();
      expect(container.querySelector('section[style*="align-self: stretch"]')).toHaveStyle('align-self: stretch');
    });
  });

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

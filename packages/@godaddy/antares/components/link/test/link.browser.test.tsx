import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { DefaultExample } from '../examples/default.tsx';
import { InteractionExample } from '../examples/interaction.tsx';
import { StatesExample } from '../examples/states.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Link', function linkTests() {
    it('renders a native link', async function renderDefault() {
      const { getByRole } = await render(<DefaultExample />);
      await expect.element(getByRole('link', { name: 'About page' })).toHaveAttribute('href', '/about');
    });

    it('keeps surrounding text inline', async function renderInlineText() {
      const { getByText } = await render(<DefaultExample />);
      await expect.element(getByText('Read more in our')).toBeInTheDocument();
      await expect.element(getByText('About page')).toBeInTheDocument();
    });

    it('activates from a pointer click', async function clickLink() {
      const { getByRole, getByText } = await render(<InteractionExample />);

      await getByRole('link', { name: 'Activate link' }).click();
      await expect.element(getByText('Activated')).toBeInTheDocument();
    });

    it('activates from the keyboard', async function keyboardLink() {
      const { getByRole, getByText } = await render(<InteractionExample />);

      await userEvent.tab();
      await expect.element(getByRole('link', { name: 'Activate link' })).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      await expect.element(getByText('Activated')).toBeInTheDocument();
    });

    it('keeps disabled links non-activatable', async function disabledLink() {
      const { getByRole, getByText } = await render(<StatesExample />);
      const link = getByRole('link', { name: 'Disabled link' });

      await expect.element(link).toHaveAttribute('aria-disabled', 'true');
      await expect.element(link).toHaveAttribute('data-disabled', 'true');
      await expect.element(link).not.toHaveAttribute('tabindex', '0');
      expect(getComputedStyle(link.element()).opacity).toBe('0.4');
      expect(getComputedStyle(link.element()).cursor).toBe('not-allowed');
      await expect.element(getByText('Disabled link')).toBeInTheDocument();
    });

    it('uses safe external defaults and honors native overrides', async function externalLinkProps() {
      const { getByRole } = await render(<StatesExample />);
      const external = getByRole('link', { name: 'External link', exact: true });
      const overrides = getByRole('link', { name: 'External link with overrides' });

      await expect.element(external).toHaveAttribute('target', '_blank');
      await expect.element(external).toHaveAttribute('rel', 'noopener noreferrer');
      await expect.element(overrides).toHaveAttribute('target', '_self');
      await expect.element(overrides).toHaveAttribute('rel', 'author');
      await expect.element(overrides).toHaveAttribute('download', 'report.pdf');
    });
  });
});

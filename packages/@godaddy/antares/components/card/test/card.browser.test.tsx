import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { ActionExample } from '../examples/action.tsx';
import { SelectionExample } from '../examples/selection.tsx';
import { NavigationExample } from '../examples/navigation.tsx';
import { CombinedExample } from '../examples/combined.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Card', function cardTests() {
    it('dispatches the primary action from body activation', async function bodyAction() {
      const { getByText } = await render(<ActionExample />);
      await userEvent.click(getByText('Open details'));
      await expect.element(getByText('Independent action (1)')).toBeInTheDocument();
    });

    it('keeps a nested action independent', async function nestedAction() {
      const { getByRole, getByText } = await render(<ActionExample />);
      await userEvent.click(getByRole('button', { name: /Independent action/ }));
      await expect.element(getByText('Independent action (10)')).toBeInTheDocument();
    });

    it('toggles its enclosing selection control from the indicator', async function toggleSelection() {
      const { getByRole, getByTestId } = await render(<SelectionExample />);
      const card = getByRole('checkbox', { name: 'Select this card' });
      await userEvent.click(getByTestId('card-selection-indicator'));
      await expect.element(card).toBeChecked();
    });

    it('toggles selection from ordinary Card body content', async function toggleBodySelection() {
      const { getByRole, getByText } = await render(<SelectionExample />);
      const card = getByRole('checkbox', { name: 'Select this card' });
      await userEvent.click(getByText('Selectable card content'));
      await expect.element(card).toBeChecked();
    });

    it('keeps the primary link native and sibling actions independent', async function nativeNavigation() {
      const { getByRole } = await render(<NavigationExample />);
      await expect.element(getByRole('link', { name: 'About this product' })).toHaveAttribute('href', '/about');
      await expect.element(getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    it('keeps combined navigation and selection independent', async function combinedControls() {
      const { getByRole, getByTestId } = await render(<CombinedExample />);
      await expect.element(getByRole('link', { name: 'Select details' })).toHaveAttribute('href', '/details');
      const checkbox = getByRole('checkbox', { name: 'Select details' });
      await userEvent.click(getByTestId('combined-selection-indicator'));
      await expect.element(checkbox).toBeChecked();
    });
  });
});

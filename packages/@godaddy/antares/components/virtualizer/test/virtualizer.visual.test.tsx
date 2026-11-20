import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { RTLProvider } from '#utils/rtl-locale-provider.tsx';
import { CardGroupExample } from '../examples/card-group.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { DynamicCollectionExample } from '../examples/dynamic-collection.tsx';
import { GridExample } from '../examples/grid.tsx';
import { SelectExample } from '../examples/select.tsx';
import { VariableHeightExample } from '../examples/variable-height.tsx';

// CI only. Linux baselines come from the existing screenshot CI bot.
describe('@godaddy/antares', function packageTests() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);
  describe('#Virtualizer', function virtualizerTests() {
    it('renders the fixed row example', async function fixedRows() {
      const { container, getByRole } = await render(<DefaultExample />);
      await expect.element(getByRole('option', { name: 'Item 1' })).toBeVisible();
      await expect(container).toMatchScreenshot('virtualizer-fixed');
    });
    it('renders the measured row example', async function measuredRows() {
      const { container, getByRole } = await render(<VariableHeightExample />);
      await expect.element(getByRole('option', { name: /^Item 1(?:\s|$)/ })).toBeVisible();
      await expect(container).toMatchScreenshot('virtualizer-variable');
    });
    it('renders the grid example', async function grid() {
      const { container, getByRole } = await render(<GridExample />);
      await expect.element(getByRole('option', { name: 'Item 1' })).toBeVisible();
      await expect(container).toMatchScreenshot('virtualizer-grid');
    });
    it('renders the CardGroup example', async function cardGroup() {
      const { container, getByRole } = await render(<CardGroupExample />);
      await expect.element(getByRole('row', { name: 'Card 1' })).toBeVisible();
      await expect(container).toMatchScreenshot('virtualizer-card-group');
    });
    it('renders the grid in RTL', async function rtlGrid() {
      const { container, getByRole } = await render(
        <RTLProvider>
          <GridExample />
        </RTLProvider>
      );
      await expect.element(getByRole('option', { name: 'Item 1' })).toBeVisible();
      await expect(container).toMatchScreenshot('virtualizer-grid-rtl');
    });
    it('renders the empty collection state', async function emptyCollection() {
      const { container, getByRole, getByText } = await render(<DynamicCollectionExample />);
      await getByRole('button', { name: 'Clear collection' }).click();
      await expect.element(getByText('No items', { exact: true })).toBeVisible();
      await expect(container).toMatchScreenshot('virtualizer-empty');
    });
    it('renders the selected row in an open Select', async function select() {
      await render(<SelectExample />);
      await page.getByRole('button', { name: /Choose an item/ }).click();
      const selected = page.getByRole('option', { name: 'Item 9000' });
      const listbox = page.getByRole('listbox', { name: /Available items/ });
      await expect.element(selected).toBeVisible();
      await expect
        .poll(function selectedInView() {
          const row = selected.element().getBoundingClientRect();
          const viewport = listbox.element().getBoundingClientRect();
          return row.top >= viewport.top - 1 && row.bottom <= viewport.bottom + 1;
        })
        .toBe(true);
      await expect(document.body).toMatchScreenshot('virtualizer-select');
    });
  });
});

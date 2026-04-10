import { SelectStaticExample } from '../examples/select-static.tsx';
import { SelectControlledExample } from '../examples/select-controlled.tsx';
import { SelectDynamicExample } from '../examples/select-dynamic.tsx';
import { SelectMultipleExample } from '../examples/select-multiple.tsx';
import { SelectRenderPropsExample } from '../examples/select-render-props.tsx';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';

describe('@godaddy/antares', function antares() {
  describe('Examples', function examples() {
    it('renders SelectStaticExample', async function staticRender() {
      await render(<SelectStaticExample />);

      const button = page.getByRole('button');
      assume(button).is.not.equal(null);
    });

    it('renders SelectControlledExample with interaction', async function controlledRender() {
      await render(<SelectControlledExample />);

      const button = page.getByRole('button', { name: 'Latte' });
      await userEvent.setup().click(button);

      const espressoOption = page.getByRole('option', { name: 'Espresso' });
      await userEvent.setup().click(espressoOption);

      await new Promise((resolve) => setTimeout(resolve, 100));

      const updatedButton = page.getByRole('button', { name: 'Espresso' });
      assume(updatedButton).is.not.equal(null);
    });

    it('renders SelectDynamicExample with items prop', async function dynamicRender() {
      await render(<SelectDynamicExample />);

      const button = page.getByRole('button');
      assume(button).is.not.equal(null);
    });

    it('renders SelectMultipleExample with multiple selection', async function multipleRender() {
      await render(<SelectMultipleExample />);

      const button = page.getByRole('button', { name: 'Coffee drinks' });
      await userEvent.setup().click(button);

      const espressoOption = page.getByRole('option', { name: 'Espresso' });
      await userEvent.setup().click(espressoOption);

      const latteOption = page.getByRole('option', { name: 'Latte' });
      await userEvent.setup().click(latteOption);

      const checkboxes = document.querySelectorAll('[aria-hidden="true"]');
      assume(checkboxes.length).greaterThan(0);
    });

    it('renders SelectRenderPropsExample with render function children', async function renderPropsRender() {
      await render(<SelectRenderPropsExample />);

      const button = page.getByRole('button', { name: 'Render props select' });
      await userEvent.setup().click(button);

      const option = page.getByRole('option').first();
      assume(option).is.not.equal(null);
    });
  });
});

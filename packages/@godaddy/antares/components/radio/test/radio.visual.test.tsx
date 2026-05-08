import { beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { set } from '#components/icon';
import { RadioBasicExample } from '../examples/radio-basic.tsx';
import { RadioDescriptionExample } from '../examples/radio-description.tsx';
import { RadioDisabledExample } from '../examples/radio-disabled.tsx';
import { RadioErrorExample } from '../examples/radio-error.tsx';
import { RadioHorizontalExample } from '../examples/radio-horizontal.tsx';
import { RadioRequiredExample } from '../examples/radio-required.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(function setupIcons() {
    // Preload the icons used by the checkbox component in case they are not already loaded
    set({
      alert: (
        <svg fill="none" height="24" width="24">
          <g fill="#111">
            <path d="M12 13.75a.75.75 0 0 0 .75-.75V9a.75.75 0 1 0-1.5 0v4a.75.75 0 0 0 .75.75z" />
            <path d="M21.371 16.48 14.478 4.417a2.854 2.854 0 0 0-4.956 0L2.629 16.48a2.853 2.853 0 0 0 2.478 4.27h13.787a2.854 2.854 0 0 0 2.477-4.27zm-1.307 2.095a1.34 1.34 0 0 1-1.17.675H5.107a1.352 1.352 0 0 1-1.175-2.025l6.893-12.063a1.354 1.354 0 0 1 2.35 0l6.893 12.063a1.339 1.339 0 0 1-.004 1.35z" />
            <path d="M12 15.25h-.005a1.128 1.128 0 1 0 .005 0z" />
          </g>
        </svg>
      )
    });
  });

  describe('#RadioGroup', function radioGroupTests() {
    it('basic example', async function basicRender() {
      const { container } = await render(<RadioBasicExample />);
      await expect(container).toMatchScreenshot('basic');
    });

    it('horizontal example', async function horizontalRender() {
      const { container } = await render(<RadioHorizontalExample />);
      await expect(container).toMatchScreenshot('horizontal');
    });

    it('disabled example', async function disabledRender() {
      const { container } = await render(<RadioDisabledExample />);
      await expect(container).toMatchScreenshot('disabled');
    });

    it('description example', async function descriptionRender() {
      const { container } = await render(<RadioDescriptionExample />);
      await expect(container).toMatchScreenshot('description');
    });

    it('error example', async function errorRender() {
      const { container } = await render(<RadioErrorExample />);
      await expect(container).toMatchScreenshot('error');
    });

    it('error example with selected option', async function errorRenderWithSelectedOption() {
      const { container } = await render(<RadioErrorExample />);

      await page.getByRole('radio', { name: 'Standard Shipping' }).click({ force: true });
      await expect(container).toMatchScreenshot('error-selected');
    });

    it('required example', async function requiredRender() {
      const { container } = await render(<RadioRequiredExample />);
      await expect(container).toMatchScreenshot('required');
    });
  });
});

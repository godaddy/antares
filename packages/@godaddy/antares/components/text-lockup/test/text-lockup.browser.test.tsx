import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { TagEyebrowExample } from '../examples/tag-eyebrow.tsx';
import { OverridesExample } from '../examples/overrides.tsx';
import { WithActionsExample } from '../examples/with-actions.tsx';
import { InModalExample } from '../examples/in-modal.tsx';

describe('@godaddy/antares', function antares() {
  describe('#TextLockup', function textLockupTests() {
    it('pairs a tag eyebrow size with the lockup size', async function tagSize() {
      const { container } = await render(<TagEyebrowExample />);
      const tags = container.querySelectorAll('[slot="eyebrow"][data-size]');

      // The xl lockup pairs with a lg tag, the sm lockup with a md one.
      expect(Array.from(tags, (tag) => tag.getAttribute('data-size'))).toEqual(['lg', 'md']);
    });

    it('lets an explicit child prop win over the injected default', async function overrides() {
      const { container, getByRole } = await render(<OverridesExample />);

      expect(container.querySelector('[slot="eyebrow"]')?.getAttribute('data-size')).toEqual('sm');
      await expect.element(getByRole('heading', { level: 4 })).toBeVisible();
    });

    it('keeps a nested button on its own type', async function nestedButton() {
      const { getByRole } = await render(<WithActionsExample />);
      const button = getByRole('button', { name: 'Upgrade' }).element();
      const label = button.querySelector('span');

      expect(label).not.toBeNull();
      expect(getComputedStyle(label as Element).fontSize).toEqual(getComputedStyle(button).fontSize);
    });

    it('still labels a dialog through the title slot', async function labelsDialog() {
      const { getByRole } = await render(<InModalExample />);
      await userEvent.click(getByRole('button', { name: 'Open modal' }));

      // The accessible name comes from <Heading slot="title"> inside the lockup, so the
      // lockup augmented the dialog's HeadingContext instead of replacing it.
      await expect.element(getByRole('dialog', { name: 'Cancel your subscription?' })).toBeVisible();
    });
  });
});

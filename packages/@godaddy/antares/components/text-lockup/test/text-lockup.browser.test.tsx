import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { TagEyebrowExample } from '../examples/tag-eyebrow.tsx';
import { OverridesExample } from '../examples/overrides.tsx';
import { WithActionsExample } from '../examples/with-actions.tsx';
import { HeadingContext } from 'react-aria-components';
import { Heading, TextLockup } from '@godaddy/antares';

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

    it('steps the title down a tier in a narrow container', async function narrowTitle() {
      const { getByRole } = await render(
        <div style={{ width: '400px' }}>
          <TextLockup size="2xl">
            <Heading>Text Lockup</Heading>
          </TextLockup>
        </div>
      );
      const title = getByRole('heading').element();

      // 2xl narrow drops to the xl tier: 1.875rem = 30px.
      expect(getComputedStyle(title).fontSize).toEqual('30px');
    });

    it('resolves slots against itself, not an outer container', async function ownsSlots() {
      const { getByRole } = await render(
        <HeadingContext.Provider value={{ slots: { title: { level: 3 } } }}>
          <TextLockup>
            <Heading slot="title">Text Lockup</Heading>
          </TextLockup>
        </HeadingContext.Provider>
      );

      // The lockup owns `title`, so the outer container's level does not reach it.
      await expect.element(getByRole('heading', { level: 2 })).toBeVisible();
    });
  });
});

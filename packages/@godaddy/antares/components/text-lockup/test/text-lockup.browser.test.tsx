import { beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { preloadTestIcons } from '#test/utils/test-helpers.tsx';
import { CornerActionsExample } from '../examples/corner-actions.tsx';
import { TagEyebrowExample } from '../examples/tag-eyebrow.tsx';
import { OverridesExample } from '../examples/overrides.tsx';
import { WithActionsExample } from '../examples/with-actions.tsx';
import { SelfContainedExample } from '../examples/self-contained.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);

  describe('#TextLockup', function textLockupTests() {
    it('keeps an ordinary header title and action on one row', async function headerRow() {
      const { getByRole } = await render(<SelfContainedExample />);
      const title = getByRole('heading', { name: 'Account settings' }).element().getBoundingClientRect();
      const action = getByRole('button', { name: 'Manage' }).element().getBoundingClientRect();
      expect(title.right).toBeLessThanOrEqual(action.left);
      expect(title.top).toBeLessThan(action.bottom);
      expect(action.top).toBeLessThan(title.bottom);
    });

    it('wraps a standalone heading while keeping its typography and level', async function cornerActions() {
      const { getByRole, getByText } = await render(<CornerActionsExample />);
      const heading = getByRole('heading', { level: 2 }).element();
      const button = getByRole('button', { name: 'More options' }).element();
      const actions = button.parentElement!.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(heading);
      const lines = [...range.getClientRects()];

      expect(lines[0].right).toBeLessThanOrEqual(actions.left);
      expect(lines[0].top).toBeLessThan(actions.bottom);
      expect(lines.at(-1)!.top).toBeGreaterThanOrEqual(actions.bottom);
      expect(getComputedStyle(heading).fontSize).toBe('24px');
      expect(getComputedStyle(button).fontSize).toBe('16px');
      expect(
        getByText('Check your product photos, payment options, and shipping details before opening your doors.')
          .element()
          .getBoundingClientRect().top
      ).toBeGreaterThanOrEqual(heading.parentElement!.getBoundingClientRect().bottom);
    });

    it('marks the business guide as read from its menu', async function articleMenu() {
      const { getByRole } = await render(<CornerActionsExample />);
      await userEvent.click(getByRole('button', { name: 'More options' }));
      await userEvent.click(getByRole('menuitem', { name: 'Mark as read' }));
      await expect.element(getByRole('status')).toHaveTextContent('Marked as read');
      await userEvent.click(getByRole('button', { name: 'More options' }));
      await userEvent.click(getByRole('menuitem', { name: 'Mark as unread' }));
      await expect.element(getByRole('status')).toHaveTextContent('5 min read');
    });

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

      expect(getComputedStyle(button).fontSize).toEqual('16px');
    });

    it('keeps its tier in a narrow container', async function narrowTitle() {
      const { getByRole } = await render(<SelfContainedExample />);

      expect(getComputedStyle(getByRole('heading', { name: 'Narrow' }).element()).fontSize).toEqual('36px');
    });

    it('replaces an outer lockup tier rather than scaling it', async function nestedTier() {
      const { getByRole } = await render(<SelfContainedExample />);

      expect(getComputedStyle(getByRole('heading', { name: 'Inner' }).element()).fontSize).toEqual('20px');
    });

    it('keeps start alignment inside a centered ancestor', async function startInCentered() {
      const { getByRole } = await render(<SelfContainedExample />);

      // `text-align` would otherwise inherit from the ancestor.
      expect(getComputedStyle(getByRole('heading', { name: 'Centered ancestor' }).element()).textAlign).toEqual(
        'start'
      );
    });

    it('fills a row that does not stretch it', async function widthInRow() {
      const { getByTestId } = await render(<SelfContainedExample />);

      expect(getByTestId('row-lockup').element().getBoundingClientRect().width).toEqual(600);
    });

    it('sizes unslotted text with its tier too', async function unslotted() {
      const { getByText } = await render(<SelfContainedExample />);
      const unslotted = getComputedStyle(getByText('Bare paragraph').element()).fontSize;

      expect(unslotted).toEqual('24px');
      expect(unslotted).toEqual(getComputedStyle(getByText('Body paragraph').element()).fontSize);
      expect(unslotted).not.toEqual(getComputedStyle(getByText('Outside every lockup').element()).fontSize);
    });

    it('resolves slots against itself, not an outer container', async function ownsSlots() {
      const { container, getByRole } = await render(<SelfContainedExample />);

      // The lockup owns `title`, so the outer level never reaches the heading and it falls back
      // to RAC's default of 3.
      expect(container.querySelector('h5')).toBeNull();
      await expect.element(getByRole('heading', { name: 'Owns its slots', level: 3 })).toBeVisible();
    });
  });
});

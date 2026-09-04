import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { TagEyebrowExample } from '../examples/tag-eyebrow.tsx';
import { OverridesExample } from '../examples/overrides.tsx';
import { WithActionsExample } from '../examples/with-actions.tsx';
import { SelfContainedExample } from '../examples/self-contained.tsx';

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
      const { getByRole } = await render(<SelfContainedExample />);

      // 2xl narrow drops to the xl tier: 1.875rem = 30px.
      expect(getComputedStyle(getByRole('heading', { name: 'Narrow' }).element()).fontSize).toEqual('30px');
    });

    it('does not inherit an outer lockup narrow title size', async function nestedNarrowTitle() {
      const { getByRole } = await render(<SelfContainedExample />);

      // `md` has no narrow step, so it keeps its own tier: 1.25rem = 20px.
      expect(getComputedStyle(getByRole('heading', { name: 'Inner' }).element()).fontSize).toEqual('20px');
    });

    it('keeps start alignment inside a centered ancestor', async function startInCentered() {
      const { getByRole } = await render(<SelfContainedExample />);

      // `text-align` would otherwise inherit from the ancestor.
      expect(getComputedStyle(getByRole('heading', { name: 'Centered ancestor' }).element()).textAlign).toEqual(
        'start'
      );
    });

    it('keeps its width inside a row that does not stretch it', async function widthInRow() {
      const { getByRole } = await render(<SelfContainedExample />);
      const lockup = getByRole('heading', { name: 'In a row' }).element().closest('[data-size]');

      // `inline-size` containment drops the children from the root's intrinsic size, so without
      // a definite inline size the lockup would collapse to 0.
      expect((lockup as HTMLElement).getBoundingClientRect().width).toEqual(600);
    });

    it('leaves unslotted text alone so nested components keep their type', async function unslotted() {
      const { getByText } = await render(<SelfContainedExample />);
      const unslotted = getComputedStyle(getByText('Bare paragraph').element()).fontSize;

      // Same as outside the lockup, and not the 2xl body tier the slotted sibling gets.
      expect(unslotted).toEqual(getComputedStyle(getByText('Outside every lockup').element()).fontSize);
      expect(unslotted).not.toEqual(getComputedStyle(getByText('Body paragraph').element()).fontSize);
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

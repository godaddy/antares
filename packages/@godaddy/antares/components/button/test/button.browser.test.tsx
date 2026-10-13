import { describe, it, beforeAll, beforeEach, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { preloadTestIcons, resetPointer } from '#test/utils/test-helpers.tsx';
import { CloseButton } from '@godaddy/antares';
import { InlineExample } from '../examples/inline.tsx';
import { IsolatedLabelExample } from '../examples/isolated-label.tsx';
import { PrimaryExample } from '../examples/primary.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { ClassNameRenderPropExample } from '../examples/class-name-render-prop.tsx';
import { IconExample } from '../examples/icon.tsx';
import { IconsAndAlignmentExample } from '../examples/icons-and-alignment.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Button', function buttonTests() {
    beforeAll(preloadTestIcons);
    beforeEach(resetPointer);

    it('renders the primary button hovered', async function rendersPrimaryHovered() {
      const { getByRole } = await render(<PrimaryExample />);
      await userEvent.hover(getByRole('button'));
      expect(getByRole('button')).toHaveAttribute('data-hovered', 'true');
    });

    it('renders the primary button focused', async function rendersPrimaryFocused() {
      const { getByRole } = await render(<PrimaryExample />);
      await userEvent.tab();
      expect(getByRole('button')).toHaveAttribute('data-focus-visible', 'true');
    });

    it('renders the primary button pressed', async function rendersPrimaryPressed() {
      const { getByRole } = await render(<PrimaryExample />);
      await userEvent.tab();
      await userEvent.keyboard('{Space>}');
      expect(getByRole('button')).toHaveAttribute('data-pressed', 'true');
      await userEvent.keyboard('{/Space}');
    });

    it('does not apply hover or focus styles when disabled', async function disabledNoHoverStyles() {
      const { getByRole } = await render(<PrimaryExample isDisabled />);
      const el = getByRole('button').element();

      const baseBg = getComputedStyle(el).backgroundColor;
      const baseBorder = getComputedStyle(el).borderColor;
      const baseOutline = getComputedStyle(el).outline;

      // force hover and focus styles
      el.setAttribute('data-hovered', 'true');
      el.setAttribute('data-focus-visible', 'true');

      expect(getComputedStyle(el).backgroundColor).toBe(baseBg);
      expect(getComputedStyle(el).borderColor).toBe(baseBorder);
      expect(getComputedStyle(el).outline).toBe(baseOutline);
    });

    it('keeps a transparent background on inline variant when hovered', async function inlineNoBackground() {
      const { getByRole } = await render(<InlineExample />);
      const el = getByRole('button').element();

      const baseBg = getComputedStyle(el).backgroundColor;

      el.setAttribute('data-hovered', 'true');
      expect(getComputedStyle(el).backgroundColor).toBe(baseBg);
      el.removeAttribute('data-hovered');
    });

    it('keeps Antares base classes while a render-prop className tracks interaction state', async function composesRenderPropClassName() {
      const { getByRole } = await render(<ClassNameRenderPropExample />);
      const button = getByRole('button');
      const el = button.element();

      // Antares base classes must survive composition (they drive the layout/styling).
      expect(getComputedStyle(el).display).toBe('inline-flex');
      expect(getComputedStyle(el).cursor).toBe('pointer');

      // RAC interaction state must flow through the render-prop className.
      expect(button).toHaveClass('idle');

      await userEvent.hover(button);
      expect(button).toHaveClass('hovered');
      // Base classes still present alongside the state-derived class.
      expect(getComputedStyle(el).display).toBe('inline-flex');
    });

    it('handles press events', async function pressEvents() {
      let pressed = false;

      const { getByRole } = await render(
        <PrimaryExample
          onPress={function handlePress() {
            pressed = true;
          }}
        />
      );

      expect(pressed).toEqual(false);
      await getByRole('button').click();
      expect(pressed).toEqual(true);
    });

    it('renders a CloseButton with the "Close" accessible name', async function closeButtonAccessibleName() {
      const { getByRole } = await render(<CloseButton />);
      await expect.element(getByRole('button', { name: 'Close' })).toBeVisible();
    });

    it('gives icon-only, text, and icon with text buttons the same height', async function iconHeights() {
      const { getByRole } = await render(<SizesExample />);
      const buttons = getByRole('button').elements();
      const rect = (index: number) => (buttons[index] as Element).getBoundingClientRect();

      for (const first of [0, 3, 6]) {
        expect(rect(first).width).toEqual(rect(first).height);
        expect(rect(first + 1).height).toEqual(rect(first).height);
        expect(rect(first + 2).height).toEqual(rect(first).height);
      }
    });

    it('pads an external link with a bare label like a labeled button, not an icon-only one', async function externalLabel() {
      const { getByRole } = await render(<IconExample />);
      const link = getByRole('link', { name: 'An external link!' }).element();
      const labeled = getByRole('button', { name: 'With an icon!' }).element();

      expect(getComputedStyle(link).padding).toEqual(getComputedStyle(labeled).padding);
    });

    it('controls navigation independently of the external icon', async function linkNavigation() {
      const { getByRole } = await render(<IconsAndAlignmentExample />);
      const report = getByRole('link', { name: 'View report' });
      const help = getByRole('link', { name: 'Read help' });
      const documentation = getByRole('link', { name: 'Read documentation' });

      expect(report).toHaveAttribute('target', '_blank');
      expect(report).toHaveAttribute('rel', 'noopener noreferrer');
      expect(report.element().querySelector('[data-icon]')).toBeNull();

      expect(help).toHaveAttribute('target', '_self');
      expect(help).toHaveAttribute('rel', 'external');
      expect(help.element().querySelector('[data-icon="window-new"]')).not.toBeNull();

      expect(documentation).not.toHaveAttribute('target');
      expect(documentation).not.toHaveAttribute('rel');
      expect(documentation.element().querySelector('[data-icon="window-new"]')).not.toBeNull();
    });

    it('preserves the external link shortcut', async function externalShortcut() {
      const { getByRole } = await render(<IconExample />);
      const link = getByRole('link', { name: 'An external link!' });

      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link.element().querySelector('[data-icon="window-new"]')).not.toBeNull();
    });

    it('aligns stretched inline controls at the start in LTR and RTL while regular controls stay centered', async function inlineAlignment() {
      for (const dir of ['ltr', 'rtl'] as const) {
        const { getByRole, unmount } = await render(<IconsAndAlignmentExample dir={dir} />);

        for (const [role, name] of [
          ['button', 'Inline action'],
          ['link', 'View report'],
          ['link', 'Read help'],
          ['link', 'Read documentation']
        ] as const) {
          const control = getByRole(role, { name }).element();
          const label = control.querySelector('span') as Element;
          const edge = dir === 'rtl' ? 'right' : 'left';

          expect(label.getBoundingClientRect()[edge]).toBeCloseTo(control.getBoundingClientRect()[edge], 0);
        }

        for (const [role, name] of [
          ['button', 'Centered action'],
          ['link', 'Centered link']
        ] as const) {
          const control = getByRole(role, { name }).element().getBoundingClientRect();
          const label = (getByRole(role, { name }).element().querySelector('span') as Element).getBoundingClientRect();

          expect(label.left + label.width / 2).toBeCloseTo(control.left + control.width / 2, 0);
        }

        await unmount();
      }
    });

    it('shadows an ancestor TextContext so the label keeps the button type', async function isolatedLabel() {
      const { getByRole, getByText } = await render(<IsolatedLabelExample />);

      // Control: Text outside the button takes the injected size, so the provider is live.
      expect(getComputedStyle(getByText('Outside the button').element()).fontSize).toEqual('40px');

      for (const control of [
        getByRole('button', { name: 'Composed label' }),
        getByRole('link', { name: 'Composed link label' })
      ]) {
        const label = control.element().querySelector('span');

        expect(label).not.toBeNull();
        expect(getComputedStyle(label as Element).fontSize).toEqual(getComputedStyle(control.element()).fontSize);
      }
    });
  });
});

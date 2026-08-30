import { describe, it, beforeAll, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { CloseButton } from '@godaddy/antares';
import { InlineExample } from '../examples/inline.tsx';
import { PrimaryExample } from '../examples/primary.tsx';
import { ClassNameRenderPropExample } from '../examples/class-name-render-prop.tsx';
import { ControlExample } from '../examples/control.tsx';
import { TriggerExample } from '../examples/trigger.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Button', function buttonTests() {
    beforeAll(preloadTestIcons);

    it('renders the primary button hovered', async function rendersPrimaryHovered() {
      const { getByRole } = await render(<PrimaryExample />);
      await userEvent.hover(getByRole('button'));
      expect(getByRole('button')).toHaveAttribute('data-hovered', 'true');

      // Move cursor away to prevent hover state leaking between tests
      await resetHover();
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

    it('keeps the control variant content-sized', async function controlSize() {
      const { getByRole } = await render(<ControlExample />);
      expect(getComputedStyle(getByRole('button').element()).flexGrow).toBe('0');
    });

    it('grows the trigger variant to fill its Group', async function triggerSize() {
      const { getByRole } = await render(<TriggerExample />);
      expect(getComputedStyle(getByRole('button').element()).flexGrow).toBe('1');
    });

    it('lets the Group own the control variant border and corners', async function controlBorders() {
      const { getByRole } = await render(<ControlExample />);
      const el = getByRole('button').element();
      const button = getComputedStyle(el);
      const group = getComputedStyle(el.parentElement as HTMLElement);

      expect(button.borderStyle).toBe('none');
      expect(button.borderTopRightRadius).toBe(group.borderTopRightRadius);
      expect(button.borderBottomRightRadius).toBe(group.borderBottomRightRadius);
      expect(button.borderTopLeftRadius).toBe('0px');
      expect(button.borderBottomLeftRadius).toBe('0px');
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

      await resetHover();
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
  });
});

import { describe, it, beforeAll, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { preloadTestIcons } from '../../../utils/test-icons.tsx';
import { PrimaryExample } from '../examples/primary.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Button', function buttonTests() {
    beforeAll(preloadTestIcons);

    it('renders the primary button hovered', async function rendersPrimaryHovered() {
      const { getByRole } = await render(<PrimaryExample />);
      await userEvent.hover(getByRole('button'));
      expect(getByRole('button')).toHaveAttribute('data-hovered', 'true');

      // Move cursor away to prevent hover state leaking between tests
      await page.getByRole('document').hover({ position: { x: 0, y: 0 } });
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
  });
});

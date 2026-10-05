import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { cleanup, render } from 'vitest-browser-react';
import { DefaultExample } from '../examples/default.tsx';
import { ContainerLayoutExample } from '../examples/container-layout.tsx';
import { ViewportLayoutExample } from '../examples/viewport-layout.tsx';
import { FormExample } from '../examples/form.tsx';
import { ResponsiveSizeExample } from '../examples/responsive-size.tsx';

function columnCount(element: Element) {
  return getComputedStyle(element).gridTemplateColumns.split(' ').length;
}

function rowTops(elements: Element[]) {
  return new Set(
    elements.map(function top(element) {
      return Math.round(element.getBoundingClientRect().top);
    })
  ).size;
}

describe('@godaddy/antares', function packageTests() {
  describe('#Responsive', function responsiveTests() {
    let originalWidth: number;
    let originalHeight: number;

    beforeEach(function rememberViewport() {
      originalWidth = window.innerWidth;
      originalHeight = window.innerHeight;
    });

    afterEach(async function reset() {
      await cleanup();
      await page.viewport(originalWidth, originalHeight);
    });

    it('wraps the plan cards into as many columns as fit', async function intrinsicLayout() {
      await page.viewport(320, 768);
      const screen = await render(<DefaultExample />);
      const cards = screen.getByRole('region', { name: 'Hosting plans' }).element().querySelectorAll(':scope > *');
      expect(rowTops([...cards])).toBe(3);

      await page.viewport(1200, 768);
      expect(rowTops([...cards])).toBe(1);
    });

    it('lays out each domain card by its own container width', async function containerStyles() {
      await page.viewport(1200, 768);
      const screen = await render(<ContainerLayoutExample />);
      const sidebar = screen.getByRole('article', { name: 'shop.example' }).element().firstElementChild as Element;
      const main = screen.getByRole('article', { name: 'example.com' }).element().firstElementChild as Element;
      expect(getComputedStyle(sidebar).flexDirection).toBe('column');
      expect(getComputedStyle(main).flexDirection).toBe('row');

      await page.viewport(320, 768);
      expect(getComputedStyle(main).flexDirection).toBe('column');
    });

    it('moves the settings navigation beside the content at 64rem', async function viewportStyles() {
      await page.viewport(1023, 768);
      const screen = await render(<ViewportLayoutExample />);
      const grid = screen.getByRole('region', { name: 'Account settings' }).element();
      expect(columnCount(grid)).toBe(1);

      await page.viewport(1024, 768);
      expect(columnCount(grid)).toBe(2);
    });

    it('preserves entered values, focus and selection when the form reflows', async function formReflow() {
      await page.viewport(1023, 768);
      const screen = await render(<FormExample />);
      const form = screen.getByRole('form', { name: 'Billing details' }).element();
      const name = screen.getByRole('textbox', { name: 'Full name' });
      await name.fill('Ada Lovelace');
      const input = name.element() as HTMLInputElement;
      input.setSelectionRange(0, 3);

      for (const [width, columns] of [
        [1024, 2],
        [320, 1],
        [1200, 2]
      ]) {
        await page.viewport(width, 768);
        expect(columnCount(form)).toBe(columns);
        await expect.element(name).toHaveValue('Ada Lovelace');
        await expect.element(name).toHaveFocus();
        expect(input.selectionStart).toBe(0);
        expect(input.selectionEnd).toBe(3);
      }

      await userEvent.tab();
      await expect.element(screen.getByRole('textbox', { name: 'Email' })).toHaveFocus();
    });

    it('grows the greeting from md to xl at 80rem', async function responsiveSize() {
      await page.viewport(1279, 768);
      const screen = await render(<ResponsiveSizeExample />);
      const title = screen.getByRole('heading', { name: 'Welcome back, Ada' }).element();
      expect(getComputedStyle(title).fontSize).toBe('20px');

      await page.viewport(1280, 768);
      expect(getComputedStyle(title).fontSize).toBe('30px');
    });

    it.each([
      'ltr',
      'rtl'
    ] as const)('reflows long form text at 320px with enlarged text in %s', async function narrowForm(dir) {
      await page.viewport(320, 768);
      const originalFontSize = document.documentElement.style.fontSize;
      const fontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
      document.documentElement.style.fontSize = `${fontSize * 2}px`;
      try {
        const description = `Card reference: ${'cardholderreference'.repeat(12)}`;
        const screen = await render(<FormExample dir={dir} description={description} />);
        const form = screen.getByRole('form', { name: 'Billing details' }).element();
        expect(columnCount(form)).toBe(1);
        expect(form.scrollWidth).toBeLessThanOrEqual(form.clientWidth);
        expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth);
        await expect.element(screen.getByText(description)).toBeVisible();
        await screen.getByRole('textbox', { name: 'Full name' }).fill('Ada Lovelace');
        await userEvent.tab();
        await expect.element(screen.getByRole('textbox', { name: 'Email' })).toHaveFocus();
      } finally {
        document.documentElement.style.fontSize = originalFontSize;
      }
    });
  });
});

import { ThemesExample } from '../examples/themes.tsx';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { PilotExample } from '../examples/pilot.tsx';

function fonts(element: Element) {
  const style = getComputedStyle(element);
  return [style.fontFamily, style.fontSize, style.fontWeight, style.lineHeight, style.fontVariationSettings];
}

describe('@godaddy/antares', function packageTests() {
  describe('#SizeProvider', function sizeProviderTests() {
    it('preserves token and legacy font settings and independent avatar geometry', async function themes() {
      const { getByRole, getByText, container } = await render(<ThemesExample />);
      for (const name of ['tokens', 'legacy']) {
        const button = getByRole('button', { name: `Themed ${name}` }).element();
        const label = button.querySelector('span')!;
        expect(fonts(button)).toEqual(fonts(label));
        expect(getComputedStyle(label).fontFamily).toBe('monospace');
        expect(getComputedStyle(label).fontWeight).toBe('600');
        expect(getComputedStyle(label).fontVariationSettings).toBe(name === 'tokens' ? '"wght" 450' : '"wght" 475');
        expect(getComputedStyle(label).color).toBe(name === 'tokens' ? 'rgb(100, 20, 30)' : 'rgb(110, 20, 30)');
        const avatar = container.querySelector(`[data-theme="${name}"] [data-shape]`)!;
        expect(avatar.getBoundingClientRect().width).toBe(40);
        expect(getComputedStyle(avatar.querySelector('span')!).fontSize).toBe('18px');
      }
      expect(getComputedStyle(getByText('Body tokens', { exact: true }).element()).fontSize).toBe('17px');
      expect(getComputedStyle(getByText('Label tokens', { exact: true }).element()).fontSize).toBe('15px');
    });

    it('coordinates scopes, preserves wrapped labels, and keeps overrides local', async function sizes() {
      const { getByRole, getByText, container } = await render(<PilotExample />);
      for (const [size, pixels] of [
        ['sm', '14px'],
        ['md', '16px'],
        ['lg', '18px']
      ] as const) {
        const direct = getByRole('button', { name: `Direct ${size}`, exact: true }).element();
        const wrapped = getByRole('button', { name: `Wrapped ${size}`, exact: true }).element();
        const color = getByRole('button', { name: `Color ${size}`, exact: true }).element();
        expect(getComputedStyle(direct).fontSize).toBe(pixels);
        expect(fonts(direct)).toEqual(fonts(wrapped.querySelector('span')!));
        expect(fonts(direct)).toEqual(fonts(color.querySelector('span')!));
        expect(getComputedStyle(color.querySelector('span')!).color).not.toBe(getComputedStyle(color).color);
        expect(direct.getBoundingClientRect().height).toEqual(wrapped.getBoundingClientRect().height);
        expect(getComputedStyle(getByText(`Large label ${size}`, { exact: true }).element()).fontSize).toBe('20px');
        expect(
          getComputedStyle(getByRole('button', { name: `Explicit ${size}`, exact: true }).element()).fontSize
        ).toBe('18px');
        expect(fonts(getByRole('button', { name: `Nested ${size}`, exact: true }).element())).toEqual(fonts(direct));
        expect(getComputedStyle(getByText(`Unslotted ${size}`, { exact: true }).element()).fontSize).toBe(pixels);
        expect(fonts(getByRole('button', { name: `Lockup action ${size}`, exact: true }).element())).toEqual(
          fonts(direct)
        );
        expect(getComputedStyle(getByRole('heading', { name: `Lockup ${size}`, exact: true }).element()).fontSize).toBe(
          '30px'
        );
        expect(fonts(getByRole('heading', { name: `${size} section`, exact: true }).element())).toEqual(
          fonts(getByRole('heading', { name: `${size} subsection`, exact: true }).element())
        );
        expect(fonts(getByRole('heading', { name: `Nested lockup ${size}`, exact: true }).element())).toEqual(
          fonts(getByRole('heading', { name: `${size} section`, exact: true }).element())
        );
      }
      const gaps = Array.from(container.querySelectorAll('[data-spacing]'), (element) => getComputedStyle(element).gap);
      expect(new Set(gaps).size).toBe(1);
    });

    it('coordinates field parts while retaining editing and accessible descriptions', async function fields() {
      const { getByRole, getByText } = await render(<PilotExample />);
      for (const [size, pixels] of [
        ['sm', '14px'],
        ['md', '16px'],
        ['lg', '18px']
      ] as const) {
        const input = getByRole('textbox', { name: `Email ${size}`, exact: true });
        await input.fill('updated@example.com');
        await expect.element(input).toHaveValue('updated@example.com');
        await expect.element(input).toHaveAccessibleDescription(`Receipts ${size} Invalid email ${size}`);
        expect(getComputedStyle(input.element()).fontSize).toBe(pixels);
        expect(getComputedStyle(input.element()).borderTopWidth).toBe('0px');
        expect(fonts(getByText(`Email ${size}`, { exact: true }).element())).toEqual(
          fonts(getByText(`Standalone label ${size}`, { exact: true }).element())
        );
        expect(fonts(getByText(`Receipts ${size}`, { exact: true }).element())).toEqual(
          fonts(getByText(`Invalid email ${size}`, { exact: true }).element())
        );
        expect(getComputedStyle(getByRole('button', { name: `Clear ${size}`, exact: true }).element()).fontSize).toBe(
          pixels
        );
      }
    });
  });
});

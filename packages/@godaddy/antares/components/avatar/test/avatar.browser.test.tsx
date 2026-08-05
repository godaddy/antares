import assume from 'assume';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { PlaygroundExample } from '../examples/avatar-playground.tsx';
import { ButtonExample } from '../examples/button.tsx';
import { ButtonDisabledExample } from '../examples/button-disabled.tsx';
import { ButtonMenuExample } from '../examples/button-menu.tsx';

const loadedImageSource = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
const invalidImageSource = 'data:image/png;base64,invalid';

function getAvatar(container: HTMLElement) {
  const avatar = container.querySelector<HTMLElement>('[data-loading-status]');

  if (!avatar) {
    throw new Error('Expected an Avatar element.');
  }

  return avatar;
}

function getImage(container: HTMLElement) {
  const image = container.querySelector<HTMLImageElement>('img');

  if (!image) {
    throw new Error('Expected an Image element.');
  }

  return image;
}

describe('@godaddy/antares', function antares() {
  describe('#AvatarButton', function avatarButtonTests() {
    it('shows hover feedback', async function hoverButton() {
      const user = userEvent.setup();
      await render(<ButtonExample />);

      const button = page.getByRole('button', { name: 'Account' });
      await user.hover(button);

      await expect.element(button).toHaveAttribute('data-hovered', 'true');
    });

    it('shows the keyboard focus ring', async function keyboardFocus() {
      const user = userEvent.setup();
      await render(<ButtonExample />);

      const button = page.getByRole('button', { name: 'Account' });
      await user.tab();

      await expect.element(button).toHaveAttribute('data-focus-visible', 'true');
      assume(getComputedStyle(button.element()).outlineWidth).equals('2px');
    });

    it('does not activate a disabled avatar button', async function disabledButton() {
      const onPress = vi.fn();
      const user = userEvent.setup();
      await render(<ButtonDisabledExample onPress={onPress} />);

      const disabledButton = page.getByRole('button', { name: 'Unavailable account' });
      assume(disabledButton.element().hasAttribute('disabled')).equals(true);
      assume(getComputedStyle(disabledButton.element()).opacity).equals('0.4');
      await user.tab();
      await expect.element(disabledButton).not.toHaveFocus();
      await user.keyboard('{Enter}');
      expect(onPress).not.toHaveBeenCalled();
    });

    it('shows the active ring when its menu is open', async function menuButton() {
      const user = userEvent.setup();
      await render(<ButtonMenuExample />);

      const accountMenu = page.getByRole('button', { name: 'Account menu' });

      assume(accountMenu.element().getAttribute('aria-expanded')).equals('false');
      await user.click(accountMenu);
      await expect.element(accountMenu).toHaveAttribute('aria-expanded', 'true');
      assume(getComputedStyle(accountMenu.element()).outlineWidth).equals('2px');
      assume(getComputedStyle(accountMenu.element()).outlineOffset).equals('-4px');

      await user.click(page.getByRole('menuitem', { name: 'Profile' }));
      await expect.element(accountMenu).toHaveAttribute('aria-expanded', 'false');
      await expect.element(accountMenu).toHaveAttribute('data-focused', 'true');
      assume(getComputedStyle(accountMenu.element()).outlineWidth).equals('2px');
    });
  });

  describe('#Image', function imageTests() {
    it('shows the image after load and forwards the load event', async function imageLoad() {
      const onLoad = vi.fn();
      const { container } = await render(<PlaygroundExample src={loadedImageSource} onLoad={onLoad} />);
      const avatar = getAvatar(container);

      await expect.element(avatar).toHaveAttribute('data-loading-status', 'loaded');
      expect(onLoad).toHaveBeenCalledOnce();
    });

    it('shows the fallback after error and forwards the error event', async function imageError() {
      const onError = vi.fn();
      const { container } = await render(<PlaygroundExample src={invalidImageSource} onError={onError} />);
      const avatar = getAvatar(container);

      await expect.element(avatar).toHaveAttribute('data-loading-status', 'error');
      expect(onError).toHaveBeenCalledOnce();
    });

    it('shows a cached image immediately', async function cachedImage() {
      const { container, rerender } = await render(<PlaygroundExample src="/initial-avatar.png" />);
      const avatar = getAvatar(container);
      const image = getImage(container);
      Object.defineProperties(image, {
        complete: { configurable: true, value: true },
        naturalWidth: { configurable: true, value: 128 }
      });

      await rerender(<PlaygroundExample src="/cached-avatar.png" />);

      await expect.element(avatar).toHaveAttribute('data-loading-status', 'loaded');
    });

    it('resets to the fallback when the image source changes or unmounts', async function imageSourceChange() {
      const { container, rerender } = await render(<PlaygroundExample src={loadedImageSource} />);
      const avatar = getAvatar(container);

      await expect.element(avatar).toHaveAttribute('data-loading-status', 'loaded');

      await rerender(<PlaygroundExample />);
      await expect.element(avatar).toHaveAttribute('data-loading-status', 'idle');
    });
  });
});

import React from 'react';
import { FocusLock } from '@bento/focus-lock';
import { BasicExample } from '../examples/basic';
import { SelectExample } from '../examples/select';
import { NestedExample } from '../examples/nested';
import { OverlayExample } from '../examples/overlay';
import { Container } from '@bento/container';
import { render } from 'vitest-browser-react';
import { describe, it, expect } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import assume from 'assume';

describe('@bento/focus-lock', function bento() {
  describe('FocusLock', function focusLockTests() {
    it('applies data-focus-contained attribute when contain is true', async function test() {
      const { container } = await render(<BasicExample />);

      const openButton = container.querySelector('[data-testid="open-button"]');
      await userEvent.click(openButton!);
      await new Promise((resolve) => setTimeout(resolve, 50));

      const modal = container.querySelector('[data-testid="basic-modal"]');
      assume(modal).is.not.equal(null);
      assume(modal?.getAttribute('data-focus-contained')).equals('true');
    });

    it('restores focus to previously focused element when unmounted', async function test() {
      const { container } = await render(<BasicExample />);

      const openButton = container.querySelector('[data-testid="open-button"]');
      await userEvent.click(openButton!);
      await new Promise((resolve) => setTimeout(resolve, 50));

      const closeButton = container.querySelector('[data-testid="close-button"]');
      await userEvent.click(closeButton!);

      expect(openButton).toHaveFocus();
    });

    it('contains focus within nested scopes', async function test() {
      const { container } = await render(<NestedExample />);

      const outerButton = container.querySelector('[data-testid="open-outer-button"]');
      await userEvent.click(outerButton!);
      await new Promise((resolve) => setTimeout(resolve, 50));

      const outerModal = container.querySelector('[data-testid="outer-modal"]');
      assume(outerModal?.getAttribute('data-focus-contained')).equals('true');

      const innerButton = container.querySelector('[data-testid="open-inner-button"]');
      await userEvent.click(innerButton!);
      await new Promise((resolve) => setTimeout(resolve, 100));

      const innerModal = container.querySelector('[data-testid="inner-modal"]');
      assume(innerModal).is.not.equal(null);
      assume(innerModal?.getAttribute('data-focus-contained')).equals('true');
    });

    it('works with single child elements', async function test() {
      const { container } = await render(<SelectExample />);

      const button = container.querySelector('button');
      await userEvent.click(button!);
      await new Promise((resolve) => setTimeout(resolve, 50));

      const popover = container.querySelector('[data-testid="select-popover"]');
      assume(popover?.getAttribute('data-focus-contained')).equals('true');
    });

    it('works with multiple children', async function test() {
      const { container } = await render(<OverlayExample />);

      const openButton = container.querySelector('[data-testid="open-overlay-button"]');
      await userEvent.click(openButton!);
      await new Promise((resolve) => setTimeout(resolve, 50));

      const content = container.querySelector('[data-testid="overlay-content"]');
      assume(content?.getAttribute('data-focus-contained')).equals('true');
    });

    it('returns null when children is not provided', async function test() {
      const { container } = await render(<FocusLock />);
      assume(container.innerHTML).equals('');
    });

    it('returns null when children is null', async function test() {
      const { container } = await render(<FocusLock>{null}</FocusLock>);
      assume(container.innerHTML).equals('');
    });

    it('returns null when children is undefined', async function test() {
      const { container } = await render(<FocusLock>{undefined}</FocusLock>);
      assume(container.innerHTML).equals('');
    });

    it('handles text and non-element children gracefully', async function test() {
      const { container } = await render(
        <FocusLock contain>
          <Container data-testid="wrapper">Content</Container>
          Plain text node
        </FocusLock>
      );

      const wrapper = container.querySelector('[data-testid="wrapper"]');
      assume(wrapper).is.not.equal(null);
      assume(wrapper?.getAttribute('data-focus-contained')).equals('true');
      assume(container.innerHTML).includes('Plain text node');
    });
  });
});

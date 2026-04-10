import { Pressable } from '@bento/pressable';
import { render } from 'vitest-browser-react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import React, { useRef } from 'react';
import assume from 'assume';

describe('@bento/pressable', function bento() {
  describe('Pressable', function pressableTests() {
    it('should render a pressable', async function test() {
      const { container } = await render(
        <Pressable>
          <div>Click me</div>
        </Pressable>
      );
      const result = container.innerHTML;

      assume(result).includes('data-react-aria-pressable="true"');
      assume(result).includes('tabindex="0"');
      assume(result).match(/^<div[^>]*>Click me<\/div>$/);
    });

    it('should call onPress, onPressStart, onPressEnd, onPressUp when clicked', async function test() {
      const onPress = vi.fn();
      const onPressStart = vi.fn();
      const onPressEnd = vi.fn();
      const onPressUp = vi.fn();
      const { container } = await render(
        <Pressable onPress={onPress} onPressStart={onPressStart} onPressEnd={onPressEnd} onPressUp={onPressUp}>
          <button>Click me</button>
        </Pressable>
      );

      const button = container.querySelector('button');
      button?.click();

      expect(onPress).toHaveBeenCalledTimes(1);
      expect(onPressStart).toHaveBeenCalledTimes(1);
      expect(onPressEnd).toHaveBeenCalledTimes(1);
      expect(onPressUp).toHaveBeenCalledTimes(1);
    });

    it('should pass down props to the pressable', async function test() {
      const { container } = await render(
        <Pressable className="my-class" style={{ color: 'red' }}>
          <div>Click me</div>
        </Pressable>
      );
      const result = container.innerHTML;

      assume(result).includes('class="my-class"');
      assume(result).includes('style="color: red;"');
    });

    it('should automatically make child focusable', async function test() {
      const { container } = await render(
        <Pressable>
          <span>Button</span>
        </Pressable>
      );

      const spanEl = container.querySelector('span');
      assume(spanEl?.getAttribute('tabindex')).equals('0');
    });

    it('should add and remove correct data attributes on hover', async function test() {
      const { container } = await render(
        <Pressable>
          <div>Click me</div>
        </Pressable>
      );

      const divEl = container.querySelector('div');

      if (!divEl) {
        throw new Error('divEl is null');
      }

      await userEvent.hover(divEl);
      assume(divEl.getAttribute('data-hovered')).equals('true');

      await userEvent.unhover(divEl);
      assume(divEl.getAttribute('data-hovered')).equals(null);
    });

    it('should add and remove correct data attributes on focus', async function test() {
      const { container } = await render(
        <Pressable>
          <div>Click me</div>
        </Pressable>
      );

      const divEl = container.querySelector('div');

      await userEvent.tab();
      assume(divEl?.getAttribute('data-focused')).equals('true');

      await userEvent.tab();
      assume(divEl?.getAttribute('data-focused')).equals(null);
    });

    it('should add and remove correct data attributes on press', async function test() {
      const { container } = await render(
        <Pressable>
          <div>Click me</div>
        </Pressable>
      );

      const divEl = container.querySelector('div');

      if (!divEl) {
        throw new Error('divEl is null');
      }

      await userEvent.tab();

      // simulate a press down with keyboard
      await userEvent.keyboard('[Space>]');
      assume(divEl?.getAttribute('data-pressed')).equals('true');

      await userEvent.keyboard('[Space]');
      assume(divEl?.getAttribute('data-pressed')).equals(null);
    });

    it('should not show focus ring when focused with mouse', async function test() {
      const { container } = await render(
        <Pressable>
          <div>Click me</div>
        </Pressable>
      );

      const divEl = container.querySelector('div');

      if (!divEl) {
        throw new Error('divEl is null');
      }

      await userEvent.click(divEl);
      assume(divEl.getAttribute('data-focus-visible')).equals(null);
    });

    it('should show focus ring when focused with keyboard', async function test() {
      const { container } = await render(
        <Pressable>
          <div>Click me</div>
        </Pressable>
      );

      const divEl = container.querySelector('div');

      if (!divEl) {
        throw new Error('divEl is null');
      }

      await userEvent.tab();
      assume(divEl.getAttribute('data-focus-visible')).equals('true');
    });

    it('should allow to use ref in child element', async function test() {
      const onPress = vi.fn();

      function PressableWithRef() {
        const ref = useRef<HTMLButtonElement>(null);

        return (
          <Pressable onPress={() => onPress(ref.current)}>
            <button ref={ref}>hi</button>
          </Pressable>
        );
      }

      const { container } = await render(<PressableWithRef />);

      const button = container.querySelector('button');
      button?.click();

      expect(onPress).toHaveBeenCalledTimes(1);
      expect(onPress).toHaveBeenCalledWith(button);
    });
  });
});

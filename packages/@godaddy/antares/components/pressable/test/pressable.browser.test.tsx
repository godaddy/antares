import { describe, it, expect, vi } from 'vitest';
import { createRef } from 'react';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { ClassNameRenderPropExample } from '../examples/class-name-render-prop.tsx';
import { PlaygroundExample } from '../examples/pressable-playground.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Pressable', function pressableTests() {
    it('handles click', async function click() {
      const onPress = vi.fn();
      const { getByRole } = await render(<PlaygroundExample onPress={onPress} />);
      const btn = getByRole('button', { name: 'View account summary' });
      await expect.element(btn).toBeVisible();
      await userEvent.click(btn);
      expect(onPress).toHaveBeenCalledOnce();
    });

    it('handles keyboard activation', async function keyboard() {
      const onPress = vi.fn();
      const { getByRole } = await render(<PlaygroundExample onPress={onPress} />);
      const card = getByRole('button', { name: 'View account summary' });
      card.element().focus();
      await userEvent.keyboard('{Enter}');
      expect(onPress).toHaveBeenCalledOnce();
      await userEvent.keyboard('{Space}');
      expect(onPress).toHaveBeenCalledTimes(2);
    });

    it('handles disabled', async function disabled() {
      const onPress = vi.fn();
      const { getByRole } = await render(<PlaygroundExample isDisabled onPress={onPress} />);
      const btn = getByRole('button', { name: 'View account summary' });
      await expect.element(btn).toBeVisible();
      await userEvent.click(btn);

      btn.element().focus();
      await userEvent.keyboard('{Enter}{Space}');
      expect(onPress).not.toHaveBeenCalled();
    });

    it('preserves the child class name, forwards the ref, and composes event handlers and accessible props', async function refAndClassName() {
      const pressableRef = createRef<HTMLElement>();
      const childRef = createRef<HTMLDivElement>();
      const onPress = vi.fn();
      const onChildClick = vi.fn();

      const { getByRole } = await render(
        <PlaygroundExample
          childRef={childRef}
          pressableRef={pressableRef}
          onPress={onPress}
          onChildClick={onChildClick}
          childClassName="consumer-child"
          childAriaDescribedBy="desc-id"
        />
      );

      const button = getByRole('button', { name: 'View account summary' });

      expect(button).toHaveClass('consumer-child');
      expect(pressableRef.current).toBe(childRef.current);
      expect(pressableRef.current).toBe(button.element());
      await expect.element(button).toHaveAttribute('aria-describedby', 'desc-id');

      await userEvent.click(button);
      expect(onPress).toHaveBeenCalledOnce();
      expect(onChildClick).toHaveBeenCalledOnce();
    });

    it('changes the child size class on press', async function classNameRenderProp() {
      const { getByRole } = await render(<ClassNameRenderPropExample />);
      const progressBar = getByRole('progressbar', { name: 'Change progress size' });

      expect(progressBar).toHaveClass('size-xs-class-60');
      await expect.element(progressBar).toHaveAttribute('data-size', 'xs');

      await userEvent.click(progressBar);
      expect(progressBar).toHaveClass('size-sm-class-60');
      await expect.element(progressBar).toHaveAttribute('data-size', 'sm');

      await userEvent.click(progressBar);
      expect(progressBar).toHaveClass('size-md-class-60');
      await expect.element(progressBar).toHaveAttribute('data-size', 'md');

      await userEvent.click(progressBar);
      expect(progressBar).toHaveClass('size-xs-class-60');
      await expect.element(progressBar).toHaveAttribute('data-size', 'xs');
    });
  });
});

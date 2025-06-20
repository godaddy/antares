import { Button } from '@bento/button';
import { render } from 'vitest-browser-react';
import { describe, it, vi, expect } from 'vitest';
import React, { useRef } from 'react';
import assume from 'assume';

describe('@bento/button', function bento() {
  describe('Button', function buttonTests() {
    it('should render a button', function test() {
      const { container } = render(<Button>Click me</Button>);
      const result = container.innerHTML;

      assume(result).includes('type="button"');
      assume(result).match(/^<button[^>]*>Click me<\/button>$/);
    });

    it('should have all button aria attributes', function test() {
      const { container } = render(<Button>Click me</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveAttribute('tabindex', '0');
      expect(button).toHaveAttribute('data-react-aria-pressable', 'true');
    });

    it('should call onPress, onPressStart, onPressEnd, onPressUp when clicked', async function test() {
      const onPress = vi.fn();
      const onPressStart = vi.fn();
      const onPressEnd = vi.fn();
      const onPressUp = vi.fn();
      const { container } = render(
        <Button onPress={onPress} onPressStart={onPressStart} onPressEnd={onPressEnd} onPressUp={onPressUp}>
          Click me
        </Button>
      );

      const button = container.querySelector('button');
      button?.click();

      expect(onPress).toHaveBeenCalledTimes(1);
      expect(onPressStart).toHaveBeenCalledTimes(1);
      expect(onPressEnd).toHaveBeenCalledTimes(1);
      expect(onPressUp).toHaveBeenCalledTimes(1);
    });

    it('should pass down props to the button', function test() {
      const { container } = render(
        <Button className="my-class" style={{ color: 'red' }} type="submit" disabled>
          Click me
        </Button>
      );
      const result = container.innerHTML;

      assume(result).includes('class="my-class"');
      assume(result).includes('style="color: red;"');
      assume(result).includes('type="submit"');
      assume(result).includes('disabled');
    });

    it('should allow to use ref', function test() {
      const onPress = vi.fn();

      function PressableWithRef() {
        const ref = useRef<HTMLButtonElement>(null);

        return (
          <Button childRef={ref} onPress={() => onPress(ref.current)}>
            click me
          </Button>
        );
      }

      const { container } = render(<PressableWithRef />);

      const button = container.querySelector('button');
      button?.click();

      expect(onPress).toHaveBeenCalledTimes(1);
      expect(onPress).toHaveBeenCalledWith(button);
    });
  });
});

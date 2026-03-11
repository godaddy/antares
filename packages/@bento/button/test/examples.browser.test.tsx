import React from 'react';
import { render } from 'vitest-browser-react';
import { beforeEach, afterEach, describe, it, vi, expect } from 'vitest';
import assume from 'assume';
import { ButtonExample } from '../examples/button.tsx';
import { ButtonVariantsExample } from '../examples/variants.tsx';

describe('@bento/button examples', function bento() {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(function beforeEach() {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(function mockLog() {
      return void 0;
    });
  });

  afterEach(function afterEach() {
    consoleLogSpy.mockRestore();
    vi.clearAllMocks();
  });

  describe('Button', function buttonExample() {
    it('renders the button', function test() {
      const { container } = render(<ButtonExample />);
      const result = container.innerHTML;

      assume(result).includes('type="button"');
      assume(result).match(/^<button[^>]*>Click me!<\/button>$/);

      const button = container.querySelector('button');

      button?.click();
      expect(consoleLogSpy).toHaveBeenCalledWith('button pressed!');
    });

    it('renders the button with variants', function test() {
      const { container } = render(<ButtonVariantsExample children="Variants!" />);
      const result = container.innerHTML;

      assume(result).match(/^<button[^>]*>Variants!<\/button>$/);
    });
  });
});

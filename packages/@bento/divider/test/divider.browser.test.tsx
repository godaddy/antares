import React from 'react';
import { Divider } from '@bento/divider';
import { render } from 'vitest-browser-react';
import { describe, vi, it, expect } from 'vitest';
import assume from 'assume';

describe('@bento/divider', function bento() {
  describe('Divider', function dividerTests() {
    it('should render a divider', async function test() {
      const { container } = await render(<Divider />);
      const result = container.innerHTML;
      const divider = container.querySelector('hr');

      assume(result).startsWith('<hr');

      expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
      expect(divider).toHaveAttribute('class');
    });

    it('should have aria orientation be vertical when orientation prop is set', async function test() {
      const { container } = await render(<Divider orientation="vertical" />);
      const divider = container.querySelector('hr');

      expect(divider).toHaveAttribute('aria-orientation', 'vertical');
      expect(divider).toHaveAttribute('class');
    });

    it('should pass down props to the divider', async function test() {
      const { container } = await render(<Divider dir="ltr" />);
      const result = container.innerHTML;

      assume(result).includes('dir="ltr"');
    });
  });
});

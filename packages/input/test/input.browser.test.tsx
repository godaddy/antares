import React from 'react';
import { Input } from '@bento/input';
import { render } from 'vitest-browser-react';
import { describe, vi, it, expect } from 'vitest';
import assume from 'assume';

describe('@bento/input', function bento() {
  describe('Input', function input() {
    it('renders an input element', async function test() {
      const { container } = render(<Input type="text" name="test-input" placeholder="Enter text here" />);
      const input = container.querySelector('input[name="test-input"]');
      assume(input).to.exist();
      expect(input?.getAttribute('placeholder')).toBe('Enter text here');
    });

    it('passes attributes to the DOM', async function test() {
      const { container } = render(<Input type="file" multiple accept="image/*" />);
      const input = container.querySelector('input[type="file"]');
      assume(input).to.exist();
      expect(input?.getAttribute('multiple')).toBe('');
      expect(input?.getAttribute('accept')).toBe('image/*');
    });
  });
});

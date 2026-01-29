import { Text } from '@bento/text';
import { render } from 'vitest-browser-react';
import { describe, it, vi, expect } from 'vitest';
import React from 'react';
import assume from 'assume';

describe('@bento/text', function bento() {
  describe('Text', function textTests() {
    it('renders text', function rendersText() {
      const { container } = render(<Text>Click me</Text>);
      const result = container.innerHTML;

      assume(result).match(/^<span[^>]*>Click me<\/span>$/);
    });
  });
});

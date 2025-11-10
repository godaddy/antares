import React from 'react';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import { DefaultExample } from '../examples/default.tsx';
import { CustomElementExample } from '../examples/custom-element.tsx';

describe('@bento/visually-hidden examples', function bento() {
  describe('VisuallyHidden', function visuallyHiddenExample() {
    it('renders the default example', function rendersDefault() {
      const { container } = render(<DefaultExample />);
      const result = container.innerHTML;

      assume(result).includes('Skip to main content');
      assume(result).includes('<button');
    });

    it('renders the custom element example', function rendersCustomElement() {
      const { container } = render(<CustomElementExample />);
      const result = container.innerHTML;

      assume(result).includes('This content is hidden visually but accessible to screen readers');
      assume(result).includes('Visible content');
    });
  });
});

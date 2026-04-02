import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import { userEvent } from '@testing-library/user-event';
import { DefaultExample } from '../examples/default.tsx';
import { CustomElementExample } from '../examples/custom-element.tsx';

describe('@bento/visually-hidden examples', function bento() {
  describe('VisuallyHidden', function visuallyHiddenExample() {
    it('renders the default example', async function rendersDefault() {
      const { container } = await render(<DefaultExample />);
      const result = container.innerHTML;

      assume(result).includes('Skip to main content');
      assume(result).includes('<button');
    });

    it('renders the hidden content when focused on tabbing and proper data-hidden attribute', async function rendersDefault() {
      const { container } = await render(<DefaultExample />);

      container.focus();
      assume(container.innerHTML).includes('data-hidden="true"');
      await userEvent.tab();
      assume(container.innerHTML).does.not.include('data-hidden="true"');
    });

    it('renders the custom element example', async function rendersCustomElement() {
      const { container } = await render(<CustomElementExample />);
      const result = container.innerHTML;

      assume(result).includes('This content is hidden visually but accessible to screen readers');
      assume(result).includes('Visible content');
    });
  });
});

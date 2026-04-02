import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import { DefaultExample } from '../examples/default.tsx';

describe('@bento/field-error examples', function bento() {
  describe('FieldError', function fieldErrorExample() {
    it('renders the default example', async function rendersDefault() {
      const { container } = await render(<DefaultExample isInvalid />);
      const result = container.innerHTML;

      assume(result).includes('This field is required');
    });

    it('does not render when isInvalid is false', async function doesNotRenderWhenInvalid() {
      const { container } = await render(<DefaultExample isInvalid={false} />);
      const result = container.innerHTML;

      assume(result).equals('');
    });
  });
});

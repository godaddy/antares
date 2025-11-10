import React from 'react';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import assume from 'assume';
import { DefaultExample } from '../examples/default.tsx';

describe('@bento/field-error examples', function bento() {
  describe('FieldError', function fieldErrorExample() {
    it('renders the default example', function rendersDefault() {
      const { container } = render(<DefaultExample isInvalid />);
      const result = container.innerHTML;

      assume(result).includes('This field is required');
    });

    it('does not render when isInvalid is false', function doesNotRenderWhenInvalid() {
      const { container } = render(<DefaultExample isInvalid={false} />);
      const result = container.innerHTML;

      assume(result).equals('');
    });
  });
});

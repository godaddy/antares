import { renderToString } from 'react-dom/server';
import { describe, it } from 'vitest';
import React from 'react';
import assume from 'assume';
import { FieldError } from '../src';

describe('@bento/field-error', function bento() {
  describe('FieldError', function fieldErrorTests() {
    it('renders error message when isInvalid is true', function rendersWhenInvalid() {
      const result = renderToString(<FieldError isInvalid>Error message</FieldError>);

      assume(result).includes('Error message');
    });

    it('does not render when isInvalid is undefined', function doesNotRenderWhenUndefined() {
      const result = renderToString(<FieldError>Error message</FieldError>);

      assume(result).equals('');
    });

    it('passes through other props', function passesOtherProps() {
      const result = renderToString(
        <FieldError isInvalid data-testid="error-id" className="custom-error">
          Error message
        </FieldError>
      );

      assume(result).includes('data-testid="error-id"');
      assume(result).includes('class="custom-error"');
    });
  });
});

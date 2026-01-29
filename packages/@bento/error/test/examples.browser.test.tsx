import { Throws } from '../examples/throws.tsx';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import React from 'react';

describe('@bento/error examples', function bento() {
  describe('throws', function example() {
    it('logs an error to the console when the button is clicked', async function test() {
      const screen = render(<Throws message="value here" method="example" name="error" />);
      const consoleError = console.error;
      let error: Error | undefined;

      console.error = function handleError(err) {
        error = err;
      };

      assume(screen.container.innerHTML).includes('Log bento error in console');
      await screen.getByRole('button', { name: 'error' }).click();

      console.error = consoleError;
      assume(error).is.instanceOf(Error);
      assume(error!.message).includes('@bento/error(example)');
      assume(error!.message).includes('value here');
    });
  });
});

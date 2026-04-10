import { Container } from '../examples/container.tsx';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';

describe('@bento/use-data-attributes examples', function bento() {
  describe('Container', function container() {
    it('should render the Container component', async function test() {
      const { container } = await render(
        <Container example={['1', 2, 'foo-bar']} focused={true} transform={{ rotate: '45deg' }} />
      );
      const result = container.innerHTML;

      assume(result).includes('data-example="1 2 foo-bar"');
      assume(result).includes('data-focused="true"');
      assume(result).includes('data-loading="true"');
      assume(result).includes('data-transform="rotate(45deg)"');
      assume(result).includes('data-override="style className slots"');
    });
  });
});

import { Container } from '../examples/container.tsx';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';

describe('@bento/to-attribute-value examples', function bento() {
  describe('Container', function container() {
    it('should render the Container component', async function test() {
      const { container } = await render(
        <Container example={['1', 2, 'foo-bar']} focused={true} transform={{ rotate: '45deg' }} />
      );
      const result = container.innerHTML;

      assume(result).includes('prop "example" is formatted as "1 2 foo-bar"');
      assume(result).includes('prop "focused" is formatted as "true"');
      assume(result).includes('prop "transform" is formatted as "rotate(45deg)"');
    });
  });
});

import { Text } from '@bento/text';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';

describe('@bento/text', function bento() {
  describe('Text', function textTests() {
    it('renders text', async function rendersText() {
      const { container } = await render(<Text>Click me</Text>);
      const result = container.innerHTML;

      assume(result).match(/^<span[^>]*>Click me<\/span>$/);
    });
  });
});

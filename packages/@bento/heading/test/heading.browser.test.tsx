import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import React from 'react';
import assume from 'assume';
import { Heading } from '../src';

describe('@bento/heading', function bento() {
  describe('Heading', function headingTests() {
    it('renders heading', async function rendersHeading() {
      const { container } = await render(<Heading>Click me</Heading>);
      const result = container.innerHTML;

      assume(result).match(/^<span[^>]*>Click me<\/span>$/);
    });
  });
});

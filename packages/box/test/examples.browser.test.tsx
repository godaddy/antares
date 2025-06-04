import { ContextExample } from '../examples/namespace.tsx';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import React from 'react';

describe('@bento/slots examples', function bento() {
  describe('Namespaced', function namespace() {
    it('should render a namespaced component', function nstest() {
      const { container } = render(<ContextExample />);
      const result = container.innerHTML;

      assume(result).equals(
        '<p>Slot namespace: level 1</p><p>Slot namespace: level 1 &gt; level 2</p><p>Slot namespace: level 1 &gt; level 2 &gt; level 3</p>'
      );
    });
  });
});

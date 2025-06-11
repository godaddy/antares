import { BasicExample } from '../examples/basic';
import { ComplexExample } from '../examples/complex';
import { CustomNodesExample } from '../examples/custom-nodes';
import { CustomPropsExample } from '../examples/custom-props';
import { render } from 'vitest-browser-react';
import { describe, it, expect } from 'vitest';

import React from 'react';

describe('@bento/svg-parser examples', function bento() {
  describe('ParserSVG', function parserSVG() {
    it('should render the basic example', function () {
      const { container } = render(<BasicExample />);
      expect(container).to.exist;
      expect(container.innerHTML).to.equal(
        '<svg width="100" height="100"><rect x="10" y="10" width="80" height="80" fill="blue"></rect></svg>'
      );
    });

    it('should render the complex example', function () {
      const { container } = render(<ComplexExample />);
      expect(container).to.exist;
      expect(container.querySelectorAll('rect')).toHaveLength(2);
    });

    it('should render the custom nodes example', function () {
      const { container } = render(<CustomNodesExample />);
      expect(container).to.exist;
      expect(container.querySelectorAll('rect')).toHaveLength(1);
      expect(container.querySelectorAll('circle')).toHaveLength(1);
      expect(container.querySelector('rect')).toHaveAttribute('fill', 'purple');
      expect(container.querySelector('circle')).toHaveAttribute('fill', 'orange');
    });

    it('should render the custom props example', function () {
      const { container } = render(<CustomPropsExample />);
      expect(container).to.exist;
      expect(container.querySelector('circle')).toHaveAttribute('stroke-width', '2');
      expect(container.querySelector('circle')).toHaveAttribute('class', 'custom-circle');
    });
  });
});

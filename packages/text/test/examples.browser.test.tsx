import React from 'react';
import { render } from 'vitest-browser-react';
import { beforeEach, afterEach, describe, it, vi, expect } from 'vitest';
import assume from 'assume';
import { TextExample } from '../examples/text.tsx';
import { AlignExample } from '../examples/align.tsx';
import { AsExample } from '../examples/as.tsx';
import { MaxLinesExample } from '../examples/max-lines.tsx';
import { WrapExample } from '../examples/wrap.tsx';

describe('@bento/text examples', function bento() {
  describe('Text', function textExample() {
    it('renders the text', function rendersText() {
      const { container } = render(<TextExample />);
      const result = container.innerHTML;

      assume(result).match(/^<span[^>]*>Hello, world!<\/span>$/);
    });

    it('renders the align', function rendersAlign() {
      const { container } = render(<AlignExample />);
      const result = container.innerHTML;

      assume(result).includes('--align: center');
    });

    it('renders the as', function rendersAs() {
      const { container } = render(<AsExample />);
      const result = container.innerHTML;

      assume(result).match(/^<marquee[^>]*>A scrolling marquee<\/marquee>$/);
    });

    it('renders the maxLines', function rendersMaxLines() {
      const { container } = render(<MaxLinesExample />);
      const result = container.innerHTML;

      assume(result).includes('--max-lines: 2');
    });

    it('renders the wrap', function rendersWrap() {
      const { container } = render(<WrapExample />);
      const result = container.innerHTML;

      assume(result).includes('--wrap: pretty');
    });
  });
});

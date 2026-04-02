import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import { TextExample } from '../examples/text.tsx';
import { AlignExample } from '../examples/align.tsx';
import { AsExample } from '../examples/as.tsx';
import { MaxLinesExample } from '../examples/max-lines.tsx';
import { WrapExample } from '../examples/wrap.tsx';

describe('@bento/text examples', function bento() {
  describe('Text', function textExample() {
    it('renders the text', async function rendersText() {
      const { container } = await render(<TextExample />);
      const result = container.innerHTML;

      assume(result).match(/^<span[^>]*>Hello, world!<\/span>$/);
    });

    it('renders the align', async function rendersAlign() {
      const { container } = await render(<AlignExample />);
      const result = container.innerHTML;

      assume(result).includes('--align: center');
    });

    it('renders the as', async function rendersAs() {
      const { container } = await render(<AsExample />);
      const result = container.innerHTML;

      assume(result).match(/^<marquee[^>]*>A scrolling marquee<\/marquee>$/);
    });

    it('renders the maxLines', async function rendersMaxLines() {
      const { container } = await render(<MaxLinesExample />);
      const result = container.innerHTML;

      assume(result).includes('--max-lines: 2');
    });

    it('renders the wrap', async function rendersWrap() {
      const { container } = await render(<WrapExample />);
      const result = container.innerHTML;

      assume(result).includes('--wrap: pretty');
    });
  });
});

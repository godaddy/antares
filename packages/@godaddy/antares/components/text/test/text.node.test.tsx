import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { TextExample } from '../examples/text.tsx';
import { AlignExample } from '../examples/align.tsx';
import { AsExample } from '../examples/as.tsx';
import { MaxLinesExample } from '../examples/max-lines.tsx';
import { WrapExample } from '../examples/wrap.tsx';
import { EmptyTextExample } from '../examples/empty.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Text', function textTests() {
    it('renders the text example', function rendersText() {
      const result = renderToString(<TextExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the align example', function rendersAlign() {
      const result = renderToString(<AlignExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the as example', function rendersAs() {
      const result = renderToString(<AsExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the maxLines example', function rendersMaxLines() {
      const result = renderToString(<MaxLinesExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the wrap example', function rendersWrap() {
      const result = renderToString(<WrapExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders empty Text with span element', function emptyChildren() {
      const result = renderToString(<EmptyTextExample />);
      expect(result).toMatchSnapshot();
    });
  });
});

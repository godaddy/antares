import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { CollectionExample } from '../examples/collection.tsx';
import { ContainerQueryExample } from '../examples/container-query.tsx';
import { CustomMediaExample } from '../examples/custom-media.tsx';
import { FullBleedExample } from '../examples/full-bleed.tsx';
import { HorizontalExample } from '../examples/horizontal.tsx';
import { LongTextExample } from '../examples/long-text.tsx';
import { MediaExample } from '../examples/media.tsx';
import { MediaOnlyExample } from '../examples/media-only.tsx';
import { TextLockupExample } from '../examples/text-lockup.tsx';
import { TextOnlyExample } from '../examples/text-only.tsx';
import { VerticalExample } from '../examples/vertical.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Card layout compositions', function cardLayoutTests() {
    it('renders text and media compositions', function renderTextAndMedia() {
      expect(
        [
          TextOnlyExample,
          TextLockupExample,
          MediaExample,
          MediaOnlyExample,
          CustomMediaExample,
          FullBleedExample,
          HorizontalExample,
          VerticalExample
        ]
          .map(function renderExample(Example) {
            return renderToString(<Example />);
          })
          .join('\n')
      ).toMatchSnapshot();
    });

    it('renders consumer-owned collections and responsiveness', function renderCollectionAndResponsive() {
      expect(renderToString(<CollectionExample />)).toMatchSnapshot();
      expect(renderToString(<ContainerQueryExample />)).toMatchSnapshot();
    });

    it('renders explicit corner spacing for long text', function renderLongText() {
      expect(renderToString(<LongTextExample />)).toMatchSnapshot();
    });
  });
});

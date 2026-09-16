import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { SelectionExample } from '../examples/selection.tsx';
import { NavigationExample } from '../examples/navigation.tsx';
import { CombinedExample } from '../examples/combined.tsx';
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
  describe('#Card', function cardTests() {
    it('renders the default composition', function renderDefault() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders a selection composition', function renderSelection() {
      expect(renderToString(<SelectionExample />)).toMatchSnapshot();
    });

    it('renders a native background link and composed content', function renderNavigation() {
      expect(renderToString(<NavigationExample />)).toMatchSnapshot();
    });

    it('renders separate linked and selection controls', function renderCombined() {
      expect(renderToString(<CombinedExample />)).toMatchSnapshot();
    });
  });
});

describe('@godaddy/antares', function packageTests() {
  describe('#Card layout', function cardLayoutTests() {
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

import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { SelectionExample } from '../examples/selection.tsx';
import { NavigationExample } from '../examples/navigation.tsx';
import { CombinedExample } from '../examples/combined.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Card', function cardTests() {
    it('renders the default composition', function renderDefault() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders a selection composition', function renderSelection() {
      expect(renderToString(<SelectionExample />)).toMatchSnapshot();
    });

    it('renders a native linked content region', function renderNavigation() {
      expect(renderToString(<NavigationExample />)).toMatchSnapshot();
    });

    it('renders separate linked and selection controls', function renderCombined() {
      expect(renderToString(<CombinedExample />)).toMatchSnapshot();
    });
  });
});

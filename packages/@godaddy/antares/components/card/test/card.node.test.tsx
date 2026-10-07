import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { TextLockupExample } from '../examples/text-lockup.tsx';
import { CornerActionsExample } from '../examples/corner-actions.tsx';
import { LinkExample } from '../examples/link.tsx';
import { GroupedLinksExample } from '../examples/grouped-links.tsx';
import { ActionsExample } from '../examples/actions.tsx';
import { MultipleSelectionExample } from '../examples/multiple-selection.tsx';
import { SingleSelectionExample } from '../examples/single-selection.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { LayoutExample } from '../examples/layout.tsx';
import { MediaExample } from '../examples/media.tsx';
import { TypesExample } from '../examples/types.tsx';
import { NavigationExample } from '../examples/navigation.tsx';
import { InteractionsExample } from '../examples/interactions.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Card', function cardTests() {
    it('renders the default composition', function renderDefault() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders a text lockup composition', function renderTextLockup() {
      expect(renderToString(<TextLockupExample />)).toMatchSnapshot();
    });

    it('renders corner actions', function renderCornerActions() {
      expect(renderToString(<CornerActionsExample />)).toMatchSnapshot();
    });

    it('renders a link card', function renderLink() {
      expect(renderToString(<LinkExample />)).toMatchSnapshot();
    });

    it('renders grouped links with independent controls and disabled navigation', function renderGroupedLinks() {
      expect(renderToString(<GroupedLinksExample />)).toMatchSnapshot();
    });

    it('renders standalone and grouped navigation options', function renderNavigationOptions() {
      expect(renderToString(<NavigationExample />)).toMatchSnapshot();
    });

    it('renders row actions with independent child actions', function renderActions() {
      expect(renderToString(<ActionsExample />)).toMatchSnapshot();
    });

    it('renders multiple selection', function renderMultiple() {
      expect(renderToString(<MultipleSelectionExample />)).toMatchSnapshot();
    });

    it('renders single selection', function renderSingle() {
      expect(renderToString(<SingleSelectionExample />)).toMatchSnapshot();
    });

    it('renders disabled links and rows', function renderDisabled() {
      expect(renderToString(<DisabledExample />)).toMatchSnapshot();
    });

    it('renders static custom indicator content', function renderCustomIndicator() {
      expect(renderToString(<InteractionsExample indicatorChildren="Select" />)).toMatchSnapshot();
    });

    it('allows an explicitly empty indicator', function renderEmptyIndicator() {
      expect(renderToString(<InteractionsExample indicatorChildren={null} />)).toMatchSnapshot();
    });

    it('renders typed group and link examples', function renderTypes() {
      expect(renderToString(<TypesExample />)).toMatchSnapshot();
    });

    it('renders inset, full bleed, standalone and custom media', function renderMedia() {
      expect(renderToString(<MediaExample />)).toMatchSnapshot();
    });

    it('renders responsive and collection layout', function renderLayout() {
      expect(renderToString(<LayoutExample />)).toMatchSnapshot();
    });
  });
});

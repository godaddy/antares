import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { TextLockupExample } from '../examples/text-lockup.tsx';
import { CornerActionsExample } from '../examples/corner-actions.tsx';
import { LinkExample } from '../examples/link.tsx';
import { ActionsExample } from '../examples/actions.tsx';
import { CheckboxExample } from '../examples/checkbox.tsx';
import { RadioExample } from '../examples/radio.tsx';
import { LayoutExample } from '../examples/layout.tsx';
import { MediaExample } from '../examples/media.tsx';
import { TypesExample } from '../examples/types.tsx';
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

    it('renders independent primary and child actions', function renderActions() {
      expect(renderToString(<ActionsExample />)).toMatchSnapshot();
    });

    it('renders standalone and grouped checkbox selection', function renderCheckbox() {
      expect(renderToString(<CheckboxExample />)).toMatchSnapshot();
    });

    it('renders grouped radio selection', function renderRadio() {
      expect(renderToString(<RadioExample />)).toMatchSnapshot();
    });

    it('renders static custom indicator content', function renderCustomIndicator() {
      expect(renderToString(<InteractionsExample indicatorChildren="Select" />)).toMatchSnapshot();
    });

    it('allows an explicitly empty indicator', function renderEmptyIndicator() {
      expect(renderToString(<InteractionsExample indicatorChildren={null} />)).toMatchSnapshot();
    });

    it('renders selection validation examples', function renderTypes() {
      expect(renderToString(<TypesExample />)).toMatchSnapshot();
    });

    it('rejects a radio card without a value at runtime', function missingRadioValue() {
      expect(() => renderToString(<TypesExample missingRadioValue />)).toThrowErrorMatchingSnapshot();
    });

    it('renders inset, full bleed, standalone and custom media', function renderMedia() {
      expect(renderToString(<MediaExample />)).toMatchSnapshot();
    });

    it('renders responsive and collection layout', function renderLayout() {
      expect(renderToString(<LayoutExample />)).toMatchSnapshot();
    });
  });
});

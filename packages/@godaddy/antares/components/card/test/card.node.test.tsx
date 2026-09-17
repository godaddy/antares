import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { ActionsExample } from '../examples/actions.tsx';
import { CheckboxExample } from '../examples/checkbox.tsx';
import { RadioExample } from '../examples/radio.tsx';
import { LayoutExample } from '../examples/layout.tsx';
import { MediaExample } from '../examples/media.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Card', function cardTests() {
    it('renders the default composition', function renderDefault() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
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

    it('renders inset, full bleed, standalone and custom media', function renderMedia() {
      expect(renderToString(<MediaExample />)).toMatchSnapshot();
    });

    it('renders responsive and collection layout', function renderLayout() {
      expect(renderToString(<LayoutExample />)).toMatchSnapshot();
    });
  });
});

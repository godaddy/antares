import { DEFAULT_SLOT } from 'react-aria-components';
import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { PlaygroundExample } from '../examples/alert-playground.tsx';
import { EmphasesExample } from '../examples/emphases.tsx';
import { DismissibleExample } from '../examples/dismissible.tsx';
import { WithActionExample } from '../examples/with-action.tsx';
import { CompositionExample } from '../examples/composition.tsx';
import { InteriorExample } from '../examples/interior.tsx';
import { CustomRegionsExample } from '../examples/custom-regions.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Alert', function alertTests() {
    it('renders the composed default alert', function defaultExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders the playground defaults', function playgroundExample() {
      expect(renderToString(<PlaygroundExample />)).toMatchSnapshot();
    });

    it('renders title-only content', function titleOnly() {
      expect(renderToString(<PlaygroundExample children="" />)).toMatchSnapshot();
    });

    it('renders body-only content with actions and dismissal', function bodyOnly() {
      expect(renderToString(<PlaygroundExample title="" showAction dismissible />)).toMatchSnapshot();
    });

    it('renders no optional icon, title, actions, or close', function optionalParts() {
      expect(renderToString(<PlaygroundExample title="" showIcon={false} />)).toMatchSnapshot();
    });

    it('renders all emphasis glyphs', function emphasesExample() {
      expect(renderToString(<EmphasesExample />)).toMatchSnapshot();
    });

    it('renders the dismissible example and default close label', function dismissibleExample() {
      expect(renderToString(<DismissibleExample />)).toMatchSnapshot();
    });

    it('renders a custom close label', function customCloseLabel() {
      expect(renderToString(<DismissibleExample closeLabel="Cerrar alerta" />)).toMatchSnapshot();
    });

    it('renders the composed action', function actionExample() {
      expect(renderToString(<WithActionExample />)).toMatchSnapshot();
    });

    it('renders optional regions, rich text, and a link action', function compositionExample() {
      expect(renderToString(<CompositionExample />)).toMatchSnapshot();
    });

    it('renders regions returned by custom components', function customRegions() {
      expect(renderToString(<CustomRegionsExample />)).toMatchSnapshot();
    });

    it('renders a custom region returning null', function omittedRegion() {
      expect(renderToString(<CustomRegionsExample initiallyDismissible={false} />)).toMatchSnapshot();
    });

    it('renders local overrides and standalone icons', function overridesExample() {
      expect(renderToString(<InteriorExample />)).toMatchSnapshot();
    });

    it('renders nested ownership with reversed region order', function nestedExample() {
      expect(renderToString(<InteriorExample nested reverse />)).toMatchSnapshot();
    });

    it('preserves inherited default and named icon slots', function inheritedIcons() {
      expect(
        renderToString(
          <InteriorExample
            iconContext={{
              slots: {
                [DEFAULT_SLOT]: { color: 'purple', width: 18, className: 'ambient-icon' },
                support: { color: 'green' }
              }
            }}
            supportIcon
            nested
          />
        )
      ).toMatchSnapshot();
    });

    it('preserves native surface attributes and polite status semantics', function surfaceProps() {
      expect(renderToString(<DefaultExample id="saved-notice" role="status" aria-label="Saved" />)).toMatchSnapshot();
    });
  });
});

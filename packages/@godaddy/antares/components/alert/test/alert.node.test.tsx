import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { PlaygroundExample } from '../examples/alert-playground.tsx';
import { EmphasesExample } from '../examples/emphases.tsx';
import { DismissibleExample } from '../examples/dismissible.tsx';
import { WithActionExample } from '../examples/with-action.tsx';
import { CompositionExample } from '../examples/composition.tsx';
import { InteriorExample } from '../examples/interior.tsx';
describe('@godaddy/antares', function antares() {
  describe('#Alert', function alertTests() {
    it('renders the default example', function defaultExample() {
      const html = renderToString(<DefaultExample />);
      expect(html).toMatchSnapshot();
      // The indicator placeholder must hydrate with a numeric size, never NaN.
      expect(html).not.toContain('NaN');
      expect(html).toContain('viewBox="0 0 26 26"');
    });

    it('renders the playground example', function playgroundExample() {
      expect(renderToString(<PlaygroundExample showAction dismissible />)).toMatchSnapshot();
    });

    it('renders the emphases example', function emphasesExample() {
      expect(renderToString(<EmphasesExample />)).toMatchSnapshot();
    });

    it('renders the dismissible example', function dismissibleExample() {
      expect(renderToString(<DismissibleExample />)).toMatchSnapshot();
    });

    it('renders the with-action example', function actionExample() {
      expect(renderToString(<WithActionExample />)).toMatchSnapshot();
    });

    it('renders the composition example', function compositionExample() {
      expect(renderToString(<CompositionExample />)).toMatchSnapshot();
    });

    it('renders the interior example', function interiorExample() {
      expect(renderToString(<InteriorExample />)).toMatchSnapshot();
    });
  });
});

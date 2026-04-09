import { expect, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { WithActionsExample } from '../examples/with-actions.tsx';
import { WithMediaExample } from '../examples/with-media.tsx';
import { HorizontalMediaExample } from '../examples/horizontal-media.tsx';
import { FullscreenExample } from '../examples/fullscreen.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Modal', function modalTests() {
    it('renders DefaultExample', function defaultExample() {
      const html = renderToString(<DefaultExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders WithActionsExample', function withActionsExample() {
      const html = renderToString(<WithActionsExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders WithMediaExample', function withMediaExample() {
      const html = renderToString(<WithMediaExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders HorizontalMediaExample', function horizontalMediaExample() {
      const html = renderToString(<HorizontalMediaExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders FullscreenExample', function fullscreenExample() {
      const html = renderToString(<FullscreenExample />);
      expect(html).toMatchSnapshot();
    });
  });
});

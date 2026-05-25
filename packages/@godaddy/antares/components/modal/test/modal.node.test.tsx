import { expect, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { AlignmentExample } from '../examples/alignment.tsx';
import { WithActionsExample } from '../examples/with-actions.tsx';
import { WithMediaExample } from '../examples/with-media.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Modal', function modalTests() {
    it('renders DefaultExample', function defaultExample() {
      const html = renderToString(<DefaultExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders ControlledExample', function controlledExample() {
      const html = renderToString(<ControlledExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders WithActionsExample', function withActionsExample() {
      const html = renderToString(<WithActionsExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders AlignmentExample', function alignmentExample() {
      const html = renderToString(<AlignmentExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders WithMediaExample', function withMediaExample() {
      const html = renderToString(<WithMediaExample />);
      expect(html).toMatchSnapshot();
    });
  });
});

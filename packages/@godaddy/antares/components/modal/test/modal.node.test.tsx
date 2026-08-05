import { expect, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { ScrollableExample } from '../examples/scrollable.tsx';
import { TriggerlessExample } from '../examples/triggerless.tsx';

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

    it('renders ScrollableExample', function scrollableExample() {
      const html = renderToString(<ScrollableExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders TriggerlessExample', function triggerlessExample() {
      const html = renderToString(<TriggerlessExample />);
      expect(html).toMatchSnapshot();
    });
  });
});

import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ControlledExample } from '../examples/controlled.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { ManilaExample } from '../examples/manila.tsx';
import { OverflowExample } from '../examples/overflow.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Tabs', function tabsTests() {
    it('renders the default example', function defaultExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders the controlled example', function controlledExample() {
      expect(renderToString(<ControlledExample />)).toMatchSnapshot();
    });

    it('renders the disabled example', function disabledExample() {
      expect(renderToString(<DisabledExample />)).toMatchSnapshot();
    });

    it('renders the Manila example', function manilaExample() {
      expect(renderToString(<ManilaExample />)).toMatchSnapshot();
    });

    it('renders the overflow example', function overflowExample() {
      expect(renderToString(<OverflowExample />)).toMatchSnapshot();
    });
  });
});

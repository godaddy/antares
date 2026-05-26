import { describe, expect, it } from 'vitest';
import { DefaultExample } from '../examples/default.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { SidebarNavExample } from '../examples/sidebar-nav.tsx';
import { DismissOnBlurExample } from '../examples/dismiss-on-blur.tsx';
import { FocusScopeExample } from '../examples/focus-scope.tsx';
import { VerticalExample } from '../examples/vertical.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { RefForwardingExample } from '../examples/ref-forwarding.tsx';
import { ClassNamePassthroughExample } from '../examples/classname-passthrough.tsx';
import { PlaygroundExample } from '../examples/inline-drawer-playground.tsx';
import { renderToString } from 'react-dom/server';

describe('@godaddy/antares', function antares() {
  describe('#InlineDrawer', function inlineDrawerTests() {
    it('renders DefaultExample', function defaultExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders ControlledExample', function controlledExample() {
      expect(renderToString(<ControlledExample />)).toMatchSnapshot();
    });

    it('renders SidebarNavExample', function sidebarNavExample() {
      expect(renderToString(<SidebarNavExample />)).toMatchSnapshot();
    });

    it('renders DismissOnBlurExample', function dismissOnBlurExample() {
      expect(renderToString(<DismissOnBlurExample />)).toMatchSnapshot();
    });

    it('renders FocusScopeExample', function focusScopeExample() {
      expect(renderToString(<FocusScopeExample />)).toMatchSnapshot();
    });

    it('renders VerticalExample', function verticalExample() {
      expect(renderToString(<VerticalExample />)).toMatchSnapshot();
    });

    it('renders DisabledExample', function disabledExample() {
      expect(renderToString(<DisabledExample />)).toMatchSnapshot();
    });

    it('renders RefForwardingExample', function refForwardingExample() {
      expect(renderToString(<RefForwardingExample />)).toMatchSnapshot();
    });

    it('renders ClassNamePassthroughExample', function classNamePassthroughExample() {
      expect(renderToString(<ClassNamePassthroughExample />)).toMatchSnapshot();
    });

    it('renders PlaygroundExample', function playgroundExample() {
      expect(renderToString(<PlaygroundExample />)).toMatchSnapshot();
    });
  });
});

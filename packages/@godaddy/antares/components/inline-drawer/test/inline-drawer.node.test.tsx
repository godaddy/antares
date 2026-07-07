import { describe, expect, it } from 'vitest';
import { DefaultExample } from '../examples/default.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { SidebarNavExample } from '../examples/sidebar-nav.tsx';
import { PlacementsExample } from '../examples/placements.tsx';
import { AnimationExample } from '../examples/animation.tsx';
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

    it('renders PlacementsExample', function placementsExample() {
      expect(renderToString(<PlacementsExample />)).toMatchSnapshot();
    });

    it('renders AnimationExample', function animationExample() {
      expect(renderToString(<AnimationExample />)).toMatchSnapshot();
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

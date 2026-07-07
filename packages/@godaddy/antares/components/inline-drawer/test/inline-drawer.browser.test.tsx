import { DefaultExample } from '../examples/default.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { SidebarNavExample } from '../examples/sidebar-nav.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { PlaygroundExample } from '../examples/inline-drawer-playground.tsx';
import { RefForwardingExample, drawerRef, panelRef } from '../examples/ref-forwarding.tsx';
import { ClassNamePassthroughExample } from '../examples/classname-passthrough.tsx';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, it, vi } from 'vitest';
import assume from 'assume';

describe('@godaddy/antares', function antares() {
  describe('#InlineDrawer', function inlineDrawerTests() {
    it('toggles DefaultExample via click', async function defaultClick() {
      const { getByRole } = await render(<DefaultExample />);

      const trigger = getByRole('button', { name: 'Toggle details' }).query();
      assume(trigger?.getAttribute('aria-expanded')).equals('false');

      await getByRole('button', { name: 'Toggle details' }).click();

      await vi.waitFor(async function expanded() {
        assume(trigger?.getAttribute('aria-expanded')).equals('true');
      });

      await getByRole('button', { name: 'Toggle details' }).click();

      await vi.waitFor(async function collapsed() {
        assume(trigger?.getAttribute('aria-expanded')).equals('false');
      });
    });

    it('toggles DefaultExample via keyboard', async function defaultKeyboard() {
      const { getByRole } = await render(<DefaultExample />);

      const trigger = getByRole('button', { name: 'Toggle details' }).query();
      assume(trigger?.getAttribute('aria-expanded')).equals('false');

      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Enter}');

      await vi.waitFor(async function expanded() {
        assume(trigger?.getAttribute('aria-expanded')).equals('true');
      });

      await userEvent.keyboard('{Enter}');

      await vi.waitFor(async function collapsed() {
        assume(trigger?.getAttribute('aria-expanded')).equals('false');
      });
    });

    it('controls ControlledExample via external button', async function controlledToggle() {
      const { getByRole, getByText } = await render(<ControlledExample />);

      assume(getByText('Expanded: false').query()).is.not.equal(null);

      const trigger = getByRole('button', { name: 'Details' }).query();
      assume(trigger?.getAttribute('aria-expanded')).equals('false');

      await getByRole('button', { name: 'Expand' }).click();

      await vi.waitFor(async function expanded() {
        assume(getByText('Expanded: true').query()).is.not.equal(null);
        assume(trigger?.getAttribute('aria-expanded')).equals('true');
      });

      await getByRole('button', { name: 'Collapse' }).click();

      await vi.waitFor(async function collapsed() {
        assume(getByText('Expanded: false').query()).is.not.equal(null);
        assume(trigger?.getAttribute('aria-expanded')).equals('false');
      });
    });

    it('controls ControlledExample via disclosure trigger', async function controlledTrigger() {
      const { getByRole, getByText } = await render(<ControlledExample />);

      await getByRole('button', { name: 'Details' }).click();

      await vi.waitFor(async function expanded() {
        assume(getByText('Expanded: true').query()).is.not.equal(null);
      });

      await getByRole('button', { name: 'Details' }).click();

      await vi.waitFor(async function collapsed() {
        assume(getByText('Expanded: false').query()).is.not.equal(null);
      });
    });

    it('renders SidebarNavExample with peek links visible when collapsed', async function sidebarNav() {
      const { getByRole } = await render(<SidebarNavExample />);

      const trigger = getByRole('button', { name: 'Menu' }).query();
      assume(trigger?.getAttribute('aria-expanded')).equals('true');
      assume(getByRole('link', { name: 'Dashboard' }).query()).is.not.equal(null);

      await getByRole('button', { name: 'Menu' }).click();

      await vi.waitFor(async function collapsed() {
        assume(trigger?.getAttribute('aria-expanded')).equals('false');
        assume(getByRole('link', { name: 'Dashboard' }).query()).is.not.equal(null);
      });

      await getByRole('button', { name: 'Menu' }).click();

      await vi.waitFor(async function expanded() {
        assume(trigger?.getAttribute('aria-expanded')).equals('true');
      });
    });

    it('peek panel stays accessible and is wired to the trigger', async function minSizeA11y() {
      const { getByRole } = await render(<SidebarNavExample />);

      await getByRole('button', { name: 'Menu' }).click();
      await vi.waitFor(async function collapsed() {
        assume(getByRole('button', { name: 'Menu' }).query()?.getAttribute('aria-expanded')).equals('false');
      });

      const trigger = getByRole('button', { name: 'Menu' }).query();
      const panel = getByRole('link', { name: 'Dashboard' }).query()?.closest('[role="group"]') as HTMLElement | null;

      assume(panel).is.not.equal(null);
      assume(panel?.getAttribute('aria-hidden')).equals(null);
      assume(trigger?.getAttribute('aria-controls')).equals(panel?.getAttribute('id'));
      assume(panel?.getAttribute('aria-labelledby')).equals(trigger?.getAttribute('id'));
    });

    it('collapsed panel with minSize allows focus on content', async function minSizeFocus() {
      const { getByRole } = await render(<SidebarNavExample />);

      await getByRole('button', { name: 'Menu' }).click();

      await vi.waitFor(async function collapsed() {
        assume(getByRole('button', { name: 'Menu' }).query()?.getAttribute('aria-expanded')).equals('false');
      });

      const panel = getByRole('group').query();
      assume(panel).is.not.equal(null);
      assume(panel?.hasAttribute('aria-hidden')).equals(false);
    });

    it('does not toggle when isDisabled', async function disabledNoToggle() {
      const { getByRole } = await render(<DisabledExample />);

      const trigger = getByRole('button', { name: 'Trigger' }).query();
      assume(trigger?.getAttribute('aria-expanded')).equals('false');
      assume(trigger?.hasAttribute('data-disabled')).equals(true);

      (trigger as HTMLElement)?.click();

      assume(trigger?.getAttribute('aria-expanded')).equals('false');
    });

    it('bottom placement expands vertically', async function bottomPlacement() {
      const { getByRole } = await render(<PlaygroundExample placement="bottom" />);

      const trigger = getByRole('button', { name: 'Toggle panel' }).query();
      assume(trigger?.getAttribute('aria-expanded')).equals('false');

      await getByRole('button', { name: 'Toggle panel' }).click();

      await vi.waitFor(async function expanded() {
        assume(trigger?.getAttribute('aria-expanded')).equals('true');
      });

      const drawer = document.querySelector('[data-placement="bottom"]');
      assume(drawer).is.not.equal(null);
    });

    it('forwards ref to InlineDrawer root', async function refForwarding() {
      await render(<RefForwardingExample />);

      assume(drawerRef.current).is.not.equal(null);
      assume(drawerRef.current?.tagName).equals('DIV');
      assume(panelRef.current).is.not.equal(null);
      assume(panelRef.current?.getAttribute('role')).equals('group');
    });

    it('toggles via Space key', async function spaceKey() {
      const { getByRole } = await render(<DefaultExample />);

      const trigger = getByRole('button', { name: 'Toggle details' }).query();
      assume(trigger?.getAttribute('aria-expanded')).equals('false');

      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard(' ');

      await vi.waitFor(async function expanded() {
        assume(trigger?.getAttribute('aria-expanded')).equals('true');
      });
    });

    it('sets data-animate=false when animate is false', async function animateOff() {
      await render(<PlaygroundExample animate={false} />);
      assume(document.querySelector('[data-animate="false"]')).is.not.equal(null);
    });

    it('passes className to all sub-components', async function classNamePassthrough() {
      await render(<ClassNamePassthroughExample />);

      assume(document.querySelector('.custom-drawer')).is.not.equal(null);
      assume(document.querySelector('.custom-trigger')).is.not.equal(null);
      assume(document.querySelector('.custom-panel')).is.not.equal(null);
    });

    it('collapsed panel has hidden="until-found"', async function hiddenUntilFound() {
      const { getByRole } = await render(<DefaultExample />);

      const trigger = getByRole('button', { name: 'Toggle details' }).query();
      assume(trigger?.getAttribute('aria-expanded')).equals('false');

      const panel = document.querySelector('[role="group"]');
      assume(panel?.getAttribute('hidden')).equals('until-found');
    });

    it('trigger has aria-expanded attribute', async function ariaExpanded() {
      const { getByRole } = await render(<DefaultExample />);

      const trigger = getByRole('button', { name: 'Toggle details' }).query();
      assume(trigger?.getAttribute('aria-expanded')).equals('false');

      await getByRole('button', { name: 'Toggle details' }).click();

      await vi.waitFor(async function expanded() {
        assume(trigger?.getAttribute('aria-expanded')).equals('true');
      });
    });
  });
});

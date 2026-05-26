import { DefaultExample } from '../examples/default.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { SidebarNavExample } from '../examples/sidebar-nav.tsx';
import { DismissOnBlurExample } from '../examples/dismiss-on-blur.tsx';
import { FocusScopeExample } from '../examples/focus-scope.tsx';
import { VerticalExample } from '../examples/vertical.tsx';
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

    it('renders SidebarNavExample with minSize panel visible when collapsed', async function sidebarNav() {
      const { getByRole, getByText } = await render(<SidebarNavExample />);

      const trigger = getByRole('button', { name: 'Menu' }).query();
      assume(trigger?.getAttribute('aria-expanded')).equals('true');
      assume(getByText('Home').query()).is.not.equal(null);

      await getByRole('button', { name: 'Menu' }).click();

      await vi.waitFor(async function collapsed() {
        assume(trigger?.getAttribute('aria-expanded')).equals('false');
        assume(getByText('Home').query()).is.not.equal(null);
      });

      await getByRole('button', { name: 'Menu' }).click();

      await vi.waitFor(async function expanded() {
        assume(trigger?.getAttribute('aria-expanded')).equals('true');
      });
    });

    it('collapsed panel with minSize has no aria-hidden', async function minSizeA11y() {
      const { getByRole, getByText } = await render(<SidebarNavExample />);

      await getByRole('button', { name: 'Menu' }).click();

      await vi.waitFor(async function collapsed() {
        const trigger = getByRole('button', { name: 'Menu' }).query();
        assume(trigger?.getAttribute('aria-expanded')).equals('false');
      });

      const homeText = getByText('Home').query();
      assume(homeText).is.not.equal(null);
      const panel = homeText?.closest('[role="group"]');
      assume(panel?.getAttribute('aria-hidden')).equals(null);
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

    it('collapses on blur when shouldDismissOnBlur is set', async function dismissOnBlur() {
      const { getByRole } = await render(<DismissOnBlurExample />);

      const trigger = getByRole('button', { name: 'Panel' }).query();
      assume(trigger?.getAttribute('aria-expanded')).equals('true');

      getByRole('button', { name: 'Inside button' }).query()!.focus();
      getByRole('button', { name: 'Outside button' }).query()!.focus();

      await vi.waitFor(async function collapsed() {
        assume(trigger?.getAttribute('aria-expanded')).equals('false');
      });
    });

    it('does not collapse when relatedTarget is null', async function dismissOnBlurNull() {
      const { getByRole } = await render(<DismissOnBlurExample />);

      const trigger = getByRole('button', { name: 'Panel' }).query();
      assume(trigger?.getAttribute('aria-expanded')).equals('true');

      const insideButton = getByRole('button', { name: 'Inside button' }).query();
      insideButton?.focus();
      insideButton?.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: null }));

      assume(trigger?.getAttribute('aria-expanded')).equals('true');
    });

    it('FocusScope traps focus when expanded', async function focusScopeContain() {
      const { getByRole } = await render(<FocusScopeExample />);

      await getByRole('button', { name: 'Action A' }).click();
      await userEvent.keyboard('{Tab}');

      await vi.waitFor(async function focusOnB() {
        assume(document.activeElement?.textContent).equals('Action B');
      });

      await userEvent.keyboard('{Tab}');

      await vi.waitFor(async function focusWrapped() {
        const active = document.activeElement?.textContent;
        const insideDrawer = active === 'Action A' || active === 'Action B' || active === 'Sidebar';
        assume(insideDrawer).equals(true);
      });
    });

    it('does not toggle when isDisabled', async function disabledNoToggle() {
      const { getByRole } = await render(<DisabledExample />);

      const trigger = getByRole('button', { name: 'Trigger' }).query();
      assume(trigger?.getAttribute('aria-expanded')).equals('false');
      assume(trigger?.hasAttribute('data-disabled')).equals(true);

      (trigger as HTMLElement)?.click();

      assume(trigger?.getAttribute('aria-expanded')).equals('false');
    });

    it('top/bottom placement expands vertically', async function verticalPlacement() {
      const { getByRole, getByText } = await render(<VerticalExample />);

      const trigger = getByRole('button', { name: 'Header' }).query();
      assume(trigger?.getAttribute('aria-expanded')).equals('true');

      await getByRole('button', { name: 'Header' }).click();

      await vi.waitFor(async function collapsed() {
        assume(trigger?.getAttribute('aria-expanded')).equals('false');
        assume(getByText('Top drawer content, collapses vertically.').query()).is.not.equal(null);
      });
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

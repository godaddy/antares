import assume from 'assume';
import { createRef } from 'react';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { ControlledExample } from '../examples/controlled.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { ManillaExample } from '../examples/manilla.tsx';
import { OverflowExample } from '../examples/overflow.tsx';
import { RTLExample } from '../examples/rtl.tsx';
import { PlaygroundExample } from '../examples/tabs-playground.tsx';
import { RefsExample } from '../examples/refs.tsx';
import { TypesExample } from '../examples/types.tsx';

function isHTMLDivElement(element: unknown): element is HTMLDivElement {
  return element instanceof HTMLDivElement;
}

function getViewport(tablistName: string): HTMLDivElement {
  const tablist = page.getByRole('tablist', { name: tablistName }).element();
  const viewport = tablist.parentElement;
  if (!(viewport instanceof HTMLDivElement)) throw new Error('Tabs viewport not found');
  return viewport;
}

function isFullyVisible(viewport: HTMLDivElement, tab: HTMLElement): boolean {
  const viewportRect = viewport.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();
  return tabRect.left >= viewportRect.left - 1 && tabRect.right <= viewportRect.right + 1;
}

function getRoot(tablistName: string): HTMLElement {
  const tablist = page.getByRole('tablist', { name: tablistName }).element();
  const root = tablist.closest('[data-design]');
  if (!(root instanceof HTMLElement)) throw new Error('Tabs root not found');
  return root;
}

function getLogicalTarget(viewport: HTMLDivElement, action: 'next' | 'previous', isRTL = false): HTMLElement {
  const tabs = Array.from(viewport.querySelectorAll<HTMLElement>('[role="tab"]'));
  const viewportRect = viewport.getBoundingClientRect();
  const target =
    action === 'next'
      ? tabs.find(function findNextTab(tab) {
          const tabRect = tab.getBoundingClientRect();
          return isRTL ? tabRect.right < viewportRect.right - 1 : tabRect.left > viewportRect.left + 1;
        })
      : tabs.findLast(function findPreviousTab(tab) {
          const tabRect = tab.getBoundingClientRect();
          return isRTL ? tabRect.right > viewportRect.right + 1 : tabRect.left < viewportRect.left - 1;
        });
  if (!target) throw new Error(`No logical ${action} tab is offscreen`);
  return target;
}

describe('@godaddy/antares', function antares() {
  describe('#Tabs', function tabsTests() {
    describe('semantics', function semanticsTests() {
      it('exposes tablist, tab, and panel roles with linked ARIA relationships', async function ariaRelationships() {
        await render(<DefaultExample />);

        const tablist = page.getByRole('tablist', { name: 'Account settings' });
        await expect.element(tablist).toBeVisible();
        const tabs = document.querySelectorAll<HTMLElement>('[role="tab"]');
        const panels = document.querySelectorAll<HTMLElement>('[role="tabpanel"]');

        expect(tabs).toHaveLength(3);
        expect(panels).toHaveLength(1);
        const selectedTab = document.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
        const selectedPanel = panels[0];
        expect(selectedTab?.getAttribute('aria-controls')).toBe(selectedPanel?.id);
        expect(selectedPanel?.getAttribute('aria-labelledby')).toBe(selectedTab?.id);
      });
    });

    describe('refs and types', function refsAndTypesTests() {
      it('forwards object refs to each Tabs component surface', async function forwardsObjectRefs() {
        const tabsRef = createRef<HTMLDivElement>();
        const tabListRef = createRef<HTMLDivElement>();
        const tabRef = createRef<HTMLDivElement>();
        const tabPanelsRef = createRef<HTMLDivElement>();
        const tabPanelRef = createRef<HTMLDivElement>();

        await render(
          <RefsExample
            tabsRef={tabsRef}
            tabListRef={tabListRef}
            tabRef={tabRef}
            tabPanelsRef={tabPanelsRef}
            tabPanelRef={tabPanelRef}
          />
        );

        assume(tabsRef.current instanceof HTMLDivElement).equals(true);
        assume(tabsRef.current?.getAttribute('data-design')).equals('underline');
        assume(tabListRef.current?.getAttribute('role')).equals('tablist');
        assume(tabRef.current?.getAttribute('role')).equals('tab');
        assume(tabPanelsRef.current instanceof HTMLDivElement).equals(true);
        assume(tabPanelRef.current?.getAttribute('role')).equals('tabpanel');
      });

      it('forwards callback refs without losing TabList overflow measurement', async function forwardsCallbackRef() {
        const tabListElement: { current: HTMLDivElement | null } = { current: null };
        await render(
          <OverflowExample
            tabListRef={function tabListRef(element) {
              tabListElement.current = element;
            }}
          />
        );

        await expect.element(page.getByRole('button', { name: 'Next tabs' })).toBeVisible();
        const assignedTabListElement = tabListElement.current;
        if (!isHTMLDivElement(assignedTabListElement)) throw new Error('TabList ref was not assigned');
        assume(assignedTabListElement.getAttribute('role')).equals('tablist');
      });

      it('renders generic collection examples with linked panels', async function genericCollectionTypes() {
        await render(<TypesExample />);

        await expect.element(page.getByRole('tablist', { name: 'Account settings' })).toBeVisible();
        await expect.element(page.getByRole('tabpanel')).toHaveTextContent('Account settings');
      });
    });

    describe('selection', function selectionTests() {
      it('selects the first tab initially and exposes only its panel', async function initialSelection() {
        await render(<DefaultExample />);

        await expect.element(page.getByRole('tab', { name: 'Account' })).toHaveAttribute('aria-selected', 'true');
        await expect.element(page.getByRole('tabpanel')).toHaveTextContent('Account settings');
        await expect.element(page.getByRole('tab', { name: 'Billing' })).toHaveAttribute('aria-selected', 'false');
      });

      it('selects a tab and shows its panel', async function selectsTab() {
        const user = userEvent.setup();
        await render(<DefaultExample />);

        await expect.element(page.getByRole('tablist', { name: 'Account settings' })).toBeVisible();

        await user.click(page.getByRole('tab', { name: 'Billing' }));

        await expect.element(page.getByRole('tab', { name: 'Billing' })).toHaveAttribute('aria-selected', 'true');
        await expect.element(page.getByRole('tabpanel')).toHaveTextContent('Billing settings');
      });

      it('starts with and updates controlled selection', async function controlledSelection() {
        const user = userEvent.setup();
        await render(<ControlledExample />);

        await expect.element(page.getByRole('tab', { name: 'Billing' })).toHaveAttribute('aria-selected', 'true');
        await expect.element(page.getByText('Current selection: billing')).toBeVisible();
        await user.click(page.getByRole('tab', { name: 'Security' }));
        await expect.element(page.getByText('Current selection: security')).toBeVisible();
        await expect.element(page.getByRole('tabpanel')).toHaveTextContent('Security settings');
      });
    });

    describe('keyboard navigation', function keyboardNavigationTests() {
      it('activates tabs automatically with ArrowRight', async function automaticActivation() {
        const user = userEvent.setup();
        await render(<DefaultExample />);
        await user.click(page.getByRole('tab', { name: 'Account' }));

        await user.keyboard('{ArrowRight}');

        await expect.element(page.getByRole('tab', { name: 'Billing' })).toHaveAttribute('aria-selected', 'true');
        await expect.element(page.getByRole('tabpanel')).toHaveTextContent('Billing settings');
      });

      it('requires activation after focus in manual mode', async function manualActivation() {
        const user = userEvent.setup();
        await render(<PlaygroundExample keyboardActivation="manual" />);
        const account = page.getByRole('tab', { name: 'Account' });
        const billing = page.getByRole('tab', { name: 'Billing' });

        await user.click(account);
        await user.keyboard('{ArrowRight}');

        await expect.element(billing).toHaveFocus();
        await expect.element(account).toHaveAttribute('aria-selected', 'true');
        await expect.element(billing).toHaveAttribute('aria-selected', 'false');

        await user.keyboard('{Enter}');

        await expect.element(billing).toHaveAttribute('aria-selected', 'true');
        await expect.element(page.getByRole('tabpanel')).toHaveTextContent('Billing');
      });

      it('supports Arrow, Home, and End navigation', async function keyboardNavigation() {
        const user = userEvent.setup();
        await render(<DefaultExample />);
        await user.click(page.getByRole('tab', { name: 'Billing' }));

        await user.keyboard('{Home}');
        await expect.element(page.getByRole('tab', { name: 'Account' })).toHaveFocus();
        await user.keyboard('{End}');
        await expect.element(page.getByRole('tab', { name: 'Security' })).toHaveFocus();
        await expect.element(page.getByRole('tab', { name: 'Security' })).toHaveAttribute('aria-selected', 'true');
      });
    });

    describe('disabled', function disabledTests() {
      it('skips disabled tabs and exposes disabled semantics', async function disabledNavigation() {
        const user = userEvent.setup();
        await render(<DisabledExample />);
        const disabled = page.getByRole('tab', { name: 'Billing' });

        await expect.element(disabled).toHaveAttribute('aria-disabled', 'true');
        await user.click(page.getByRole('tab', { name: 'Account' }));
        await user.keyboard('{ArrowRight}');
        await expect.element(page.getByRole('tab', { name: 'Security' })).toHaveFocus();
        await expect.element(page.getByRole('tab', { name: 'Security' })).toHaveAttribute('aria-selected', 'true');
      });
    });

    describe('variants and styles', function variantsAndStylesTests() {
      it('exposes focus-visible state for keyboard focus', async function focusVisibleState() {
        const user = userEvent.setup();
        await render(<DefaultExample />);
        await user.click(page.getByRole('tab', { name: 'Account' }));
        await user.keyboard('{ArrowRight}');

        const billing = page.getByRole('tab', { name: 'Billing' });
        await expect.element(billing).toHaveAttribute('data-focus-visible', 'true');

        const tabStyle = getComputedStyle(billing.element());
        expect(tabStyle.outlineStyle).toBe('solid');
        expect(tabStyle.outlineWidth).toBe('2px');
        expect(tabStyle.outlineOffset).toBe('-2px');
      });

      it('uses the chosen intents while an unselected tab is pressed', async function pressedStyles() {
        const user = userEvent.setup();
        await render(<PlaygroundExample keyboardActivation="manual" />);
        const account = page.getByRole('tab', { name: 'Account' });
        const billing = page.getByRole('tab', { name: 'Billing' });

        await user.click(account);
        await user.keyboard('{ArrowRight}');
        await user.keyboard('{Space>}');

        await expect.element(billing).toHaveAttribute('data-pressed', 'true');
        expect(getComputedStyle(billing.element()).borderBottomColor).toBe('rgb(27, 219, 219)');
        await user.keyboard('{/Space}');
      });

      it('renders the Manilla variant with the same tab semantics', async function manillaSemantics() {
        await render(<ManillaExample />);

        await expect.element(page.getByRole('tablist', { name: 'Documents' })).toBeVisible();
        await expect.element(page.getByRole('tab', { name: 'Recent' })).toHaveAttribute('aria-selected', 'true');
        await expect.element(page.getByRole('tabpanel')).toHaveTextContent('Recent documents');
      });

      it('shows a not-allowed cursor for disabled tabs', async function disabledCursor() {
        await render(<DisabledExample />);
        const disabled = page.getByRole('tab', { name: 'Billing' });

        await expect.poll(() => getComputedStyle(disabled.element()).cursor).toBe('not-allowed');
      });

      it('shows a pointer cursor for enabled tabs', async function enabledCursor() {
        await render(<DefaultExample />);
        await expect
          .poll(() => getComputedStyle(page.getByRole('tab', { name: 'Account' }).element()).cursor)
          .toBe('pointer');
      });
    });

    describe('overflow', function overflowTests() {
      describe('navigation', function navigationTests() {
        it('reveals the nearest logical next tab and reaches the LTR end', async function ltrNextBoundary() {
          const user = userEvent.setup();
          await render(<OverflowExample />);
          const viewport = getViewport('Product settings');
          const target = getLogicalTarget(viewport, 'next');

          await user.click(page.getByRole('button', { name: 'Next tabs' }));

          await expect.poll(() => isFullyVisible(viewport, target)).toBe(true);
          viewport.scrollLeft = viewport.scrollWidth - viewport.clientWidth;
          viewport.dispatchEvent(new Event('scroll'));
          await expect.poll(() => viewport.scrollLeft).toBe(viewport.scrollWidth - viewport.clientWidth);
          await expect.element(page.getByRole('button', { name: 'Next tabs' })).toBeDisabled();
          await expect.element(page.getByRole('button', { name: 'Previous tabs' })).not.toBeDisabled();
        });

        it('reveals the nearest logical previous tab after scrolling from the LTR end', async function ltrPreviousBoundary() {
          const user = userEvent.setup();
          await render(<OverflowExample />);
          const viewport = getViewport('Product settings');
          viewport.scrollLeft = viewport.scrollWidth - viewport.clientWidth;
          viewport.dispatchEvent(new Event('scroll'));
          await expect.poll(() => viewport.scrollLeft).toBeGreaterThan(0);
          const target = getLogicalTarget(viewport, 'previous');

          await user.click(page.getByRole('button', { name: 'Previous tabs' }));

          await expect.poll(() => isFullyVisible(viewport, target)).toBe(true);
        });
      });

      describe('resize', function resizeTests() {
        it('keeps overflow state correct while resizing from the scrolled end', async function resizeFromEnd() {
          await render(<OverflowExample />);
          const viewport = getViewport('Product settings');
          viewport.scrollLeft = viewport.scrollWidth - viewport.clientWidth;
          viewport.dispatchEvent(new Event('scroll'));
          await expect.poll(() => viewport.scrollLeft).toBeGreaterThan(0);

          const root = getRoot('Product settings');
          root.style.width = '1000px';
          root.style.maxWidth = '1000px';

          await expect.element(page.getByRole('button', { name: 'Next tabs' })).not.toBeInTheDocument();
        });

        it('updates controls when the available width shrinks and grows', async function resizeOverflow() {
          await render(<OverflowExample maxWidth="1000px" />);
          await expect.element(page.getByRole('button', { name: 'Next tabs' })).not.toBeInTheDocument();
          const root = getRoot('Product settings');
          root.style.width = '320px';
          root.style.maxWidth = '320px';
          await expect.element(page.getByRole('button', { name: 'Next tabs' })).toBeVisible();

          root.style.width = '1000px';
          root.style.maxWidth = '1000px';
          await expect.element(page.getByRole('button', { name: 'Next tabs' })).not.toBeInTheDocument();
        });
      });

      describe('RTL navigation', function rtlNavigationTests() {
        it('moves to logical next and previous tabs with RTL terminal states', async function rtlLogicalBoundaries() {
          const user = userEvent.setup();
          await render(<RTLExample />);
          const viewport = getViewport('Product settings');
          const nextTarget = getLogicalTarget(viewport, 'next', true);

          await user.click(page.getByRole('button', { name: 'Next tabs' }));

          await expect.poll(() => isFullyVisible(viewport, nextTarget)).toBe(true);
          viewport.scrollLeft = -(viewport.scrollWidth - viewport.clientWidth);
          viewport.dispatchEvent(new Event('scroll'));
          await expect
            .poll(() => Math.abs(viewport.scrollLeft))
            .toBeGreaterThanOrEqual(viewport.scrollWidth - viewport.clientWidth - 2);
          await expect.element(page.getByRole('button', { name: 'Next tabs' })).toBeDisabled();
          await expect.element(page.getByRole('button', { name: 'Previous tabs' })).not.toBeDisabled();
          const previousTarget = getLogicalTarget(viewport, 'previous', true);

          await user.click(page.getByRole('button', { name: 'Previous tabs' }));

          await expect.poll(() => isFullyVisible(viewport, previousTarget)).toBe(true);
        });
      });

      describe('keyboard visibility', function keyboardVisibilityTests() {
        it('scrolls focused selected tabs into view with ArrowRight and End', async function keyboardVisibility() {
          const user = userEvent.setup();
          await render(<OverflowExample />);
          const viewport = getViewport('Product settings');
          const overview = page.getByRole('tab', { name: 'Overview' });
          const availability = page.getByRole('tab', { name: 'Availability' });
          const notifications = page.getByRole('tab', { name: 'Notifications' });

          await user.click(overview);
          await user.keyboard('{ArrowRight}');
          await expect.element(availability).toHaveFocus();
          await expect.element(availability).toHaveAttribute('aria-selected', 'true');
          const availabilityElement = availability.element();
          if (!(availabilityElement instanceof HTMLElement)) throw new Error('Availability tab not found');
          await expect.poll(() => isFullyVisible(viewport, availabilityElement)).toBe(true);
          await user.keyboard('{End}');
          await expect.element(notifications).toHaveFocus();
          await expect.element(notifications).toHaveAttribute('aria-selected', 'true');
          const notificationsElement = notifications.element();
          if (!(notificationsElement instanceof HTMLElement)) throw new Error('Notifications tab not found');
          await expect.poll(() => isFullyVisible(viewport, notificationsElement)).toBe(true);
        });
      });

      describe('ref integration', function refIntegrationTests() {
        it('keeps overflow detection when TabList receives a ref', async function refForwarding() {
          const tabListRef = createRef<HTMLDivElement>();
          await render(<OverflowExample tabListRef={tabListRef} />);

          await expect.element(page.getByRole('button', { name: 'Next tabs' })).toBeVisible();
          expect(tabListRef.current).toBeInstanceOf(HTMLDivElement);
        });
      });

      describe('controls', function controlTests() {
        it('does not render overflow controls when all tabs fit', async function noOverflowControls() {
          await render(<DefaultExample />);
          await expect.element(page.getByRole('button', { name: 'Previous tabs' })).not.toBeInTheDocument();
          await expect.element(page.getByRole('button', { name: 'Next tabs' })).not.toBeInTheDocument();
        });

        it('supports localized overflow labels', async function localizedLabels() {
          await render(
            <OverflowExample overflowLabels={{ previous: 'Pestañas anteriores', next: 'Pestañas siguientes' }} />
          );

          await expect.element(page.getByRole('button', { name: 'Pestañas siguientes' })).toBeVisible();
          await expect.element(page.getByRole('button', { name: 'Pestañas anteriores' })).toBeVisible();
        });
      });
    });
  });
});

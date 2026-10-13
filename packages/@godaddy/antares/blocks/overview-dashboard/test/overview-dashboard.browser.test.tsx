import assume from 'assume';
import { page, userEvent } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { waitForSelector } from '#test/utils/wait-for-selector.ts';
import { OverviewDashboard } from '../index.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#OverviewDashboard', function overviewDashboardTests() {
    it('renders the dashboard content and the responsive chart', async function rendersDashboard() {
      const { container, locator } = await render(
        <div style={{ width: '960px' }}>
          <OverviewDashboard />
        </div>
      );

      const frame = container.querySelector('[class*="dashboardFrame"]');
      const shell = container.querySelector('[class*="dashboardShell"]');
      const navigation = container.querySelector('[data-placement="left"]');
      assume(frame).is.not.equal(null);
      assume(shell).is.not.equal(null);
      assume(navigation).is.not.equal(null);
      const navigationContent = container.querySelector('nav[class*="sideNavigation"]');
      const frameHeight = (frame as HTMLElement).getBoundingClientRect().height;
      const shellHeight = (shell as HTMLElement).getBoundingClientRect().height;
      const navigationHeight = (navigation as HTMLElement).getBoundingClientRect().height;
      expect(frameHeight).toBeGreaterThan(0);
      expect(Math.abs(frameHeight - shellHeight)).toBeLessThanOrEqual(1);
      expect(Math.abs(shellHeight - navigationHeight)).toBeLessThanOrEqual(1);
      assume(getComputedStyle(navigation as Element).backgroundColor).is.not.equal('rgba(0, 0, 0, 0)');
      assume(navigationContent).is.not.equal(null);
      expect(getComputedStyle(navigation as Element).backgroundColor).toBe(
        getComputedStyle(navigationContent as Element).backgroundColor
      );
      assume(getComputedStyle(navigation as Element).overflowY).equals('visible');
      assume(getComputedStyle(navigation as Element).overflowX).equals('visible');

      await waitForSelector(container, 'svg');
      await waitForSelector(container, 'svg path');

      assume(locator.getByRole('heading', { name: 'Overview' }).element()).exists();
      assume(locator.getByRole('heading', { name: 'GoDaddy can do more for you' }).element()).exists();
      assume(locator.getByRole('heading', { name: 'Conversations' }).element()).exists();
      assume(locator.getByText('Facebook Marketplace').element()).exists();

      assume(locator.getByRole('img', { name: 'Sales by sales channels donut chart' }).element()).exists();
      assume(locator.getByRole('img', { name: 'Illustration for online appointments' }).element()).exists();
      assume(locator.getByRole('list').all().length).equals(1);
    });

    it('selects navigation items without changing the dashboard content', async function selectsNavigationItem() {
      const user = userEvent.setup();
      const { locator } = await render(
        <div style={{ width: '960px' }}>
          <OverviewDashboard />
        </div>
      );

      const overview = locator.getByRole('heading', { name: 'Overview' });
      const dashboard = locator.getByRole('button', { name: 'Dashboard' });
      const emailSecurity = locator.getByRole('button', { name: 'Advanced Email Security' });

      await user.click(emailSecurity);

      await expect.element(overview).toBeVisible();
      await expect.element(emailSecurity).toHaveAttribute('aria-current', 'page');
      await expect.element(emailSecurity).toHaveAttribute('aria-pressed', 'true');
      await expect.element(dashboard).not.toHaveAttribute('aria-current');
      await expect.element(dashboard).toHaveAttribute('aria-pressed', 'false');
      assume(locator.getByRole('button', { name: 'Admin' }).all().length).equals(0);
    });

    it('temporarily expands the desktop navigation rail on hover and pins it by button', async function togglesDesktopNavigation() {
      const user = userEvent.setup();
      const { container, locator } = await render(
        <div style={{ width: '960px' }}>
          <OverviewDashboard />
        </div>
      );

      const navigation = container.querySelector('[data-placement="left"]') as HTMLElement;
      const sideNavigation = container.querySelector('nav[class*="sideNavigation"]') as HTMLElement;
      const main = container.querySelector('[class*="dashboardMain"]') as HTMLElement;
      const logo = container.querySelector('[class*="sideNavigationLogo"]') as HTMLElement;
      const dashboardButton = locator.getByRole('button', { name: 'Dashboard' });
      await expect.element(locator.getByRole('button', { name: 'Collapse navigation' })).toBeVisible();
      await expect.element(dashboardButton).not.toHaveAttribute('aria-label');
      assume(dashboardButton.element().querySelector('svg')).is.not.equal(null);
      assume(getComputedStyle(logo).display).is.not.equal('none');
      const collapsedLogoBounds = logo.getBoundingClientRect();
      const collapsedDashboardIcon = dashboardButton.element().querySelector('svg') as SVGElement;
      const collapsedDashboardIconBounds = collapsedDashboardIcon.getBoundingClientRect();
      const collapsedLogoCenter = collapsedLogoBounds.left + collapsedLogoBounds.width / 2;
      const collapsedDashboardIconCenter = collapsedDashboardIconBounds.left + collapsedDashboardIconBounds.width / 2;
      expect(Math.abs(collapsedLogoCenter - collapsedDashboardIconCenter)).toBeLessThanOrEqual(4);

      await user.click(locator.getByRole('button', { name: 'Collapse navigation' }));
      const expandButton = container.querySelector('button[aria-label="Expand navigation"]') as HTMLElement;
      assume(expandButton).is.not.equal(null);
      await expect.element(dashboardButton).toHaveAttribute('aria-label', 'Dashboard');
      assume(dashboardButton.element().querySelector('svg')).is.not.equal(null);
      assume(getComputedStyle(logo).display).is.not.equal('none');

      const expandedMainLeft = main.getBoundingClientRect().left;
      assume(getComputedStyle(navigation).transitionProperty).includes('inline-size');
      assume(getComputedStyle(navigation).transitionDuration).includes('0.3s');
      await new Promise(function sampleCollapseTransition(resolve) {
        setTimeout(resolve, 100);
      });
      const closingMainLeft = main.getBoundingClientRect().left;
      await new Promise(function waitForCollapseTransition(resolve) {
        setTimeout(resolve, 250);
      });
      const collapsedMainLeft = main.getBoundingClientRect().left;
      const collapsedMainWidth = main.getBoundingClientRect().width;
      expect(closingMainLeft).toBeLessThan(expandedMainLeft);
      expect(closingMainLeft).toBeGreaterThan(collapsedMainLeft);
      await page.getByRole('document').hover({ position: { x: 500, y: 20 } });
      await expect.element(expandButton).not.toBeVisible();
      await expect.element(dashboardButton).toHaveAttribute('aria-label', 'Dashboard');
      await user.hover(navigation);
      await expect.element(locator.getByRole('button', { name: 'Expand navigation' })).toBeVisible();
      await expect
        .element(locator.getByRole('button', { name: 'Dashboard' }))
        .toHaveAttribute('aria-label', 'Dashboard');
      await new Promise(function sampleHoverExpansion(resolve) {
        setTimeout(resolve, 100);
      });
      const openingMainLeft = main.getBoundingClientRect().left;
      await new Promise(function waitForHoverExpansion(resolve) {
        setTimeout(resolve, 250);
      });
      const hoverExpandedNavigationWidth = sideNavigation.getBoundingClientRect().width;
      expect(Math.abs(openingMainLeft - collapsedMainLeft)).toBeLessThanOrEqual(1);
      expect(Math.abs(main.getBoundingClientRect().left - collapsedMainLeft)).toBeLessThanOrEqual(1);
      expect(Math.abs(main.getBoundingClientRect().width - collapsedMainWidth)).toBeLessThanOrEqual(1);

      await user.click(locator.getByRole('button', { name: 'Expand navigation' }));
      await expect.element(locator.getByRole('button', { name: 'Collapse navigation' })).toBeVisible();
      await new Promise(function samplePinnedExpansion(resolve) {
        setTimeout(resolve, 100);
      });
      expect(sideNavigation.getBoundingClientRect().width).toBeGreaterThanOrEqual(hoverExpandedNavigationWidth - 1);

      await page.getByRole('document').hover({ position: { x: 0, y: 0 } });
      await expect.element(locator.getByRole('button', { name: 'Collapse navigation' })).toBeVisible();

      await user.click(locator.getByRole('button', { name: 'Collapse navigation' }));
      await new Promise(function waitForNavigationContentTransition(resolve) {
        setTimeout(resolve, 350);
      });
      await expect.element(dashboardButton).toHaveAttribute('aria-label', 'Dashboard');
      await page.getByRole('document').hover({ position: { x: 500, y: 20 } });
      await expect.element(expandButton).not.toBeVisible();
    });

    it('places the chart legend beside the donut only when the card is wide enough', async function adaptsLegendPlacement() {
      const wide = await render(
        <div style={{ width: '1600px' }}>
          <OverviewDashboard />
        </div>
      );

      await waitForSelector(wide.container, 'svg path');
      const wideLegend = wide.container.querySelector('[aria-label="Chart legend"]');
      assume(wideLegend).is.not.equal(null);
      assume(getComputedStyle(wideLegend?.parentElement?.parentElement as Element).flexDirection).equals('row');

      const narrow = await render(
        <div style={{ width: '320px' }}>
          <OverviewDashboard />
        </div>
      );

      await waitForSelector(narrow.container, 'svg path');
      const narrowLegend = narrow.container.querySelector('[aria-label="Chart legend"]');
      assume(narrowLegend).is.not.equal(null);
      assume(getComputedStyle(narrowLegend?.parentElement?.parentElement as Element).flexDirection).equals('column');
    });

    it('opens and closes the mobile navigation without changing the dashboard content', async function togglesMobileNavigation() {
      const user = userEvent.setup();
      const { container, locator } = await render(
        <div style={{ width: '320px' }}>
          <OverviewDashboard />
        </div>
      );

      const inlineNavigation = container.querySelector('[data-placement="left"]') as HTMLElement;
      assume(inlineNavigation).is.not.equal(null);
      assume(getComputedStyle(inlineNavigation).display).equals('none');

      await user.click(locator.getByRole('button', { name: 'Open navigation' }));
      const drawer = page.getByRole('dialog', { name: 'Product navigation' });
      await expect.element(drawer).toBeVisible();
      await expect.element(locator.getByRole('heading', { name: 'Overview' })).toBeVisible();

      await user.click(drawer.getByRole('button', { name: 'Collapse navigation' }));
      await expect.element(drawer).not.toBeInTheDocument();
      assume(getComputedStyle(inlineNavigation).display).equals('none');
    });
  });
});

import { page, userEvent } from 'vitest/browser';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { salesChannelData } from '../constants/config.ts';
import { OverviewDashboard } from '../index.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#OverviewDashboard', function overviewDashboardTests() {
    // The default viewport is narrower than the 960px dashboard, so pointer steps would scroll the
    // page sideways and slide the hover rail out from under the cursor.
    beforeAll(async function widenViewport() {
      await page.viewport(1024, 768);
    });

    // `page.viewport` persists across test files, so restore the default afterwards.
    afterAll(async function restoreViewport() {
      await page.viewport(414, 896);
    });

    it('renders the dashboard content and chart', async function rendersDashboard() {
      const { locator } = await render(
        <div style={{ width: '960px' }}>
          <OverviewDashboard />
        </div>
      );

      await expect.element(locator.getByRole('heading', { name: 'Overview' })).toBeVisible();
      await expect.element(locator.getByRole('heading', { name: 'GoDaddy can do more for you' })).toBeVisible();
      await expect.element(locator.getByRole('heading', { name: 'Conversations' })).toBeVisible();
      await expect.element(locator.getByText('Facebook Marketplace')).toBeVisible();
      await expect.element(locator.getByRole('button', { name: 'Restore deleted users' })).toBeVisible();
      await expect.element(locator.getByRole('button', { name: 'Upgrade John Doe' })).toBeVisible();
      await expect.element(locator.getByRole('button', { name: 'Manage Jane Smith' })).toBeVisible();
      await expect.element(locator.getByRole('button', { name: 'Connect Email' })).toBeVisible();

      const expectedSalesTotal = new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 0
      }).format(
        salesChannelData.reduce(function sumSales(total, channel) {
          return total + channel.value;
        }, 0)
      );
      await expect.element(locator.getByText(expectedSalesTotal)).toBeVisible();
      await expect.element(locator.getByText('USD')).toBeVisible();
      await expect
        .element(
          locator.getByRole('img', {
            name: 'Sales by sales channels donut chart. Shopify: $400. Facebook Marketplace: $300. Instagram: $200. Other: $100'
          })
        )
        .toBeVisible();
    });

    it('opens account actions from the avatar menu', async function opensAccountMenu() {
      const user = userEvent.setup();
      const { locator } = await render(
        <div style={{ width: '960px' }}>
          <OverviewDashboard />
        </div>
      );

      const accountMenu = locator.getByRole('button', { name: 'Account menu' });
      await user.click(accountMenu);

      await expect.element(page.getByRole('menu')).toBeVisible();
      await expect.element(page.getByRole('menuitem', { name: 'View profile' })).toBeVisible();
      await expect.element(page.getByRole('menuitem', { name: 'Account settings' })).toBeVisible();
      await expect.element(page.getByRole('menuitem', { name: 'Sign out' })).toBeVisible();

      await user.click(page.getByRole('menuitem', { name: 'Account settings' }));
      await expect.element(accountMenu).toHaveAttribute('aria-expanded', 'false');
      await expect.element(accountMenu).toHaveFocus();
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
      await expect.element(emailSecurity).toHaveAttribute('aria-pressed', 'true');
      await expect.element(dashboard).toHaveAttribute('aria-pressed', 'false');
      await expect.element(emailSecurity).not.toHaveAttribute('aria-current');
      await expect.element(dashboard).not.toHaveAttribute('aria-current');
      await expect.element(locator.getByText('John Doe')).toBeVisible();
    });

    it('temporarily expands the desktop navigation rail on hover and pins it by button', async function togglesDesktopNavigation() {
      const user = userEvent.setup();
      const { locator } = await render(
        <div style={{ width: '960px' }}>
          <OverviewDashboard />
        </div>
      );

      const navigation = locator.getByRole('navigation', { name: 'Product navigation' });
      const dashboardButton = locator.getByRole('button', { name: 'Dashboard' });
      const collapseButton = locator.getByRole('button', { name: 'Collapse navigation' });
      await expect.element(collapseButton).toBeVisible();
      await expect.element(collapseButton).not.toHaveAttribute('aria-pressed');
      await expect.element(dashboardButton).toHaveAttribute('aria-pressed', 'true');

      await user.click(locator.getByRole('button', { name: 'Collapse navigation' }));
      const expandButton = locator.getByRole('button', { name: 'Expand navigation' });
      await expect.element(dashboardButton).toHaveAttribute('aria-label', 'Dashboard');
      await user.hover(navigation);
      await expect.element(locator.getByRole('button', { name: 'Expand navigation' })).toBeVisible();
      await expect
        .element(locator.getByRole('button', { name: 'Dashboard' }))
        .toHaveAttribute('aria-label', 'Dashboard');

      await expect.element(expandButton).toBeVisible();
      await user.click(expandButton);
      await expect.element(locator.getByRole('button', { name: 'Collapse navigation' })).toBeVisible();
      await expect
        .element(locator.getByRole('button', { name: 'Collapse navigation' }))
        .not.toHaveAttribute('aria-pressed');

      await page.getByRole('document').hover({ position: { x: 0, y: 0 } });
      await expect.element(locator.getByRole('button', { name: 'Collapse navigation' })).toBeVisible();

      await user.click(locator.getByRole('button', { name: 'Collapse navigation' }));
      await expect.element(dashboardButton).toHaveAttribute('aria-label', 'Dashboard');
    });

    it('opens and closes the mobile navigation without changing the dashboard content', async function togglesMobileNavigation() {
      const user = userEvent.setup();
      const { locator } = await render(
        <div style={{ width: '320px' }}>
          <OverviewDashboard />
        </div>
      );

      const openNavigation = locator.getByRole('button', { name: 'Open navigation' });
      await expect.element(openNavigation).toBeVisible();
      await user.click(openNavigation);
      const drawer = page.getByRole('dialog', { name: 'Product navigation' });
      await expect.element(drawer).toBeVisible();
      await expect.element(locator.getByRole('heading', { name: 'Overview' })).toBeVisible();
      const mobileNavigation = drawer.getByRole('navigation', { name: 'Product navigation' });
      await expect.element(mobileNavigation).toBeVisible();

      const closeNavigation = drawer.getByRole('button', { name: 'Close navigation' });
      await expect.element(closeNavigation).not.toHaveAttribute('aria-pressed');
      await user.click(closeNavigation);
      await expect.element(drawer).not.toBeInTheDocument();
    });

    it('closes the mobile navigation on desktop resize without changing the pinned preference', async function handlesDesktopResize() {
      const user = userEvent.setup();
      const { container, locator } = await render(
        <div style={{ width: '960px' }}>
          <OverviewDashboard />
        </div>
      );

      const viewport = container.firstElementChild as HTMLElement;
      await user.click(locator.getByRole('button', { name: 'Collapse navigation' }));
      const expandButton = locator.getByRole('button', { name: 'Expand navigation' });

      viewport.style.width = '320px';
      await expect.element(locator.getByRole('button', { name: 'Open navigation' })).toBeVisible();
      await user.click(locator.getByRole('button', { name: 'Open navigation' }));

      const drawer = page.getByRole('dialog', { name: 'Product navigation' });
      await expect.element(drawer).toBeVisible();

      viewport.style.width = '960px';
      await expect.element(drawer).not.toBeInTheDocument();
      await expect.element(expandButton).toBeVisible();
    });
  });
});

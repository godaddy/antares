import { render } from 'vitest-browser-react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { DefaultExample } from '../examples/default.tsx';
import { WithTrendExample } from '../examples/with-trend.tsx';
import { CompactExample } from '../examples/compact.tsx';

describe('@godaddy/uxcore', function uxcore() {
  describe('#MetricsLockup', function metricsLockupTests() {
    it('renders title, data, and description', async function rendersBasic() {
      const { getByText } = await render(<DefaultExample />);

      await expect.element(getByText('Total Revenue')).toBeVisible();
      await expect.element(getByText('$1,234.56')).toBeVisible();
      await expect.element(getByText('vs. last month')).toBeVisible();
    });

    it('shows tooltip on focus of info trigger', async function showsTooltip() {
      const { getByRole } = await render(<DefaultExample />);

      await userEvent.keyboard('{Tab}');

      await vi.waitFor(async function open() {
        const tooltip = getByRole('tooltip').query();
        expect(tooltip).not.toEqual(null);
        expect(tooltip?.textContent).toContain('The total revenue across all products for the selected period.');
      });
    });

    it('pins tooltip open on click and unpins on second click', async function pinsTooltip() {
      const { getByRole } = await render(<DefaultExample />);
      const button = getByRole('button', { name: 'More information' });

      await userEvent.click(button);

      await vi.waitFor(async function open() {
        expect(getByRole('tooltip').query()).not.toEqual(null);
      });

      // tooltip stays visible even without focus/hover
      await userEvent.tab();
      expect(getByRole('tooltip').query()).not.toEqual(null);

      // second click unpins
      await userEvent.click(button);

      await vi.waitFor(async function unpinned() {
        expect(getByRole('tooltip').query()).toEqual(null);
      });
    });

    it('hides tooltip on Escape', async function hidesOnEscape() {
      const { getByRole } = await render(<DefaultExample />);

      await userEvent.keyboard('{Tab}');

      await vi.waitFor(async function open() {
        expect(getByRole('tooltip').query()).not.toEqual(null);
      });

      await userEvent.keyboard('{Escape}');

      await vi.waitFor(async function close() {
        expect(getByRole('tooltip').query()).toEqual(null);
      });
    });

    it('renders trend icon for positive trend', async function rendersTrendPositive() {
      const { container, getByText } = await render(<WithTrendExample />);

      await expect.element(getByText('+3.2% vs. last month')).toBeVisible();
      expect(container.innerHTML).toContain('data-trend="positive"');
    });

    it('renders trend icon for negative trend', async function rendersTrendNegative() {
      const { container } = await render(<DefaultExample trend="negative" />);

      expect(container.innerHTML).toContain('data-trend="negative"');
    });

    it('renders trend icon for neutral trend', async function rendersTrendNeutral() {
      const { container } = await render(<DefaultExample trend="neutral" />);

      expect(container.innerHTML).toContain('data-trend="neutral"');
    });

    it('renders compact layout with data and description inline', async function rendersCompactInline() {
      const { getByText } = await render(<CompactExample />);

      const [dataEl] = getByText('8,021').elements();
      expect(dataEl?.parentElement?.style.flexDirection).toEqual('row');
    });

    it('renders info trigger when title and titleInfo are both provided', async function rendersInfoTrigger() {
      const { getByRole } = await render(<DefaultExample />);

      await expect.element(getByRole('button', { name: 'More information' })).toBeVisible();
    });

    it('does not render info trigger when titleInfo is provided without title', async function noInfoTriggerWithoutTitle() {
      const { getByRole } = await render(<DefaultExample title={undefined} />);

      expect(getByRole('button', { name: 'More information' }).query()).toEqual(null);
    });

    it('does not render trend icon when trend is provided without description', async function noTrendIconWithoutDescription() {
      const { container } = await render(<DefaultExample trend="positive" description={undefined} />);

      expect(container.innerHTML).not.toContain('data-trend=');
    });

    it('renders numeric 0 as data value', async function rendersZeroData() {
      const { getByText } = await render(<DefaultExample data={0} />);

      await expect.element(getByText('0')).toBeVisible();
    });

    it('renders without error when all optional props are omitted', async function emptyRender() {
      const { getByRole, container } = await render(
        <DefaultExample title={undefined} titleInfo={undefined} data={undefined} description={undefined} />
      );

      expect(getByRole('button').query()).toEqual(null);
      expect(container.textContent?.trim()).toEqual('');
    });
  });
});

import { render } from 'vitest-browser-react';
import { describe, it, expect } from 'vitest';
import { DefaultExample } from '../examples/default.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { WithLimitExample } from '../examples/with-limit.tsx';
import { OnChangeExample } from '../examples/on-change.tsx';
import { DefaultActiveExample } from '../examples/default-active.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Pagination', function paginationTests() {
    it('renders prev/next buttons and dots for 5 pages', async function rendersDefault() {
      const { getByRole } = await render(<DefaultExample />);
      const prev = getByRole('button', { name: 'Go to previous page' });
      const next = getByRole('button', { name: 'Go to next page' });
      const dots = getByRole('group', { name: 'Dots' });

      await expect.element(prev).toBeVisible();
      await expect.element(next).toBeVisible();
      await expect.element(dots).toBeVisible();
      await expect.element(prev).toBeDisabled();
      await expect.element(next).not.toBeDisabled();
    });

    it('navigates forward and backward in uncontrolled mode', async function navigatesUncontrolled() {
      const { getByRole } = await render(<DefaultExample />);
      const prev = getByRole('button', { name: 'Go to previous page' });
      const next = getByRole('button', { name: 'Go to next page' });
      const dots = getByRole('group', { name: 'Dots' });

      await expect.element(prev).toBeDisabled();
      await next.click();
      await expect.element(prev).not.toBeDisabled();

      const dotElements = dots.elements().flatMap(function getDots(el) {
        return Array.from(el.children);
      });
      expect(dotElements[1]?.className).toContain('selected');
    });

    it('disables next button on the last page', async function disablesNextAtLast() {
      const { getByRole } = await render(<DefaultExample />);
      const next = getByRole('button', { name: 'Go to next page' });

      await next.click();
      await next.click();
      await next.click();
      await next.click();

      await expect.element(next).toBeDisabled();
    });

    it('disables prev at start and does not go below 0', async function prevClampedAtZero() {
      const { getByRole } = await render(<DefaultExample />);
      const prev = getByRole('button', { name: 'Go to previous page' });
      const next = getByRole('button', { name: 'Go to next page' });

      await expect.element(prev).toBeDisabled();
      await next.click();
      await prev.click();
      await expect.element(prev).toBeDisabled();
    });

    it('controls the active index via activeIndex prop', async function controlled() {
      const { getByRole, getByText } = await render(<ControlledExample />);
      const prev = getByRole('button', { name: 'Go to previous page' });
      const next = getByRole('button', { name: 'Go to next page' });

      await expect.element(prev).not.toBeDisabled();
      await expect.element(next).not.toBeDisabled();

      await expect.element(getByText('Current page: 2')).toBeInTheDocument();
      await next.click();
      await expect.element(getByText('Current page: 3')).toBeInTheDocument();
      await expect.element(next).toBeDisabled();
      await expect.element(prev).not.toBeDisabled();

      await prev.click();
      await prev.click();
      await prev.click();
      await expect.element(getByText('Current page: 0')).toBeInTheDocument();
      await expect.element(prev).toBeDisabled();
      await expect.element(next).not.toBeDisabled();
    });

    it('derives 4 dots from total=10 and limit=3', async function derivesDotsFromLimit() {
      const { getByRole } = await render(<WithLimitExample />);
      const dots = getByRole('group', { name: 'Dots' });
      const dotElements = dots.elements().flatMap(function getDots(el) {
        return Array.from(el.children);
      });

      expect(dotElements).toHaveLength(4);
    });

    it('fires onChange when navigating in uncontrolled mode', async function firesOnChange() {
      const { getByRole, getByText } = await render(<OnChangeExample />);
      const next = getByRole('button', { name: 'Go to next page' });
      const prev = getByRole('button', { name: 'Go to previous page' });

      await expect.element(getByText('onChange: none')).toBeInTheDocument();
      await next.click();
      await expect.element(getByText('onChange: 1')).toBeInTheDocument();
      await next.click();
      await expect.element(getByText('onChange: 2')).toBeInTheDocument();
      await prev.click();
      await expect.element(getByText('onChange: 1')).toBeInTheDocument();
    });

    it('starts at defaultActiveIndex when provided', async function defaultActive() {
      const { getByRole } = await render(<DefaultActiveExample />);
      const prev = getByRole('button', { name: 'Go to previous page' });
      const dots = getByRole('group', { name: 'Dots' });

      await expect.element(prev).not.toBeDisabled();

      const dotElements = dots.elements().flatMap(function getDots(el) {
        return Array.from(el.children);
      });
      expect(dotElements[2]?.className).toContain('selected');
    });
  });
});

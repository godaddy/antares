import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import { DefaultExample } from '../examples/default.tsx';
import { PageCountKnownExample } from '../examples/page-count-known.tsx';
import { PageCountUnknownExample } from '../examples/page-count-unknown.tsx';
import { PaginationDotsExample } from '../examples/dots.tsx';
import { PlaygroundExample } from '../examples/pagination-playground.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Pagination', function paginationTests() {
    it('navigates forward and backward in uncontrolled mode', async function navigatesUncontrolled() {
      const { getByRole } = await render(<DefaultExample />);
      const previous = getByRole('button', { name: 'Previous' });
      const next = getByRole('button', { name: 'Next' });

      await expect.element(previous).toBeDisabled();
      await next.click();
      await expect.element(previous).not.toBeDisabled();
      await next.click();
      await previous.click();
      await expect.element(previous).not.toBeDisabled();
    });

    it('clamps the next button on the last page', async function clampsLastPage() {
      const { getByRole } = await render(<DefaultExample />);
      const next = getByRole('button', { name: 'Next' });

      await next.click();
      await next.click();
      await next.click();
      await next.click();

      await expect.element(next).toBeDisabled();
    });

    it('keeps controlled page state synchronized through the input context', async function keepsControlledState() {
      const { getByRole } = await render(<PageCountKnownExample />);
      const next = getByRole('button', { name: 'Next' });
      const input = getByRole('spinbutton', { name: 'Current page' });

      await expect.element(input).toHaveValue(1);
      await next.click();
      await expect.element(input).toHaveValue(2);
    });

    it('starts the uncontrolled input at page one', async function startsInputAtPageOne() {
      const { getByRole } = await render(<DefaultExample />);
      await expect.element(getByRole('spinbutton', { name: 'Current page' })).toHaveValue(1);
    });

    it('keeps next available when pageCount is unknown', async function keepsUnknownNextAvailable() {
      const { getByRole } = await render(<PageCountUnknownExample />);
      await expect.element(getByRole('button', { name: 'Next' })).not.toBeDisabled();
    });

    it.each([
      Number.NaN,
      Number.POSITIVE_INFINITY
    ])('treats non-finite pageCount as unknown (%s)', async function handlesNonFinitePageCount(pageCount) {
      const { container, getByRole } = await render(<PlaygroundExample composition="dots" pageCount={pageCount} />);

      expect(container.querySelectorAll('[data-pagination-dot]')).toHaveLength(0);
      await expect.element(getByRole('button', { name: 'Next' })).not.toBeDisabled();
    });

    it('navigates forward when pageCount is unknown', async function navigatesUnknownPageCount() {
      const { getByRole } = await render(<PageCountUnknownExample />);
      const input = getByRole('spinbutton', { name: 'Current page' });

      await getByRole('button', { name: 'Next' }).click();
      await expect.element(input).toHaveValue(2);
    });

    it('propagates isDisabled through composed controls', async function propagatesDisabledState() {
      const { getByRole } = await render(<PlaygroundExample isDisabled />);
      await expect.element(getByRole('button', { name: 'Previous' })).toBeDisabled();
      await expect.element(getByRole('button', { name: 'Next' })).toBeDisabled();
      const input = getByRole('spinbutton', { name: 'Current page' });

      await expect.element(input).toBeDisabled();
      await expect.element(input).toHaveStyle({ opacity: '0.4', cursor: 'not-allowed' });
    });

    it('renders passive PaginationDots from page state', async function rendersPaginationDots() {
      const { container } = await render(<PaginationDotsExample />);
      expect(container.querySelectorAll('[data-pagination-dot]')).toHaveLength(5);
    });

    it('updates the active PaginationDots indicator after navigation', async function updatesPaginationDots() {
      const { container, getByRole } = await render(<PaginationDotsExample />);
      const dots = container.querySelectorAll('[data-pagination-dot]');

      expect(dots[0]?.getAttribute('data-active')).toBe('true');
      await getByRole('button', { name: 'Next' }).click();
      expect(dots[0]?.getAttribute('data-active')).toBe('false');
      expect(dots[1]?.getAttribute('data-active')).toBe('true');
    });

    it('does not render PaginationDots when pageCount is zero', async function omitsPaginationDotsForZeroPages() {
      const { container } = await render(<PlaygroundExample composition="dots" pageCount={0} />);

      expect(container.querySelectorAll('[data-pagination-dot]')).toHaveLength(0);
    });

    it('disables the composed controls when pageCount is zero', async function disablesZeroPageCount() {
      const { getByRole } = await render(<PlaygroundExample pageCount={0} />);

      await expect.element(getByRole('button', { name: 'Previous' })).toBeDisabled();
      await expect.element(getByRole('button', { name: 'Next' })).toBeDisabled();
      await expect.element(getByRole('spinbutton', { name: 'Current page' })).toBeDisabled();
    });

    it('accepts keyboard input through the composed Input', async function acceptsKeyboardInput() {
      const user = userEvent.setup();
      const { getByRole } = await render(<PageCountKnownExample />);
      const input = getByRole('spinbutton', { name: 'Current page' });

      await input.fill('3');
      await user.keyboard('{Enter}');
      await expect.element(input).toHaveValue(3);
    });

    it('ignores non-integer keyboard input', async function ignoresNonIntegerInput() {
      const user = userEvent.setup();
      const { getByRole } = await render(<PageCountKnownExample />);
      const input = getByRole('spinbutton', { name: 'Current page' });

      await input.fill('2.5');
      await user.keyboard('{Enter}');
      await getByRole('button', { name: 'Next' }).click();
      await expect.element(input).toHaveValue(2);
    });
  });
});

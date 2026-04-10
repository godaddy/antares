import { render } from 'vitest-browser-react';
import { describe, it, expect } from 'vitest';
import { DefaultExample } from '../examples/default.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { ExternalControlsControlledExample } from '../examples/external-controls-controlled.tsx';
import { ExternalControlsUncontrolledExample } from '../examples/external-controls-uncontrolled.tsx';
import { HideControlsExample } from '../examples/hide-controls.tsx';
import { EventsExample } from '../examples/events.tsx';
import { RTLDirectionExample } from '../examples/rtl-direction.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Carousel', function carouselTests() {
    it('renders the default carousel', async function rendersDefault() {
      const { getByRole, getByText } = await render(<DefaultExample />);
      const prev = getByRole('button', { name: 'Go to previous page', includeHidden: true });
      const next = getByRole('button', { name: 'Go to next page', includeHidden: true });
      const dots = getByRole('group', { name: 'Dots' });

      await expect.element(getByText('Slide 1', { exact: true })).not.toHaveAttribute('aria-hidden');
      await expect.element(getByText('Slide 2', { exact: true })).toHaveAttribute('aria-hidden', 'true');
      await expect.element(getByText('Slide 3', { exact: true })).toHaveAttribute('aria-hidden', 'true');

      await expect.element(prev).not.toBeVisible();
      await expect.element(prev).toBeDisabled();

      await expect.element(next).toBeVisible();
      await expect.element(next).not.toBeDisabled();
      await expect.element(dots).toBeVisible();
    });

    it('reveals the previous button after navigating forward', async function revealsPrev() {
      const { getByRole } = await render(<DefaultExample />);
      const prev = getByRole('button', { name: 'Go to previous page', includeHidden: true });
      const next = getByRole('button', { name: 'Go to next page' });

      await expect.element(prev).not.toBeVisible();
      await next.click();
      await expect.element(prev).toBeVisible();
    });

    it('hides the next button on the last slide', async function hidesNextAtLast() {
      const { getByRole, getByText } = await render(<DefaultExample />);

      const next = getByRole('button', { name: 'Go to next page', includeHidden: true });

      await expect.element(next).toBeVisible();
      await next.click();
      await next.click();

      await expect.element(next).not.toBeVisible();
      await expect.element(getByText('Slide 1', { exact: true })).toHaveAttribute('aria-hidden', 'true');
      await expect.element(getByText('Slide 2', { exact: true })).toHaveAttribute('aria-hidden', 'true');
      await expect.element(getByText('Slide 3', { exact: true })).not.toHaveAttribute('aria-hidden');
    });

    it('navigates controlled carousel via built-in buttons', async function controlledNav() {
      const { getByRole } = await render(<ControlledExample />);
      const prev = getByRole('button', { name: 'Go to previous page', includeHidden: true });
      const next = getByRole('button', { name: 'Go to next page', includeHidden: true });

      await expect.element(prev).toBeVisible();
      await expect.element(next).toBeVisible();

      await next.click();
      await expect.element(prev).toBeVisible();
      await expect.element(next).not.toBeVisible();
      await expect.element(next).toBeDisabled();

      await prev.click();
      await prev.click();
      await expect.element(prev).not.toBeVisible();
      await expect.element(prev).toBeDisabled();
      await expect.element(next).toBeVisible();
    });

    it('navigates external controlled carousel via external buttons', async function navigatesExternalControlled() {
      const { getByRole } = await render(<ExternalControlsControlledExample />);
      const prev = getByRole('button', { name: 'External prev slide' });
      const next = getByRole('button', { name: 'External next slide' });

      await prev.click();
      await expect.element(prev).toBeDisabled();

      await next.click();
      await next.click();
      await expect.element(next).toBeDisabled();
    });

    it('navigates external uncontrolled carousel via external buttons', async function navigatesExternalUncontrolled() {
      const { getByRole, getByText } = await render(<ExternalControlsUncontrolledExample />);
      const prev = getByRole('button', { name: 'External prev slide' });
      const next = getByRole('button', { name: 'External next slide' });

      await expect.element(getByText('Slide 1', { exact: true })).not.toHaveAttribute('aria-hidden');
      await expect.element(getByText('Slide 2', { exact: true })).toHaveAttribute('aria-hidden', 'true');
      await expect.element(getByText('Slide 3', { exact: true })).toHaveAttribute('aria-hidden', 'true');

      await next.click();
      await expect.element(getByText('Slide 1', { exact: true })).toHaveAttribute('aria-hidden', 'true');
      await expect.element(getByText('Slide 2', { exact: true })).not.toHaveAttribute('aria-hidden');
      await expect.element(getByText('Slide 3', { exact: true })).toHaveAttribute('aria-hidden', 'true');

      await next.click();
      await expect.element(getByText('Slide 1', { exact: true })).toHaveAttribute('aria-hidden', 'true');
      await expect.element(getByText('Slide 2', { exact: true })).toHaveAttribute('aria-hidden', 'true');
      await expect.element(getByText('Slide 3', { exact: true })).not.toHaveAttribute('aria-hidden');

      await prev.click();
      await expect.element(getByText('Slide 1', { exact: true })).toHaveAttribute('aria-hidden', 'true');
      await expect.element(getByText('Slide 2', { exact: true })).not.toHaveAttribute('aria-hidden');
      await expect.element(getByText('Slide 3', { exact: true })).toHaveAttribute('aria-hidden', 'true');
    });

    it('hides the navigation controls', async function hidesNavigationControls() {
      const { getByRole, getByText } = await render(<HideControlsExample />);
      const prev = getByRole('button', { name: 'Go to previous page', includeHidden: true });
      const next = getByRole('button', { name: 'Go to next page', includeHidden: true });
      const dots = getByRole('group', { name: 'Dots' });

      await expect.element(getByText('Slide 1', { exact: true })).not.toHaveAttribute('aria-hidden');
      await expect.element(getByText('Slide 2', { exact: true })).toHaveAttribute('aria-hidden', 'true');
      await expect.element(getByText('Slide 3', { exact: true })).toHaveAttribute('aria-hidden', 'true');

      expect(prev).not.toBeInTheDocument();
      expect(next).not.toBeInTheDocument();
      expect(dots).not.toBeInTheDocument();
    });

    it('fires onChange when navigating slides', async function firesOnChange() {
      const { getByRole, getByText } = await render(<EventsExample />);
      const prev = getByRole('button', { name: 'Go to previous page', includeHidden: true });
      const next = getByRole('button', { name: 'Go to next page', includeHidden: true });

      await expect.element(getByText('Listening for change events...')).toBeInTheDocument();
      await expect.element(getByText('Listening for prev events...')).toBeInTheDocument();
      await expect.element(getByText('Listening for next events...')).toBeInTheDocument();
      await prev.click();
      expect(getByText('onChange: 1, firstSlide: false, lastSlide: false')).toBeInTheDocument();
      expect(getByText('onPrev: 1, firstSlide: false, lastSlide: false')).toBeInTheDocument();

      await prev.click();
      expect(getByText('onChange: 0, firstSlide: true, lastSlide: false')).toBeInTheDocument();
      expect(getByText('onPrev: 0, firstSlide: true, lastSlide: false')).toBeInTheDocument();

      await next.click();
      expect(getByText('onChange: 1, firstSlide: false, lastSlide: false')).toBeInTheDocument();
      expect(getByText('onNext: 1, firstSlide: false, lastSlide: false')).toBeInTheDocument();
      await next.click();
      expect(getByText('onChange: 2, firstSlide: false, lastSlide: true')).toBeInTheDocument();
      expect(getByText('onNext: 2, firstSlide: false, lastSlide: true')).toBeInTheDocument();
    });
  });

  it('renders the rtl direction example', async function rendersRtlDirection() {
    const { getByRole } = await render(<RTLDirectionExample />);
    const prev = getByRole('button', { name: 'Go to previous page', includeHidden: true });
    const next = getByRole('button', { name: 'Go to next page', includeHidden: true });

    await expect.element(prev).not.toBeVisible();
    await expect.element(prev).toBeDisabled();
    await expect.element(next).toBeVisible();
    await expect.element(next).not.toBeDisabled();
  });
});

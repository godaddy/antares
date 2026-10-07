import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { DefaultExample } from '../examples/default.tsx';
import { EmptyExample } from '../examples/empty.tsx';
import { LayerPropsExample } from '../examples/layer-props.tsx';
import { NavigationExample } from '../examples/navigation.tsx';
import { NoStepsExample } from '../examples/no-steps.tsx';
import { ComposedNavigationExample } from '../examples/composed-navigation.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Wizard', function wizardTests() {
    it('wires reordered navigation slots, raised footer, and both close slots', async function composedControls() {
      await render(<ComposedNavigationExample />);
      const trigger = page.getByRole('button', { name: 'Open composed wizard' });
      await userEvent.click(trigger);
      const dialog = page.getByRole('dialog', { name: 'Composed workflow' });
      const footer = dialog.getByTestId('wizard-footer');
      expect(footer.element().getAttribute('data-elevation')).toBe('raised');
      expect(footer.element().textContent).toContain('NextPreviousRevisit reviewCancel');
      await expect.element(dialog.getByRole('button', { name: 'Previous' })).toBeDisabled();
      await userEvent.click(dialog.getByRole('button', { name: 'Next' }));
      await expect.element(dialog.getByRole('region', { name: 'Review' })).toBeVisible();
      await userEvent.click(dialog.getByRole('button', { name: 'Cancel' }));
      await expect.element(dialog).not.toBeInTheDocument();
      await expect.element(trigger).toHaveFocus();

      await userEvent.click(trigger);
      await userEvent.click(page.getByRole('button', { name: 'Close' }));
      await expect.element(page.getByRole('dialog', { name: 'Composed workflow' })).not.toBeInTheDocument();
    });

    it('merges an authored press handler and lets local Footer presentation override the context', async function consumerOverrides() {
      let presses = 0;
      await render(<ComposedNavigationExample footerElevation="base" onNextPress={() => presses++} />);
      await userEvent.click(page.getByRole('button', { name: 'Open composed wizard' }));
      const dialog = page.getByRole('dialog', { name: 'Composed workflow' });
      expect(dialog.getByTestId('wizard-footer').element().getAttribute('data-elevation')).toBe('base');
      await userEvent.click(dialog.getByRole('button', { name: 'Next' }));
      expect(presses).toBe(1);
      await expect.element(dialog.getByRole('region', { name: 'Review' })).toBeVisible();
    });

    it('disables unvisited destinations and lets the menu and custom control revisit displayed steps', async function visitedMenu() {
      await render(<ComposedNavigationExample />);
      await userEvent.click(page.getByRole('button', { name: 'Open composed wizard' }));
      const dialog = page.getByRole('dialog', { name: 'Composed workflow' });
      await userEvent.click(dialog.getByRole('button', { name: 'Steps' }));
      await expect.element(page.getByRole('menuitemradio', { name: 'Review' })).toBeDisabled();
      await expect.element(page.getByRole('menuitemradio', { name: 'Confirm' })).toBeDisabled();
      await userEvent.keyboard('{Escape}');
      await userEvent.click(dialog.getByRole('button', { name: 'Next' }));
      await userEvent.click(dialog.getByRole('button', { name: 'Next' }));
      await expect.element(dialog.getByRole('button', { name: 'Next' })).toBeDisabled();
      await userEvent.click(dialog.getByRole('button', { name: 'Previous' }));
      await userEvent.click(dialog.getByRole('button', { name: 'Previous' }));
      await userEvent.click(dialog.getByRole('button', { name: 'Steps' }));
      await expect.element(page.getByRole('menuitemradio', { name: 'Confirm' })).toBeEnabled();
      await userEvent.click(page.getByRole('menuitemradio', { name: 'Confirm' }));
      await expect.element(dialog.getByRole('region', { name: 'Confirm' })).toBeVisible();
      await userEvent.click(dialog.getByRole('button', { name: 'Previous' }));
      await userEvent.click(dialog.getByRole('button', { name: 'Previous' }));
      await userEvent.click(dialog.getByRole('button', { name: 'Revisit review' }));
      await expect.element(dialog.getByRole('region', { name: 'Review' })).toBeVisible();
    });
    it('opens a named full-screen dialog with the first labeled static step and restores focus on close', async function openAndClose() {
      await render(<DefaultExample />);
      const trigger = page.getByRole('button', { name: 'Start setup' });
      await userEvent.click(trigger);

      const dialog = page.getByRole('dialog', { name: 'Setup' });
      await expect.element(dialog).toBeVisible();
      await expect.element(dialog.getByRole('region', { name: 'Details' })).toBeVisible();
      await expect.element(dialog.getByRole('region', { name: 'Review', includeHidden: true })).not.toBeVisible();
      expect(getComputedStyle(dialog.element()).inlineSize).toBe(`${window.innerWidth}px`);
      expect(getComputedStyle(dialog.element()).blockSize).toBe(`${window.innerHeight}px`);

      await userEvent.click(dialog.getByRole('button', { name: 'Close' }));
      await expect.element(dialog).not.toBeInTheDocument();
      await expect.element(trigger).toHaveFocus();
    });

    it('closes on Escape and does not dismiss on backdrop interaction', async function dismissal() {
      await render(<DefaultExample />);
      await userEvent.click(page.getByRole('button', { name: 'Start setup' }));
      const dialog = page.getByRole('dialog', { name: 'Setup' });
      const backdrop = dialog.element().parentElement?.parentElement;
      if (!backdrop) throw new Error('Missing backdrop');
      backdrop.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0 }));
      backdrop.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }));
      await expect.element(dialog).toBeVisible();

      await userEvent.keyboard('{Escape}');
      await expect.element(dialog).not.toBeInTheDocument();
      await expect.element(page.getByRole('button', { name: 'Start setup' })).toHaveFocus();
    });

    it('opens with an empty collection and accessible dialog name', async function emptySteps() {
      await render(<EmptyExample />);
      await userEvent.click(page.getByRole('button', { name: 'Open empty wizard' }));
      const dialog = page.getByRole('dialog', { name: 'Empty workflow' });
      await expect.element(dialog).toBeVisible();
      expect(dialog.element().querySelectorAll('[role="region"]')).toHaveLength(0);
    });

    it('opens without a step collection', async function missingSteps() {
      await render(<NoStepsExample />);
      await userEvent.click(page.getByRole('button', { name: 'Open without steps' }));
      await expect.element(page.getByRole('dialog', { name: 'No steps yet' })).toBeVisible();
    });

    it('routes the primary props to the dialog and the layer bags to their layers', async function layers() {
      await render(<LayerPropsExample />);
      await userEvent.click(page.getByRole('button', { name: 'Open custom wizard' }));
      const dialog = page.getByRole('dialog', { name: 'Custom workflow' }).element();
      expect(dialog.classList.contains('custom-dialog')).toBe(true);
      expect(dialog.parentElement?.classList.contains('custom-container')).toBe(true);
      expect(dialog.parentElement?.parentElement?.classList.contains('custom-overlay')).toBe(true);
      await expect.element(page.getByRole('region', { name: 'First step' })).toBeVisible();
    });

    it('navigates adjacent steps, records actual visits, and revisits visited steps through public state', async function navigation() {
      const requests: unknown[] = [];
      await render(<NavigationExample onStepChange={(key, detail) => requests.push([key, detail])} />);
      await userEvent.click(page.getByRole('button', { name: 'Open navigation' }));
      const dialog = page.getByRole('dialog', { name: 'Navigation' });
      const details = dialog.getByRole('region', { name: 'Details' });
      await expect.element(details).toBeVisible();
      await expect.element(details.getByLabelText('Position')).toHaveTextContent('0');
      await expect.element(details.getByLabelText('Step order')).toHaveTextContent('details, review, confirm');
      await expect.element(details.getByLabelText('Visited steps')).toHaveTextContent('details');
      await expect.element(details.getByRole('button', { name: 'Previous' })).toBeDisabled();
      await userEvent.click(details.getByRole('button', { name: 'Review directly' }));
      expect(requests).toHaveLength(0);

      await userEvent.click(details.getByRole('button', { name: 'Next' }));
      const review = dialog.getByRole('region', { name: 'Review' });
      await expect.element(review).toBeVisible();
      await expect.element(review.getByLabelText('Visited steps')).toHaveTextContent('details, review');
      await userEvent.click(review.getByRole('button', { name: 'Next' }));
      const confirm = dialog.getByRole('region', { name: 'Confirm' });
      await expect.element(confirm.getByRole('button', { name: 'Next' })).toBeDisabled();
      await userEvent.click(confirm.getByRole('button', { name: 'Previous' }));
      await userEvent.click(review.getByRole('button', { name: 'Previous' }));
      await userEvent.click(details.getByRole('button', { name: 'Review directly' }));
      await expect.element(review).toBeVisible();
      expect(requests).toEqual([
        ['review', { previousStep: 'details', reason: 'next' }],
        ['confirm', { previousStep: 'review', reason: 'next' }],
        ['review', { previousStep: 'confirm', reason: 'previous' }],
        ['details', { previousStep: 'review', reason: 'previous' }],
        ['review', { previousStep: 'details', reason: 'menu' }]
      ]);
    });

    it('treats controlled navigation as a request until accepted, without recording rejected visits', async function controlledNavigation() {
      const requests: unknown[] = [];
      const onStepChange = (key: unknown, detail: unknown) => requests.push([key, detail]);
      const screen = await render(<NavigationExample activeStep="details" onStepChange={onStepChange} />);
      await userEvent.click(page.getByRole('button', { name: 'Open navigation' }));
      const dialog = page.getByRole('dialog', { name: 'Navigation' });
      const details = dialog.getByRole('region', { name: 'Details' });
      await userEvent.click(details.getByRole('button', { name: 'Next' }));
      await expect.element(details).toBeVisible();
      await expect.element(details.getByLabelText('Visited steps')).toHaveTextContent('details');
      await userEvent.click(details.getByRole('button', { name: 'Review directly' }));
      expect(requests).toEqual([['review', { previousStep: 'details', reason: 'next' }]]);

      await screen.rerender(<NavigationExample activeStep="review" onStepChange={onStepChange} />);
      const review = dialog.getByRole('region', { name: 'Review' });
      await expect.element(review).toBeVisible();
      await expect.element(review.getByLabelText('Visited steps')).toHaveTextContent('details, review');
      await screen.rerender(<NavigationExample activeStep="unknown" onStepChange={onStepChange} />);
      await expect.element(dialog.getByRole('region', { name: 'Review', includeHidden: true })).not.toBeVisible();
      await expect.element(dialog.getByRole('region', { name: 'Details', includeHidden: true })).not.toBeVisible();
      expect(requests).toHaveLength(1);
    });

    it('starts at a valid default key and ignores later changes to the default', async function defaults() {
      const screen = await render(<NavigationExample defaultActiveStep="review" />);
      await userEvent.click(page.getByRole('button', { name: 'Open navigation' }));
      const dialog = page.getByRole('dialog', { name: 'Navigation' });
      const review = dialog.getByRole('region', { name: 'Review' });
      await expect.element(review).toBeVisible();
      await expect.element(review.getByLabelText('Visited steps')).toHaveTextContent('review');
      await expect.element(review.getByLabelText('Position')).toHaveTextContent('1');
      await screen.rerender(<NavigationExample defaultActiveStep="details" />);
      await expect.element(review).toBeVisible();
    });

    it('uses the first collection key when the default key is unavailable', async function missingDefault() {
      await render(<NavigationExample defaultActiveStep="absent" />);
      await userEvent.click(page.getByRole('button', { name: 'Open navigation' }));
      const details = page.getByRole('dialog', { name: 'Navigation' }).getByRole('region', { name: 'Details' });
      await expect.element(details).toBeVisible();
      await expect.element(details.getByLabelText('Visited steps')).toHaveTextContent('details');
    });
  });
});

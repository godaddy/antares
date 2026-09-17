import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { cdp, page, userEvent } from 'vitest/browser';
import { ActionsExample } from '../examples/actions.tsx';
import { SelectionExample } from '../examples/selection.tsx';
import { InteractionsExample } from '../examples/interactions.tsx';
import { resetHover } from '#test/utils/test-helpers.tsx';
import { CustomizationExample } from '../examples/customization.tsx';
import { CollectionExample } from '../examples/collection.tsx';
import { ContainerQueryExample } from '../examples/container-query.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Card', function cardTests() {
    it('updates controlled standalone selection once from body and indicator', async function controlledSelection() {
      const { getByRole, getByText, getByTestId } = await render(<SelectionExample />);
      await userEvent.click(getByText('Selectable card content'));
      await expect.element(getByRole('checkbox', { name: 'Select this card' })).toBeChecked();
      await expect.element(getByText('Selection changes: 1')).toBeInTheDocument();
      await userEvent.click(getByTestId('card-selection-indicator'));
      await expect.element(getByRole('checkbox', { name: 'Select this card' })).not.toBeChecked();
      await expect.element(getByText('Selection changes: 2')).toBeInTheDocument();
    });

    it.each([
      'action',
      'navigation'
    ] as const)('disables the primary %s independently of selection', async function disabledPrimary(primary) {
      const { getByRole, getByText, getByTestId } = await render(
        <InteractionsExample primary={primary} isPrimaryDisabled />
      );
      await userEvent.click(getByText('One: copy this text without changing selection.'));
      await expect.element(getByText('Primary activations: 0')).toBeInTheDocument();
      await userEvent.click(getByTestId('indicator-One'));
      await expect.element(getByRole('checkbox', { name: 'Option one' })).toBeChecked();
      await userEvent.click(getByRole('button', { name: 'Independent One' }));
      await expect.element(getByText('Independent activations: 1')).toBeInTheDocument();
      await expect.element(getByText('Primary activations: 0')).toBeInTheDocument();
    });

    it('dispatches the primary action from body activation', async function bodyAction() {
      const { getByText } = await render(<ActionsExample />);
      await userEvent.click(getByText('Open details'));
      await expect.element(getByText('Independent action (1)')).toBeInTheDocument();
    });

    it('keeps a nested action independent', async function nestedAction() {
      const { getByRole, getByText } = await render(<ActionsExample />);
      await userEvent.click(getByRole('button', { name: /Independent action/ }));
      await expect.element(getByText('Independent action (10)')).toBeInTheDocument();
    });

    it('toggles its enclosing selection control from the indicator', async function toggleSelection() {
      const { getByRole, getByTestId } = await render(<SelectionExample />);
      const card = getByRole('checkbox', { name: 'Select this card' });
      await userEvent.click(getByTestId('card-selection-indicator'));
      await expect.element(card).toBeChecked();
    });

    it('toggles selection from ordinary Card body content', async function toggleBodySelection() {
      const { getByRole, getByText } = await render(<SelectionExample />);
      const card = getByRole('checkbox', { name: 'Select this card' });
      await userEvent.click(getByText('Selectable card content'));
      await expect.element(card).toBeChecked();
    });

    it('keeps the primary link native and sibling actions independent', async function nativeNavigation() {
      const { getByRole } = await render(<ActionsExample />);
      await expect.element(getByRole('link', { name: 'About this product' })).toHaveAttribute('href', '/about');
      await expect.element(getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    it('keeps combined navigation and selection independent', async function combinedControls() {
      const { getByRole, getByTestId } = await render(<SelectionExample />);
      await expect.element(getByRole('link', { name: 'Open details' })).toHaveAttribute('href', '/details');
      const checkbox = getByRole('checkbox', { name: 'Select details' });
      await userEvent.click(getByTestId('combined-selection-indicator'));
      await expect.element(checkbox).toBeChecked();
    });
  });
});

async function moveMouse(x: number, y: number, type: string, button: 'left' | 'right' | 'none' = 'none') {
  const frame = (window.frameElement as HTMLElement | null)?.getBoundingClientRect();
  const session = cdp() as unknown as {
    send(method: string, params: Record<string, unknown>): Promise<unknown>;
  };
  await session.send('Input.dispatchMouseEvent', {
    type,
    x: x * (frame ? frame.width / window.innerWidth : 1) + (frame?.left ?? 0),
    y: y * (frame ? frame.height / window.innerHeight : 1) + (frame?.top ?? 0),
    button,
    buttons: type === 'mouseReleased' ? 0 : button === 'left' ? 1 : button === 'right' ? 2 : 0,
    clickCount: type === 'mouseMoved' ? 0 : 1
  });
}

async function dragText(element: HTMLElement) {
  const bounds = element.getBoundingClientRect();
  const x = bounds.left + 1;
  const y = bounds.top + bounds.height / 2;
  await moveMouse(x, y, 'mouseMoved');
  await moveMouse(x, y, 'mousePressed', 'left');
  for (let step = 1; step <= 12; step++) {
    await moveMouse(x + (Math.min(bounds.width - 4, 110) * step) / 12, y, 'mouseMoved', 'left');
  }
  await moveMouse(x + Math.min(bounds.width - 4, 110), y, 'mouseReleased', 'left');
}

describe('@godaddy/antares', function packageTests() {
  describe('#Card interactions', function interactions() {
    beforeEach(resetHover);

    afterEach(function clearSelection() {
      window.getSelection()?.removeAllRanges();
      history.replaceState(null, '', `${location.pathname}${location.search}`);
    });

    it('provides a native link context target over Card padding', async function backgroundLink() {
      const { container } = await render(<ActionsExample />);
      const card = container.querySelector<HTMLAnchorElement>('a[href="/about"]')?.closest<HTMLElement>('[data-card]');
      expect(card).not.toBeNull();
      let destination: string | null = null;
      card!.addEventListener('contextmenu', function captureContext(event) {
        destination = (event.target as Element).closest('a')?.getAttribute('href') ?? null;
        event.preventDefault();
      });
      const bounds = card!.getBoundingClientRect();
      await moveMouse(bounds.left + 4, bounds.top + 4, 'mouseMoved');
      await moveMouse(bounds.left + 4, bounds.top + 4, 'mousePressed', 'right');
      await moveMouse(bounds.left + 4, bounds.top + 4, 'mouseReleased', 'right');
      expect(destination).toBe('/about');
    });

    it('lets users drag-select body text without navigation', async function selectBodyText() {
      const { container } = await render(<ActionsExample />);
      const link = container.querySelector<HTMLAnchorElement>('a[href="/about"]')!;
      let activations = 0;
      link.addEventListener('click', function preventTestNavigation(event) {
        if (window.getSelection()?.isCollapsed) activations++;
        event.preventDefault();
      });
      await dragText(link.closest('[data-card]')!.querySelector<HTMLElement>('span')!);
      expect(window.getSelection()?.toString().length).toBeGreaterThan(3);
      expect(activations).toBe(0);
    });

    it('opens the native destination in another tab from a middle click', async function middleClick() {
      const { container } = await render(<ActionsExample />);
      const card = container.querySelector<HTMLAnchorElement>('a[href="/about"]')!.closest<HTMLElement>('[data-card]')!;
      interface TargetInfo {
        targetId: string;
        url: string;
      }
      const session = cdp() as unknown as {
        send(method: 'Target.getTargets'): Promise<{ targetInfos: TargetInfo[] }>;
        send(method: 'Target.closeTarget', params: { targetId: string }): Promise<unknown>;
      };
      const initialIds = new Set(
        (await session.send('Target.getTargets')).targetInfos.map((target) => target.targetId)
      );
      const destination = new URL('/about', location.href).href;
      try {
        await userEvent.click(card, { button: 'middle', position: { x: 4, y: 4 } });
        await expect
          .poll(async function openedDestination() {
            const { targetInfos } = await session.send('Target.getTargets');
            return targetInfos.some((target) => !initialIds.has(target.targetId) && target.url === destination);
          })
          .toBe(true);
      } finally {
        const { targetInfos } = await session.send('Target.getTargets');
        for (const target of targetInfos) {
          if (!initialIds.has(target.targetId) && target.url === destination) {
            await session.send('Target.closeTarget', { targetId: target.targetId });
          }
        }
      }
    });

    it('does not press an action card while dragging its text', async function selectActionText() {
      const { container, getByText } = await render(<ActionsExample />);
      await dragText(container.querySelector<HTMLElement>('[data-card] > span')!);
      expect(window.getSelection()?.toString().length).toBeGreaterThan(3);
      await expect.element(getByText('Independent action (0)')).toBeInTheDocument();
    });

    it('uses the native checkbox as the only selection keyboard stop', async function selectionKeyboard() {
      const { getByRole } = await render(<SelectionExample />);
      const checkbox = getByRole('checkbox', { name: 'Select this card' });
      await userEvent.tab();
      await expect.element(checkbox).toHaveFocus();
      await userEvent.keyboard(' ');
      await expect.element(checkbox).toBeChecked();
    });

    it.each([
      'checkbox',
      'radio'
    ] as const)('keeps action and %s selection independent', async function combinedAction(kind) {
      const { getByRole, getByText, getByTestId } = await render(<InteractionsExample kind={kind} primary="action" />);
      const control = getByRole(kind, { name: 'Option one' });
      await userEvent.click(getByText('One: copy this text without changing selection.'));
      await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
      await expect.element(control).not.toBeChecked();
      await userEvent.click(getByTestId('indicator-One'));
      await expect.element(control).toBeChecked();
      await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
    });

    it('keeps native navigation and checkbox selection independent', async function combinedNavigation() {
      const { getByRole, getByText, getByTestId } = await render(<InteractionsExample primary="navigation" />);
      await userEvent.click(getByRole('link', { name: 'Option one' }), { position: { x: 4, y: 4 } });
      await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
      await expect.element(getByRole('checkbox', { name: 'Option one' })).not.toBeChecked();
      await userEvent.click(getByTestId('indicator-One'));
      await expect.element(getByRole('checkbox', { name: 'Option one' })).toBeChecked();
      await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
    });

    it('navigates from body text while keeping inner buttons and links independent', async function composedNavigation() {
      const { getByRole, getByText } = await render(<InteractionsExample primary="navigation" />);
      await userEvent.click(getByText('One: copy this text without changing selection.'));
      await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
      expect(location.hash).toBe('#card-review-target');
      await userEvent.click(getByRole('button', { name: 'Independent One' }));
      await userEvent.click(getByRole('link', { name: 'Independent link One' }));
      await expect.element(getByText('Independent activations: 2')).toBeInTheDocument();
      await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
      expect(location.hash).toBe('#independent-destination');
      await expect.element(getByRole('checkbox', { name: 'Option one' })).not.toBeChecked();
    });

    it('exposes primary navigation to the keyboard separately from selection', async function navigationKeyboard() {
      const { getByRole, getByText } = await render(<InteractionsExample primary="navigation" />);
      await userEvent.tab();
      await expect.element(getByRole('link', { name: 'Option one' })).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
      await userEvent.tab();
      await expect.element(getByRole('button', { name: 'Independent One' })).toHaveFocus();
      await userEvent.tab();
      await expect.element(getByRole('checkbox', { name: 'Option one' })).toHaveFocus();
      await userEvent.keyboard(' ');
      await expect.element(getByRole('checkbox', { name: 'Option one' })).toBeChecked();
      await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
    });

    it('does not select a card while dragging its text', async function selectCardText() {
      const { getByRole, getByText } = await render(<InteractionsExample />);
      await dragText(getByText('One: copy this text without changing selection.').element() as HTMLElement);
      expect(window.getSelection()?.toString().length).toBeGreaterThan(3);
      await expect.element(getByRole('checkbox', { name: 'Option one' })).not.toBeChecked();
    });

    it('leaves independent actions usable when selection is disabled', async function disabledSelection() {
      const { getByRole, getByText } = await render(<InteractionsExample isDisabled primary="action" />);
      await expect.element(getByRole('checkbox', { name: 'Option one' })).toBeDisabled();
      await userEvent.click(getByText('One: copy this text without changing selection.'));
      await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
      await userEvent.click(getByRole('button', { name: 'Independent One' }));
      await expect.element(getByText('Independent activations: 1')).toBeInTheDocument();
    });

    it('does not select from corner spacing, editable text, or a portaled menu', async function independentRegions() {
      const { getByRole, getByText, getByTestId } = await render(<InteractionsExample />);
      await userEvent.click(getByTestId('corner-One'), { position: { x: 1, y: 1 } });
      await userEvent.click(getByTestId('editor-One'));
      await userEvent.click(getByRole('button', { name: 'Menu One' }));
      await userEvent.click(getByRole('menuitem', { name: 'Menu action One' }));
      await expect.element(getByText('Independent activations: 1')).toBeInTheDocument();
      await expect.element(getByRole('checkbox', { name: 'Option one' })).not.toBeChecked();
    });

    it('retains radio arrow navigation and single selection', async function radioKeyboard() {
      const { getByRole, getByTestId } = await render(<InteractionsExample kind="radio" />);
      await userEvent.click(getByTestId('indicator-One'));
      await userEvent.keyboard('{ArrowRight}');
      await expect.element(getByRole('radio', { name: 'Option two' })).toBeChecked();
      await expect.element(getByRole('radio', { name: 'Option two' })).toHaveFocus();
      await expect.element(getByRole('radio', { name: 'Option one' })).not.toBeChecked();
      await userEvent.click(getByTestId('indicator-Two'));
      await expect.element(getByRole('radio', { name: 'Option two' })).toBeChecked();
    });

    it('preserves checkbox form values and reset behavior', async function formReset() {
      const { getByRole, getByText, getByTestId } = await render(<InteractionsExample defaultSelected />);
      await userEvent.click(getByTestId('indicator-One'));
      await userEvent.click(getByRole('button', { name: 'Submit choices' }));
      await expect.element(getByText('Submitted: empty')).toBeInTheDocument();
      await userEvent.click(getByRole('button', { name: 'Reset choices' }));
      await expect.element(getByRole('checkbox', { name: 'Option one' })).toBeChecked();
      await userEvent.click(getByRole('button', { name: 'Submit choices' }));
      await expect.element(getByText('Submitted: one')).toBeInTheDocument();
    });

    it('gives the Card a selected appearance when its input changes', async function selectedSurface() {
      const { container, getByTestId } = await render(<InteractionsExample />);
      const card = container.querySelector<HTMLElement>('[data-card]')!;
      const initialBorder = getComputedStyle(card).borderColor;
      await userEvent.click(getByTestId('indicator-One'));
      expect(getComputedStyle(card).borderColor).not.toBe(initialBorder);
    });

    it('selects a radio card from its body content', async function radioBodySelection() {
      const { getByRole, getByText } = await render(<InteractionsExample kind="radio" />);
      await userEvent.click(getByText('One: copy this text without changing selection.'));
      await expect.element(getByRole('radio', { name: 'Option one' })).toBeChecked();
    });

    it('reveals and marks a mixed, required, invalid selection', async function mixedSelection() {
      const { container, getByRole, getByTestId } = await render(
        <InteractionsExample isIndeterminate isRequired isInvalid visibility="auto" />
      );
      const checkbox = getByRole('checkbox', { name: 'Option one' });
      await expect.element(checkbox).toHaveAttribute('aria-invalid', 'true');
      await expect.element(checkbox).toBeRequired();
      const indicator = getByTestId('indicator-One');
      await expect.element(indicator).toHaveAttribute('data-indeterminate', 'true');
      expect(getComputedStyle(indicator.element()).opacity).toBe('1');
      expect(container.querySelector('[data-card]')).toHaveAttribute('data-card-indeterminate', 'true');
    });

    it('rings the surface for its own controls only', async function focusRing() {
      const { container } = await render(<InteractionsExample primary="navigation" />);
      const card = container.querySelector<HTMLElement>('[data-card]')!;

      await userEvent.tab();
      expect(getComputedStyle(card).outlineStyle).toBe('solid');
      await userEvent.tab();
      expect(getComputedStyle(card).outlineStyle).toBe('none');
      await userEvent.tab();
      expect(getComputedStyle(card).outlineStyle).toBe('solid');
    });

    it('drops the interactive affordance from a disabled primary', async function disabledAffordance() {
      const { container } = await render(<InteractionsExample primary="action" isPrimaryDisabled />);
      expect(container.querySelector('[data-card]')).toHaveAttribute('data-card', 'static');
    });

    it('keeps read-only selection unchanged from body and indicator clicks', async function readOnlySelection() {
      const { getByRole, getByText, getByTestId } = await render(<InteractionsExample isReadOnly />);
      await userEvent.click(getByText('One: copy this text without changing selection.'));
      await userEvent.click(getByTestId('indicator-One'));
      await expect.element(getByRole('checkbox', { name: 'Option one' })).not.toBeChecked();
    });
  });
});

describe('@godaddy/antares', function packageTests() {
  describe('#Card props', function cardProps() {
    it('forwards Card refs and layout props for checkbox and radio selection', async function cardProps() {
      const { container, getByRole, getByTestId } = await render(<CustomizationExample />);
      const checkboxCard = container.querySelector<HTMLElement>('.review-checkbox-card');
      const radioCard = container.querySelector<HTMLElement>('.review-radio-card');

      expect(checkboxCard).not.toBeNull();
      expect(radioCard).not.toBeNull();
      expect(checkboxCard?.style.padding).toBe('var(--sp-sm)');
      expect(checkboxCard?.style.gap).toBe('var(--sp-xs)');
      expect(getComputedStyle(checkboxCard!).flexDirection).toBe('row');
      expect(radioCard?.style.padding).toBe('var(--sp-md)');
      expect(radioCard?.style.gap).toBe('var(--sp-lg)');
      await expect.element(getByTestId('props-ref-status')).toHaveTextContent('Refs ready');
      await expect.element(getByRole('link', { name: 'Linked content ref' })).toBeInTheDocument();
      expect(getByTestId('props-static-content').element().tagName).toBe('DIV');
      expect(getByTestId('props-linked-content').element().tagName).toBe('SECTION');
      await userEvent.click(getByRole('link', { name: 'Custom content link' }));
      expect(location.hash).toBe('#custom-content-link');
      history.replaceState(null, '', `${location.pathname}${location.search}`);
    });

    it('evaluates selection render props and controlled group changes once', async function renderPropState() {
      const { container, getByRole, getByTestId, getByText } = await render(<CustomizationExample />);
      const checkboxCard = container.querySelector<HTMLElement>('.review-checkbox-card')!;
      const radioCard = container.querySelector<HTMLElement>('.review-radio-card')!;

      expect(checkboxCard).toHaveClass('unselected');
      expect(checkboxCard.style.borderColor).toBe('rgb(4, 5, 6)');
      expect(radioCard).toHaveClass('unselected');
      expect(radioCard.style.borderColor).toBe('rgb(10, 11, 12)');

      await userEvent.click(getByTestId('props-checkbox-indicator'));
      await expect.element(getByRole('checkbox', { name: 'Checkbox props card' })).toBeChecked();
      expect(checkboxCard).toHaveClass('selected');
      expect(checkboxCard.style.borderColor).toBe('rgb(1, 2, 3)');
      await expect.element(getByText('Checkbox changes: 1')).toBeInTheDocument();

      await userEvent.click(getByTestId('props-radio-indicator'));
      await expect.element(getByRole('radio', { name: 'Radio props card' })).toBeChecked();
      expect(radioCard).toHaveClass('selected');
      expect(radioCard.style.borderColor).toBe('rgb(7, 8, 9)');
    });

    it('renders an indicator on a Card without selection', async function staticIndicator() {
      const { getByTestId } = await render(<CustomizationExample />);
      const indicator = getByTestId('props-static-indicator').element();

      await expect.element(getByTestId('props-static-indicator')).toHaveAttribute('aria-hidden', 'true');
      expect(indicator.closest('[data-card]')?.querySelector('[data-card-selection-control]')).toBeNull();
    });

    it('lets consumers override shared Content defaults independently of navigation', async function contentOverrides() {
      const { getByRole, getByTestId } = await render(<CustomizationExample />);
      await expect.element(getByRole('link', { name: 'Primary destination' })).toBeInTheDocument();
      const content = getByTestId('custom-content').element() as HTMLElement;
      expect(content.style.padding).toBe('var(--sp-lg)');
      expect(content.style.gap).toBe('var(--sp-sm)');
      expect(getComputedStyle(content).overflow).toBe('auto');
      expect(parseFloat(getComputedStyle(content).paddingTop)).toBeGreaterThan(0);
      expect(parseFloat(getComputedStyle(content).paddingLeft)).toBeGreaterThan(0);
    });
  });
});

function bounds(element: Element) {
  return element.getBoundingClientRect();
}

describe('@godaddy/antares', function packageTests() {
  describe('#Card layout', function cardLayoutTests() {
    it('stacks media in a narrow container', async function narrowContainer() {
      await page.viewport(420, 800);
      const { getByTestId } = await render(<ContainerQueryExample />);
      const media = bounds(getByTestId('container-query-media').element());
      const content = bounds(getByTestId('container-query-content').element());

      expect(media.bottom).toBeLessThanOrEqual(content.top);
    });

    it('places media beside content in a wide container', async function wideContainer() {
      await page.viewport(800, 800);
      const { getByTestId } = await render(<ContainerQueryExample />);
      const media = bounds(getByTestId('container-query-media').element());
      const content = bounds(getByTestId('container-query-content').element());

      expect(media.right).toBeLessThanOrEqual(content.left);
    });

    it('keeps collection actions aligned at the bottom of equal-height cards', async function alignedCollection() {
      await page.viewport(1000, 800);
      const { getByTestId } = await render(<CollectionExample />);
      const cards = [0, 1, 2].map(function card(index) {
        return bounds(getByTestId(`collection-card-${index}`).element());
      });
      const actions = [0, 1, 2].map(function action(index) {
        return bounds(getByTestId(`collection-action-${index}`).element());
      });

      expect(cards[0].height).toBeCloseTo(cards[1].height);
      expect(cards[1].height).toBeCloseTo(cards[2].height);
      expect(actions[0].bottom).toBeCloseTo(actions[1].bottom);
      expect(actions[1].bottom).toBeCloseTo(actions[2].bottom);
    });
  });
});

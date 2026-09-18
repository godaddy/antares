import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { cdp, page, userEvent } from 'vitest/browser';
import { ActionsExample } from '../examples/actions.tsx';
import { CheckboxExample } from '../examples/checkbox.tsx';
import { InteractionsExample } from '../examples/interactions.tsx';
import { LinkExample } from '../examples/link.tsx';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { CustomizationExample } from '../examples/customization.tsx';
import { LayoutExample } from '../examples/layout.tsx';
import { NestedExample } from '../examples/nested.tsx';
import { RadioExample } from '../examples/radio.tsx';

describe('@godaddy/antares', function packageTests() {
  beforeAll(preloadTestIcons);

  describe('#Card', function cardTests() {
    it('toggles standalone selection once from the indicator', async function standaloneSelection() {
      const { getByRole, getByTestId } = await render(<CheckboxExample />);
      await userEvent.click(getByTestId('card-selection-indicator'));
      await expect.element(getByRole('checkbox', { name: 'Automatic renewal' })).toBeChecked();
      await userEvent.click(getByTestId('card-selection-indicator'));
      await expect.element(getByRole('checkbox', { name: 'Automatic renewal' })).not.toBeChecked();
    });

    it('disables the primary action independently of selection', async function disabledPrimaryAction() {
      const { getByRole, getByText, getByTestId } = await render(
        <InteractionsExample primary="action" isPrimaryDisabled />
      );
      await expect.element(getByRole('button', { name: 'Option one' })).toBeDisabled();
      await expect.element(getByText('Primary activations: 0')).toBeInTheDocument();
      await userEvent.click(getByTestId('indicator-One'));
      await expect.element(getByRole('checkbox', { name: 'Option one' })).toBeChecked();
      await userEvent.click(getByRole('button', { name: 'Independent One' }));
      await expect.element(getByText('Independent activations: 1')).toBeInTheDocument();
      await expect.element(getByText('Primary activations: 0')).toBeInTheDocument();
    });

    it('disables the primary link', async function disabledPrimaryLink() {
      const { getByRole, getByText } = await render(<InteractionsExample primary="navigation" isPrimaryDisabled />);
      await expect.element(getByRole('link', { name: 'Option one' })).toBeDisabled();
      await expect.element(getByText('Primary activations: 0')).toBeInTheDocument();
    });

    it('dispatches the primary action from body activation', async function bodyAction() {
      const { getByRole } = await render(<ActionsExample />);
      await userEvent.click(getByRole('button', { name: 'Join mailing list' }), { position: { x: 4, y: 4 } });
      await expect.element(getByRole('dialog', { name: 'Join our mailing list' })).toBeVisible();
    });

    it('keeps a nested action independent', async function nestedAction() {
      const { getByRole } = await render(<ActionsExample />);
      await userEvent.click(getByRole('button', { name: 'Save' }));
      await expect.element(getByRole('button', { name: 'Saved' })).toBeInTheDocument();
      await expect.element(getByRole('dialog', { name: 'Join our mailing list' })).not.toBeInTheDocument();
    });

    it('opens a subscribe card inside a modal', async function subscribeModal() {
      const { getByRole } = await render(<ActionsExample />);
      await userEvent.click(getByRole('button', { name: 'Join mailing list' }), { position: { x: 4, y: 4 } });
      await expect.element(getByRole('dialog', { name: 'Join our mailing list' })).toBeVisible();
      await expect.element(getByRole('textbox', { name: 'Email' })).toBeVisible();

      const actions = getByRole('button', { name: 'Cancel' }).element().closest('[role="group"]') as HTMLElement;
      expect(parseFloat(getComputedStyle(actions).paddingTop)).toBe(0);
      expect(parseFloat(getComputedStyle(actions).paddingLeft)).toBe(0);

      await userEvent.click(getByRole('button', { name: 'Cancel' }));
      await expect.element(getByRole('dialog', { name: 'Join our mailing list' })).not.toBeInTheDocument();
    });

    it('toggles its enclosing selection control from the indicator', async function toggleSelection() {
      const { getByRole, getByTestId } = await render(<CheckboxExample />);
      const card = getByRole('checkbox', { name: 'Automatic renewal' });
      await userEvent.click(getByTestId('card-selection-indicator'));
      await expect.element(card).toBeChecked();
    });

    it('toggles selection from ordinary body content', async function bodyTogglesSelection() {
      const { getByRole, getByText } = await render(<CheckboxExample />);
      await userEvent.click(getByText('Keep this plan active when it expires.'));
      await expect.element(getByRole('checkbox', { name: 'Automatic renewal' })).toBeChecked();
    });

    it('keeps the primary link native', async function nativeNavigation() {
      const { getByRole } = await render(<LinkExample />);
      await expect.element(getByRole('link', { name: 'Link card' })).toHaveAttribute('href', '/');
    });
  });
});

async function moveMouse(
  x: number,
  y: number,
  type: string,
  button: 'left' | 'right' | 'none' = 'none',
  modifiers = 0
) {
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
    modifiers,
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
    beforeAll(preloadTestIcons);
    beforeEach(resetHover);

    afterEach(function clearSelection() {
      window.getSelection()?.removeAllRanges();
      history.replaceState(null, '', `${location.pathname}${location.search}`);
    });

    it('provides a native link context target over Card padding', async function backgroundLink() {
      const { container } = await render(<LinkExample />);
      const card = container.querySelector<HTMLAnchorElement>('a[href="/"]')?.closest<HTMLElement>('[data-card]');
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
      expect(destination).toBe('/');
    });

    it('provides a native link context target over body text', async function bodyLink() {
      const { container, getByText } = await render(<LinkExample />);
      const card = container.querySelector<HTMLElement>('[data-card]');
      expect(card).not.toBeNull();
      let destination: string | null = null;
      card!.addEventListener('contextmenu', function captureContext(event) {
        destination = (event.target as Element).closest('a')?.getAttribute('href') ?? null;
        event.preventDefault();
      });
      const bounds = (getByText('This is a link card').element() as HTMLElement).getBoundingClientRect();
      const x = bounds.left + bounds.width / 2;
      const y = bounds.top + bounds.height / 2;
      await moveMouse(x, y, 'mouseMoved');
      await moveMouse(x, y, 'mousePressed', 'right');
      await moveMouse(x, y, 'mouseReleased', 'right');
      expect(destination).toBe('/');
    });

    it('stretches the native link over ordinary body content', async function bodyHitsLink() {
      const { container, getByRole } = await render(<LinkExample />);
      const link = getByRole('link', { name: 'Link card' }).element() as HTMLElement;
      const card = container.querySelector<HTMLElement>('[data-card]')!;
      const linkBox = link.getBoundingClientRect();
      const cardBox = card.getBoundingClientRect();
      expect(linkBox.left).toBeCloseTo(cardBox.left + card.clientLeft);
      expect(linkBox.top).toBeCloseTo(cardBox.top + card.clientTop);
      expect(linkBox.width).toBeCloseTo(card.clientWidth);
      expect(linkBox.height).toBeCloseTo(card.clientHeight);

      let activations = 0;
      link.addEventListener('click', function preventTestNavigation(event) {
        activations++;
        event.preventDefault();
      });
      const x = cardBox.left + cardBox.width / 2;
      const y = cardBox.top + cardBox.height / 2;
      await moveMouse(x, y, 'mouseMoved');
      await moveMouse(x, y, 'mousePressed', 'left');
      await moveMouse(x, y, 'mouseReleased', 'left');
      expect(activations).toBe(1);
    });

    it('preserves modifier clicks on body text for the native link', async function modifierClick() {
      const { getByRole, getByText } = await render(<LinkExample />);
      const link = getByRole('link', { name: 'Link card' }).element() as HTMLElement;
      let usedModifier = false;
      link.addEventListener('click', function captureModifier(event) {
        usedModifier = event.metaKey || event.ctrlKey;
        event.preventDefault();
      });
      const bounds = (getByText('This is a link card').element() as HTMLElement).getBoundingClientRect();
      const x = bounds.left + bounds.width / 2;
      const y = bounds.top + bounds.height / 2;
      const modifiers = /Mac|iPhone|iPad/.test(navigator.platform) ? 4 : 2;
      await moveMouse(x, y, 'mouseMoved', 'none', modifiers);
      await moveMouse(x, y, 'mousePressed', 'left', modifiers);
      await moveMouse(x, y, 'mouseReleased', 'left', modifiers);
      expect(usedModifier).toBe(true);
    });

    it('opens the native destination in another tab from a middle click', async function middleClick() {
      const { container } = await render(<LinkExample />);
      const card = container.querySelector<HTMLAnchorElement>('a[href="/"]')!.closest<HTMLElement>('[data-card]')!;
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
      const destination = new URL('/', location.href).href;
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

    it('uses the native checkbox as the only selection keyboard stop', async function selectionKeyboard() {
      const { getByRole } = await render(<CheckboxExample />);
      const checkbox = getByRole('checkbox', { name: 'Automatic renewal' });
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
      await userEvent.click(getByRole('button', { name: 'Option one' }), { position: { x: 4, y: 4 } });
      await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
      await expect.element(control).not.toBeChecked();
      await userEvent.click(getByTestId('indicator-One'));
      await expect.element(control).toBeChecked();
      await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
    });

    it('activates primary navigation from the keyboard', async function navigationKeyboard() {
      const { getByRole, getByText } = await render(<InteractionsExample primary="navigation" />);
      await userEvent.tab();
      await expect.element(getByRole('link', { name: 'Option one' })).toHaveFocus();
      await userEvent.keyboard('{Enter}');
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
      await userEvent.click(getByRole('button', { name: 'Option one' }), { position: { x: 4, y: 4 } });
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

    it('selects a radio card from its body content', async function radioBodySelects() {
      const { getByRole, getByText } = await render(<RadioExample />);
      await userEvent.click(getByText('For getting started with a single project.'));
      await expect.element(getByRole('radio', { name: 'Starter plan' })).toBeChecked();
      await userEvent.click(getByText('For teams that need more room to grow.'));
      await expect.element(getByRole('radio', { name: 'Pro plan' })).toBeChecked();
      await expect.element(getByRole('radio', { name: 'Starter plan' })).not.toBeChecked();
    });

    it('reveals and marks a mixed, required, invalid selection', async function mixedSelection() {
      const { container, getByRole, getByTestId } = await render(
        <InteractionsExample isIndeterminate isRequired isInvalid />
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
      const { container } = await render(<InteractionsExample primary="action" />);
      const card = container.querySelector<HTMLElement>('[data-card]')!;

      await userEvent.tab();
      expect(getComputedStyle(card).outlineStyle).toBe('solid');
      await userEvent.tab();
      expect(getComputedStyle(card).outlineStyle).toBe('none');
      await userEvent.tab();
      await userEvent.tab();
      await userEvent.tab();
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

    it('activates the primary from a click on body text', async function bodyTextActivates() {
      const { getByText } = await render(<InteractionsExample primary="action" />);
      await userEvent.click(getByText('One: copy this text without changing selection.'));
      await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
    });

    it('does not activate the primary while dragging body text', async function dragTextDoesNotActivate() {
      const { getByText } = await render(<InteractionsExample primary="action" />);
      await dragText(getByText('One: copy this text without changing selection.').element() as HTMLElement);
      expect(window.getSelection()?.toString().length).toBeGreaterThan(3);
      await expect.element(getByText('Primary activations: 0')).toBeInTheDocument();
    });

    it('does not activate the primary from a held press on body text', async function heldPressDoesNotActivate() {
      const { getByText } = await render(<InteractionsExample primary="action" />);
      const text = getByText('One: copy this text without changing selection.').element() as HTMLElement;
      const box = text.getBoundingClientRect();
      const x = box.left + 8;
      const y = box.top + box.height / 2;
      await moveMouse(x, y, 'mouseMoved');
      await moveMouse(x, y, 'mousePressed', 'left');
      await new Promise(function waitForClickWindow(resolve) {
        setTimeout(resolve, 250);
      });
      await moveMouse(x, y, 'mouseReleased', 'left');
      await expect.element(getByText('Primary activations: 0')).toBeInTheDocument();
    });

    it('lets a nested label toggle its field without activating the Card', async function nestedFormLabel() {
      const { getByText, getByTestId } = await render(<InteractionsExample primary="action" />);
      await userEvent.click(getByText('Remember One'));
      await expect.element(getByTestId('form-One')).toBeChecked();
      await expect.element(getByText('Primary activations: 0')).toBeInTheDocument();
      await expect.element(getByText('Independent activations: 0')).toBeInTheDocument();
    });

    it('keeps a nested Card primary independent of its parent', async function nestedCardPrimary() {
      const { getByText } = await render(<NestedExample />);
      await userEvent.click(getByText('Inner copy'));
      await expect.element(getByText('Inner activations: 1')).toBeInTheDocument();
      await expect.element(getByText('Outer activations: 0')).toBeInTheDocument();
      await userEvent.click(getByText('Outer copy'));
      await expect.element(getByText('Outer activations: 1')).toBeInTheDocument();
      await expect.element(getByText('Inner activations: 1')).toBeInTheDocument();
    });

    it('selects a radio card from its published example', async function radioExample() {
      const { getByRole, getByTestId } = await render(<RadioExample />);
      await userEvent.click(getByTestId('radio-pro-indicator'));
      await expect.element(getByRole('radio', { name: 'Pro plan' })).toBeChecked();
      await expect.element(getByRole('radio', { name: 'Starter plan' })).not.toBeChecked();
    });
  });
});

describe('@godaddy/antares', function packageTests() {
  describe('#Card props', function cardProps() {
    beforeAll(preloadTestIcons);

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
  });
});

function bounds(element: Element) {
  return element.getBoundingClientRect();
}

describe('@godaddy/antares', function packageTests() {
  describe('#Card layout', function cardLayoutTests() {
    beforeAll(preloadTestIcons);

    it('stacks media in a narrow container', async function narrowContainer() {
      await page.viewport(420, 800);
      const { getByTestId } = await render(<LayoutExample />);
      const media = bounds(getByTestId('container-query-media').element());
      const content = bounds(getByTestId('container-query-content').element());

      expect(media.bottom).toBeLessThanOrEqual(content.top);
    });

    it('places media beside content in a wide container', async function wideContainer() {
      await page.viewport(800, 800);
      const { getByTestId } = await render(<LayoutExample />);
      const media = bounds(getByTestId('container-query-media').element());
      const content = bounds(getByTestId('container-query-content').element());

      expect(media.right).toBeLessThanOrEqual(content.left);
    });

    it('lets collection cards keep their own height', async function intrinsicCollection() {
      await page.viewport(1000, 800);
      const { getByTestId } = await render(<LayoutExample />);
      const cards = [0, 1, 2].map(function card(index) {
        return bounds(getByTestId(`collection-card-${index}`).element());
      });

      expect(cards[0].height).toBeLessThan(cards[1].height);
      expect(cards[1].height).toBeLessThan(cards[2].height);
    });
  });
});

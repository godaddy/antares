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
import { GroupedSelectionExample } from '../examples/grouped-selection.tsx';

async function renderInteraction(kind: 'checkbox' | 'radio' | 'action') {
  const result = await render(
    <InteractionsExample
      kind={kind === 'radio' ? 'radio' : 'checkbox'}
      primary={kind === 'action' ? 'action' : undefined}
    />
  );
  return { ...result, body: result.getByText('One: copy this text without changing selection.') };
}

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

function bounds(element: Element) {
  return element.getBoundingClientRect();
}

describe('@godaddy/antares', function packageTests() {
  beforeAll(preloadTestIcons);

  describe('#Card', function cardTests() {
    beforeEach(resetHover);

    afterEach(function resetInteractions() {
      window.getSelection()?.removeAllRanges();
      history.replaceState(null, '', `${location.pathname}${location.search}`);
    });

    describe('selection', function selectionTests() {
      it('toggles standalone selection once from the indicator', async function standaloneSelection() {
        const { getByRole, getByTestId } = await render(<CheckboxExample />);
        const indicator = getByTestId('card-selection-indicator');
        await expect.element(indicator).toHaveTextContent('false');
        expect(getComputedStyle(indicator.element()).borderTopWidth).toBe('0px');
        expect(getComputedStyle(indicator.element()).backgroundColor).toBe('rgba(0, 0, 0, 0)');
        await userEvent.click(indicator);
        await expect.element(getByRole('checkbox', { name: 'Automatic renewal' })).toBeChecked();
        await expect.element(indicator).toHaveTextContent('true');
        await userEvent.click(indicator);
        await expect.element(getByRole('checkbox', { name: 'Automatic renewal' })).not.toBeChecked();
        await expect.element(indicator).toHaveTextContent('false');
      });

      it('sizes the default indicator like its sibling corner actions', async function indicatorSize() {
        const { getByRole } = await render(<CheckboxExample />);
        const card = getByRole('checkbox', { name: 'Domain privacy' }).element().closest('[data-card]')!;
        const button = bounds(card.querySelector('[data-corner-actions] button')!);
        const indicator = bounds(card.querySelector('[data-card-selection-indicator]')!);
        expect(indicator.height).toBe(button.height);
        expect(indicator.width).toBe(indicator.height);
      });

      it('previews the checkmark while hovering a card that selects on press', async function indicatorHover() {
        const { getByRole, getByText } = await render(<CheckboxExample />);
        const privacy = getByRole('checkbox', { name: 'Domain privacy' });
        const body = getByText('Hide your contact details from the public directory.');
        const checkmark = privacy
          .element()
          .closest('[data-card]')!
          .querySelector('[data-card-selection-indicator] > *')!;
        const opacity = () => getComputedStyle(checkmark).opacity;
        await expect.poll(opacity).toBe('1');
        await userEvent.click(body);
        await expect.element(privacy).not.toBeChecked();
        await expect.poll(opacity).toBe('0.5');
        await userEvent.unhover(body);
        await expect.poll(opacity).toBe('0');
      });

      it('keeps the checkmark hidden while hovering a card with a primary action', async function primaryHover() {
        const { getByTestId, getByText } = await render(<InteractionsExample primary="action" />);
        const checkmark = getByTestId('indicator-One').element().firstElementChild!;
        const opacity = () => getComputedStyle(checkmark).opacity;
        await userEvent.hover(getByText('One: copy this text without changing selection.'));
        await expect.poll(opacity).toBe('0');
        await userEvent.hover(getByTestId('indicator-One'));
        await expect.poll(opacity).toBe('0.5');
      });

      it('toggles selection from ordinary body content', async function bodyTogglesSelection() {
        const { getByRole, getByText, getByTestId } = await render(<CheckboxExample />);
        await userEvent.click(getByText('Keep this plan active when it expires.'));
        await expect.element(getByRole('checkbox', { name: 'Automatic renewal' })).toBeChecked();
        await expect.element(getByTestId('card-selection-indicator')).toHaveTextContent('true');
      });

      it('uses the native checkbox as the only selection keyboard stop', async function selectionKeyboard() {
        const { getByRole, getByTestId } = await render(<CheckboxExample />);
        const checkbox = getByRole('checkbox', { name: 'Automatic renewal' });
        const indicator = getByTestId('card-selection-indicator');
        await userEvent.tab();
        await expect.element(checkbox).toHaveFocus();
        expect(getComputedStyle(indicator.element().closest('[data-card]')!).outlineStyle).toBe('solid');
        await userEvent.keyboard(' ');
        await expect.element(checkbox).toBeChecked();
        await expect.element(indicator).toHaveTextContent('true');
      });

      it('updates custom indicators in a checkbox group', async function groupedCustomIndicator() {
        const { getByRole, getByText } = await render(<CheckboxExample />);
        await userEvent.click(getByText('Send from a mailbox at your domain.'));
        const email = getByRole('checkbox', { name: 'Professional email' });
        await expect.element(email).toBeChecked();
        await expect.element(getByRole('checkbox', { name: 'Domain privacy' })).toBeChecked();
        const indicator = email.element().closest('[data-card]')!.querySelector('[data-card-selection-indicator]')!;
        expect(indicator).toHaveTextContent('true');
        await userEvent.click(indicator);
        await expect.element(email).not.toBeChecked();
        expect(indicator).toHaveTextContent('false');
      });

      it.each([
        { kind: 'checkbox', isDisabled: true, isReadOnly: false },
        { kind: 'checkbox', isDisabled: false, isReadOnly: true },
        { kind: 'radio', isDisabled: true, isReadOnly: false },
        { kind: 'radio', isDisabled: false, isReadOnly: true }
      ] as const)('preserves custom $kind restrictions: disabled=$isDisabled, readOnly=$isReadOnly', async function restrictedCustomIndicator(props) {
        const { getByRole, getByTestId } = await render(
          <InteractionsExample
            {...props}
            indicatorChildren={({ isDisabled, isReadOnly }) =>
              isDisabled ? 'Unavailable' : isReadOnly ? 'Read only' : 'Available'
            }
          />
        );
        const indicator = getByTestId('indicator-One');
        await expect.element(indicator).toHaveTextContent(props.isDisabled ? 'Unavailable' : 'Read only');
        const faded = props.isDisabled ? indicator.element().closest<HTMLElement>('[data-card]')! : indicator.element();
        expect(getComputedStyle(faded).opacity).toBe('0.4');
        await userEvent.click(indicator, { force: true });
        await expect.element(getByRole(props.kind, { name: 'Option one' })).not.toBeChecked();
      });

      it('exposes mixed and keyboard focus state to custom content', async function customIndicatorState() {
        const { getByRole, getByTestId } = await render(
          <InteractionsExample
            isIndeterminate
            indicatorChildren={({ isIndeterminate, isFocusVisible }) =>
              `${isIndeterminate ? 'mixed' : 'unmixed'} ${isFocusVisible ? 'focused' : 'unfocused'}`
            }
          />
        );
        const indicator = getByTestId('indicator-One');
        await expect.element(indicator).toHaveTextContent('mixed unfocused');
        await userEvent.click(indicator);
        await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
        await userEvent.tab();
        await expect.element(getByRole('checkbox', { name: 'Option one' })).toHaveFocus();
        await expect.element(indicator).toHaveTextContent('mixed focused');
      });

      it('selects from static custom content', async function staticCustomIndicator() {
        const { getByRole, getByTestId } = await render(<InteractionsExample indicatorChildren="Select" />);
        const indicator = getByTestId('indicator-One');
        await expect.element(indicator).toHaveTextContent('Select');
        await userEvent.click(indicator);
        await expect.element(getByRole('checkbox', { name: 'Option one' })).toBeChecked();
      });

      it('retains radio arrow navigation and single selection', async function radioKeyboard() {
        const { getByRole, getByTestId } = await render(
          <InteractionsExample kind="radio" indicatorChildren={({ isSelected }) => String(isSelected)} />
        );
        await expect.element(getByTestId('indicator-One')).toHaveTextContent('false');
        await userEvent.click(getByTestId('indicator-One'));
        await expect.element(getByTestId('indicator-One')).toHaveTextContent('true');
        await userEvent.keyboard('{ArrowRight}');
        await expect.element(getByRole('radio', { name: 'Option two' })).toBeChecked();
        await expect.element(getByRole('radio', { name: 'Option two' })).toHaveFocus();
        await expect.element(getByRole('radio', { name: 'Option one' })).not.toBeChecked();
        await expect.element(getByTestId('indicator-One')).toHaveTextContent('false');
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
        await userEvent.click(getByTestId('indicator-One'));
        expect(getComputedStyle(card).borderColor).toBe('rgb(9, 117, 122)');
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

      it('keeps read-only selection unchanged from body and indicator clicks', async function readOnlySelection() {
        const { getByRole, getByText, getByTestId } = await render(<InteractionsExample isReadOnly />);
        await userEvent.click(getByText('One: copy this text without changing selection.'));
        await userEvent.click(getByTestId('indicator-One'));
        await expect.element(getByRole('checkbox', { name: 'Option one' })).not.toBeChecked();
      });

      it.each([
        { kind: 'checkbox', restriction: 'disabled' },
        { kind: 'checkbox', restriction: 'readOnly' },
        { kind: 'radio', restriction: 'disabled' },
        { kind: 'radio', restriction: 'readOnly' }
      ] as const)('inherits $restriction interaction state from its $kind group', async function inheritedSelectionState(props) {
        const { getByRole, getByText } = await render(<GroupedSelectionExample {...props} />);
        const body = getByText('Grouped card body');
        const card = body.element().closest<HTMLElement>('[data-card]')!;
        const control = getByRole(props.kind, { name: 'Option one' });

        await userEvent.click(body);
        await expect.element(control).not.toBeChecked();
        expect(getComputedStyle(body.element()).cursor).not.toBe('pointer');
        expect(card).toHaveAttribute('data-card', 'static');

        await userEvent.click(getByRole('button', { name: 'Toggle restriction' }));
        await userEvent.click(body);
        await expect.element(control).toBeChecked();
        expect(getComputedStyle(body.element()).cursor).toBe('pointer');
        expect(card).toHaveAttribute('data-card', 'interactive');

        await userEvent.click(getByRole('button', { name: 'Toggle restriction' }));
        await userEvent.click(body);
        await expect.element(control).toBeChecked();
        expect(getComputedStyle(body.element()).cursor).not.toBe('pointer');
        expect(card).toHaveAttribute('data-card', 'static');
      });

      it('selects a radio card from its published example', async function radioExample() {
        const { getByRole, getByTestId } = await render(<RadioExample />);
        await userEvent.click(getByTestId('radio-pro-indicator'));
        await expect.element(getByRole('radio', { name: 'Pro plan' })).toBeChecked();
        await expect.element(getByRole('radio', { name: 'Starter plan' })).not.toBeChecked();
      });
    });

    describe('primary actions', function primaryActionTests() {
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

      it('keeps the primary link native', async function nativeNavigation() {
        const { getByRole } = await render(<LinkExample />);
        await expect.element(getByRole('link', { name: 'Link card' })).toHaveAttribute('href', '/');
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

      it('activates primary navigation from the keyboard', async function navigationKeyboard() {
        const { getByRole, getByText } = await render(<InteractionsExample primary="navigation" />);
        await userEvent.tab();
        await expect.element(getByRole('link', { name: 'Option one' })).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
      });

      it('drops the interactive affordance from a disabled primary', async function disabledAffordance() {
        const { container } = await render(<InteractionsExample primary="action" isPrimaryDisabled />);
        expect(container.querySelector('[data-card]')).toHaveAttribute('data-card', 'static');
      });

      it('activates the primary from a click on body text', async function bodyTextActivates() {
        const { getByText } = await render(<InteractionsExample primary="action" />);
        await userEvent.click(getByText('One: copy this text without changing selection.'));
        await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
      });
    });

    describe('composition', function compositionTests() {
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

      it.each([
        'checkbox',
        'radio'
      ] as const)('keeps action and %s selection independent', async function combinedAction(kind) {
        const { getByRole, getByText, getByTestId } = await render(
          <InteractionsExample kind={kind} primary="action" />
        );
        const control = getByRole(kind, { name: 'Option one' });
        await userEvent.click(getByRole('button', { name: 'Option one' }), { position: { x: 4, y: 4 } });
        await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
        await expect.element(control).not.toBeChecked();
        await userEvent.click(getByTestId('indicator-One'));
        await expect.element(control).toBeChecked();
        await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
      });

      it('leaves independent actions usable when selection is disabled', async function disabledSelection() {
        const { getByRole, getByText } = await render(<InteractionsExample isDisabled primary="action" />);
        await expect.element(getByRole('checkbox', { name: 'Option one' })).toBeDisabled();
        await userEvent.click(getByRole('button', { name: 'Option one' }), { position: { x: 4, y: 4 } });
        await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
        await userEvent.click(getByRole('button', { name: 'Independent One' }));
        await expect.element(getByText('Independent activations: 1')).toBeInTheDocument();
      });

      it.each([
        { kind: 'checkbox', restriction: 'disabled' },
        { kind: 'checkbox', restriction: 'readOnly' },
        { kind: 'radio', restriction: 'disabled' },
        { kind: 'radio', restriction: 'readOnly' }
      ] as const)('keeps the primary active in a $restriction $kind group', async function groupedPrimaryAction(props) {
        const { getByRole, getByText } = await render(<GroupedSelectionExample {...props} hasPrimary />);
        const body = getByText('Grouped card body');
        await userEvent.click(body);
        await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
        await expect.element(getByRole(props.kind, { name: 'Option one' })).not.toBeChecked();
        expect(body.element().closest('[data-card]')).toHaveAttribute('data-card', 'interactive');
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

      it.each([
        { kind: 'checkbox', media: 'audio' },
        { kind: 'checkbox', media: 'video' },
        { kind: 'radio', media: 'audio' },
        { kind: 'radio', media: 'video' },
        { kind: 'action', media: 'audio' },
        { kind: 'action', media: 'video' }
      ] as const)('keeps native $media controls independent of the $kind Card', async function nativeMediaControls({
        kind,
        media
      }) {
        const { getByLabelText, getByRole, getByText } = await render(
          <InteractionsExample
            kind={kind === 'radio' ? 'radio' : 'checkbox'}
            primary={kind === 'action' ? 'action' : undefined}
            media={media}
          />
        );
        await userEvent.click(getByLabelText(media === 'audio' ? 'Audio preview' : 'Video preview'), {
          position: { x: 1, y: 1 }
        });
        await expect.element(getByText('Primary activations: 0')).toBeInTheDocument();
        await expect
          .element(getByRole(kind === 'radio' ? 'radio' : 'checkbox', { name: 'Option one' }))
          .not.toBeChecked();
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

      it('selects its own input when a nested Card precedes its indicator', async function nestedSelection() {
        const { getByRole, getByText } = await render(<NestedExample selection="checkbox" />);
        await userEvent.click(getByText('Outer copy'));
        await expect.element(getByRole('checkbox', { name: 'Outer card' })).toBeChecked();
        await expect.element(getByRole('checkbox', { name: 'Inner card' })).not.toBeChecked();
        await userEvent.click(getByText('Inner copy'));
        await expect.element(getByRole('checkbox', { name: 'Inner card' })).toBeChecked();
        await expect.element(getByRole('checkbox', { name: 'Outer card' })).toBeChecked();
      });

      it('does not use a nested input when its own indicator is omitted', async function missingIndicator() {
        const { getByRole, getByText } = await render(
          <NestedExample selection="checkbox" showOuterIndicator={false} />
        );
        await userEvent.click(getByText('Outer copy'));
        await expect.element(getByRole('checkbox', { name: 'Inner card' })).not.toBeChecked();
      });

      it.each([
        { focusable: 'card', primary: undefined },
        { focusable: 'ancestor', primary: undefined },
        { focusable: 'card', primary: 'action' },
        { focusable: 'ancestor', primary: 'action' }
      ] as const)('forwards body clicks with a focusable $focusable and primary=$primary', async function focusableSurface(props) {
        const { getByRole, getByText } = await render(<InteractionsExample {...props} />);
        await userEvent.click(getByText('One: copy this text without changing selection.'));
        if (props.primary) {
          await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
          await expect.element(getByRole('checkbox', { name: 'Option one' })).not.toBeChecked();
        } else {
          await expect.element(getByRole('checkbox', { name: 'Option one' })).toBeChecked();
        }
        await userEvent.click(getByRole('button', { name: 'Independent One' }));
        await expect.element(getByText('Independent activations: 1')).toBeInTheDocument();
        await expect.element(getByText(`Primary activations: ${props.primary ? 1 : 0}`)).toBeInTheDocument();
        expect((getByRole('checkbox', { name: 'Option one' }).element() as HTMLInputElement).checked).toBe(
          !props.primary
        );
      });
    });

    describe('pointer gestures', function pointerGestureTests() {
      it.each([
        'checkbox',
        'radio'
      ] as const)('does not select a %s card while dragging its text', async function selectCardText(kind) {
        const { getByRole, getByText } = await render(<InteractionsExample kind={kind} />);
        await dragText(getByText('One: copy this text without changing selection.').element() as HTMLElement);
        expect(window.getSelection()?.toString().length).toBeGreaterThan(3);
        await expect.element(getByRole(kind, { name: 'Option one' })).not.toBeChecked();
      });

      it('does not activate the primary while dragging body text', async function dragTextDoesNotActivate() {
        const { getByText } = await render(<InteractionsExample primary="action" />);
        await dragText(getByText('One: copy this text without changing selection.').element() as HTMLElement);
        expect(window.getSelection()?.toString().length).toBeGreaterThan(3);
        await expect.element(getByText('Primary activations: 0')).toBeInTheDocument();
      });

      it.each([
        'checkbox',
        'radio',
        'action'
      ] as const)('activates %s from a held press on body text', async function heldPressActivates(kind) {
        const { getByRole, getByText, body } = await renderInteraction(kind);
        const box = body.element().getBoundingClientRect();
        const x = box.left + 8;
        const y = box.top + box.height / 2;
        await moveMouse(x, y, 'mouseMoved');
        await moveMouse(x, y, 'mousePressed', 'left');
        await new Promise(function holdPointer(resolve) {
          setTimeout(resolve, 300);
        });
        await moveMouse(x, y, 'mouseReleased', 'left');
        if (kind === 'action') {
          await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
        } else {
          await expect.element(getByRole(kind, { name: 'Option one' })).toBeChecked();
        }
      });

      it.each([
        'checkbox',
        'radio',
        'action'
      ] as const)('activates %s when pointer movement leaves no text selected', async function movementActivates(kind) {
        const { getByRole, getByText, body } = await renderInteraction(kind);
        const box = body.element().getBoundingClientRect();
        const x = box.left + 8;
        const y = box.top + box.height / 2;
        await moveMouse(x, y, 'mouseMoved');
        await moveMouse(x, y, 'mousePressed', 'left');
        await moveMouse(x + 20, y, 'mouseMoved', 'left');
        await moveMouse(x, y, 'mouseMoved', 'left');
        await moveMouse(x, y, 'mouseReleased', 'left');
        expect(window.getSelection()?.toString()).toBe('');
        if (kind === 'action') {
          await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
        } else {
          await expect.element(getByRole(kind, { name: 'Option one' })).toBeChecked();
        }
      });

      it.each([
        'checkbox',
        'radio',
        'action'
      ] as const)('moves keyboard focus to the %s control after a body click', async function bodyClickThenKeyboard(kind) {
        const { getByRole, getByText, body } = await renderInteraction(kind);
        await userEvent.click(body);
        if (kind === 'action') {
          await expect.element(getByRole('button', { name: 'Option one' })).toHaveFocus();
          await userEvent.keyboard('{Enter}');
          await expect.element(getByText('Primary activations: 2')).toBeInTheDocument();
          return;
        }

        await expect.element(getByRole(kind, { name: 'Option one' })).toHaveFocus();
        if (kind === 'checkbox') {
          await userEvent.keyboard(' ');
          await expect.element(getByRole('checkbox', { name: 'Option one' })).not.toBeChecked();
          return;
        }

        await userEvent.keyboard('{ArrowRight}');
        await expect.element(getByRole('radio', { name: 'Option two' })).toBeChecked();
        await expect.element(getByRole('radio', { name: 'Option two' })).toHaveFocus();
      });

      it.each([
        'checkbox',
        'action'
      ] as const)('responds to every repeated %s body click', async function repeatedClicks(kind) {
        const { getByRole, getByText, body } = await renderInteraction(kind);
        for (let click = 1; click <= 4; click++) {
          await userEvent.click(body);
          if (kind === 'action') {
            expect(getByText(`Primary activations: ${click}`).element()).toBeInTheDocument();
          } else {
            expect((getByRole('checkbox', { name: 'Option one' }).element() as HTMLInputElement).checked).toBe(
              click % 2 === 1
            );
          }
        }
      });

      it('responds to repeated changes between radio cards', async function repeatedRadioClicks() {
        const { getByRole, body } = await renderInteraction('radio');
        const secondCard = getByRole('radio', { name: 'Option two' }).element().closest<HTMLElement>('[data-card]')!;
        for (let click = 0; click < 3; click++) {
          await userEvent.click(body);
          expect(getByRole('radio', { name: 'Option one' }).element()).toBeChecked();
          await userEvent.click(secondCard, { position: { x: 4, y: 4 } });
          expect(getByRole('radio', { name: 'Option two' }).element()).toBeChecked();
        }
      });

      it('allows a body click while unrelated text remains selected', async function unrelatedSelection() {
        const { getByRole, getByText } = await render(<InteractionsExample />);
        window.getSelection()?.selectAllChildren(getByText('Primary activations: 0').element());
        const selectedText = window.getSelection()?.toString();
        expect(selectedText?.length).toBeGreaterThan(3);
        const body = getByText('One: copy this text without changing selection.');
        body.element().addEventListener(
          'mousedown',
          function preserveSelection(event) {
            event.preventDefault();
          },
          { once: true }
        );
        await userEvent.click(body);
        expect(window.getSelection()?.toString()).toBe(selectedText);
        await expect.element(getByRole('checkbox', { name: 'Option one' })).toBeChecked();
      });
    });

    describe('props', function propTests() {
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

    describe('layout', function layoutTests() {
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
});

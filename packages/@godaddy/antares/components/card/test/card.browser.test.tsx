import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { cdp, page, userEvent } from 'vitest/browser';
import { ActionsExample } from '../examples/actions.tsx';
import { CheckboxExample } from '../examples/checkbox.tsx';
import { InteractionsExample } from '../examples/interactions.tsx';
import { LinkExample } from '../examples/link.tsx';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { CustomizationExample } from '../examples/customization.tsx';
import { FrameExample } from '../examples/frame.tsx';
import { LayoutExample } from '../examples/layout.tsx';
import { NestedExample } from '../examples/nested.tsx';
import { RadioExample } from '../examples/radio.tsx';
import { GroupedSelectionExample } from '../examples/grouped-selection.tsx';
import { TypesExample } from '../examples/types.tsx';

const BODY_TEXT = 'One: copy this text without changing selection.';
async function renderInteraction(kind: 'checkbox' | 'radio' | 'action') {
  const result = await render(
    <InteractionsExample
      kind={kind === 'radio' ? 'radio' : 'checkbox'}
      primary={kind === 'action' ? 'action' : undefined}
    />
  );
  return { ...result, body: result.getByText(BODY_TEXT) };
}

async function expectActivated(
  { getByRole, getByText }: Awaited<ReturnType<typeof renderInteraction>>,
  kind: 'checkbox' | 'radio' | 'action'
) {
  if (kind === 'action') await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
  else await expect.element(getByRole(kind, { name: 'Option one' })).toBeChecked();
}

function session() {
  return cdp() as unknown as {
    send(method: string, params: Record<string, unknown>): Promise<unknown>;
  };
}

function pagePoint(x: number, y: number) {
  const frame = (window.frameElement as HTMLElement | null)?.getBoundingClientRect();
  return {
    x: x * (frame ? frame.width / window.innerWidth : 1) + (frame?.left ?? 0),
    y: y * (frame ? frame.height / window.innerHeight : 1) + (frame?.top ?? 0)
  };
}

async function moveMouse(
  x: number,
  y: number,
  type: string,
  button: 'left' | 'right' | 'none' = 'none',
  modifiers = 0
) {
  await session().send('Input.dispatchMouseEvent', {
    type,
    ...pagePoint(x, y),
    button,
    buttons: type === 'mouseReleased' ? 0 : button === 'left' ? 1 : button === 'right' ? 2 : 0,
    modifiers,
    clickCount: type === 'mouseMoved' ? 0 : 1
  });
}

async function pressAt(x: number, y: number, modifiers = 0) {
  await moveMouse(x, y, 'mouseMoved', 'none', modifiers);
  await moveMouse(x, y, 'mousePressed', 'left', modifiers);
  await moveMouse(x, y, 'mouseReleased', 'left', modifiers);
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
        await userEvent.click(indicator);
        await expect.element(getByRole('checkbox', { name: 'Automatic renewal' })).toBeChecked();
        await expect.element(indicator).toHaveTextContent('true');
        await userEvent.click(indicator);
        await expect.element(getByRole('checkbox', { name: 'Automatic renewal' })).not.toBeChecked();
        await expect.element(indicator).toHaveTextContent('false');
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

      it.each([
        { kind: 'checkbox', isDisabled: true, isReadOnly: false },
        { kind: 'radio', isDisabled: false, isReadOnly: true }
      ] as const)('preserves custom $kind restrictions: disabled=$isDisabled, readOnly=$isReadOnly', async function restrictedCustomIndicator(props) {
        const { getByRole, getByTestId, getByText } = await render(
          <InteractionsExample
            {...props}
            indicatorChildren={({ isDisabled, isReadOnly }) =>
              isDisabled ? 'Unavailable' : isReadOnly ? 'Read only' : 'Available'
            }
          />
        );
        const indicator = getByTestId('indicator-One');
        await expect.element(indicator).toHaveTextContent(props.isDisabled ? 'Unavailable' : 'Read only');
        await userEvent.click(indicator, { force: true });
        await userEvent.click(getByText(BODY_TEXT), { force: true });
        await expect.element(getByRole(props.kind, { name: 'Option one' })).not.toBeChecked();
      });

      it.each([
        { kind: 'checkbox', restriction: 'readOnly' },
        { kind: 'radio', restriction: 'disabled' }
      ] as const)('inherits $restriction interaction state from its $kind group', async function inheritedSelectionState(props) {
        const { getByRole, getByText } = await render(<GroupedSelectionExample {...props} />);
        const body = getByText('Grouped card body');
        const card = body.element().closest<HTMLElement>('[data-card]')!;
        const control = getByRole(props.kind, { name: 'Option one' });

        await userEvent.click(body);
        await expect.element(control).not.toBeChecked();
        expect(card).toHaveAttribute('data-card', 'static');

        await userEvent.click(getByRole('button', { name: 'Toggle restriction' }));
        await userEvent.click(body);
        await expect.element(control).toBeChecked();
        expect(card).toHaveAttribute('data-card', 'interactive');
      });

      it('exposes keyboard focus state to custom content', async function customIndicatorState() {
        const { getByRole, getByTestId } = await render(
          <InteractionsExample indicatorChildren={({ isFocusVisible }) => (isFocusVisible ? 'focused' : 'unfocused')} />
        );
        const indicator = getByTestId('indicator-One');
        await expect.element(indicator).toHaveTextContent('unfocused');
        await userEvent.click(indicator);
        await userEvent.tab();
        await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
        await expect.element(getByRole('checkbox', { name: 'Option one' })).toHaveFocus();
        await expect.element(indicator).toHaveTextContent('focused');
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
      });

      it('selects a radio card from its body content', async function radioBodySelects() {
        const { getByRole, getByText } = await render(<RadioExample />);
        await userEvent.click(getByText('For getting started with a single project.'));
        await expect.element(getByRole('radio', { name: 'Starter plan' })).toBeChecked();
        await userEvent.click(getByText('For teams that need more room to grow.'));
        await expect.element(getByRole('radio', { name: 'Pro plan' })).toBeChecked();
        await expect.element(getByRole('radio', { name: 'Starter plan' })).not.toBeChecked();
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
    });

    describe('primary actions', function primaryActionTests() {
      it('renders the Card itself as the native link', async function nativeLink() {
        const { getByRole, getByText } = await render(<LinkExample />);
        const link = getByRole('link', { name: 'Link card' });
        await expect.element(link).toHaveAttribute('href', '/');
        expect(link.element()).toHaveAttribute('data-card', 'interactive');
        await expect.element(getByRole('link', { name: /Find your domain/ })).toHaveAttribute('href', '#domains');
        await userEvent.click(getByText('Layered content'));
        expect(location.hash).toBe('#hosting');
      });

      it('rings a focused link Card', async function linkFocusRing() {
        const { getByRole } = await render(<LinkExample />);
        const link = getByRole('link', { name: 'Link card' });
        await userEvent.click(getByRole('link', { name: /Find your domain/ }));
        await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
        await expect.element(link).toHaveFocus();
        expect(getComputedStyle(link.element()).outlineStyle).toBe('solid');
      });

      it('activates primary navigation from the keyboard', async function navigationKeyboard() {
        const { getByRole, getByText } = await render(<InteractionsExample primary="navigation" />);
        await userEvent.tab();
        await expect.element(getByRole('link', { name: 'Option one' })).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
      });

      it('disables the primary link', async function disabledPrimaryLink() {
        const { getByRole, getByText } = await render(<InteractionsExample primary="navigation" isDisabled />);
        await expect.element(getByRole('link', { name: 'Option one' })).toBeDisabled();
        await expect.element(getByText('Primary activations: 0')).toBeInTheDocument();
      });

      it('disables the primary action but not nested controls', async function disabledPrimaryAction() {
        const { container, getByRole, getByText } = await render(<InteractionsExample primary="action" isDisabled />);
        const card = container.querySelector<HTMLElement>('[data-card]')!;
        expect(card).toHaveAttribute('data-card', 'static');
        await expect.element(getByRole('button', { name: 'Option one' })).toBeDisabled();
        await userEvent.click(getByText(BODY_TEXT));
        await userEvent.click(getByRole('button', { name: 'Independent One' }));
        await expect.element(getByText('Independent activations: 1')).toBeInTheDocument();
        await expect.element(getByText('Primary activations: 0')).toBeInTheDocument();
      });

      it('keeps modifier keys when body text activates the primary', async function bodyTextModifiers() {
        const { getByText, body } = await renderInteraction('action');
        const box = bounds(body.element());
        await pressAt(box.left + 8, box.top + box.height / 2, 8);
        await expect.element(getByText('Last primary press: virtual+shift')).toBeInTheDocument();
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
    });

    describe('composition', function compositionTests() {
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
        { kind: 'action', media: 'video' }
      ] as const)('keeps native $media controls independent of the $kind Card', async function nativeMediaControls({
        kind,
        media
      }) {
        const { getByLabelText, getByRole, getByText } = await render(
          <InteractionsExample primary={kind === 'action' ? 'action' : undefined} media={media} />
        );
        await userEvent.click(getByLabelText(media === 'audio' ? 'Audio preview' : 'Video preview'), {
          position: { x: 1, y: 1 }
        });
        await expect.element(getByText('Primary activations: 0')).toBeInTheDocument();
        if (kind !== 'action') await expect.element(getByRole(kind, { name: 'Option one' })).not.toBeChecked();
      });

      it.each([
        'checkbox',
        'action'
      ] as const)('keeps a nested slider track independent of the %s Card', async function nestedSlider(kind) {
        const { getByRole, getByText } = await render(
          <InteractionsExample primary={kind === 'action' ? 'action' : undefined} slider />
        );
        const slider = getByRole('slider', { name: 'Volume' }).element() as HTMLInputElement;
        const track = bounds(slider.closest('[role="group"] > [data-orientation]')!);
        await pressAt(track.right - 4, track.top + track.height / 2);
        await expect.poll(() => slider.value).not.toBe('10');
        await expect.element(getByText('Primary activations: 0')).toBeInTheDocument();
        if (kind !== 'action') await expect.element(getByRole(kind, { name: 'Option one' })).not.toBeChecked();
      });

      it.each([
        'checkbox',
        'action'
      ] as const)('shows the %s Card pressed only for presses it owns', async function ownedPress(kind) {
        const { getByRole, getByTestId, body } = await renderInteraction(kind);
        const card = body.element().closest<HTMLElement>('[data-card]')!;

        async function isPressedDuring(element: Element, position?: { x: number; y: number }) {
          const box = bounds(element);
          const x = box.left + (position?.x ?? 8);
          const y = box.top + (position?.y ?? box.height / 2);
          await moveMouse(x, y, 'mouseMoved');
          await moveMouse(x, y, 'mousePressed', 'left');
          const isPressed = card.hasAttribute('data-pressed');
          await moveMouse(x, y, 'mouseReleased', 'left');
          return isPressed;
        }

        expect(await isPressedDuring(getByRole('button', { name: 'Independent One' }).element())).toBe(false);
        expect(await isPressedDuring(body.element())).toBe(true);
        const ownControl =
          kind === 'action'
            ? isPressedDuring(card, { x: 4, y: 4 })
            : isPressedDuring(getByTestId('indicator-One').element());
        expect(await ownControl).toBe(true);
      });

      it.each([
        { primary: 'action', rings: ['solid', 'none'] },
        { primary: undefined, rings: ['solid', 'none', 'none', 'none', 'none'] }
      ] as const)('rings the surface for its own controls only: primary=$primary', async function focusRing({
        primary,
        rings
      }) {
        const { container } = await render(<InteractionsExample primary={primary} />);
        const card = container.querySelector<HTMLElement>('[data-card]')!;

        for (const ring of rings) {
          await userEvent.tab();
          expect(getComputedStyle(card).outlineStyle).toBe(ring);
        }
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

      it('owns its native input when its indicator is omitted', async function missingIndicator() {
        const { getByRole, getByText } = await render(
          <NestedExample selection="checkbox" showOuterIndicator={false} />
        );
        const outer = getByRole('checkbox', { name: 'Outer card' });
        await userEvent.click(getByText('Outer copy'));
        await expect.element(outer).toBeChecked();
        await expect.element(getByRole('checkbox', { name: 'Inner card' })).not.toBeChecked();
        await userEvent.tab();
        await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
        await expect.element(outer).toHaveFocus();
        expect(getComputedStyle(outer.element().closest('[data-card]')!).outlineStyle).toBe('solid');
      });

      it('activates Cards from body text inside an iframe', async function framedCards() {
        const { container, getByText } = await render(<FrameExample />);
        const frame = container.querySelector('iframe')!;
        const frameDocument = frame.contentDocument!;
        await expect.poll(() => frameDocument.querySelectorAll('[data-card]').length).toBe(2);

        async function clickFramedText(text: string) {
          const node = Array.from(frameDocument.querySelectorAll('[data-card] *')).find(
            (element) => element.childElementCount === 0 && element.textContent === text
          )!;
          const frameBox = frame.getBoundingClientRect();
          const box = node.getBoundingClientRect();
          await pressAt(
            frameBox.left + frame.clientLeft + box.left + 4,
            frameBox.top + frame.clientTop + box.top + box.height / 2
          );
        }

        await clickFramedText('Framed action copy');
        await expect.element(getByText('Framed activations: 1')).toBeInTheDocument();
        await clickFramedText('Framed selection copy');
        expect(frameDocument.querySelector<HTMLInputElement>('input[type="checkbox"]')!.checked).toBe(true);
      });

      it.each([
        { focusable: 'card', primary: undefined },
        { focusable: 'ancestor', primary: 'action' }
      ] as const)('forwards body clicks with a focusable $focusable and primary=$primary', async function focusableSurface(props) {
        const { getByRole, getByText } = await render(<InteractionsExample {...props} />);
        await userEvent.click(getByText(BODY_TEXT));
        await userEvent.click(getByRole('button', { name: 'Independent One' }));
        await expect.element(getByText('Independent activations: 1')).toBeInTheDocument();
        await expect.element(getByText(`Primary activations: ${props.primary ? 1 : 0}`)).toBeInTheDocument();
        if (!props.primary) await expect.element(getByRole('checkbox', { name: 'Option one' })).toBeChecked();
      });
    });

    describe('pointer gestures', function pointerGestureTests() {
      it.each([
        'checkbox',
        'action'
      ] as const)('does not activate a %s Card while dragging its text', async function dragBodyText(kind) {
        const { getByRole, getByText, body } = await renderInteraction(kind);
        await dragText(body.element() as HTMLElement);
        expect(window.getSelection()?.toString().length).toBeGreaterThan(3);
        if (kind === 'action') await expect.element(getByText('Primary activations: 0')).toBeInTheDocument();
        else await expect.element(getByRole(kind, { name: 'Option one' })).not.toBeChecked();
      });

      it('selects from a touch tap without leaving hover feedback', async function touchTap() {
        const { getByRole, body } = await renderInteraction('checkbox');
        const card = body.element().closest<HTMLElement>('[data-card]')!;
        const box = bounds(body.element());
        await session().send('Emulation.setTouchEmulationEnabled', { enabled: true });
        try {
          await session().send('Input.dispatchTouchEvent', {
            type: 'touchStart',
            touchPoints: [pagePoint(box.left + 8, box.top + box.height / 2)]
          });
          await session().send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
          await expect.element(getByRole('checkbox', { name: 'Option one' })).toBeChecked();
          expect(card).not.toHaveAttribute('data-hovered');
        } finally {
          await session().send('Emulation.setTouchEmulationEnabled', { enabled: false });
        }
      });

      it.each([
        'checkbox',
        'action'
      ] as const)('activates %s from a held press on body text', async function heldPressActivates(kind) {
        const result = await renderInteraction(kind);
        const box = bounds(result.body.element());
        const x = box.left + 8;
        const y = box.top + box.height / 2;
        await moveMouse(x, y, 'mouseMoved');
        await moveMouse(x, y, 'mousePressed', 'left');
        await new Promise(function holdPointer(resolve) {
          setTimeout(resolve, 300);
        });
        await moveMouse(x, y, 'mouseReleased', 'left');
        await expectActivated(result, kind);
      });

      it.each([
        'radio',
        'action'
      ] as const)('activates %s when pointer movement leaves no text selected', async function movementActivates(kind) {
        const result = await renderInteraction(kind);
        const box = bounds(result.body.element());
        const x = box.left + 8;
        const y = box.top + box.height / 2;
        await moveMouse(x, y, 'mouseMoved');
        await moveMouse(x, y, 'mousePressed', 'left');
        await moveMouse(x + 20, y, 'mouseMoved', 'left');
        await moveMouse(x, y, 'mouseMoved', 'left');
        await moveMouse(x, y, 'mouseReleased', 'left');
        expect(window.getSelection()?.toString()).toBe('');
        await expectActivated(result, kind);
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
        const body = getByText(BODY_TEXT);
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

      it('marks selected Cards in controlled groups and reports changes once', async function selectedState() {
        const { container, getByRole, getByTestId, getByText } = await render(<CustomizationExample />);
        const checkboxCard = container.querySelector<HTMLElement>('.review-checkbox-card')!;
        const radioCard = container.querySelector<HTMLElement>('.review-radio-card')!;

        expect(checkboxCard).not.toHaveAttribute('data-card-selected');
        expect(radioCard).not.toHaveAttribute('data-card-selected');

        await userEvent.click(getByTestId('props-checkbox-indicator'));
        await expect.element(getByRole('checkbox', { name: 'Checkbox props card' })).toBeChecked();
        expect(checkboxCard).toHaveAttribute('data-card-selected', 'true');
        await expect.element(getByText('Checkbox changes: 1')).toBeInTheDocument();

        await userEvent.click(getByTestId('props-radio-indicator'));
        await expect.element(getByRole('radio', { name: 'Radio props card' })).toBeChecked();
        expect(radioCard).toHaveAttribute('data-card-selected', 'true');
      });

      it('prefers selection over a primary link', async function selectionOverPrimary() {
        const { getByRole, getByText } = await render(<TypesExample />);
        await userEvent.click(getByText('Selection wins over a link.'));
        await expect.element(getByRole('checkbox', { name: 'Selection over link' })).toBeChecked();
        await expect.element(getByRole('link', { name: 'Selection over link' })).not.toBeInTheDocument();
      });

      it('renders an indicator on a Card without selection', async function staticIndicator() {
        const { getByTestId } = await render(<CustomizationExample />);
        const indicator = getByTestId('props-static-indicator').element();

        await expect.element(getByTestId('props-static-indicator')).toHaveAttribute('aria-hidden', 'true');
        expect(indicator.closest('[data-card]')?.querySelector('input')).toBeNull();
      });

      it('names and describes a static Card surface', async function staticSurfaceName() {
        const { getByRole } = await render(<CustomizationExample />);
        await expect
          .element(getByRole('region', { name: 'Card without selection' }))
          .toHaveAccessibleDescription('Static surface description');
      });
    });

    describe('layout', function layoutTests() {
      it('stacks media in narrow containers and places it beside content in wide ones', async function containerQuery() {
        await page.viewport(420, 800);
        const { getByTestId } = await render(<LayoutExample />);
        const media = () => bounds(getByTestId('container-query-media').element());
        const content = () => bounds(getByTestId('container-query-content').element());
        expect(media().bottom).toBeLessThanOrEqual(content().top);

        await page.viewport(800, 800);
        await expect.poll(() => media().right <= content().left).toBe(true);
      });
    });
  });
});

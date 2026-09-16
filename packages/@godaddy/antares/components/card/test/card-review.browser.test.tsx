import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { cdp, userEvent } from 'vitest/browser';
import { NavigationExample } from '../examples/navigation.tsx';
import { SelectionExample } from '../examples/selection.tsx';
import { ActionExample } from '../examples/action.tsx';
import { InteractionReviewExample } from '../examples/interaction-review.tsx';
import { resetHover } from '#test/utils/test-helpers.tsx';

async function moveMouse(x: number, y: number, type: string, button: 'left' | 'right' | 'none' = 'none') {
  const frame = (window.frameElement as HTMLElement | null)?.getBoundingClientRect();
  const session = cdp() as unknown as {
    send(method: string, params: Record<string, unknown>): Promise<unknown>;
  };
  await session.send('Input.dispatchMouseEvent', {
    type,
    x: x + (frame?.left ?? 0),
    y: y + (frame?.top ?? 0),
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
  describe('#Card interaction review', function interactionReview() {
    beforeEach(resetHover);

    afterEach(function clearSelection() {
      window.getSelection()?.removeAllRanges();
      history.replaceState(null, '', `${location.pathname}${location.search}`);
    });

    it('provides a native link context target over Card padding', async function backgroundLink() {
      const { container } = await render(<NavigationExample />);
      const card = container.querySelector<HTMLElement>('[data-card]');
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

    it('lets users drag-select text inside the primary link', async function selectLinkedText() {
      const { container } = await render(<NavigationExample />);
      const link = container.querySelector<HTMLAnchorElement>('a[href="/about"]')!;
      let activations = 0;
      link.addEventListener('click', function preventTestNavigation(event) {
        if (window.getSelection()?.isCollapsed) activations++;
        event.preventDefault();
      });
      await dragText(link.querySelector<HTMLElement>('span')!);
      expect(window.getSelection()?.toString().length).toBeGreaterThan(3);
      expect(activations).toBe(0);
    });

    it('opens the native destination in another tab from a middle click', async function middleClick() {
      const { container } = await render(<NavigationExample />);
      const card = container.querySelector<HTMLElement>('[data-card]')!;
      interface TargetInfo {
        targetId: string;
        url: string;
      }
      const session = cdp() as unknown as {
        send(method: 'Target.getTargets'): Promise<{ targetInfos: TargetInfo[] }>;
        send(method: 'Target.closeTarget', params: { targetId: string }): Promise<unknown>;
      };
      const initialIds = new Set((await session.send('Target.getTargets')).targetInfos.map((target) => target.targetId));
      const destination = new URL('/about', location.href).href;
      try {
        await userEvent.click(card, { button: 'middle', position: { x: 4, y: 4 } });
        await expect.poll(async function openedDestination() {
          const { targetInfos } = await session.send('Target.getTargets');
          return targetInfos.some((target) => !initialIds.has(target.targetId) && target.url === destination);
        }).toBe(true);
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
      const { container, getByText } = await render(<ActionExample />);
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

    it.each(['checkbox', 'radio'] as const)(
      'keeps action and %s selection independent',
      async function combinedAction(kind) {
        const { getByRole, getByText, getByTestId } = await render(
          <InteractionReviewExample kind={kind} primary="action" />
        );
        const control = getByRole(kind, { name: 'Option one' });
        await userEvent.click(getByText('One: copy this text without changing selection.'));
        await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
        await expect.element(control).not.toBeChecked();
        await userEvent.click(getByTestId('indicator-One'));
        await expect.element(control).toBeChecked();
        await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
      }
    );

    it('keeps native navigation and checkbox selection independent', async function combinedNavigation() {
      const { getByRole, getByText, getByTestId } = await render(
        <InteractionReviewExample primary="navigation" />
      );
      await userEvent.click(getByRole('link', { name: 'Option one' }));
      await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
      await expect.element(getByRole('checkbox', { name: 'Option one' })).not.toBeChecked();
      await userEvent.click(getByTestId('indicator-One'));
      await expect.element(getByRole('checkbox', { name: 'Option one' })).toBeChecked();
      await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
    });

    it('leaves independent actions usable when selection is disabled', async function disabledSelection() {
      const { getByRole, getByText } = await render(
        <InteractionReviewExample isDisabled primary="action" />
      );
      await expect.element(getByRole('checkbox', { name: 'Option one' })).toBeDisabled();
      await userEvent.click(getByText('One: copy this text without changing selection.'));
      await expect.element(getByText('Primary activations: 1')).toBeInTheDocument();
      await userEvent.click(getByRole('button', { name: 'Independent One' }));
      await expect.element(getByText('Independent activations: 1')).toBeInTheDocument();
    });

    it('does not select from corner spacing, editable text, or a portaled menu', async function independentRegions() {
      const { getByRole, getByText, getByTestId } = await render(<InteractionReviewExample />);
      await userEvent.click(getByTestId('corner-One'), { position: { x: 1, y: 1 } });
      await userEvent.click(getByTestId('editor-One'));
      await userEvent.click(getByRole('button', { name: 'Menu One' }));
      await userEvent.click(getByRole('menuitem', { name: 'Menu action One' }));
      await expect.element(getByText('Independent activations: 1')).toBeInTheDocument();
      await expect.element(getByRole('checkbox', { name: 'Option one' })).not.toBeChecked();
    });

    it('retains radio arrow navigation and single selection', async function radioKeyboard() {
      const { getByRole, getByTestId } = await render(<InteractionReviewExample kind="radio" />);
      await userEvent.click(getByTestId('indicator-One'));
      await userEvent.keyboard('{ArrowRight}');
      await expect.element(getByRole('radio', { name: 'Option two' })).toBeChecked();
      await expect.element(getByRole('radio', { name: 'Option two' })).toHaveFocus();
      await expect.element(getByRole('radio', { name: 'Option one' })).not.toBeChecked();
      await userEvent.click(getByTestId('indicator-Two'));
      await expect.element(getByRole('radio', { name: 'Option two' })).toBeChecked();
    });

    it('preserves checkbox form values and reset behavior', async function formReset() {
      const { getByRole, getByText, getByTestId } = await render(
        <InteractionReviewExample defaultSelected />
      );
      await userEvent.click(getByTestId('indicator-One'));
      await userEvent.click(getByRole('button', { name: 'Submit choices' }));
      await expect.element(getByText('Submitted: empty')).toBeInTheDocument();
      await userEvent.click(getByRole('button', { name: 'Reset choices' }));
      await expect.element(getByRole('checkbox', { name: 'Option one' })).toBeChecked();
      await userEvent.click(getByRole('button', { name: 'Submit choices' }));
      await expect.element(getByText('Submitted: one')).toBeInTheDocument();
    });

    it('gives the Card a selected appearance when its input changes', async function selectedSurface() {
      const { container, getByTestId } = await render(<InteractionReviewExample />);
      const card = container.querySelector<HTMLElement>('[data-card]')!;
      const initialBorder = getComputedStyle(card).borderColor;
      await userEvent.click(getByTestId('indicator-One'));
      expect(getComputedStyle(card).borderColor).not.toBe(initialBorder);
    });

    it('keeps read-only selection unchanged from body and indicator clicks', async function readOnlySelection() {
      const { getByRole, getByText, getByTestId } = await render(<InteractionReviewExample isReadOnly />);
      await userEvent.click(getByText('One: copy this text without changing selection.'));
      await userEvent.click(getByTestId('indicator-One'));
      await expect.element(getByRole('checkbox', { name: 'Option one' })).not.toBeChecked();
    });
  });
});

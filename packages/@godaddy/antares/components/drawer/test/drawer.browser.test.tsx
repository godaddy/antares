import { DefaultExample } from '../examples/default.tsx';
import { BottomSheetExample } from '../examples/bottom-sheet.tsx';
import { SnapPointsExample } from '../examples/snap-points.tsx';
import { PlaygroundExample } from '../examples/drawer-playground.tsx';
import { ControlledSnapExample } from '../examples/controlled-snap.tsx';
import { NestedPopoverExample } from '../examples/nested-popover.tsx';
import { RTLPlacementExample } from '../examples/rtl-placement.tsx';
import { HandleNoSnapsExample } from '../examples/handle-no-snaps.tsx';
import { DefaultOpenExample } from '../examples/default-open.tsx';
import { NoEscapeDismissExample } from '../examples/no-escape-dismiss.tsx';
import { FilteredDismissExample } from '../examples/filtered-dismiss.tsx';
import { PercentSnapPointsExample } from '../examples/percent-snap-points.tsx';
import { AriaLabelExample } from '../examples/aria-label.tsx';
import { AriaLabelWithTitleExample } from '../examples/aria-label-with-title.tsx';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, it, vi } from 'vitest';
import assume from 'assume';

/**
 * Dispatch a synthetic pointer drag sequence.
 * Motion's PanSession listens on window (no pointer capture), so
 * pointermove/pointerup dispatched on document bubble correctly.
 */
async function simulateDrag(element: HTMLElement, deltaX: number, deltaY: number) {
  const rect = element.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;
  const endX = startX + deltaX;
  const endY = startY + deltaY;

  // Motion's PanSession checks isPrimaryPointer (requires isPrimary: true)
  // and reads pageX/pageY via extractEventInfo. PointerEventInit omits page
  // coords from its TS type, but the runtime constructor accepts them.
  const base = { bubbles: true, pointerId: 1, pointerType: 'touch' as const, isPrimary: true };
  const start = { ...base, clientX: startX, clientY: startY, pageX: startX, pageY: startY };
  const end = { ...base, clientX: endX, clientY: endY, pageX: endX, pageY: endY };

  element.dispatchEvent(new PointerEvent('pointerdown', start as PointerEventInit));

  // Yield a frame so PanSession processes the origin point
  await new Promise(function frame(r) {
    requestAnimationFrame(r);
  });

  document.dispatchEvent(new PointerEvent('pointermove', end as PointerEventInit));

  // Yield a frame so PanSession's updatePoint runs before pointerup
  await new Promise(function frame(r) {
    requestAnimationFrame(r);
  });

  document.dispatchEvent(new PointerEvent('pointerup', end as PointerEventInit));
}

describe('@godaddy/antares', function antares() {
  describe('#Drawer', function drawerTests() {
    it('opens DefaultExample and renders drawer content', async function defaultExample() {
      const { getByRole } = await render(<DefaultExample />);

      await getByRole('button', { name: 'Open drawer' }).click();

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog').query();
        assume(dialog).is.not.equal(null);
        assume(dialog?.textContent).includes('Drawer content goes here.');
      });
    });

    it('opens DefaultExample with Enter key', async function keyboardOpen() {
      const { getByRole } = await render(<DefaultExample />);

      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Enter}');

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog').query();
        assume(dialog).is.not.equal(null);
      });
    });

    it('closes DefaultExample with Escape key', async function keyboardClose() {
      const { getByRole } = await render(<DefaultExample />);

      await getByRole('button', { name: 'Open drawer' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      await userEvent.keyboard('{Escape}');

      await vi.waitFor(async function close() {
        assume(getByRole('dialog').query()).equals(null);
      });
    });

    it('opens BottomSheetExample and shows close button', async function bottomSheetExample() {
      const { getByRole } = await render(<BottomSheetExample />);

      await getByRole('button', { name: 'Open bottom sheet' }).click();

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog').query();
        assume(dialog).is.not.equal(null);
        assume(dialog?.textContent).includes('Bottom sheet content');
      });

      const closeBtn = getByRole('button', { name: 'Close' }).query();
      assume(closeBtn).is.not.equal(null);
    });

    it('closes BottomSheetExample when close button is pressed', async function closeButton() {
      const { getByRole } = await render(<BottomSheetExample />);

      await getByRole('button', { name: 'Open bottom sheet' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      await getByRole('button', { name: 'Close' }).click();

      await vi.waitFor(async function close() {
        assume(getByRole('dialog').query()).equals(null);
      });
    });

    it('closes BottomSheetExample using keyboard on close button', async function closeKeyboard() {
      const { getByRole } = await render(<BottomSheetExample />);

      await getByRole('button', { name: 'Open bottom sheet' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Enter}');

      await vi.waitFor(async function close() {
        assume(getByRole('dialog').query()).equals(null);
      });
    });

    it('opens SnapPointsExample with drag handle and slider', async function snapPointsExample() {
      const { getByRole } = await render(<SnapPointsExample />);

      await getByRole('button', { name: 'Open snap sheet' }).click();

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog').query();
        assume(dialog).is.not.equal(null);
      });

      const slider = getByRole('slider', { name: 'Resize drawer' }).query();
      assume(slider).is.not.equal(null);
      assume(slider?.getAttribute('aria-valuenow')).equals('0');
      assume(slider?.getAttribute('aria-valuetext')).equals('Collapsed');
    });

    it('navigates snap points with keyboard', async function snapKeyboard() {
      const { getByRole } = await render(<SnapPointsExample />);

      await getByRole('button', { name: 'Open snap sheet' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{ArrowUp}');

      await vi.waitFor(async function expanded() {
        const slider = getByRole('slider', { name: 'Resize drawer' }).query();
        assume(slider?.getAttribute('aria-valuenow')).equals('1');
        assume(slider?.getAttribute('aria-valuetext')).equals('Expanded');
      });

      await userEvent.keyboard('{ArrowDown}');

      await vi.waitFor(async function collapsed() {
        const slider = getByRole('slider', { name: 'Resize drawer' }).query();
        assume(slider?.getAttribute('aria-valuenow')).equals('0');
        assume(slider?.getAttribute('aria-valuetext')).equals('Collapsed');
      });
    });

    it('navigates snap points with Home and End keys', async function snapHomeEnd() {
      const { getByRole } = await render(<SnapPointsExample />);

      await getByRole('button', { name: 'Open snap sheet' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{End}');

      await vi.waitFor(async function endKey() {
        const slider = getByRole('slider', { name: 'Resize drawer' }).query();
        assume(slider?.getAttribute('aria-valuenow')).equals('1');
      });

      await userEvent.keyboard('{Home}');

      await vi.waitFor(async function homeKey() {
        const slider = getByRole('slider', { name: 'Resize drawer' }).query();
        assume(slider?.getAttribute('aria-valuenow')).equals('0');
      });
    });

    it('opens PlaygroundExample and renders drawer', async function playgroundExample() {
      const { getByRole } = await render(<PlaygroundExample placement="right" isDismissable />);

      await getByRole('button', { name: 'Open drawer' }).click();

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog').query();
        assume(dialog).is.not.equal(null);
        assume(dialog?.textContent).includes('Drawer content!');
      });
    });

    it('renders ControlledSnapExample and controls snap via buttons', async function controlledSnap() {
      const { getByRole } = await render(<ControlledSnapExample />);

      await getByRole('button', { name: 'Open controlled snap' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      const slider = getByRole('slider', { name: 'Resize drawer' }).query();
      assume(slider?.getAttribute('aria-valuenow')).equals('1');
      assume(slider?.getAttribute('aria-valuetext')).equals('Expanded');

      await getByRole('button', { name: 'Collapse' }).click();

      await vi.waitFor(async function collapsed() {
        const s = getByRole('slider', { name: 'Resize drawer' }).query();
        assume(s?.getAttribute('aria-valuenow')).equals('0');
      });

      // SnapSlider is before children in DOM, Shift+Tab from Collapse reaches it
      await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
      await userEvent.keyboard('{End}');

      await vi.waitFor(async function expandedAgain() {
        const s = getByRole('slider', { name: 'Resize drawer' }).query();
        assume(s?.getAttribute('aria-valuenow')).equals('1');
      });

      await getByRole('button', { name: 'Expand' }).click();

      await vi.waitFor(async function stillExpanded() {
        const s = getByRole('slider', { name: 'Resize drawer' }).query();
        assume(s?.getAttribute('aria-valuenow')).equals('1');
      });
    });

    it('renders title as a heading', async function titleHeading() {
      const { getByRole } = await render(<DefaultExample />);

      await getByRole('button', { name: 'Open drawer' }).click();

      await vi.waitFor(async function open() {
        const heading = getByRole('heading', { name: 'Settings' }).query();
        assume(heading).is.not.equal(null);
      });
    });

    it('opens with placement="left"', async function leftPlacement() {
      const { getByRole } = await render(<PlaygroundExample placement="left" />);

      await getByRole('button', { name: 'Open drawer' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      const modal = document.querySelector('[data-placement]');
      assume(modal?.getAttribute('data-placement')).equals('left');
    });

    it('opens with placement="top"', async function topPlacement() {
      const { getByRole } = await render(<PlaygroundExample placement="top" />);

      await getByRole('button', { name: 'Open drawer' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      const modal = document.querySelector('[data-placement]');
      assume(modal?.getAttribute('data-placement')).equals('top');
    });

    it('flips left to right in RTL locale', async function rtlPlacement() {
      const { getByRole } = await render(<RTLPlacementExample />);

      await getByRole('button', { name: 'Open' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      const modal = document.querySelector('[data-placement]');
      assume(modal?.getAttribute('data-placement')).equals('right');
    });

    it('animate={false} disables animation', async function animateFalse() {
      const { getByRole } = await render(<PlaygroundExample animate={false} />);

      await getByRole('button', { name: 'Open drawer' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      const modal = document.querySelector('[data-placement]') as HTMLElement;
      assume(modal).is.not.equal(null);
      const animations = modal.getAnimations();
      assume(animations.length).equals(0);
    });

    it('renders DrawerHandle without snap points', async function handleNoSnaps() {
      const { getByRole } = await render(<HandleNoSnapsExample />);

      await getByRole('button', { name: 'Open' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      const handle = document.querySelector('[aria-hidden="true"]');
      assume(handle).is.not.equal(null);
      assume(getByRole('slider').query()).equals(null);
    });

    it('opens with defaultOpen', async function defaultOpenProp() {
      const { getByRole } = await render(<DefaultOpenExample />);

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog').query();
        assume(dialog).is.not.equal(null);
        assume(dialog?.textContent).includes('Auto-opened');
      });
    });

    it('prevents escape dismiss when isKeyboardDismissDisabled', async function keyboardDismissDisabled() {
      const { getByRole } = await render(<NoEscapeDismissExample />);

      await getByRole('button', { name: 'Open' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      await userEvent.keyboard('{Escape}');

      // Assert dialog stays open across multiple frames
      for (let i = 0; i < 3; i++) {
        await new Promise(function frame(r) {
          requestAnimationFrame(r);
        });
      }
      assume(getByRole('dialog').query()).is.not.equal(null);
    });

    it('shouldCloseOnInteractOutside filters dismiss', async function closeOnInteractOutside() {
      const { getByRole } = await render(<FilteredDismissExample />);

      await getByRole('button', { name: 'Open' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      const overlay = document.querySelector('[data-rac]') as HTMLElement;
      overlay.click();

      // Assert dialog stays open across multiple frames
      for (let i = 0; i < 3; i++) {
        await new Promise(function frame(r) {
          requestAnimationFrame(r);
        });
      }
      assume(getByRole('dialog').query()).is.not.equal(null);
    });

    it('opens PercentSnapPointsExample with string snap points', async function percentSnapPoints() {
      const { getByRole } = await render(<PercentSnapPointsExample />);

      await getByRole('button', { name: 'Open percent snap' }).click();

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog').query();
        assume(dialog).is.not.equal(null);
      });

      const slider = getByRole('slider', { name: 'Resize drawer' }).query();
      assume(slider).is.not.equal(null);
      assume(slider?.getAttribute('aria-valuenow')).equals('0');
      assume(slider?.getAttribute('aria-valuetext')).equals('Collapsed');

      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{End}');

      await vi.waitFor(async function expanded() {
        const s = getByRole('slider', { name: 'Resize drawer' }).query();
        assume(s?.getAttribute('aria-valuenow')).equals('1');
        assume(s?.getAttribute('aria-valuetext')).equals('Expanded');
      });
    });

    it('percent snap points position drawer at correct visible ratio', async function percentSnapVisualPosition() {
      const { getByRole } = await render(<PercentSnapPointsExample />);

      await getByRole('button', { name: 'Open percent snap' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      // Wait for spring animation to settle and measurement to propagate
      await new Promise(function settle(r) {
        setTimeout(r, 500);
      });

      const drawer = document.querySelector('[data-placement]') as HTMLElement;
      assume(drawer).is.not.equal(null);

      const rect = drawer.getBoundingClientRect();
      const visibleHeight = window.innerHeight - rect.top;
      const ratio = visibleHeight / rect.height;

      // At '30%' snap, ~30% of the drawer should be visible (tolerance for spring)
      assume(ratio).is.above(0.2);
      assume(ratio).is.below(0.4);

      // Expand to '60%' via keyboard (ArrowUp on snap slider)
      const slider = getByRole('slider', { name: 'Resize drawer' });
      await slider.element().focus();
      await userEvent.keyboard('{ArrowUp}');

      await new Promise(function settle(r) {
        setTimeout(r, 500);
      });

      const expandedRect = drawer.getBoundingClientRect();
      const expandedVisible = window.innerHeight - expandedRect.top;
      const expandedRatio = expandedVisible / expandedRect.height;

      // At '60%' snap, ~60% should be visible
      assume(expandedRatio).is.above(0.5);
      assume(expandedRatio).is.below(0.7);
    });

    it('uses aria-label as accessible name when title is omitted', async function ariaLabelFallback() {
      const { getByRole } = await render(<AriaLabelExample />);

      await getByRole('button', { name: 'Open' }).click();

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog', { name: 'Custom drawer label' }).query();
        assume(dialog).is.not.equal(null);
      });
    });

    it('aria-label takes precedence over title for accessible name', async function ariaLabelPrecedence() {
      const { getByRole } = await render(<AriaLabelWithTitleExample />);

      await getByRole('button', { name: 'Open' }).click();

      await vi.waitFor(async function open() {
        // RAC gives aria-label precedence: useDialog drops aria-labelledby when aria-label is set
        const dialog = getByRole('dialog', { name: 'Aria Label' }).query();
        assume(dialog).is.not.equal(null);
        // Heading still renders visually
        assume(getByRole('heading', { name: 'Visible Title' }).query()).is.not.equal(null);
      });
    });

    it('drags handle to change snap point', async function dragToSnap() {
      const { getByRole } = await render(<SnapPointsExample />);

      await getByRole('button', { name: 'Open snap sheet' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      const slider = getByRole('slider', { name: 'Resize drawer' }).query();
      assume(slider?.getAttribute('aria-valuenow')).equals('0');

      const dialog = getByRole('dialog').query()!;
      const handle = dialog.querySelector('[data-part="handle"]') as HTMLElement;
      assume(handle).is.not.equal(null);

      // Bottom placement: drag upward (negative Y) to expand
      await simulateDrag(handle, 0, -150);

      await vi.waitFor(async function expanded() {
        const s = getByRole('slider', { name: 'Resize drawer' }).query();
        assume(s?.getAttribute('aria-valuenow')).equals('1');
        assume(s?.getAttribute('aria-valuetext')).equals('Expanded');
      });
    });

    it('small drag stays in dead zone', async function dragDeadZone() {
      const { getByRole } = await render(<SnapPointsExample />);

      await getByRole('button', { name: 'Open snap sheet' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      const slider = getByRole('slider', { name: 'Resize drawer' }).query();
      assume(slider?.getAttribute('aria-valuenow')).equals('0');

      const dialog = getByRole('dialog').query()!;
      const handle = dialog.querySelector('[data-part="handle"]') as HTMLElement;
      assume(handle).is.not.equal(null);

      // Small drag within dead zone (5px, well under 10% of 207px snap range)
      await simulateDrag(handle, 0, -5);

      // Wait for state to settle (200ms covers Motion's frame scheduler + React re-render)
      await new Promise(function settle(r) {
        setTimeout(r, 200);
      });

      const s = getByRole('slider', { name: 'Resize drawer' }).query();
      assume(s?.getAttribute('aria-valuenow')).equals('0');
      assume(s?.getAttribute('aria-valuetext')).equals('Collapsed');
    });

    it('popover inside drawer does not close drawer', async function nestedPopover() {
      const { getByRole, getByText } = await render(<NestedPopoverExample />);

      await getByRole('button', { name: 'Open drawer' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog', { name: 'Drawer with Popover' }).query()).is.not.equal(null);
      });

      await getByRole('button', { name: 'Open popover' }).click();

      await vi.waitFor(async function popoverOpen() {
        assume(getByText('Popover inside drawer').query()).is.not.equal(null);
      });

      assume(getByRole('dialog', { name: 'Drawer with Popover' }).query()).is.not.equal(null);
    });
  });
});

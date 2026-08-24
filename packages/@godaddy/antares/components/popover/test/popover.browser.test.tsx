import { WithCloseButtonExample } from '../examples/with-close-button.tsx';
import { CustomAnchorExample } from '../examples/custom-anchor.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { PlaygroundExample } from '../examples/popover-playground.tsx';
import { LayerPropsExample } from '../examples/layer-props.tsx';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, it, vi } from 'vitest';
import assume from 'assume';

describe('@godaddy/antares', function antares() {
  describe('#Popover', function popoverTests() {
    it('opens DefaultExample and renders popover content', async function defaultExample() {
      const { getByRole } = await render(<DefaultExample />);

      await getByRole('button', { name: 'Open popover' }).click();

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog', { name: 'Open popover' }).query();
        assume(dialog).is.not.equal(null);
        assume(dialog?.textContent).includes('This is the popover content!');
      });
    });

    it('opens DefaultExample with Enter key', async function keyboardOpen() {
      const { getByRole } = await render(<DefaultExample />);

      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Enter}');

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog', { name: 'Open popover' }).query();
        assume(dialog).is.not.equal(null);
        assume(dialog?.textContent).includes('This is the popover content!');
      });
    });

    it('closes DefaultExample with Escape key', async function keyboardClose() {
      const { getByRole } = await render(<DefaultExample />);

      await getByRole('button', { name: 'Open popover' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog', { name: 'Open popover' }).query()).is.not.equal(null);
      });

      await userEvent.keyboard('{Escape}');

      await vi.waitFor(async function close() {
        assume(getByRole('dialog', { name: 'Open popover' }).query()).equals(null);
      });
    });

    it('opens CustomAnchorExample from external trigger', async function customAnchorExample() {
      const { getByRole } = await render(<CustomAnchorExample />);

      await getByRole('button', { name: 'Open Popover' }).click();

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog', { name: 'Popover' }).query();
        assume(dialog).is.not.equal(null);
        assume(dialog?.textContent).includes('Popover content!');
      });
    });

    it('closes WithCloseButtonExample when close button is pressed', async function withCloseButtonExample() {
      const { getByRole } = await render(<WithCloseButtonExample />);

      await getByRole('button', { name: 'Open popover' }).click();

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog').query();
        assume(dialog).is.not.equal(null);
        assume(dialog?.textContent).includes('This is the popover content!');
      });

      await getByRole('button', { name: 'Close' }).click();

      await vi.waitFor(async function close() {
        assume(getByRole('dialog', { name: 'Popover title' }).query()).equals(null);
      });
    });

    it('closes WithCloseButtonExample using keyboard on close button', async function withCloseButtonKeyboard() {
      const { getByRole } = await render(<WithCloseButtonExample />);

      await getByRole('button', { name: 'Open popover' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog', { name: 'Popover title' }).query()).is.not.equal(null);
      });

      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Enter}');

      await vi.waitFor(async function close() {
        assume(getByRole('dialog', { name: 'Popover title' }).query()).equals(null);
      });
    });

    it('labels the dialog from a composed Heading slot="title"', async function headingLabel() {
      const { getByRole } = await render(<WithCloseButtonExample />);

      await getByRole('button', { name: 'Open popover' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog', { name: 'Popover title' }).query()).is.not.equal(null);
      });
    });

    it('puts the close button beside the title and keeps the content full width', async function regionLayout() {
      const { getByRole } = await render(<PlaygroundExample showTitle showCloseButton longContent />);

      await getByRole('button', { name: 'Open popover' }).click();

      let dialog: Element | null = null;
      await vi.waitFor(async function open() {
        dialog = getByRole('dialog', { name: 'Popover title' }).query();
        assume(dialog).is.not.equal(null);
      });

      const title = (dialog as unknown as Element).querySelector('[slot="title"]');
      const content = (dialog as unknown as Element).querySelector('section');
      assume(title).is.not.equal(null);
      assume(content).is.not.equal(null);

      const titleRect = (title as Element).getBoundingClientRect();
      const contentRect = (content as Element).getBoundingClientRect();
      const closeRect = getByRole('button', { name: 'Close' }).element().getBoundingClientRect();

      // The close button owns its own column in the title row, so the title stops where the
      // button begins and they share the row.
      assume(titleRect.right <= closeRect.left).is.true();
      assume(closeRect.top < titleRect.bottom).is.true();

      // Content spans both columns below, so it keeps the full popover width.
      assume(contentRect.top >= titleRect.bottom).is.true();
      assume(contentRect.right > closeRect.left).is.true();
    });

    it('routes className to the dialog and containerProps to the panel', async function layerProps() {
      const { getByRole } = await render(<LayerPropsExample />);

      await getByRole('button', { name: 'Open popover' }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog', { name: 'Layer props' }).query()).is.not.equal(null);
      });

      const dialog = document.querySelector('.custom-dialog');
      const container = document.querySelector('.custom-container');

      // className lands on the dialog, matching Modal and Drawer; the panel is a distinct ancestor.
      assume(dialog?.getAttribute('role')).equals('dialog');
      assume(container?.contains(dialog as Node)).is.true();

      // The panel keeps its own classes alongside the consumer's.
      assume((container as HTMLElement).className.split(' ').length).is.above(1);
    });
  });
});
